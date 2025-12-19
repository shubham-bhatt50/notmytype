"use client";

import React from "react";

interface TestimonialCardPreviewProps {
  headingFont: string;
  bodyFont: string;
  isDark?: boolean;
  isMobile?: boolean;
  useRealisticContent?: boolean;
}

export const TestimonialCardPreview: React.FC<TestimonialCardPreviewProps> = ({
  headingFont,
  bodyFont,
  isDark = false,
  isMobile = false,
  useRealisticContent = true,
}) => {
  const content = useRealisticContent
    ? {
        quote:
          "This product has completely transformed how we work. The impact on our team's productivity has been remarkable.",
        author: "Sarah Johnson",
        company: "CEO, TechCorp",
      }
    : {
        quote:
          "Testimonial quote text that demonstrates how the font pairing works in a social proof context.",
        author: "Person Name",
        company: "Title, Company",
      };

  const bgClass = isDark ? "bg-primary-800" : "bg-white";
  const textClass = isDark ? "text-white" : "text-primary-900";
  const borderClass = isDark ? "border-primary-700" : "border-neutral-200";

  return (
    <div
      className={`${bgClass} ${textClass} rounded-2xl border ${borderClass} p-6 md:p-8 shadow-md ${
        isMobile ? "max-w-sm" : "w-full"
      }`}
    >
      <div className="space-y-6">
        <div className="text-4xl text-primary-400">"</div>
        <p
          className={`text-lg leading-relaxed italic ${
            isDark ? "text-neutral-200" : "text-neutral-700"
          }`}
          style={{ fontFamily: `"${bodyFont}", sans-serif` }}
        >
          {content.quote}
        </p>
        <div className="pt-4 border-t border-neutral-300">
          <p
            className="font-semibold"
            style={{ fontFamily: `"${headingFont}", serif` }}
          >
            {content.author}
          </p>
          <p
            className={`text-sm ${
              isDark ? "text-neutral-400" : "text-neutral-500"
            }`}
            style={{ fontFamily: `"${bodyFont}", sans-serif` }}
          >
            {content.company}
          </p>
        </div>
      </div>
    </div>
  );
};

