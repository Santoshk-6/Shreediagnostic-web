"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Stethoscope,
  Users,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  Award,
  Send,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  HeartHandshake,
  Layers,
  Activity
} from "lucide-react";
import { PARTNER_BENEFITS, PARTNERS_LIST } from "@/data/partners";

export default function PartnerWithUsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "",
    contactPerson: "",
    phone: "",
    email: "",
    orgType: "Doctors & Specialists",
    requirements: "Diagnostic B2B Processing",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const b2bSegments = [
    {
      title: "For Practicing Doctors & Specialists",
      icon: Stethoscope,
      desc: "Fast, accurate diagnostic reporting with direct tele-consultation access to our senior MD Pathologists and dedicated report dispatch.",
      features: ["Customized prescription referral pads", "Urgent STAT report turnaround", "Direct phone access to Chief Pathologist"]
    },
    {
      title: "For Clinics & Polyclinics",
      icon: Activity,
      desc: "Daily scheduled cold-chain sample pickup, seamless digital integrations, and attractive B2B institutional pricing.",
      features: ["Twice daily scheduled courier pickup", "Doctor & clinic digital portal", "Consolidated monthly billing"]
    },
    {
      title: "For Hospitals & Nursing Homes",
      icon: Building2,
      desc: "Comprehensive outsourced laboratory services, handling routine through specialized molecular and histopathology investigations.",
      features: ["NABL accredited backup lab", "24/7 emergency batch processing", "Critical panic-value reporting alert"]
    },
    {
      title: "For Corporates & Enterprises",
      icon: Briefcase,
      desc: "Tailored on-site annual employee health checkups, executive wellness screening, and occupational medical camps.",
      features: ["On-premise phlebotomist teams", "Digital aggregate health analytics", "Custom packages starting ₹499"]
    },
    {
      title: "For Healthcare & Diagnostic Centres",
      icon: Layers,
      desc: "Expand your local testing menu without high capital expenditure by routing specialized tests to our reference lab.",
      features: ["500+ specialized tests catalog", "Automated barcode label dispatch", "Co-branded smart digital reports"]
    },
    {
      title: "For Bulk Testing & Health Camps",
      icon: Users,
      desc: "Scalable high-throughput sample processing capacity for community health camps, NGOs, and government welfare drives.",
      features: ["Volume discounted rates", "High-capacity automated analyzers", "Rapid mass report generation"]
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3.5 py-1 rounded-full border border-teal-800 inline-flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>B2B Clinical & Corporate Alliances</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Partner With Shree Diagnostic Center</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Expand your diagnostic capabilities, elevate patient clinical outcomes, and grow your medical practice with our NABL-accredited diagnostic infrastructure.
          </p>

          <div className="pt-2 flex justify-center gap-4">
            <a
              href="#enquiry-form"
              className="px-8 py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs shadow-lg transition"
            >
              Fill Partnership Inquiry
            </a>
            <Link
              href="/partners"
              className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
            >
              View Our Existing Partners
            </Link>
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Tailored B2B Programs
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">Who We Partner With</h2>
          <p className="text-slate-500 text-xs mt-1">Flexible partnership models designed for clinics, doctors, hospitals, and corporates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {b2bSegments.map((segment, idx) => {
            const IconComp = segment.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{segment.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{segment.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                  {segment.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PARTNERSHIP BENEFITS */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
              Institutional Advantages
            </span>
            <h2 className="text-3xl font-black text-white mt-2">Why Align With Shree Diagnostic Center?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNER_BENEFITS.map((benefit, idx) => (
              <div key={idx} className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-3">
                <ShieldCheck className="w-8 h-8 text-teal-400" />
                <h3 className="text-base font-bold text-white">{benefit.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="enquiry-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Get Started
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">B2B Partnership Enquiry Form</h2>
            <p className="text-xs text-slate-500 mt-1">
              Submit your organization details to schedule a meeting with our Partnership Director.
            </p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Organization / Practice Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. City Health Polyclinic"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Robert Smith"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="partner@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Organization Type *</label>
                  <select
                    value={formData.orgType}
                    onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none bg-white"
                  >
                    <option value="Doctors & Specialists">Doctors & Specialists</option>
                    <option value="Clinics & Polyclinics">Clinics & Polyclinics</option>
                    <option value="Hospitals & Nursing Homes">Hospitals & Nursing Homes</option>
                    <option value="Corporates & Enterprises">Corporates & Enterprises</option>
                    <option value="Healthcare Centres">Healthcare Centres</option>
                    <option value="Community / NGO Camps">Community / NGO Camps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Primary Requirements *</label>
                  <select
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none bg-white"
                  >
                    <option value="Diagnostic B2B Processing">Diagnostic B2B Processing</option>
                    <option value="Corporate Health Checkup Camp">Corporate Health Checkup Camp</option>
                    <option value="Dedicated Phlebotomist Logistics">Dedicated Phlebotomist Logistics</option>
                    <option value="Bulk Health Screening">Bulk Health Screening</option>
                    <option value="Franchise / Collection Hub">Franchise / Collection Hub</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Message & Estimated Sample Volume</label>
                <textarea
                  rows={3}
                  placeholder="Detail your monthly volume expectations, location, or special test requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Partnership Proposal</span>
              </button>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Application Received!</h3>
              <p className="text-xs text-slate-600">
                Thank you for your interest in partnering with Shree Diagnostic Center. Our Institutional Head will contact {formData.contactPerson} within 24 business hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                Submit Another Request
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
