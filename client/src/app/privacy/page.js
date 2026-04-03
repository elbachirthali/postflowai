import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — PostUnivers",
  description: "Privacy Policy for PostUnivers. Learn how we collect, use, and protect your data.",
};

const LAST_UPDATED = "April 3, 2026";

export default function PrivacyPage() {
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
            <Link href="/refund" className="text-slate-500 hover:text-slate-900 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Introduction</h2>
            <p>
              PostUnivers (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates postunivers.com and is committed to
              protecting your personal data in accordance with the General Data Protection Regulation (GDPR),
              the EU ePrivacy Directive, and other applicable data protection laws.
            </p>
            <p className="mt-3">
              This Privacy Policy explains what personal data we collect, how we use it, and what rights you have
              regarding your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Data Controller</h2>
            <div className="p-4 bg-slate-50 rounded-xl text-sm mt-2">
              <p><strong>PostUnivers</strong></p>
              <p>Email: <a href="mailto:hello@postunivers.com" className="text-emerald-600 hover:underline">hello@postunivers.com</a></p>
              <p>Website: <a href="https://postunivers.com" className="text-emerald-600 hover:underline">postunivers.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data We Collect</h2>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">3.1 Account Data</h3>
            <p>When you register, we collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Full name and email address</li>
              <li>Encrypted password (we never store passwords in plain text)</li>
              <li>Plan type and subscription status</li>
            </ul>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">3.2 Social Media Account Data</h3>
            <p>
              When you connect social media accounts, we store OAuth access tokens and profile information
              (username, profile picture, platform ID) required to publish content on your behalf. We do not
              store your social media passwords.
            </p>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">3.3 Content Data</h3>
            <p>
              We store the content you create, upload, and schedule through PostUnivers, including text ideas,
              media files, AI-generated captions, and scheduling data.
            </p>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">3.4 Usage and Analytics Data</h3>
            <p>
              We collect technical data such as IP address, browser type, pages visited, and feature usage to
              improve the platform. This data is processed on the basis of our legitimate interest.
            </p>

            <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">3.5 Payment Data</h3>
            <p>
              We do <strong>not</strong> collect or store your payment card information directly. All payment
              processing is handled by <strong>Paddle.com Market Limited</strong> as the Merchant of Record.
              Paddle collects and processes your billing name, address, and payment method in accordance with
              their{" "}
              <a
                href="https://www.paddle.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                Privacy Policy
              </a>
              . We only receive a transaction reference and subscription status from Paddle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Legal Basis for Processing</h2>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Contract performance:</strong> Processing necessary to provide the PostUnivers service you subscribed to</li>
              <li><strong>Legal obligation:</strong> Compliance with tax, accounting, and legal requirements</li>
              <li><strong>Legitimate interests:</strong> Platform security, fraud prevention, and service improvement</li>
              <li><strong>Consent:</strong> Marketing communications (you may withdraw consent at any time)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. How We Use Your Data</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>To provide and operate the PostUnivers platform</li>
              <li>To process your subscription and manage billing through Paddle</li>
              <li>To generate AI captions using the content ideas you provide</li>
              <li>To publish and schedule content to your connected social media accounts</li>
              <li>To send transactional emails (account confirmation, billing receipts)</li>
              <li>To send product updates and newsletters (with your consent)</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Sharing and Third Parties</h2>
            <p>We share your data only with:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                <strong>Paddle</strong> — payment processing and subscription management (Merchant of Record)
              </li>
              <li>
                <strong>Anthropic</strong> — AI caption generation via the Claude API. Content ideas you submit
                are processed by Anthropic to generate captions. See{" "}
                <a
                  href="https://www.anthropic.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  Anthropic&apos;s Privacy Policy
                </a>
              </li>
              <li>
                <strong>Social media platforms</strong> — content and media files shared when you publish posts
                through PostUnivers
              </li>
              <li>
                <strong>Hosting and infrastructure providers</strong> — cloud services used to run the platform,
                bound by data processing agreements
              </li>
            </ul>
            <p className="mt-3">
              We never sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. International Data Transfers</h2>
            <p>
              Some of our third-party providers may process data outside the EU/EEA. Where this occurs, we ensure
              appropriate safeguards are in place (such as Standard Contractual Clauses approved by the European
              Commission) to protect your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Data Retention</h2>
            <p>
              We retain your account data for as long as your account is active. After account deletion, we retain
              data for up to <strong>30 days</strong> for backup and legal compliance purposes, after which it is
              permanently deleted. Billing records may be retained for up to 7 years as required by tax law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Your Rights (GDPR)</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong>Rectification</strong> — correct inaccurate or incomplete data</li>
              <li><strong>Erasure</strong> — request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
              <li><strong>Restriction</strong> — request that we limit processing of your data</li>
              <li><strong>Data portability</strong> — receive your data in a machine-readable format</li>
              <li><strong>Object</strong> — object to processing based on legitimate interests or for direct marketing</li>
              <li><strong>Withdraw consent</strong> — at any time, for processing based on consent</li>
            </ul>
            <p className="mt-3">
              To exercise your rights, email us at{" "}
              <a href="mailto:hello@postunivers.com" className="text-emerald-600 hover:underline">
                hello@postunivers.com
              </a>
              . We will respond within 30 days. You also have the right to lodge a complaint with your national
              data protection authority.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Cookies</h2>
            <p>
              PostUnivers uses essential cookies required for authentication and session management. We do not use
              third-party advertising cookies. You can manage cookies through your browser settings; disabling
              essential cookies may affect the functionality of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Security</h2>
            <p>
              We implement industry-standard security measures including encrypted data storage, HTTPS, JWT-based
              authentication, and regular security reviews. No method of transmission over the Internet is 100%
              secure; we cannot guarantee absolute security but we take all reasonable steps to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">12. Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by email
              or by a prominent notice on the platform. Continued use of PostUnivers after the effective date of
              any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">13. Contact</h2>
            <div className="mt-2 p-4 bg-slate-50 rounded-xl text-sm">
              <p>For any data protection enquiries or to exercise your rights:</p>
              <p className="mt-2"><strong>PostUnivers</strong></p>
              <p>Email: <a href="mailto:hello@postunivers.com" className="text-emerald-600 hover:underline">hello@postunivers.com</a></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-4 text-sm text-slate-400">
          <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          <Link href="/refund" className="hover:text-slate-900 transition-colors">Refund Policy</Link>
          <Link href="/" className="hover:text-slate-900 transition-colors">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
