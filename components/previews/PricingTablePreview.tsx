"use client";

import React from "react";

interface PricingTablePreviewProps {
  headingFont: string;
  bodyFont: string;
  isDark?: boolean;
  isMobile?: boolean;
  useRealisticContent?: boolean;
}

export const PricingTablePreview: React.FC<PricingTablePreviewProps> = ({
  headingFont,
  bodyFont,
  isDark = false,
  isMobile = false,
  useRealisticContent = true,
}) => {
  const content = useRealisticContent
    ? {
        plan: "Professional",
        price: "$29",
        period: "/month",
        features: [
          "Unlimited projects",
          "Advanced analytics",
          "Priority support",
          "Custom integrations",
          "Team collaboration",
        ],
        button: "Start Free Trial",
      }
    : {
        plan: "Plan Name",
        price: "$99",
        period: "/month",
        features: ["Feature one", "Feature two", "Feature three"],
        button: "Get Started",
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
      <div className="space-y-6">
        <div>
          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: `"${headingFont}", serif` }}
          >
            {content.plan}
          </h3>
          <div className="flex items-baseline gap-1">
            <span
              className="text-4xl font-bold"
              style={{ fontFamily: `"${headingFont}", serif` }}
            >
              {content.price}
            </span>
            <span
              className={`text-sm ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
              style={{ fontFamily: `"${bodyFont}", sans-serif` }}
            >
              {content.period}
            </span>
          </div>
        </div>
        <ul className="space-y-3">
          {content.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2"
              style={{ fontFamily: `"${bodyFont}", sans-serif` }}
            >
              <span className="text-accent-mint mt-1">✓</span>
              <span
                className={`text-sm ${
                  isDark ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <button
          className={`w-full px-4 py-2.5 rounded-xl font-medium transition-colors ${
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

