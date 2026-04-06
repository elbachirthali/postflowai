/**
 * Paddle Billing (v2) client utilities.
 *
 * Required env vars in .env.local:
 *   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN        – client-side token from Paddle dashboard
 *   NEXT_PUBLIC_PADDLE_STANDARD_PRICE_ID   – price ID for the Standard plan
 *   NEXT_PUBLIC_PADDLE_PRO_PRICE_ID        – price ID for the Pro plan
 *   NEXT_PUBLIC_PADDLE_ENVIRONMENT         – "sandbox" | "production"
 *
 * Paddle is the Merchant of Record for all transactions.
 * Taxes and currency conversion are handled automatically by Paddle.
 * EUR is the default display currency; Paddle auto-converts for other regions.
 */

export const PRICE_IDS = {
  standard: process.env.NEXT_PUBLIC_PADDLE_STANDARD_PRICE_ID || "",
  pro:      process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID      || "",
};

let _initialized = false;

/**
 * Initialize Paddle once.  Called lazily by openCheckout() so no
 * onLoad wiring is needed — the script just needs to be present in the DOM.
 */
export function initPaddle() {
  if (typeof window === "undefined" || _initialized) return;
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  if (!token) {
    console.warn("[Paddle] NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is not set.");
    return;
  }
  if (typeof window.Paddle === "undefined") {
    console.warn("[Paddle] paddle.js not loaded yet.");
    return;
  }
  const env = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || "sandbox";
  window.Paddle.Environment.set(env);
  window.Paddle.Initialize({ token });
  _initialized = true;
}

/**
 * Open the Paddle overlay checkout.
 *
 * @param {object} opts
 * @param {string}   opts.priceId    – Paddle price ID (from PRICE_IDS)
 * @param {string}  [opts.email]     – pre-fill customer email
 * @param {string}  [opts.userId]    – passed as customData for webhook matching
 * @param {string}  [opts.currency]  – preferred display currency: "EUR" | "USD" (default "EUR")
 * @param {Function}[opts.onSuccess] – called when checkout.completed fires
 */
export function openCheckout({ priceId, email, userId, currency = "EUR", onSuccess }) {
  if (typeof window === "undefined") return;
  if (!priceId) {
    console.warn("[Paddle] priceId is required to open checkout.");
    return;
  }

  // Wait for Paddle.js to load if not ready yet (up to 5 seconds)
  if (typeof window.Paddle === "undefined") {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (typeof window.Paddle !== "undefined") {
        clearInterval(interval);
        openCheckout({ priceId, email, userId, currency, onSuccess });
      } else if (attempts >= 50) {
        clearInterval(interval);
        console.warn("[Paddle] paddle.js failed to load after 5 seconds.");
      }
    }, 100);
    return;
  }

  initPaddle(); // ensure initialized before opening

  // Map currency to Paddle locale for correct display
  const localeMap = { EUR: "fr", USD: "en" };
  const locale = localeMap[currency] || "fr";

  window.Paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    ...(email  ? { customer: { email } } : {}),
    customData: { ...(userId ? { userId } : {}), currency },
    settings: {
      displayMode:     "overlay",
      theme:           "light",
      locale,
      allowedPaymentMethods: ["card", "paypal"],
    },
    eventCallback(event) {
      if (event.name === "checkout.completed" && typeof onSuccess === "function") {
        onSuccess(event.data);
      }
    },
  });
}
