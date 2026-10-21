import healthPackagesData from "./health-packages.json";

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

export const HEALTH_PACKAGES: HealthPackage[] = healthPackagesData as HealthPackage[];
