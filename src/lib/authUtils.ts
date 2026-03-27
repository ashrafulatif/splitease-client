export type UserRole = "MEMBER" | "ADMIN" | "MANAGER";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((router: string) => pathname === router);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

// Define protected routes with exact paths and regex patterns
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/change-password", "/my-profile"],
  pattern: [],
};
export const memberProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/member\/dashboard/],
};

export const ManagerProtectedRoutes: RouteConfig = {
  exact: ["/payment/success"],
  pattern: [/^\/manager\/dashboard/],
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/admin\/dashboard/],
};
//check  matches rotues
export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  //for exact routes
  if (routes.exact.includes(pathname)) {
    return true;
  }
  //for pattern routes
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

//find route owner -> role
export const getRouteOwner = (
  pathname: string,
): "MANAGER" | "ADMIN" | "MEMBER" | "COMMON" | null => {
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  if (isRouteMatches(pathname, ManagerProtectedRoutes)) {
    return "MANAGER";
  }
  if (isRouteMatches(pathname, memberProtectedRoutes)) {
    return "MEMBER";
  }
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  return null;
};
//get default route for redirect based on role
export const getDefaultDashboardRoute = (role: UserRole) => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "MANAGER") {
    return "/manager/dashboard";
  }
  if (role === "MEMBER") {
    return "/member/dashboard";
  }
  return "/";
};

export const isValidRedirectForRole = (redirect: string, role: UserRole) => {
  const routeOwner = getRouteOwner(redirect);

  if (routeOwner === null) {
    return true; // Public route, allow access
  }

  if (routeOwner === "COMMON") {
    return true; // Common protected route, allow access
  }
  if (routeOwner === role) {
    return true;
  }

  return false;
};
