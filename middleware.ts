import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const authPages = ["/login", "/forgot-password", "/reset-password"];
  const isAuthPage = authPages.includes(req.nextUrl.pathname);

  // Agar user already logged in hai aur auth page open kare
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/forgot-password", "/reset-password"],
};
