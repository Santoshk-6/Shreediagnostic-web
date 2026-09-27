"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, CheckCircle2, Clock, ShieldCheck, Calendar, Home as HomeIcon, AlertCircle } from "lucide-react";
import { HEALTH_PACKAGES } from "@/data/packages";
import { BookingModal } from "@/components/booking/BookingModal";
import { PincodeChecker } from "@/components/search/PincodeChecker";

export default function SinglePackagePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const pkg = HEALTH_PACKAGES.find((p) => p.slug === slug);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  if (!pkg) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Package Not Found</h2>
        <Link href="/health-packages" className="inline-block px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs">
          Back to Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link href="/health-packages" className="inline-flex items-center gap-1 text-xs text-teal-300 hover:underline font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Health Packages</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700">
                {pkg.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">{pkg.name}</h1>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">{pkg.description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-right min-w-[200px]">
              <span className="text-xs text-emerald-300 font-bold block">{pkg.discountPercentage}% DISCOUNT</span>
              <div className="text-3xl font-black text-teal-300">₹{pkg.price}</div>
              <span className="text-xs text-slate-400 line-through">MRP ₹{pkg.originalPrice}</span>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">Total Investigations</span>
                <span className="text-sm font-black text-teal-900 mt-1 block">{pkg.testCount} Parameters</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">Report Delivery</span>
                <span className="text-sm font-bold text-teal-700 mt-1 block">{pkg.turnaroundTime}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">Fasting Guideline</span>
                <span className="text-xs font-bold text-slate-800 mt-1 block">{pkg.fastingRequirement}</span>
              </div>
            </div>

            {/* Test Categories Breakdown */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Included Test Panels & Parameters</h2>

              <div className="space-y-6">
                {pkg.includedCategories.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                    <h3 className="text-sm font-bold text-teal-900 border-b border-slate-200 pb-2">
                      {c.categoryName}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                      {c.testsIncluded.map((testItem, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{testItem}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <PincodeChecker />

          </div>

          {/* Right Column Booking Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl sticky top-28 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded">
                  {pkg.recommendedFor}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">{pkg.name}</h3>
                <div className="text-3xl font-black text-teal-900 mt-1">₹{pkg.price}</div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-b border-slate-100 py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Free Doorstep Home Sample Pickup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>NABL Quality Control Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Free Tele-Consultation with Doctor</span>
                </div>
              </div>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-sm shadow-md transition"
              >
                Book Package Now
              </button>
            </div>
          </div>

        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={{ name: pkg.name, type: "package", price: pkg.price }}
      />

    </div>
  );
}
