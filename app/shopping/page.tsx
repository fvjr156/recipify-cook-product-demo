"use client";

import { useTheme } from "@/context/ThemeContext";
import { ShoppingBasket, Signal, Wifi, BatteryFull, Utensils, Search, Heart, User, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ShoppingListPage() {
  const router = useRouter();
  const { theme } = useTheme();

  const categoriesData = [
    { title: "Produce", items: [{ name: "Garlic", qty: "2 cloves" }, { name: "Onion", qty: "1 medium" }] },
    { title: "Dairy", items: [{ name: "Eggs", qty: "6" }, { name: "Parmesan Cheese", qty: "1 cup" }, { name: "Heavy Cream", qty: "1/2 cup" }] },
    { title: "Pantry", items: [{ name: "Pasta", qty: "500g" }, { name: "Black Pepper", qty: "1 tsp" }] }
  ];

  // Dynamic Theme Styling Tokens
  const isDark = theme === "dark";
  const bgShell = isDark ? "bg-[#121412] text-[#E2E3DE]" : "bg-[#F7FBF4] text-[#191C19]";
  const borderShell = isDark ? "border-[#2E312E]" : "border-[#191C19]";
  const textSub = isDark ? "text-[#A4A9A4]" : "text-[#414941]";
  const bgNav = isDark ? "bg-[#121412] border-[#2E312E]" : "bg-[#F7FBF4] border-[#D1E8D1]";
  const bgNavPillActive = isDark ? "bg-[#2A3B2C] text-[#B8E6B9]" : "bg-[#D1E8D1] text-[#0E200E]";
  const cardTotal = isDark ? "bg-[#386B3B] text-white" : "bg-[#191C19] text-white";
  const buttonAdd = isDark ? "bg-[#1C1F1C] border-[#2E312E] text-white" : "bg-white border-gray-200 text-gray-800";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 font-sans transition-colors duration-300">
      <div className={`relative flex h-[800px] w-full max-w-[375px] flex-col overflow-hidden rounded-[3rem] shadow-2xl border-[8px] transition-all duration-300 ${bgShell} ${borderShell}`}>
        
        {/* Status Bar */}
        <div className={`absolute top-0 z-50 flex w-full items-center justify-between px-6 pt-3 text-[12px] font-bold ${isDark ? "bg-[#121412]/80" : "bg-[#F7FBF4]/80"} backdrop-blur-md`}>
          <span>9:41</span>
          <div className={`absolute h-6 w-24 left-1/2 -translate-x-1/2 rounded-full ${isDark ? "bg-[#2E312E]" : "bg-[#191C19]"}`} />
          <div className="flex items-center gap-1.5">
            <Signal size={14} /><Wifi size={14} /><BatteryFull size={16} />
          </div>
        </div>

        <header className="px-6 pt-14 pb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Shopping List</h1>
          <ShoppingBasket size={24} />
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-28 no-scrollbar">
          {categoriesData.map((group, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">{group.title}</h4>
              <div className="space-y-3">
                {group.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-[#386B3B] focus:ring-[#386B3B] bg-transparent" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${textSub}`}>{item.qty}</span>
                      <MoreVertical size={16} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              <div className={`mt-3 border-b ${isDark ? "border-[#2E312E]" : "border-gray-100"}`} />
            </div>
          ))}

          <div className={`mt-6 rounded-2xl p-4 flex justify-between items-center transition-colors duration-300 ${cardTotal}`}>
            <span className="text-sm font-medium opacity-70">Estimated total</span>
            <span className="text-lg font-bold">$20.5</span>
          </div>

          <button className={`mt-3 w-full rounded-2xl py-3.5 text-sm font-bold shadow-sm transition-transform active:scale-95 border ${buttonAdd}`}>
            Add missing items
          </button>
        </main>

        {/* Global Navigation Layout Bar */}
        <nav className={`absolute bottom-0 flex h-20 w-full items-center justify-around pb-4 px-4 border-t transition-colors duration-300 ${bgNav}`}>
          <div className={`flex flex-col items-center gap-1 cursor-pointer ${textSub}`} onClick={() => router.push("/feed")}>
            <div className="px-5 py-1 opacity-70"><Utensils size={22} /></div>
            <span className="text-[10px] font-medium opacity-70">Home</span>
          </div>

          <div className={`flex flex-col items-center gap-1 cursor-pointer ${textSub}`} onClick={() => router.push("/feed")}>
            <div className="px-5 py-1 opacity-70"><Search size={22} /></div>
            <span className="text-[10px] font-medium opacity-70">Scan</span>
          </div>

          <div className={`flex flex-col items-center gap-1 opacity-70 cursor-pointer ${textSub}`}>
            <div className="px-5 py-1"><Heart size={22} /></div>
            <span className="text-[10px] font-medium">Saved</span>
          </div>

          <div className="flex flex-col items-center gap-1 cursor-default">
            <div className={`rounded-full px-5 py-1 transition-all ${bgNavPillActive}`}>
              <ShoppingBasket size={22} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-bold">Cart</span>
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