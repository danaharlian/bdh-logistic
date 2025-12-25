export const DEFAULT_REDIRECT = "/dashboard";

export const AUTH_ROUTES = new Set(["/login", "/signup"]);

export const PRIVATE_ROUTE_PREFIXES = ["/dashboard", "/warehouses"];

export const isAuthRoute = (pathname: string) =>
  [...AUTH_ROUTES].some((route) => pathname.startsWith(route));

export const isPrivateRoute = (pathname: string) =>
  PRIVATE_ROUTE_PREFIXES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
