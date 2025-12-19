import { ValidationResult } from "@/types";

interface FontInfo {
  name: string;
  category: string;
}

export async function validatePairing(
  headingFont: string,
  bodyFont: string
): Promise<ValidationResult> {
  // Fetch font info if needed (simplified for now)
  const headingInfo: FontInfo = {
    name: headingFont,
    category: inferCategory(headingFont),
  };
  const bodyInfo: FontInfo = {
    name: bodyFont,
    category: inferCategory(bodyFont),
  };

  const checks = {
    contrast: checkContrast(headingInfo, bodyInfo),
    readability: checkReadability(bodyInfo),
    harmony: checkHarmony(headingInfo, bodyInfo),
    hierarchy: checkHierarchy(headingInfo, bodyInfo),
    componentStress: checkComponentStress(headingInfo, bodyInfo),
  };

  const failedChecks = Object.values(checks).filter((check) => !check.passed)
    .length;

  let score: "excellent" | "acceptable" | "poor";
  let message: string;

  if (failedChecks === 0) {
    score = "excellent";
    message = "These fonts have chemistry ✨";
  } else if (failedChecks <= 2) {
    score = "acceptable";
    message = "Good pairing with minor considerations";
  } else {
    score = "poor";
    message = "Not feeling the spark here";
  }

  return {
    score,
    checks,
    message,
  };
}

function inferCategory(fontName: string): string {
  const lower = fontName.toLowerCase();
  if (
    lower.includes("serif") ||
    lower.includes("garamond") ||
    lower.includes("baskerville") ||
    lower.includes("playfair") ||
    lower.includes("merriweather") ||
    lower.includes("cormorant") ||
    lower.includes("lora") ||
    lower.includes("libre")
  ) {
    return "serif";
  }
  if (
    lower.includes("mono") ||
    lower.includes("code") ||
    lower.includes("courier")
  ) {
    return "monospace";
  }
  if (
    lower.includes("display") ||
    lower.includes("bebas") ||
    lower.includes("oswald") ||
    lower.includes("raleway")
  ) {
    return "display";
  }
  return "sans-serif";
}

function checkContrast(
  heading: FontInfo,
  body: FontInfo
): { passed: boolean; message: string } {
  // Check if fonts are too similar
  if (heading.name === body.name) {
    return {
      passed: true,
      message: "Same font family - consistent but may lack hierarchy",
    };
  }

  if (heading.category === body.category && heading.category !== "display") {
    return {
      passed: false,
      message: "Both fonts are similar categories - may lack contrast",
    };
  }

  return {
    passed: true,
    message: "Good contrast between heading and body fonts",
  };
}

function checkReadability(body: FontInfo): { passed: boolean; message: string } {
  // Display fonts are not ideal for body text
  if (body.category === "display") {
    return {
      passed: false,
      message: "Display fonts are not ideal for body text - readability may suffer",
    };
  }

  // Monospace is generally not ideal for body
  if (body.category === "monospace") {
    return {
      passed: false,
      message: "Monospace fonts reduce readability in body text",
    };
  }

  return {
    passed: true,
    message: "Body font has good readability characteristics",
  };
}

function checkHarmony(
  heading: FontInfo,
  body: FontInfo
): { passed: boolean; message: string } {
  // Classic combinations
  const classicCombos = [
    ["serif", "sans-serif"],
    ["display", "sans-serif"],
    ["serif", "serif"], // Sometimes works
  ];

  const combo = [heading.category, body.category].sort().join("-");
  const isClassic =
    classicCombos.some(
      (c) => c.sort().join("-") === combo || c.reverse().sort().join("-") === combo
    ) || heading.name === body.name;

  if (!isClassic) {
    // Check if both are very different categories
    if (
      (heading.category === "display" && body.category === "serif") ||
      (heading.category === "serif" && body.category === "display")
    ) {
      return {
        passed: false,
        message: "Fonts may clash stylistically",
      };
    }
  }

  return {
    passed: true,
    message: "Fonts work well together stylistically",
  };
}

function checkHierarchy(
  heading: FontInfo,
  body: FontInfo
): { passed: boolean; message: string } {
  // Heading should be more distinctive
  if (heading.category === "sans-serif" && body.category === "sans-serif") {
    if (heading.name !== body.name) {
      return {
        passed: true,
        message: "Different sans-serif fonts can create subtle hierarchy",
      };
    }
  }

  // Display or serif headings with sans-serif body is classic
  if (
    (heading.category === "display" || heading.category === "serif") &&
    body.category === "sans-serif"
  ) {
    return {
      passed: true,
      message: "Clear hierarchy - heading stands out from body",
    };
  }

  // Same font can work but hierarchy relies on size/weight
  if (heading.name === body.name) {
    return {
      passed: true,
      message: "Same font - hierarchy relies on size and weight",
    };
  }

  return {
    passed: true,
    message: "Heading font is distinct from body",
  };
}

function checkComponentStress(
  heading: FontInfo,
  body: FontInfo
): { passed: boolean; message: string } {
  // Check if pairing might break in compact components
  // Display fonts can be problematic in small spaces
  if (heading.category === "display" || body.category === "display") {
    return {
      passed: false,
      message: "Display fonts may not work well in compact components",
    };
  }

  // Very decorative fonts might not work in tight layouts
  const decorativeSerifs = [
    "cormorant",
    "playfair",
    "libre baskerville",
  ];
  const isDecorative =
    decorativeSerifs.some((d) =>
      heading.name.toLowerCase().includes(d)
    ) ||
    decorativeSerifs.some((d) => body.name.toLowerCase().includes(d));

  if (isDecorative) {
    return {
      passed: true,
      message: "Decorative fonts may need careful spacing in components",
    };
  }

  return {
    passed: true,
    message: "Pairing works well in compact component layouts",
  };
}

