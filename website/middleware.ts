import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import Joi from "joi";

const decodedSchema = Joi.object({
  _id: Joi.string().required(),
  permission: Joi.string().required(),
  iat: Joi.number().required(),
  exp: Joi.number().required(),
});

export async function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  const cookieObj = cookieHeader && cookie.parse(cookieHeader);

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("from", req.nextUrl.pathname);

  if (cookieObj === null || cookieObj === "") {
    loginUrl.searchParams.append("error", "true");
    return NextResponse.redirect(loginUrl);
  }

  if (cookieObj?.Authorization) {
    const token = cookieObj?.Authorization;
    const decoded = jwt.decode(token);

    const validation = decodedSchema.validate(decoded);

    if (validation.error) {
      loginUrl.searchParams.append("error", "true");
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  } else {
    loginUrl.searchParams.append("error", "true");
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/api/users",
    "/api/mechanization",
    "/api/references",
    "/protected",
  ],
};
