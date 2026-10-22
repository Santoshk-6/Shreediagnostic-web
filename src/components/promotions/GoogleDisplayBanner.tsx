"use client";

import React, { useState } from "react";
import promotionsData from "@/data/promotions.json";
import { Calendar } from "lucide-react";

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

interface GoogleDisplayBannerProps {
  /** Target aspect: 'h' (horizontal leaderboard), 's' (square card), 'v' (skyscraper), or 'any' */
  aspect?: "h" | "s" | "v" | "any";
  /** Optional preferred page tag to filter ads (e.g. 'services', 'health-packages') */
  pageContext?: string;
  /** Custom CSS classes */
  className?: string;
}

export const GoogleDisplayBanner: React.FC<GoogleDisplayBannerProps> = ({
  aspect = "h",
  pageContext,
  className = "",
}) => {
  // Synchronous random selection on initial mount — zero useEffect re-renders
  const [selectedPromo] = useState<Promotion | null>(() => {
    const list = (promotionsData as Promotion[]).filter((p) => p.active !== false && p.image);
    if (list.length === 0) return null;

    let matching = aspect === "any" ? list : list.filter((p) => p.aspect === aspect);
    if (matching.length === 0) matching = list;

    if (pageContext) {
      const pageMatching = matching.filter(
        (p) => p.showOnPages && (p.showOnPages.includes(pageContext) || p.showOnPages.includes("all"))
      );
      if (pageMatching.length > 0) matching = pageMatching;
    }

    return matching[Math.floor(Math.random() * matching.length)] || null;
  });

  if (!selectedPromo) return null;

  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("open-booking-modal", {
        detail: { name: selectedPromo.title, type: "test", price: 1499 },
      })
    );
  };

  // Determine aspect container ratio
  let ratioClass = "aspect-[16/6] sm:aspect-[2.4]";
  if (selectedPromo.aspect === "s") {
    ratioClass = "aspect-square max-w-[420px]";
  } else if (selectedPromo.aspect === "v") {
    ratioClass = "aspect-[3/4.2] max-w-[340px]";
  }

  return (
    <div className={`w-full my-6 flex justify-center ${className}`}>
      <div
        onClick={handleClick}
        className={`relative w-full ${ratioClass} bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group select-none`}
        title={`Sponsored: ${selectedPromo.title} — Click to book`}
      >
        {/* Ad Tag & Attribution */}
        <div className="absolute top-2.5 left-3 z-20 flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full text-white border border-white/15 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-1 py-0.5 rounded">
            Ad
          </span>
          <span className="text-[10px] font-semibold text-white/90">
            Shree Diagnostic Center
          </span>
        </div>

        {/* Poster Image */}
        <img
          src={selectedPromo.image}
          alt={selectedPromo.title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-300"
        />

        {/* Bottom Booking Action Pill */}
        <div className="absolute bottom-2.5 right-3 z-20 flex items-center gap-1.5 bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 text-white px-3.5 py-1.5 rounded-full font-bold text-xs shadow-lg border border-teal-300/30 transition">
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Test Now →</span>
        </div>
      </div>
    </div>
  );
};
