import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Terms of Service — PostUnivers",
  description: "Terms of Service for PostUnivers, the AI-powered social media management platform.",
};

const LAST_UPDATED = "April 3, 2026";

export default function TermsPage() {
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
            <Link href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/refund" className="text-slate-500 hover:text-slate-900 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using PostUnivers (<strong>postunivers.com</strong>), you agree to be bound by these
              Terms of Service and all applicable laws and regulations. If you do not agree with any part of these
              terms, you may not use our service.
            </p>
            <p className="mt-3">
              These Terms apply to all users of the platform, including visitors, registered users, and subscribers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
            <p>
              PostUnivers is an AI-powered social media management platform that allows users to generate captions,
              schedule posts, and publish content across multiple social media platforms including TikTok, Instagram,
              YouTube, LinkedIn, Facebook, X (Twitter), Pinterest, and Threads.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Accounts and Registration</h2>
            <p>
              To access certain features, you must create an account. You agree to provide accurate, complete, and
              current information during registration and to keep your account credentials confidential. You are
              responsible for all activity that occurs under your account.
            </p>
            <p className="mt-3">
              You must be at least 18 years old to create an account and subscribe to any paid plan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Subscriptions and Billing</h2>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.1 Merchant of Record</h3>
            <p>
              All payments for PostUnivers subscriptions are processed by{" "}
              <strong>Paddle.com Market Limited</strong> (&ldquo;Paddle&rdquo;), which acts as the Merchant of Record
              for all transactions. When you purchase a subscription, your contract for payment is with Paddle, and
              Paddle&apos;s terms of service and privacy policy also apply to your purchase.
              You can review Paddle&apos;s terms at{" "}
              <a
                href="https://www.paddle.com/legal/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                paddle.com/legal/terms
              </a>
              .
            </p>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.2 Subscription Plans</h3>
            <p>
              PostUnivers offers the following paid subscription plans:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Standard Plan</strong> — €25.99/month (or €22.09/month billed annually)</li>
              <li><strong>Pro Plan</strong> — €44.99/month (or €38.24/month billed annually)</li>
            </ul>
            <p className="mt-2">
              Prices are also available in USD. The applicable price is displayed at checkout. All prices are
              exclusive of applicable taxes; VAT and other taxes are calculated and collected by Paddle based on
              your billing location.
            </p>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.3 Auto-Renewal</h3>
            <p>
              Subscriptions automatically renew at the end of each billing period (monthly or annual) unless you
              cancel before the renewal date. By subscribing, you authorise Paddle to charge your payment method
              on a recurring basis for the applicable subscription fee.
            </p>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.4 Free Trial</h3>
            <p>
              We offer a 7-day free trial with no credit card required. At the end of the trial, you must select a
              paid plan to continue using the service. No charge is made during the trial period.
            </p>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">4.5 Cancellation</h3>
            <p>
              You may cancel your subscription at any time from your account settings or by contacting us at{" "}
              <a href="mailto:hello@postunivers.com" className="text-emerald-600 hover:underline">
                hello@postunivers.com
              </a>
              . Your access to paid features will continue until the end of the current billing period. No partial
              refunds are issued for unused time within a billing period, except as required by applicable law or
              our Refund Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Right of Withdrawal (EU / EEA Consumers)</h2>
            <p>
              If you are a consumer located in the European Union or European Economic Area, you have the right to
              withdraw from a purchase within <strong>14 days</strong> of your initial subscription without giving any
              reason (the &ldquo;cooling-off period&rdquo;).
            </p>
            <p className="mt-3">
              <strong>Waiver of withdrawal right:</strong> By subscribing and immediately accessing the PostUnivers
              platform (including AI caption generation and post scheduling features), you expressly consent to the
              immediate performance of the service and acknowledge that you lose your right of withdrawal once the
              service has been fully performed or once you have begun accessing digital content.
            </p>
            <p className="mt-3">
              If you wish to exercise your right of withdrawal before accessing the service, contact us at{" "}
              <a href="mailto:hello@postunivers.com" className="text-emerald-600 hover:underline">
                hello@postunivers.com
              </a>{" "}
              within 14 days of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Acceptable Use</h2>
            <p>You agree not to use PostUnivers to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Publish or distribute content that is illegal, harmful, abusive, or violates third-party rights</li>
              <li>Spam, harass, or impersonate any person or entity</li>
              <li>Violate the terms of service of any connected social media platform</li>
              <li>Reverse-engineer, copy, or redistribute the PostUnivers platform or its underlying AI models</li>
              <li>Use the service for any unlawful purpose or in violation of applicable regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Intellectual Property</h2>
            <p>
              PostUnivers and its original content, features, and functionality are owned by PostUnivers and are
              protected by applicable intellectual property laws. The AI-generated captions produced for you are
              provided for your use; however, you are responsible for ensuring that any content you publish complies
              with the terms of the respective social media platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Third-Party Services</h2>
            <p>
              PostUnivers integrates with third-party social media platforms and services. We are not responsible
              for the availability, accuracy, or policies of these third-party services. Your use of connected
              social media accounts is subject to those platforms&apos; own terms of service.
            </p>
            <p className="mt-3">
              AI caption generation is powered by the Claude API by Anthropic. By using this feature, you also
              agree to Anthropic&apos;s usage policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Disclaimers and Limitation of Liability</h2>
            <p>
              PostUnivers is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not
              guarantee that the service will be uninterrupted, error-free, or that AI-generated content will meet
              your specific requirements.
            </p>
            <p className="mt-3">
              To the maximum extent permitted by law, PostUnivers shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including loss of profits, data, or business
              opportunities, arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by
              email or by a prominent notice on the platform. Continued use of PostUnivers after changes take effect
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Governing Law</h2>
            <p>
              These Terms are governed by applicable law. For EU consumers, mandatory consumer protection laws of
              your country of residence apply and cannot be excluded by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">12. Contact</h2>
            <p>
              For any questions regarding these Terms, please contact us:
            </p>
            <div className="mt-3 p-4 bg-slate-50 rounded-xl text-sm">
              <p><strong>PostUnivers</strong></p>
              <p>Email: <a href="mailto:hello@postunivers.com" className="text-emerald-600 hover:underline">hello@postunivers.com</a></p>
              <p>Website: <a href="https://postunivers.com" className="text-emerald-600 hover:underline">postunivers.com</a></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-4 text-sm text-slate-400">
          <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          <Link href="/refund" className="hover:text-slate-900 transition-colors">Refund Policy</Link>
          <Link href="/" className="hover:text-slate-900 transition-colors">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
