export const PRICE_IDS = {
  standard: process.env.NEXT_PUBLIC_PADDLE_STANDARD_PRICE_ID || "",
  pro:      process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID      || "",
};

export function openCheckout({ priceId, email, userId, currency = "EUR", onSuccess }) {
  console.log("[Paddle] openCheckout called", { priceId, email, _paddleReady: window._paddleReady, _paddle: !!window._paddle });

  if (typeof window === "undefined") return;
  if (!priceId) { console.warn("[Paddle] priceId is empty! Check NEXT_PUBLIC_PADDLE_STANDARD_PRICE_ID env var"); return; }

  const doOpen = (paddle) => {
    console.log("[Paddle] calling Checkout.open with priceId:", priceId);
    try {
      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        ...(email ? { customer: { email } } : {}),
        customData: { ...(userId ? { userId } : {}), currency },
        settings: { displayMode: "overlay", theme: "light" },
        eventCallback(event) {
          if (event.name === "checkout.completed" && typeof onSuccess === "function") {
            onSuccess(event.data);
          }
        },
      });
    } catch(e) {
      console.error("[Paddle] Checkout.open error:", e);
    }
  };

  if (window._paddleReady && window._paddle) {
    doOpen(window._paddle);
    return;
  }

  console.log("[Paddle] Not ready yet, polling...");
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (window._paddleReady && window._paddle) {
      clearInterval(interval);
      doOpen(window._paddle);
    } else if (attempts >= 50) {
      clearInterval(interval);
      console.warn("[Paddle] Timed out. _paddleReady:", window._paddleReady, "_paddle:", !!window._paddle);
    }
  }, 100);
}
