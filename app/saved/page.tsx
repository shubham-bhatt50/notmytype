"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PairingCard } from "@/components/gallery/PairingCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { getSavedPairings, deletePairing } from "@/lib/storage";
import { SavedPairing } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SavedPage() {
  const [savedPairings, setSavedPairings] = useState<SavedPairing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSavedPairings(getSavedPairings());
  }, []);

  const filteredPairings = useMemo(() => {
    if (!searchQuery) return savedPairings;

    const lowerQuery = searchQuery.toLowerCase();
    return savedPairings.filter(
      (pairing) =>
        pairing.headingFont.toLowerCase().includes(lowerQuery) ||
        pairing.bodyFont.toLowerCase().includes(lowerQuery) ||
        pairing.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }, [savedPairings, searchQuery]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this pairing?")) {
      deletePairing(id);
      setSavedPairings(getSavedPairings());
    }
  };

  const handleLoadToPlayground = (pairing: SavedPairing) => {
    const params = new URLSearchParams({
      heading: pairing.headingFont,
      body: pairing.bodyFont,
    });
    router.push(`/playground?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary-900">
                NotMyType
              </h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-neutral-700 hover:text-primary-900 transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/playground"
                className="text-sm font-medium text-neutral-700 hover:text-primary-900 transition-colors"
              >
                Playground
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Saved Pairings
          </h2>
          <p className="text-lg text-neutral-600">
            Your collection of favorite font combinations
          </p>
        </div>

        {/* Search Bar */}
        {savedPairings.length > 0 && (
          <div className="mb-8">
            <SearchBar
              placeholder="Search your saved pairings..."
              onSearch={setSearchQuery}
              className="max-w-2xl"
            />
          </div>
        )}

        {/* Results Count */}
        {savedPairings.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-neutral-500">
              {filteredPairings.length === 0
                ? "No saved pairings found matching your search"
                : `Showing ${filteredPairings.length} of ${savedPairings.length} saved pairing${
                    savedPairings.length !== 1 ? "s" : ""
                  }`}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        {savedPairings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-500 mb-4 text-lg">
              No saved pairings yet. Find your type.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-primary-900 text-white rounded-xl font-medium hover:bg-primary-950 transition-colors"
              >
                Browse Gallery
              </Link>
              <Link
                href="/playground"
                className="inline-block px-6 py-3 bg-white border-2 border-primary-900 text-primary-900 rounded-xl font-medium hover:bg-primary-900 hover:text-white transition-colors"
              >
                Create Custom
              </Link>
            </div>
          </div>
        ) : filteredPairings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPairings.map((pairing) => (
              <div key={pairing.id} className="relative">
                <PairingCard pairing={pairing} />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleLoadToPlayground(pairing)}
                    className="p-2 bg-white rounded-lg shadow-md hover:bg-neutral-50 transition-colors"
                    title="Load in playground"
                  >
                    <svg
                      className="w-5 h-5 text-primary-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(pairing.id)}
                    className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors"
                    title="Delete pairing"
                  >
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-neutral-500 mb-4">
              No pairings found matching your search.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-primary-900 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

