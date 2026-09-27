"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tag,
  Calendar,
  CheckCircle2,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Phone,
  Percent
} from "lucide-react";
import { CURRENT_OFFERS } from "@/data/offers";
import { BookingModal } from "@/components/booking/BookingModal";

export default function OffersPage() {
  const [selectedOfferFilter, setSelectedOfferFilter] = useState<string>("All");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedOffer, setPreselectedOffer] = useState<{ name: string; type: "test" | "package"; price: number } | null>(null);

  const offerCategories = ["All", "Health Camp", "Special Offer", "Campaign"];

  const filteredOffers = CURRENT_OFFERS.filter(offer =>
    selectedOfferFilter === "All" ? true : offer.category === selectedOfferFilter
  );

  const handleBook = (title: string, price: number) => {
    setPreselectedOffer({ name: title, type: "package", price });
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3.5 py-1 rounded-full border border-teal-800 inline-flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5" />
            <span>Exclusive Seasonal Health Savings</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Offers, Health Camps & Discounts</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Avail subsidized full-body preventative health packages, community diagnostic camps, and special seasonal savings for your entire family.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {offerCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedOfferFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedOfferFilter === cat
                  ? "bg-teal-700 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat === "All" ? "All Current Offers" : cat + "s"}
            </button>
          ))}
        </div>
      </section>

      {/* OFFERS CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-600 text-white">
                    {offer.badge}
                  </span>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded">
                    {offer.category}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mt-2">{offer.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{offer.description}</p>

                {/* Price block */}
                <div className="my-5 p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Camp Package Rate</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-teal-900">₹{offer.discountedPrice}</span>
                      <span className="text-xs text-slate-400 line-through">₹{offer.originalPrice}</span>
                    </div>
                  </div>
                  {offer.code && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Coupon Code</span>
                      <span className="text-xs font-mono font-bold bg-teal-200 text-teal-950 px-2 py-1 rounded">
                        {offer.code}
                      </span>
                    </div>
                  )}
                </div>

                {/* Included parameters */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">What's Included:</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {offer.includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Terms */}
                <div className="pt-4 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Terms & Conditions:</span>
                  {offer.terms.map((term, tIdx) => (
                    <p key={tIdx}>• {term}</p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-teal-600" />
                  <span>{offer.validity}</span>
                </span>
                <button
                  onClick={() => handleBook(offer.title, offer.discountedPrice)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book This Offer Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORPORATE / HEALTH CAMP INQUIRY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
              Community & Corporate Drives
            </span>
            <h3 className="text-2xl font-bold text-white">Want to Organize a Health Camp for Your Society or Company?</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              We provide on-site phlebotomy stations, free doctor tele-consultations, and customized diagnostic camp packages.
            </p>
          </div>
          <Link
            href="/partner-with-us"
            className="px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs whitespace-nowrap shadow-lg transition"
          >
            Organize Health Camp
          </Link>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={preselectedOffer}
      />

    </div>
  );
}
