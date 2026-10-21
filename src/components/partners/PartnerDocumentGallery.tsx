"use client";

import { useEffect, useState } from "react";
import { FileText, X, ExternalLink } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  description: string;
  file: string;
  type: string;
  aspect: string; // 'portrait' | 'landscape'
}

interface PartnerDocumentGalleryProps {
  certificates: Certificate[];
  partnerName: string;
}

export const PartnerDocumentGallery = ({
  certificates,
  partnerName,
}: PartnerDocumentGalleryProps) => {
  const [selectedDoc, setSelectedDoc] = useState<Certificate | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedDoc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDoc(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDoc]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedDoc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDoc]);

  if (certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/40 px-8 py-16 text-center">
        <FileText className="mb-4 h-12 w-12 text-slate-600" />
        <p className="text-base font-medium text-slate-400">
          No documents available for this partner yet.
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Check back later for certificates and documentation from {partnerName}.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Document Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {certificates.map((cert) => (
          <button
            key={cert.id}
            onClick={() => setSelectedDoc(cert)}
            className="group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-left shadow-md transition-all duration-200 hover:border-teal-600 hover:shadow-teal-900/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label={`View ${cert.title}`}
          >
            {/* PDF Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-700/60 transition-colors group-hover:bg-teal-900/40">
              <FileText className="h-10 w-10 text-teal-400" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <p className="line-clamp-2 text-center text-sm font-bold text-white">
              {cert.title}
            </p>

            {/* Description */}
            {cert.description && (
              <p className="line-clamp-2 text-center text-xs text-slate-400">
                {cert.description}
              </p>
            )}

            {/* View Document button */}
            <span className="mt-auto inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors group-hover:bg-teal-500">
              <FileText className="h-3.5 w-3.5" />
              View Document
            </span>
          </button>
        ))}
      </div>

      {/* Full-screen Modal */}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDoc(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedDoc.title}
        >
          {/* Modal Panel */}
          <div
            className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 shrink-0 text-teal-400" />
                <h2 className="truncate text-base font-semibold text-white">
                  {selectedDoc.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="ml-4 shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-label="Close document viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* iframe Viewer */}
            <div className="flex-1 bg-slate-950 p-4">
              <iframe
                src={selectedDoc.file}
                className="w-full h-[75vh] rounded-xl border border-slate-700"
                title={selectedDoc.title}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-700 px-5 py-3">
              <p className="text-xs text-slate-500 truncate">
                {selectedDoc.description}
              </p>
              <a
                href={selectedDoc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow transition-colors hover:bg-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open in New Tab
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
