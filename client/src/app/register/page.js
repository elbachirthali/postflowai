"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles, Mail, Lock, User, ArrowRight,
  Eye, EyeOff, Loader2, CheckCircle, Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { openCheckout, PRICE_IDS } from "@/lib/paddle";

// Plan meta shown in the form banner
const PLAN_META = {
  standard: {
    label: "Standard",
    price: "$27.99/mo",
    color: "bg-slate-100 text-slate-700 border-slate-200",
    perks: ["5 social accounts", "50 AI captions/month", "Content calendar"],
  },
  pro: {
    label: "Pro",
    price: "$47.99/mo",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    perks: ["20 social accounts", "Unlimited AI captions", "Priority support"],
  },
};

function RegisterForm() {
  const { register } = useAuth();
  const router       = useRouter();
  const params       = useSearchParams();
  const plan         = params.get("plan"); // "standard" | "pro" | null

  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [done,        setDone]        = useState(false);
  const [paidUser,    setPaidUser]    = useState(null); // store user for checkout

  const meta = plan ? PLAN_META[plan] : null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const user = await register(name, email, password);

      if (plan && PRICE_IDS[plan]) {
        setPaidUser(user);
        setDone(true);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // If Paddle checkout was opened, show a waiting screen
  if (done) {
    return (
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/25">
          <Zap className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 mb-2">Account created!</h2>
        <p className="text-slate-500 text-sm mb-6">
          Click below to complete your <span className="font-semibold capitalize">{plan}</span> subscription.
        </p>
        <button
          onClick={() => openCheckout({
            priceId:   PRICE_IDS[plan],
            email:     paidUser?.email,
            userId:    paidUser?.id,
            onSuccess: () => router.push("/dashboard"),
          })}
          className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20 mb-4"
        >
          Complete Payment →
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-slate-400 hover:text-slate-600 underline transition"
        >
          Skip for now, go to dashboard →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 w-fit">
        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>
        <span className="text-lg font-extrabold tracking-tight text-slate-900">
          Post<span className="text-emerald-500">Univers</span>
        </span>
      </Link>

      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Create your account</h1>
      <p className="text-slate-500 text-sm mb-6">Start your 7-day free trial. No credit card required.</p>

      {/* Plan banner */}
      {meta && (
        <div className={`flex items-start gap-3 rounded-xl border p-3.5 mb-6 ${meta.color}`}>
          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold">
              {meta.label} plan — {meta.price}
            </p>
            <ul className="mt-1 space-y-0.5">
              {meta.perks.map((p) => (
                <li key={p} className="text-xs opacity-80">· {p}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type={showPw ? "text" : "password"}
            placeholder="Password (min. 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
          >
            {error}
          </motion.p>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md shadow-emerald-500/20"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {plan ? "Create account & continue to payment" : "Create free account"}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>

        <p className="text-xs text-slate-400 text-center">
          By signing up, you agree to our{" "}
          <a href="/terms" className="underline hover:text-slate-600">Terms of Service</a>,{" "}
          <a href="/privacy" className="underline hover:text-slate-600">Privacy Policy</a>,{" "}
          and{" "}
          <a href="/refund" className="underline hover:text-slate-600">Refund Policy</a>.
        </p>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-xs text-slate-300 font-medium">OR</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="text-emerald-600 font-bold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-100/50 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* useSearchParams needs Suspense boundary */}
        <Suspense fallback={<div className="h-96 bg-white rounded-3xl animate-pulse" />}>
          <RegisterForm />
        </Suspense>

        <p className="text-center text-xs text-slate-400 mt-6">
          Trusted by <span className="font-semibold text-slate-500">1,670+ creators</span> worldwide.
        </p>
      </motion.div>
    </div>
  );
}
