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
  QrCode,
  ArrowRight,
  CreditCard,
  Gift,
  MessageCircle,
  ArrowLeft,
  Loader2,
  FileCheck2,
  Receipt
} from "lucide-react";
import { PATHOLOGY_TESTS } from "@/data/tests";
import { HEALTH_PACKAGES } from "@/data/packages";

interface BookingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  preselectedItem?: {
    name: string;
    type: "test" | "package";
    price: number;
  } | null;
}

// 4-Step sequence: "details" (Step 1) -> "payment" (Step 2) -> "processing" (Step 3) -> "summary" (Step 4)
type BookingStep = "details" | "payment" | "processing" | "summary";

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen = false,
  onClose,
  preselectedItem,
}) => {
  const [step, setStep] = useState<BookingStep>("details");
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
  const [submissionFailed, setSubmissionFailed] = useState(false);

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
      setStep("details");
      setSubmissionFailed(false);
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
      setStep("details");
      setSubmissionFailed(false);
      setSelfOpen(true);
    };
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, []);

  const resetAndClose = useCallback(() => {
    setStep("details");
    setSelfOpen(false);
    setSubmissionFailed(false);
    if (onClose) onClose();
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        resetAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, resetAndClose]);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setSelectedItemName(name);

    const foundTest = PATHOLOGY_TESTS.find((t) => t.name === name);
    if (foundTest) {
      setItemPrice(foundTest.price);
      return;
    }
    const foundPkg = HEALTH_PACKAGES.find((p) => p.name === name);
    if (foundPkg) {
      setItemPrice(foundPkg.price);
    }
  };

  // STEP 1 -> STEP 2
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  // STEP 2 -> STEP 3 (Submission Processing) -> STEP 4 (Thank You Summary)
  const handleStartSubmission = (choice: "upi" | "pay_on_collection") => {
    setPaymentChoice(choice);
    setStep("processing");
    setSubmissionFailed(false);

    // Simulate reliable network booking dispatch
    setTimeout(() => {
      try {
        const generatedId = "SHREE-" + Math.floor(100000 + Math.random() * 900000);
        setBookingId(generatedId);
        // Successfully submitted -> transition to Step 4
        setStep("summary");
      } catch (err) {
        setSubmissionFailed(true);
        setStep("payment");
      }
    }, 1400);
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
      onClick={resetAndClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with 4-Step Progress Indicator */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-800">
                Official Booking Portal
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Shree Diagnostic Center
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                NABL Accredited • Doorstep Phlebotomy &amp; Same-Day Reports
              </p>
            </div>

            <button
              onClick={resetAndClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              aria-label="Close booking modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 4-Step Visual Progress Bar */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-800">
            {/* Step 1 */}
            <div className="space-y-1">
              <div
                className={`h-1.5 rounded-full ${
                  step === "details"
                    ? "bg-teal-400"
                    : "bg-teal-600"
                }`}
              />
              <span
                className={`text-[9px] font-bold block truncate ${
                  step === "details" ? "text-teal-300" : "text-slate-400"
                }`}
              >
                1. Patient Details
              </span>
            </div>

            {/* Step 2 */}
            <div className="space-y-1">
              <div
                className={`h-1.5 rounded-full ${
                  step === "payment"
                    ? "bg-teal-400"
                    : step === "processing" || step === "summary"
                    ? "bg-teal-600"
                    : "bg-slate-800"
                }`}
              />
              <span
                className={`text-[9px] font-bold block truncate ${
                  step === "payment" ? "text-teal-300" : "text-slate-400"
                }`}
              >
                2. Payment Options
              </span>
            </div>

            {/* Step 3 */}
            <div className="space-y-1">
              <div
                className={`h-1.5 rounded-full ${
                  step === "processing"
                    ? "bg-teal-400 animate-pulse"
                    : step === "summary"
                    ? "bg-teal-600"
                    : "bg-slate-800"
                }`}
              />
              <span
                className={`text-[9px] font-bold block truncate ${
                  step === "processing" ? "text-teal-300" : "text-slate-400"
                }`}
              >
                3. Submitting
              </span>
            </div>

            {/* Step 4 */}
            <div className="space-y-1">
              <div
                className={`h-1.5 rounded-full ${
                  step === "summary" ? "bg-emerald-400" : "bg-slate-800"
                }`}
              />
              <span
                className={`text-[9px] font-bold block truncate ${
                  step === "summary" ? "text-emerald-300 font-black" : "text-slate-400"
                }`}
              >
                4. Thank You
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[75vh] overflow-y-auto">

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* STEP 1: PATIENT DETAILS & INVESTIGATION SELECTION             */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {step === "details" && (
            <form onSubmit={handleStep1Submit} className="p-6 space-y-5">
              {/* Collection Type Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Sample Collection Mode:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCollectionType("home")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      collectionType === "home"
                        ? "border-teal-600 bg-teal-50/70 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          collectionType === "home" ? "border-teal-600" : "border-slate-300"
                        }`}
                      >
                        {collectionType === "home" && (
                          <div className="w-2 h-2 rounded-full bg-teal-600" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-900">Doorstep Home Collection</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block ml-6 mt-0.5">
                      Phlebotomist arrives at your home with sterile kit
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCollectionType("lab")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      collectionType === "lab"
                        ? "border-teal-600 bg-teal-50/70 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          collectionType === "lab" ? "border-teal-600" : "border-slate-300"
                        }`}
                      >
                        {collectionType === "lab" && (
                          <div className="w-2 h-2 rounded-full bg-teal-600" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-900">Central Lab Walk-in</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block ml-6 mt-0.5">
                      Fast-track priority queue at diagnostic center
                    </span>
                  </button>
                </div>
              </div>

              {/* Selected Investigation & Price */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Selected Diagnostic Test / Health Package:
                </label>
                <div className="relative">
                  <select
                    value={selectedItemName}
                    onChange={handleItemChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 outline-none cursor-pointer"
                  >
                    <optgroup label="Popular Individual Diagnostic Tests">
                      {PATHOLOGY_TESTS.map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.name} (₹{t.price})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Full Body Preventive Health Packages">
                      {HEALTH_PACKAGES.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} (₹{p.price})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Estimated Lab Price:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-teal-800">₹{itemPrice}</span>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Standard NABL Rate
                    </span>
                  </div>
                </div>
              </div>

              {/* Patient Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-teal-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="For PDF report dispatch"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Area Pincode *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="6-digit area pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-teal-600"
                    />
                  </div>
                </div>
              </div>

              {collectionType === "home" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Complete Residential Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat number, building name, street, nearby landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-teal-600 resize-none"
                  />
                </div>
              )}

              {/* Preferred Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-teal-600 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Sample Pickup Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-teal-600 bg-white"
                    >
                      <option value="06:30 AM - 08:30 AM">06:30 AM - 08:30 AM (Fasting Preferred)</option>
                      <option value="08:30 AM - 10:30 AM">08:30 AM - 10:30 AM (Morning)</option>
                      <option value="10:30 AM - 12:30 PM">10:30 AM - 12:30 PM (Mid-day)</option>
                      <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM (Evening)</option>
                      <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM (Late Evening)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
                  <span>Continue to Step 2: Payment Options</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* STEP 2: PAYMENT OPTIONS                                      */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {step === "payment" && (
            <div className="p-6 space-y-6">
              <div className="text-center max-w-md mx-auto space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-200">
                  Step 2 of 4: Payment Preference
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">Choose Payment Method</h4>
                <p className="text-xs text-slate-500">
                  Scan and pay via UPI QR code for contactless collection, or choose to pay later in person.
                </p>
              </div>

              {submissionFailed && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
                  We could not complete your request. Please check your network and try again.
                </div>
              )}

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
                    onClick={() => handleStartSubmission("upi")}
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed &amp; Submit (After UPI Scan)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                        <span>Official printed receipt provided upon pickup</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStartSubmission("pay_on_collection")}
                    className="w-full py-2.5 rounded-xl border-2 border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Submit &amp; Pay on Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep("details")}
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
          {/* STEP 3: BOOKING SUBMISSION / CONFIRMATION PROCESSING          */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {step === "processing" && (
            <div className="p-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto shadow-md">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-200">
                  Step 3 of 4: Submission Processing
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  Submitting Your Booking Request...
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Connecting to Shree Diagnostic dispatch desk, reserving slot, and generating your encrypted booking ID.
                </p>
              </div>

              <div className="max-w-xs mx-auto p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-[11px]">Validated patient &amp; address parameters</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-[11px]">Selected: {selectedItemName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Loader2 className="w-3.5 h-3.5 text-teal-600 animate-spin" />
                  <span className="text-[11px] text-teal-800 font-semibold">Assigning lab phlebotomy coordinator...</span>
                </div>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════ */}
          {/* STEP 4: THANK YOU & BOOKING SUMMARY                          */}
          {/* ═════════════════════════════════════════════════════════════ */}
          {step === "summary" && (
            <div className="p-6 space-y-5">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                  Step 4 of 4: Booking Submitted
                </span>
                <h4 className="text-2xl font-black text-slate-900">Thank You! Booking Confirmed</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-slate-800">{patientName}</span>. Your diagnostic slot has been successfully recorded in our central system.
                </p>
              </div>

              {/* Complete Booking Details Summary */}
              <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-5 text-xs space-y-2.5">
                <div className="flex justify-between items-center border-b border-teal-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Booking Reference ID:</span>
                  <span className="font-black text-teal-950 font-mono text-sm tracking-wide bg-white px-2.5 py-0.5 rounded-lg border border-teal-300">
                    {bookingId}
                  </span>
                </div>
                <div className="flex justify-between border-b border-teal-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Investigation / Package:</span>
                  <span className="font-bold text-slate-900 text-right">{selectedItemName}</span>
                </div>
                <div className="flex justify-between border-b border-teal-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Patient Contact:</span>
                  <span className="font-semibold text-slate-800">{patientName} ({phone})</span>
                </div>
                <div className="flex justify-between border-b border-teal-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Payment Status:</span>
                  <span className="font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
                    Payment Verification: Pending (₹{itemPrice})
                  </span>
                </div>
                <div className="flex justify-between border-b border-teal-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Collection Mode:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {collectionType === "home" ? `Doorstep Pickup (${pincode})` : "Central Lab Walk-in"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Scheduled Slot:</span>
                  <span className="font-bold text-teal-900">
                    {preferredDate || "Scheduled Date"} • {preferredTime}
                  </span>
                </div>
              </div>

              {/* WhatsApp Direct Action for Payment Verification / Instant Updates */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span>WhatsApp Booking Desk</span>
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Share your Booking ID <strong>{bookingId}</strong> on WhatsApp for real-time phlebotomist tracking &amp; report delivery.
                  </p>
                </div>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `*Shree Diagnostic Center - Booking Confirmation*\n\nBooking ID: ${bookingId}\nPatient Name: ${patientName}\nMobile: ${phone}\nInvestigation: ${selectedItemName}\nAmount: ₹${itemPrice}\nPayment Mode: ${paymentChoice === "upi" ? "Advance UPI" : "Pay at Collection"}\nScheduled Slot: ${preferredDate || "Scheduled Date"} (${preferredTime})\n\n[Please verify my appointment]`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm whitespace-nowrap flex-shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Open WhatsApp</span>
                </a>
              </div>

              {/* Promotional Content within the Confirmation Experience */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between gap-3 border border-teal-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-teal-400">
                      Patient Reward Privilege
                    </span>
                    <h5 className="text-xs font-bold text-white">
                      Get 10% OFF on your next family health checkup!
                    </h5>
                    <p className="text-[10px] text-slate-300 mt-0.5">
                      Quote promo voucher <strong className="text-teal-300 font-mono">SHREECARE10</strong> during your next visit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Return / Book Another Actions */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setStep("details")}
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
