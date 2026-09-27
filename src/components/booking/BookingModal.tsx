"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle2, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { PATHOLOGY_TESTS } from "@/data/tests";
import { HEALTH_PACKAGES } from "@/data/packages";

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
  const [step, setStep] = useState<"form" | "success">("form");
  const [collectionType, setCollectionType] = useState<"home" | "lab">("home");
  const [selectedItemName, setSelectedItemName] = useState<string>(
    preselectedItem ? preselectedItem.name : PATHOLOGY_TESTS[0].name
  );
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("07:00 AM - 09:00 AM");
  const [bookingId, setBookingId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = "PATH-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setStep("success");
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-teal-100 my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-800 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-teal-200">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Book Diagnostic Test</h3>
              <p className="text-xs text-teal-100/90">NABL Accredited Lab & High Precision Diagnostics</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Collection Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Collection Preference</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCollectionType("home")}
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-sm font-medium transition-all ${
                    collectionType === "home"
                      ? "border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50"
                  }`}
                >
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Doorstep Home Collection</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCollectionType("lab")}
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-sm font-medium transition-all ${
                    collectionType === "lab"
                      ? "border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20 shadow-sm"
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
              <label className="block text-sm font-semibold text-slate-700 mb-1">Select Test or Package</label>
              <select
                value={selectedItemName}
                onChange={(e) => setSelectedItemName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-slate-800 bg-white text-sm outline-none transition"
                required
              >
                <optgroup label="Popular Tests">
                  {PATHOLOGY_TESTS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} — ₹{t.price}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Health Packages">
                  {HEALTH_PACKAGES.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} — ₹{p.price} ({p.testCount} Tests)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Patient Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Patient Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 110001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
                />
              </div>
            </div>

            {/* Address if Home Collection */}
            {collectionType === "home" && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Complete Home Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat No, House Name, Street Locality, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Time Slot *</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none bg-white"
                  >
                    <option value="06:30 AM - 08:30 AM">06:30 AM - 08:30 AM (Fasting Ideal)</option>
                    <option value="08:30 AM - 10:30 AM">08:30 AM - 10:30 AM (Morning)</option>
                    <option value="10:30 AM - 01:00 PM">10:30 AM - 01:00 PM (Midday)</option>
                    <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM (Afternoon)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span>Free cancellation up to 2 hours before sample collection. Pay via UPI, Card, or Cash on Collection.</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Confirm & Book Test
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-1">Booking Confirmed!</h4>
              <p className="text-slate-600 text-sm">
                Your appointment has been registered successfully. Our phlebotomist will contact you shortly.
              </p>
            </div>

            <div className="bg-teal-50/80 border border-teal-100 rounded-2xl p-5 text-left space-y-3 max-w-md mx-auto text-xs">
              <div className="flex justify-between border-b border-teal-200/60 pb-2">
                <span className="text-slate-500 font-medium">Booking ID:</span>
                <span className="font-bold text-teal-900 text-sm">{bookingId}</span>
              </div>
              <div className="flex justify-between border-b border-teal-200/60 pb-2">
                <span className="text-slate-500 font-medium">Selected Test:</span>
                <span className="font-semibold text-slate-800">{selectedItemName}</span>
              </div>
              <div className="flex justify-between border-b border-teal-200/60 pb-2">
                <span className="text-slate-500 font-medium">Patient:</span>
                <span className="font-semibold text-slate-800">{patientName} ({phone})</span>
              </div>
              <div className="flex justify-between border-b border-teal-200/60 pb-2">
                <span className="text-slate-500 font-medium">Type:</span>
                <span className="font-semibold text-teal-700 capitalize">{collectionType} Collection</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Date & Slot:</span>
                <span className="font-semibold text-slate-800">{preferredDate || "Tomorrow"} ({preferredTime})</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              A SMS & WhatsApp confirmation with phlebotomist details has been sent to your mobile number.
            </p>

            <button
              onClick={resetAndClose}
              className="px-8 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-colors shadow-md"
            >
              Done & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
