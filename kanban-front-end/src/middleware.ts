import { NextRequest, NextResponse } from "next/server";
import { EnumTokens, decoderToken } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

export async function middleware(request: NextRequest, responce: NextResponse) {
  const { url, cookies } = request;

const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isPrivatePage = url.includes("/i");
  const isAuthPage = url.includes("/auth");
  const isAdminPage = url.includes("/i/create");
  const tokenData = decoderToken(refreshToken);

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
  }
  if (isPrivatePage && !refreshToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
  }
  if (isAdminPage && tokenData.role !== "ADMIN") {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
  }
  // if (!refreshToken && !isAuthPage) {
  //   return NextResponse.redirect(new URL(DASHBOARD_PAGES.AUTH, url));
  // }
  // if (refreshToken && url === "http://localhost:3000/") {
  //   return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/i/:path*", "/auth", "/"],
};