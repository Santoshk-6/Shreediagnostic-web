export interface Partner {
  id: string;
  name: string;
  type: "Clinic" | "Hospital" | "Doctor" | "Corporate" | "Collection Centre";
  location: string;
  description: string;
  logoText: string;
  bgGradient: string;
}

export const PARTNERS_LIST: Partner[] = [
  {
    id: "p-1",
    name: "Apex Super Specialty Hospital",
    type: "Hospital",
    location: "Central Metro",
    description: "Primary tertiary referral lab partner for inpatient & outpatient specialized testing.",
    logoText: "APEX",
    bgGradient: "from-blue-600 to-indigo-700"
  },
  {
    id: "p-2",
    name: "Lifecare Multi-Specialty Clinic Chain",
    type: "Clinic",
    location: "North Region (12 Branches)",
    description: "Exclusive diagnostic partner for daily blood sample processing and report delivery.",
    logoText: "LIFECARE",
    bgGradient: "from-teal-600 to-emerald-700"
  },
  {
    id: "p-3",
    name: "TechCorp Global Solutions",
    type: "Corporate",
    location: "IT Park Campus",
    description: "Annual corporate health screening partner covering 4,500+ employees with wellness packages.",
    logoText: "TECHCORP",
    bgGradient: "from-slate-700 to-slate-900"
  },
  {
    id: "p-4",
    name: "Metro Wellness & Diagnostic Hub",
    type: "Collection Centre",
    location: "South Metro",
    description: "High-volume sample collection lounge equipped with cold-chain transport logistics.",
    logoText: "METRO",
    bgGradient: "from-cyan-600 to-blue-700"
  },
  {
    id: "p-5",
    name: "Dr. Sharma Endocrinology Clinic",
    type: "Doctor",
    location: "East City",
    description: "Specialized endocrine and diabetes monitoring network partner.",
    logoText: "SHARMA CLINIC",
    bgGradient: "from-emerald-600 to-teal-800"
  },
  {
    id: "p-6",
    name: "St. Jude Heart Institute",
    type: "Hospital",
    location: "West District",
    description: "Cardiovascular biomarker and hs-CRP lipid diagnostic screening partner.",
    logoText: "ST. JUDE",
    bgGradient: "from-rose-600 to-red-800"
  }
];

export const PARTNER_BENEFITS = [
  {
    title: "NABL & ISO Certified Accuracy",
    description: "Gold-standard automated analyzers ensuring highest diagnostic precision for your patients."
  },
  {
    title: "Dedicated B2B Sample Pickup",
    description: "Scheduled daily sample logistics with temperature-controlled cold chain transport."
  },
  {
    title: "Real-time Partner Doctor Portal",
    description: "Instant online portal access to view, track, and download patient reports immediately upon verification."
  },
  {
    title: "Customized Corporate & Clinic Billing",
    description: "Transparent B2B corporate rates, consolidated monthly invoicing, and customized health packages."
  }
];
