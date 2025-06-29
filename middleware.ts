import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is trying to access admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Check for auth token in cookies
    const token = request.cookies.get("admin-token")

    if (!token || token.value !== "admin-authenticated") {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
