import { SavedPairing, FontPairing } from "@/types";

const STORAGE_KEY = "notmytype_saved_pairings";

export function savePairing(pairing: FontPairing): void {
  if (typeof window === "undefined") return;

  const saved = getSavedPairings();
  const existingIndex = saved.findIndex((p) => p.id === pairing.id);

  const savedPairing: SavedPairing = {
    ...pairing,
    savedAt: Date.now(),
    custom: true,
  };

  if (existingIndex >= 0) {
    saved[existingIndex] = savedPairing;
  } else {
    saved.push(savedPairing);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

export function getSavedPairings(): SavedPairing[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading saved pairings:", error);
    return [];
  }
}

export function deletePairing(id: string): void {
  if (typeof window === "undefined") return;

  const saved = getSavedPairings();
  const filtered = saved.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function isPairingSaved(id: string): boolean {
  if (typeof window === "undefined") return false;

  const saved = getSavedPairings();
  return saved.some((p) => p.id === id);
}

export function generatePairingId(headingFont: string, bodyFont: string): string {
  return `${headingFont.toLowerCase().replace(/\s+/g, "-")}-${bodyFont.toLowerCase().replace(/\s+/g, "-")}`;
}

