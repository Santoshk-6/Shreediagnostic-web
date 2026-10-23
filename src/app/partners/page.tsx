"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Award,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ShieldCheck,
  Building2,
  FileCheck
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

const partners = partnersData as Partner[];

const logoGradients: Record<string, string> = {
  blue: "from-blue-700 to-blue-500",
  teal: "from-teal-700 to-teal-500",
  purple: "from-purple-700 to-purple-500",
  rose: "from-rose-700 to-rose-500",
};

// ---------------------------------------------------------------------------
// Partner Image Gallery Slider Component
// ---------------------------------------------------------------------------
function PartnerGallerySlider({
  items,
  partnerName,
  onOpenLightbox,
}: {
  items: GalleryItem[];
  partnerName: string;
  onOpenLightbox: (item: GalleryItem) => void;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const total = items.length;

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + total) % total);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4 pt-4 border-t border-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Credentials &amp; Posters Gallery
          </span>
          <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
            {total} Exhibits
          </span>
        </div>

        {/* Gallery Slider Controls */}
        {total > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              aria-label={`Previous ${partnerName} certificate`}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 flex items-center justify-center transition border border-slate-200 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label={`Next ${partnerName} certificate`}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 flex items-center justify-center transition border border-slate-200 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Responsive Gallery Grid: 1 Vertical (_v) + 2 Horizontal (_h) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map((item, idx) => {
          const isVertical = item.aspect === "v";
          return (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className={`group/img relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-xs hover:shadow-lg hover:border-teal-400 transition-all duration-300 cursor-pointer ${
                isVertical ? "sm:row-span-1 aspect-[3/4]" : "aspect-[16/10] sm:aspect-[16/11]"
              }`}
              title={`Click to view full image: ${item.title}`}
            >
              {/* Badge Tag */}
              <div className="absolute top-2 left-2 z-10">
                <span className="text-[9px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-teal-300 px-2 py-0.5 rounded-full border border-white/10 shadow-xs">
                  {item.badge}
                </span>
              </div>

              {/* Full Image preserved with object-contain (zero text cropping) */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain object-center group-hover/img:scale-[1.02] transition-transform duration-300"
              />

              {/* Hover Zoom Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-4 h-4 text-teal-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smooth Indicator Dots */}
      <div className="flex justify-center gap-1.5 pt-1">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlideIndex(i)}
            aria-label={`View slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === slideIndex ? "w-5 bg-teal-600" : "w-1.5 bg-slate-200 hover:bg-slate-300"
            }`}
          />
        ))}
      </div>
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

      {/* FEATURED TRUSTED PARTNERS WITH RESPONSIVE IMAGE GALLERIES */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Partner Credentials &amp; Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Diagnostic Network Credentials
            </h2>
            <p className="text-slate-500 text-sm">
              Explore official certifications, clinical investigations, and specialized testing panels from our accredited partner labs.
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
                    } p-6 text-white`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center font-black text-lg border border-white/30 shadow-lg text-white">
                        {partner.logoText.slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">{partner.name}</h3>
                        <p className="text-white/80 text-xs mt-0.5">{partner.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Partner Information Body */}
                  <div className="p-6 space-y-5">
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {partner.description}
                    </p>

                    {/* Specialties */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Clinical Specialties
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {partner.specialties.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Responsive Image Gallery: 1 Vertical (_v) + 2 Horizontal (_h) */}
                    <PartnerGallerySlider
                      items={partner.gallery}
                      partnerName={partner.name}
                      onOpenLightbox={(item) => setActiveLightbox(item)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER BENEFITS GRID */}
      <section className="bg-slate-50 py-16 border-b border-slate-200/60">
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
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
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
