"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { FontPairing } from "@/types";
import { useRouter } from "next/navigation";

interface PairingCardProps {
  pairing: FontPairing;
}

export const PairingCard: React.FC<PairingCardProps> = ({ pairing }) => {
  const router = useRouter();

  const handleTryPairing = () => {
    const params = new URLSearchParams({
      heading: pairing.headingFont,
      body: pairing.bodyFont,
    });
    router.push(`/playground?${params.toString()}`);
  };

  return (
    <Card>
      <div className="space-y-4">
        {/* Font Preview */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Heading</p>
            <h3
              className="text-2xl font-semibold text-primary-900 dark:text-primary-50"
              style={{ fontFamily: `"${pairing.headingFont}", serif` }}
            >
              {pairing.headingFont}
            </h3>
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Body</p>
            <p
              className="text-base text-primary-900 dark:text-primary-50"
              style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
            >
              {pairing.bodyFont}
            </p>
          </div>
        </div>

        {/* Preview Hierarchy */}
        <div className="pt-4 border-t border-neutral-200 dark:border-primary-700 space-y-2">
          <h4
            className="text-xl font-bold text-primary-900 dark:text-primary-50"
            style={{ fontFamily: `"${pairing.headingFont}", serif` }}
          >
            Main Headline
          </h4>
          <h5
            className="text-lg font-semibold text-primary-900 dark:text-primary-50"
            style={{ fontFamily: `"${pairing.headingFont}", serif` }}
          >
            Subheading
          </h5>
          <p
            className="text-sm text-neutral-600 dark:text-neutral-400"
            style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
          >
            Body text that demonstrates readability and flow.
          </p>
          <button
            className="text-sm font-medium px-4 py-1.5 bg-primary-900 dark:bg-primary-50 text-white dark:text-primary-900 rounded-lg"
            style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
          >
            Button Text
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {pairing.tags.map((tag) => (
            <Tag key={tag} variant="purple">
              {tag}
            </Tag>
          ))}
        </div>

        {/* Action Button */}
        <div className="shimmer-border w-full">
          <button
            onClick={handleTryPairing}
            className="shimmer-border-inner w-full font-medium px-6 py-3 text-white dark:text-primary-900 hover:bg-primary-950 dark:hover:bg-primary-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Try this pairing
          </button>
        </div>
      </div>
    </Card>
  );
};

