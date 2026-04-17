import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://postunivers.com"),
  title: "PostUnivers — AI Social Media Scheduler for Creators | TikTok, Instagram, YouTube",
  description:
    "PostUnivers is the AI social media scheduler built for content creators. Auto-generate captions and publish to TikTok, Instagram, YouTube, LinkedIn, Facebook & more in under 60 seconds. Try free for 7 days.",
  keywords: [
    "social media scheduler",
    "AI social media scheduler",
    "social media management tool",
    "AI caption generator",
    "TikTok scheduler",
    "Instagram scheduler",
    "YouTube scheduler",
    "LinkedIn scheduler",
    "social media tool for creators",
    "cross-platform social media posting",
    "schedule posts TikTok Instagram",
    "Buffer alternative",
    "Hootsuite alternative",
    "Later alternative",
    "content scheduling tool",
    "AI social media management",
    "social media content calendar",
  ],
  openGraph: {
    title: "PostUnivers — AI Social Media Scheduler for Creators",
    description:
      "Auto-generate captions and publish to TikTok, Instagram, YouTube & more in under 60 seconds. 7-day free trial.",
    type: "website",
    url: "https://postunivers.com",
    siteName: "PostUnivers",
  },
  twitter: {
    card: "summary_large_image",
    title: "PostUnivers — AI Social Media Scheduler for Creators",
    description:
      "Auto-generate captions and publish to TikTok, Instagram, YouTube & more in under 60 seconds. 7-day free trial.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
