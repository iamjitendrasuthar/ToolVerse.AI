import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const authPages = ["/login", "/forgot-password", "/reset-password"];
  const protectedPages = ["/bookmarks"];

  const isAuthPage = authPages.includes(pathname);
  const isProtectedPage = protectedPages.includes(pathname);

  // 🔒 CASE 1: Logged-in user should NOT access auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔒 CASE 2: Logged-out user should NOT access protected pages
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/forgot-password", "/reset-password", "/bookmarks"],
};
