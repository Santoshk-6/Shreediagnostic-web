"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  QrCode,
  ArrowRight,
  CreditCard,
  Gift,
  ExternalLink,
  MessageCircle,
  ArrowLeft
} from "lucide-react";
import { PATHOLOGY_TESTS } from "@/data/tests";
import { HEALTH_PACKAGES } from "@/data/packages";
import promotionsData from "@/data/promotions.json";

interface BookingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  preselectedItem?: {
    name: string;
    type: "test" | "package";
    price: number;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen = false,
  onClose,
  preselectedItem,
}) => {
  // Step sequence: "form" (Step 1) -> "payment" (Step 2) -> "confirmation" (Step 3)
  const [step, setStep] = useState<"form" | "payment" | "confirmation">("form");
  const [selfOpen, setSelfOpen] = useState(false);
  const [collectionType, setCollectionType] = useState<"home" | "lab">("home");
  const [selectedItemName, setSelectedItemName] = useState<string>(
    preselectedItem ? preselectedItem.name : PATHOLOGY_TESTS[0].name
  );
  const [itemPrice, setItemPrice] = useState<number>(
    preselectedItem ? preselectedItem.price : PATHOLOGY_TESTS[0].price
  );

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("06:30 AM - 08:30 AM");
  const [bookingId, setBookingId] = useState("");
  const [paymentChoice, setPaymentChoice] = useState<"upi" | "pay_on_collection">("pay_on_collection");

  const isModalOpen = isOpen || selfOpen;

  // Sync preselected items
  useEffect(() => {
    if (preselectedItem) {
      setSelectedItemName(preselectedItem.name);
      setItemPrice(preselectedItem.price);
    }
  }, [preselectedItem]);

  // Always reset to Step 1 whenever opened
  useEffect(() => {
    if (isModalOpen) {
      setStep("form");
    }
  }, [isModalOpen]);

  // Listen for global open-booking-modal custom events
  useEffect(() => {
    const handleOpen = (e?: Event) => {
      const customEvent = e as CustomEvent<{ name?: string; type?: "test" | "package"; price?: number }>;
      if (customEvent?.detail?.name) {
        setSelectedItemName(customEvent.detail.name);
        if (customEvent.detail.price) {
          setItemPrice(customEvent.detail.price);
        }
      }
      setStep("form");
      setSelfOpen(true);
    };
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, []);

  const resetAndClose = useCallback(() => {
    setStep("form");
    setPatientName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setPincode("");
    setSelfOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        resetAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, resetAndClose]);

  if (!isModalOpen) return null;

  const handleItemSelectChange = (name: string) => {
    setSelectedItemName(name);
    const test = PATHOLOGY_TESTS.find((t) => t.name === name);
    if (test) {
      setItemPrice(test.price);
      return;
    }
    const pkg = HEALTH_PACKAGES.find((p) => p.name === name);
    if (pkg) {
      setItemPrice(pkg.price);
    }
  };

  // Step 1 -> Step 2
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = "SDC-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setStep("payment"); // Moves to Step 2
  };

  // Step 2 -> Step 3
  const handleConfirmBooking = (choice: "upi" | "pay_on_collection") => {
    setPaymentChoice(choice);
    setStep("confirmation"); // Moves to Step 3
  };

  const relatedPromo =
    promotionsData.find((p) => p.id === "poster-3") || promotionsData[0];

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
      onClick={resetAndClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[94vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-[#031d24] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white flex-shrink-0 shadow-sm border border-white/20">
              <Image
                src="/images/logo/logo.jpeg"
                alt="Shree Diagnostic Center"
                fill
                className="object-contain"
                sizes="44px"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">Book Diagnostic Test</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-400/30">
                  {step === "form" ? "Step 1 of 3: Details" : step === "payment" ? "Step 2 of 3: Payment" : "Step 3 of 3: Confirmed"}
                </span>
              </div>
              <p className="text-[11px] text-teal-100/80">Shree Diagnostic Center • NABL Accredited Precision</p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Step Progress Bar */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-500 shrink-0">
          <div className={`flex items-center gap-1.5 ${step === "form" ? "text-teal-700" : "text-emerald-700"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step === "form" ? "bg-teal-700" : "bg-emerald-600"}`}>1</span>
            <span>Patient Info</span>
          </div>
          <div className="h-0.5 w-8 bg-slate-300" />
          <div className={`flex items-center gap-1.5 ${step === "payment" ? "text-teal-700" : step === "confirmation" ? "text-emerald-700" : "text-slate-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step === "payment" ? "bg-teal-700" : step === "confirmation" ? "bg-emerald-600" : "bg-slate-400"}`}>2</span>
            <span>Payment &amp; QR</span>
          </div>
          <div className="h-0.5 w-8 bg-slate-300" />
          <div className={`flex items-center gap-1.5 ${step === "confirmation" ? "text-emerald-700" : "text-slate-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step === "confirmation" ? "bg-emerald-600" : "bg-slate-400"}`}>3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* ═════════════════════════════════════════════════════════════ */}
          {/* STEP 1: PATIENT DETAILS & TEST SELECTION                     */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {step === "form" && (
            <form onSubmit={handleStep1Submit} className="p-6 space-y-5">
              {/* Collection Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Collection Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCollectionType("home")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      collectionType === "home"
                        ? "border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50"
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>Doorstep Home Collection</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollectionType("lab")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      collectionType === "lab"
                        ? "border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50"
                    }`}
                  >
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    <span>Lab Visit (Walk-in)</span>
                  </button>
                </div>
              </div>

              {/* Test or Package Selection */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Test or Health Package *
                  </label>
                  <span className="text-sm font-black text-teal-800">₹{itemPrice}</span>
                </div>
                <select
                  value={selectedItemName}
                  onChange={(e) => handleItemSelectChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-slate-800 bg-white text-xs outline-none transition"
                  required
                >
                  <optgroup label="Popular Diagnostic Tests">
                    {PATHOLOGY_TESTS.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} — ₹{t.price}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Preventive Health Packages">
                    {HEALTH_PACKAGES.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} — ₹{p.price} ({p.testCount} Tests Included)
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Patient Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Patient Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address (Optional)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Area Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 110001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs outline-none"
                  />
                </div>
              </div>

              {/* Address if Home Collection */}
              {collectionType === "home" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Doorstep Address *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Flat/House No., Street, Landmark, Colony"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs outline-none"
                  />
                </div>
              )}

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Preferred Date *</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Preferred Time Slot *</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs outline-none bg-white"
                    >
                      <option value="06:30 AM - 08:30 AM">06:30 AM - 08:30 AM (Fasting Ideal)</option>
                      <option value="08:30 AM - 10:30 AM">08:30 AM - 10:30 AM (Morning)</option>
                      <option value="10:30 AM - 01:00 PM">10:30 AM - 01:00 PM (Midday)</option>
                      <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM (Afternoon)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Step 2: Payment &amp; QR Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* STEP 2: PAYMENT & QR CODE OPTIONS                           */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {step === "payment" && (
            <div className="p-6 space-y-6">
              <div className="text-center max-w-md mx-auto space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-200">
                  Step 2 of 3: Payment Preference
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">Payment &amp; Verification Option</h4>
                <p className="text-xs text-slate-500">
                  Scan and pay via UPI QR code for contactless collection, or choose to pay later in person.
                </p>
              </div>

              {/* Bill Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Selected Investigation</span>
                  <p className="text-sm font-bold text-slate-900">{selectedItemName}</p>
                  <span className="text-[11px] text-teal-700 font-semibold capitalize">
                    {collectionType} Collection • {patientName}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block font-medium">Total Amount</span>
                  <span className="text-2xl font-black text-teal-900">₹{itemPrice}</span>
                </div>
              </div>

              {/* Advance Payment Options (UPI QR vs Pay at Collection) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option A: Advance UPI Pay with Official QR */}
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
                      Scan via Google Pay, PhonePe, Paytm, or BHIM UPI app.
                    </p>

                    {/* QR Code Container */}
                    <div className="my-3 p-3 bg-white rounded-xl border border-teal-200 flex items-center justify-center flex-col space-y-2 shadow-xs">
                      <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                        <Image
                          src="/images/qr/qr2.png"
                          alt="Shree Diagnostic Center Official UPI QR Code"
                          fill
                          className="object-contain"
                          sizes="160px"
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-800 text-center">
                        shreediagnostic@upi • ₹{itemPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleConfirmBooking("upi")}
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                  >
                    Proceed to Confirmation (After UPI Scan) →
                  </button>
                </div>

                {/* Option B: Pay in Person / Cash on Collection */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-slate-500" />
                        <span>Option B: Pay at Collection</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      Pay in person via Cash, UPI QR, or Card directly to the phlebotomist during sample pickup or at the lab desk.
                    </p>

                    <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1.5">
                      <p className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>No advance payment needed</span>
                      </p>
                      <p className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>Printed official receipt provided upon pickup</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleConfirmBooking("pay_on_collection")}
                    className="w-full py-2.5 rounded-xl border-2 border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition cursor-pointer"
                  >
                    Skip &amp; Pay at Collection (Cash / Card) →
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

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* STEP 3: THANK-YOU & BOOKING CONFIRMATION WITH WHATSAPP       */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {step === "confirmation" && (
            <div className="p-6 space-y-5">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">Booking Confirmed!</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-slate-800">{patientName}</span>. Your diagnostic slot has been reserved. Our phlebotomist coordinator will call you to confirm sample arrival.
                </p>
              </div>

              {/* Booking Details Card */}
              <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-5 text-xs space-y-2.5">
                <div className="flex justify-between border-b border-teal-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Booking Reference ID:</span>
                  <span className="font-black text-teal-950 font-mono text-sm">{bookingId}</span>
                </div>
                <div className="flex justify-between border-b border-teal-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Investigation:</span>
                  <span className="font-bold text-slate-800">{selectedItemName}</span>
                </div>
                <div className="flex justify-between border-b border-teal-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Payment Status:</span>
                  <span className={`font-bold ${paymentChoice === "upi" ? "text-amber-800" : "text-emerald-800"}`}>
                    {paymentChoice === "upi"
                      ? "Advance UPI (Pending Verification via WhatsApp)"
                      : "Pay Later at Collection / Lab"} (₹{itemPrice})
                  </span>
                </div>
                <div className="flex justify-between border-b border-teal-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Collection Preference:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {collectionType === "home" ? `Home Pickup (${pincode})` : "Central Lab Walk-in"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Scheduled Time:</span>
                  <span className="font-semibold text-slate-800">
                    {preferredDate || "Scheduled Date"} ({preferredTime})
                  </span>
                </div>
              </div>

              {/* WhatsApp Redirect Action */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    {paymentChoice === "upi"
                      ? "Send UPI Payment Screenshot on WhatsApp"
                      : "Send Booking Confirmation on WhatsApp"}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    {paymentChoice === "upi"
                      ? <>Share your UPI transaction screenshot with Booking ID <strong>{bookingId}</strong> to verify your slot.</>
                      : <>Share your Booking ID <strong>{bookingId}</strong> with our desk coordinator on WhatsApp for instant confirmation.</>}
                  </p>
                </div>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    paymentChoice === "upi"
                      ? `*Shree Diagnostic Center - Booking & Payment Verification*\n\nBooking ID: ${bookingId}\nPatient Name: ${patientName}\nMobile: ${phone}\nTest: ${selectedItemName}\nAmount: ₹${itemPrice}\nPayment Choice: Advance UPI\n\n[Please find attached UPI payment screenshot for verification]`
                      : `*Shree Diagnostic Center - Home Booking Confirmation*\n\nBooking ID: ${bookingId}\nPatient Name: ${patientName}\nMobile: ${phone}\nTest: ${selectedItemName}\nAmount: ₹${itemPrice}\nPayment Mode: Pay at Collection\nDate & Slot: ${preferredDate || "Scheduled Date"} (${preferredTime})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm whitespace-nowrap flex-shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Open WhatsApp</span>
                </a>
              </div>

              {/* Related Promotion Banner */}
              {relatedPromo && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 border border-teal-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-teal-400">
                        Patient Offer
                      </span>
                      <h5 className="text-xs font-bold text-white">{relatedPromo.title}</h5>
                    </div>
                  </div>
                  <a
                    href={relatedPromo.image || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 transition whitespace-nowrap"
                  >
                    <span>View Offer Poster</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Done / Return Action */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setStep("form")}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
                >
                  Book Another Test
                </button>
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-md cursor-pointer"
                >
                  Done &amp; Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
