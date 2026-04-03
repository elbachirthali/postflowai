"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Video, Instagram, Twitter, Youtube, Linkedin, Facebook, AtSign, Image as PinIcon } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    { label: "Vues Totales", value: "1.2M", change: "+24.5%", trend: "up" },
    { label: "Taux d'Engagement", value: "8.4%", change: "+1.2%", trend: "up" },
    { label: "Clics sur les Liens", value: "45.2K", change: "-2.4%", trend: "down" },
    { label: "Nouveaux Abonnés", value: "12.8K", change: "+45.2%", trend: "up" },
  ];

  const platforms = [
    { name: "TikTok", icon: Video, views: "850K", engage: "12.4%", posts: 14, color: "tiktok-gradient", width: "85%" },
    { name: "Instagram", icon: Instagram, views: "240K", engage: "5.2%", posts: 14, color: "instagram-gradient", width: "24%" },
    { name: "LinkedIn", icon: Linkedin, views: "120K", engage: "8.1%", posts: 8, color: "linkedin-color", width: "12%" },
    { name: "YouTube", icon: Youtube, views: "85K", engage: "9.1%", posts: 4, color: "youtube-color", width: "8%" },
    { name: "Facebook", icon: Facebook, views: "45K", engage: "4.5%", posts: 10, color: "facebook-color", width: "4%" },
    { name: "X (Twitter)", icon: Twitter, views: "25K", engage: "3.4%", posts: 24, color: "x-color", width: "2%" },
    { name: "Pinterest", icon: PinIcon, views: "15K", engage: "6.2%", posts: 5, color: "pinterest-color", width: "1%" },
    { name: "Threads", icon: AtSign, views: "5K", engage: "10.0%", posts: 12, color: "x-color", width: "0.5%" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black mb-1">Analytique de Performance</h1>
          <p className="text-sm text-zinc-500">Suivez votre croissance et engagement sur toutes les plateformes.</p>
        </div>
        <div className="bg-zinc-100 rounded-lg p-1 flex border border-zinc-200">
          <button className="px-4 py-1.5 text-sm font-bold rounded-md bg-white text-black shadow-sm">30 Derniers Jours</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-md text-zinc-500 hover:text-black transition">Cette Année</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded-md text-zinc-500 hover:text-black transition">Tout le Temps</button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-zinc-200 p-6 rounded-2xl relative overflow-hidden shadow-sm"
          >
            <p className="text-sm font-bold text-zinc-500 mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black text-black mb-4">{stat.value}</h3>
            <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
              {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {stat.change} vs période précédente
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white border border-zinc-200 p-6 rounded-2xl min-h-[400px] flex flex-col shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-black">Vues au Fil du Temps</h2>
            <button className="text-sm font-semibold text-emerald-600 hover:underline">Exporter CSV</button>
          </div>
          {/* Mock Chart Area */}
          <div className="flex-1 border-b border-l border-zinc-200 relative flex items-end ml-8 mb-8 pb-4">
            <div className="absolute -left-10 top-0 h-full flex flex-col justify-between text-xs font-semibold text-zinc-400 pb-4">
              <span>100K</span>
              <span>75K</span>
              <span>50K</span>
              <span>25K</span>
              <span>0</span>
            </div>
            {/* Mock bars */}
            <div className="w-full h-full flex items-end justify-between px-2 gap-2">
              {[40, 60, 45, 80, 50, 90, 100, 70, 85, 60, 40, 75, 95, 65].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + (i * 0.05), type: "spring" }}
                  className="w-full bg-emerald-500 rounded-t-sm group relative"
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white font-bold text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10 transition-opacity pointer-events-none">
                    {h * 1000} vues
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Platform Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-zinc-200 shadow-sm p-6 rounded-2xl"
        >
          <h2 className="text-lg font-bold text-black mb-6">Répartition par Plateforme</h2>
          <div className="space-y-6">
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${p.color} shadow-sm`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-zinc-800 text-sm">{p.name}</span>
                    <span className="text-sm font-bold text-black">{p.views}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: p.width }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className={`h-full ${p.color}`} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
