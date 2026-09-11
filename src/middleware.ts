import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("farmconnect_token")?.value;
  const { pathname } = request.nextUrl;

  // Protected paths
  const isFarmerRoute = pathname.startsWith("/dashboard/farmer");
  const isConsumerRoute = pathname.startsWith("/dashboard/consumer");
  const isBuyerRoute = pathname.startsWith("/dashboard/buyer");
  const isAdminRoute = pathname.startsWith("/admin");

  if (isFarmerRoute || isConsumerRoute || isBuyerRoute || isAdminRoute) {
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
