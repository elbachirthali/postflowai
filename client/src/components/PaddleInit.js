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
      let attempts = 0;

      const tryInit = () => {
        attempts++;
        try {
          window.Paddle.Environment.set(env);
          window.Paddle.Initialize({ token });
          // Only reaches here if no error thrown
          window._paddle = window.Paddle;
          window._paddleReady = true;
          console.log("[Paddle] Ready after", attempts, "attempt(s)");
        } catch (e) {
          if (attempts < 60) {
            setTimeout(tryInit, 500); // retry every 500ms up to 30 seconds
          } else {
            console.error("[Paddle] Could not initialize after 30s");
          }
        }
      };

      setTimeout(tryInit, 500);
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
