import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { getDownloadProduct } from "../_lib/products.js";
import { getStripeClient } from "../_lib/stripe.js";
import { ENV } from "../_lib/env.js";
import { isPost, sendJson } from "../_lib/http.js";

const requestSchema = z.object({
  fileId: z.string().trim().min(1).max(120),
});

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!isPost(req)) {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) {
    sendJson(res, 400, { error: "Invalid request payload" });
    return;
  }

  const product = getDownloadProduct(parsed.data.fileId);
  if (!product) {
    sendJson(res, 404, { error: "Unknown file" });
    return;
  }

  try {
    const stripe = getStripeClient();
    const siteBaseUrl = ENV.SITE_BASE_URL();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: product.amountCents,
            product_data: {
              name: product.displayName,
              metadata: { file_id: product.fileId },
            },
          },
        },
      ],
      payment_method_types: ["card"],
      // Stripe Checkout collects the buyer's email; the webhook reads it from
      // session.customer_details.email — no email field needed on our site.
      success_url: `${siteBaseUrl}/downloads/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteBaseUrl}/resources?checkout=cancel`,
      metadata: { file_id: product.fileId },
      allow_promotion_codes: false,
    });

    if (!session.url) {
      sendJson(res, 502, { error: "Stripe did not return a checkout URL" });
      return;
    }

    sendJson(res, 200, { url: session.url });
  } catch (error) {
    console.error("create-download checkout failed:", error);
    sendJson(res, 502, { error: "Failed to create checkout session" });
  }
}
