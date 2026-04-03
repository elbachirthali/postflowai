"use client";

import { motion } from "framer-motion";
import { Plus, Settings2, Trash2, ShieldCheck, RefreshCw } from "lucide-react";

export default function AccountsPage() {
  const accounts = [
    { platform: "TikTok", handle: "@johnsmith.ai", status: "Connecté", bgColor: "bg-[#000000]", iconCol: "text-white" },
    { platform: "Instagram", handle: "@john.builds", status: "Connecté", bgColor: "bg-gradient-to-tr from-[#f09433] to-[#bc1888]", iconCol: "text-white" },
    { platform: "LinkedIn", handle: "John Smith", status: "Connecté", bgColor: "bg-[#0077b5]", iconCol: "text-white" },
    { platform: "Facebook", handle: "John Smith Builds", status: "Connecté", bgColor: "bg-[#1877F2]", iconCol: "text-white" },
    { platform: "Threads", handle: "@john.builds", status: "Connecté", bgColor: "bg-[#000000]", iconCol: "text-white" },
    { platform: "Pinterest", handle: "@johnsmith", status: "Connecté", bgColor: "bg-[#e60023]", iconCol: "text-white" },
    { platform: "X (Twitter)", handle: "@john_smith", status: "Connecté", bgColor: "bg-[#1DA1F2]", iconCol: "text-white" },
    { platform: "YouTube", handle: "John Smith Builds", status: "Réauthentification requise", bgColor: "bg-[#FF0000]", iconCol: "text-white", warning: true },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black mb-1">Comptes Connectés</h1>
          <p className="text-sm font-medium text-zinc-500">Gérez les profils sociaux autorisés pour la publication.</p>
        </div>
        <button className="bg-black hover:bg-zinc-800 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md">
          <Plus className="w-5 h-5" />
          Connecter un Nouveau
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc, i) => (
          <motion.div 
            key={acc.platform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-[200px] border shadow-sm hover:shadow-md transition-shadow ${acc.warning ? 'border-red-300' : 'border-zinc-200'}`}
          >
            {/* Background Accent */}
            <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-10 ${acc.bgColor}`} />
            
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${acc.bgColor}`}>
                  <span className="font-black text-lg text-white">{acc.platform[0]}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">{acc.platform}</h3>
                  <p className="text-sm font-semibold text-zinc-500">{acc.handle}</p>
                </div>
              </div>
              <button className="text-zinc-400 hover:text-black transition-colors p-2">
                <Settings2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 relative z-10">
              <div className="flex items-center gap-2">
                {acc.warning ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-bold text-red-500">{acc.status}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-600">{acc.status}</span>
                  </>
                )}
              </div>

              {acc.warning ? (
                <button className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors bg-red-50 px-2 py-1 rounded">
                  <RefreshCw className="w-4 h-4" /> Réauthentifier
                </button>
              ) : (
                <button className="text-sm font-bold text-zinc-400 hover:text-red-500 hover:bg-red-50 flex items-center gap-1 transition-colors px-2 py-1 rounded">
                  <Trash2 className="w-4 h-4" /> Déconnecter
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
