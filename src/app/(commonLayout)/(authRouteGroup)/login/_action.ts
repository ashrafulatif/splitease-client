"use server";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/authUtils";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { AuthServices } from "@/service/auth.services";
import { ILoginData } from "@/types/auth.types";

export const loginUserAction = async (
  loginData: ILoginData,
  redirectPath?: string,
) => {
  try {
    const result = await AuthServices.loginUser(loginData);
    const tokenData = result.data;

    if (tokenData?.accessToken) {
      const { accessToken, refreshToken, token, user } = tokenData;
      const { role } = user;

      await setTokenInCookies("accessToken", accessToken);
      await setTokenInCookies("refreshToken", refreshToken);
      await setTokenInCookies("better-auth.session_token", token);

      const isSafeRedirectPath =
        typeof redirectPath === "string" &&
        redirectPath.startsWith("/") &&
        !redirectPath.startsWith("//") &&
        isValidRedirectForRole(redirectPath, role as UserRole);

      const targetPath = isSafeRedirectPath
        ? redirectPath
        : getDefaultDashboardRoute(role as UserRole);

      return { data: { redirectTo: targetPath }, error: null };
    }

    return { data: null, error: result.error ?? "Login failed." };
  } catch {
    return { data: null, error: "Something went wrong while logging in." };
  }
};
