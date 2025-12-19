export interface FontPairing {
  id: string;
  headingFont: string;
  bodyFont: string;
  tags: string[];
  useCase?: string;
}

export interface ComponentTemplate {
  name: string;
  type: "productCard" | "blogCard" | "landingHero" | "testimonialCard" | "pricingTable" | "mobileAppScreen";
  content: {
    heading?: string;
    subheading?: string;
    body?: string;
    button?: string;
    caption?: string;
    price?: string;
    badge?: string;
    meta?: string;
    tag?: string;
    quote?: string;
    author?: string;
    company?: string;
    plan?: string;
    features?: string[];
    [key: string]: any;
  };
}

export interface ValidationResult {
  score: "excellent" | "acceptable" | "poor";
  checks: {
    contrast: { passed: boolean; message: string };
    readability: { passed: boolean; message: string };
    harmony: { passed: boolean; message: string };
    hierarchy: { passed: boolean; message: string };
    componentStress: { passed: boolean; message: string };
  };
  message?: string;
}

export interface SavedPairing extends FontPairing {
  savedAt: number;
  custom?: boolean;
}

export interface GoogleFont {
  family: string;
  category: string;
  variants: string[];
  subsets: string[];
}

