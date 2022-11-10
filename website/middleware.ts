import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("from", req.nextUrl.pathname);
  loginUrl.searchParams.append("error", "false");

  if (!authHeader) {
    return NextResponse.redirect(loginUrl);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_PRIVATE_KEY!, (err, payload) => {
    if (err?.message === "jwt expired") {
      loginUrl.searchParams.append("expired", "true");
      return NextResponse.redirect(loginUrl);
    }
    if (err) {
      loginUrl.searchParams.append("error", "true");
      return NextResponse.redirect(loginUrl);
    }
  });

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/protected", "/api/users"],
};
