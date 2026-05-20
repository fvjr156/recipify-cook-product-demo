"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { 
  Search, Utensils, Heart, User, 
  Sun, Moon, Star, Clock, ChefHat, Wifi, BatteryFull, 
  Signal, X, ShoppingBasket
} from "lucide-react";
import recipes from "@/data/recipes.json";

export default function HomeFeed() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const [recommended, ...popularRecipes] = recipes;

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera API unavailable. Defaulting to Mock Demo Canvas.");
      setIsScanning(true);
      return;
    }

    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera configuration failed: ", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  // Dynamic Theme Colors
  const isDark = theme === "dark";
  const bgShell = isDark ? "bg-[#121412] text-[#E2E3DE]" : "bg-[#F7FBF4] text-[#191C19]";
  const borderShell = isDark ? "border-[#2E312E]" : "border-[#191C19]";
  const bgHeader = isDark ? "bg-[#121412]/80" : "bg-[#F7FBF4]/80";
  const bgPillActive = isDark ? "bg-[#386B3B] text-white" : "bg-[#386B3B] text-white";
  const bgPillInactive = isDark ? "bg-[#222622] text-[#C2C9C2]" : "bg-[#D1E8D1] text-[#0E200E]";
  const bgCard = isDark ? "bg-[#1C1F1C]" : "bg-[#E8F3E8]";
  const textSub = isDark ? "text-[#A4A9A4]" : "text-[#414941]";
  const bgNav = isDark ? "bg-[#121412] border-[#2E312E]" : "bg-[#F7FBF4] border-[#D1E8D1]";
  const bgNavPillActive = isDark ? "bg-[#2A3B2C] text-[#B8E6B9]" : "bg-[#D1E8D1] text-[#0E200E]";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 font-sans transition-colors duration-300">
      <div className={`relative flex h-[800px] w-full max-w-[375px] flex-col overflow-hidden rounded-[3rem] shadow-2xl border-[8px] transition-all duration-300 ${bgShell} ${borderShell}`}>
        
        {/* Status Bar */}
        <div className={`absolute top-0 z-[60] flex w-full items-center justify-between px-6 pt-3 text-[12px] font-bold transition-colors duration-300 ${isScanning ? "text-white mix-blend-difference" : bgHeader} backdrop-blur-md`}>
          <span>9:41</span>
          <div className={`h-6 w-24 rounded-full ${isDark ? "bg-[#2E312E]" : "bg-[#191C19]"}`} />
          <div className="flex items-center gap-1.5">
            <Signal size={14} /><Wifi size={14} /><BatteryFull size={16} />
          </div>
        </div>

        {/* FRIDGE SCANNER OVERLAY */}
        {isScanning && (
          <div className="absolute inset-0 z-50 bg-neutral-900 flex flex-col">
            <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover opacity-70 bg-black" />
            <div className="absolute inset-0 flex flex-col items-center justify-between py-20">
              <div className="flex w-full justify-between px-6">
                <button onClick={stopCamera} className="rounded-full bg-black/40 p-2 text-white backdrop-blur-md"><X size={24} /></button>
                <h2 className="text-white font-bold text-lg">Scan Your Fridge</h2>
                <div className="w-10" />
              </div>

              <div className="relative h-64 w-64 border-2 border-white/20 rounded-3xl bg-black/10 backdrop-blur-[1px]">
                <div className="absolute top-0 left-0 h-8 w-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                <div className="absolute top-0 right-0 h-8 w-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                <div className="absolute top-0 left-0 w-full h-1 bg-white/80 shadow-[0_0_15px_white] animate-scan" />
                <div className="absolute top-10 left-4 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-md border border-white/20">Eggs</div>
                <div className="absolute bottom-20 right-4 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-md border border-white/20">Milk</div>
              </div>

              <button onClick={() => setIsScanning(false)} className="h-14 w-64 rounded-full bg-white text-[#191C19] font-bold shadow-lg transition-transform active:scale-95">
                Find Recipes
              </button>
            </div>
          </div>
        )}

        {/* Header content with dynamic styles */}
        <header className="px-6 pt-14 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#386B3B] text-white"><Utensils size={18} /></div>
              <h1 className="text-xl font-semibold tracking-tight">RecipifyCook</h1>
            </div>
            <Search size={22} className={textSub} />
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat, i) => (
              <button key={cat} className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors ${i === 2 ? bgPillActive : bgPillInactive}`}>{cat}</button>
            ))}
            {/* Dark mode context interactive switch toggle */}
            <button onClick={toggleTheme} className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${bgPillInactive}`}>
              {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
          {recommended && (
            <section className="mt-4">
              <h3 className="text-lg font-semibold mb-4">Recommended for you</h3>
              <div className={`flex p-3 rounded-[2rem] shadow-sm transition-colors duration-300 ${bgCard}`}>
                <img src={recommended.img} className="h-32 w-32 rounded-2xl object-cover" alt="" />
                <div className="ml-4 flex flex-col justify-center gap-1">
                  <h4 className="font-bold leading-tight">{recommended.name}</h4>
                  <p className={`text-xs flex items-center gap-2 ${textSub}`}><Clock size={12}/>{recommended.time} • <ChefHat size={12}/>{recommended.difficulty}</p>
                  <div className="flex mt-1 text-[#386B3B] gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#386B3B" color="#386B3B" />)}</div>
                </div>
              </div>
            </section>
          )}

          <section className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Popular recipes</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {popularRecipes.map((recipe) => (
                <div key={recipe.id} className="min-w-[160px] flex-shrink-0">
                  <div className={`relative h-44 w-full overflow-hidden rounded-[2rem] ${isDark ? "bg-[#222622]" : "bg-[#D1E8D1]"}`}>
                    <img src={recipe.img} className="h-full w-full object-cover" alt="" />
                  </div>
                  <h5 className="text-sm font-bold truncate mt-2 px-1">{recipe.name}</h5>
                  <p className={`text-[11px] px-1 ${textSub}`}>{recipe.time} • {recipe.difficulty}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Global Bottom Navbar layout configuration */}
        <nav className={`absolute bottom-0 flex h-20 w-full items-center justify-around pb-4 px-4 border-t transition-colors duration-300 ${bgNav}`}>
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={stopCamera}>
            <div className={`rounded-full px-5 py-1 transition-all ${!isScanning ? bgNavPillActive : textSub}`}>
              <Utensils size={22} strokeWidth={!isScanning ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] ${!isScanning ? "font-bold" : "font-medium opacity-70"}`}>Home</span>
          </div>

          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={startCamera}>
            <div className={`rounded-full px-5 py-1 transition-all ${isScanning ? bgNavPillActive : textSub}`}>
              <Search size={22} strokeWidth={isScanning ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] ${isScanning ? "font-bold" : "font-medium opacity-70"}`}>Scan</span>
          </div>

          <div className={`flex flex-col items-center gap-1 opacity-70 cursor-pointer ${textSub}`}>
            <div className="px-5 py-1"><Heart size={22} /></div>
            <span className="text-[10px] font-medium">Saved</span>
          </div>

          <div className={`flex flex-col items-center gap-1 cursor-pointer ${textSub}`} onClick={() => router.push("/shopping")}>
            <div className="px-5 py-1"><ShoppingBasket size={22} /></div>
            <span className="text-[10px] font-medium opacity-70">Cart</span>
          </div>

          <div className={`flex flex-col items-center gap-1 opacity-70 cursor-pointer ${textSub}`}>
            <div className="px-5 py-1"><User size={22} /></div>
            <span className="text-[10px] font-medium">Profile</span>
          </div>
          <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-20 rounded-full ${isDark ? "bg-white/20" : "bg-[#191C19]/20"}`} />
        </nav>
      </div>
    </div>
  );
}