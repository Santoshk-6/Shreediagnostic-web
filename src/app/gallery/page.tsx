"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Microscope,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Building2,
  HeartHandshake
} from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "laboratory" | "team" | "activities">("all");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const galleryItems = [
    // Laboratory
    {
      id: 1,
      title: "Automated Roche Cobas Immunoassay Suite",
      section: "laboratory",
      categoryName: "Lab Equipment",
      tag: "500 Tests/Hr Automation",
      description: "State-of-the-art dual analyzer track running thyroid, cardiac markers, and oncology biomarkers.",
      bgGradient: "from-teal-800 to-slate-900"
    },
    {
      id: 2,
      title: "Patient Welcoming & Reception Lounge",
      section: "laboratory",
      categoryName: "Reception",
      tag: "Zero-Wait Registration",
      description: "Air-conditioned ergonomic lounge with digital token dispatch and private consultation bays.",
      bgGradient: "from-cyan-800 to-teal-950"
    },
    {
      id: 3,
      title: "Sterile Cleanroom Phlebotomy Bays",
      section: "laboratory",
      categoryName: "Facilities",
      tag: "ISO Class 7 Cleanroom",
      description: "Ergonomic blood collection recliners equipped with positive patient barcoding systems.",
      bgGradient: "from-slate-800 to-slate-950"
    },
    {
      id: 4,
      title: "High-Throughput Sysmex Hematology Center",
      section: "laboratory",
      categoryName: "Lab Interior",
      tag: "Advanced Cell Counters",
      description: "Automated slide staining and 5-part differential laser flow cytometry for complete hemograms.",
      bgGradient: "from-indigo-900 to-teal-900"
    },

    // Team
    {
      id: 5,
      title: "Senior Medical Pathologists Review Panel",
      section: "team",
      categoryName: "Doctors",
      tag: "MD Clinical Pathologists",
      description: "Daily multi-headed microscope review sessions for complex peripheral blood smears and biopsies.",
      bgGradient: "from-emerald-800 to-teal-950"
    },
    {
      id: 6,
      title: "Certified Clinical Lab Technologists",
      section: "team",
      categoryName: "Technicians",
      tag: "NABL 15189 Trained",
      description: "Licensed medical laboratory technologists performing two-level calibrations and control runs.",
      bgGradient: "from-teal-900 to-slate-900"
    },
    {
      id: 7,
      title: "Patient Care & Phlebotomist Staff",
      section: "team",
      categoryName: "Staff",
      tag: "Certified Phlebotomists",
      description: "Our dedicated home dispatch phlebotomist force delivering punctual, painless sample draws.",
      bgGradient: "from-cyan-900 to-slate-900"
    },

    // Activities
    {
      id: 8,
      title: "Community Monsoon Preventive Health Camp",
      section: "activities",
      categoryName: "Health Camps",
      tag: "1,200+ Citizens Screened",
      description: "Free diabetes screening, BP checkups, and subsidized full body health panels for families.",
      bgGradient: "from-teal-800 to-emerald-950"
    },
    {
      id: 9,
      title: "Corporate Health & Wellness Drive at Tech Park",
      section: "activities",
      categoryName: "Events",
      tag: "Corporate Outreach",
      description: "On-site blood testing and doctor consultations conducted for over 450 corporate executives.",
      bgGradient: "from-slate-900 to-teal-950"
    },
    {
      id: 10,
      title: "Doorstep Phlebotomist Home Dispatch",
      section: "activities",
      categoryName: "Home Sample Collection",
      tag: "Temperature Cold-Chain",
      description: "Phlebotomist preparing cold-chain vaccine carrier box for temperature-sensitive diagnostic samples.",
      bgGradient: "from-cyan-800 to-indigo-950"
    }
  ];

  const filteredItems = galleryItems.filter(item =>
    activeCategory === "all" ? true : item.section === activeCategory
  );

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3.5 py-1 rounded-full border border-teal-800 inline-flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Tour of ApexPath Diagnostic Lab</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Laboratory & Facility Gallery</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Take a visual tour inside our automated reference laboratory, patient reception suites, medical team, and community health camp activities.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 max-w-md mx-auto">
          {(["all", "laboratory", "team", "activities"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeCategory === tab
                  ? "bg-teal-700 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {tab === "all" ? "All Photos" : tab}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`h-72 rounded-3xl bg-gradient-to-br ${item.bgGradient} text-white p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all border border-white/10 relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-teal-200 backdrop-blur-md border border-white/20">
                  {item.categoryName}
                </span>
                <span className="text-[10px] font-bold text-slate-300 bg-black/30 px-2 py-0.5 rounded">
                  {item.tag}
                </span>
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-800 to-cyan-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl font-black text-white">Experience High-Tech Pathology in Person</h2>
          <p className="text-teal-100 text-xs sm:text-sm max-w-xl mx-auto">
            Visit our central reference laboratory or book a home phlebotomist visit to sample our world-class healthcare standards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs shadow-lg transition"
            >
              Book a Diagnostic Test
            </button>
            <Link
              href="/about"
              className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition"
            >
              Read About Our Lab & Accreditations
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
