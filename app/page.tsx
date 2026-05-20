"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { ChefHat, Sun, Moon, BatteryFull, Wifi, Signal } from "lucide-react";

export default function Onboarding() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Dynamic Theme Tokens
  const isDark = theme === "dark";
  const bgShell = isDark ? "bg-[#121412] text-[#E2E3DE]" : "bg-[#F7FBF4] text-[#191C19]";
  const borderShell = isDark ? "border-[#2E312E]" : "border-[#191C19]";
  const bgIcon = isDark ? "bg-[#222622] text-[#B8E6B9]" : "bg-[#D1E8D1] text-[#386B3B]";
  const textSub = isDark ? "text-[#A4A9A4]" : "text-[#414941]";
  const btnPrimary = isDark ? "bg-[#386B3B] text-white" : "bg-[#191C19] text-white";
  const btnSecondary = isDark ? "bg-[#222622] border-[#2E312E] text-[#E2E3DE]" : "bg-white border-gray-200 text-[#191C19]";
  const bgGrid = isDark ? "bg-[#1C1F1C]" : "bg-[#E8F3E8]";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 font-sans transition-colors duration-300">
      <div className={`relative flex h-[800px] w-full max-w-[375px] flex-col overflow-hidden rounded-[3rem] shadow-2xl border-[8px] transition-all duration-300 ${bgShell} ${borderShell}`}>
        
        {/* Hardware Status Bar */}
        <div className="absolute top-0 z-50 flex w-full items-center justify-between px-6 pt-3 text-[12px] font-bold transition-colors duration-300">
          <span>9:41</span>
          <div className={`h-6 w-24 rounded-full ${isDark ? "bg-[#2E312E]" : "bg-[#191C19]"}`} />
          <div className="flex items-center gap-1.5">
            <Signal size={14} /><Wifi size={14} /><BatteryFull size={16} />
          </div>
        </div>

        {/* 1. THEME TOGGLE (Top Right) */}
        <div className="absolute top-12 right-6 z-50">
          <button 
            onClick={toggleTheme} 
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-90 ${isDark ? "bg-[#222622] text-yellow-400" : "bg-[#D1E8D1] text-[#191C19]"}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Main Onboarding Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-10 text-center pt-20">
          {/* M3 Styled Branding */}
          <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] shadow-sm transition-colors duration-300 ${bgIcon}`}>
            <ChefHat size={40} />
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Recipify<span className="opacity-40">Cook</span>
          </h1>
          
          <div className="mt-12 space-y-4">
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              Discover & Cook <br /> Amazing Recipes
            </h2>
            <p className={`text-lg font-medium leading-relaxed ${textSub}`}>
              The smartest way to <br /> find your next favorite meal.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-16 w-full space-y-4">
            <button 
              onClick={() => router.push("/feed")}
              className={`h-14 w-full rounded-full font-bold text-sm shadow-md transition-all active:scale-95 ${btnPrimary}`}
            >
              Get Started
            </button>
            <button 
              onClick={() => router.push("/feed")}
              className={`h-14 w-full rounded-full border font-bold text-sm transition-all active:scale-95 ${btnSecondary}`}
            >
              Log In
            </button>
          </div>

          <p className={`mt-8 text-xs font-bold transition-colors ${textSub}`}>
            Don't have an account? <span className={`underline cursor-pointer ${isDark ? "text-white" : "text-[#386B3B]"}`}>Sign Up</span>
          </p>
        </div>

        {/* Decorative Hardware Elements (Bottom Home Indicator) */}
        <div className="relative h-20 w-full mt-auto">
           {/* Faux Gallery Mesh Background */}
           <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 gap-3 p-4 opacity-20">
              <div className={`h-24 rounded-2xl ${bgGrid}`} />
              <div className={`h-24 rounded-2xl ${bgGrid}`} />
              <div className={`h-24 rounded-2xl ${bgGrid}`} />
              <div className={`h-24 rounded-2xl ${bgGrid}`} />
           </div>
           <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-24 rounded-full transition-colors ${isDark ? "bg-white/20" : "bg-black/10"}`} />
        </div>
      </div>
    </div>
  );
}