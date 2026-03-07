import Stripe from "stripe";
import { ENV } from "./env.js";
import { getPackageConfig } from "./billing-config.js";
import type { BillingPackageId } from "./types.js";

let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(ENV.STRIPE_SECRET_KEY(), {
      apiVersion: "2026-02-25.clover",
    });
  }
  return stripeClient;
}

function resolvePriceId(packageId: BillingPackageId): string | null {
  const config = getPackageConfig(packageId);
  if (!config.stripePriceIdEnv) return null;
  return process.env[config.stripePriceIdEnv] || null;
}

export async function findOrCreateStripeCustomer(input: {
  email: string;
  name?: string | null;
  phone?: string | null;
  metadata?: Record<string, string>;
}): Promise<Stripe.Customer> {
  const stripe = getStripeClient();
  const existing = await stripe.customers.list({
    email: input.email,
    limit: 1,
  });

  if (existing.data.length > 0) {
    return existing.data[0];
  }

  return stripe.customers.create({
    email: input.email,
    name: input.name || undefined,
    phone: input.phone || undefined,
    metadata: input.metadata,
  });
}

export async function createCheckoutSession(input: {
  packageId: BillingPackageId;
  customerId: string;
  customerEmail: string;
  bookingId: number;
}): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient();
  const pkg = getPackageConfig(input.packageId);
  const priceId = resolvePriceId(input.packageId);
  const siteBaseUrl = ENV.SITE_BASE_URL();

  const baseMetadata = {
    package_id: input.packageId,
    booking_id: String(input.bookingId),
    customer_email: input.customerEmail,
  };

  if (pkg.mode === "one_time") {
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = priceId
      ? { price: priceId, quantity: 1 }
      : {
          quantity: 1,
          price_data: {
            currency: pkg.currency,
            unit_amount: pkg.amountCents,
            product_data: {
              name: pkg.displayName,
              metadata: baseMetadata,
            },
          },
        };

    return stripe.checkout.sessions.create({
      mode: "payment",
      customer: input.customerId,
      line_items: [lineItem],
      payment_method_types: ["card"],
      success_url: `${siteBaseUrl}/?checkout=success&package=${input.packageId}`,
      cancel_url: `${siteBaseUrl}/?checkout=cancel&package=${input.packageId}`,
      metadata: baseMetadata,
      allow_promotion_codes: false,
    });
  }

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = priceId
    ? { price: priceId, quantity: 1 }
    : {
        quantity: 1,
        price_data: {
          currency: pkg.currency,
          recurring: {
            interval: "week",
            interval_count: 1,
          },
          unit_amount: pkg.amountCents,
          product_data: {
            name: `${pkg.displayName} (Weekly Installment)`,
            metadata: baseMetadata,
          },
        },
      };

  return stripe.checkout.sessions.create({
    mode: "subscription",
    customer: input.customerId,
    line_items: [lineItem],
    payment_method_types: ["card"],
    success_url: `${siteBaseUrl}/?checkout=success&package=${input.packageId}`,
    cancel_url: `${siteBaseUrl}/?checkout=cancel&package=${input.packageId}`,
    metadata: {
      ...baseMetadata,
      total_iterations: String(pkg.totalIterations || 0),
    },
    subscription_data: {
      metadata: {
        ...baseMetadata,
        total_iterations: String(pkg.totalIterations || 0),
      },
    },
    allow_promotion_codes: false,
  });
}

export async function createBillingPortalSession(customerId: string): Promise<string> {
  const stripe = getStripeClient();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: ENV.PORTAL_RETURN_URL(),
  });
  return session.url;
}
