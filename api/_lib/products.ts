// Catalog of paid, downloadable files. Single source of truth for pricing and
// the private Vercel Blob path each file lives at. Mirrors billing-config.ts in
// spirit but is intentionally separate from the coaching-package catalog.

export interface DownloadProduct {
  /** Stable id used in Stripe metadata, purchase records, and the download URL. */
  fileId: string;
  /** Shown on the Stripe Checkout line item and in the delivery email. */
  displayName: string;
  /** Filename the browser saves the download as. */
  downloadFileName: string;
  /** One-time price in cents (USD). */
  amountCents: number;
  /** Pathname of the file inside the PRIVATE Vercel Blob store. */
  blobPathname: string;
}

export const DOWNLOAD_PRODUCTS: Record<string, DownloadProduct> = {
  "daily-growth-journal": {
    fileId: "daily-growth-journal",
    displayName: "Change180 Daily Growth Journal",
    downloadFileName: "Change180-Daily-Growth-Journal.pdf",
    amountCents: 900,
    // blobPathname must match the EXACT pathname in the Vercel Blob store (verified via list()).
    blobPathname: "Change180DailyGrowthJournal.pdf",
  },
  "bloom-journal": {
    fileId: "bloom-journal",
    displayName: "Change180 Bloom Journal",
    downloadFileName: "Change180-Bloom-Journal.pdf",
    amountCents: 900,
    blobPathname: "change180-bloom-journal.pdf",
  },
  "business-growth-planner": {
    fileId: "business-growth-planner",
    displayName: "Change180 Business Growth Planner",
    downloadFileName: "Change180-Business-Growth-Planner.pdf",
    amountCents: 1900,
    blobPathname: "change180-business-growth-planner.pdf",
  },
  "leadership-journal": {
    fileId: "leadership-journal",
    displayName: "Change180 Leadership Journal",
    downloadFileName: "Change180-Leadership-Journal.pdf",
    amountCents: 1200,
    blobPathname: "change180-leadership-journal.pdf",
  },
};

export function getDownloadProduct(fileId: string | null | undefined): DownloadProduct | null {
  if (!fileId) return null;
  return DOWNLOAD_PRODUCTS[fileId] ?? null;
}
