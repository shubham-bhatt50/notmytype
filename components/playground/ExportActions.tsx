"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  generateCSS,
  generateFigmaJSON,
  generateEmbedLink,
  copyToClipboard,
  downloadFile,
  captureScreenshot,
} from "@/lib/export";
import { savePairing, generatePairingId, isPairingSaved } from "@/lib/storage";
import { generateShareLink } from "@/lib/urlState";

interface ExportActionsProps {
  headingFont: string;
  bodyFont: string;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  headingFont,
  bodyFont,
}) => {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  React.useEffect(() => {
    const id = generatePairingId(headingFont, bodyFont);
    setSaved(isPairingSaved(id));
  }, [headingFont, bodyFont]);

  const handleSave = () => {
    const id = generatePairingId(headingFont, bodyFont);
    savePairing({
      id,
      headingFont,
      bodyFont,
      tags: [],
    });
    setSaved(true);
  };

  const handleCopy = async (content: string, type: string) => {
    await copyToClipboard(content);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExportCSS = () => {
    const css = generateCSS(headingFont, bodyFont);
    downloadFile(css, "font-pairing.css", "text/css");
  };

  const handleExportJSON = () => {
    const json = generateFigmaJSON(headingFont, bodyFont);
    downloadFile(json, "font-pairing.json", "application/json");
  };

  const handleCopyEmbedLink = async () => {
    const link = generateEmbedLink(headingFont, bodyFont);
    await handleCopy(link, "embed");
  };

  const handleCopyShareLink = async () => {
    const link = generateShareLink({ headingFont, bodyFont });
    await handleCopy(link, "share");
  };

  const handleScreenshot = async () => {
    const dataUrl = await captureScreenshot("component-preview");
    if (dataUrl) {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `font-pairing-${headingFont}-${bodyFont}.png`;
      link.click();
    }
  };

  return (
    <div className="bg-white dark:bg-primary-800 rounded-2xl shadow-md dark:shadow-lg border border-neutral-200 dark:border-primary-700 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50">Save & Export</h3>

      <div className="space-y-3">
        <Button
          variant={saved ? "secondary" : "primary"}
          onClick={handleSave}
          className="w-full"
        >
          {saved ? "✓ Saved" : "Save Pairing"}
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleExportCSS}
            className="px-4 py-2 text-sm font-medium bg-neutral-100 dark:bg-primary-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-primary-600 rounded-xl transition-colors"
          >
            Export CSS
          </button>
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 text-sm font-medium bg-neutral-100 dark:bg-primary-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-primary-600 rounded-xl transition-colors"
          >
            Export JSON
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleCopy(generateCSS(headingFont, bodyFont), "css")}
            className="px-4 py-2 text-sm font-medium bg-neutral-100 dark:bg-primary-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-primary-600 rounded-xl transition-colors"
          >
            {copied === "css" ? "✓ Copied" : "Copy CSS"}
          </button>
          <button
            onClick={handleCopyEmbedLink}
            className="px-4 py-2 text-sm font-medium bg-neutral-100 dark:bg-primary-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-primary-600 rounded-xl transition-colors"
          >
            {copied === "embed" ? "✓ Copied" : "Copy Embed"}
          </button>
        </div>

        <button
          onClick={handleCopyShareLink}
          className="w-full px-4 py-2 text-sm font-medium bg-neutral-100 dark:bg-primary-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-primary-600 rounded-xl transition-colors"
        >
          {copied === "share" ? "✓ Link Copied" : "Copy Share Link"}
        </button>

        <button
          onClick={handleScreenshot}
          className="w-full px-4 py-2 text-sm font-medium bg-neutral-100 dark:bg-primary-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-primary-600 rounded-xl transition-colors"
        >
          Screenshot Component
        </button>
      </div>
    </div>
  );
};

