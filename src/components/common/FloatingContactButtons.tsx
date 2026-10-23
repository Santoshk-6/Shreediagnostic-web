"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";

// CLINIC OFFICIAL CONTACT DETAILS (Verify with clinic owner before production deployment)
export const CLINIC_CONTACT_CONFIG = {
  phoneNumber: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  whatsappNumber: "919876543210",
  whatsappDefaultMessage:
    "Hello Shree Diagnostic Center, I would like to enquire about a diagnostic test / home collection booking.",
};

export const FloatingContactButtons = () => {
  const whatsappUrl = `https://wa.me/${
    CLINIC_CONTACT_CONFIG.whatsappNumber
  }?text=${encodeURIComponent(CLINIC_CONTACT_CONFIG.whatsappDefaultMessage)}`;

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none select-none"
      aria-label="Direct Quick Contact Options"
    >
      {/* Phone Call Floating Button */}
      <a
        href={`tel:${CLINIC_CONTACT_CONFIG.phoneNumber}`}
        aria-label={`Call Shree Diagnostic Center: ${CLINIC_CONTACT_CONFIG.phoneDisplay}`}
        className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-700 hover:bg-teal-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/30"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />

        {/* Hover Tooltip Pill (Desktop) */}
        <span className="hidden sm:group-hover:inline-block absolute right-16 bg-slate-900/95 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg border border-slate-700 transition">
          Call: {CLINIC_CONTACT_CONFIG.phoneDisplay}
        </span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Shree Diagnostic Coordinator"
        className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/30"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />

        {/* Pulsing indicator ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
        </span>

        {/* Hover Tooltip Pill (Desktop) */}
        <span className="hidden sm:group-hover:inline-block absolute right-16 bg-slate-900/95 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg border border-slate-700 transition">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
