"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, CheckCircle2, Stethoscope, Sparkles } from "lucide-react";
import { ARTICLES } from "@/data/articles";
import { PATHOLOGY_TESTS } from "@/data/tests";
import { BookingModal } from "@/components/booking/BookingModal";

export default function SingleArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = ARTICLES.find((a) => a.slug === slug);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <Link href="/resources" className="inline-block px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs">
          Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      
      {/* HEADER */}
      <section className="bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link href="/resources" className="inline-flex items-center gap-1 text-xs text-teal-300 hover:underline font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Health Articles & Guides</span>
          </Link>

          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700 inline-block">
            {article.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">{article.title}</h1>

          <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span className="text-teal-300 font-medium">{article.author}</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-8 shadow-sm">
          
          {/* Key Takeaways */}
          <div className="p-6 rounded-2xl bg-teal-50 border border-teal-100 space-y-3">
            <h3 className="text-sm font-bold text-teal-950 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Key Medical Takeaways</span>
            </h3>
            <ul className="space-y-2 text-xs text-teal-900">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Paragraphs */}
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Need diagnostic testing?</h4>
              <p className="text-xs text-slate-500">Book your lab sample collection online with free doorstep delivery.</p>
            </div>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition"
            >
              Book a Test Now
            </button>
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
