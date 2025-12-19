"use client";

import React, { useState, useEffect, Suspense } from "react";
import { FontSelector } from "@/components/playground/FontSelector";
import { PreviewCanvas } from "@/components/playground/PreviewCanvas";
import { ComponentPreviews } from "@/components/playground/ComponentPreviews";
import { ExportActions } from "@/components/playground/ExportActions";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { decodeUrlToPairing } from "@/lib/urlState";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const [headingFont, setHeadingFont] = useState("Inter");
  const [bodyFont, setBodyFont] = useState("Inter");

  useEffect(() => {
    const pairing = decodeUrlToPairing(searchParams);
    if (pairing) {
      setHeadingFont(pairing.headingFont);
      setBodyFont(pairing.bodyFont);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-primary-900">
      {/* Header */}
      <header className="bg-white dark:bg-primary-800 border-b border-neutral-200 dark:border-primary-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary-900 dark:text-primary-50">
              Not my type
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-900 dark:hover:text-primary-200 transition-colors"
              >
                Gallery
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-50 mb-2">
            Typography Playground
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Build and test custom font pairings with live previews
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-primary-800 rounded-2xl shadow-md dark:shadow-lg border border-neutral-200 dark:border-primary-700 p-6">
              <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-4">
                Font Selection
              </h2>
              <div className="space-y-6">
                <FontSelector
                  label="Heading Font"
                  value={headingFont}
                  onChange={setHeadingFont}
                />
                <FontSelector
                  label="Body Font"
                  value={bodyFont}
                  onChange={setBodyFont}
                />
              </div>
            </div>

            {/* Live Preview Canvas */}
            <PreviewCanvas
              headingFont={headingFont}
              bodyFont={bodyFont}
            />

            {/* Save & Export */}
            <ExportActions
              headingFont={headingFont}
              bodyFont={bodyFont}
            />
          </div>

          {/* Right Column - Component Previews */}
          <div>
            <ComponentPreviews
              headingFont={headingFont}
              bodyFont={bodyFont}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading playground...</p>
        </div>
      </div>
    }>
      <PlaygroundContent />
    </Suspense>
  );
}

