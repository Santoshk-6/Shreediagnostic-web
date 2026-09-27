"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <Link href="/" className="inline-flex items-center gap-1 text-xs text-teal-700 hover:underline font-semibold">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </Link>

      <div className="space-y-2 border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded">
          Legal & Compliance
        </span>
        <h1 className="text-3xl font-black text-slate-900">Terms & Conditions</h1>
        <p className="text-xs text-slate-500">Last updated: September 2026 • ApexPath Diagnostic Laboratory</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. Website & Service Usage</h2>
          <p>
            By accessing or placing an order through the ApexPath Laboratory website, you agree to comply with these Terms and Conditions. All diagnostic services, pricing, and home sample schedules are subject to availability and service area coverage.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. Test Appointments & Home Collection</h2>
          <p>
            Patients must ensure accurate personal, contact, and address details during booking. Fasting instructions provided by the laboratory must be adhered to for reliable diagnostic outcomes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. Pricing & Payment Terms</h2>
          <p>
            Prices listed on the website are inclusive of sample processing and digital report delivery. Payment can be made online or directly to the phlebotomist via Cash or UPI on sample collection.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            Laboratory test reports provide analytical findings. While we maintain stringent NABL quality standards, diagnostic results must always be interpreted in clinical correlation with a qualified medical practitioner.
          </p>
        </section>

      </div>

    </div>
  );
}
