"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { PATHOLOGY_TESTS, TEST_CATEGORIES } from "@/data/tests";
import { BookingModal } from "@/components/booking/BookingModal";

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedTest, setPreselectedTest] = useState<{
    name: string;
    type: "test" | "package";
    price: number;
  } | null>(null);

  // Popular individual tests with badges
  const popularTests = useMemo(
    () => PATHOLOGY_TESTS.filter((t) => t.isPopular),
    []
  );

  const filteredTests = useMemo(() => {
    return PATHOLOGY_TESTS.filter((test) => {
      const matchesCategory =
        selectedCategory === "All Categories" || test.category === selectedCategory;
      const matchesSearch =
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.sampleType.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleBook = (name: string, price: number) => {
    setPreselectedTest({ name, type: "test", price });
    setBookingModalOpen(true);
  };

  const isDefaultView = searchTerm.trim() === "" && selectedCategory === "All Categories";

  return (
    <div className="space-y-12 pb-16">
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3.5 py-1 rounded-full border border-teal-800">
            NABL Accredited Diagnostics Directory • 140+ Tests
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Services & Diagnostic Tests</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Browse our comprehensive test catalogue. Search parameters, filter clinical categories, view preparation instructions, and schedule doorstep phlebotomy.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/health-packages"
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition flex items-center gap-2"
            >
              <span>Explore All Health Packages</span>
              <ArrowRight className="w-4 h-4 text-teal-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* COMBINED MAIN SEARCH & FILTER STRIP (Requirement 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search across 140+ tests (e.g. CBC, Lipid, HbA1c, Thyroid, Dengue, Vitamin D, Urea)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 text-xs sm:text-sm outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 text-xs sm:text-sm outline-none bg-white cursor-pointer"
              >
                {TEST_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400">Categories:</span>
            {TEST_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1 rounded-full transition-all font-medium cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-teal-700 text-white font-bold shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR INDIVIDUAL TESTS SECTION WITH POPULAR BADGES (Requirement 5) */}
      {isDefaultView && popularTests.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/60 px-3 py-0.5 rounded-full">
                Most Requested
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">Popular Individual Tests</h2>
            </div>
            <span className="text-xs text-slate-500">Same-Day Digital Reporting Guaranteed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 border-2 border-teal-600/40 shadow-sm hover:shadow-xl hover:border-teal-600 transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>Popular</span>
                    </span>
                    <div className="text-right">
                      <span className="text-xl font-black text-slate-900">₹{test.price}</span>
                      {test.originalPrice && (
                        <span className="text-xs text-slate-400 line-through ml-1.5 font-medium">
                          ₹{test.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {test.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                    {test.shortDescription}
                  </p>

                  <div className="mt-4 p-3 rounded-2xl bg-teal-50/50 space-y-1.5 text-[11px] text-slate-600 border border-teal-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sample:</span>
                      <span className="font-semibold text-slate-800">{test.sampleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fasting:</span>
                      <span className="font-semibold text-slate-800">{test.fastingRequirement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Turnaround:</span>
                      <span className="font-bold text-teal-800">{test.turnaroundTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-2">
                  <Link
                    href={`/services/${test.slug}`}
                    className="py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleBook(test.name, test.price)}
                    className="py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    Book Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FULL TEST LISTING GRID (140+ Tests) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500">
          <span className="font-bold text-slate-800 text-sm">
            All Diagnostic Investigations ({filteredTests.length})
          </span>
          <span className="font-semibold text-teal-700">Doorstep Home Collection Available Across City</span>
        </div>

        {filteredTests.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <p className="text-base font-bold text-slate-700">No diagnostic tests found matching "{searchTerm}"</p>
            <p className="text-xs text-slate-400">
              Try searching with another medical keyword, parameter name, or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All Categories");
              }}
              className="px-5 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-500/60 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {test.category}
                    </span>
                    <div className="text-right">
                      <span className="text-xl font-black text-slate-900">₹{test.price}</span>
                      {test.originalPrice && (
                        <span className="text-xs text-slate-400 line-through ml-1.5 font-medium">
                          ₹{test.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {test.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                    {test.shortDescription}
                  </p>

                  <div className="mt-4 p-3 rounded-2xl bg-slate-50 space-y-1.5 text-[11px] text-slate-600 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sample Type:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[170px]">{test.sampleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fasting:</span>
                      <span className="font-semibold text-slate-800">{test.fastingRequirement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Turnaround:</span>
                      <span className="font-bold text-teal-700">{test.turnaroundTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-2">
                  <Link
                    href={`/services/${test.slug}`}
                    className="py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleBook(test.name, test.price)}
                    className="py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    Book This Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* EXPLORE ALL PACKAGES CTA STRIP (Requirement 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
              Preventative Healthcare
            </span>
            <h3 className="text-2xl font-black text-white">Looking for Multi-Parameter Health Checkups?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Save up to 65% with our curated Full Body, Diabetes, and Senior Citizen packages covering up to 78 parameters.
            </p>
          </div>
          <Link
            href="/health-packages"
            className="px-8 py-4 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs shadow-lg transition whitespace-nowrap flex items-center gap-2"
          >
            <span>Explore All Health Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={preselectedTest}
      />
    </div>
  );
}
