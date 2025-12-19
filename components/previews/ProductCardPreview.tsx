"use client";

import React from "react";

interface ProductCardPreviewProps {
  headingFont: string;
  bodyFont: string;
  isDark?: boolean;
  isMobile?: boolean;
  useRealisticContent?: boolean;
}

export const ProductCardPreview: React.FC<ProductCardPreviewProps> = ({
  headingFont,
  bodyFont,
  isDark = false,
  isMobile = false,
  useRealisticContent = true,
}) => {
  const content = useRealisticContent
    ? {
        heading: "Wireless Headphones",
        price: "$199.99",
        body: "Premium sound quality with active noise cancellation. Perfect for music lovers and professionals.",
        button: "Add to Cart",
        badge: "Bestseller",
      }
    : {
        heading: "Product Name",
        price: "$99.99",
        body: "Product description text goes here to show how the fonts work together.",
        button: "Add to Cart",
        badge: "New",
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
        {content.badge && (
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              isDark
                ? "bg-accent-purple/20 text-accent-purple"
                : "bg-accent-purple/10 text-accent-purple"
            }`}
            style={{ fontFamily: `"${bodyFont}", sans-serif` }}
          >
            {content.badge}
          </span>
        )}
        <h3
          className="text-xl font-bold"
          style={{ fontFamily: `"${headingFont}", serif` }}
        >
          {content.heading}
        </h3>
        <p
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-primary-900"
          }`}
          style={{ fontFamily: `"${headingFont}", serif` }}
        >
          {content.price}
        </p>
        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-neutral-300" : "text-neutral-600"
          }`}
          style={{ fontFamily: `"${bodyFont}", sans-serif` }}
        >
          {content.body}
        </p>
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

