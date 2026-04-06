import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PostUnivers — AI-Powered Social Media Management",
  description:
    "Create once, publish everywhere. PostUnivers uses AI to generate platform-perfect captions and publish your content to TikTok, Instagram, YouTube, LinkedIn and more — in under 60 seconds.",
  keywords: [
    "social media management",
    "AI caption generator",
    "cross-platform posting",
    "content scheduling",
    "TikTok automation",
    "Instagram scheduler",
  ],
  openGraph: {
    title: "PostUnivers — AI-Powered Social Media Management",
    description: "Create once, publish everywhere. Let AI write your captions.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*
          Paddle Billing JS — loaded after the page is interactive.
          initPaddle() is called lazily inside openCheckout() in lib/paddle.js
          so no onLoad handler is needed here.
        */}
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="beforeInteractive"
        />

        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
