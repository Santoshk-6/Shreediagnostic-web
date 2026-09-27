"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageSquare,
  Sparkles,
  Calendar,
  Home as HomeIcon,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { FAQ_DATA, FAQItem } from "@/data/faqs";
import { BookingModal } from "@/components/booking/BookingModal";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-b1");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const categories = ["All", "Booking", "Test Preparation", "Reports", "Home Collection", "Payment"];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3.5 py-1 rounded-full border border-teal-800 inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Patient Assistance & Diagnostic FAQs</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Frequently Asked Questions</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Find immediate answers regarding test fasting guidelines, sample collection timings, online report downloads, and payment options.
          </p>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search Input */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search questions by keyword e.g. fasting, sugar, report download, whatsapp, cash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-600 text-xs sm:text-sm outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 flex-wrap pt-4 mt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400">Categories:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all hover:border-teal-500/50"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                      {faq.category}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-teal-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No matching questions found</h3>
              <p className="text-xs text-slate-500">
                Need immediate assistance? Connect with our 24/7 patient support helpline at +91 98765 43210.
              </p>
            </div>
          )}
        </div>

      </section>

      {/* QUICK ASSISTANCE CHANNELS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Still Have Questions?</h3>
            <p className="text-xs text-slate-400">Our patient coordinators and medical lab staff are ready to help.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:+919876543210"
              className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 flex items-center gap-3 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Phone Support Helpline</span>
                <span className="text-sm font-bold text-white">+91 98765 43210</span>
              </div>
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 flex items-center gap-3 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Instant WhatsApp Support</span>
                <span className="text-sm font-bold text-white">Chat on WhatsApp</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

    </div>
  );
}
