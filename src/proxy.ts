import { NextRequest, NextResponse } from "next/server";

const protctedRoutes = ["/orders", "/wishlist", "/profile", "/checkout"];
const authRouts = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-reset-code",
];
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value || null;
  const isAuthenticated = !!token;

  const isProtectedRoute = protctedRoutes.some(
    (route) => pathname === route || pathname.startsWith(` ${route}/`),
  );
  const isAuthanticated = authRouts.some(
    (route) => pathname === route || pathname.startsWith(` ${route}/`),
  );
  if (isProtectedRoute && !isAuthenticated) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl.toString(), 302);
  }
    if (isAuthanticated && isAuthenticated) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl.toString(), 302);
  }
    return NextResponse.next();
}

export const config = {
  matcher: ["/orders", "/wishlist", "/profile", "/checkout", "/signin", "/signup", "/forgot-password", "/reset-password", "/verify-reset-code"],
};



