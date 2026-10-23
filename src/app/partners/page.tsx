"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  CheckCircle2,
  Award,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ShieldCheck,
  Building2,
  FileCheck,
  ExternalLink,
  Layers,
  Sparkles
} from "lucide-react";
import partnersData from "@/data/trusted-partners.json";
import { PARTNER_BENEFITS } from "@/data/partners";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  aspect: "v" | "h" | string;
  badge: string;
}

interface Partner {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logoText: string;
  logoColor: string;
  logoFile: string;
  website: string;
  specialties: string[];
  gallery: GalleryItem[];
  featured: boolean;
  order: number;
}

interface GalleryExhibit extends GalleryItem {
  partnerId: string;
  partnerName: string;
  partnerColor: string;
}

const partners = partnersData as Partner[];

const logoGradients: Record<string, string> = {
  blue: "from-blue-700 to-blue-500",
  teal: "from-teal-700 to-teal-500",
  purple: "from-purple-700 to-purple-500",
  rose: "from-rose-700 to-rose-500",
};

// ---------------------------------------------------------------------------
// Dedicated Separate Section: Partner Credentials & Exhibits Carousel Slider
// ---------------------------------------------------------------------------
function PartnerExhibitsSlider({
  exhibits,
  onOpenLightbox,
}: {
  exhibits: GalleryExhibit[];
  onOpenLightbox: (item: GalleryItem) => void;
}) {
  const [selectedPartner, setSelectedPartner] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filter exhibits by active tab
  const filtered =
    selectedPartner === "all"
      ? exhibits
      : exhibits.filter((e) => e.partnerId === selectedPartner);

  const total = filtered.length;

  // Responsive visible cards: 3 on desktop, 2 on tablet, 1 on mobile
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const maxIndex = Math.max(0, total - cardsPerView);

  // Reset index when changing filter
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedPartner]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay rotation every 4.5 seconds
  useEffect(() => {
    if (total <= cardsPerView || isHovered) return;
    timerRef.current = setTimeout(nextSlide, 4500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, total, cardsPerView, isHovered, nextSlide]);

  // Touch gestures for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) nextSlide();
      else prevSlide();
    }
  };

  const cardWidthPct = 100 / cardsPerView;

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Filter Tabs & Navigation Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <button
            onClick={() => setSelectedPartner("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
              selectedPartner === "all"
                ? "bg-teal-600 text-white shadow-teal-600/30"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Exhibits ({exhibits.length})
          </button>
          <button
            onClick={() => setSelectedPartner("clinova")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
              selectedPartner === "clinova"
                ? "bg-blue-600 text-white shadow-blue-600/30"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Clinova Diagnostics (
            {exhibits.filter((e) => e.partnerId === "clinova").length})
          </button>
          <button
            onClick={() => setSelectedPartner("niptr")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
              selectedPartner === "niptr"
                ? "bg-teal-700 text-white shadow-teal-700/30"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            NIPTR Genetic Lab (
            {exhibits.filter((e) => e.partnerId === "niptr").length})
          </button>
        </div>

        {/* Carousel Prev/Next Buttons */}
        {total > cardsPerView && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium tabular-nums mr-1">
              {currentIndex + 1} - {Math.min(currentIndex + cardsPerView, total)} of {total}
            </span>
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-xl bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-700 flex items-center justify-center transition border border-slate-200 shadow-xs cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-9 h-9 rounded-xl bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-700 flex items-center justify-center transition border border-slate-200 shadow-xs cursor-pointer disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Multi-Card Slider Viewport */}
      <div
        className="overflow-hidden rounded-3xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * cardWidthPct}%)`,
          }}
        >
          {filtered.map((item, idx) => {
            const isVertical = item.aspect === "v";
            return (
              <div
                key={`${item.id}-${idx}`}
                className="flex-shrink-0 px-2 sm:px-3"
                style={{ width: `${cardWidthPct}%` }}
              >
                <div
                  onClick={() => onOpenLightbox(item)}
                  className="group relative rounded-3xl overflow-hidden border border-slate-200 hover:border-teal-400 bg-slate-950 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  style={{ height: "420px" }}
                  title={`Click to inspect: ${item.title}`}
                >
                  {/* Top Bar with Partner Tag & Badge */}
                  <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-teal-300 px-3 py-1 rounded-full border border-white/10 shadow-xs">
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-bold bg-white/90 text-slate-900 px-2.5 py-0.5 rounded-full shadow-xs">
                      {item.partnerName.split(" ")[0]}
                    </span>
                  </div>

                  {/* Main Image with full aspect ratio preserved (object-contain) */}
                  <div className="relative w-full h-[340px] flex items-center justify-center p-3 pt-10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain object-center group-hover:scale-[1.03] transition-transform duration-500"
                      draggable={false}
                    />
                  </div>

                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-white/95 text-teal-700 flex items-center justify-center shadow-xl">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom Caption Bar */}
                  <div className="p-3.5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent border-t border-slate-800">
                    <p className="text-xs font-bold text-white leading-snug line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-teal-400 mt-0.5 flex items-center gap-1">
                      <span>{item.partnerName}</span>
                      <span>•</span>
                      <span className="capitalize">{isVertical ? "Vertical Poster" : "Horizontal Exhibit"}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dot Indicators */}
      {total > cardsPerView && (
        <div className="flex justify-center items-center gap-1.5 pt-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide group ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? "w-6 h-2 bg-teal-600"
                  : "w-2 h-2 bg-slate-200 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PartnersPage() {
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLightbox(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const featuredPartners = partners
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);

  // Flatten all exhibits for the dedicated separate slider section
  const allExhibits: GalleryExhibit[] = featuredPartners.flatMap((p) =>
    p.gallery.map((g) => ({
      ...g,
      partnerId: p.id,
      partnerName: p.name,
      partnerColor: p.logoColor,
    }))
  );

  return (
    <div className="space-y-0 pb-16">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
            Trusted Diagnostic Network
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Our Trusted Partners
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Shree Diagnostic Center collaborates with accredited molecular diagnostic labs and specialist partners to deliver precision diagnostics, advanced fetal testing, and same-day digital reporting.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {featuredPartners.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-2xl px-5 py-3"
              >
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${
                    logoGradients[p.logoColor] || logoGradients.teal
                  } text-white font-black text-xs flex items-center justify-center shadow`}
                >
                  {p.logoText.slice(0, 2)}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-sm">{p.shortName}</div>
                  <div className="text-teal-400 text-[10px]">
                    {p.tagline.split(" ").slice(0, 3).join(" ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. FEATURED TRUSTED PARTNERS PROFILES (CLEAN, UNCLUTTERED CARDS) */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Reference Laboratory Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Diagnostic Network Partners
            </h2>
            <p className="text-slate-500 text-sm">
              Explore our accredited reference laboratories and specialist partners powering our advanced clinical testing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Partner Header with Official Logo */}
                <div>
                  <div
                    className={`bg-gradient-to-br ${
                      logoGradients[partner.logoColor] || logoGradients.teal
                    } p-6 sm:p-7 text-white`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center font-black text-lg border border-white/30 shadow-lg text-white">
                        {partner.logoText.slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">{partner.name}</h3>
                        <p className="text-white/80 text-xs mt-1">{partner.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Partner Information Body */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {partner.description}
                    </p>

                    {/* Specialties */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                        Clinical Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.specialties.map((spec, i) => (
                          <span
                            key={i}
                            className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200/60"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Accreditation Stamp */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-teal-700 font-bold">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>NABL Reference Partner</span>
                  </span>
                  <span className="text-slate-400 font-medium">
                    {partner.gallery.length} Official Exhibits Below
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DEDICATED SEPARATE SECTION: ACCREDITED PARTNER CREDENTIALS & POSTERS SLIDER */}
      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-white border border-slate-200 px-3.5 py-1 rounded-full shadow-xs">
              Official Verification &amp; Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Credentials &amp; Posters Gallery
            </h2>
            <p className="text-slate-500 text-sm">
              Official ISO/NABL accreditations, clinical investigation standards, and diagnostic posters from our partner network.
            </p>
          </div>

          {/* Full-width Responsive Carousel Slider */}
          <PartnerExhibitsSlider
            exhibits={allExhibits}
            onOpenLightbox={(item) => setActiveLightbox(item)}
          />
        </div>
      </section>

      {/* 3. PARTNER BENEFITS GRID */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full">
              Synergistic Healthcare
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Benefits of Our Diagnostic Network
            </h2>
            <p className="text-slate-500 text-sm">
              How our accredited collaborations ensure superior diagnostic turnaround, accuracy, and patient convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNER_BENEFITS.map((b, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{b.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar: Title & Close Button */}
            <div className="w-full flex items-center justify-between text-white px-2">
              <span className="text-xs sm:text-sm font-bold text-slate-200 truncate">
                {activeLightbox.title}
              </span>
              <button
                onClick={() => setActiveLightbox(null)}
                aria-label="Close image viewer"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res Image Display — object-contain ensures 100% full view without cropping */}
            <div className="relative w-full max-h-[82vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/50">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="max-h-[82vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
