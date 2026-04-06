"use client";

import { useEffect } from "react";

export default function PaddleInit() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env   = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "production";
    if (!token) { console.warn("[Paddle] No token"); return; }

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      // Wait 1.5s for Paddle's internal sub-scripts (ProfitWell etc.) to finish
      setTimeout(() => {
        try {
          window.Paddle.Environment.set(env);
          window.Paddle.Initialize({ token });
          window._paddle = window.Paddle;
          window._paddleReady = true;
          console.log("[Paddle] Ready");
        } catch (e) {
          // Retry after another second if still not ready
          setTimeout(() => {
            try {
              window.Paddle.Environment.set(env);
              window.Paddle.Initialize({ token });
              window._paddle = window.Paddle;
              window._paddleReady = true;
              console.log("[Paddle] Ready (retry)");
            } catch (e2) {
              console.error("[Paddle] Failed:", e2);
            }
          }, 2000);
        }
      }, 3000);
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
