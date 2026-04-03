"use client";

import { motion } from "framer-motion";
import { Plus, TrendingUp, Users, Eye, Zap, ArrowUpRight, BarChart3, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const stats = [
    { label: "Vues Totales", value: "842.5K", change: "+14.2%", icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Engagement", value: "6.8%", change: "+2.1%", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Portée des Comptes", value: "124K", change: "+8.4%", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Publications", value: "48", change: "+12", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 mb-2">Bon retour, John ! 👋</h1>
          <p className="text-zinc-500 font-medium">Voici ce qui se passe avec vos comptes sociaux aujourd'hui.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Link href="/dashboard/editor">
            <button className="bg-black hover:bg-zinc-800 text-white font-bold px-6 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-md">
              <Plus className="w-5 h-5" />
              Créer un Post
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 relative overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-zinc-500 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-black mb-2">{stat.value}</h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change} cette semaine
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} border border-[#e4e4e7] flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity & Next Scheduled */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 min-h-[400px]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-zinc-900">Performance des Posts Récents</h2>
            <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">Voir Tout</button>
          </div>
          
          <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-zinc-400" />
            </div>
            <p className="text-zinc-500 font-bold">Connectez vos comptes sociaux pour voir les données</p>
            <p className="text-sm text-zinc-400 mt-1 mb-4">Suivez TikTok, LinkedIn, YouTube et plus.</p>
            <Link href="/dashboard/accounts">
              <button className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold rounded-lg transition-colors text-sm shadow-md">
                Connecter les Comptes
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-zinc-900">Planifié à Venir</h2>
            <Clock className="w-5 h-5 text-zinc-400" />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 relative overflow-hidden group hover:shadow-sm transition-all cursor-pointer">
              <div className="w-1 h-full bg-emerald-500 absolute left-0 top-0"></div>
              <div className="flex justify-between items-start mb-2 mt-1">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded inline-flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Aujourd'hui, 14h00
                </span>
                <span className="text-xs font-semibold text-zinc-400">Dans 2h</span>
              </div>
              <p className="text-sm text-zinc-800 font-bold line-clamp-2 mt-2 leading-relaxed">
                Le secret pour multiplier par 10 votre réseau professionnel en 2026 🚀
              </p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-200">
                <span className="w-6 h-6 rounded bg-[#0077b5] text-white flex items-center justify-center text-[10px] shadow-sm font-bold">in</span>
                <span className="w-6 h-6 rounded bg-[#1877F2] text-white flex items-center justify-center text-[10px] shadow-sm font-bold">f</span>
                <span className="w-6 h-6 rounded bg-[#000000] text-white flex items-center justify-center text-[10px] shadow-sm font-bold">𝕏</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
