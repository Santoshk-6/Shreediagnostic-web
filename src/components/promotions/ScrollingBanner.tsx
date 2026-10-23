"use client";

/**
 * ScrollingBanner — Professional Promotional Poster Carousel
 *
 * Shows _h (horizontal) posters one at a time in a large, full-width card.
 * Fades smoothly between slides. Vertical (_v) and square (_s) excluded.
 * No heading text — clean, advertisement-style presentation.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import promotionsData from "@/data/promotions.json";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: string;
  active: boolean;
}

// Only active _h posters, sourced from one place to prevent duplicates
const H_POSTERS: PromoItem[] = (promotionsData as PromoItem[]).filter(
  (p) => p.active !== false && p.image && p.aspect === "h"
);

const SLIDE_DURATION = 5000; // ms between auto-advances
const FADE_MS        = 400;  // opacity transition duration

function openBooking(title: string) {
  window.dispatchEvent(
    new CustomEvent("open-booking-modal", {
      detail: { name: title, type: "package", price: 1499 },
    })
  );
}

export const ScrollingBanner = () => {
  const total = H_POSTERS.length;
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true); // drives the opacity crossfade
  const [hovered, setHovered] = useState(false);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (next === idx) return;
      // Fade out → swap image → fade in
      setVisible(false);
      setTimeout(() => {
        setIdx(((next % total) + total) % total);
        setVisible(true);
      }, FADE_MS);
    },
    [idx, total]
  );

  const advance = useCallback(() => goTo((idx + 1) % total), [goTo, idx, total]);

  // Autoplay timer — resets on every slide change or hover toggle
  useEffect(() => {
    if (total < 2 || hovered) return;
    timerRef.current = setTimeout(advance, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [idx, hovered, advance, total]);

  if (total === 0) return null;

  const poster = H_POSTERS[idx];

  return (
    <section
      className="bg-slate-950 py-4 sm:py-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Main poster card ────────────────────────────────── */}
        <div
          className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900
            shadow-xl cursor-pointer group"
          style={{ height: "clamp(200px, 32vw, 420px)" }}
          onClick={() => openBooking(poster.title)}
          title={`Click to book: ${poster.title}`}
        >
          {/* Poster image — full visible, no cropping */}
          <img
            key={poster.id}
            src={poster.image}
            alt={poster.title}
            className="w-full h-full object-contain object-center"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease`,
            }}
            draggable={false}
          />

          {/* Subtle vignette */}
          <div className="absolute inset-0 pointer-events-none
            bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {/* Prev / Next arrow overlays */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(idx - 1); }}
                className="absolute left-3 top-1/2 -translate-y-1/2
                  w-9 h-9 rounded-full bg-black/50 hover:bg-teal-700/80
                  text-white flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200 backdrop-blur-sm border border-white/10"
                aria-label="Previous poster"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(idx + 1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2
                  w-9 h-9 rounded-full bg-black/50 hover:bg-teal-700/80
                  text-white flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200 backdrop-blur-sm border border-white/10"
                aria-label="Next poster"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Bottom bar: title + Book Now */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6
            bg-gradient-to-t from-slate-950/90 to-transparent
            flex items-end justify-between gap-3
            opacity-0 group-hover:opacity-100 transition-opacity duration-250">
            <div className="min-w-0">
              <p className="text-white font-bold text-sm sm:text-base leading-snug truncate">
                {poster.title}
              </p>
              <p className="text-slate-300 text-xs mt-0.5 line-clamp-1 hidden sm:block">
                {poster.subtitle}
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); openBooking(poster.title); }}
              className="flex-shrink-0 flex items-center gap-1.5
                bg-teal-500 hover:bg-teal-400 text-white
                text-xs font-bold px-3 py-1.5 rounded-full
                transition-colors duration-200 shadow-md whitespace-nowrap"
            >
              <Calendar className="w-3 h-3" />
              Book Now
            </button>
          </div>
        </div>

        {/* ── Pagination dots + counter ───────────────────────── */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-3 mt-3">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {H_POSTERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === idx
                      ? "w-6 h-2 bg-teal-400"
                      : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to poster ${i + 1}`}
                />
              ))}
            </div>
            {/* Counter */}
            <span className="text-[10px] text-slate-500 tabular-nums">
              {idx + 1} / {total}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
