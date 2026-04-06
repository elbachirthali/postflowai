/**
 * Paddle Billing (v2) client utilities.
 * Uses the official @paddle/paddle-js package (initialized in PaddleInit component).
 *
 * Required env vars:
 *   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN        – client-side token from Paddle dashboard
 *   NEXT_PUBLIC_PADDLE_STANDARD_PRICE_ID   – price ID for the Standard plan
 *   NEXT_PUBLIC_PADDLE_PRO_PRICE_ID        – price ID for the Pro plan
 *   NEXT_PUBLIC_PADDLE_ENVIRONMENT         – "sandbox" | "production"
 */

export const PRICE_IDS = {
  standard: process.env.NEXT_PUBLIC_PADDLE_STANDARD_PRICE_ID || "",
  pro:      process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID      || "",
};

/**
 * Open the Paddle overlay checkout.
 * Waits up to 5 seconds for Paddle to be initialized by PaddleInit.
 */
export function openCheckout({ priceId, email, userId, currency = "EUR", onSuccess }) {
  if (typeof window === "undefined") return;
  if (!priceId) {
    console.warn("[Paddle] priceId is required.");
    return;
  }

  const localeMap = { EUR: "fr", USD: "en" };
  const locale = localeMap[currency] || "fr";

  const doOpen = (paddle) => {
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      ...(email ? { customer: { email } } : {}),
      customData: { ...(userId ? { userId } : {}), currency },
      settings: {
        displayMode: "overlay",
        theme:       "light",
        locale,
      },
      eventCallback(event) {
        if (event.name === "checkout.completed" && typeof onSuccess === "function") {
          onSuccess(event.data);
        }
      },
    });
  };

  // If already ready, open immediately
  if (window._paddleReady && window._paddle) {
    doOpen(window._paddle);
    return;
  }

  // Otherwise poll until ready (up to 5 seconds)
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
