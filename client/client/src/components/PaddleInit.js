"use client";

import { useEffect } from "react";
import { initializePaddle } from "@paddle/paddle-js";

export default function PaddleInit() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env   = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "production";
    if (!token) {
      console.warn("[Paddle] No client token found");
      return;
    }

    initializePaddle({
      environment: env,
      token,
    }).then((paddle) => {
      if (paddle) {
        window._paddle = paddle;
        window._paddleReady = true;
        console.log("[Paddle] Initialized successfully");
      }
    }).catch((e) => {
      console.error("[Paddle] Init error:", e);
    });
  }, []);

  return null;
}
