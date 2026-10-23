"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Microscope,
  CheckCircle2,
  Sparkles,
  Star
} from "lucide-react";
import { HEALTH_PACKAGES, HealthPackage } from "@/data/packages";

interface PackageSpotlightSliderProps {
  handleBookItem: (name: string, type: "test" | "package", price: number) => void;
}

export const PackageSpotlightSlider: React.FC<PackageSpotlightSliderProps> = ({
  handleBookItem,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const packages = HEALTH_PACKAGES;
  const total = packages.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Fully automatic: Automatically switch packages every 4.5 seconds, pausing on hover
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, total]);

  // Preserve mobile touch-swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
  };

  const currentPkg: HealthPackage = packages[currentIndex] || packages[0];

  return (
    <div
      className="relative mx-auto max-w-md bg-gradient-to-b from-slate-900/95 to-[#06212b]/95 p-6 sm:p-7 rounded-3xl border border-teal-500/30 shadow-2xl backdrop-blur-2xl space-y-5 select-none transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Full Body Package Spotlight Slider"
    >
      {/* Header Strip with Live Status (Arrow buttons removed for fully automatic experience) */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0">
            <Microscope className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white truncate">
              Full Body Package Spotlight
            </h4>
            <p className="text-[11px] text-teal-300 truncate">
              {currentPkg.category} • {currentIndex + 1} of {total}
            </p>
          </div>
        </div>

        {/* Live Auto-Switching Status Indicator */}
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
          <span className="text-[10px] font-semibold text-teal-300/90 hidden sm:inline">
            Auto
          </span>
        </div>
      </div>

      {/* Package Spotlight Details */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold tracking-wider uppercase text-teal-300 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-800">
              {currentPkg.isPopular ? "Most Popular" : "Featured Profile"}
            </span>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {currentPkg.discountPercentage}% OFF
            </span>
          </div>

          <h3 className="text-xl font-black text-white tracking-tight leading-snug">
            {currentPkg.name}
          </h3>
          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {currentPkg.tagline || currentPkg.description}
          </p>
        </div>

        {/* Price Block */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Package Offer Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-teal-300">
                ₹{currentPkg.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-slate-500 line-through">
                ₹{currentPkg.originalPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block font-medium">Investigations</span>
            <span className="text-sm font-bold text-emerald-400">
              {currentPkg.testCount} Total Tests
            </span>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Free Doorstep Home Sample Pickup Included</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Turnaround: {currentPkg.turnaroundTime} • Fasting: {currentPkg.fastingRequirement}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Verified Pathologist Report Delivered on WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Action Button: Book Package */}
      <div className="pt-1">
        <button
          onClick={() => handleBookItem(currentPkg.name, "package", currentPkg.price)}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-black text-sm transition shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Book {currentPkg.name.split(" ")[0]} Package Now</span>
        </button>
      </div>

      {/* Pagination Indicator Dots — Allows clicking to view any specific package */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {packages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to package ${i + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === currentIndex ? "w-5 bg-teal-400" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Mini Verified Review Snippet */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
          ))}
        </div>
        <span className="text-[11px] text-slate-300">
          Rated 4.9/5 from 12,000+ Verified Patients
        </span>
      </div>
    </div>
  );
};
