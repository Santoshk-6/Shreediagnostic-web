"use client";

import React, { useState } from "react";
import { FileText, Search, Download, CheckCircle2, AlertCircle, Lock, ShieldCheck, User } from "lucide-react";

export const ReportLookupModal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "found" | "not_found">("idle");
  const [reportData, setReportData] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery && !mobileNumber) return;

    // Simulated lookup result
    if (searchQuery.toUpperCase().includes("PATH") || mobileNumber.length >= 10 || searchQuery.length >= 4) {
      setReportData({
        bookingId: searchQuery.toUpperCase() || "PATH-849201",
        patientName: "Robert Miller",
        testName: "Executive Full Body Health Checkup (78 Parameters)",
        date: "September 24, 2026",
        status: "Verified by Chief Pathologist",
        downloadUrl: "#"
      });
      setStatus("found");
    } else {
      setStatus("not_found");
    }
  };

  const handleDownloadDemo = () => {
    alert("Downloading sample Pathology Report PDF (Demo)...");
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 max-w-2xl mx-auto">
      
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-black text-slate-900">Download Diagnostic Report</h3>
        <p className="text-xs text-slate-500 mt-1">
          Enter your Booking Reference ID or Registered Mobile Number to access your verified report.
        </p>
      </div>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Booking ID / Reference *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. PATH-849201"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs outline-none uppercase font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Registered Mobile Number *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Search & Access Report</span>
        </button>
      </form>

      {/* Results */}
      {status === "found" && reportData && (
        <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-teal-200 pb-3">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Report Ready for Download</span>
            </div>
            <span className="text-[11px] font-mono bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-bold">
              {reportData.bookingId}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <p><span className="font-semibold text-slate-900">Patient Name:</span> {reportData.patientName}</p>
            <p><span className="font-semibold text-slate-900">Investigation:</span> {reportData.testName}</p>
            <p><span className="font-semibold text-slate-900">Sample Date:</span> {reportData.date}</p>
            <p><span className="font-semibold text-slate-900">Verification:</span> <span className="text-emerald-700 font-medium">{reportData.status}</span></p>
          </div>

          <button
            onClick={handleDownloadDemo}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF Report</span>
          </button>
        </div>
      )}

      {status === "not_found" && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
          <div>
            <p className="font-bold">No active report found matching this ID or Mobile Number.</p>
            <p className="text-rose-600 mt-0.5">Please re-check your booking reference or contact report support at +91 98765 43210.</p>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>256-Bit Encrypted Secure Health Records</span>
        </div>
        <span>Support: care@apexpathlab.com</span>
      </div>

    </div>
  );
};
