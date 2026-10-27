"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Check, ArrowRight, ShieldCheck, Clock, FileCheck, Building2, Users } from "lucide-react";
import { HEALTH_PACKAGES, PACKAGE_CATEGORIES } from "@/data/packages";
import { PackageComparisonTable } from "@/components/packages/PackageComparisonTable";
import { BookingModal } from "@/components/booking/BookingModal";
import { GoogleDisplayBanner } from "@/components/promotions/GoogleDisplayBanner";

export default function HealthPackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Packages");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedPkg, setPreselectedPkg] = useState<{ name: string; type: "test" | "package"; price: number } | null>(null);

  const filteredPackages = HEALTH_PACKAGES.filter((pkg) => {
    return selectedCategory === "All Packages" || pkg.category === selectedCategory;
  });

  const handleBook = (name: string, price: number) => {
    setPreselectedPkg({ name, type: "package", price });
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
            Preventative Diagnostic Profiles
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Full Body Health Checkup Packages</h1>
                    <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            All-inclusive diagnostic screening bundles designed for complete organ evaluation, metabolic health, and early disease prevention.
          </p>

          {/* CORPORATE & GROUP BOOKING PROMOTIONAL BANNER */}
          <div className="pt-6 max-w-4xl mx-auto text-left">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900/90 via-slate-900/95 to-cyan-950/90 border border-teal-500/40 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[11px] font-bold uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Corporate Wellness &amp; Health Camps</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Special Health Packages for Groups &amp; Corporates
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                    Explore special pricing for corporate wellness programs, health camps, and group health checkups.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-teal-200">
                    <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">• Employee Health Checkups</span>
                    <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">• On-site Health Camps</span>
                    <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">• Preventive Screening Drives</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PACKAGE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-teal-700 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PACKAGES CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                    {pkg.category}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {pkg.discountPercentage}% OFF
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mt-1">{pkg.name}</h3>
                <p className="text-xs text-slate-500 italic mt-0.5">{pkg.tagline}</p>

                <div className="my-4 p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-teal-900">₹{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">₹{pkg.originalPrice}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {pkg.testCount} Parameters
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">Key Included Investigations:</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {pkg.includedCategories.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{c.categoryName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <Link
                  href={`/health-packages/${pkg.slug}`}
                  className="py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 transition"
                >
                  View Full Details
                </Link>
                <button
                  onClick={() => handleBook(pkg.name, pkg.price)}
                  className="py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-xs shadow-md transition"
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GoogleDisplayBanner aspect="h" pageContext="health-packages" />
      </div>

      {/* PACKAGE COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <PackageComparisonTable />

        <div className="text-center pt-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg transition"
          >
            <span>Explore All 140+ Individual Diagnostic Tests & Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={preselectedPkg}
      />

    </div>
  );
}
