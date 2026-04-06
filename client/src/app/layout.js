import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import PaddleInit from "@/components/PaddleInit";

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
      <head>
        <script src="https://cdn.paddle.com/paddle/v2/paddle.js" async />
      </head>
      <body className={inter.className}>
        <PaddleInit />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
