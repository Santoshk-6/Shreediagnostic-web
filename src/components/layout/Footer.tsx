"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ExternalLink, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Column 1: Lab Info & Official Branding Logo */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white p-1 flex-shrink-0 shadow-md">
                <Image
                  src="/images/logo/logo.jpeg"
                  alt="Shree Diagnostic Center Official Logo"
                  fill
                  className="object-contain p-0.5 rounded-lg"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-tight leading-none group-hover:text-teal-400 transition">
                  Shree <span className="text-teal-400 font-semibold">Diagnostic</span>
                </span>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                  Diagnostic Center &amp; Pathology Lab
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              NABL Accredited diagnostic laboratory committed to maximum report precision, rapid turnaround time, and compassionate patient care.
            </p>

            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>NABL &amp; ISO 9001:2015 Certified</span>
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
              <li><Link href="/services" className="hover:text-teal-400 transition-colors">Services &amp; Tests</Link></li>
              <li><Link href="/health-packages" className="hover:text-teal-400 transition-colors">Health Packages</Link></li>
              <li><Link href="/home-sample-collection" className="hover:text-teal-400 transition-colors">Home Collection</Link></li>
              <li><Link href="/partners" className="hover:text-teal-400 transition-colors">Partners</Link></li>
              <li><Link href="/resources" className="hover:text-teal-400 transition-colors">Resources &amp; Blog</Link></li>
              <li><Link href="/faq" className="hover:text-teal-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Diagnostic Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Services &amp; Tests</h4>
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Business &amp; Highlights</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/partner-with-us" className="hover:text-teal-400 transition-colors">Partner With Us</Link></li>
              <li><Link href="/offers" className="hover:text-teal-400 transition-colors">Promotions &amp; Offers</Link></li>
              <li><Link href="/gallery" className="hover:text-teal-400 transition-colors">Lab Photo Gallery</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-teal-400 transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-cancellation-policy" className="hover:text-teal-400 transition-colors">Refund &amp; Cancellation</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-teal-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-teal-400 transition-colors">Medical Disclaimer</Link></li>
            </ul>
          </div>

          {/* Column 5: Central Lab Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Lab Location</h4>
            
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Shop No. 4, Ground Floor, Sai Plaza, Opp. Civil Hospital, Station Road, Pune - 411001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:contact@shreediagnostic.com" className="hover:text-white transition-colors">contact@shreediagnostic.com</a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-300">Mon - Sat: 6:00 AM - 9:00 PM</p>
                  <p className="text-[11px] text-slate-500">Sunday: 6:00 AM - 2:00 PM</p>
                  <p className="text-[11px] text-teal-400/80">Home Sample Collection: 6:30 AM - 8:00 PM Daily</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/home-sample-collection" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors"
              >
                <span>Book Home Sample Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Shree Diagnostic Center &amp; Pathology Lab. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
            <span className="text-slate-800">•</span>
            <Link href="/terms-and-conditions" className="hover:text-slate-300">Terms of Service</Link>
            <span className="text-slate-800">•</span>
            <Link href="/disclaimer" className="hover:text-slate-300">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
