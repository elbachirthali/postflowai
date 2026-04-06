"use client";

import { useEffect } from "react";

export default function PaddleInit() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env   = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "production";

    if (!token) return;

    const init = () => {
      if (typeof window.Paddle === "undefined") return;
      window.Paddle.Environment.set(env);
      window.Paddle.Initialize({ token });
    };

    // Try immediately, then poll until paddle.js is loaded
    if (typeof window.Paddle !== "undefined") {
      init();
    } else {
      const interval = setInterval(() => {
        if (typeof window.Paddle !== "undefined") {
          clearInterval(interval);
          init();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  return null;
}
