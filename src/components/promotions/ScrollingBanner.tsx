"use client";

import React, { useState } from "react";
import scrollingImagesRaw from "@/data/scrolling-images.json";
import promotionsData from "@/data/promotions.json";
import { Sparkles, Calendar, ChevronRight } from "lucide-react";

interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: string;
  active: boolean;
}

// Extract all horizontal (_h) promotional images for the compact scrolling strip
const horizontalImages: PromoItem[] = (promotionsData as PromoItem[])
  .filter((p) => p.active !== false && p.image && (p.aspect === "h" || p.image.includes("_h")))
  .concat(
    (scrollingImagesRaw as PromoItem[]).filter(
      (s) => s.active !== false && s.image && (s.aspect === "landscape" || s.image.includes("_h"))
    )
  )
  // Deduplicate by image URL
  .filter((v, idx, arr) => arr.findIndex((t) => t.image === v.image) === idx);

export const ScrollingBanner = () => {
  const [isPaused, setIsPaused] = useState(false);

  if (horizontalImages.length === 0) return null;

  // Duplicate items to create a seamless infinite marquee loop
  const marqueeItems = [...horizontalImages, ...horizontalImages, ...horizontalImages];

  const handleBook = (title: string) => {
    window.dispatchEvent(
      new CustomEvent("open-booking-modal", {
        detail: { name: title, type: "package", price: 1499 },
      })
    );
  };

  return (
    <section className="bg-slate-950/95 py-3.5 border-y border-slate-800 overflow-hidden relative group">
      {/* Subtle Side Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Continuously Scrolling Strip */}
      <div
        className="flex items-center gap-4 sm:gap-6 whitespace-nowrap overflow-x-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex items-center gap-4 sm:gap-6 ${
            isPaused ? "[animation-play-state:paused]" : ""
          } animate-scroll-marquee`}
          style={{
            animation: "scrollStrip 35s linear infinite",
          }}
        >
          {marqueeItems.map((promo, idx) => (
            <div
              key={`${promo.id}-${idx}`}
              onClick={() => handleBook(promo.title)}
              className="relative flex-shrink-0 h-28 sm:h-32 w-64 sm:w-72 rounded-xl overflow-hidden border border-slate-800 hover:border-teal-400 bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group/card"
              title={`Click to book: ${promo.title}`}
            >
              {/* Horizontal Poster Image */}
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-300"
              />

              {/* Hover Overlay with Book Action */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 flex items-end p-2.5">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-white truncate max-w-[150px]">
                    {promo.title}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-extrabold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-500/40">
                    <Calendar className="w-2.5 h-2.5" />
                    Book
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe animation injected inline */}
      <style jsx>{`
        @keyframes scrollStrip {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};
