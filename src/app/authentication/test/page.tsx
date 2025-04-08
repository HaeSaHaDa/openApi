"use client"; // 상단에 반드시 붙이기

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Addmin() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/api/mypage", {
      credentials: "include", // ✅ 세션 쿠키를 자동으로 함께 보냄
    })
      .then((res) => {
        if (res.status === 401) {
          // 🔁 인증 실패 → 로그인 페이지로 이동
          alert("로그인이 필요합니다.");
          // router.push("/authentication/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) setUsername(data.username);
      })
      .catch((err) => {
        console.error("에러:", err);
        alert("서버 오류 발생");
      });
  }, [router]);

  return (
    <div>
      <h1>마이페이지</h1>
      {username ? <p>환영합니다, {username}님!</p> : <p>로딩 중...</p>}
    </div>
  );
}
