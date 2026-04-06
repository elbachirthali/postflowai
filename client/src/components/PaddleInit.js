"use client";

import { useEffect } from "react";

export default function PaddleInit() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env   = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "production";
    if (!token) {
      console.warn("[Paddle] No client token found");
      return;
    }

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (typeof window.Paddle !== "undefined") {
        clearInterval(interval);
        try {
          window.Paddle.Environment.set(env);
          window.Paddle.Initialize({ token });
          window._paddleReady = true;
          console.log("[Paddle] Initialized successfully");
        } catch (e) {
          console.error("[Paddle] Init error:", e);
        }
      } else if (attempts >= 100) {
        clearInterval(interval);
        console.warn("[Paddle] Timed out waiting for paddle.js");
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
}
