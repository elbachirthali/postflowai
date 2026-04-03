import Link from "next/link";
import { Sparkles, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Refund Policy — PostUnivers",
  description: "PostUnivers refund and cancellation policy. Understand your rights and how to request a refund.",
};

const LAST_UPDATED = "April 3, 2026";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight">
              Post<span className="text-emerald-500">Univers</span>
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Refund Policy</h1>
          <p className="text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Quick summary card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
          <h2 className="text-base font-bold text-emerald-800 mb-3">Summary</h2>
          <ul className="space-y-2">
            {[
              "30-day money-back guarantee on your first payment",
              "Cancel anytime — no cancellation fees",
              "Refunds are processed by Paddle within 5–10 business days",
              "EU consumers have additional rights under the 14-day right of withdrawal",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Merchant of Record</h2>
            <p>
              All PostUnivers subscriptions are sold by <strong>Paddle.com Market Limited</strong> (&ldquo;Paddle&rdquo;),
              which acts as the Merchant of Record for all transactions. This means that your purchase receipt,
              billing statement, and any refund will be processed by Paddle, not directly by PostUnivers.
            </p>
            <p className="mt-3">
              Refund requests initiated through PostUnivers are forwarded to Paddle for processing. If you have a
              billing dispute, you may also contact Paddle directly at{" "}
              <a
                href="https://www.paddle.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                paddle.com/support
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. 30-Day Money-Back Guarantee</h2>
            <p>
              We offer a <strong>30-day money-back guarantee</strong> on your first subscription payment for any
              PostUnivers paid plan (Standard or Pro). If you are not satisfied with PostUnivers within 30 days of
              your first charge, contact us and we will issue a full refund — no questions asked.
            </p>
            <p className="mt-3">
              The money-back guarantee applies to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>First payment on a new Standard or Pro subscription</li>
              <li>Both monthly and annual billing cycles</li>
              <li>Requests submitted within 30 days of the initial charge date</li>
            </ul>
            <p className="mt-3">
              The money-back guarantee does <strong>not</strong> apply to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Renewal charges after the first billing period</li>
              <li>Accounts found to be abusing the guarantee (e.g., multiple refund requests)</li>
              <li>Requests submitted after 30 days of the charge</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. EU / EEA Right of Withdrawal</h2>
            <p>
              If you are a consumer in the European Union or European Economic Area, you have a statutory right to
              withdraw from your purchase within <strong>14 calendar days</strong> of the date of your initial
              subscription, without giving any reason.
            </p>
            <p className="mt-3">
              <strong>Important — Waiver:</strong> PostUnivers provides immediate access to the platform upon
              payment. By subscribing and immediately accessing the service (including AI caption generation,
              post scheduling, or any other feature), you expressly acknowledge and agree that the service has
              commenced and you consent to waiving your 14-day right of withdrawal as permitted under EU Directive
              2011/83/EU Article 16(m).
            </p>
            <p className="mt-3">
              If you have subscribed but have <strong>not yet accessed</strong> any feature of the platform, you
              may exercise your full right of withdrawal within 14 days by contacting us at{" "}
              <a href="mailto:hello@postunivers.com" className="text-emerald-600 hover:underline">
                hello@postunivers.com
              </a>
              . In this case, a full refund will be issued regardless of the 30-day guarantee.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cancellation Policy</h2>
            <p>
              You can cancel your PostUnivers subscription at any time from your account settings or by contacting
              us. Cancellation stops future billing. Your access to paid features will continue until the end of
              the current billing period.
            </p>
            <p className="mt-3">
              <strong>No partial refunds</strong> are issued for unused time in a billing period after the 30-day
              guarantee window has passed, except where required by applicable law.
            </p>
            <p className="mt-3">
              For <strong>annual plans</strong>, if you cancel after 30 days but before the annual period ends,
              no refund for the remaining months is provided. We recommend testing the platform during the free
              trial or monthly billing before committing to annual billing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. How to Request a Refund</h2>
            <p>To request a refund, contact us using one of the following methods:</p>
            <div className="mt-4 p-5 bg-slate-50 rounded-xl space-y-3 text-sm">
              <div>
                <p className="font-semibold text-slate-800">Email (recommended)</p>
                <p>
                  <a href="mailto:hello@postunivers.com" className="text-emerald-600 hover:underline">
                    hello@postunivers.com
                  </a>
                </p>
                <p className="text-slate-400 mt-1">Include your account email and reason for the refund.</p>
              </div>
            </div>
            <p className="mt-4">
              Once your request is verified, we will process the refund through Paddle. Refunds typically appear
              on your bank statement within <strong>5–10 business days</strong>, depending on your payment method
              and bank.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Free Trial</h2>
            <p>
              PostUnivers offers a <strong>7-day free trial</strong> with no credit card required. You will not be
              charged during the trial period. If you choose not to subscribe after the trial, your account will
              simply be downgraded and no charge is made. No refund request is necessary for the free trial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Chargebacks</h2>
            <p>
              We encourage you to contact us before initiating a chargeback with your bank or card provider.
              Filing a chargeback for a purchase that qualifies for our refund policy may result in suspension of
              your PostUnivers account pending resolution. We are committed to resolving any billing issues fairly
              and promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contact</h2>
            <div className="mt-2 p-4 bg-slate-50 rounded-xl text-sm">
              <p><strong>PostUnivers</strong></p>
              <p>Email: <a href="mailto:hello@postunivers.com" className="text-emerald-600 hover:underline">hello@postunivers.com</a></p>
              <p>Billing support: <a href="https://www.paddle.com/support" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">paddle.com/support</a></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-4 text-sm text-slate-400">
          <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          <Link href="/" className="hover:text-slate-900 transition-colors">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
