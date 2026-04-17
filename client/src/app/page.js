"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  Twitter, Instagram, Video, Youtube, Sparkles, Globe,
  ArrowRight, Linkedin, Facebook, Star, CheckCircle,
  AtSign, Users, BarChart2, Calendar,
  ChevronDown, BookOpen, Timer, Play,
  Cpu, Menu, X, Image as PinIcon, Upload,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Features",     href: "#features"      },
  { label: "How It Works", href: "#how-it-works"  },
  { label: "Pricing",      href: "#pricing"       },
  { label: "Reviews",      href: "#reviews"       },
  { label: "Blog",         href: "#blog"          },
];

const STATS = [
  { value: "1,670+", label: "Active Creators"   },
  { value: "10M+",   label: "Posts Published"   },
  { value: "8",      label: "Platforms"         },
  { value: "93%",    label: "Time Saved"        },
];

const PLATFORMS = [
  { name: "TikTok",      icon: Video,     color: "text-slate-900", ring: "hover:ring-slate-900" },
  { name: "Instagram",   icon: Instagram, color: "text-pink-500",  ring: "hover:ring-pink-500"  },
  { name: "YouTube",     icon: Youtube,   color: "text-red-500",   ring: "hover:ring-red-500"   },
  { name: "X (Twitter)", icon: Twitter,   color: "text-slate-900", ring: "hover:ring-slate-800" },
  { name: "LinkedIn",    icon: Linkedin,  color: "text-blue-600",  ring: "hover:ring-blue-600"  },
  { name: "Pinterest",   icon: PinIcon,   color: "text-red-500",   ring: "hover:ring-red-400"   },
  { name: "Threads",     icon: AtSign,    color: "text-slate-900", ring: "hover:ring-slate-800" },
  { name: "Facebook",    icon: Facebook,  color: "text-blue-500",  ring: "hover:ring-blue-500"  },
];

const FEATURES = [
  {
    icon: Cpu,
    bg: "bg-emerald-50",
    fg: "text-emerald-600",
    title: "AI Caption Studio",
    desc: "Our AI caption generator analyzes your content and writes platform-perfect captions — hooks, hashtags, CTAs — optimized for each network's algorithm.",
  },
  {
    icon: Globe,
    bg: "bg-blue-50",
    fg: "text-blue-600",
    title: "One-Click Cross-Posting",
    desc: "Upload once. Schedule and publish everywhere. Cross-post to TikTok, Instagram, YouTube & 5 more platforms in under 30 seconds instead of 30 minutes.",
  },
  {
    icon: Calendar,
    bg: "bg-violet-50",
    fg: "text-violet-600",
    title: "Visual Content Calendar",
    desc: "Plan, schedule, and visualize weeks of content at a glance with your social media content calendar. Never miss a trending moment or optimal posting window again.",
  },
  {
    icon: BarChart2,
    bg: "bg-orange-50",
    fg: "text-orange-600",
    title: "Unified Analytics",
    desc: "Track views, engagement, clicks, and reach across every platform from a single dashboard. See what works and double down.",
  },
  {
    icon: Upload,
    bg: "bg-pink-50",
    fg: "text-pink-600",
    title: "Smart Media Upload",
    desc: "Drag-and-drop your videos and images. PostUnivers automatically formats your media for each platform's spec requirements.",
  },
  {
    icon: Users,
    bg: "bg-slate-50",
    fg: "text-slate-600",
    title: "Team Collaboration",
    desc: "Invite your team, assign roles, and approve content before it goes live. Built for agencies and growing brands.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Upload Your Content",
    desc: "Drag and drop your video or image. PostUnivers accepts all major formats across all platforms.",
  },
  {
    number: "02",
    title: "AI Generates Your Captions",
    desc: "Our AI reads your idea and instantly writes tailored captions for every platform you select — tone, hashtags, and hooks included.",
  },
  {
    number: "03",
    title: "Schedule or Publish Now",
    desc: "Hit publish to go live instantly, or schedule for the optimal time. Your content reaches the world in seconds.",
  },
];

const PRICING_STANDARD = {
  name: "Standard",
  priceUSD: 27.99,
  priceEUR: 25.99,
  desc: "Perfect for solo creators growing their online presence.",
  features: [
    "5 connected social accounts",
    "50 AI-generated captions / month",
    "Content calendar",
    "Basic analytics",
    "All 8 platforms",
    "Schedule up to 30 posts",
    "Email support",
  ],
};

const PRICING_PRO = {
  name: "Pro",
  priceUSD: 47.99,
  priceEUR: 44.99,
  desc: "For professional creators, agencies, and brands who need unlimited power.",
  features: [
    "20 connected social accounts",
    "Unlimited AI captions",
    "Advanced analytics & reports",
    "Priority 24h support",
    "Team collaboration (5 seats)",
    "Unlimited scheduled posts",
    "Custom branding",
    "API access",
    "Early access to new features",
  ],
};

const REVIEWS = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    company: "500K followers",
    initials: "SJ",
    color: "bg-emerald-500",
    rating: 5,
    text: "PostUnivers completely changed how I work. What used to take me 2 hours every morning now takes 15 minutes. The AI captions are genuinely good — they nail the tone for each platform.",
  },
  {
    name: "Michael Chen",
    role: "Social Media Manager",
    company: "TechBrand Co.",
    initials: "MC",
    color: "bg-blue-500",
    rating: 5,
    text: "I manage 6 brand accounts. Before PostUnivers I was drowning. Now I schedule an entire week of content on Monday and spend the rest of my time actually engaging with the community.",
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Consultant",
    company: "Self-employed",
    initials: "ER",
    color: "bg-violet-500",
    rating: 5,
    text: "The analytics alone are worth the price. Seeing performance across TikTok, Instagram, and LinkedIn in one view has helped me prove ROI to every single client.",
  },
  {
    name: "David Kim",
    role: "E-commerce Brand Owner",
    company: "FreshDrip Store",
    initials: "DK",
    color: "bg-orange-500",
    rating: 5,
    text: "We went from posting twice a week to daily across all platforms. Our follower count grew 340% in 3 months. PostUnivers is genuinely one of the best investments we've made.",
  },
  {
    name: "Aisha Patel",
    role: "Lifestyle & Wellness Creator",
    company: "280K subscribers",
    initials: "AP",
    color: "bg-pink-500",
    rating: 5,
    text: "The content calendar is beautiful. I plan my entire month visually and the AI always suggests the perfect caption for my niche. It feels like having a dedicated copywriter on call.",
  },
  {
    name: "Tom Bennett",
    role: "Agency Founder",
    company: "Groove Digital",
    initials: "TB",
    color: "bg-slate-700",
    rating: 5,
    text: "We onboarded PostUnivers for 12 of our clients. The team collaboration feature is seamless and client approval workflows are a dream. This tool pays for itself in the first week.",
  },
];

const BLOGS = [
  {
    category: "Strategy",
    catBg: "bg-emerald-100",
    catFg: "text-emerald-700",
    gradient: "from-emerald-400 to-teal-500",
    title: "How to Write Viral TikTok Captions That Convert in 2026",
    excerpt:
      "TikTok's algorithm rewards content that drives comments and shares. Learn the proven caption frameworks that top creators use to trigger massive engagement.",
    readTime: "5 min read",
    date: "March 28, 2026",
    slug: "#blog",
  },
  {
    category: "Tools & Tips",
    catBg: "bg-blue-100",
    catFg: "text-blue-700",
    gradient: "from-blue-400 to-indigo-500",
    title: "The Complete Guide to Social Media Scheduling for Busy Creators",
    excerpt:
      "Discover how smart scheduling can 3x your posting consistency without adding stress. The ultimate time-saving playbook for creators who want to grow without burning out.",
    readTime: "7 min read",
    date: "March 14, 2026",
    slug: "#blog",
  },
  {
    category: "AI & Innovation",
    catBg: "bg-violet-100",
    catFg: "text-violet-700",
    gradient: "from-violet-400 to-purple-500",
    title: "Why AI-Powered Content Tools Are the Future of Social Media Marketing",
    excerpt:
      "AI isn't replacing creators — it's giving them superpowers. Explore how AI caption generation, content classification, and analytics are redefining content strategy.",
    readTime: "6 min read",
    date: "February 28, 2026",
    slug: "#blog",
  },
];

const FAQS = [
  {
    q: "What platforms does PostUnivers support?",
    a: "PostUnivers supports TikTok, Instagram, YouTube, X (Twitter), LinkedIn, Facebook, Pinterest, and Threads — all 8 major platforms from a single dashboard.",
  },
  {
    q: "Can I try PostUnivers for free?",
    a: "Yes! Start a free trial with no credit card required. Explore all core features for 7 days, then choose the plan that fits your needs.",
  },
  {
    q: "How does the AI caption generator work?",
    a: "PostUnivers uses a state-of-the-art AI engine trained specifically for social media. It analyzes your content idea, selected platforms, and target audience to write captions that match each platform's unique style and algorithm requirements.",
  },
  {
    q: "Is my content and data secure?",
    a: "Absolutely. All data is encrypted in transit and at rest. We never share your content or credentials with third parties. Your social media tokens are stored with industry-standard security protocols.",
  },
  {
    q: "Can I cancel my subscription at any time?",
    a: "Yes, cancel anytime with no fees or penalties. Your account remains active until the end of your current billing period.",
  },
  {
    q: "Does PostUnivers support team accounts?",
    a: "Yes! The Pro plan includes up to 5 team seats with role-based permissions and a content approval workflow — perfect for agencies and growing brands.",
  },
];

// ─── FEATURE GLOW COLORS ──────────────────────────────────────────────────────
const FEATURE_COLORS = [
  { icon: "from-emerald-400 to-teal-500",   glow: "group-hover:shadow-emerald-500/20" },
  { icon: "from-blue-400 to-cyan-500",      glow: "group-hover:shadow-blue-500/20"    },
  { icon: "from-violet-400 to-purple-500",  glow: "group-hover:shadow-violet-500/20"  },
  { icon: "from-orange-400 to-amber-500",   glow: "group-hover:shadow-orange-500/20"  },
  { icon: "from-pink-400 to-rose-500",      glow: "group-hover:shadow-pink-500/20"    },
  { icon: "from-slate-400 to-slate-600",    glow: "group-hover:shadow-slate-500/20"   },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [annual, setAnnual] = useState(false);
  const [currency, setCurrency] = useState("EUR");
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currencySymbol = currency === "EUR" ? "€" : "$";
  const getPrice = (plan) => {
    const base = currency === "EUR" ? plan.priceEUR : plan.priceUSD;
    return annual ? (base * 0.85).toFixed(2) : base.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Post<span className="text-emerald-400">Univers</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register?plan=standard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="text-sm font-bold bg-emerald-500 text-white px-5 py-2.5 rounded-full hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Start Free Trial
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-slate-950 overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col gap-4">
                {NAV_LINKS.map((l) => (
                  <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-slate-400 hover:text-white">
                    {l.label}
                  </a>
                ))}
                <Link href="/register?plan=standard">
                  <button className="w-full py-3 rounded-full bg-emerald-500 text-white font-bold text-sm">
                    Start Free Trial
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-32 px-4">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-10 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ★ 4.9 · Trusted by 1,670+ creators worldwide
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.06] mb-6"
          >
            AI Social Media Scheduler
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Built for Creators.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Stop wasting hours on social media. PostUnivers AI generates platform-perfect
            captions and schedules your posts to TikTok, Instagram, YouTube, LinkedIn & more —
            all in under 60 seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="/register?plan=standard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-emerald-500 text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-emerald-400 transition-colors shadow-2xl shadow-emerald-500/30 text-base"
              >
                Start Free — 7 Days Free <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <a href="#how-it-works" className="flex items-center gap-3 text-slate-400 font-semibold text-base hover:text-white transition-colors">
              <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Play className="w-4 h-4 ml-0.5 text-white" />
              </div>
              See how it works
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 max-w-3xl mx-auto mb-16"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center bg-slate-950 py-6 px-4">
                <div className="text-3xl md:text-4xl font-extrabold text-white">
                  {s.value}
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-1.5 uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Platforms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-5">
              Publish to all major platforms
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {PLATFORMS.map((p) => (
                <div
                  key={p.name}
                  title={p.name}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <p.icon className={`w-4 h-4 ${p.color}`} />
                  <span className="text-xs font-semibold text-slate-300">{p.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3 h-3" /> Features
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight"
            >
              Everything you need to
              <br />
              <span className="text-gradient-green">schedule &amp; manage social media</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg text-slate-400 max-w-2xl mx-auto"
            >
              Stop juggling five tools. PostUnivers combines AI caption generation,
              social media scheduling, and cross-platform publishing in one dashboard.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const c = FEATURE_COLORS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className={`group glass-dark rounded-2xl p-7 cursor-default transition-all duration-300 hover:shadow-2xl ${c.glow}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.icon} flex items-center justify-center mb-5 shadow-lg`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2.5">{f.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6"
            >
              How It Works
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-5"
            >
              From idea to published
              <br />
              <span className="text-gradient-green">in under 60 seconds</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-14 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/20 to-emerald-500/50" />

            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, ease: "easeOut" }}
                className="relative glass-dark rounded-2xl p-8 text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
                >
                  {i + 1}
                </motion.div>
                <h3 className="text-base font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6"
            >
              Pricing
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              Invest in your growth
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-slate-400 text-lg mb-10"
            >
              No hidden fees. Cancel anytime.
            </motion.p>

            {/* Billing + Currency toggles */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="inline-flex items-center glass-dark p-1 rounded-full gap-1">
                <button onClick={() => setAnnual(false)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"}`}>
                  Monthly
                </button>
                <button onClick={() => setAnnual(true)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${annual ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"}`}>
                  Annual
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">−15%</span>
                </button>
              </div>
              <div className="inline-flex items-center glass-dark p-1 rounded-full gap-1">
                <button onClick={() => setCurrency("EUR")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${currency === "EUR" ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"}`}>
                  € EUR
                </button>
                <button onClick={() => setCurrency("USD")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${currency === "USD" ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"}`}>
                  $ USD
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Standard */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="glass-dark rounded-3xl p-8 flex flex-col transition-all duration-300"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{PRICING_STANDARD.name}</h3>
                <p className="text-slate-400 text-sm">{PRICING_STANDARD.desc}</p>
              </div>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-extrabold text-white">{currencySymbol}{getPrice(PRICING_STANDARD)}</span>
                <span className="text-slate-500 text-sm mb-1.5">/mo</span>
              </div>
              <Link href="/register?plan=standard" className="mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  Get Started
                </motion.button>
              </Link>
              <ul className="space-y-3 mt-auto">
                {PRICING_STANDARD.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl p-8 flex flex-col overflow-hidden transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)" }}
            >
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none animate-blob" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-7 right-7 px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 text-xs font-bold shadow-lg"
              >
                Most Popular
              </motion.div>

              <div className="relative mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{PRICING_PRO.name}</h3>
                <p className="text-emerald-200/70 text-sm">{PRICING_PRO.desc}</p>
              </div>
              <div className="relative flex items-end gap-1 mb-8">
                <span className="text-5xl font-extrabold text-white">{currencySymbol}{getPrice(PRICING_PRO)}</span>
                <span className="text-emerald-300/70 text-sm mb-1.5">/mo</span>
              </div>
              <Link href="/register?plan=pro" className="relative mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-full bg-white text-emerald-900 font-bold text-sm hover:bg-emerald-50 transition-colors shadow-xl"
                >
                  Get Pro Access
                </motion.button>
              </Link>
              <ul className="relative space-y-3 mt-auto">
                {PRICING_PRO.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-emerald-100">
                    <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-500 text-sm mt-8"
          >
            All plans include a 7-day free trial. No credit card required.
          </motion.p>
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-bold text-amber-400 uppercase tracking-widest mb-6"
            >
              <Star className="w-3 h-3 fill-amber-400" /> Reviews
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-5"
            >
              Loved by creators worldwide
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-lg font-extrabold text-white">4.9</span>
              <span className="text-slate-400 text-sm">from 1,670+ creators</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="glass-dark rounded-2xl p-6 flex flex-col transition-all duration-300 group cursor-default"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg`}>
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.role} · {r.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ───────────────────────────────────────────────────────────── */}
      <section id="blog" className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-bold text-slate-400 uppercase tracking-widest mb-6"
            >
              <BookOpen className="w-3 h-3" /> Blog
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              Insights to grow your presence
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOGS.map((b, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group glass-dark rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div className={`h-44 bg-gradient-to-br ${b.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <BookOpen className="w-10 h-10 text-white/90 relative z-10" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold glass-dark text-slate-300">
                      {b.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Timer className="w-3 h-3" /> {b.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{b.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">{b.date}</span>
                    <a href={b.slug} className="text-sm font-semibold text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-extrabold text-white mb-3"
            >
              Frequently asked questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400"
            >
              Still have questions?{" "}
              <a href="mailto:hello@postunivers.com" className="text-emerald-400 font-semibold hover:underline">
                Contact us
              </a>
            </motion.p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-dark rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <span className="text-sm font-semibold text-white pr-4 group-hover:text-emerald-400 transition-colors">
                    {faq.q}
                  </span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              No credit card required
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
              Your audience is waiting.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Start posting smarter.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join 1,670+ creators saving 10+ hours a week with PostUnivers.
              7-day free trial, cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register?plan=standard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-emerald-500 text-white font-bold px-10 py-4 rounded-full flex items-center gap-2 hover:bg-emerald-400 transition-colors text-base shadow-2xl shadow-emerald-500/30"
                >
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <a href="#pricing" className="text-slate-500 font-semibold text-sm hover:text-white transition-colors">
                See pricing →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold text-white tracking-tight">
                  Post<span className="text-emerald-400">Univers</span>
                </span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                AI social media scheduler for content creators. Schedule posts to TikTok, Instagram, YouTube & more from one dashboard.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                {[
                  ["Features", "#features"],
                  ["Pricing", "#pricing"],
                  ["How It Works", "#how-it-works"],
                  ["Dashboard", "/dashboard"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-white transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                {[
                  ["Blog", "#blog"],
                  ["Help Center", "#"],
                  ["Status", "#"],
                  ["Changelog", "#"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-white transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                {[
                  ["Privacy Policy", "/privacy"],
                  ["Terms of Service", "/terms"],
                  ["Refund Policy", "/refund"],
                  ["Contact", "mailto:hello@postunivers.com"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-white transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
            <p className="text-sm text-slate-600">
              © 2026 PostUnivers. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-slate-600 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
