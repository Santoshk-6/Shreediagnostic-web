"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X, Calendar } from "lucide-react";
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

// Timing configuration for the advertisement popup
const INITIAL_AUTO_POPUP_DELAY_MS = 3500; // 3.5 seconds after page load
const REVISIT_RESHOW_INTERVAL_MS = 45000;  // 45 seconds interval before showing again
const SESSION_DISMISSED_KEY = "sdc_promo_popup_dismissed_session";
const LAST_SHOWN_TIME_KEY = "sdc_google_ad_last_shown_time";
const LAST_PROMO_INDEX_KEY = "sdc_google_ad_last_promo_idx";

/**
 * Pure helper to pick a single separate, random advertisement index for the given route
 * (Filtered strictly to _v and _h images)
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

  // Find candidate posters that target this page
  const targetedIndices: number[] = [];
  POPUP_ELIGIBLE_PROMOS.forEach((promo, idx) => {
    const pages = promo.showOnPages || ["all"];
    if (pages.includes(pageKey)) {
      targetedIndices.push(idx);
    }
  });

  const candidateIndices =
    targetedIndices.length > 0 ? targetedIndices : POPUP_ELIGIBLE_PROMOS.map((_, i) => i);

  // Retrieve last shown index to guarantee showing a DIFFERENT separate poster
  let lastIndex = -1;
  try {
    const stored = sessionStorage.getItem(LAST_PROMO_INDEX_KEY);
    if (stored !== null) lastIndex = parseInt(stored, 10);
  } catch {}

  // Exclude last shown index if possible
  const filtered = candidateIndices.filter((idx) => idx !== lastIndex);
  const pool = filtered.length > 0 ? filtered : candidateIndices;

  // Pick one random poster
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

  // When visitor closes popup, suppress it for remainder of that browser session
  const close = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, "true");
      sessionStorage.setItem(LAST_SHOWN_TIME_KEY, Date.now().toString());
    } catch {}
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

  // Listen for manual trigger events (dispatched from banners or buttons)
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

      // Suppress if user closed popup during this browser session
      try {
        if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === "true") {
          return;
        }
      } catch {}

      let lastShownTime = 0;
      try {
        const stored = sessionStorage.getItem(LAST_SHOWN_TIME_KEY);
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
        sessionStorage.setItem(LAST_SHOWN_TIME_KEY, now.toString());
      } catch {}

      // Pick one fresh separate random ad (strictly _v or _h)
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

  const currentPromo = POPUP_ELIGIBLE_PROMOS[currentIndex] || POPUP_ELIGIBLE_PROMOS[0];
  const aspect = currentPromo.aspect || "v";

  // Dynamic Google Ad Container sizing based on poster format:
  // v = Vertical (skyscraper format, e.g. 3:4.2)
  // h = Horizontal (leaderboard format, e.g. 16:7.5)
  // (Square _s images are excluded from popup)
  const getAspectClasses = () => {
    if (aspect === "v") {
      return "max-w-[430px] w-full max-h-[88vh] aspect-[3/4.2] sm:aspect-[0.72]";
    }
    // "h" or landscape
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
      {/* Single Static Google Display Advertisement Card (No Slider, No PDFs) */}
      <div
        className={`relative ${getAspectClasses()} bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/90 my-auto flex flex-col group animate-in fade-in zoom-in-95 duration-200 select-none cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          handleAdClick();
        }}
        title={`Sponsored: ${currentPromo.title} — Click to Book Test`}
      >
        {/* Google Ad Header: Ad Label on Left, Close Button on Right */}
        <div className="absolute top-2.5 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
          {/* Ad Label & Brand attribution */}
          <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full text-white pointer-events-auto border border-white/15 shadow-md">
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-1.5 py-0.5 rounded">
              Ad
            </span>
            <span className="text-[11px] font-bold text-white/95">
              Shree Diagnostic
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

        {/* Poster Image — uses object-contain to preserve 100% full image proportions without text cropping */}
        <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
          <img
            src={currentPromo.image}
            alt={currentPromo.title}
            className="w-full h-full object-contain object-center group-hover:scale-[1.01] transition-transform duration-300"
          />

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
