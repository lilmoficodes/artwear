import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const isAuthenticated = req.auth?.user;
  const path = req.nextUrl.pathname;

  const protectedRoutes = ["/dashboard", "/payment", "/profile", "/paymentdone", "/settings"];
  const publicAuthPages = ["/login", "/signup"];

  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicAuthPage = publicAuthPages.some(route => path === route);

  if (isProtectedRoute && !isAuthenticated) {
    console.log("User is not authenticated. Redirecting...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
