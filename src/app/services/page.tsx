"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PATHOLOGY_TESTS, TEST_CATEGORIES } from "@/data/tests";
import { BookingModal } from "@/components/booking/BookingModal";

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedTest, setPreselectedTest] = useState<{ name: string; type: "test" | "package"; price: number } | null>(null);

  const filteredTests = PATHOLOGY_TESTS.filter((test) => {
    const matchesCategory =
      selectedCategory === "All Categories" || test.category === selectedCategory;
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBook = (name: string, price: number) => {
    setPreselectedTest({ name, type: "test", price });
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
            NABL Accredited Diagnostics Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Services & Diagnostic Tests</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Browse our comprehensive test directory. Filter by category, view preparation requirements, and book instant doorstep home collection.
          </p>
        </div>
      </section>

      {/* FILTER & SEARCH STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search by test name (e.g. CBC, HbA1c, Thyroid, Lipid, Liver)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 text-sm outline-none"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 text-sm outline-none bg-white cursor-pointer"
              >
                {TEST_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Category Badges */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400">Categories:</span>
            {TEST_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1 rounded-full transition-all font-medium ${
                  selectedCategory === cat
                    ? "bg-teal-700 text-white font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* TEST LISTING GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <span>Showing {filteredTests.length} diagnostic investigations</span>
          <span className="font-semibold text-teal-700">Doorstep Home Collection Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {test.category}
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-black text-teal-900">₹{test.price}</span>
                    {test.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1.5">
                        ₹{test.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900">{test.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                  {test.shortDescription}
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-slate-50 space-y-1.5 text-[11px] text-slate-600 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sample Type:</span>
                    <span className="font-semibold text-slate-800">{test.sampleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fasting:</span>
                    <span className="font-semibold text-slate-800">{test.fastingRequirement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Turnaround:</span>
                    <span className="font-semibold text-teal-700">{test.turnaroundTime}</span>
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
                  className="py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition"
                >
                  Book This Test
                </button>
              </div>
            </div>
          ))}
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
