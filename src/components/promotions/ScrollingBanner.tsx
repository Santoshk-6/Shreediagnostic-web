"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Calendar } from "lucide-react";
import scrollingImagesRaw from "@/data/scrolling-images.json";

interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: string; // "portrait" | "landscape" | "square"
  active: boolean;
  order: number;
}

const scrollingImages = scrollingImagesRaw as SlideItem[];

export const ScrollingBanner = () => {
  const slides = [...scrollingImages]
    .filter((item) => item.active)
    .sort((a, b) => a.order - b.order);

  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSlide, setLightboxSlide] = useState<SlideItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused || lightboxOpen) return;
    intervalRef.current = setInterval(goToNext, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goToNext, slides.length, lightboxOpen]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  const handleBookNow = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  const openLightbox = (slide: SlideItem) => {
    setLightboxSlide(slide);
    setLightboxOpen(true);
  };

  if (slides.length === 0) return null;

  const current = slides[activeSlide];

  return (
    <>
      {/* ── Banner Section ── */}
      <section className="bg-slate-900 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400/80">
              Latest from Shree Diagnostic
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Promotions &amp; Latest Services
            </h2>
          </div>

          {/* Slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Prev Arrow */}
            {slides.length > 1 && (
              <button
                onClick={goToPrev}
                className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition shadow-lg border border-white/10 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Slide Track */}
            <div className="overflow-hidden rounded-2xl mx-6 sm:mx-8">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="min-w-full">
                    <div className="flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden bg-slate-800/60 border border-slate-700/50">

                      {/* Poster Image */}
                      <button
                        onClick={() => openLightbox(slide)}
                        className="flex-shrink-0 w-full sm:w-auto cursor-zoom-in focus:outline-none group"
                        aria-label={`View ${slide.title} full size`}
                      >
                        <div
                          className={`relative overflow-hidden bg-slate-900 flex items-center justify-center
                            ${slide.aspect === "landscape"
                              ? "h-48 sm:h-64 sm:w-80 lg:w-96"
                              : slide.aspect === "square"
                              ? "h-56 sm:h-64 sm:w-64"
                              : "h-56 sm:h-72 sm:w-48 lg:w-56"
                            }`}
                        >
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {/* Zoom hint */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to enlarge
                            </span>
                          </div>
                        </div>
                      </button>

                      {/* Info Panel */}
                      <div className="flex-1 flex flex-col justify-between p-6 sm:p-8">
                        <div className="space-y-3">
                          <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-400/10 border border-teal-400/20 px-2.5 py-1 rounded-full">
                            Promotion
                          </span>
                          <h3 className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-tight">
                            {slide.title}
                          </h3>
                          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            {slide.subtitle}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-6">
                          <button
                            onClick={handleBookNow}
                            className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
                          >
                            <Calendar className="w-4 h-4" />
                            Book Now
                          </button>
                          <button
                            onClick={() => openLightbox(slide)}
                            className="px-5 py-2.5 rounded-xl border-2 border-white/30 hover:border-white/60 text-white font-semibold text-sm transition cursor-pointer"
                          >
                            View Poster
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Arrow */}
            {slides.length > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition shadow-lg border border-white/10 cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Dot Indicators */}
          {slides.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`rounded-full transition-all cursor-pointer ${
                    index === activeSlide
                      ? "w-6 h-2 bg-teal-400"
                      : "w-2 h-2 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Slide counter */}
          {slides.length > 1 && (
            <p className="text-center text-[11px] text-slate-500 mt-2">
              {activeSlide + 1} / {slides.length}
            </p>
          )}
        </div>
      </section>

      {/* ── Full-screen Lightbox ── */}
      {lightboxOpen && lightboxSlide && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition z-10 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <img
              src={lightboxSlide.image}
              alt={lightboxSlide.title}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {/* Caption + Book button */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-white font-bold text-sm text-center">{lightboxSlide.title}</p>
              <button
                onClick={() => { setLightboxOpen(false); handleBookNow(); }}
                className="px-5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book This Test
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
