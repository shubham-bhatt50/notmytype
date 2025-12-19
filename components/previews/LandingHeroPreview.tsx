"use client";

import React from "react";

interface LandingHeroPreviewProps {
  headingFont: string;
  bodyFont: string;
  isDark?: boolean;
  isMobile?: boolean;
  useRealisticContent?: boolean;
}

export const LandingHeroPreview: React.FC<LandingHeroPreviewProps> = ({
  headingFont,
  bodyFont,
  isDark = false,
  isMobile = false,
  useRealisticContent = true,
}) => {
  const content = useRealisticContent
    ? {
        heading: "Build Better Products",
        subheading: "The all-in-one platform for modern teams",
        body: "Streamline your workflow, collaborate seamlessly, and ship faster with our powerful suite of tools designed for the way you work.",
        button: "Get Started",
      }
    : {
        heading: "Main Headline",
        subheading: "Supporting headline text",
        body: "Description text that explains the value proposition and shows how the font pairing works at large scale.",
        button: "Call to Action",
      };

  const bgClass = isDark ? "bg-primary-900" : "bg-neutral-50";
  const textClass = isDark ? "text-white" : "text-primary-900";

  return (
    <div
      className={`${bgClass} ${textClass} rounded-2xl p-8 md:p-12 ${
        isMobile ? "max-w-sm" : "w-full"
      }`}
    >
      <div className="space-y-6 text-center">
        <h1
          className={`text-3xl md:text-4xl font-bold ${
            isMobile ? "text-2xl" : ""
          }`}
          style={{ fontFamily: `"${headingFont}", serif` }}
        >
          {content.heading}
        </h1>
        <h2
          className={`text-xl md:text-2xl font-semibold ${
            isDark ? "text-neutral-300" : "text-neutral-700"
          } ${isMobile ? "text-lg" : ""}`}
          style={{ fontFamily: `"${headingFont}", serif` }}
        >
          {content.subheading}
        </h2>
        <p
          className={`text-base md:text-lg leading-relaxed max-w-2xl mx-auto ${
            isDark ? "text-neutral-300" : "text-neutral-600"
          } ${isMobile ? "text-sm" : ""}`}
          style={{ fontFamily: `"${bodyFont}", sans-serif` }}
        >
          {content.body}
        </p>
        <button
          className={`inline-block px-8 py-3 rounded-xl font-medium transition-colors ${
            isDark
              ? "bg-white text-primary-900 hover:bg-neutral-100"
              : "bg-primary-900 text-white hover:bg-primary-950"
          }`}
          style={{ fontFamily: `"${bodyFont}", sans-serif` }}
        >
          {content.button}
        </button>
      </div>
    </div>
  );
};

