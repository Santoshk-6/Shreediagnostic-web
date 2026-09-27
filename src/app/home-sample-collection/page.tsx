"use client";

import React, { useState } from "react";
import {
  Home as HomeIcon,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Award
} from "lucide-react";
import { PincodeChecker } from "@/components/search/PincodeChecker";
import { PATHOLOGY_TESTS } from "@/data/tests";
import { HEALTH_PACKAGES } from "@/data/packages";

export default function HomeSampleCollectionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    selectedItem: PATHOLOGY_TESTS[0].name,
    address: "",
    pincode: "",
    date: "",
    timeSlot: "07:00 AM - 09:00 AM",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "HOME-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(id);
    setSubmitted(true);
  };

  const collectionSteps = [
    { num: "01", title: "Select Test / Package", desc: "Choose your desired diagnostic test or health package on our website." },
    { num: "02", title: "Choose Location & Slot", desc: "Specify your home address, pincode, and preferred morning time slot." },
    { num: "03", title: "Phlebotomist Visits", desc: "Certified, vaccinated phlebotomist arrives equipped with sterile kits." },
    { num: "04", title: "Hygienic Sample Draw", desc: "Barcoded blood/urine collection using single-use vacuum needles." },
    { num: "05", title: "Cold-Chain Transport", desc: "Sample transported to main reference lab in temperature-controlled boxes." },
    { num: "06", title: "Digital Report Delivery", desc: "Verified PDF report sent directly via SMS, WhatsApp, and email." }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
            <HomeIcon className="w-4 h-4" />
            <span>Zero Travel Required • 100% Sterile Doorstep Service</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Doorstep Home Sample Collection</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Get your blood and urine tests done from the comfort of your home. Certified phlebotomists, sterile single-use vacuum tubes, and same-day report delivery.
          </p>

          <div className="pt-2 flex justify-center gap-4">
            <a href="#booking-form" className="px-8 py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs shadow-lg transition">
              Book Home Collection Now
            </a>
            <a href="tel:+919876543210" className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-300" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS 6 STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Step-by-Step Workflow
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">How Home Collection Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionSteps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 relative">
              <span className="text-3xl font-black text-teal-200">{step.num}</span>
              <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE AREAS & PINCODE CHECKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PincodeChecker />
      </section>

      {/* TIMINGS & PREPARATION GUIDANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Collection Timings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Phlebotomists are available for doorstep visits 7 days a week from 6:00 AM to 6:00 PM.
            </p>
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs text-teal-900 space-y-1 font-medium">
              <p>• Morning Slots (6:00 AM - 11:00 AM): Best for Fasting Blood Sugar & Lipid Profiles</p>
              <p>• Afternoon Slots (11:00 AM - 4:00 PM): Ideal for Routine Blood & Non-Fasting Tests</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Preparation & Safety Protocols</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drink 1-2 glasses of plain water before phlebotomist arrival to make blood collection smooth.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1 font-medium">
              <p>• 100% sterile single-use vacuum tube needles opened right in front of you.</p>
              <p>• Temperature-controlled cold chain logistics to preserve sample integrity.</p>
            </div>
          </div>

        </div>
      </section>

      {/* BOOKING & ENQUIRY FORM */}
      <section id="booking-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl space-y-6">
          
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Direct Online Booking
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Book Home Sample Collection</h2>
            <p className="text-xs text-slate-500 mt-1">
              Fill out your patient details below. Our home collection team will confirm your slot within 15 minutes.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 110001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Select Test or Health Package *</label>
                <select
                  value={formData.selectedItem}
                  onChange={(e) => setFormData({ ...formData, selectedItem: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs outline-none bg-white"
                >
                  <optgroup label="Popular Tests">
                    {PATHOLOGY_TESTS.map((t) => (
                      <option key={t.id} value={t.name}>{t.name} (₹{t.price})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Health Packages">
                    {HEALTH_PACKAGES.map((p) => (
                      <option key={p.id} value={p.name}>{p.name} (₹{p.price})</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Complete Delivery Address / Locality *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House No, Apartment, Street, Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Preferred Collection Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Time Slot *</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs outline-none bg-white"
                  >
                    <option value="06:30 AM - 08:30 AM">06:30 AM - 08:30 AM (Fasting)</option>
                    <option value="08:30 AM - 10:30 AM">08:30 AM - 10:30 AM</option>
                    <option value="10:30 AM - 01:00 PM">10:30 AM - 01:00 PM</option>
                    <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Special Instructions / Message (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Ring bell twice, Elderly patient"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Home Collection Order</span>
              </button>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Home Collection Booking Confirmed!</h3>
              <p className="text-xs text-slate-600">
                Your order reference is <span className="font-bold text-teal-800">{bookingId}</span>. A phlebotomist will contact you shortly to confirm arrival timing.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                Book Another Collection
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
