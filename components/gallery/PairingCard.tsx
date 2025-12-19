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
            <p className="text-xs text-neutral-500 mb-1">Heading</p>
            <h3
              className="text-2xl font-semibold"
              style={{ fontFamily: `"${pairing.headingFont}", serif` }}
            >
              {pairing.headingFont}
            </h3>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">Body</p>
            <p
              className="text-base"
              style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
            >
              {pairing.bodyFont}
            </p>
          </div>
        </div>

        {/* Preview Hierarchy */}
        <div className="pt-4 border-t border-neutral-200 space-y-2">
          <h4
            className="text-xl font-bold"
            style={{ fontFamily: `"${pairing.headingFont}", serif` }}
          >
            Main Headline
          </h4>
          <h5
            className="text-lg font-semibold"
            style={{ fontFamily: `"${pairing.headingFont}", serif` }}
          >
            Subheading
          </h5>
          <p
            className="text-sm text-neutral-600"
            style={{ fontFamily: `"${pairing.bodyFont}", sans-serif` }}
          >
            Body text that demonstrates readability and flow.
          </p>
          <button
            className="text-sm font-medium px-4 py-1.5 bg-primary-900 text-white rounded-lg"
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
        <Button variant="primary" onClick={handleTryPairing} className="w-full shimmer-border relative">
          Try this pairing
        </Button>
      </div>
    </Card>
  );
};

