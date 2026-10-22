"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Award,
  QrCode,
  CreditCard,
  MessageCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { PincodeChecker } from "@/components/search/PincodeChecker";
import { PATHOLOGY_TESTS } from "@/data/tests";
import { HEALTH_PACKAGES } from "@/data/packages";

export default function HomeSampleCollectionPage() {
  const [step, setStep] = useState<"form" | "payment" | "confirmation">("form");
  const [bookingId, setBookingId] = useState("");
  const [paymentChoice, setPaymentChoice] = useState<"upi" | "pay_on_collection">("pay_on_collection");

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

  const getSelectedItemPrice = () => {
    const test = PATHOLOGY_TESTS.find((t) => t.name === formData.selectedItem);
    if (test) return test.price;
    const pkg = HEALTH_PACKAGES.find((p) => p.name === formData.selectedItem);
    if (pkg) return pkg.price;
    return 1499;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "HOME-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(id);
    setStep("payment");
  };

  const handleConfirmPayment = (choice: "upi" | "pay_on_collection") => {
    setPaymentChoice(choice);
    setStep("confirmation");
  };

  const itemPrice = getSelectedItemPrice();

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
          {collectionSteps.map((s) => (
            <div key={s.num} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-3xl font-black text-teal-600 block">{s.num}</span>
              <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PINCODE CHECKER */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Service Availability
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">Check Home Collection in Your Area</h2>
        </div>
        <PincodeChecker />
      </section>

      {/* BOOKING SECTION (3-STEP SEQUENCE) */}
      <section id="booking-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              {step === "form" ? "Step 1 of 3: Patient Information" : step === "payment" ? "Step 2 of 3: Payment & QR Code" : "Step 3 of 3: Order Confirmed"}
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Schedule Home Sample Pickup</h2>
            <p className="text-xs text-slate-500">
              {step === "form"
                ? "Fill out your patient details below. Our team confirms slots promptly."
                : step === "payment"
                ? "Select your payment option — scan UPI QR code or pay upon arrival."
                : "Your slot has been reserved. Share details on WhatsApp for real-time tracking."}
            </p>
          </div>

          {/* STEP 1: PATIENT INFORMATION */}
          {step === "form" && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
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
                    placeholder="patient@example.com"
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-600">Select Test or Health Package *</label>
                  <span className="text-xs font-black text-teal-800">₹{itemPrice}</span>
                </div>
                <select
                  value={formData.selectedItem}
                  onChange={(e) => setFormData({ ...formData, selectedItem: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs outline-none bg-white"
                >
                  <optgroup label="Popular Diagnostic Tests">
                    {PATHOLOGY_TESTS.map((t) => (
                      <option key={t.id} value={t.name}>{t.name} (₹{t.price})</option>
                    ))}
                  </optgroup>
                  <optgroup label="Preventive Health Packages">
                    {HEALTH_PACKAGES.map((p) => (
                      <option key={p.id} value={p.name}>{p.name} (₹{p.price})</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Complete Doorstep Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Flat No, Apartment, Street, Landmark"
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
                    <option value="06:30 AM - 08:30 AM">06:30 AM - 08:30 AM (Fasting Ideal)</option>
                    <option value="08:30 AM - 10:30 AM">08:30 AM - 10:30 AM</option>
                    <option value="10:30 AM - 01:00 PM">10:30 AM - 01:00 PM</option>
                    <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Special Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Ring doorbell, Elderly patient"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Step 2: Payment &amp; QR Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT & QR CODE */}
          {step === "payment" && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Selected Investigation</span>
                  <p className="text-sm font-bold text-slate-900">{formData.selectedItem}</p>
                  <span className="text-[11px] text-teal-700 font-semibold">
                    Home Collection ({formData.pincode}) • {formData.patientName}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block font-medium">Total Amount</span>
                  <span className="text-2xl font-black text-teal-900">₹{itemPrice}</span>
                </div>
              </div>

              {/* Payment Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Advance UPI */}
                <div className="p-5 rounded-2xl border-2 border-teal-600 bg-teal-50/40 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-teal-950 flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-teal-700" />
                        <span>Option A: Advance UPI Scan</span>
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      Zero-contact collection. Scan via GPay, PhonePe, Paytm, or BHIM.
                    </p>

                    <div className="my-3 p-3 bg-white rounded-xl border border-teal-200 flex items-center justify-center flex-col space-y-2 shadow-xs">
                      <div className="relative w-36 h-36">
                        <Image
                          src="/images/qr/qr2.png"
                          alt="Shree Diagnostic UPI QR Code"
                          fill
                          className="object-contain"
                          sizes="144px"
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-800 text-center">
                        shreediagnostic@upi • ₹{itemPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleConfirmPayment("upi")}
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                  >
                    Confirm After UPI Payment →
                  </button>
                </div>

                {/* Pay on Collection */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-slate-500" />
                        <span>Option B: Pay at Doorstep</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      Pay directly to our phlebotomist via Cash, UPI QR, or Card upon sample collection.
                    </p>

                    <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1.5">
                      <p className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>No advance payment needed</span>
                      </p>
                      <p className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>Official printed receipt provided</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleConfirmPayment("pay_on_collection")}
                    className="w-full py-2.5 rounded-xl border-2 border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition cursor-pointer"
                  >
                    Skip &amp; Pay at Doorstep (Cash / Card) →
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Patient Details</span>
                </button>
                <span className="text-[11px] text-slate-400">
                  Payment is verified prior to specimen processing.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED WITH WHATSAPP */}
          {step === "confirmation" && (
            <div className="p-4 sm:p-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">Home Collection Booking Reserved!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-slate-800">{formData.patientName}</span>. Your phlebotomist slot is booked. Our coordinator will contact you shortly to confirm sample arrival.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 text-xs space-y-2 text-left max-w-lg mx-auto">
                <div className="flex justify-between border-b border-teal-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium">Order Reference:</span>
                  <span className="font-black text-teal-950 font-mono text-sm">{bookingId}</span>
                </div>
                <div className="flex justify-between border-b border-teal-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium">Investigation:</span>
                  <span className="font-bold text-slate-800">{formData.selectedItem}</span>
                </div>
                <div className="flex justify-between border-b border-teal-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium">Payment Status:</span>
                  <span className={`font-bold ${paymentChoice === "upi" ? "text-amber-800" : "text-emerald-800"}`}>
                    {paymentChoice === "upi"
                      ? "Advance UPI (Pending Verification via WhatsApp)"
                      : "Pay Later upon Home Pickup"} (₹{itemPrice})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Scheduled Date &amp; Slot:</span>
                  <span className="font-semibold text-slate-800">{formData.date || "Scheduled Date"} ({formData.timeSlot})</span>
                </div>
              </div>

              {/* WhatsApp Action */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-lg mx-auto text-left shadow-xs">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    {paymentChoice === "upi" ? "Send Payment Screenshot on WhatsApp" : "Confirm Slot on WhatsApp"}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    {paymentChoice === "upi"
                      ? <>Share your UPI receipt with Booking ID <strong>{bookingId}</strong> to verify your slot.</>
                      : <>Share your Booking ID <strong>{bookingId}</strong> for real-time sample pickup tracking.</>}
                  </p>
                </div>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    paymentChoice === "upi"
                      ? `*Shree Diagnostic Center - Home Collection Payment Verification*\n\nBooking ID: ${bookingId}\nPatient Name: ${formData.patientName}\nMobile: ${formData.phone}\nAddress: ${formData.address} (${formData.pincode})\nTest: ${formData.selectedItem}\nAmount: ₹${itemPrice}\nPayment: Advance UPI\n\n[Please find attached UPI payment screenshot for verification]`
                      : `*Shree Diagnostic Center - Home Collection Booking*\n\nBooking ID: ${bookingId}\nPatient Name: ${formData.patientName}\nMobile: ${formData.phone}\nAddress: ${formData.address} (${formData.pincode})\nTest: ${formData.selectedItem}\nAmount: ₹${itemPrice}\nPayment Mode: Pay upon Arrival\nScheduled: ${formData.date || "Scheduled Date"} (${formData.timeSlot})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm whitespace-nowrap flex-shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Open WhatsApp</span>
                </a>
              </div>

              <div>
                <button
                  onClick={() => setStep("form")}
                  className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition cursor-pointer"
                >
                  Book Another Collection
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
