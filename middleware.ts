import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req)=>{
  const isAuthenticated = req.auth?.user
  const protectedRoutes = ["/dashboard", "/payment", "/profile", "/paymentdone"];
  const publicAuthPages = ["/login", "/signup"];
  if (protectedRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
    console.log("User is not authenticated. Redirecting...");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (publicAuthPages.includes(req.nextUrl.pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}) 

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }