"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
type JwtPayload = {
  exp: number;
  iat: number;
  [key: string]: any; // 👈 이렇게 하면 다른 것도 접근 가능!
};

export default function TokenTimer() {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    const getTokenRemainingTime = () => {
      const cookies = document.cookie.split("; ");
      const accessToken = cookies
        .find((c) => c.startsWith("access="))
        ?.split("=")[1];

      if (!accessToken) return;

      console.log(accessToken);
      try {
        const decoded: JwtPayload = jwtDecode(accessToken);
        const now = Math.floor(Date.now() / 1000);
        const secondsLeft = decoded.exp - now;
        console.log("decoded: " + Object.keys(decoded));
        console.log(
          "만료 시간:",
          new Date(decoded.exp * 1000).toLocaleString("ko-KR")
        );
        console.log("현재 시간:", new Date().toLocaleString("ko-KR"));
        console.log("남은 시간 (초):", secondsLeft);

        console.log("⏳ 만료까지:", secondsLeft, "초");
        if (secondsLeft > 0) {
          setRemainingSeconds(secondsLeft);
        }
      } catch (err) {
        console.error("JWT decode 실패", err);
      }
    };

    getTokenRemainingTime();

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (remainingSeconds === null) return null;

  return (
    <div>
      <h1>11111111</h1>
      <p>남은 시간: {remainingSeconds}초</p>
    </div>
  );
}
