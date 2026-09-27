"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Tag,
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Clock,
  Check,
  Sparkles,
  ShieldCheck,
  Calendar
} from "lucide-react";

import { ARTICLES } from "@/data/articles";
import { CURRENT_OFFERS } from "@/data/offers";
import { FAQ_DATA, FAQItem } from "@/data/faqs";
import { BookingModal } from "@/components/booking/BookingModal";

function ResourcesContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "blog";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-b1");
  const [selectedFaqCat, setSelectedFaqCat] = useState<string>("All");

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedOffer, setPreselectedOffer] = useState<{ name: string; type: "test" | "package"; price: number } | null>(null);

  useEffect(() => {
    if (searchParams.get("tab")) {
      setActiveTab(searchParams.get("tab") as string);
    }
  }, [searchParams]);

  const handleBookOffer = (title: string, price: number) => {
    setPreselectedOffer({ name: title, type: "package", price });
    setBookingModalOpen(true);
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedFaqCat === "All" || item.category === selectedFaqCat;
    const matchesQuery =
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
            Patient Hub & Educational Guidance
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Patient Resources, Offers & FAQ</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about test preparations, blood fasting rules, seasonal health camps, special offers, and answers to common diagnostic questions.
          </p>
        </div>
      </section>

      {/* TABS SELECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "blog"
                ? "bg-teal-700 text-white shadow-md"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Health Blog & Guides</span>
          </button>

          <button
            onClick={() => setActiveTab("offers")}
            className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "offers"
                ? "bg-teal-700 text-white shadow-md"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Offers & Camps</span>
          </button>

          <button
            onClick={() => setActiveTab("faq")}
            className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "faq"
                ? "bg-teal-700 text-white shadow-md"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ Answers</span>
          </button>
        </div>
      </section>

      {/* TAB 1: HEALTH BLOG & GUIDES */}
      {activeTab === "blog" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900">Patient Education & Health Articles</h2>
            <p className="text-xs text-slate-500 mt-1">Written and reviewed by senior clinical pathologists.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARTICLES.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{article.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2">{article.summary}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{article.date} • {article.author}</span>
                  <Link
                    href={`/resources/${article.slug}`}
                    className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: OFFERS & HEALTH CAMPS */}
      {activeTab === "offers" && (
        <section id="offers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900">Current Health Camps & Special Offers</h2>
            <p className="text-xs text-slate-500 mt-1">Avail promotional discounts on preventive checkups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURRENT_OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white">
                    {offer.badge}
                  </span>

                  <h3 className="text-xl font-black text-slate-900 mt-3">{offer.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{offer.description}</p>

                  <div className="my-4 p-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-teal-900">₹{offer.discountedPrice}</span>
                      <span className="text-xs text-slate-400 line-through ml-2">₹{offer.originalPrice}</span>
                    </div>
                    {offer.code && (
                      <span className="text-xs font-mono font-bold bg-teal-200 text-teal-900 px-2 py-1 rounded">
                        {offer.code}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-900">Package Includes:</h4>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {offer.includedItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] text-slate-400 block">{offer.validity}</span>
                  <button
                    onClick={() => handleBookOffer(offer.title, offer.discountedPrice)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-xs shadow-md transition"
                  >
                    Book Offer Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: FREQUENTLY ASKED QUESTIONS */}
      {activeTab === "faq" && (
        <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 mt-1">Search or browse by category for quick answers.</p>
          </div>

          {/* Search bar & Category filters */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search question keyword e.g. fasting, reports, whatsapp, payment..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-600 text-xs outline-none"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              {["All", "Booking", "Test Preparation", "Reports", "Home Collection", "Payment"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFaqCat(cat)}
                  className={`px-3 py-1 rounded-full font-semibold transition-all ${
                    selectedFaqCat === cat
                      ? "bg-teal-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion list */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700">
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
                    <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                No matching questions found. Call our helpline at +91 98765 43210 for live support.
              </div>
            )}
          </div>
        </section>
      )}

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={preselectedOffer}
      />

    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading resources...</div>}>
      <ResourcesContent />
    </Suspense>
  );
}
