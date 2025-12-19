import { FontPairing } from "@/types";

export function encodePairingToUrl(pairing: {
  headingFont: string;
  bodyFont: string;
}): string {
  const params = new URLSearchParams({
    heading: pairing.headingFont,
    body: pairing.bodyFont,
  });
  return params.toString();
}

export function decodeUrlToPairing(
  searchParams: URLSearchParams
): { headingFont: string; bodyFont: string } | null {
  const heading = searchParams.get("heading");
  const body = searchParams.get("body");

  if (!heading || !body) return null;

  return {
    headingFont: heading,
    bodyFont: body,
  };
}

export function generateShareLink(pairing: {
  headingFont: string;
  bodyFont: string;
}): string {
  if (typeof window === "undefined") return "";
  const params = encodePairingToUrl(pairing);
  return `${window.location.origin}/playground?${params}`;
}

