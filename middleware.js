import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";

export async function middleware(req) {
  // 'secret' should be the same 'process.env.SECRET' use in NextAuth function
  const session = await getToken({req: req, secret: process.env.NEXTAUTH_SECRET});

  const path = req.nextUrl.pathname;

  const isPublicPath = path === "/auth";

  if (session && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile", "/create-prompt", "/update-prompt", "/auth"]
};
