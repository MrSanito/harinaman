import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  /*
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Define paths that require authentication
  const isProtectedPath = pathname.startsWith("/dashboard") || pathname === "/";
  
  // Define paths that are only for guest users (login page)
  const isAuthPath = pathname.startsWith("/login");

  if (isProtectedPath && !session) {
    // Redirect to login if attempting to access protected route without session
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPath && session) {
    // Redirect to dashboard if logged in and trying to visit login page
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, next.svg, vercel.svg (assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|next.svg|vercel.svg).*)",
  ],
};
