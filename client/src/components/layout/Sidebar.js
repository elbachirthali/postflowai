"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, PenSquare, Calendar, BarChart3,
  Settings, Users, LogOut, Sparkles, Menu, X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Dashboard",    href: "/dashboard",            icon: LayoutDashboard },
  { name: "Create Post",  href: "/dashboard/editor",     icon: PenSquare       },
  { name: "Calendar",     href: "/dashboard/calendar",   icon: Calendar        },
  { name: "Analytics",   href: "/dashboard/analytics",  icon: BarChart3       },
  { name: "Accounts",    href: "/dashboard/accounts",   icon: Users           },
  { name: "Settings",    href: "/dashboard/settings",   icon: Settings        },
];

// Plan label shown under the user name
const PLAN_LABELS = {
  FREE:     { label: "Free Trial",    color: "text-slate-500"   },
  STANDARD: { label: "Standard Plan", color: "text-blue-600"    },
  PRO:      { label: "Pro Plan",      color: "text-emerald-600" },
};

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function DashboardSidebar() {
  const pathname        = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout }    = useAuth();

  const planInfo = PLAN_LABELS[user?.plan] ?? PLAN_LABELS.FREE;
  const initials = getInitials(user?.name ?? "U");

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-sm border border-zinc-200 text-zinc-800"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <motion.aside
        initial={{ x: -300 }}
        animate={{
          x: isOpen ? 0 : (typeof window !== "undefined" && window.innerWidth >= 768 ? 0 : -300),
        }}
        className="fixed md:sticky top-0 left-0 h-screen w-64 bg-zinc-50 border-r border-zinc-200 flex flex-col z-40"
      >
        {/* Logo */}
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-black">
              Post<span className="text-emerald-500">Univers</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon     = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm"
                    : "text-zinc-500 hover:text-black hover:bg-zinc-100/80"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="p-4 mt-auto">
          <div className="bg-white rounded-xl p-4 border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 flex-shrink-0">
                <span className="text-sm font-bold text-emerald-700">{initials}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-zinc-900 truncate">
                  {user?.name ?? "User"}
                </p>
                <p className={`text-xs font-semibold ${planInfo.color}`}>
                  {planInfo.label}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-zinc-500 font-semibold hover:text-red-500 hover:bg-red-50 transition-colors border-t border-zinc-100 pt-3 rounded-b-xl"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
