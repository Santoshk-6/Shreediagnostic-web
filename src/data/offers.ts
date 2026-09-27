export interface Offer {
  id: string;
  title: string;
  badge: string;
  description: string;
  discountedPrice: number;
  originalPrice: number;
  validity: string;
  includedItems: string[];
  terms: string[];
  category: "Campaign" | "Special Offer" | "Health Camp" | "Corporate Offer";
  code?: string;
}

export const CURRENT_OFFERS: Offer[] = [
  {
    id: "off-1",
    title: "Monsoon Preventive Health Camp Package",
    badge: "Limited Time - 65% OFF",
    description: "Comprehensive 60+ Parameter Health Camp Package including Free Home Collection & Doctor Consultation.",
    discountedPrice: 999,
    originalPrice: 2800,
    validity: "Valid till October 31, 2026",
    includedItems: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar",
      "Lipid Profile (Heart Health)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Thyroid TSH",
      "Free Home Sample Pickup",
      "Complimentary Tele-Consultation"
    ],
    terms: [
      "Requires 10-12 hours fasting.",
      "Applicable for home collection and lab walk-ins.",
      "Cannot be combined with other promotional coupons."
    ],
    category: "Health Camp",
    code: "HEALTHCAMP65"
  },
  {
    id: "off-2",
    title: "Vitamin D3 & B12 Combo Special",
    badge: "Bestseller Deal",
    description: "Essential Bone & Nerve Vitality Checkup at an unbeatable duo rate.",
    discountedPrice: 1199,
    originalPrice: 2400,
    validity: "Ongoing Season Special",
    includedItems: [
      "Vitamin D3 (25-OH Total)",
      "Vitamin B12 (Cyanocobalamin)",
      "Serum Calcium Level",
      "Digital Smart Report in 24h"
    ],
    terms: [
      "Fasting not mandatory.",
      "Available across all service pincodes."
    ],
    category: "Special Offer",
    code: "VITAMINDUO"
  },
  {
    id: "off-3",
    title: "Senior Citizen Wellness Special",
    badge: "Flat ₹1,000 OFF",
    description: "Comprehensive golden age health screening tailored for seniors aged 60+.",
    discountedPrice: 1999,
    originalPrice: 3500,
    validity: "Valid All Year Round",
    includedItems: [
      "80+ Parameter Full Body Checkup",
      "hs-CRP Cardiac Risk Marker",
      "Rheumatoid Factor (Joints)",
      "Vitamin D3 & B12",
      "Priority Phlebotomist Home Dispatch"
    ],
    terms: [
      "Valid for senior citizens aged 60 and above.",
      "Requires 10-12 hours overnight fasting."
    ],
    category: "Campaign",
    code: "GOLDENAGE"
  }
];
