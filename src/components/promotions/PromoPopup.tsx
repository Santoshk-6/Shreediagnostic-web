"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, ExternalLink, Calendar, Sparkles } from "lucide-react";
import promotionsData from "@/data/promotions.json";

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  file: string;
  type: string;
  active: boolean;
  showOnPages: string[];
  badge: string;
  badgeColor: string;
}

const promotions = promotionsData as Promotion[];

const PAGE_MAP: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/partners": "partners",
  "/contact": "contact",
};

const BADGE_COLOR_MAP: Record<string, string> = {
  teal: "bg-teal-100 text-teal-800 border-teal-200",
  emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
  rose: "bg-rose-100 text-rose-800 border-rose-200",
};

const SESSION_KEY = "sdc_promo_shown_pages";
const HAS_VISITED_ANY_PAGE_KEY = "sdc_has_visited_page";

// Configurable delays in milliseconds
const INITIAL_LANDING_DELAY_MS = 3000; // 3 seconds on first entry
const NAVIGATION_PAGE_DELAY_MS = 30000; // 30 seconds after page navigation

export const PromoPopup = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const isFirstPageRef = useRef(true);

  const close = useCallback(() => setVisible(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (visible) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, close]);

  useEffect(() => {
    const pageKey = PAGE_MAP[pathname];
    if (!pageKey) return;

    // Check if already shown for this page this session
    let shownPages: string[] = [];
    let hasVisitedAny = false;
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) shownPages = JSON.parse(stored) as string[];
      hasVisitedAny = sessionStorage.getItem(HAS_VISITED_ANY_PAGE_KEY) === "true";
    } catch {
      shownPages = [];
    }

    if (shownPages.includes(pathname)) return;

    // Determine delay: 3s on initial site visit, 30s after navigating between pages
    const delay = hasVisitedAny ? NAVIGATION_PAGE_DELAY_MS : INITIAL_LANDING_DELAY_MS;
    try {
      sessionStorage.setItem(HAS_VISITED_ANY_PAGE_KEY, "true");
    } catch {}

    // Find active promotions matching current page
    const matching = promotions.filter(
      (p) => p.active && p.showOnPages.includes(pageKey)
    );
    if (matching.length === 0) return;

    // Randomly pick one
    const picked = matching[Math.floor(Math.random() * matching.length)];

    let intervalId: NodeJS.Timeout | null = null;
    const timer = setTimeout(() => {
      // Helper function: Avoid interrupting the user while they are entering form data
      const tryShowPopup = () => {
        const activeElem = document.activeElement;
        const isUserTypingInForm =
          activeElem &&
          (activeElem.tagName === "INPUT" ||
            activeElem.tagName === "TEXTAREA" ||
            activeElem.tagName === "SELECT" ||
            activeElem.getAttribute("contenteditable") === "true");

        if (isUserTypingInForm) {
          // Retry in 5 seconds if user is currently filling a form
          if (!intervalId) {
            intervalId = setInterval(tryShowPopup, 5000);
          }
          return;
        }

        if (intervalId) clearInterval(intervalId);

        // Mark this page as shown
        const updated = [...shownPages, pathname];
        try {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated));
        } catch {}

        setPromotion(picked);
        setVisible(true);
      };

      tryShowPopup();
    }, delay);

    return () => {
      clearTimeout(timer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [pathname]);

  if (!visible || !promotion) return null;

  const badgeClasses =
    BADGE_COLOR_MAP[promotion.badgeColor] ?? "bg-teal-100 text-teal-800 border-teal-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={close}
      aria-modal="true"
      role="dialog"
      aria-label={promotion.title}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-300 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white px-6 py-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span
              className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider border ${badgeClasses}`}
            >
              {promotion.badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {promotion.title}
            </h2>
            <p className="text-xs text-teal-100/80">{promotion.subtitle}</p>
          </div>

          <button
            onClick={close}
            aria-label="Close promotion"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF or Media Display Frame */}
        <div className="p-5 bg-slate-50">
          <div className="w-full h-96 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-inner relative group">
            <iframe
              src={promotion.file}
              className="w-full h-full border-0"
              title={promotion.title}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="px-6 py-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={promotion.file}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2"
          >
            <span>Open Full Brochure / PDF</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                close();
                window.dispatchEvent(new CustomEvent("open-booking-modal"));
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book This Test / Package</span>
            </button>

            <button
              onClick={close}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-100 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        <p className="pb-3 text-center text-[11px] text-slate-400">
          Tap outside or press Esc to close • Shree Diagnostic Center
        </p>
      </div>
    </div>
  );
};
