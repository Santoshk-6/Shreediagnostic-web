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

// Static promotions data
const ALL_PROMOTIONS = promotionsData as Promotion[];
const ACTIVE_PROMOS = ALL_PROMOTIONS.filter((p) => p.active !== false && p.image);
const TOTAL_POSTERS = ACTIVE_PROMOS.length;

// Google Display Advertisement timing configuration
const INITIAL_AUTO_POPUP_DELAY_MS = 3500; // 3.5 seconds after page load
const REVISIT_RESHOW_INTERVAL_MS = 45000;  // 45 seconds interval before showing again
const LAST_SHOWN_KEY = "sdc_google_ad_last_shown_time";
const LAST_PROMO_INDEX_KEY = "sdc_google_ad_last_promo_idx";

/**
 * Pure helper to pick a separate, random advertisement index for the given route
 */
function pickRandomAdIndex(currentPath: string): number {
  if (TOTAL_POSTERS === 0) return 0;

  let pageKey = "home";
  if (currentPath.startsWith("/services")) pageKey = "services";
  else if (currentPath.startsWith("/health-packages")) pageKey = "health-packages";
  else if (currentPath.startsWith("/home-sample-collection")) pageKey = "home-sample-collection";
  else if (currentPath.startsWith("/partners")) pageKey = "partners";
  else if (currentPath.startsWith("/contact")) pageKey = "contact";
  else if (currentPath.startsWith("/about")) pageKey = "about";

  // Find candidates that target this page
  const targetedIndices: number[] = [];
  ACTIVE_PROMOS.forEach((promo, idx) => {
    const pages = promo.showOnPages || ["all"];
    if (pages.includes(pageKey)) {
      targetedIndices.push(idx);
    }
  });

  const candidateIndices = targetedIndices.length > 0 ? targetedIndices : ACTIVE_PROMOS.map((_, i) => i);

  // Retrieve last shown index to guarantee showing a DIFFERENT separate poster
  let lastIndex = -1;
  try {
    const stored = sessionStorage.getItem(LAST_PROMO_INDEX_KEY);
    if (stored !== null) lastIndex = parseInt(stored, 10);
  } catch {}

  // Exclude last shown index if possible
  const filtered = candidateIndices.filter((idx) => idx !== lastIndex);
  const pool = filtered.length > 0 ? filtered : candidateIndices;

  // Pick randomly
  const randomIndex = pool[Math.floor(Math.random() * pool.length)];

  try {
    sessionStorage.setItem(LAST_PROMO_INDEX_KEY, randomIndex.toString());
  } catch {}

  return randomIndex;
}

export const PromoPopup = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() =>
    TOTAL_POSTERS > 0 ? Math.floor(Math.random() * TOTAL_POSTERS) : 0
  );
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const close = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
    } catch {}
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : TOTAL_POSTERS - 1));
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev < TOTAL_POSTERS - 1 ? prev + 1 : 0));
  }, []);

  // Keyboard navigation: Escape to close, Left/Right arrows to flip ads
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, close, handlePrev, handleNext]);

  // Auto-advance slides in the advertisement slider (pauses on hover)
  useEffect(() => {
    if (!visible || TOTAL_POSTERS <= 1 || isPaused) return;
    autoSlideTimerRef.current = setInterval(() => {
      handleNext();
    }, 5500);
    return () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    };
  }, [visible, isPaused, handleNext]);

  // Listen for manual trigger events
  useEffect(() => {
    const handleManualOpen = () => {
      setCurrentIndex(pickRandomAdIndex(pathname));
      setVisible(true);
    };
    window.addEventListener("open-promo-popup", handleManualOpen);
    return () => window.removeEventListener("open-promo-popup", handleManualOpen);
  }, [pathname]);

  // Automatic advertisement display logic
  useEffect(() => {
    const checkAndShow = () => {
      if (visible) return;

      let lastShownTime = 0;
      try {
        const stored = sessionStorage.getItem(LAST_SHOWN_KEY);
        if (stored) lastShownTime = parseInt(stored, 10) || 0;
      } catch {}

      const now = Date.now();
      const elapsed = now - lastShownTime;

      // Allow if first visit or if cooldown interval has passed
      if (lastShownTime !== 0 && elapsed < REVISIT_RESHOW_INTERVAL_MS) {
        return;
      }

      // Avoid interrupting the user while typing in forms
      const activeElem = document.activeElement;
      const isUserTypingInForm =
        activeElem &&
        (activeElem.tagName === "INPUT" ||
          activeElem.tagName === "TEXTAREA" ||
          activeElem.tagName === "SELECT" ||
          activeElem.getAttribute("contenteditable") === "true");

      if (isUserTypingInForm) {
        return;
      }

      try {
        sessionStorage.setItem(LAST_SHOWN_KEY, now.toString());
      } catch {}

      // Pick a fresh random separate ad
      setCurrentIndex(pickRandomAdIndex(pathname));
      setVisible(true);
    };

    const initialTimer = setTimeout(checkAndShow, INITIAL_AUTO_POPUP_DELAY_MS);
    const periodicTimer = setInterval(checkAndShow, REVISIT_RESHOW_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(periodicTimer);
    };
  }, [pathname, visible]);

  if (!visible || TOTAL_POSTERS === 0) return null;

  const currentPromo = ACTIVE_PROMOS[currentIndex] || ACTIVE_PROMOS[0];
  const aspect = currentPromo.aspect || "v";

  // Dynamic Google Ad Container sizing based on poster format:
  // v = Vertical (skyscraper format)
  // h = Horizontal (leaderboard format)
  // s = Square (square card format)
  const getAspectClasses = () => {
    if (aspect === "v") {
      return "max-w-[420px] w-full max-h-[88vh] aspect-[3/4.1] sm:aspect-[0.72]";
    }
    if (aspect === "h") {
      return "max-w-4xl w-full max-h-[75vh] aspect-[16/7.5] sm:aspect-[2.1]";
    }
    // "s" or square
    return "max-w-[520px] w-full max-h-[82vh] aspect-square";
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
      {/* Floating Google Display Advertisement Card */}
      <div
        className={`relative ${getAspectClasses()} bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/90 my-auto flex flex-col group animate-in fade-in zoom-in-95 duration-200 select-none cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          handleAdClick();
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        title="Click to Book Test — Shree Diagnostic Center"
      >
        {/* Google Ad Header Badge & Close Button */}
        <div className="absolute top-2.5 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
          {/* Ad Label & Brand attribution */}
          <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full text-white pointer-events-auto border border-white/15 shadow-md">
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-1.5 py-0.5 rounded">
              Ad
            </span>
            <span className="text-[11px] font-bold text-white/95 truncate max-w-[130px] sm:max-w-none">
              Shree Diagnostic
            </span>
            <span className="text-[10px] text-teal-300 font-semibold hidden sm:inline">
              • {currentIndex + 1} of {TOTAL_POSTERS}
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

        {/* Poster Image — fills the ad container with NO black letterboxing voids */}
        <div className="relative w-full h-full overflow-hidden bg-slate-100 flex items-center justify-center">
          <img
            src={currentPromo.image}
            alt={currentPromo.title}
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
          />

          {/* Overlaid Previous / Next Arrows */}
          {TOTAL_POSTERS > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous advertisement"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs transition shadow-md border border-white/20 z-20 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next advertisement"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs transition shadow-md border border-white/20 z-20 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          {/* Bottom Bar: Call-to-Action Pill + Slide Dots */}
          <div className="absolute bottom-2.5 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
            {/* Dots */}
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-full border border-white/15 pointer-events-auto">
              {ACTIVE_PROMOS.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  aria-label={`Go to ad ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentIndex ? "w-4 bg-teal-400" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* Click to Book Action Pill */}
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
