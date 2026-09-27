"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Clock,
  ShieldCheck,
  Stethoscope,
  Calendar,
  Home as HomeIcon,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ArrowLeft,
  Share2
} from "lucide-react";
import { PATHOLOGY_TESTS } from "@/data/tests";
import { BookingModal } from "@/components/booking/BookingModal";
import { PincodeChecker } from "@/components/search/PincodeChecker";

export default function SingleTestPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const test = PATHOLOGY_TESTS.find((t) => t.slug === slug);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  if (!test) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Test Not Found</h2>
        <p className="text-slate-500 text-sm">The requested diagnostic test could not be located in our directory.</p>
        <Link href="/services" className="inline-block px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      
      {/* HEADER BAR */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link href="/services" className="inline-flex items-center gap-1 text-xs text-teal-300 hover:underline font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Tests</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700">
                {test.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">{test.name}</h1>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">{test.shortDescription}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-right min-w-[200px]">
              <span className="text-xs text-slate-300 block">Test Fee</span>
              <div className="text-3xl font-black text-teal-300">₹{test.price}</div>
              {test.originalPrice && (
                <span className="text-xs text-slate-400 line-through">MRP ₹{test.originalPrice}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column Details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Spec Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">Sample Type</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">{test.sampleType}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">Fasting Requirement</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">{test.fastingRequirement}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">Turnaround Time</span>
                <span className="text-xs font-bold text-teal-700 mt-1 block">{test.turnaroundTime}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">Parameters</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">{test.parametersCount} Parameters</span>
              </div>
            </div>

            {/* Comprehensive Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">About This Diagnostic Test</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{test.description}</p>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Key Parameters Measured</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {test.overview.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 p-2 rounded-xl bg-slate-50">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preparation & Instructions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Patient Preparation Instructions</h2>
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-teal-900 leading-relaxed font-medium">
                  {test.preparationInstruction}
                </p>
              </div>
            </div>

            <PincodeChecker />

          </div>

          {/* Right Column Booking Sticky Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl sticky top-28 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded">
                  Instant Booking
                </span>
                <h3 className="text-lg font-black text-slate-900">{test.name}</h3>
                <div className="text-2xl font-black text-teal-900">₹{test.price}</div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-b border-slate-100 py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Free Home Sample Collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified NABL Pathologist Report</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>SMS & WhatsApp Delivery in {test.turnaroundTime}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-sm shadow-md transition"
                >
                  Book This Test Now
                </button>
                <Link
                  href="/home-sample-collection"
                  className="w-full py-3 rounded-xl border border-teal-600 text-teal-700 font-bold text-xs hover:bg-teal-50 transition text-center flex items-center justify-center gap-2"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>Book Home Collection</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={{ name: test.name, type: "test", price: test.price }}
      />

    </div>
  );
}
