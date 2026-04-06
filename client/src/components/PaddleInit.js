"use client";

import { useEffect } from "react";

export default function PaddleInit() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env   = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "production";
    if (!token) { console.warn("[Paddle] No token"); return; }

    const loadAndInit = (attempt = 1) => {
      // Remove old Paddle script and state to get a fresh instance
      document.querySelectorAll('script[src*="paddle.com/paddle"]').forEach(s => s.remove());
      delete window.Paddle;

      const script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.onload = () => {
        // Wait 2s for Paddle's async URL fetch to complete before Initialize()
        setTimeout(() => {
          try {
            window.Paddle.Environment.set(env);
            window.Paddle.Initialize({ token });
            window._paddle = window.Paddle;
            window._paddleReady = true;
            console.log("[Paddle] Ready on attempt", attempt);
          } catch (e) {
            console.warn("[Paddle] Attempt", attempt, "failed, retrying...");
            if (attempt < 5) setTimeout(() => loadAndInit(attempt + 1), 1000);
          }
        }, 2000);
      };
      document.head.appendChild(script);
    };

    loadAndInit();
  }, []);

  return null;
}
