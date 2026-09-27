"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ExternalLink, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Column 1: Lab Info & Branding */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-600/30">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Shree<span className="text-teal-400 font-light"> Diagnostic</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              NABL Accredited diagnostic laboratory committed to maximum report precision, rapid turnaround time, and compassionate patient care.
            </p>

            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>NABL & ISO 9001:2015 Certified</span>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-teal-700 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-xs">FB</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-teal-700 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Instagram"
              >
                <span className="font-bold text-xs">IG</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-teal-700 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="YouTube"
              >
                <span className="font-bold text-xs">YT</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-teal-400 transition-colors">Services & Tests</Link></li>
              <li><Link href="/health-packages" className="hover:text-teal-400 transition-colors">Health Packages</Link></li>
              <li><Link href="/home-sample-collection" className="hover:text-teal-400 transition-colors">Home Collection</Link></li>
              <li><Link href="/how-it-works" className="hover:text-teal-400 transition-colors">How It Works</Link></li>
              <li><Link href="/partners" className="hover:text-teal-400 transition-colors">Partners</Link></li>
              <li><Link href="/resources" className="hover:text-teal-400 transition-colors">Resources & Blog</Link></li>
              <li><Link href="/faq" className="hover:text-teal-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Diagnostic Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Services & Tests</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services?category=Blood+Tests" className="hover:text-teal-400 transition-colors">Blood Tests</Link></li>
              <li><Link href="/services/complete-blood-count-cbc" className="hover:text-teal-400 transition-colors">CBC / Hemogram</Link></li>
              <li><Link href="/services?category=Diabetes+Tests" className="hover:text-teal-400 transition-colors">Diabetes Tests</Link></li>
              <li><Link href="/services/thyroid-profile-total-t3-t4-tsh" className="hover:text-teal-400 transition-colors">Thyroid Tests</Link></li>
              <li><Link href="/services/liver-function-test-lft" className="hover:text-teal-400 transition-colors">Liver Function Tests</Link></li>
              <li><Link href="/services/kidney-function-test-kft" className="hover:text-teal-400 transition-colors">Kidney Function Tests</Link></li>
              <li><Link href="/services/lipid-profile-comprehensive" className="hover:text-teal-400 transition-colors">Lipid Profile</Link></li>
              <li><Link href="/services?category=Other+Diagnostic+Tests" className="hover:text-teal-400 transition-colors">Other Diagnostic Tests</Link></li>
            </ul>
          </div>

          {/* Column 4: Business & Partnerships */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Business & Highlights</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/partner-with-us" className="hover:text-teal-400 transition-colors">Partner With Us</Link></li>
              <li><Link href="/partner-with-us" className="hover:text-teal-400 transition-colors">Corporate Health Checkups</Link></li>
              <li><Link href="/offers" className="hover:text-teal-400 transition-colors">Offers & Health Camps</Link></li>
              <li><Link href="/gallery" className="hover:text-teal-400 transition-colors">Laboratory Gallery</Link></li>
              <li><Link href="/reports" className="hover:text-teal-400 transition-colors">Patient Report Portal</Link></li>
              <li><Link href="/home-sample-collection#pincode" className="hover:text-teal-400 transition-colors">Pincode Availability</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Contact & Location</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>124 Healthcare Boulevard, Medical Enclave, Central Metro City - 110001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href="mailto:care@shreediagnostic.com" className="hover:text-white transition-colors">care@shreediagnostic.com</a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Mon – Sun: 6:30 AM – 8:30 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Links Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs border-b border-slate-900">
          <div className="flex items-center gap-4 flex-wrap text-slate-400">
            <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-teal-400 transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-teal-400 transition-colors">Cookie Policy</Link>
            <span>•</span>
            <Link href="/refund-cancellation-policy" className="hover:text-teal-400 transition-colors">Refund & Cancellation Policy</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-teal-400 transition-colors">Medical Disclaimer</Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 Shree Diagnostic Center. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Delivering diagnostic precision with care</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
