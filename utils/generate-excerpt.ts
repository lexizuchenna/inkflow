import { convert } from "html-to-text";

export const generateExcerpt = (
  html: string,
  maxLength: number = 160
): string => {
  const text = convert(html, {
    wordwrap: false,
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "a", options: { ignoreHref: true } },
      { selector: "h2", options: { uppercase: false } },
    ],
  });

  const cleanText = text.replace(/\s+/g, " ").trim();

  if (cleanText.length <= maxLength) return cleanText;

  const lastSpace = cleanText.lastIndexOf(" ", maxLength);
  return cleanText.substring(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
};
