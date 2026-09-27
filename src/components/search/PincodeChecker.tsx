"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2, XCircle, Search, Clock, ArrowRight } from "lucide-react";
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
      // If code starts with 11, 12, 20, 40, 56, standard Metro area simulation
      if (["11", "12", "20", "40", "56"].some(prefix => cleanPin.startsWith(prefix)) && cleanPin.length === 6) {
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
    <div id="pincode" className="bg-gradient-to-br from-teal-900 via-slate-900 to-cyan-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      
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
          Enter your 6-digit area postal code to check phlebotomist home dispatch timings and service coverage.
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
            className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Check Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Result Message */}
        {result && typeof result === "object" && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-100 text-sm">
                Doorstep Collection Available in {result.locality}!
              </p>
              <p className="text-emerald-300 mt-0.5">
                {result.estimatedTime} • Certified Phlebotomist Available Today
              </p>
            </div>
          </div>
        )}

        {result === "not_found" && (
          <div className="mt-4 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3 animate-in fade-in">
            <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-100 text-sm">
                Pincode Currently Not Covered for Home Pickup
              </p>
              <p className="text-rose-300 mt-0.5">
                However, you can walk in to our main central laboratory. Call +91 98765 43210 for assistance.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
