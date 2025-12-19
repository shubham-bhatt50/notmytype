"use client";

import React from "react";

interface BlogCardPreviewProps {
  headingFont: string;
  bodyFont: string;
  isDark?: boolean;
  isMobile?: boolean;
  useRealisticContent?: boolean;
}

export const BlogCardPreview: React.FC<BlogCardPreviewProps> = ({
  headingFont,
  bodyFont,
  isDark = false,
  isMobile = false,
  useRealisticContent = true,
}) => {
  const content = useRealisticContent
    ? {
        heading: "The Future of Design Systems",
        body: "Exploring how modern teams are building scalable design systems that adapt to changing needs and technologies...",
        meta: "Jane Doe • 5 min read",
        tag: "Design",
      }
    : {
        heading: "Article Title",
        body: "Article excerpt text that demonstrates how the font pairing works in a content-heavy context...",
        meta: "Author Name • 3 min read",
        tag: "Category",
      };

  const bgClass = isDark ? "bg-primary-800" : "bg-white";
  const textClass = isDark ? "text-white" : "text-primary-900";
  const borderClass = isDark ? "border-primary-700" : "border-neutral-200";

  return (
    <div
      className={`${bgClass} ${textClass} rounded-2xl border ${borderClass} p-6 shadow-md ${
        isMobile ? "max-w-sm" : "w-full"
      }`}
    >
      <div className="space-y-4">
        {content.tag && (
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              isDark
                ? "bg-accent-blue/20 text-accent-blue"
                : "bg-accent-blue/10 text-accent-blue"
            }`}
            style={{ fontFamily: `"${bodyFont}", sans-serif` }}
          >
            {content.tag}
          </span>
        )}
        <h3
          className="text-xl font-bold"
          style={{ fontFamily: `"${headingFont}", serif` }}
        >
          {content.heading}
        </h3>
        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-neutral-300" : "text-neutral-600"
          }`}
          style={{ fontFamily: `"${bodyFont}", sans-serif` }}
        >
          {content.body}
        </p>
        <p
          className={`text-xs ${
            isDark ? "text-neutral-400" : "text-neutral-500"
          }`}
          style={{ fontFamily: `"${bodyFont}", sans-serif` }}
        >
          {content.meta}
        </p>
      </div>
    </div>
  );
};

