import { GoogleFont } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;
const API_URL = "https://www.googleapis.com/webfonts/v1/webfonts";

let cachedFonts: GoogleFont[] | null = null;

export async function fetchGoogleFonts(): Promise<GoogleFont[]> {
  if (cachedFonts) {
    return cachedFonts;
  }

  if (!API_KEY) {
    console.warn("Google Fonts API key not found. Using fallback fonts.");
    return [];
  }

  try {
    const response = await fetch(
      `${API_URL}?key=${API_KEY}&sort=popularity`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch fonts");
    }

    const data = await response.json();
    cachedFonts = data.items || [];
    return cachedFonts;
  } catch (error) {
    console.error("Error fetching Google Fonts:", error);
    return [];
  }
}

export async function searchFonts(query: string): Promise<GoogleFont[]> {
  const fonts = await fetchGoogleFonts();
  if (!query) return fonts.slice(0, 50); // Return popular fonts

  const lowerQuery = query.toLowerCase();
  return fonts.filter((font) =>
    font.family.toLowerCase().includes(lowerQuery)
  );
}

export function filterFontsByCategory(
  fonts: GoogleFont[],
  category: string | null
): GoogleFont[] {
  if (!category) return fonts;
  return fonts.filter((font) => font.category === category);
}

export function getFontCategories(): string[] {
  return ["serif", "sans-serif", "display", "handwriting", "monospace"];
}

