import html2canvas from "html2canvas";

export function generateCSS(headingFont: string, bodyFont: string): string {
  const headingFontUrl = headingFont.replace(/\s+/g, "+");
  const bodyFontUrl = bodyFont.replace(/\s+/g, "+");

  return `/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=${headingFontUrl}:wght@400;500;600;700&family=${bodyFontUrl}:wght@300;400;500;600&display=swap');

/* CSS Variables */
:root {
  --font-heading: "${headingFont}", serif;
  --font-body: "${bodyFont}", sans-serif;
}

/* Usage */
.heading {
  font-family: var(--font-heading);
}

.body {
  font-family: var(--font-body);
}`;
}

export function generateFigmaJSON(
  headingFont: string,
  bodyFont: string
): string {
  return JSON.stringify(
    {
      fontPairing: {
        heading: headingFont,
        body: bodyFont,
      },
      styles: {
        heading: {
          fontFamily: headingFont,
          fontWeight: 600,
        },
        body: {
          fontFamily: bodyFont,
          fontWeight: 400,
        },
      },
    },
    null,
    2
  );
}

export function generateEmbedLink(
  headingFont: string,
  bodyFont: string
): string {
  const fonts = [headingFont, bodyFont]
    .map((f) => f.replace(/\s+/g, "+"))
    .join("&family=");
  return `https://fonts.googleapis.com/css2?family=${fonts}:wght@400;500;600;700&display=swap`;
}

export async function captureScreenshot(
  elementId: string
): Promise<string | null> {
  try {
    const element = document.getElementById(elementId);
    if (!element) return null;

    const canvas = await html2canvas(element);

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    return null;
  }
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

