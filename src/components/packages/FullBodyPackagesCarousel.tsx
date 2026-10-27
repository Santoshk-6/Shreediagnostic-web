"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Clock, Activity, Building2 } from "lucide-react";
import { HEALTH_PACKAGES, HealthPackage } from "@/data/packages";

interface FullBodyPackagesCarouselProps {
  handleBookItem: (name: string, type: "test" | "package", price: number) => void;
}

export const FullBodyPackagesCarousel: React.FC<FullBodyPackagesCarouselProps> = ({
  handleBookItem,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const packages = HEALTH_PACKAGES;
  const totalPackages = packages.length;

  // Responsive items visible per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, totalPackages - cardsPerPage);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay every 4.5 seconds, pauses on hover
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext, maxIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
  };

  return (
    <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-white border border-slate-200/80 px-3.5 py-1 rounded-full shadow-xs">
              Preventive Healthcare Profiles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              Full Body Health Checkup Packages
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              All-inclusive master checkup profiles with up to 65% savings on multi-organ diagnostic screenings.
            </p>
          </div>

          {/* Carousel Arrows + View All Link */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <Link
              href="/health-packages"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 mr-2"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handlePrev}
              aria-label="Previous health package"
              className="w-10 h-10 rounded-xl bg-white hover:bg-teal-50 border border-slate-200 text-slate-700 hover:text-teal-700 flex items-center justify-center transition shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next health package"
              className="w-10 h-10 rounded-xl bg-white hover:bg-teal-50 border border-slate-200 text-slate-700 hover:text-teal-700 flex items-center justify-center transition shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PROMOTIONAL BANNER: CORPORATE & GROUP BOOKINGS */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-950 border border-teal-500/30 p-6 sm:p-7 shadow-xl text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[10px] font-bold uppercase tracking-wider">
                <Building2 className="w-3 h-3" />
                <span>Special Discounts &amp; Group Rates</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Special Health Packages for Groups &amp; Corporates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Explore special pricing for corporate wellness programs, on-site health camps, employee checkups, and community screening drives.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-teal-200">
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">• Corporate Employee Checkups</span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">• On-site Health Camps</span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">• Custom Group Packages</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`,
            }}
          >
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / cardsPerPage}%` }}
              >
                <div className="h-full bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                  {pkg.isPopular && (
                    <div className="absolute top-4 right-4 bg-teal-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md inline-block">
                      {pkg.category}
                    </span>

                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-teal-700 transition-colors tracking-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-500 italic mt-1 line-clamp-2">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Price Box */}
                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-black text-teal-950">
                            ₹{pkg.price}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            ₹{pkg.originalPrice}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-0.5 block">
                          {pkg.recommendedFor}
                        </span>
                      </div>
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                        {pkg.discountPercentage}% OFF
                      </span>
                    </div>

                    {/* Included Test Categories Highlights */}
                    <div className="space-y-2 border-t border-slate-100 pt-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">
                          {pkg.testCount} Parameters Included:
                        </span>
                        <span className="text-teal-700 font-semibold">{pkg.turnaroundTime}</span>
                      </div>

                      <div className="space-y-1.5">
                        {pkg.includedCategories.slice(0, 3).map((cat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                            <span className="font-semibold text-slate-700">{cat.categoryName}</span>
                            <span className="text-[10px] text-slate-400">
                              ({cat.testsIncluded.length} tests)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 grid grid-cols-2 gap-2 border-t border-slate-100">
                    <Link
                      href={`/health-packages/${pkg.slug}`}
                      className="py-3 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 transition"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleBookItem(pkg.name, "package", pkg.price)}
                      className="py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Book Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex ? "w-6 bg-teal-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
