import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("✅ middleware.ts 실행됨!");
  console.log("🔹 요청 경로:", req.nextUrl.pathname);

  const session = req.cookies.get("JSESSIONID")?.value; // 🔹 JWT 쿠키 확인
  console.log(session);

  // 보호된 페이지 리스트
  const protectedRoutes = ["/authentication/test"];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // 보호된 페이지 접근 시 JWT가 없으면 로그인 페이지로 리다이렉트
  if (isProtected && !session) {
    console.log("⛔ 보호된 경로 접근 차단! 로그인 페이지로 이동");
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  console.log("✅ 접근 허용");
  return NextResponse.next();
}

// ✅ middleware가 적용될 경로 지정 ("/dashboard"와 같은 보호 페이지에만 적용)
export const config = {
  matcher: ["/authentication/:path*"],
};
