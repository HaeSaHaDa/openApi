"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include", // 세션 쿠키 포함!
      });

      if (res.ok) {
        alert("로그아웃 되었습니다.");
        router.push("/login"); // 로그인 페이지로 이동
      } else {
        alert("로그아웃 실패");
      }
    } catch (err) {
      console.error("로그아웃 오류:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      로그아웃
    </button>
  );
}
