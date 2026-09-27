export interface PathologyTest {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  sampleType: string;
  fastingRequirement: string;
  preparationInstruction: string;
  turnaroundTime: string;
  isPopular?: boolean;
  parametersCount: number;
  overview: string[];
}

export const TEST_CATEGORIES = [
  "All Categories",
  "Blood Tests",
  "Urine Tests",
  "Diabetes Tests",
  "Thyroid Tests",
  "Liver Function Tests",
  "Kidney Function Tests",
  "Lipid Profile",
  "CBC / Hemogram",
  "Vitamin Tests",
  "Hormone Tests",
  "Other Diagnostic Tests",
] as const;

export const PATHOLOGY_TESTS: PathologyTest[] = [
  {
    id: "test-1",
    slug: "complete-blood-count-cbc",
    name: "Complete Blood Count (CBC) / Hemogram",
    category: "CBC / Hemogram",
    shortDescription: "Evaluates overall health and detects a wide range of blood disorders including anemia and infections.",
    description: "A Complete Blood Count (CBC) tests the levels of red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. It is one of the most common and vital diagnostic tests for identifying infections, anemia, and immune system status.",
    price: 350,
    originalPrice: 450,
    sampleType: "Blood (EDTA Whole Blood)",
    fastingRequirement: "Fasting Not Required",
    preparationInstruction: "No special preparation needed. Stay hydrated before sample collection.",
    turnaroundTime: "Same Day (6-8 Hours)",
    isPopular: true,
    parametersCount: 24,
    overview: [
      "Hemoglobin Level",
      "Total Leukocyte Count (TLC)",
      "Differential Leukocyte Count (DLC)",
      "Platelet Count",
      "Packed Cell Volume (PCV)",
      "RBC Indices (MCV, MCH, MCHC, RDW)"
    ]
  },
  {
    id: "test-2",
    slug: "fasting-blood-sugar-fbs",
    name: "Fasting Blood Sugar (FBS)",
    category: "Diabetes Tests",
    shortDescription: "Measures glucose levels in blood after an overnight fast to screen for diabetes and prediabetes.",
    description: "Fasting Blood Sugar measures blood glucose levels after a minimum 8 to 12 hour fast. It is essential for diagnosing Type 1 and Type 2 Diabetes, as well as monitoring blood glucose control in diabetic patients.",
    price: 150,
    originalPrice: 200,
    sampleType: "Blood (Fluoride Plasma)",
    fastingRequirement: "10-12 Hours Strict Fasting",
    preparationInstruction: "Do not consume food or beverages except water for 10-12 hours prior to the test.",
    turnaroundTime: "Same Day (4 Hours)",
    isPopular: true,
    parametersCount: 1,
    overview: ["Fasting Plasma Glucose Level"]
  },
  {
    id: "test-3",
    slug: "hba1c-glycated-hemoglobin",
    name: "HbA1c (Glycated Hemoglobin)",
    category: "Diabetes Tests",
    shortDescription: "Reflects average blood sugar control over the past 2 to 3 months.",
    description: "HbA1c measures the percentage of blood sugar attached to hemoglobin. It provides a long-term picture of blood sugar control and helps evaluate the effectiveness of diabetes management plans.",
    price: 550,
    originalPrice: 700,
    sampleType: "Blood (Whole Blood)",
    fastingRequirement: "Fasting Not Required",
    preparationInstruction: "Can be performed at any time of day regardless of meal timing.",
    turnaroundTime: "Same Day (6 Hours)",
    isPopular: true,
    parametersCount: 3,
    overview: ["HbA1c Percentage", "Estimated Average Glucose (eAG)", "Glycated Fraction"]
  },
  {
    id: "test-4",
    slug: "thyroid-profile-total-t3-t4-tsh",
    name: "Thyroid Profile Total (T3, T4, TSH)",
    category: "Thyroid Tests",
    shortDescription: "Comprehensive evaluation of thyroid gland functioning and hormonal balance.",
    description: "Thyroid Profile checks levels of Triiodothyronine (T3), Thyroxine (T4), and Thyroid Stimulating Hormone (TSH) to diagnose hypothyroidism, hyperthyroidism, and thyroiditis.",
    price: 490,
    originalPrice: 650,
    sampleType: "Blood (Serum)",
    fastingRequirement: "8-10 Hours Fasting Recommended",
    preparationInstruction: "Take blood sample preferably in the morning. Inform technician if taking thyroid medications.",
    turnaroundTime: "Same Day (8 Hours)",
    isPopular: true,
    parametersCount: 3,
    overview: ["Total T3", "Total T4", "TSH (Thyroid Stimulating Hormone)"]
  },
  {
    id: "test-5",
    slug: "lipid-profile-comprehensive",
    name: "Lipid Profile Comprehensive",
    category: "Lipid Profile",
    shortDescription: "Measures cholesterol and triglyceride levels to assess cardiovascular disease risk.",
    description: "A complete lipid panel measuring total cholesterol, high-density lipoprotein (HDL - good cholesterol), low-density lipoprotein (LDL - bad cholesterol), VLDL, and triglycerides to evaluate heart health.",
    price: 600,
    originalPrice: 850,
    sampleType: "Blood (Serum)",
    fastingRequirement: "10-12 Hours Strict Fasting",
    preparationInstruction: "Fast overnight. Avoid alcohol and high-fat meals 24 hours before the test.",
    turnaroundTime: "Same Day (6 Hours)",
    isPopular: true,
    parametersCount: 8,
    overview: [
      "Total Cholesterol",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "Triglycerides",
      "VLDL Cholesterol",
      "Total / HDL Ratio",
      "LDL / HDL Ratio"
    ]
  },
  {
    id: "test-6",
    slug: "liver-function-test-lft",
    name: "Liver Function Test (LFT)",
    category: "Liver Function Tests",
    shortDescription: "Assesses liver enzymes, protein production, and bilirubin metabolism.",
    description: "Evaluates enzymes (SGOT/AST, SGPT/ALT, Alkaline Phosphatase), total proteins, albumin, globulin, and bilirubin levels to check for liver infection, fatty liver disease, and liver damage.",
    price: 650,
    originalPrice: 900,
    sampleType: "Blood (Serum)",
    fastingRequirement: "8-10 Hours Fasting Recommended",
    preparationInstruction: "Avoid alcohol for 48 hours prior to test. Drink adequate water.",
    turnaroundTime: "Same Day (8 Hours)",
    isPopular: true,
    parametersCount: 11,
    overview: [
      "Bilirubin Total & Direct",
      "SGOT / AST",
      "SGPT / ALT",
      "Alkaline Phosphatase (ALP)",
      "Total Protein",
      "Albumin & Globulin Ratio"
    ]
  },
  {
    id: "test-7",
    slug: "kidney-function-test-kft",
    name: "Kidney Function Test (KFT / RFT)",
    category: "Kidney Function Tests",
    shortDescription: "Evaluates renal function by measuring urea, creatinine, uric acid, and electrolytes.",
    description: "Screens for kidney health, filtration efficiency, and electrolyte imbalances. Crucial for hypertension, diabetes, and kidney disorder management.",
    price: 650,
    originalPrice: 850,
    sampleType: "Blood (Serum)",
    fastingRequirement: "8-10 Hours Fasting Recommended",
    preparationInstruction: "Avoid intense strenuous exercise 24 hours prior to blood draw.",
    turnaroundTime: "Same Day (8 Hours)",
    isPopular: true,
    parametersCount: 9,
    overview: [
      "Blood Urea Nitrogen (BUN)",
      "Serum Creatinine",
      "Uric Acid",
      "Sodium & Potassium",
      "Chloride",
      "BUN/Creatinine Ratio"
    ]
  },
  {
    id: "test-8",
    slug: "vitamin-d3-25-hydroxy",
    name: "Vitamin D3 (25-Hydroxy)",
    category: "Vitamin Tests",
    shortDescription: "Measures Vitamin D levels essential for bone density, immune response, and joint health.",
    description: "Checks 25-Hydroxy Vitamin D level in blood serum to detect deficiency responsible for bone weakness, muscle pain, chronic fatigue, and reduced immunity.",
    price: 790,
    originalPrice: 1200,
    sampleType: "Blood (Serum)",
    fastingRequirement: "Fasting Not Required",
    preparationInstruction: "Inform doctor if taking Vitamin D supplements.",
    turnaroundTime: "24 Hours",
    isPopular: true,
    parametersCount: 1,
    overview: ["25-OH Vitamin D Total Level"]
  },
  {
    id: "test-9",
    slug: "vitamin-b12-cyanocobalamin",
    name: "Vitamin B12 (Cyanocobalamin)",
    category: "Vitamin Tests",
    shortDescription: "Evaluates Vitamin B12 status essential for nerve health and red blood cell production.",
    description: "Detects Vitamin B12 deficiency which can cause nerve damage, numbness, memory impairment, weakness, and megaloblastic anemia.",
    price: 690,
    originalPrice: 950,
    sampleType: "Blood (Serum)",
    fastingRequirement: "8 Hours Fasting Recommended",
    preparationInstruction: "Fast overnight for optimal test accuracy.",
    turnaroundTime: "24 Hours",
    isPopular: true,
    parametersCount: 1,
    overview: ["Serum Vitamin B12 Concentration"]
  },
  {
    id: "test-10",
    slug: "routine-urine-analysis",
    name: "Routine Urine Analysis",
    category: "Urine Tests",
    shortDescription: "Screens for urinary tract infections (UTI), kidney disease, and diabetes.",
    description: "Physical, chemical, and microscopic examination of urine to detect protein, glucose, pus cells, red blood cells, and bacteria.",
    price: 200,
    originalPrice: 300,
    sampleType: "Urine (Clean Catch Midstream)",
    fastingRequirement: "Fasting Not Required",
    preparationInstruction: "Collect first-morning clean-catch midstream urine sample in sterile container.",
    turnaroundTime: "Same Day (4 Hours)",
    isPopular: false,
    parametersCount: 18,
    overview: ["Urine pH & Specific Gravity", "Protein & Glucose", "Pus Cells & Epithelial Cells", "Crystals & Casts"]
  },
  {
    id: "test-11",
    slug: "testosterone-total",
    name: "Testosterone Total Level",
    category: "Hormone Tests",
    shortDescription: "Evaluates primary male hormone levels responsible for muscle mass, energy, and reproductive health.",
    description: "Measures total circulating testosterone level in blood serum. Helps diagnose hormonal imbalances, fatigue, low libido, and fertility concerns.",
    price: 650,
    originalPrice: 900,
    sampleType: "Blood (Serum)",
    fastingRequirement: "Fasting Recommended",
    preparationInstruction: "Best collected early morning between 7 AM and 10 AM when testosterone levels peak.",
    turnaroundTime: "24 Hours",
    isPopular: false,
    parametersCount: 1,
    overview: ["Serum Total Testosterone Level"]
  },
  {
    id: "test-12",
    slug: "crp-c-reactive-protein",
    name: "C-Reactive Protein (Quantitative CRP)",
    category: "Other Diagnostic Tests",
    shortDescription: "Detects systemic inflammation, acute bacterial infections, and tissue injury.",
    description: "Quantitative CRP is an acute-phase reactant produced by the liver during inflammation or active tissue injury.",
    price: 450,
    originalPrice: 600,
    sampleType: "Blood (Serum)",
    fastingRequirement: "Fasting Not Required",
    preparationInstruction: "No specific restriction required.",
    turnaroundTime: "Same Day (6 Hours)",
    isPopular: false,
    parametersCount: 1,
    overview: ["Quantitative C-Reactive Protein Level"]
  }
];
