"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Home as HomeIcon, Calendar } from "lucide-react";
import { TopBar } from "./TopBar";
import { BookingModal } from "../booking/BookingModal";

export const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [modalPreselect, setModalPreselect] = useState<{ name: string; type: "test" | "package"; price: number } | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services & Tests", href: "/services" },
    { name: "Health Packages", href: "/health-packages" },
    { name: "Home Collection", href: "/home-sample-collection" },
    { name: "Partners", href: "/partners" },
    { name: "Resources", href: "/resources" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const openBookTest = () => {
    setModalPreselect(null);
    setBookingModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <TopBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

            {/* Logo — uses client's supplied image */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 flex-shrink-0">
                <Image
                  src="/images/logo/logo.jpeg"
                  alt="Shree Diagnostic Center Logo"
                  fill
                  sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 56px"
                  className="object-contain rounded-xl"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors whitespace-nowrap">
                  Shree<span className="text-teal-600 font-light"> Diagnostic</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-teal-700 whitespace-nowrap">
                  Diagnostic Center &amp; Pathology Lab
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "text-teal-700 bg-teal-50/80 font-bold"
                        : "text-slate-700 hover:text-teal-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <Link
                href="/home-sample-collection"
                className="px-4 py-2.5 rounded-xl border border-teal-600/40 text-teal-700 hover:bg-teal-50 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Book Home Collection</span>
              </Link>

              <button
                onClick={openBookTest}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Test</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "text-teal-700 bg-teal-50 font-bold"
                        : "text-slate-700 hover:text-teal-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={openBookTest}
                className="w-full py-3 rounded-xl bg-teal-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Test</span>
              </button>
              <Link
                href="/home-sample-collection"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl border border-teal-600 text-teal-700 text-center font-bold text-sm hover:bg-teal-50 flex items-center justify-center gap-2"
              >
                <HomeIcon className="w-4 h-4" />
                <span>Book Home Collection</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={modalPreselect}
      />
    </>
  );
};
