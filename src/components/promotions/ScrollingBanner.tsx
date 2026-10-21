"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, FileText, X, ExternalLink } from "lucide-react";
import scrollingImagesRaw from "@/data/scrolling-images.json";

const scrollingImages = scrollingImagesRaw as SlideItem[];

interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  file: string;
  type: string;
  active: boolean;
  order: number;
}

const gradients = [
  "from-teal-600 to-teal-800",
  "from-blue-600 to-blue-800",
  "from-purple-600 to-purple-800",
  "from-rose-600 to-rose-800",
  "from-emerald-600 to-emerald-800",
];

export const ScrollingBanner = () => {
  const slides = [...scrollingImages]
    .filter((item) => item.active)
    .sort((a, b) => a.order - b.order);

  const [activeSlide, setActiveSlide] = useState(0);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<SlideItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (!isPaused) {
      intervalRef.current = setInterval(goToNext, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goToNext, slides.length]);

  const handleViewBrochure = (slide: SlideItem) => {
    setSelectedPdf(slide);
    setPdfModalOpen(true);
  };

  const handleBookNow = () => {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  const handleCloseModal = () => {
    setPdfModalOpen(false);
    setSelectedPdf(null);
  };

  if (slides.length === 0) return null;

  return (
    <>
      {/* Banner Section */}
      <section className="bg-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h2 className="text-center text-teal-400 text-xl font-semibold tracking-wide uppercase mb-6">
            Promotions &amp; Latest Services
          </h2>

          {/* Slider Container */}
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Prev Arrow */}
            {slides.length > 1 && (
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Cards Track */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="min-w-full"
                  >
                    <div
                      className={`bg-gradient-to-br ${gradients[index % gradients.length]} rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8`}
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 bg-white/10 rounded-2xl">
                        <FileText className="w-16 h-16 md:w-20 md:h-20 text-white" />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-tight mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base mb-6">
                          {slide.subtitle}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                          <button
                            onClick={() => handleViewBrochure(slide)}
                            className="px-5 py-2.5 rounded-lg border-2 border-white text-white font-medium text-sm hover:bg-white hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
                          >
                            View Brochure
                          </button>
                          <button
                            onClick={handleBookNow}
                            className="px-5 py-2.5 rounded-lg bg-white text-slate-900 font-medium text-sm hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
                          >
                            Book Now
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
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Dot Indicators */}
          {slides.length > 1 && (
            <div className="flex justify-center gap-2 mt-5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                    index === activeSlide
                      ? "w-6 h-2.5 bg-teal-400"
                      : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PDF Modal */}
      {pdfModalOpen && selectedPdf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden"
               style={{ maxHeight: "90vh" }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 flex-shrink-0">
              <h3 className="text-slate-800 font-semibold text-lg truncate pr-4">
                {selectedPdf.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={selectedPdf.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </a>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Iframe */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={selectedPdf.file}
                title={selectedPdf.title}
                className="w-full h-full border-0"
                style={{ minHeight: "70vh" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
