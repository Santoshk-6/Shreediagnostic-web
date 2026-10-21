"use client";

import React, { useState } from "react";
import {
  MapPin,
  CheckCircle2,
  XCircle,
  Search,
  Clock,
  ArrowRight,
  Gift,
  ExternalLink,
  Phone,
  MessageSquare
} from "lucide-react";
import { COVERED_PINCODES, ServiceArea } from "@/data/locations";

export const PincodeChecker = () => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [result, setResult] = useState<ServiceArea | null | "not_found">(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim();
    if (!cleanPin) return;

    if (COVERED_PINCODES[cleanPin]) {
      setResult(COVERED_PINCODES[cleanPin]);
    } else {
      // If code starts with standard metro prefixes and is 6 digits
      if (
        ["11", "12", "20", "40", "56"].some((prefix) => cleanPin.startsWith(prefix)) &&
        cleanPin.length === 6
      ) {
        setResult({
          pincode: cleanPin,
          locality: "Suburban Metropolitan Zone",
          city: "Metro Region",
          isAvailable: true,
          estimatedTime: "Pickup within 60-90 mins"
        });
      } else {
        setResult("not_found");
      }
    }
  };

  return (
    <div
      id="pincode"
      className="bg-gradient-to-br from-teal-900 via-slate-900 to-cyan-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-2">
          <MapPin className="w-4 h-4" />
          <span>Doorstep Sample Collection Availability</span>
        </div>

        <h3 className="text-2xl font-black text-white mb-2">
          Check Service Availability in Your Locality
        </h3>
        <p className="text-slate-300 text-xs leading-relaxed mb-6">
          Enter your 6-digit area postal code to check phlebotomist home dispatch timings and local promotional offers.
        </p>

        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              maxLength={6}
              placeholder="Enter Pincode e.g. 110001"
              value={pincodeInput}
              onChange={(e) => {
                setPincodeInput(e.target.value);
                setResult(null);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-sm outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>Check Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Result Message: COVERED + PROMOTION (Requirement 7) */}
        {result && typeof result === "object" && (
          <div className="mt-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-100 text-sm">
                  Doorstep Collection Available in {result.locality}!
                </p>
                <p className="text-emerald-300 mt-0.5">
                  {result.estimatedTime} • Certified Phlebotomist Dispatched in Temperature-Controlled Kits
                </p>
              </div>
            </div>

            {/* Pincode Promotional Banner */}
            <div className="p-4 rounded-2xl bg-teal-950/90 border border-teal-500/40 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-teal-300">
                    Locality Special Offer
                  </span>
                  <p className="text-xs font-bold text-white">
                    Free Home Collection On All Full Body Health Packages
                  </p>
                </div>
              </div>
              <a
                href="/images/promotions/health-packages-poster.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1.5 transition whitespace-nowrap"
              >
                <span>View Brochure</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Result Message: NOT COVERED (Requirement 7) */}
        {result === "not_found" && (
          <div className="mt-5 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-100 text-sm">
                  Pincode Not Currently Covered for Doorstep Home Collection
                </p>
                <p className="text-rose-300 mt-1 leading-relaxed">
                  We are expanding our phlebotomy routes rapidly. In the meantime, you are warmly invited to walk in to our central reference laboratory or contact our logistics helpline to request a custom appointment.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-rose-900/60 flex flex-wrap gap-2">
              <a
                href="tel:+919876543210"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 transition"
              >
                <Phone className="w-3 h-3 text-rose-300" />
                <span>Call Helpline: +91 98765 43210</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 text-[11px] font-bold flex items-center gap-1.5 transition"
              >
                <MessageSquare className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
