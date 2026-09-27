"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, ArrowRight, Sparkles, Clock, CheckCircle, Stethoscope, ChevronRight } from "lucide-react";
import { PATHOLOGY_TESTS, TEST_CATEGORIES } from "@/data/tests";
import { BookingModal } from "../booking/BookingModal";

export const TestSearchBar = () => {
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

  const handleBookTest = (testName: string, price: number) => {
    setPreselectedTest({ name: testName, type: "test", price });
    setBookingModalOpen(true);
  };

  const popularTags = [
    "CBC Test",
    "Thyroid Profile",
    "Fasting Blood Sugar",
    "Lipid Profile",
    "Vitamin D3",
    "HbA1c"
  ];

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] border border-slate-200/90">
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 tracking-tight">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Search className="w-5 h-5 text-teal-700" />
            </div>
            <span>Search Pathology Tests & Health Panels</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Search 120+ diagnostic investigations by test name, organ category, or medical condition
          </p>
        </div>

        {/* Popular Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-400 mr-1">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="text-xs px-3 py-1 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold transition-colors border border-teal-200/70 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
        
        {/* Search input */}
        <div className="md:col-span-2 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search diagnostic test e.g. CBC, Thyroid, HbA1c, Vitamin D3, Lipid Profile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-2xl border border-slate-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 text-slate-800 text-xs sm:text-sm outline-none transition shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold bg-slate-100 px-2 py-1 rounded-md cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category selector */}
        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 text-slate-800 text-xs sm:text-sm outline-none transition bg-white cursor-pointer shadow-xs"
          >
            {TEST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Results grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
          <span className="font-medium">Found <strong className="text-teal-800 font-bold">{filteredTests.length}</strong> matching diagnostic investigations</span>
          <Link href="/services" className="text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1">
            <span>View All Tests</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[440px] overflow-y-auto pr-1">
          {filteredTests.slice(0, 6).map((test) => (
            <div
              key={test.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 hover:border-teal-500/60 bg-white hover:bg-teal-50/15 transition-all flex flex-col justify-between space-y-3 group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/60 uppercase tracking-wide">
                    {test.category}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">₹{test.price}</span>
                    {test.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1.5 font-medium">
                        ₹{test.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {test.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {test.shortDescription}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-teal-600" />
                    {test.turnaroundTime}
                  </span>
                  <span>•</span>
                  <span className="truncate max-w-[130px] font-medium text-slate-600">{test.fastingRequirement}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/services/${test.slug}`}
                    className="text-xs font-semibold text-slate-600 hover:text-teal-700 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleBookTest(test.name, test.price)}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTests.length === 0 && (
            <div className="col-span-2 py-10 text-center text-slate-400 text-xs sm:text-sm">
              No matching diagnostic test found for "{searchTerm}". Try searching for "CBC", "Thyroid", "HbA1c", or "Sugar".
            </div>
          )}
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={preselectedTest}
      />
    </div>
  );
};
