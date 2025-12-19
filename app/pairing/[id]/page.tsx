"use client";

import React from "react";
import { ComponentPreviews } from "@/components/playground/ComponentPreviews";
import { ExportActions } from "@/components/playground/ExportActions";
import { PreviewCanvas } from "@/components/playground/PreviewCanvas";
import { ValidationBadge } from "@/components/ui/ValidationBadge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { validatePairing } from "@/lib/validation";
import { ValidationResult } from "@/types";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PairingPage() {
  const params = useParams();
  const [headingFont, setHeadingFont] = useState("Inter");
  const [bodyFont, setBodyFont] = useState("Inter");
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  useEffect(() => {
    // Decode pairing from ID (format: heading-font-body-font)
    const id = params.id as string;
    if (id) {
      const parts = id.split("-");
      // Simple decoding - assumes format is heading-font-body-font
      // For more complex names, we'd need URL encoding
      const headingIndex = parts.findIndex((p) => p === "body") - 1;
      if (headingIndex > 0) {
        setHeadingFont(parts.slice(0, headingIndex).join(" "));
        setBodyFont(parts.slice(headingIndex + 1).join(" "));
      }
    }
  }, [params]);

  useEffect(() => {
    if (headingFont && bodyFont) {
      validatePairing(headingFont, bodyFont).then(setValidation);
    }
  }, [headingFont, bodyFont]);

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-50">
              Font Pairing
            </h1>
            {validation && (
              <ValidationBadge
                score={validation.score}
                message={validation.message}
              />
            )}
          </div>
          <div className="space-y-2">
            <p className="text-lg text-primary-900 dark:text-primary-50">
              <span className="font-semibold">Heading:</span>{" "}
              <span style={{ fontFamily: `"${headingFont}", serif` }}>
                {headingFont}
              </span>
            </p>
            <p className="text-lg text-primary-900 dark:text-primary-50">
              <span className="font-semibold">Body:</span>{" "}
              <span style={{ fontFamily: `"${bodyFont}", sans-serif` }}>
                {bodyFont}
              </span>
            </p>
          </div>
          <Link
            href={`/playground?heading=${encodeURIComponent(headingFont)}&body=${encodeURIComponent(bodyFont)}`}
            className="inline-block mt-4 px-6 py-3 bg-primary-900 dark:bg-primary-50 text-white dark:text-primary-900 rounded-xl font-medium hover:bg-primary-950 dark:hover:bg-primary-100 transition-colors"
          >
            Edit in Playground
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <PreviewCanvas
              headingFont={headingFont}
              bodyFont={bodyFont}
            />
            <ExportActions
              headingFont={headingFont}
              bodyFont={bodyFont}
            />
          </div>

          {/* Right Column */}
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

