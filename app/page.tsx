"use client";

import React, { useState, useMemo } from "react";

export const dynamic = "force-dynamic";
import { PairingCard } from "@/components/gallery/PairingCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { Tag } from "@/components/ui/Tag";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { curatedPairings } from "@/data/pairings";
import { FontPairing } from "@/types";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    curatedPairings.forEach((pairing) => {
      pairing.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter pairings
  const filteredPairings = useMemo(() => {
    let filtered = curatedPairings;

    // Search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pairing) =>
          pairing.headingFont.toLowerCase().includes(lowerQuery) ||
          pairing.bodyFont.toLowerCase().includes(lowerQuery) ||
          pairing.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter((pairing) =>
        pairing.tags.includes(selectedTag)
      );
    }

    return filtered;
  }, [searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-primary-900">
      {/* Header */}
      <header className="bg-white dark:bg-primary-800 border-b border-neutral-200 dark:border-primary-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-50">
                Not my type
          </h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/playground"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-900 dark:hover:text-primary-200 transition-colors"
              >
                Playground
              </Link>
              <Link
                href="/saved"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-900 dark:hover:text-primary-200 transition-colors"
            >
                Saved
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-50 mb-4">
            Find Your Type
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Explore curated font pairings, validate combinations, and save your
            favorites. Build typography that works.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            placeholder="Search by font name or tag (e.g., 'Inter', 'modern')..."
            onSearch={setSearchQuery}
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Filter Chips */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === null
                  ? "bg-primary-900 dark:bg-primary-50 text-white dark:text-primary-900"
                  : "bg-white dark:bg-primary-800 border border-neutral-300 dark:border-primary-600 text-neutral-700 dark:text-neutral-300 hover:border-primary-900 dark:hover:border-primary-400"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(selectedTag === tag ? null : tag)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-primary-900 dark:bg-primary-50 text-white dark:text-primary-900"
                    : "bg-white dark:bg-primary-800 border border-neutral-300 dark:border-primary-600 text-neutral-700 dark:text-neutral-300 hover:border-primary-900 dark:hover:border-primary-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {filteredPairings.length === 0
              ? "No pairings found. Try custom builder?"
              : `Showing ${filteredPairings.length} pairing${
                  filteredPairings.length !== 1 ? "s" : ""
                }`}
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredPairings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPairings.map((pairing) => (
              <PairingCard key={pairing.id} pairing={pairing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-neutral-500 dark:text-neutral-400 mb-4">
              No pairings found. Try broadening your search?
            </p>
            <Link
              href="/playground"
              className="inline-block px-6 py-3 bg-primary-900 dark:bg-primary-50 text-white dark:text-primary-900 rounded-xl font-medium hover:bg-primary-950 dark:hover:bg-primary-100 transition-colors"
            >
              Create Custom Pairing
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
