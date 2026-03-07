import type { BillingPackageId, PackageCatalogEntry } from "./types";

export const PACKAGE_CATALOG: Record<BillingPackageId, PackageCatalogEntry> = {
  discovery: {
    id: "discovery",
    displayName: "Discovery Session",
    mode: "one_time",
    amountCents: 7500,
    currency: "usd",
    stripePriceIdEnv: "STRIPE_PRICE_ID_DISCOVERY",
  },
  family: {
    id: "family",
    displayName: "Family & Parent Coaching",
    mode: "one_time",
    amountCents: 11000,
    currency: "usd",
    stripePriceIdEnv: "STRIPE_PRICE_ID_FAMILY",
  },
  clarity: {
    id: "clarity",
    displayName: "Clarity Package",
    mode: "subscription",
    amountCents: 7500,
    currency: "usd",
    interval: "week",
    totalIterations: 4,
    stripePriceIdEnv: "STRIPE_PRICE_ID_CLARITY",
  },
  rooted: {
    id: "rooted",
    displayName: "Rooted & Renewed",
    mode: "subscription",
    amountCents: 7500,
    currency: "usd",
    interval: "week",
    totalIterations: 8,
    stripePriceIdEnv: "STRIPE_PRICE_ID_ROOTED",
  },
  flourish: {
    id: "flourish",
    displayName: "Flourish Forward",
    mode: "subscription",
    amountCents: 10000,
    currency: "usd",
    interval: "week",
    totalIterations: 12,
    stripePriceIdEnv: "STRIPE_PRICE_ID_FLOURISH",
  },
};

export function getPackageConfig(packageId: BillingPackageId): PackageCatalogEntry {
  return PACKAGE_CATALOG[packageId];
}

export function getPackageFromEventType(
  eventTypeUri: string | null,
  eventTypeName: string | null
): BillingPackageId | null {
  const mapJson = process.env.CALENDLY_EVENT_TYPE_MAP_JSON;

  if (eventTypeUri && mapJson) {
    try {
      const parsed = JSON.parse(mapJson) as Record<string, BillingPackageId>;
      const mapped = parsed[eventTypeUri];
      if (mapped && PACKAGE_CATALOG[mapped]) {
        return mapped;
      }
    } catch {
      // Ignore invalid JSON and continue with fallback matching.
    }
  }

  const normalizedText = `${eventTypeUri ?? ""} ${eventTypeName ?? ""}`.toLowerCase();

  if (normalizedText.includes("discovery")) return "discovery";
  if (normalizedText.includes("family") || normalizedText.includes("parent")) return "family";
  if (normalizedText.includes("clarity")) return "clarity";
  if (normalizedText.includes("rooted")) return "rooted";
  if (normalizedText.includes("flourish")) return "flourish";

  return null;
}

export function amountToDollars(amountCents: number): string {
  return `$${(amountCents / 100).toFixed(2)}`;
}
