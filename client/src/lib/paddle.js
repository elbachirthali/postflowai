export const PRICE_IDS = {
  standard: process.env.NEXT_PUBLIC_PADDLE_STANDARD_PRICE_ID || "",
  pro:      process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID      || "",
};

export function openCheckout({ priceId, email, userId, currency = "EUR", onSuccess }) {
  if (typeof window === "undefined") return;
  if (!priceId) { console.warn("[Paddle] priceId required"); return; }

  const localeMap = { EUR: "fr", USD: "en" };

  const doOpen = (paddle) => {
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      ...(email ? { customer: { email } } : {}),
      customData: { ...(userId ? { userId } : {}), currency },
      settings: { displayMode: "overlay", theme: "light", locale: localeMap[currency] || "fr" },
      eventCallback(event) {
        if (event.name === "checkout.completed" && typeof onSuccess === "function") {
          onSuccess(event.data);
        }
      },
    });
  };

  if (window._paddleReady && window._paddle) {
    doOpen(window._paddle);
    return;
  }

  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (window._paddleReady && window._paddle) {
      clearInterval(interval);
      doOpen(window._paddle);
    } else if (attempts >= 50) {
      clearInterval(interval);
      console.warn("[Paddle] Timed out waiting for initialization.");
    }
  }, 100);
}
