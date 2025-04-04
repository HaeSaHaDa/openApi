import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value; // 🔹 JWT 쿠키 확인
  console.log(token?.toString);
  // 보호된 페이지 리스트
  const protectedRoutes = ["/authentication/test", "/profile"];

  // 보호된 페이지 접근 시 JWT가 없으면 로그인 페이지로 리다이렉트
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // 통과
}

// ✅ middleware가 적용될 경로 지정 ("/dashboard"와 같은 보호 페이지에만 적용)
export const config = {
  matcher: ["/authentication/test/:path*", "/profile"],
};
