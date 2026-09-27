"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiePolicyPage() {
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
        <h1 className="text-3xl font-black text-slate-900">Cookie Policy</h1>
        <p className="text-xs text-slate-500">Last updated: September 2026 • ApexPath Diagnostic Laboratory</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. What Are Cookies</h2>
          <p>
            Cookies are small text files placed on your browser or device when visiting our website. They help us remember user preferences, maintain secure session logins, and improve website navigation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. Essential & Functional Cookies</h2>
          <p>
            Essential cookies are mandatory for core website functionality, such as processing test cart items, securing booking forms, and accessing report download portals.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. Analytics & Performance Cookies</h2>
          <p>
            We use anonymized analytical tools to evaluate website traffic patterns, page load performance, and pincode search usability. No personal medical records are tracked through analytics cookies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">4. Managing Cookie Preferences</h2>
          <p>
            Users can disable non-essential cookies at any time through their internet browser settings.
          </p>
        </section>

      </div>

    </div>
  );
}
