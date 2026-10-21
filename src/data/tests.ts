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
  "Cancer Tests",
  "Diabetes Tests",
  "Hormone Tests",
  "Kidney Function Tests",
  "Lipid Profile",
  "Liver Function Tests",
  "Thyroid Tests",
  "Vitamin Tests",
  "Other Diagnostic Tests",
] as const;

export const PATHOLOGY_TESTS: PathologyTest[] = diagnosticTestsData as PathologyTest[];
