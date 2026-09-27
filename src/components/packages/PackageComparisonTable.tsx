"use client";

import React, { useState } from "react";
import { Check, X, Sparkles, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { HEALTH_PACKAGES } from "@/data/packages";
import { BookingModal } from "../booking/BookingModal";

export const PackageComparisonTable = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedPkg, setPreselectedPkg] = useState<{ name: string; type: "test" | "package"; price: number } | null>(null);

  const handleBook = (name: string, price: number) => {
    setPreselectedPkg({ name, type: "package", price });
    setBookingModalOpen(true);
  };

  const comparisonFeatures = [
    { label: "Total Tests Included", key: "testCount", format: (val: any) => `${val} Parameters` },
    { label: "Complete Blood Count (CBC)", check: true },
    { label: "Fasting Blood Sugar (FBS)", check: true },
    { label: "HbA1c Glycated Sugar", key: "hba1c" },
    { label: "Lipid Profile (8 Parameters)", check: true },
    { label: "Liver Function Test (LFT)", check: true },
    { label: "Kidney Function Test (KFT)", check: true },
    { label: "Thyroid TSH Screening", check: true },
    { label: "Vitamin D3 & B12", key: "vitamins" },
    { label: "Urine Routine Analysis", check: true },
    { label: "Specialty Markers (hs-CRP/PSA/Anti-TPO)", key: "specialty" },
    { label: "Report Turnaround", key: "turnaroundTime" },
    { label: "Fasting Requirement", key: "fastingRequirement" }
  ];

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 overflow-hidden">
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Compare Health Checkup Packages
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">
            Side-by-Side Diagnostic Package Comparison
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">
                Package Feature
              </th>
              {HEALTH_PACKAGES.map((pkg) => (
                <th key={pkg.id} className="p-4 text-center min-w-[170px]">
                  <div className="space-y-1">
                    {pkg.isPopular && (
                      <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-teal-600 text-white">
                        Popular
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{pkg.name}</h4>
                    <div className="text-teal-700 font-extrabold text-base">₹{pkg.price}</div>
                    <button
                      onClick={() => handleBook(pkg.name, pkg.price)}
                      className="w-full py-1.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition"
                    >
                      Book Now
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            
            {/* Row 1: Parameter Count */}
            <tr>
              <td className="p-4 font-bold text-slate-800 bg-slate-50/40">Total Parameters</td>
              {HEALTH_PACKAGES.map((pkg) => (
                <td key={pkg.id} className="p-4 text-center font-extrabold text-teal-800">
                  {pkg.testCount} Tests
                </td>
              ))}
            </tr>

            {/* Row 2: CBC */}
            <tr>
              <td className="p-4 text-slate-700">Complete Blood Count (CBC)</td>
              {HEALTH_PACKAGES.map((pkg) => (
                <td key={pkg.id} className="p-4 text-center">
                  <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                </td>
              ))}
            </tr>

            {/* Row 3: Lipid Profile */}
            <tr>
              <td className="p-4 text-slate-700">Lipid Profile (Cholesterol)</td>
              {HEALTH_PACKAGES.map((pkg) => (
                <td key={pkg.id} className="p-4 text-center">
                  <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                </td>
              ))}
            </tr>

            {/* Row 4: Liver & Kidney */}
            <tr>
              <td className="p-4 text-slate-700">Liver (LFT) & Kidney (KFT)</td>
              {HEALTH_PACKAGES.map((pkg) => (
                <td key={pkg.id} className="p-4 text-center">
                  <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                </td>
              ))}
            </tr>

            {/* Row 5: Vitamin D3 & B12 */}
            <tr>
              <td className="p-4 text-slate-700">Vitamin D3 & B12 Screening</td>
              {HEALTH_PACKAGES.map((pkg) => {
                const hasVitamins = pkg.includedCategories.some(c =>
                  c.testsIncluded.some(t => t.toLowerCase().includes("vitamin"))
                );
                return (
                  <td key={pkg.id} className="p-4 text-center">
                    {hasVitamins ? (
                      <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Row 6: Report Time */}
            <tr>
              <td className="p-4 font-semibold text-slate-800 bg-slate-50/40">Report Turnaround</td>
              {HEALTH_PACKAGES.map((pkg) => (
                <td key={pkg.id} className="p-4 text-center text-slate-600 font-medium">
                  {pkg.turnaroundTime}
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedItem={preselectedPkg}
      />
    </div>
  );
};
