import { NextRequest, NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { jwtUtils } from "./lib/jwtUtils";
import { AuthServices } from "./service/auth.service";

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const betterAuthToken = request.cookies.get(
      "better-auth.session_token",
    )?.value;

    const jwtSecret = process.env.JWT_ACCESS_SECRET;

    const decodedAccessToken =
      accessToken && jwtSecret
        ? jwtUtils.verifyToken(accessToken, jwtSecret).data
        : null;

    const isValidAccessToken =
      accessToken && jwtSecret
        ? jwtUtils.verifyToken(accessToken, jwtSecret).success
        : false;

    let userRole: UserRole | null =
      (decodedAccessToken?.role as UserRole | undefined) ?? null;

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // logged-in users should not access login/register pages
    // keep verify/reset accessible only when account state requires them
    if (isAuth && isValidAccessToken) {
      const userInfo = await AuthServices.getUserInfoFromTokens(
        accessToken,
        betterAuthToken,
        { noStore: true },
      );

      if (userInfo?.role) {
        userRole = userInfo.role;
      }

      if (pathname === "/verify-email") {
        if (userInfo?.emailVerified === false) {
          return NextResponse.next();
        }

        return NextResponse.redirect(
          new URL(
            getDefaultDashboardRoute((userRole as UserRole) || "MEMBER"),
            request.url,
          ),
        );
      }

      if (pathname === "/reset-password") {
        if (userInfo?.needPasswordChange) {
          return NextResponse.next();
        }

        return NextResponse.redirect(
          new URL(
            getDefaultDashboardRoute((userRole as UserRole) || "MEMBER"),
            request.url,
          ),
        );
      }

      return NextResponse.redirect(
        new URL(
          getDefaultDashboardRoute((userRole as UserRole) || "MEMBER"),
          request.url,
        ),
      );
    }

    // public routes are always allowed
    if (routeOwner === null) {
      return NextResponse.next();
    }

    // protected route access requires a valid token
    if (!accessToken || !isValidAccessToken || !refreshToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userInfo = await AuthServices.getUserInfoFromTokens(
      accessToken,
      betterAuthToken,
      { noStore: true },
    );

    if (userInfo?.role) {
      userRole = userInfo.role;
    }

    // rule 4: force verification flow until verified
    if (userInfo && userInfo.emailVerified === false) {
      if (pathname !== "/verify-email") {
        const verifyEmailUrl = new URL("/verify-email", request.url);
        verifyEmailUrl.searchParams.set("email", userInfo.email);
        return NextResponse.redirect(verifyEmailUrl);
      }

      return NextResponse.next();
    }

    // rule 5: Common protected routes are allowed for any authenticated role
    if (routeOwner === "COMMON") {
      return NextResponse.next();
    }

    // rule 6: role based route
    if (userRole && routeOwner !== userRole) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url),
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
