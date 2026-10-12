"use client";

import React from "react";
import Link from "next/link";
import { Phone, Award, ShieldCheck, Clock } from "lucide-react";

export const TopBar = () => {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Left Badges */}
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
          <div className="flex items-center gap-1.5 text-teal-400 font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>NABL Accredited & ISO 9001 Certified Lab</span>
          </div>
          <span className="hidden sm:inline text-slate-700">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>Sample Collection: 6:00 AM – 8:00 PM (Mon–Sun)</span>
          </div>
        </div>

        {/* Right Quick Links */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 hover:text-teal-300 transition-colors font-semibold text-white"
          >
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span>+91 98765 43210</span>
          </a>
        </div>

      </div>
    </div>
  );
};
