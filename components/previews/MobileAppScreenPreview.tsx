"use client";

import React from "react";

interface MobileAppScreenPreviewProps {
  headingFont: string;
  bodyFont: string;
  isDark?: boolean;
  isMobile?: boolean;
  useRealisticContent?: boolean;
}

export const MobileAppScreenPreview: React.FC<MobileAppScreenPreviewProps> = ({
  headingFont,
  bodyFont,
  isDark = false,
  isMobile = false,
  useRealisticContent = true,
}) => {
  const content = useRealisticContent
    ? {
        heading: "Dashboard",
        nav: ["Home", "Discover", "Library", "Profile"],
        cardTitle: "Featured Playlist",
        cardBody: "Your weekly mix of handpicked tracks",
        action: "Play Now",
      }
    : {
        heading: "Screen Title",
        nav: ["Tab 1", "Tab 2", "Tab 3", "Tab 4"],
        cardTitle: "Card Title",
        cardBody: "Card description text",
        action: "Action",
      };

  const bgClass = isDark ? "bg-primary-900" : "bg-neutral-50";
  const textClass = isDark ? "text-white" : "text-primary-900";
  const cardBgClass = isDark ? "bg-primary-800" : "bg-white";
  const borderClass = isDark ? "border-primary-700" : "border-neutral-200";

  return (
    <div
      className={`${bgClass} ${textClass} rounded-2xl border ${borderClass} p-4 shadow-md ${
        isMobile ? "max-w-xs mx-auto" : "w-full max-w-sm"
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: `"${headingFont}", serif` }}
        >
          {content.heading}
        </h2>
        <div className="flex justify-around border-t border-b border-neutral-300 py-2">
          {content.nav.map((item, index) => (
            <button
              key={index}
              className={`text-xs font-medium ${
                isDark ? "text-neutral-300" : "text-neutral-600"
              }`}
              style={{ fontFamily: `"${bodyFont}", sans-serif` }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className={`${cardBgClass} rounded-xl p-4 space-y-3`}>
        <h3
          className="font-semibold"
          style={{ fontFamily: `"${headingFont}", serif` }}
        >
          {content.cardTitle}
        </h3>
        <p
          className={`text-sm ${
            isDark ? "text-neutral-300" : "text-neutral-600"
          }`}
          style={{ fontFamily: `"${bodyFont}", sans-serif` }}
        >
          {content.cardBody}
        </p>
        <button
          className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            isDark
              ? "bg-white text-primary-900 hover:bg-neutral-100"
              : "bg-primary-900 text-white hover:bg-primary-950"
          }`}
          style={{ fontFamily: `"${bodyFont}", sans-serif` }}
        >
          {content.action}
        </button>
      </div>
    </div>
  );
};

