import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function isExpired(token: string) {
  try {
    // Basic JWT structure check
    const parts = token.split(".")
    if (parts.length !== 3) return true

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString()
    )

    if (!payload?.exp) return false // If no exp, don't block by default

    // Convert exp to milliseconds and compare with a 10s grace period
    const currentTime = Math.floor(Date.now() / 1000)
    return currentTime >= payload.exp
  } catch (error) {
    return true
  }
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // 1. Only protect /admin routes
  if (!path.startsWith("/admin")) {
    return NextResponse.next()
  }

  // 2. Allow access to the login page itself
  if (path.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  const jwt = req.cookies.get("jwt")?.value

  // 3. No token present
  if (!jwt) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  // 4. Token exists but is invalid/expired
  if (isExpired(jwt)) {
    const res = NextResponse.redirect(new URL("/admin/login", req.url))
    res.cookies.delete("jwt")
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}