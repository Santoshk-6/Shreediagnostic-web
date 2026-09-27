"use client";

import React, { useState } from "react";
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
  ArrowRight
} from "lucide-react";
import { PARTNERS_LIST, PARTNER_BENEFITS } from "@/data/partners";

export default function PartnersPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "",
    contactPerson: "",
    phone: "",
    email: "",
    orgType: "Clinic",
    requirements: "Diagnostic B2B Processing",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
            Clinical B2B & Corporate Partnerships
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Partner With ApexPath Laboratory</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Collaborating with hospitals, specialty clinics, corporate enterprises, and practicing physicians for high-accuracy diagnostic sample processing.
          </p>
        </div>
      </section>

      {/* PARTNER LOGO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Our Referral Network
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">Trusted Healthcare Partners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNERS_LIST.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.bgGradient} text-white font-black text-xs flex items-center justify-center shadow-md`}>
                  {p.logoText}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                  <span className="text-xs text-teal-700 font-semibold">{p.type} • {p.location}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNER WITH US & BENEFITS */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
              Why Partner With Us
            </span>
            <h2 className="text-3xl font-black text-white mt-2">Institutional B2B Advantages</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNER_BENEFITS.map((b, idx) => (
              <div key={idx} className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 space-y-3">
                <CheckCircle2 className="w-8 h-8 text-teal-400" />
                <h3 className="text-base font-bold text-white">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PARTNERSHIP ENQUIRY FORM */}
      <section id="partner-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              B2B Alliance Inquiry
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Partnership Application Form</h2>
            <p className="text-xs text-slate-500 mt-1">
              Connect with our corporate and clinical B2B team for bulk testing rates, collection hub setup, or hospital referral tie-ups.
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
                    placeholder="Lifecare Clinic / TechCorp"
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
                    placeholder="Dr. Robert Smith"
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
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="b2b@organization.com"
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
                    <option value="Clinic">Clinic / Polyclinic</option>
                    <option value="Hospital">Hospital / Nursing Home</option>
                    <option value="Doctor">Independent Doctor / Specialist</option>
                    <option value="Corporate">Corporate Enterprise</option>
                    <option value="Collection Centre">Collection Centre Partner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Primary Requirement *</label>
                  <select
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none bg-white"
                  >
                    <option value="Diagnostic B2B Processing">Diagnostic B2B Processing</option>
                    <option value="Corporate Health Checkup Camp">Corporate Health Checkup Camp</option>
                    <option value="Sample Logistics Pickup">Sample Logistics Pickup</option>
                    <option value="Franchise Collection Lounge">Franchise Collection Lounge</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Message / Collaboration Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe your expected daily sample volumes or health camp requirements..."
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
                <span>Submit Partnership Application</span>
              </button>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-xs text-slate-600">
                Thank you for reaching out. Our Corporate Relationship Manager will contact {formData.contactPerson} within 24 business hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                Submit Another Inquiry
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
