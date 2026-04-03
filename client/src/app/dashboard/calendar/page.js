"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Video, Instagram, Twitter, Youtube, Linkedin, Facebook } from "lucide-react";

export default function Calendar() {
  // Mock calendar data
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const currentDay = 15;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black mb-1">Calendrier de Contenu</h1>
          <p className="text-sm font-medium text-zinc-500">Planifiez et gérez vos publications sur toutes les plateformes.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-lg p-1">
            <button className="px-4 py-1.5 text-sm font-bold rounded-md bg-white text-black shadow-sm">Mois</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md text-zinc-500 hover:text-black transition-colors">Semaine</button>
          </div>
          
          <div className="flex items-center gap-2 bg-white border border-zinc-200 shadow-sm px-3 py-1.5 rounded-lg">
            <button className="p-1 hover:bg-zinc-100 rounded-md transition-colors"><ChevronLeft className="w-4 h-4 text-zinc-600" /></button>
            <span className="text-sm font-bold text-black min-w-[100px] text-center">Octobre 2026</span>
            <button className="p-1 hover:bg-zinc-100 rounded-md transition-colors"><ChevronRight className="w-4 h-4 text-zinc-600" /></button>
          </div>
        </div>
      </div>

      <div className="bg-white flex-1 rounded-2xl overflow-hidden flex flex-col border border-zinc-200 shadow-sm">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-zinc-200 bg-zinc-50">
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-bold tracking-wider text-zinc-500 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-zinc-50/50">
          {days.map((day, i) => {
            const isCurrentMonth = day >= 1 && day <= 31;
            const isToday = day === currentDay;
            const displayDay = isCurrentMonth ? day : (day > 31 ? day - 31 : day + 28);
            
            return (
              <div 
                key={i} 
                className={`border-r border-b border-zinc-200 min-h-[100px] p-2 transition-colors hover:bg-zinc-50
                  ${!isCurrentMonth ? 'opacity-40 bg-zinc-100' : 'bg-white'}
                  ${isToday ? 'bg-emerald-50' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold
                    ${isToday ? 'bg-emerald-500 text-white shadow-md' : 'text-zinc-600'}
                  `}>
                    {displayDay}
                  </span>
                </div>

                {/* Mock Events */}
                {day === 15 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-1 space-y-1">
                    <div className="text-xs px-2 py-1 rounded-md bg-white border border-zinc-200 text-zinc-800 font-semibold truncate flex items-center gap-1.5 shadow-sm hover:border-emerald-300 transition-colors cursor-pointer">
                      <Linkedin className="w-3 h-3 text-[#0077b5]" />
                      Astuce Productivité x10
                    </div>
                  </motion.div>
                )}
                
                {day === 18 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-1 space-y-1">
                    <div className="text-xs px-2 py-1 rounded-md bg-white border border-zinc-200 text-zinc-800 font-semibold truncate flex items-center gap-1.5 shadow-sm hover:border-emerald-300 transition-colors cursor-pointer">
                      <Instagram className="w-3 h-3 text-pink-500" />
                      Dans les coulisses
                    </div>
                    <div className="text-xs px-2 py-1 rounded-md bg-white border border-zinc-200 text-zinc-800 font-semibold truncate flex items-center gap-1.5 shadow-sm hover:border-emerald-300 transition-colors cursor-pointer">
                      <Facebook className="w-3 h-3 text-[#1877F2]" />
                      Nouveau Produit Live
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
