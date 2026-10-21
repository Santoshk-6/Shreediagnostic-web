"use client";

import React, { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Send,
  FileText,
  ChevronRight,
  X,
  ExternalLink,
  Award,
  Microscope,
  Star,
  ArrowRight
} from "lucide-react";
import partnersData from "@/data/trusted-partners.json";
import { PartnerDocumentGallery } from "@/components/partners/PartnerDocumentGallery";
import { PARTNER_BENEFITS } from "@/data/partners";

interface Certificate {
  id: string;
  title: string;
  description: string;
  file: string;
  type: string;
  aspect: string;
}

interface Partner {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logoText: string;
  logoColor: string;
  logoFile: string;
  website: string;
  specialties: string[];
  certificates: Certificate[];
  featured: boolean;
  order: number;
}

const partners = partnersData as Partner[];

const logoGradients: Record<string, string> = {
  blue: "from-blue-700 to-blue-500",
  teal: "from-teal-700 to-teal-500",
  purple: "from-purple-700 to-purple-500",
  rose: "from-rose-700 to-rose-500",
};

export default function PartnersPage() {
  const [activePartner, setActivePartner] = useState<Partner | null>(null);
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

  const featuredPartners = partners.filter((p) => p.featured).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-0 pb-16">

      {/* HERO */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
            Trusted Diagnostic Network
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Our Trusted Partners
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Shree Diagnostic Center collaborates with accredited molecular diagnostic labs and specialist partners to bring you the widest range of precision tests under one roof.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {featuredPartners.map((p) => (
              <div key={p.id} className={`flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-2xl px-5 py-3`}>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${logoGradients[p.logoColor] || logoGradients.teal} text-white font-black text-xs flex items-center justify-center shadow`}>
                  {p.logoText.slice(0, 2)}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-sm">{p.shortName}</div>
                  <div className="text-teal-400 text-[10px]">{p.tagline.split(" ").slice(0, 3).join(" ")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRUSTED PARTNERS — DETAILED CARDS */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Featured Partners
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Meet Our Diagnostic Partners
            </h2>
            <p className="text-slate-500 text-sm">
              Click any partner to view their service brochures, certificates, and detailed test menus.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPartners.map((partner) => (
              <div
                key={partner.id}
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-br ${logoGradients[partner.logoColor] || logoGradients.teal} p-6 text-white`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center font-black text-lg border border-white/30 shadow-lg">
                        {partner.logoText.slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">{partner.name}</h3>
                        <p className="text-white/70 text-xs mt-0.5">{partner.tagline}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-1 rounded-lg border border-white/20">
                      {partner.certificates.length} Doc{partner.certificates.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-5">
                  <p className="text-slate-600 text-xs leading-relaxed">{partner.description}</p>

                  {/* Specialties */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.specialties.map((spec, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Documents Preview */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Available Documents</h4>
                    <div className="space-y-1.5">
                      {partner.certificates.map((cert) => (
                        <div key={cert.id} className="flex items-center gap-2 text-xs text-slate-600">
                          <FileText className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                          <span>{cert.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setActivePartner(partner)}
                    className={`w-full py-3 rounded-2xl bg-gradient-to-r ${logoGradients[partner.logoColor] || logoGradients.teal} text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition shadow-md`}
                  >
                    <span>View Brochures & Documents</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER DOCUMENT MODAL */}
      {activePartner && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setActivePartner(null); }}
        >
          <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${logoGradients[activePartner.logoColor] || logoGradients.teal} p-5 flex items-center justify-between flex-shrink-0`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-white border border-white/30">
                  {activePartner.logoText.slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-white font-black text-base">{activePartner.name}</h3>
                  <p className="text-white/70 text-xs">{activePartner.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => setActivePartner(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <PartnerDocumentGallery
                certificates={activePartner.certificates}
                partnerName={activePartner.name}
              />
            </div>
          </div>
        </div>
      )}

      {/* PARTNER BENEFITS */}
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

      {/* BECOME A PARTNER FORM */}
      <section id="partner-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                  <input type="text" required placeholder="Lifecare Clinic / TechCorp"
                    value={formData.orgName} onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Person Name *</label>
                  <input type="text" required placeholder="Dr. Robert Smith"
                    value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210"
                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Official Email *</label>
                  <input type="email" required placeholder="b2b@organization.com"
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Organization Type *</label>
                  <select value={formData.orgType} onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none bg-white">
                    <option value="Clinic">Clinic / Polyclinic</option>
                    <option value="Hospital">Hospital / Nursing Home</option>
                    <option value="Doctor">Independent Doctor / Specialist</option>
                    <option value="Corporate">Corporate Enterprise</option>
                    <option value="Collection Centre">Collection Centre Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Primary Requirement *</label>
                  <select value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none bg-white">
                    <option value="Diagnostic B2B Processing">Diagnostic B2B Processing</option>
                    <option value="Corporate Health Checkup Camp">Corporate Health Checkup Camp</option>
                    <option value="Sample Logistics Pickup">Sample Logistics Pickup</option>
                    <option value="Franchise Collection Lounge">Franchise Collection Lounge</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Message / Collaboration Details</label>
                <textarea rows={3} placeholder="Describe your expected daily sample volumes or health camp requirements..."
                  value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none" />
              </div>
              <button type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>Submit Partnership Application</span>
              </button>
            </form>
          ) : (
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out. Our Corporate Relationship Manager will contact {formData.contactPerson} within 24 business hours.
                </p>
              </div>

              {/* Related Partnership Promotion (Requirement 2 & 3) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-teal-700/50 shadow-md text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-300 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-800">
                    Partner Document Preview
                  </span>
                  <h4 className="text-sm font-bold text-white">Clinova Molecular Diagnostic Services</h4>
                  <p className="text-xs text-slate-300">
                    Review our complete clinical services poster and specialty test parameters.
                  </p>
                </div>
                <a
                  href="/images/partners/clinova/certificates/services-poster.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition whitespace-nowrap"
                >
                  <span>View Services PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
