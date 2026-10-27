"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote, CheckCircle2, X, Sparkles } from "lucide-react";
import reviewsData from "@/data/reviews.json";

interface PatientReview {
  id: string;
  reviewerName: string;
  reviewContent: string;
  rating: number;
  sourceLabel: string;
  qualifications: string;
  role: string;
}

const reviews: PatientReview[] = reviewsData as PatientReview[];

export const PatientReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [viewAllModalOpen, setViewAllModalOpen] = useState(false);
  const touchStartXRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = reviews.length;

  // Responsive cards per page: 3 on desktop, 2 on tablet, 1 on mobile
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

  const maxIndex = Math.max(0, total - cardsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay every 5 seconds, pauses on hover
  useEffect(() => {
    if (isPaused || viewAllModalOpen) return;
    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, viewAllModalOpen]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) nextSlide();
      else prevSlide();
    }
  };

  const cardWidthPct = 100 / cardsPerPage;

  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Verified Patient Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Patient Reviews &amp; Feedback
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Read feedback from patients about their sample collection experience, staff support, appointment process, and diagnostic services.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* <button
              onClick={() => setViewAllModalOpen(true)}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition shadow-xs cursor-pointer"
            >
              View All 20 Reviews
            </button> */}

            {/* Slider Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                aria-label="Previous review"
                className="w-9 h-9 rounded-xl bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200 flex items-center justify-center transition shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next review"
                className="w-9 h-9 rounded-xl bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200 flex items-center justify-center transition shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* REVIEWS CAROUSEL CONTAINER */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden rounded-3xl py-1">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * cardWidthPct}%)`,
              }}
            >
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${cardWidthPct}%` }}
                >
                  <div className="h-full bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between space-y-5 group">
                    <div className="space-y-4">
                      {/* Top Row: Star Rating & Quote Icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rev.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                          <span className="text-xs font-black text-slate-700 ml-1.5">
                            {rev.rating}.0
                          </span>
                        </div>
                        <MessageSquareQuote className="w-6 h-6 text-teal-600/30 group-hover:text-teal-600 transition-colors" />
                      </div>

                      {/* Review Content */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic line-clamp-4">
                        &quot;{rev.reviewContent}&quot;
                      </p>
                    </div>

                    {/* Reviewer Details */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="min-w-0">
                        <h4 className="text-sm font-black text-slate-900 truncate">
                          {rev.reviewerName}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {rev.qualifications} • {rev.role}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/60 text-[10px] font-bold text-teal-800 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        <span>{rev.sourceLabel}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {total > cardsPerPage && (
            <div className="flex justify-center items-center gap-1.5 pt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review slide ${idx + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-6 h-2 bg-teal-600"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* VIEW ALL REVIEWS MODAL */}
      {viewAllModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setViewAllModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-800">
                  Patient Voices
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  All Patient Reviews &amp; Feedback ({reviews.length})
                </h3>
              </div>
              <button
                onClick={() => setViewAllModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close reviews modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Scrollable Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                        {rev.sourceLabel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      &quot;{rev.reviewContent}&quot;
                    </p>

                    <div className="pt-2 border-t border-slate-200/70">
                      <h4 className="text-xs font-bold text-slate-900">
                        {rev.reviewerName}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {rev.qualifications} • {rev.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setViewAllModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
