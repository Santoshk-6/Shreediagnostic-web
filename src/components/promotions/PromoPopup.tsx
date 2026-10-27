"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import promotionsData from "@/data/promotions.json";

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: "v" | "h" | "s" | string;
  active: boolean;
  showOnPages?: string[];
  badge?: string;
  badgeColor?: string;
}

// Static promotions data: ONLY vertical (_v) and horizontal (_h) posters. Square (_s) images are excluded.
const ALL_PROMOTIONS = promotionsData as Promotion[];
const POPUP_ELIGIBLE_PROMOS = ALL_PROMOTIONS.filter(
  (p) => p.active !== false && p.image && (p.aspect === "v" || p.aspect === "h")
);
const TOTAL_POSTERS = POPUP_ELIGIBLE_PROMOS.length;

// Exact required timings
const INITIAL_DELAY_MS = 3500;    // 3.5 seconds initial delay after page load
const REAPPEAR_INTERVAL_MS = 45000; // Popup reappears every 45 seconds
const SLIDE_INTERVAL_MS = 25000;   // Slider automatically moves to next slide every 25 seconds

function getNextIndex(currentIdx: number): number {
  if (TOTAL_POSTERS <= 1) return 0;
  return (currentIdx + 1) % TOTAL_POSTERS;
}

function getPrevIndex(currentIdx: number): number {
  if (TOTAL_POSTERS <= 1) return 0;
  return (currentIdx - 1 + TOTAL_POSTERS) % TOTAL_POSTERS;
}

export const PromoPopup = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() =>
    TOTAL_POSTERS > 0 ? Math.floor(Math.random() * TOTAL_POSTERS) : 0
  );

  // Close the popup when user clicks X or backdrop
  const close = useCallback(() => {
    setVisible(false);
  }, []);

  // Keyboard navigation: Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible) return;
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, close]);

  // Listen for manual trigger events (e.g. from buttons/banners)
  useEffect(() => {
    const handleManualOpen = () => {
      setCurrentIndex((prev) => getNextIndex(prev));
      setVisible(true);
    };
    window.addEventListener("open-promo-popup", handleManualOpen);
    return () => window.removeEventListener("open-promo-popup", handleManualOpen);
  }, []);

  // Initial delay (3.5s) to display popup on page load
  useEffect(() => {
    if (pathname.startsWith("/services")) return;

    const initialTimer = setTimeout(() => {
      setCurrentIndex((prev) => getNextIndex(prev));
      setVisible(true);
    }, INITIAL_DELAY_MS);

    return () => clearTimeout(initialTimer);
  }, [pathname]);

  // Reappear every 45 seconds while visitor remains on the website
  useEffect(() => {
    if (pathname.startsWith("/services")) return;

    const reappearTimer = setInterval(() => {
      // Do not interrupt if user is actively filling an input
      const activeElem = document.activeElement;
      const isTyping =
        activeElem &&
        (activeElem.tagName === "INPUT" ||
          activeElem.tagName === "TEXTAREA" ||
          activeElem.tagName === "SELECT" ||
          activeElem.getAttribute("contenteditable") === "true");

      if (isTyping) return;

      // Reopen with the next promotional slide
      setCurrentIndex((prev) => getNextIndex(prev));
      setVisible(true);
    }, REAPPEAR_INTERVAL_MS);

    return () => clearInterval(reappearTimer);
  }, [pathname]);

  // While popup is open: automatically advance slide every 25 seconds
  useEffect(() => {
    if (!visible || TOTAL_POSTERS <= 1) return;

    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => getNextIndex(prev));
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(slideTimer);
  }, [visible]);

  // Manual next/prev controls
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => getNextIndex(prev));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => getPrevIndex(prev));
  };

  if (!visible || TOTAL_POSTERS === 0) return null;

  const currentPromo = POPUP_ELIGIBLE_PROMOS[currentIndex] || POPUP_ELIGIBLE_PROMOS[0];
  const aspect = currentPromo.aspect || "v";

  // Dynamic Google Ad Container sizing based on poster format:
  // v = Vertical (skyscraper format, e.g. 3:4.2)
  // h = Horizontal (leaderboard format, e.g. 16:7.5)
  const getAspectClasses = () => {
    if (aspect === "v") {
      return "max-w-[430px] w-full max-h-[88vh] aspect-[3/4.2] sm:aspect-[0.72]";
    }
    return "max-w-4xl w-full max-h-[75vh] aspect-[16/7.5] sm:aspect-[2.1]";
  };

  const handleAdClick = () => {
    close();
    window.dispatchEvent(
      new CustomEvent("open-booking-modal", {
        detail: { name: currentPromo.title, type: "test", price: 1499 },
      })
    );
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
      onClick={close}
      aria-modal="true"
      role="dialog"
      aria-label="Shree Diagnostic Advertisement"
    >
      {/* Floating Advertisement Modal */}
      <div
        className={`relative ${getAspectClasses()} bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/90 my-auto flex flex-col group animate-in fade-in zoom-in-95 duration-200 select-none cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          handleAdClick();
        }}
        title={`Sponsored: ${currentPromo.title} — Click to Book Test`}
      >
        {/* Ad Header: Badge & Close Button */}
        <div className="absolute top-2.5 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
          {/* Ad Label & Brand attribution */}
          <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full text-white pointer-events-auto border border-white/15 shadow-md">
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-1.5 py-0.5 rounded">
              Ad
            </span>
            <span className="text-[11px] font-bold text-white/95">
              Shree Diagnostic
            </span>
            <span className="text-[9px] text-slate-300 ml-1">
              ({currentIndex + 1}/{TOTAL_POSTERS})
            </span>
          </div>

          {/* Close Advertisement Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close Advertisement"
            className="w-7 h-7 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center justify-center transition-colors pointer-events-auto shadow-md border border-white/20 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Poster Image — object-contain ensures 100% full image proportions without text cropping */}
        <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
          <img
            src={currentPromo.image}
            alt={currentPromo.title}
            className="w-full h-full object-contain object-center group-hover:scale-[1.01] transition-transform duration-300"
          />

          {/* Manual Slider Navigation Arrows */}
          {TOTAL_POSTERS > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous promotional slide"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-teal-700 text-white flex items-center justify-center transition opacity-0 group-hover:opacity-100 border border-white/20 shadow-md cursor-pointer pointer-events-auto"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next promotional slide"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-teal-700 text-white flex items-center justify-center transition opacity-0 group-hover:opacity-100 border border-white/20 shadow-md cursor-pointer pointer-events-auto"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Slide Indicator Dots at Bottom Left */}
          {TOTAL_POSTERS > 1 && (
            <div className="absolute bottom-3 left-4 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 pointer-events-none">
              {POPUP_ELIGIBLE_PROMOS.map((_, idx) => (
                <span
                  key={idx}
                  className={`rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-3.5 h-1.5 bg-teal-400"
                      : "w-1.5 h-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Bottom Right: Call-to-Action Pill */}
          <div className="absolute bottom-2.5 right-3 z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 text-white px-3.5 py-1.5 rounded-full font-bold text-xs shadow-lg border border-teal-300/30 transition pointer-events-auto">
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
