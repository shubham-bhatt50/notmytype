"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ProductCardPreview } from "@/components/previews/ProductCardPreview";
import { BlogCardPreview } from "@/components/previews/BlogCardPreview";
import { LandingHeroPreview } from "@/components/previews/LandingHeroPreview";
import { TestimonialCardPreview } from "@/components/previews/TestimonialCardPreview";
import { PricingTablePreview } from "@/components/previews/PricingTablePreview";
import { MobileAppScreenPreview } from "@/components/previews/MobileAppScreenPreview";

interface ComponentPreviewsProps {
  headingFont: string;
  bodyFont: string;
}

type ComponentType =
  | "productCard"
  | "blogCard"
  | "landingHero"
  | "testimonialCard"
  | "pricingTable"
  | "mobileAppScreen";

const components: { id: ComponentType; name: string }[] = [
  { id: "productCard", name: "Product Card" },
  { id: "blogCard", name: "Blog Card" },
  { id: "landingHero", name: "Landing Hero" },
  { id: "testimonialCard", name: "Testimonial" },
  { id: "pricingTable", name: "Pricing Table" },
  { id: "mobileAppScreen", name: "Mobile App" },
];

export const ComponentPreviews: React.FC<ComponentPreviewsProps> = ({
  headingFont,
  bodyFont,
}) => {
  const [activeComponent, setActiveComponent] =
    useState<ComponentType>("productCard");
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [useRealisticContent, setUseRealisticContent] = useState(true);

  const renderComponent = () => {
    const props = {
      headingFont,
      bodyFont,
      isDark,
      isMobile,
      useRealisticContent,
    };

    switch (activeComponent) {
      case "productCard":
        return <ProductCardPreview {...props} />;
      case "blogCard":
        return <BlogCardPreview {...props} />;
      case "landingHero":
        return <LandingHeroPreview {...props} />;
      case "testimonialCard":
        return <TestimonialCardPreview {...props} />;
      case "pricingTable":
        return <PricingTablePreview {...props} />;
      case "mobileAppScreen":
        return <MobileAppScreenPreview {...props} />;
      default:
        return null;
    }
  };

  return (
    <Card hover={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary-900">
            Component Previews
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
          {components.map((component) => (
            <button
              key={component.id}
              onClick={() => setActiveComponent(component.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeComponent === component.id
                  ? "bg-primary-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {component.name}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              isDark
                ? "bg-primary-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            onClick={() => setIsMobile(!isMobile)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              isMobile
                ? "bg-primary-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {isMobile ? "📱 Mobile" : "💻 Desktop"}
          </button>
          <label className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-neutral-100 rounded-lg cursor-pointer hover:bg-neutral-200">
            <input
              type="checkbox"
              checked={useRealisticContent}
              onChange={(e) => setUseRealisticContent(e.target.checked)}
              className="rounded"
            />
            Realistic Content
          </label>
        </div>

        {/* Preview */}
        <div className="pt-4 border-t border-neutral-200 dark:border-primary-700">
          <div id="component-preview" className="flex justify-center">
            {renderComponent()}
          </div>
        </div>
      </div>
    </Card>
  );
};

