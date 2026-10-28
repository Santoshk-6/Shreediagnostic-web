"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Stethoscope,
  Microscope,
  Target,
  Eye,
  Heart,
  Users,
  Building2,
  Sparkles,
  Calendar,
  Home as HomeIcon,
  Phone,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

export default function AboutPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<"all" | "lab" | "reception" | "equipment">("all");

  const teamMembers = [
    // comments 
    {
      name: "Dr. Ananya Sharma",
      role: "Chief Pathologist & Medical Director",
      qualifications: "MD (Pathology), AIIMS • 18+ Years Exp.",
      specialty: "Hematopathology & Histopathology",
      bio: "Leading diagnostic quality controls and clinical laboratory operations with over 18 years of specialized hospital experience."
    },
    {
      name: "Dr. Rajesh Varma",
      role: "Head of Biochemistry & Endocrinology",
      qualifications: "Ph.D. Clinical Biochemistry • 14+ Years Exp.",
      specialty: "Hormone Immunoassay & Metabolic Testing",
      bio: "Pioneer in automated immunoassay quality validation and microalbumin biomarker standardization."
    },
    {
      name: "Sunita Deshmukh",
      role: "Lead Quality Assurance & NABL Auditor",
      qualifications: "M.Sc. Microbiology, Certified Auditor",
      specialty: "Biosafety Protocols & NABL Compliance",
      bio: "Ensures 100% adherence to NABL 15189 guidelines and daily inter-laboratory proficiency testing."
    }
  ];

  const galleryItems = [
    { title: "Automated Roche Cobas Analyzer Line", category: "equipment", bgGradient: "from-teal-800 to-slate-900" },
    { title: "Sterile Sample Collection Bay", category: "lab", bgGradient: "from-cyan-800 to-teal-900" },
    { title: "Modern Patient Lounge & Reception", category: "reception", bgGradient: "from-slate-800 to-slate-950" },
    { title: "Cold-Chain Logistics & Storage Unit", category: "equipment", bgGradient: "from-emerald-800 to-teal-950" },
    { title: "Hematology High-Throughput Cell Counter", category: "equipment", bgGradient: "from-indigo-900 to-slate-900" },
    { title: "Phlebotomist Dispatch Center", category: "reception", bgGradient: "from-teal-900 to-cyan-950" }
  ];

  const filteredGallery = galleryItems.filter(item =>
    activeGalleryTab === "all" ? true : item.category === activeGalleryTab
  );

  return (
    <div className="space-y-16 pb-16">
      
      {/* PAGE HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
            <Award className="w-4 h-4" />
            <span>Excellence in Medical Diagnostics Since 2012</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">About Shree Diagnostic Center</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Delivering gold-standard pathology report accuracy, advanced diagnostic equipment, and patient-centered healthcare across the region.
          </p>
        </div>
      </section>

      {/* ABOUT LABORATORY & HISTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Our Journey
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Pioneering Accurate Diagnostics & Compassionate Care
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded in 2012 by a team of veteran clinical pathologists, Shree Diagnostic Center was established with a singular vision: to eliminate diagnostic uncertainty through state-of-the-art laboratory automation and rigorous medical ethics.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Over the past decade, we have grown into a premier NABL-accredited regional diagnostic hub processing over 250,000 samples annually. Our central reference laboratory houses fully automated Roche, Siemens, and Sysmex analyzers capable of executing over 500 distinct clinical parameters.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
                <div className="text-2xl font-black text-teal-900">100%</div>
                <div className="text-xs text-slate-600 font-medium">NABL & ISO 9001 Compliant</div>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
                <div className="text-2xl font-black text-teal-900">500+</div>
                <div className="text-xs text-slate-600 font-medium">Specialized Investigations</div>
              </div>
            </div>
          </div>

          {/* Visual Placeholder */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-teal-800 via-slate-900 to-cyan-950 text-white rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden border border-teal-500/20">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                <Microscope className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">Central Reference Facility</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Equipped with bi-directional barcoding, positive sample identification systems, and 24/7 climate-controlled cold storage.
              </p>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-teal-300">
                <span>NABL Reg: M-84920</span>
                <span>ISO 9001:2015</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                To empower patients and healthcare providers with accessible, rapid, and flawless diagnostic intelligence to enable timely medical decisions.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Vision</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                To be the most trusted diagnostic ecosystem recognized nationally for precision pathology, ethical practices, and digital health convenience.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Patient-Centered Values</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compassion, integrity, 100% transparency in pricing, continuous quality control, and zero-compromise patient safety.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* QUALITY & ACCURACY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Accreditation & Quality Protocols
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            Uncompromising Standards for Every Report
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900">NABL Accreditation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Compliant with ISO 15189:2012 medical testing standards audited annually by national accreditation bodies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <Award className="w-8 h-8 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900">Dual Internal Quality Control</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every automated analyzer undergoes two-level calibration checks before processing daily patient samples.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <Sparkles className="w-8 h-8 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900">EQAS External Verification</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Participating member of Bio-Rad & CMC Vellore External Quality Assessment schemes with over 99.8% precision rating.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <CheckCircle2 className="w-8 h-8 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900">100% Barcoded Safety</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automated primary tube barcoding eliminates sample mix-ups and guarantees strict patient traceability.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM & PROFESSIONALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Clinical Leadership
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            Meet Our Senior Pathologists & Specialists
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((m, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-700 text-white font-bold text-xl flex items-center justify-center">
                {m.name.split(" ")[1]?.[0] || "D"}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{m.name}</h3>
                <span className="text-xs font-bold text-teal-700 block">{m.role}</span>
                <span className="text-[11px] text-slate-400 block">{m.qualifications}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-white px-3 py-1 rounded-full">
                Inside Our Facilities
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2">Laboratory Infrastructure Gallery</h2>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2">
              {(["all", "lab", "reception", "equipment"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveGalleryTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                    activeGalleryTab === tab
                      ? "bg-teal-700 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGallery.map((g, idx) => (
              <div
                key={idx}
                className={`h-48 rounded-3xl bg-gradient-to-br ${g.bgGradient} text-white p-6 flex flex-col justify-end shadow-md border border-white/10 relative overflow-hidden group`}
              >
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-xs">
                    {g.category}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1.5">{g.title}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-800 to-cyan-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl font-black text-white">Experience High-Precision Pathology Today</h2>
          <p className="text-teal-100 text-sm max-w-xl mx-auto">
            Book an individual test, schedule doorstep sample pickup, or contact our support team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-sm shadow-lg transition"
            >
              Book a Test
            </button>
            <Link
              href="/home-sample-collection"
              className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition"
            >
              Book Home Collection
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-2xl border border-white/20 text-white hover:bg-white/10 font-bold text-sm transition"
            >
              Contact Us
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
