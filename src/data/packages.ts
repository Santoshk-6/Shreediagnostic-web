export interface HealthPackage {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  testCount: number;
  turnaroundTime: string;
  fastingRequirement: string;
  recommendedFor: string;
  includedCategories: {
    categoryName: string;
    testsIncluded: string[];
  }[];
  isPopular?: boolean;
}

export const PACKAGE_CATEGORIES = [
  "All Packages",
  "Full Body Checkup",
  "Diabetes Packages",
  "Thyroid Packages",
  "Men's Health Packages",
  "Women's Health Packages",
  "Senior Citizen Packages",
  "Other Diagnostic Packages"
] as const;

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: "pkg-1",
    slug: "executive-full-body-checkup",
    name: "Executive Full Body Health Checkup",
    category: "Full Body Checkup",
    tagline: "Comprehensive 75+ Parameter Screening for Complete Peace of Mind",
    description: "Our flagship full body checkup engineered for early risk detection of lifestyle conditions, organ wellness, metabolic health, and nutritional deficiencies.",
    price: 1499,
    originalPrice: 3999,
    discountPercentage: 62,
    testCount: 78,
    turnaroundTime: "24 Hours",
    fastingRequirement: "10-12 Hours Fasting Required",
    recommendedFor: "Men & Women Aged 18+",
    isPopular: true,
    includedCategories: [
      {
        categoryName: "Complete Blood Count (CBC - 24 Parameters)",
        testsIncluded: ["Hemoglobin", "RBC", "WBC", "Platelet Count", "PCV", "MCV", "MCH", "MCHC", "Neutrophils", "Lymphocytes", "Eosinophils", "Monocytes", "Basophils", "RDW"]
      },
      {
        categoryName: "Lipid Profile (Heart Health - 8 Parameters)",
        testsIncluded: ["Total Cholesterol", "HDL Cholesterol", "LDL Cholesterol", "Triglycerides", "VLDL", "Cholesterol/HDL Ratio", "LDL/HDL Ratio"]
      },
      {
        categoryName: "Liver Function Test (LFT - 11 Parameters)",
        testsIncluded: ["Bilirubin Total", "Bilirubin Direct", "SGOT (AST)", "SGPT (ALT)", "Alkaline Phosphatase", "Total Protein", "Albumin", "Globulin", "A/G Ratio"]
      },
      {
        categoryName: "Kidney Function Test (KFT - 9 Parameters)",
        testsIncluded: ["Blood Urea Nitrogen", "Serum Creatinine", "Uric Acid", "Sodium", "Potassium", "Chloride", "BUN/Creatinine Ratio"]
      },
      {
        categoryName: "Thyroid & Diabetes Screening (4 Parameters)",
        testsIncluded: ["TSH (Thyroid Stimulating Hormone)", "Fasting Blood Sugar", "HbA1c Average Sugar"]
      },
      {
        categoryName: "Vitamin & Mineral Profiles (2 Parameters)",
        testsIncluded: ["Vitamin D3 25-OH", "Vitamin B12"]
      },
      {
        categoryName: "Urine Routine Analysis (18 Parameters)",
        testsIncluded: ["Physical Exam", "Chemical Exam", "Microscopic Exam", "Pus Cells", "Epithelial Cells"]
      }
    ]
  },
  {
    id: "pkg-2",
    slug: "advanced-diabetes-care-package",
    name: "Advanced Diabetes Care Package",
    category: "Diabetes Packages",
    tagline: "Total Glycemic & Diabetic Complication Risk Assessment",
    description: "Designed specifically for prediabetic and diabetic individuals to monitor blood sugar control and detect early signs of kidney or nerve complications.",
    price: 899,
    originalPrice: 2200,
    discountPercentage: 59,
    testCount: 42,
    turnaroundTime: "Same Day (8 Hours)",
    fastingRequirement: "10-12 Hours Fasting Required",
    recommendedFor: "Diabetic / Prediabetic Patients & Annual Monitoring",
    isPopular: true,
    includedCategories: [
      {
        categoryName: "Glycemic Monitoring",
        testsIncluded: ["Fasting Blood Sugar (FBS)", "Post Prandial Sugar (PPBS)", "HbA1c Glycated Hemoglobin", "Average Blood Glucose"]
      },
      {
        categoryName: "Kidney Health & Microalbumin",
        testsIncluded: ["Serum Creatinine", "Blood Urea Nitrogen", "Urine Microalbumin", "Urine Albumin Creatinine Ratio"]
      },
      {
        categoryName: "Lipid & Cardiac Risk",
        testsIncluded: ["Total Cholesterol", "Triglycerides", "HDL", "LDL"]
      }
    ]
  },
  {
    id: "pkg-3",
    slug: "master-thyroid-metabolic-package",
    name: "Master Thyroid & Metabolic Package",
    category: "Thyroid Packages",
    tagline: "Detailed Thyroid Antibody & Hormonal Evaluation",
    description: "Evaluates active thyroid hormones, TSH, and Anti-TPO antibodies to diagnose autoimmune thyroid disorders like Hashimoto's or Graves' disease.",
    price: 999,
    originalPrice: 2400,
    discountPercentage: 58,
    testCount: 6,
    turnaroundTime: "24 Hours",
    fastingRequirement: "8-10 Hours Fasting Recommended",
    recommendedFor: "Individuals experiencing weight fluctuations, fatigue, hair loss",
    isPopular: false,
    includedCategories: [
      {
        categoryName: "Thyroid Hormones",
        testsIncluded: ["Total T3", "Total T4", "Free T3", "Free T4", "TSH High Sensitivity"]
      },
      {
        categoryName: "Autoimmune Thyroid Marker",
        testsIncluded: ["Anti-TPO Antibody"]
      }
    ]
  },
  {
    id: "pkg-4",
    slug: "active-mens-health-package",
    name: "Active Men's Health Package",
    category: "Men's Health Packages",
    tagline: "Tailored Wellness & Vitality Screening for Men",
    description: "Addresses prostate health, testosterone levels, cardiovascular performance, bone strength, and liver/kidney vitality.",
    price: 1899,
    originalPrice: 4500,
    discountPercentage: 57,
    testCount: 65,
    turnaroundTime: "24 Hours",
    fastingRequirement: "10-12 Hours Fasting Required",
    recommendedFor: "Men Aged 30+",
    isPopular: true,
    includedCategories: [
      {
        categoryName: "Hormones & Prostate",
        testsIncluded: ["Total Testosterone", "PSA (Prostate Specific Antigen)"]
      },
      {
        categoryName: "Vitamins & Minerals",
        testsIncluded: ["Vitamin D3", "Vitamin B12", "Serum Calcium"]
      },
      {
        categoryName: "Full Organ Screening",
        testsIncluded: ["CBC", "Lipid Profile", "LFT", "KFT", "HbA1c", "Urine Routine"]
      }
    ]
  },
  {
    id: "pkg-5",
    slug: "wellness-womens-health-package",
    name: "Wellness Women's Health Package",
    category: "Women's Health Packages",
    tagline: "Comprehensive Screening for Hormonal & Bone Health",
    description: "Formulated for women to evaluate anemia risk, thyroid wellness, bone density markers, reproductive hormones, and metabolic health.",
    price: 1899,
    originalPrice: 4500,
    discountPercentage: 57,
    testCount: 68,
    turnaroundTime: "24 Hours",
    fastingRequirement: "10-12 Hours Fasting Required",
    recommendedFor: "Women Aged 25+",
    isPopular: true,
    includedCategories: [
      {
        categoryName: "Anemia & Bone Wellness",
        testsIncluded: ["Serum Iron", "Total Iron Binding Capacity (TIBC)", "Ferritin", "Vitamin D3", "Serum Calcium"]
      },
      {
        categoryName: "Hormone & Thyroid Profile",
        testsIncluded: ["Thyroid Profile (T3, T4, TSH)", "Fasting Blood Sugar", "HbA1c"]
      },
      {
        categoryName: "Comprehensive Organ Panels",
        testsIncluded: ["CBC", "Lipid Profile", "Liver Function Test", "Kidney Function Test"]
      }
    ]
  },
  {
    id: "pkg-6",
    slug: "senior-citizen-golden-care-package",
    name: "Senior Citizen Golden Care Package",
    category: "Senior Citizen Packages",
    tagline: "Holistic Health Protection & Chronic Illness Screening for Seniors",
    description: "Specialized multi-system package evaluating cardiac function, joint markers, renal filtration, diabetes, and essential vitamins in elderly adults.",
    price: 2199,
    originalPrice: 5500,
    discountPercentage: 60,
    testCount: 82,
    turnaroundTime: "24 Hours",
    fastingRequirement: "10-12 Hours Fasting Required",
    recommendedFor: "Seniors Aged 60+",
    isPopular: true,
    includedCategories: [
      {
        categoryName: "Joint & Cardiac Markers",
        testsIncluded: ["High Sensitivity CRP (hs-CRP)", "Rheumatoid Factor (RA Factor)", "Uric Acid", "Serum Calcium", "Phosphorus"]
      },
      {
        categoryName: "Essential Vitamins & Hormones",
        testsIncluded: ["Vitamin D3", "Vitamin B12", "Thyroid TSH"]
      },
      {
        categoryName: "Complete Body Vitality",
        testsIncluded: ["CBC Hemogram", "Full Lipid Profile", "LFT", "KFT", "HbA1c", "Urine Routine"]
      }
    ]
  }
];
