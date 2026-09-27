"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: September 2026 • Shree Diagnostic Center</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you schedule a diagnostic test or home sample collection with Shree Diagnostic Center, we collect personal details including your full name, mobile phone number, email address, residential pickup address, age, gender, and relevant medical history or physician prescriptions provided by you.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. How Information Is Used</h2>
          <p>
            Your information is strictly utilized to process diagnostic tests, assign certified phlebotomists for sample pickup, generate barcoded laboratory reports, send SMS/WhatsApp notification links, and communicate critical health alerts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. Data Security & Health Record Storage</h2>
          <p>
            We implement 256-bit SSL encryption and strict HIPAA-aligned data access protocols to protect patient medical records. Diagnostic test results are stored on secure servers accessible only by authorized pathologists and verified patient logins.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">4. Third-Party Sharing</h2>
          <p>
            Shree Diagnostic Center does not sell, lease, or commercialize patient data. Information may only be shared with NABL partner laboratories or attending physicians explicitly designated by the patient.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">5. Contact Privacy Officer</h2>
          <p>
            If you have questions regarding data privacy or wish to request report deletion, contact privacy@shreediagnostic.com or +91 98765 43210.
          </p>
        </section>

      </div>

    </div>
  );
}
