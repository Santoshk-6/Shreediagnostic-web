"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundCancellationPolicyPage() {
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
        <h1 className="text-3xl font-black text-slate-900">Refund & Cancellation Policy</h1>
        <p className="text-xs text-slate-500">Last updated: September 2026 • ApexPath Diagnostic Laboratory</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. Appointment Cancellation</h2>
          <p>
            Test appointments or home sample collection bookings can be cancelled free of charge up to 2 hours prior to the scheduled phlebotomist arrival time or lab visit slot.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. Rescheduling Appointments</h2>
          <p>
            You can reschedule your home sample pickup date or time slot at no extra cost by calling +91 98765 43210 or messaging via WhatsApp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. Refund Eligibility</h2>
          <p>
            For prepaid online orders, if an appointment is cancelled prior to sample collection, a 100% full refund will be processed to your original payment source within 3-5 business days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">4. Post-Sample Processing</h2>
          <p>
            Once a blood or urine sample has been collected and processed in the laboratory, cancellations or refunds are non-eligible as testing reagents have been consumed.
          </p>
        </section>

      </div>

    </div>
  );
}
