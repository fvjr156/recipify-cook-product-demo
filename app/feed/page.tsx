"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import {
  Search,
  Utensils,
  Heart,
  User,
  Sun,
  Moon,
  Star,
  Clock,
  ChefHat,
  Wifi,
  BatteryFull,
  Signal,
  X,
  ShoppingBasket,
  Edit3,
  FileText,
  Camera,
} from "lucide-react";
import recipes from "@/data/recipes.json";

export default function HomeFeed() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Modals & Navigation Views States
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isManualEntryActive, setIsManualEntryActive] = useState(false);

  // Manual Ingredients State
  const [manualIngredients, setManualIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const [recommended, ...popularRecipes] = recipes;

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [aiInstructions, setAiInstructions] = useState({
    quantityContext: "",
    dietaryNotes: "",
    excludeIngredients: "",
  });

  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrParsedCount, setOcrParsedCount] = useState(0);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    setIsInputModalOpen(false);
    setIsManualEntryActive(false);
    setIsScanning(true);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera API unavailable. Defaulting to Mock Demo Canvas.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
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
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsScanning(false);
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !manualIngredients.includes(inputValue.trim())) {
      setManualIngredients([...manualIngredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setManualIngredients(manualIngredients.filter((_, i) => i !== index));
  };

  const closeAllSubViews = () => {
    stopCamera();
    setIsManualEntryActive(false);
    setIsInputModalOpen(false);
  };

  const startOcrCamera = async () => {
    setIsOcrScanning(true);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera API unavailable. Defaulting to Mock Receipt Frame.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("OCR Camera stream configuration dropped: ", err);
    }
  };

  const handleOcrCapture = () => {
    // Simulate text extraction by appending raw parsed items into our manual state list
    const mockReceiptItems = [
      "Tomatoes",
      "Chicken Breast",
      "Olive Oil",
      "Garlic",
    ];

    // Add missing items to prevent duplicate rendering keys
    const updatedList = [...manualIngredients];
    mockReceiptItems.forEach((item) => {
      if (!updatedList.includes(item)) updatedList.push(item);
    });

    setManualIngredients(updatedList);
    setOcrParsedCount(mockReceiptItems.length);

    // Cleanly route the user straight to the opaque manual entry page to inspect their results
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsOcrScanning(false);
    setIsManualEntryActive(true);
  };

  // Dynamic Theme Colors
  const isDark = theme === "dark";
  const bgShell = isDark
    ? "bg-[#121412] text-[#E2E3DE]"
    : "bg-[#F7FBF4] text-[#191C19]";
  const borderShell = isDark ? "border-[#2E312E]" : "border-[#191C19]";
  const bgHeader = isDark ? "bg-[#121412]/80" : "bg-[#F7FBF4]/80";
  const bgPillActive = isDark
    ? "bg-[#386B3B] text-white"
    : "bg-[#386B3B] text-white";
  const bgPillInactive = isDark
    ? "bg-[#222622] text-[#C2C9C2]"
    : "bg-[#D1E8D1] text-[#0E200E]";
  const bgCard = isDark ? "bg-[#1C1F1C]" : "bg-[#E8F3E8]";
  const textSub = isDark ? "text-[#A4A9A4]" : "text-[#414941]";
  const bgNav = isDark
    ? "bg-[#121412] border-[#2E312E]"
    : "bg-[#F7FBF4] border-[#D1E8D1]";
  const bgNavPillActive = isDark
    ? "bg-[#2A3B2C] text-[#B8E6B9]"
    : "bg-[#D1E8D1] text-[#0E200E]";
  const bgModal = isDark ? "bg-[#1C1F1C]" : "bg-white";

  const isTabActive = isScanning || isManualEntryActive || isInputModalOpen;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 font-sans transition-colors duration-300">
      <div
        className={`relative flex h-[800px] w-full max-w-[375px] flex-col overflow-hidden rounded-[3rem] shadow-2xl border-[8px] transition-all duration-300 ${bgShell} ${borderShell}`}
      >
        {/* Status Bar */}
        <div
          className={`absolute top-0 z-[60] flex w-full items-center justify-between px-6 pt-3 text-[12px] font-bold transition-colors duration-300 ${isScanning ? "text-white mix-blend-difference" : bgHeader} backdrop-blur-md`}
        >
          <span>9:41</span>
          <div
            className={`absolute h-6 w-24 left-1/2 -translate-x-1/2 rounded-full ${isDark ? "bg-[#2E312E]" : "bg-[#191C19]"}`}
          />
          <div className="flex items-center gap-1.5">
            <Signal size={14} />
            <Wifi size={14} />
            <BatteryFull size={16} />
          </div>
        </div>

        {/* METHOD SELECTION MODAL (BOTTOM SHEET) */}
        {isInputModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col justify-end">
            <div
              className={`w-full rounded-t-[2.5rem] p-6 shadow-xl transform transition-transform duration-300 ${bgModal}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Find a Recipe</h3>
                <button
                  onClick={() => setIsInputModalOpen(false)}
                  className={`p-1.5 rounded-full ${bgPillInactive}`}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => {
                    setIsInputModalOpen(false);
                    setIsManualEntryActive(true);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-semibold transition-all active:scale-[0.99] ${bgPillInactive}`}
                >
                  <Edit3 size={20} className="text-[#386B3B]" /> Manual
                  ingredient entry
                </button>
                {/* Update this button inside your selection modal block */}
                <button
                  onClick={() => {
                    setIsInputModalOpen(false);
                    setIsOcrScanning(true);
                    startOcrCamera();
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-semibold transition-all active:scale-[0.99] ${bgPillInactive}`}
                >
                  <FileText size={20} className="text-[#386B3B]" /> Grocery
                  receipt scanning (OCR)
                </button>
                <button
                  onClick={startCamera}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-semibold transition-all active:scale-[0.99] ${bgPillInactive}`}
                >
                  <Camera size={20} className="text-[#386B3B]" /> AI
                  Refrigerator photo scan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FRIDGE SCANNER VIEW */}
        {isScanning && (
          <div className="absolute inset-0 z-50 bg-neutral-900 flex flex-col">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover opacity-70 bg-black"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-between py-20">
              <div className="flex w-full justify-between px-6">
                <button
                  onClick={stopCamera}
                  className="rounded-full bg-black/40 p-2 text-white backdrop-blur-md"
                >
                  <X size={24} />
                </button>
                <h2 className="text-white font-bold text-lg">
                  Scan Your Fridge
                </h2>
                <div className="w-10" />
              </div>
              <div className="relative h-64 w-64 border-2 border-white/20 rounded-3xl bg-black/10 backdrop-blur-[1px]">
                <div className="absolute top-0 left-0 h-8 w-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                <div className="absolute top-0 right-0 h-8 w-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                <div className="absolute top-0 left-0 w-full h-1 bg-white/80 shadow-[0_0_15px_white] animate-scan" />
              </div>
              <button
                onClick={() => setIsScanning(false)}
                className="h-14 w-64 rounded-full bg-white text-[#191C19] font-bold shadow-lg transition-transform active:scale-95"
              >
                Find Recipes
              </button>
            </div>
          </div>
        )}

        {/* GROCERY RECEIPT SCANNING OVERLAY (OCR CAMERA) */}
        {isOcrScanning && (
          <div className="absolute inset-0 z-50 bg-neutral-900 flex flex-col">
            {/* Live Video canvas placeholder */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover opacity-70 bg-black"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-between py-20 px-6">
              {/* Top action header */}
              <div className="flex w-full justify-between items-center">
                <button
                  onClick={() => {
                    if (videoRef.current && videoRef.current.srcObject) {
                      const stream = videoRef.current.srcObject as MediaStream;
                      stream.getTracks().forEach((track) => track.stop());
                    }
                    setIsOcrScanning(false);
                  }}
                  className="rounded-full bg-black/40 p-2 text-white backdrop-blur-md"
                >
                  <X size={24} />
                </button>
                <h2 className="text-white font-bold text-lg">Scan Receipt</h2>
                <div className="w-10" /> {/* Symmetry spacer alignment */}
              </div>

              {/* Crosshair guidelines styled for a long document format */}
              <div className="relative h-96 w-64 border border-dashed border-white/40 rounded-xl bg-black/5 backdrop-blur-[0.5px]">
                {/* Dynamic bright neon corner brackets */}
                <div className="absolute top-0 left-0 h-6 w-6 border-t-4 border-l-4 border-[#B8E6B9] rounded-tl-lg" />
                <div className="absolute top-0 right-0 h-6 w-6 border-t-4 border-r-4 border-[#B8E6B9] rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-[#B8E6B9] rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-[#B8E6B9] rounded-br-lg" />

                {/* Helper instruction callout flag */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 text-center text-white/60 text-xs font-semibold leading-relaxed">
                  Position receipt text neatly within this box frame
                </div>
              </div>

              {/* Shutter snapshot trigger button assembly */}
              <div className="flex flex-col items-center gap-3 w-full">
                <button
                  onClick={handleOcrCapture}
                  className="h-16 w-16 rounded-full border-4 border-white bg-white/20 p-1 transition-transform active:scale-90 flex items-center justify-center shadow-lg"
                >
                  <div className="h-full w-full rounded-full bg-white shadow-inner" />
                </button>
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
                  Tap to capture text
                </span>
              </div>
            </div>
          </div>
        )}

        {/* MANUAL INGREDIENT ENTRY VIEW WITH COLLAPSIBLE ADVANCED AI FIELDS */}
        {isManualEntryActive && (
          <div
            className={`absolute inset-0 z-50 flex flex-col pt-14 pb-20 px-6 transition-all duration-300 ${isDark ? "bg-[#121412]" : "bg-[#F7FBF4]"}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-tight">
                Enter Ingredients
              </h2>
              <button
                onClick={() => {
                  setIsManualEntryActive(false);
                  setIsAdvancedOpen(false);
                }}
                className={`p-1.5 rounded-full transition-colors ${bgPillInactive}`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Input Form Box */}
            <form onSubmit={handleAddIngredient} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="e.g., Tomatoes, Cheese"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`flex-1 h-12 px-4 rounded-xl text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[#386B3B] transition-colors ${
                  isDark
                    ? "bg-[#1C1F1C] border-[#2E312E] text-[#E2E3DE]"
                    : "bg-white border-gray-200 text-[#191C19]"
                }`}
              />
              <button
                type="submit"
                className="h-12 px-5 rounded-xl bg-[#386B3B] text-white font-bold text-sm shadow-sm active:scale-95 transition-all"
              >
                Add
              </button>
            </form>

            {/* Dynamic Chip Repository View wrapper */}
            <div className="max-h-[140px] overflow-y-auto no-scrollbar py-1 mb-4">
              {manualIngredients.length === 0 ? (
                <div className={`text-center py-4 text-xs ${textSub}`}>
                  No ingredients added yet.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {manualIngredients.map((ingredient, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full text-xs font-bold transition-all ${bgPillInactive}`}
                    >
                      <span>{ingredient}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(idx)}
                        className="p-0.5 rounded-full bg-black/5 dark:bg-white/10"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COLLAPSIBLE EXTENDED AI INSTRUCTIONS ACCORDION */}
            <div
              className={`border rounded-2xl overflow-hidden transition-all duration-300 mb-4 ${
                isDark
                  ? "border-[#2E312E] bg-[#1C1F1C]"
                  : "border-gray-200 bg-[#E8F3E8]/30"
              }`}
            >
              <button
                type="button"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold tracking-wide text-left uppercase transition-colors"
              >
                <span className={isDark ? "text-[#B8E6B9]" : "text-[#386B3B]"}>
                  Extended AI Instructions
                </span>
                <span
                  className={`transform transition-transform duration-200 ${isAdvancedOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isAdvancedOpen
                    ? "max-h-[260px] opacity-100 p-4 border-t border-inherit"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-60">
                      Ingredient Quantities
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 2 eggs, half box of pasta"
                      value={aiInstructions.quantityContext}
                      onChange={(e) =>
                        setAiInstructions({
                          ...aiInstructions,
                          quantityContext: e.target.value,
                        })
                      }
                      className={`w-full h-9 px-3 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-[#386B3B] ${
                        isDark
                          ? "bg-[#222622] border-[#2E312E]"
                          : "bg-white border-gray-200"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-60">
                      Dietary Rules / Restrictions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Vegetarian, low sodium, gluten-free"
                      value={aiInstructions.dietaryNotes}
                      onChange={(e) =>
                        setAiInstructions({
                          ...aiInstructions,
                          dietaryNotes: e.target.value,
                        })
                      }
                      className={`w-full h-9 px-3 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-[#386B3B] ${
                        isDark
                          ? "bg-[#222622] border-[#2E312E]"
                          : "bg-white border-gray-200"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-60">
                      Exclude Ingredients
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Cilantro, nuts, onions"
                      value={aiInstructions.excludeIngredients}
                      onChange={(e) =>
                        setAiInstructions({
                          ...aiInstructions,
                          excludeIngredients: e.target.value,
                        })
                      }
                      className={`w-full h-9 px-3 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-[#386B3B] ${
                        isDark
                          ? "bg-[#222622] border-[#2E312E]"
                          : "bg-white border-gray-200"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Find Recipe Action */}
            <button
              onClick={() => {
                setIsManualEntryActive(false);
                setIsAdvancedOpen(false);
              }}
              className="h-14 w-full rounded-full bg-[#386B3B] text-white font-bold shadow-md transition-all active:scale-95 mt-auto mb-2"
            >
              Find Recipes ({manualIngredients.length})
            </button>
          </div>
        )}

        {/* Standard Home Feed Content */}
        <header className="px-6 pt-14 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#386B3B] text-white">
                <Utensils size={18} />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">
                RecipifyCook
              </h1>
            </div>
            <Search size={22} className={textSub} />
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors ${i === 2 ? bgPillActive : bgPillInactive}`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${bgPillInactive}`}
            >
              {isDark ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} />
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
          {recommended && (
            <section className="mt-4">
              <h3 className="text-lg font-semibold mb-4">
                Recommended for you
              </h3>
              <div
                className={`flex p-3 rounded-[2rem] shadow-sm transition-colors duration-300 ${bgCard}`}
              >
                <img
                  src={recommended.img}
                  className="h-32 w-32 rounded-2xl object-cover"
                  alt=""
                />
                <div className="ml-4 flex flex-col justify-center gap-1">
                  <h4 className="font-bold leading-tight">
                    {recommended.name}
                  </h4>
                  <p className={`text-xs flex items-center gap-2 ${textSub}`}>
                    <Clock size={12} />
                    {recommended.time} • <ChefHat size={12} />
                    {recommended.difficulty}
                  </p>
                  <div className="flex mt-1 text-[#386B3B] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#386B3B" color="#386B3B" />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Popular recipes</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {popularRecipes.map((recipe) => (
                <div key={recipe.id} className="min-w-[160px] flex-shrink-0">
                  <div
                    className={`relative h-44 w-full overflow-hidden rounded-[2rem] ${isDark ? "bg-[#222622]" : "bg-[#D1E8D1]"}`}
                  >
                    <img
                      src={recipe.img}
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                  <h5 className="text-sm font-bold truncate mt-2 px-1">
                    {recipe.name}
                  </h5>
                  <p className={`text-[11px] px-1 ${textSub}`}>
                    {recipe.time} • {recipe.difficulty}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Global Bottom Navigation Bar Layout */}
        <nav
          className={`absolute bottom-0 flex h-20 w-full items-center justify-around pb-4 px-4 border-t transition-colors duration-300 ${bgNav}`}
        >
          <div
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={closeAllSubViews}
          >
            <div
              className={`rounded-full px-5 py-1 transition-all ${!isTabActive ? bgNavPillActive : textSub}`}
            >
              <Utensils size={22} strokeWidth={!isTabActive ? 2.5 : 2} />
            </div>
            <span
              className={`text-[10px] ${!isTabActive ? "font-bold" : "font-medium opacity-70"}`}
            >
              Home
            </span>
          </div>

          <div
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => {
              stopCamera();
              setIsManualEntryActive(false);
              setIsInputModalOpen(true);
            }}
          >
            <div
              className={`rounded-full px-5 py-1 transition-all ${isTabActive ? bgNavPillActive : textSub}`}
            >
              <Search size={22} strokeWidth={isTabActive ? 2.5 : 2} />
            </div>
            <span
              className={`text-[10px] ${isTabActive ? "font-bold" : "font-medium opacity-70"}`}
            >
              Find a recipe
            </span>
          </div>

          <div
            className={`flex flex-col items-center gap-1 opacity-70 cursor-pointer ${textSub}`}
          >
            <div className="px-5 py-1">
              <Heart size={22} />
            </div>
            <span className="text-[10px] font-medium">Saved</span>
          </div>

          <div
            className={`flex flex-col items-center gap-1 cursor-pointer ${textSub}`}
            onClick={() => router.push("/shopping")}
          >
            <div className="px-5 py-1">
              <ShoppingBasket size={22} />
            </div>
            <span className="text-[10px] font-medium opacity-70">Cart</span>
          </div>

          <div
            className={`flex flex-col items-center gap-1 opacity-70 cursor-pointer ${textSub}`}
          >
            <div className="px-5 py-1">
              <User size={22} />
            </div>
            <span className="text-[10px] font-medium">Profile</span>
          </div>
          <div
            className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-20 rounded-full ${isDark ? "bg-white/20" : "bg-[#191C19]/20"}`}
          />
        </nav>
      </div>
    </div>
  );
}
