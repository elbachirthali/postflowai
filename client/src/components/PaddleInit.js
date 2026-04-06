"use client";

import { useEffect } from "react";

export default function PaddleInit() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env   = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "production";
    if (!token) return;

    let attempts = 0;

    const tryInit = () => {
      attempts++;
      if (typeof window.Paddle === "undefined" || !window.Paddle.Initialize) {
        if (attempts < 100) setTimeout(tryInit, 100);
        return;
      }
      try {
        window.Paddle.Environment.set(env);
        window.Paddle.Initialize({ token });
      } catch (e) {
        // retry once more if internal state not ready
        if (attempts < 100) setTimeout(tryInit, 200);
      }
    };

    // Load paddle.js script then init
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => tryInit();
    document.head.appendChild(script);

    return () => {
      // cleanup: remove script if component unmounts before load
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return null;
}
