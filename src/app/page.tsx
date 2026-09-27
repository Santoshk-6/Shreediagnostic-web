"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Calendar,
  Home as HomeIcon,
  Phone,
  MessageSquare,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  Star,
  Users,
  Building2,
  MapPin,
  ArrowRight,
  Sparkles,
  Search,
  Activity,
  Microscope,
  Zap,
  ChevronRight,
  FileCheck,
  HeartHandshake,
  Check,
  Layers,
  ThermometerSnowflake,
  QrCode,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";

import { PATHOLOGY_TESTS } from "@/data/tests";
import { HEALTH_PACKAGES } from "@/data/packages";
import { PARTNERS_LIST } from "@/data/partners";
import { CITIES_SERVED } from "@/data/locations";

import { TestSearchBar } from "@/components/search/TestSearchBar";
import { PincodeChecker } from "@/components/search/PincodeChecker";
import { BookingModal } from "@/components/booking/BookingModal";

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedItem, setPreselectedItem] = useState<{ name: string; type: "test" | "package"; price: number } | null>(null);

  const handleBookItem = (name: string, type: "test" | "package", price: number) => {
    setPreselectedItem({ name, type, price });
    setBookingModalOpen(true);
  };

  const categoriesList = [
    { title: "Blood Tests", count: "120+ Tests", href: "/services?category=Blood+Tests", color: "from-rose-500/10 to-rose-600/5", border: "hover:border-rose-300", iconColor: "text-rose-600" },
    { title: "Urine Tests", count: "15+ Tests", href: "/services?category=Urine+Tests", color: "from-amber-500/10 to-amber-600/5", border: "hover:border-amber-300", iconColor: "text-amber-600" },
    { title: "Diabetes Tests", count: "8 Tests", href: "/services?category=Diabetes+Tests", color: "from-blue-500/10 to-blue-600/5", border: "hover:border-blue-300", iconColor: "text-blue-600" },
    { title: "Thyroid Tests", count: "6 Tests", href: "/services?category=Thyroid+Tests", color: "from-violet-500/10 to-violet-600/5", border: "hover:border-violet-300", iconColor: "text-violet-600" },
    { title: "Liver Function (LFT)", count: "11 Parameters", href: "/services?category=Liver+Function+Tests", color: "from-teal-500/10 to-teal-600/5", border: "hover:border-teal-300", iconColor: "text-teal-600" },
    { title: "Kidney Function (KFT)", count: "9 Parameters", href: "/services?category=Kidney+Function+Tests", color: "from-cyan-500/10 to-cyan-600/5", border: "hover:border-cyan-300", iconColor: "text-cyan-600" },
    { title: "Lipid Profile", count: "8 Parameters", href: "/services?category=Lipid+Profile", color: "from-emerald-500/10 to-emerald-600/5", border: "hover:border-emerald-300", iconColor: "text-emerald-600" },
    { title: "CBC / Hemogram", count: "24 Parameters", href: "/services?category=CBC+%2F+Hemogram", color: "from-red-500/10 to-red-600/5", border: "hover:border-red-300", iconColor: "text-red-600" },
    { title: "Vitamin Tests", count: "Vit D3 & B12", href: "/services?category=Vitamin+Tests", color: "from-orange-500/10 to-orange-600/5", border: "hover:border-orange-300", iconColor: "text-orange-600" },
    { title: "Hormone Tests", count: "Endocrinology", href: "/services?category=Hormone+Tests", color: "from-fuchsia-500/10 to-fuchsia-600/5", border: "hover:border-fuchsia-300", iconColor: "text-fuchsia-600" },
    { title: "Other Diagnostic", count: "CRP & Serology", href: "/services?category=Other+Diagnostic+Tests", color: "from-indigo-500/10 to-indigo-600/5", border: "hover:border-indigo-300", iconColor: "text-indigo-600" }
  ];

  const whyChooseUsList = [
    { title: "NABL ISO 15189 Certified", desc: "Gold standard accreditation ensuring rigorous medical laboratory accuracy and precision.", icon: Award },
    { title: "Dual Internal Quality Control", desc: "Every analyzer is calibrated twice daily with Bio-Rad control materials before running samples.", icon: ShieldCheck },
    { title: "Automated Roche & Siemens Tech", desc: "Zero manual intervention testing with bi-directional positive tube barcode tracking.", icon: Microscope },
    { title: "Fast Same-Day Reporting", desc: "Routine blood reports delivered within 6 to 8 hours directly via SMS, WhatsApp & portal.", icon: Zap },
    { title: "Sterile Doorstep Collection", desc: "Vaccinated, certified phlebotomists using 100% single-use vacuum needles opened in front of you.", icon: ThermometerSnowflake },
    { title: "Senior MD Pathologist Sign-off", desc: "Every report is critically evaluated and digitally validated by seasoned MD clinical pathologists.", icon: Stethoscope },
    { title: "Free Doctor Tele-Consultation", desc: "Complimentary medical explanation session included with every health package report.", icon: HeartHandshake },
    { title: "Transparent Upfront Pricing", desc: "Clear pricing with zero hidden phlebotomy or sample transport fees.", icon: Sparkles }
  ];

  const testimonials = [
    {
      name: "Sanjay Malhotra",
      location: "Central Metro • Executive Checkup",
      rating: 5,
      review: "The phlebotomist arrived promptly at 6:45 AM, completely equipped with sterile vacuum collection tubes. Got my Full Body 78-parameter report on WhatsApp by 3:30 PM. Truly world-class laboratory service!",
      date: "Verified Patient • 2 days ago",
      initials: "SM",
      avatarBg: "bg-teal-700"
    },
    {
      name: "Dr. Priya Roy",
      location: "MD (Internal Medicine) • Clinical Partner",
      rating: 5,
      review: "As a consultant physician, diagnostic precision is paramount for my clinical prescriptions. Shree Diagnostic Center delivers consistent calibration accuracy, especially on HbA1c and thyroid panels.",
      date: "Consultant Physician • 1 week ago",
      initials: "PR",
      avatarBg: "bg-blue-700"
    },
    {
      name: "Ramesh Sharma",
      location: "Senior Citizen • Golden Care Package",
      rating: 5,
      review: "Booking home collection was so simple. The technician was gentle and patient with my elderly mother. The detailed PDF report included clear graphical reference ranges that were easy to understand.",
      date: "Verified Patient • 2 weeks ago",
      initials: "RS",
      avatarBg: "bg-emerald-700"
    }
  ];

  return (
    <div className="space-y-20 pb-20 bg-slate-50/50">
      
      {/* 1. HERO SECTION - LUXURY CLINICAL DESIGN */}
      <section className="relative pt-12 pb-24 bg-gradient-to-b from-[#031b24] via-[#072733] to-[#04171f] text-white overflow-hidden">
        
        {/* Subtle Ambient Mesh & Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Value Proposition & Hero CTAs */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              
              {/* Luminous Pulsing Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>NABL Accredited & ISO 9001:2015 Diagnostic Center</span>
              </div>

              {/* High-Impact Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Precision Pathology. <br />
                <span className="bg-gradient-to-r from-teal-200 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
                  Flawless Diagnostics.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
                Empowering patients and clinicians with gold-standard laboratory testing, automated Roche/Siemens analyzers, sterile doorstep sample pickup, and same-day digital reporting.
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => handleBookItem(PATHOLOGY_TESTS[0].name, "test", PATHOLOGY_TESTS[0].price)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <Calendar className="w-5 h-5 text-slate-950" />
                  <span>Book a Test Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <Link
                  href="/home-sample-collection"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm sm:text-base transition-all backdrop-blur-md hover:border-white/30 flex items-center justify-center gap-2.5"
                >
                  <HomeIcon className="w-5 h-5 text-teal-300" />
                  <span>Book Home Collection</span>
                </Link>
              </div>

              {/* Call & WhatsApp Quick Trigger Bar */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-medium">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 hover:text-teal-300 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 group-hover:bg-teal-500/30 flex items-center justify-center text-teal-300 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>Call: +91 98765 43210</span>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 flex items-center justify-center text-emerald-300 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span>WhatsApp Booking</span>
                </a>
              </div>

              {/* Key Trust Counters */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-teal-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">NABL & ISO Verified</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-tight">250K+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Samples Processed</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight">6-8 Hrs</div>
                  <div className="text-[11px] text-slate-400 font-medium">Fast Turnaround</div>
                </div>
              </div>

            </div>

            {/* Right Column: High-End Live Diagnostic Hub Visual */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-slate-900/90 to-[#06212b]/95 p-6 sm:p-7 rounded-3xl border border-teal-500/30 shadow-2xl backdrop-blur-2xl space-y-6">
                
                {/* Header Strip with Live Status */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Full Body Package Spotlight</h4>
                      <p className="text-[11px] text-teal-300">Doctor Recommended Annual Profile</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    62% OFF
                  </span>
                </div>

                {/* Package Spotlight Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Executive Full Body Health Checkup</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Comprehensive 78-parameter screening covering Heart, Liver, Kidneys, Thyroid, Sugar, Vitamin D3/B12, and Complete Hemogram.
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Package Offer Rate</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-teal-300">₹1,499</span>
                        <span className="text-xs text-slate-500 line-through">₹3,999</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block font-medium">Investigations</span>
                      <span className="text-sm font-bold text-emerald-400">78 Total Tests</span>
                    </div>
                  </div>

                  {/* Reassurances */}
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Free Doorstep Home Sample Pickup Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Verified Pathologist Report Delivered on WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Complimentary Doctor Tele-Consultation</span>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => handleBookItem("Executive Full Body Health Checkup", "package", 1499)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-black text-sm transition shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Executive Package Now</span>
                </button>

                {/* Mini Verified Review Snippet */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-300">Rated 4.9/5 from 12,000+ Verified Patients</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE TEST SEARCH MODULE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <TestSearchBar />
      </section>

      {/* 3. KEY SERVICES & TEST CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full">
            Clinical Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore Test Categories & Panels
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            High-precision diagnostic testing executed in fully automated NABL accredited environments.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoriesList.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className={`p-5 rounded-2xl bg-white border border-slate-200/80 ${cat.border} shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-3 group hover:-translate-y-0.5`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Activity className={`w-6 h-6 ${cat.iconColor}`} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                  {cat.title}
                </h3>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR TESTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full">
              Frequently Booked
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              Popular Individual Tests
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">Single diagnostic parameters delivered with same-day digital reports.</p>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 self-start md:self-end"
          >
            <span>Browse All 120+ Tests</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PATHOLOGY_TESTS.filter(t => t.isPopular).slice(0, 6).map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-teal-500/60 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-5 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200/60">
                    {test.category}
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900">₹{test.price}</span>
                    {test.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1.5 font-medium">
                        ₹{test.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {test.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                  {test.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {test.turnaroundTime}
                  </span>
                  <span className="truncate max-w-[150px] font-medium text-slate-600">{test.fastingRequirement}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/services/${test.slug}`}
                    className="py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleBookItem(test.name, "test", test.price)}
                    className="py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    Book Test
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. POPULAR HEALTH CHECKUP PACKAGES */}
      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-white border border-slate-200/80 px-3.5 py-1 rounded-full shadow-xs">
              Preventive Healthcare Profiles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Curated Preventive Health Packages
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              All-inclusive master checkup profiles with up to 65% savings on multi-organ diagnostic screenings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {HEALTH_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                {pkg.isPopular && (
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                    {pkg.category}
                  </span>

                  <h3 className="text-xl font-black text-slate-900 mt-2.5 tracking-tight">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 italic mt-0.5">{pkg.tagline}</p>

                  {/* Price Box */}
                  <div className="my-5 p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-teal-950">₹{pkg.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">{pkg.recommendedFor}</span>
                    </div>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                      {pkg.discountPercentage}% OFF
                    </span>
                  </div>

                  {/* Included list preview */}
                  <div className="space-y-2 text-xs text-slate-700">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-teal-600" />
                      <span>{pkg.testCount} Parameters Included</span>
                    </p>
                    <ul className="space-y-1.5 text-slate-600 text-[11px]">
                      {pkg.includedCategories.slice(0, 3).map((c, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{c.categoryName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Link
                    href={`/health-packages/${pkg.slug}`}
                    className="py-2.5 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleBookItem(pkg.name, "package", pkg.price)}
                    className="py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    Book Package
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/health-packages"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg transition"
            >
              <span>Explore All Packages & Side-by-Side Comparison</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. WHY CHOOSE US (8 CLINICAL EXCELLENCE PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full">
            Clinical Rigor & Reliability
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Patients & Doctors Choose Shree Diagnostic Center
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Setting the benchmark in clinical pathology through automated instrumentation and strict medical protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all space-y-3 relative group hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold group-hover:bg-teal-700 group-hover:text-white transition-colors">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. DOORSTEP SAMPLE COLLECTION + PINCODE CHECKER SPLIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Description */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full">
              Hygienic Home Phlebotomy
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              Diagnostic Convenience Right in Your Living Room
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              Skip clinic traffic and waiting queues. Our vaccinated, certified phlebotomists arrive on time with sterile vacuum tubes and cold-chain temperature carrier kits.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Single-Use Vacuum Needles</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Cold-Chain Sample Transport</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Morning Slots: 6:00 AM – 11:00 AM</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Instant Report on WhatsApp</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/home-sample-collection"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition text-center"
              >
                Schedule Home Collection
              </Link>
              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-100 transition text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>

          {/* Right Column Pincode Checker */}
          <div className="lg:col-span-6">
            <PincodeChecker />
          </div>

        </div>
      </section>

      {/* 8. 4-STEP CHRONOLOGICAL WORKFLOW */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3.5 py-1 rounded-full border border-teal-800">
              Clear 4-Step Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              How Diagnostic Testing Works
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              From online booking to verified digital report delivery in 4 effortless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-3 relative hover:border-teal-500/50 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                01
              </div>
              <h3 className="text-base font-bold text-white">1. Book a Test</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select your test or package online, pick a preferred morning slot, and choose between home collection or lab visit.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-3 relative hover:border-teal-500/50 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                02
              </div>
              <h3 className="text-base font-bold text-white">2. Sample Collection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A certified phlebotomist draws blood or urine safely using single-use vacuum tubes opened in front of you.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-3 relative hover:border-teal-500/50 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                03
              </div>
              <h3 className="text-base font-bold text-white">3. Automated Processing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Positive tube barcode tracking through automated Roche Cobas and Siemens immunoassay analyzers.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-3 relative hover:border-teal-500/50 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                04
              </div>
              <h3 className="text-base font-bold text-white">4. Get Your Report</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive certified PDF reports via SMS, WhatsApp, and patient portal download within 6 to 8 hours.
              </p>
            </div>

          </div>

          <div className="text-center pt-2">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 hover:text-teal-300 transition"
            >
              <span>Read Full Step-by-Step Patient Preparation & Payment Guidelines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 9. GOOGLE REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Rated 4.9/5 by 12,000+ Verified Patients
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">Real patient experiences on our sample collection hygiene and reporting precision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                    Google Review
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.avatarBg} text-white font-bold text-xs flex items-center justify-center`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <span className="text-[10px] text-slate-400 block">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. OUR PARTNERS */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-xs">
                Clinical Healthcare Network
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Trusted By Leading Hospitals & Clinics</h2>
            </div>
            <Link href="/partners" className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1">
              <span>View All Clinical Partners</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNERS_LIST.map((partner) => (
              <div
                key={partner.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 text-center flex flex-col items-center justify-center space-y-2.5 shadow-xs hover:shadow-md transition"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.bgGradient} text-white font-black text-xs flex items-center justify-center shadow-xs`}>
                  {partner.logoText}
                </div>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{partner.name}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{partner.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. REGIONAL SERVICE AREAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              Coverage & Pickup Network
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Cities & Regional Localities Served</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Operating over 15+ satellite collection lounges and 150+ doorstep phlebotomist routes covering all major residential, tech corridor, and suburban pincodes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {CITIES_SERVED.map((c, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-800">{c.name}</div>
                  <div className="text-[10px] text-teal-700 font-medium mt-0.5">{c.count}</div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/home-sample-collection#pincode"
            className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg transition whitespace-nowrap"
          >
            Check Pincode Coverage
          </Link>
        </div>
      </section>

      {/* 12. FINAL HIGH-IMPACT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-cyan-950 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Ready to Book Your Diagnostic Test?
            </h2>
            <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
              Schedule your appointment online in under 2 minutes. Free home sample collection available with same-day digital reporting.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => handleBookItem(PATHOLOGY_TESTS[0].name, "test", PATHOLOGY_TESTS[0].price)}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book a Test Now</span>
            </button>
            <Link
              href="/home-sample-collection"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <HomeIcon className="w-4 h-4 text-teal-300" />
              <span>Book Home Collection</span>
            </Link>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={preselectedItem}
      />

    </div>
  );
}
