import diagnosticTestsData from "./diagnostic-tests.json";

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

export const PATHOLOGY_TESTS: PathologyTest[] = diagnosticTestsData as PathologyTest[];
