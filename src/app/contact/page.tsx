"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  FileText,
  Calendar,
  Home as HomeIcon,
  Navigation,
  Globe
} from "lucide-react";
import { BookingModal } from "@/components/booking/BookingModal";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Enquiry",
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
            24/7 Patient Support & Contact Hub
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Contact Us</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Have questions about test bookings, home collection, or results? Reach out to our customer care team — we're here to help.
          </p>
        </div>
      </section>


      {/* CONTACT INFO & MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900">Laboratory Address & Contact</h2>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Central Reference Laboratory</h4>
                    <p className="text-slate-500 mt-0.5">
                      124 Healthcare Boulevard, Medical Enclave, Central Metro City - 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Phone Helpline</h4>
                    <a href="tel:+919876543210" className="text-teal-700 font-semibold hover:underline">+91 98765 43210</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">WhatsApp Booking & Support</h4>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold hover:underline">+91 98765 43210</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                    <a href="mailto:care@shreediagnostic.com" className="text-slate-600 hover:underline">care@shreediagnostic.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Working Hours</h4>
                    <p className="text-slate-500 mt-0.5">Monday – Sunday: 6:30 AM – 8:30 PM (365 Days)</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-400">Follow Us:</span>
                <a href="#" className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-teal-700 hover:text-white transition">Facebook</a>
                <a href="#" className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-teal-700 hover:text-white transition">Instagram</a>
                <a href="#" className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-teal-700 hover:text-white transition">LinkedIn</a>
              </div>
            </div>

          </div>

          {/* Right Column Map & Directions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Google Maps Location & Directions</h3>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Map Placeholder Frame */}
              <div className="w-full h-72 rounded-2xl bg-slate-900 text-slate-400 flex flex-col items-center justify-center space-y-2 border border-slate-200 relative overflow-hidden group">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <span className="text-sm font-bold text-white">Shree Diagnostic Center Main Pathology Laboratory</span>
                <span className="text-xs text-slate-400">124 Healthcare Boulevard, Medical Enclave</span>
                <span className="text-[10px] font-mono text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                  Lat: 28.6139° N, Long: 77.2090° E
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CONTACT / ENQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Send a Message
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">General Enquiry & Feedback</h2>
            <p className="text-xs text-slate-500 mt-1">Our support team will respond to your query within 2 hours.</p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none"
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Subject / Enquiry Type *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 text-xs outline-none bg-white"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Test Booking Inquiry">Test Booking Inquiry</option>
                    <option value="Home Collection Status">Home Collection Status</option>
                    <option value="Report Discrepancy / Inquiry">Report Discrepancy / Inquiry</option>
                    <option value="Corporate / Partnership">Corporate / Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you today?"
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
                <span>Send Enquiry Message</span>
              </button>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-600">
                Thank you for contacting Shree Diagnostic Center. Our representative will get back to you shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          )}

        </div>
      </section>

      {/* QUICK BOOKING CTAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-800 to-cyan-950 text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-black text-white">Need Urgent Diagnostic Testing?</h3>
          <p className="text-teal-100 text-xs">Book online or schedule doorstep sample collection now.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-teal-400 text-slate-950 font-black text-xs shadow-md"
            >
              Book a Test
            </button>
            <Link
              href="/home-sample-collection"
              className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-bold text-xs"
            >
              Book Home Collection
            </Link>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

    </div>
  );
}
