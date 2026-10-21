"use client";

import React, { useState, useEffect } from "react";
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
  FileText,
  CreditCard,
  Gift,
  ExternalLink
} from "lucide-react";
import { PATHOLOGY_TESTS } from "@/data/tests";
import { HEALTH_PACKAGES } from "@/data/packages";
import promotionsData from "@/data/promotions.json";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedItem?: {
    name: string;
    type: "test" | "package";
    price: number;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedItem
}) => {
  // 3-step flow: "form" -> "payment" -> "confirmation"
  const [step, setStep] = useState<"form" | "payment" | "confirmation">("form");
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

  useEffect(() => {
    if (preselectedItem) {
      setSelectedItemName(preselectedItem.name);
      setItemPrice(preselectedItem.price);
    }
  }, [preselectedItem]);

  // Listen for global booking modal events
  useEffect(() => {
    const handleOpen = () => {
      setStep("form");
    };
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, []);

  if (!isOpen) return null;

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

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = "SDC-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setStep("payment"); // Move to Step 2: Optional payment
  };

  const handleConfirmBooking = (choice: "upi" | "pay_on_collection") => {
    setPaymentChoice(choice);
    setStep("confirmation"); // Move to Step 3: Confirmation
  };

  const resetAndClose = () => {
    setStep("form");
    setPatientName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setPincode("");
    onClose();
  };

  // Find a related promotion to feature on confirmation
  const relatedPromo =
    promotionsData.find((p) => p.id === "health-packages-poster") || promotionsData[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-teal-300">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">Book Diagnostic Test</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-400/30">
                  Step {step === "form" ? "1 of 3" : step === "payment" ? "2 of 3" : "3 of 3"}
                </span>
              </div>
              <p className="text-xs text-teal-100/80">Shree Diagnostic Center • NABL Accredited Precision</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: BOOKING FORM */}
        {step === "form" && (
          <form onSubmit={handleStep1Submit} className="p-6 space-y-5">
            {/* Collection Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Step 1: Collection Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCollectionType("home")}
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
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
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
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
                  Select Test or Health Package
                </label>
                <span className="text-xs font-black text-teal-700">₹{itemPrice}</span>
              </div>
              <select
                value={selectedItemName}
                onChange={(e) => handleItemSelectChange(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-teal-600 text-slate-800 bg-white text-xs outline-none transition"
                required
              >
                <optgroup label="Popular Tests">
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
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
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
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email (Optional)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
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
                  placeholder="Flat/House No., Street, Landmark"
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
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
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
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
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
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Step 2 (Payment Option)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: OPTIONAL PAYMENT */}
        {step === "payment" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-md mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Step 2: Payment Preference
              </span>
              <h4 className="text-2xl font-black text-slate-900">Choose How You Wish to Pay</h4>
              <p className="text-xs text-slate-500">
                You can pay in advance via UPI for contactless sample collection, or simply skip and pay in person.
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

            {/* Advance Payment Options (UPI QR) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Advance UPI */}
              <div className="p-5 rounded-2xl border-2 border-teal-600 bg-teal-50/50 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-teal-900 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-teal-700" />
                      <span>Option A: Advance UPI Pay</span>
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    Zero-contact collection. Scan via GPay, PhonePe, Paytm or BHIM.
                  </p>

                  <div className="my-3 p-3 bg-white rounded-xl border border-teal-200 flex items-center justify-center flex-col space-y-1">
                    <div className="w-24 h-24 bg-slate-900 text-white flex items-center justify-center rounded-lg font-mono text-[10px] text-center p-2">
                      [UPI QR CODE]
                      <br />
                      ₹{itemPrice}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-700 mt-1">
                      shreediagnostic@upi
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleConfirmBooking("upi")}
                  className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                >
                  Confirm After UPI Payment
                </button>
              </div>

              {/* Option B: Pay in Person (Prominent Skip Button) */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-slate-500" />
                      <span>Option B: Pay at Collection</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                    Prefer to pay in person? You can pay by Cash, UPI QR or Card directly to the phlebotomist during sample pickup or at the lab reception desk.
                  </p>

                  <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <p className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>No advance payment needed</span>
                    </p>
                    <p className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>Printed official invoice provided</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleConfirmBooking("pay_on_collection")}
                  className="w-full py-2.5 rounded-xl border-2 border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition cursor-pointer"
                >
                  Skip & Pay Later (Cash / Card)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                ← Back to Edit Details
              </button>
              <span className="text-[11px] text-slate-400">
                Payment status is verified prior to specimen release.
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMATION & RELATED PROMOTION */}
        {step === "confirmation" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
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
                <span className="text-slate-500 font-medium">Payment Mode:</span>
                <span className="font-bold text-emerald-700 capitalize">
                  {paymentChoice === "upi" ? "Advance UPI Verification" : "Pay at Collection / Lab"} (₹{itemPrice})
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

            {/* RELATED PROMOTION UNDERNEATH (Requirement 2 & 6) */}
            {relatedPromo && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-teal-700/50 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                      Complimentary Patient Offer
                    </span>
                    <h5 className="text-sm font-bold text-white">{relatedPromo.title}</h5>
                    <p className="text-[11px] text-slate-300">{relatedPromo.subtitle}</p>
                  </div>
                </div>

                <a
                  href={relatedPromo.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0"
                >
                  <span>View Offer Brochure</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <div className="text-center pt-2">
              <button
                onClick={resetAndClose}
                className="px-8 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-md cursor-pointer"
              >
                Done & Return to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
