"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Home as HomeIcon,
  Microscope,
  FileCheck,
  CreditCard,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Phone,
  Sparkles
} from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";
import { PincodeChecker } from "@/components/search/PincodeChecker";
import { PATHOLOGY_TESTS } from "@/data/tests";

export default function HowItWorksPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const steps = [
    {
      step: "01",
      title: "Step 1 – Book a Test",
      shortDesc: "Choose your diagnostic test or health package online or via phone/WhatsApp.",
      details: [
        "Select from over 120+ single pathology tests or comprehensive multi-parameter health packages.",
        "Choose your preferred mode: Doorstep Home Sample Pickup or Walk-in Lab Visit.",
        "Select your preferred date and time slot (Morning fasting slots start as early as 6:00 AM).",
        "Instant confirmation message sent to your mobile phone and WhatsApp."
      ],
      icon: Calendar,
      badge: "Quick 2-Min Booking"
    },
    {
      step: "02",
      title: "Step 2 – Visit Lab or Choose Home Collection",
      shortDesc: "Convenient doorstep sample pickup by a certified phlebotomist or visit our executive lounge.",
      details: [
        "Home Collection: A verified, vaccinated phlebotomist arrives at your doorstep on time.",
        "Equipped with sterile vacuum-sealed blood collection kits opened in front of you.",
        "Walk-in Visit: Enjoy zero-waiting priority admission at our central reference laboratory.",
        "Comfortable, hygienic phlebotomy stations with friendly, experienced technicians."
      ],
      icon: HomeIcon,
      badge: "Zero Waiting Option"
    },
    {
      step: "03",
      title: "Step 3 – Sample Collection & Processing",
      shortDesc: "Barcoded positive sample tracking and automated analyzer processing under MD Pathologists.",
      details: [
        "Primary collection tubes barcoded immediately at bedside, preventing any sample mix-up.",
        "Cold-chain temperature-controlled transport to our central reference laboratory.",
        "Processed on automated Roche Cobas & Siemens high-throughput analyzers.",
        "Dual-level internal quality control and verification by senior MD clinical pathologists."
      ],
      icon: Microscope,
      badge: "NABL 15189 Quality"
    },
    {
      step: "04",
      title: "Step 4 – Get Your Report",
      shortDesc: "Instant digital report delivery on SMS, WhatsApp, and patient portal download.",
      details: [
        "Digital PDF smart report delivered directly via SMS & WhatsApp notifications.",
        "Downloadable 24/7 on our online Patient Report Portal using your Booking ID or Mobile.",
        "Routine blood reports delivered within 6 to 8 hours (Same Day).",
        "Free doctor/pathologist tele-consultation included to help you interpret critical test findings."
      ],
      icon: FileCheck,
      badge: "Same-Day Delivery"
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* PAGE HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3.5 py-1 rounded-full border border-teal-800 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seamless Diagnostic Journey</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">How Pathology Testing Works</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            From easy online booking to certified sample draw, automated analyzer processing, and instant digital report delivery — here is what to expect at every step.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book a Test Now</span>
            </button>
            <Link
              href="/home-sample-collection"
              className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4 text-teal-300" />
              <span>Book Home Collection</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 CORE STEPS DETAILED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Our 4-Stage Protocol
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">A Flawless Experience From Start to Finish</h2>
          <p className="text-slate-500 text-xs mt-1">Designed for maximum patient comfort, safety, and laboratory precision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-teal-600">{item.step}</span>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200/70 px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{item.shortDesc}</p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ESSENTIAL PREPARATION, PAYMENT & TURNAROUND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Preparation instructions */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Preparation Instructions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adhering to proper pre-test preparation ensures maximum diagnostic accuracy.
            </p>
            <div className="space-y-2 text-xs text-slate-700 bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
              <p>• <strong>Fasting Blood Tests:</strong> 10-12 hours overnight fast required for Fasting Blood Sugar & Lipid Profile. Plain water is permitted.</p>
              <p>• <strong>Hydration:</strong> Drink 1-2 glasses of water before sample collection to facilitate smooth venipuncture.</p>
              <p>• <strong>Medications:</strong> Take routine morning pills as prescribed, unless instructed by your doctor.</p>
            </div>
          </div>

          {/* Card 2: Payment Information */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Payment Methods</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multiple hassle-free and secure payment options for all diagnostic services.
            </p>
            <div className="space-y-2 text-xs text-slate-700 bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
              <p>• <strong>Pay on Collection:</strong> Pay your phlebotomist via UPI (GPay, PhonePe, Paytm) QR code or Cash.</p>
              <p>• <strong>Online Payment:</strong> Secure 256-bit encrypted online checkout via Credit/Debit card or Net Banking.</p>
              <p>• <strong>Transparent Rates:</strong> 100% upfront pricing with zero hidden sample handling fees.</p>
            </div>
          </div>

          {/* Card 3: Turnaround Time */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Expected Turnaround Time</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-speed clinical reporting powered by automated laboratory systems.
            </p>
            <div className="space-y-2 text-xs text-slate-700 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <p>• <strong>Routine Tests (CBC, Sugar, LFT, KFT):</strong> Delivered Same Day within 6 to 8 hours.</p>
              <p>• <strong>Hormones & Vitamins (Thyroid, Vit D3, B12):</strong> Ready in 24 hours.</p>
              <p>• <strong>Specialized Cultures & Biopsies:</strong> 48 to 72 hours for thorough microbial incubation.</p>
            </div>
          </div>

        </div>
      </section>

      {/* PINCODE CHECKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PincodeChecker />
      </section>

      {/* FINAL ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-800 to-cyan-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl font-black text-white">Experience Stress-Free Diagnostic Testing</h2>
          <p className="text-teal-100 text-xs sm:text-sm max-w-xl mx-auto">
            Book your appointment now. Free doorstep home sample collection available across all major pincodes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs shadow-lg transition"
            >
              Book a Test
            </button>
            <Link
              href="/reports"
              className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition"
            >
              Download Existing Report
            </Link>
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
