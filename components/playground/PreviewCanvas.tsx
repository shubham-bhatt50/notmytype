"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { ValidationBadge } from "@/components/ui/ValidationBadge";
import { validatePairing } from "@/lib/validation";
import { ValidationResult } from "@/types";

interface PreviewCanvasProps {
  headingFont: string;
  bodyFont: string;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  headingFont,
  bodyFont,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  useEffect(() => {
    validatePairing(headingFont, bodyFont).then(setValidation);
  }, [headingFont, bodyFont]);

  const bgClass = isDark ? "bg-primary-900" : "bg-white";
  const textClass = isDark ? "text-white" : "text-primary-900";

  return (
    <Card hover={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50">
            Live Preview
          </h3>
          <div className="flex items-center gap-3">
            {validation && (
              <ValidationBadge
                score={validation.score}
                message={validation.message}
              />
            )}
            <button
              onClick={() => setIsDark(!isDark)}
              className="px-3 py-1.5 text-sm font-medium bg-neutral-100 dark:bg-primary-700 hover:bg-neutral-200 dark:hover:bg-primary-600 text-primary-900 dark:text-primary-50 rounded-lg transition-colors"
            >
              {isDark ? "Light" : "Dark"} Mode
            </button>
          </div>
        </div>

        <div
          className={`${bgClass} ${textClass} rounded-xl p-8 space-y-6 transition-colors duration-300`}
        >
          {/* H1 */}
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">H1 - Hero Headline</p>
            <h1
              className="text-4xl font-bold"
              style={{ fontFamily: `"${headingFont}", serif` }}
            >
              Main Headline
            </h1>
          </div>

          {/* H2 */}
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">H2 - Subheading</p>
            <h2
              className="text-2xl font-semibold"
              style={{ fontFamily: `"${headingFont}", serif` }}
            >
              Subheading Text
            </h2>
          </div>

          {/* Body */}
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Body Text</p>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: `"${bodyFont}", sans-serif` }}
            >
              This is body text that demonstrates readability and flow. It shows
              how the font pairing works in longer paragraphs and helps you
              evaluate the overall harmony between heading and body fonts.
            </p>
          </div>

          {/* Button */}
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Button / CTA</p>
            <button
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                isDark
                  ? "bg-white text-primary-900 hover:bg-neutral-100"
                  : "bg-primary-900 text-white hover:bg-primary-950"
              }`}
              style={{ fontFamily: `"${bodyFont}", sans-serif` }}
            >
              Call to Action
            </button>
          </div>

          {/* Caption */}
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Caption / Small Text</p>
            <p
              className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
              style={{ fontFamily: `"${bodyFont}", sans-serif` }}
            >
              Small caption text for metadata, labels, or secondary information
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

