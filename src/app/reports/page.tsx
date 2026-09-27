"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Phone, Mail, ShieldCheck } from "lucide-react";
import { ReportLookupModal } from "@/components/reports/ReportLookupModal";

export default function ReportsPage() {
  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
            256-Bit Encrypted Patient Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Download Diagnostic Reports</h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Access, view, and download your verified NABL pathology report instantly.
          </p>
        </div>
      </section>

      {/* LOOKUP FORM */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReportLookupModal />
      </section>

      {/* ACCESS INSTRUCTIONS & SUPPORT */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <span>Report Download Guidelines & Privacy</span>
          </h3>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>1. Enter your 10-digit registered mobile number or your unique Booking Reference ID (e.g., PATH-849201).</p>
            <p>2. Reports are available immediately after final verification by our Chief Medical Pathologist.</p>
            <p>3. If you experience difficulty downloading your PDF, contact our report desk at care@apexpathlab.com or call +91 98765 43210.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
