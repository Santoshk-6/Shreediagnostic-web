"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function DisclaimerPage() {
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
        <h1 className="text-3xl font-black text-slate-900">Medical & Website Disclaimer</h1>
        <p className="text-xs text-slate-500">Last updated: September 2026 • Shree Diagnostic Center</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
        
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="font-semibold">
            Information provided on this website is for general educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. Interpretation of Test Results</h2>
          <p>
            Pathology test reports state analytical parameters. Clinical interpretation of diagnostic results must always be performed by a qualified medical practitioner or treating physician in correlation with physical symptoms and medical history.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. Emergency Medical Situations</h2>
          <p>
            Shree Diagnostic Center is an outpatient diagnostic testing facility. Do not rely on web bookings for acute medical emergencies. In the event of a medical emergency, visit the nearest hospital emergency room immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. Test Availability & Turnaround</h2>
          <p>
            Report turnaround times stated on the website are estimated averages. Turnaround may vary due to confirmatory re-runs, culture incubation periods, or weather conditions affecting sample logistics.
          </p>
        </section>

      </div>

    </div>
  );
}
