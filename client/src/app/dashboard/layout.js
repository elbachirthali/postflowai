"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DashboardSidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  // Fullscreen spinner while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Prevent flash of dashboard before redirect fires
  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-white text-zinc-900 selection:bg-emerald-500/30">
      <DashboardSidebar />
      <main className="flex-1 overflow-x-hidden relative w-full max-w-[1600px] mx-auto bg-white">
        <div className="p-6 md:p-8 w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
