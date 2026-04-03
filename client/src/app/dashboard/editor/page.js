"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Image as ImageIcon, 
  Video, 
  Sparkles, 
  Globe, 
  Calendar, 
  CheckCircle2, 
  Type, 
  Send,
  Twitter,
  Instagram,
  Youtube,
  Trash2,
  Linkedin,
  Facebook,
  AtSign
} from "lucide-react";
import { PenSquare } from "lucide-react";

// Add all new platforms
const PLATFORMS = [
  { id: "TIKTOK", name: "TikTok", icon: Video, color: "tiktok-gradient" },
  { id: "INSTAGRAM", name: "Instagram", icon: Instagram, color: "instagram-gradient" },
  { id: "YOUTUBE", name: "YouTube", icon: Youtube, color: "youtube-color" },
  { id: "TWITTER", name: "X (Twitter)", icon: Twitter, color: "x-color" },
  { id: "LINKEDIN", name: "LinkedIn", icon: Linkedin, color: "linkedin-color" },
  { id: "FACEBOOK", name: "Facebook", icon: Facebook, color: "facebook-color" },
  { id: "THREADS", name: "Threads", icon: AtSign, color: "x-color" },
  { id: "PINTEREST", name: "Pinterest", icon: ImageIcon, color: "pinterest-color" }
];

export default function PostEditor() {
  const [baseIdea, setBaseIdea] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["TIKTOK", "INSTAGRAM", "LINKEDIN"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [captions, setCaptions] = useState(null);
  const [activeTab, setActiveTab] = useState("LINKEDIN");
  
  // Drag and Drop States
  const [isDragging, setIsDragging] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const togglePlatform = (id) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const processFile = (file) => {
    if (!file) return;
    setMediaFile(file);
    const url = URL.createObjectURL(file);
    setMediaPreview(url);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const clearMedia = () => {
    setMediaFile(null);
    if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    setMediaPreview(null);
  };

  const handleGenerate = () => {
    if (!baseIdea) return;
    setIsGenerating(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      setCaptions({
        TIKTOK: {
          text: `POV : Tu viens de découvrir l'astuce ultime 🤯\n\nPersonne n'en parle encore mais ça a tout changé pour moi...\n\n#astuce #viral #fyp`,
          charLimit: 2200
        },
        INSTAGRAM: {
          text: `✨ J'aurais aimé savoir ça il y a 3 ans...\n\nLa plus grande erreur que les gens font c'est de penser qu'ils doivent tout faire parfaitement. La vérité est bien plus simple 👇\n\nMets un 🚀 si tu es d'accord !\n\n#motivation #croissance #mindset #entrepreneur`,
          charLimit: 2200
        },
        LINKEDIN: {
          text: `La plupart des professionnels se trompent complètement sur ce sujet stratégique. 💡\n\nJ'ai analysé 100 entreprises leaders et j'ai trouvé 3 modèles en commun :\n\n1️⃣ La préparation l'emporte sur l'intuition.\n2️⃣ Les systèmes priment sur les objectifs.\n3️⃣ La clarté bat la complexité.\n\nQuelle est votre approche face à ce défi dans votre entreprise ?\n\n#leadership #strategie #entrepreneuriat #croissance`,
          charLimit: 3000
        },
        TWITTER: {
          text: `L'algorithme ne travaille pas contre toi.\n\nTes accroches ne sont tout simplement pas assez percutantes.\n\nArrête de blâmer la plateforme et commence à étudier la psychologie.`,
          charLimit: 280
        },
        FACEBOOK: {
          text: `Voici quelque chose dont nous devons absolument parler aujourd'hui 😊\n\nC'est fou de voir à quel point les choses évoluent vite. \nQue pensez-vous de ce changement récent ? Laissez votre avis en commentaire ! 👇`,
          charLimit: 5000
        },
        THREADS: {
          text: `Petit rappel du jour : la constance bat l'intensité. Chaque petit pas compte.\n\nVous êtes d'accord ?`,
          charLimit: 500
        },
        PINTEREST: {
          text: `Enregistre cette idée pour plus tard ! 📌\nDécouvre comment transformer ta routine dès aujourd'hui.\n\n#Inspiration #AstucesPratiques #IdéeDuJour`,
          charLimit: 500
        }
      });
      setIsGenerating(false);
      setActiveTab(selectedPlatforms[0]);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 relative">
      {/* LEFT PANEL: Idea & Settings */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-[45%] lg:w-[40%] flex flex-col gap-6"
      >
        <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-black text-black mb-6 flex items-center gap-2">
            <PenSquare className="w-5 h-5 text-emerald-500" />
            Composer
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-bold text-zinc-900 mb-3">Plateformes Cibles</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((platform) => {
                const isSelected = selectedPlatforms.includes(platform.id);
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all border font-semibold text-xs ${
                      isSelected 
                        ? "bg-black border-black text-white shadow-md relative" 
                        : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-black shadow-sm"
                    }`}
                  >
                    {isSelected && (
                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    )}
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-zinc-500'}`} />
                    {platform.name}
                  </button>
                );
              })}
            </div>
            {selectedPlatforms.length === 0 && (
               <p className="text-xs text-red-500 mt-2 font-medium">Veuillez sélectionner au moins une plateforme.</p>
            )}
          </div>

          <div className="mb-6 flex-1 flex flex-col min-h-[150px]">
            <label className="block text-sm font-bold text-zinc-900 mb-3 flex justify-between">
              <span>Concept de Base / Script</span>
              <span className="text-xs font-semibold text-emerald-600 cursor-pointer hover:underline">Modèles</span>
            </label>
            <textarea 
              value={baseIdea}
              onChange={(e) => setBaseIdea(e.target.value)}
              placeholder="De quoi voulez-vous parler ? (ex. 3 astuces de productivité pour entrepreneurs...)"
              className="flex-1 w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none font-medium text-sm transition-shadow"
            />
          </div>

          {/* Media Upload Zone */}
          {!mediaFile ? (
            <div 
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer relative group ${
                isDragging 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                onChange={handleFileSelect}
                accept="video/mp4,video/quicktime,image/jpeg,image/png"
              />
              <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Video className={`w-5 h-5 ${isDragging ? 'text-emerald-500' : 'text-zinc-400'}`} />
              </div>
              <p className={`text-sm font-bold ${isDragging ? 'text-emerald-600' : 'text-zinc-700'}`}>
                {isDragging ? 'Déposez ici !' : 'Glissez-déposez un média ici'}
              </p>
              <p className="text-xs font-medium text-zinc-400 mt-1">Images ou vidéos jusqu'à 1 Go</p>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100 group aspect-[16/9] flex items-center justify-center">
              {mediaFile.type.startsWith('image/') ? (
                <img src={mediaPreview} alt="Aperçu" className="w-full h-full object-cover" />
              ) : (
                <video src={mediaPreview} className="w-full h-full object-cover" controls playsInline />
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={clearMedia}
                  className="bg-white hover:bg-red-50 text-red-500 p-3 rounded-full shadow-lg transition-transform hover:scale-110 border border-zinc-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-2 shadow-sm">
                {mediaFile.type.startsWith('image/') ? <ImageIcon className="w-3 h-3 text-white"/> : <Video className="w-3 h-3 text-white"/>}
                <span className="truncate max-w-[150px]">{mediaFile.name}</span>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button Stick to Bottom */}
        <button 
          onClick={handleGenerate}
          disabled={!baseIdea || selectedPlatforms.length === 0 || isGenerating}
          className={`w-full py-4 rounded-2xl font-black text-white flex items-center justify-center gap-2 transition-all shadow-md
            ${isGenerating ? 'bg-zinc-800 cursor-wait' : 'bg-emerald-500 hover:bg-emerald-600 hover:scale-[1.02]'}
            disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none disabled:bg-zinc-300
          `}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Générer pour {selectedPlatforms.length} {selectedPlatforms.length === 1 ? 'Plateforme' : 'Plateformes'}
            </>
          )}
        </button>
      </motion.div>

      {/* RIGHT PANEL: AI Generated Results */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-[55%] lg:w-[60%] bg-white border border-zinc-200 shadow-sm rounded-2xl flex flex-col overflow-hidden"
      >
        {!captions ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-zinc-50/50">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-zinc-200 flex items-center justify-center mb-6">
               <Sparkles className="w-10 h-10 text-emerald-200" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">En Attente d'Instructions</h3>
            <p className="text-sm font-medium text-zinc-500 max-w-sm">Tapez votre concept à gauche et cliquez sur générer. L'IA créera des légendes professionnelles pour chaque réseau social.</p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-zinc-200 bg-zinc-50 no-scrollbar">
              {selectedPlatforms.map(platformId => {
                const platform = PLATFORMS.find(p => p.id === platformId);
                const isActive = activeTab === platformId;
                return (
                  <button
                    key={platformId}
                    onClick={() => setActiveTab(platformId)}
                    className={`flex-1 min-w-[120px] py-4 text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2
                      ${isActive ? 'border-black text-black bg-white' : 'border-transparent text-zinc-400 hover:text-black hover:bg-zinc-100/50'}
                    `}
                  >
                    <platform.icon className={`w-4 h-4 ${isActive ? 'text-black' : ''}`} />
                    {platform.name}
                  </button>
                );
              })}
            </div>

            {/* Editor Area */}
            <div className="flex-1 p-6 flex flex-col relative">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-600"/> Généré par IA
                </span>
                <span className="text-xs font-bold text-zinc-400">
                  {captions[activeTab]?.text.length || 0} / {captions[activeTab]?.charLimit} car.
                </span>
              </div>
              
              <textarea 
                value={captions[activeTab]?.text || ''}
                onChange={(e) => setCaptions({...captions, [activeTab]: { ...captions[activeTab], text: e.target.value }})}
                className="flex-1 w-full bg-transparent text-black resize-none focus:outline-none text-base leading-relaxed p-0 border-0"
                placeholder="Commencez à écrire votre légende..."
              />
              
              {/* Action Bar */}
              <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <button className="text-sm font-bold text-zinc-500 hover:text-black flex items-center gap-2 transition-colors">
                   Régénérer
                </button>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-white text-zinc-700 border border-zinc-200 hover:border-black hover:text-black hover:bg-zinc-50 transition-colors shadow-sm">
                    <Calendar className="w-4 h-4" /> Planifier
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-black text-white hover:bg-zinc-800 transition-colors shadow-md">
                    <Send className="w-4 h-4" /> Publier Seulement {PLATFORMS.find(p=>p.id===activeTab)?.name}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
