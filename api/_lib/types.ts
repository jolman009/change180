export type BillingPackageId =
  | "discovery"
  | "family"
  | "clarity"
  | "rooted"
  | "flourish";

export type BillingMode = "one_time" | "subscription";

export type BillingStatus =
  | "pending"
  | "checkout_created"
  | "checkout_completed"
  | "payment_succeeded"
  | "payment_failed"
  | "subscription_active"
  | "subscription_canceled";

export interface PackageCatalogEntry {
  id: BillingPackageId;
  displayName: string;
  mode: BillingMode;
  amountCents: number;
  currency: "usd";
  interval?: "week";
  totalIterations?: number;
  stripePriceIdEnv?: string;
}

export interface CalendlyBookingPayload {
  eventTypeUri: string | null;
  eventTypeName: string | null;
  eventUri: string | null;
  inviteeUri: string | null;
  inviteeEmail: string | null;
  inviteeName: string | null;
  inviteePhone: string | null;
  scheduledAt: string | null;
  raw: unknown;
}
