import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { ensureSchema, findCustomerByEmail, upsertCustomer } from "../_lib/db.js";
import { sendPortalLinkEmail } from "../_lib/email.js";
import { isPost, sendJson } from "../_lib/http.js";
import { createBillingPortalSession, findOrCreateStripeCustomer } from "../_lib/stripe.js";

const requestSchema = z.object({
  email: z.string().email(),
  language: z.enum(["en", "es"]).optional(),
  name: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!isPost(req)) {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  await ensureSchema();

  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) {
    sendJson(res, 400, { error: "Invalid request payload" });
    return;
  }

  const { email, language, name } = parsed.data;

  let customer = await findCustomerByEmail(email);
  let stripeCustomerId = customer?.stripe_customer_id || null;

  if (!stripeCustomerId) {
    const stripeCustomer = await findOrCreateStripeCustomer({
      email,
      name: name || customer?.name || undefined,
      metadata: { source: "billing_portal_request" },
    });
    stripeCustomerId = stripeCustomer.id;

    customer = await upsertCustomer({
      email,
      name: name || customer?.name || null,
      phone: customer?.phone || null,
      language: language || customer?.language || "en",
      stripeCustomerId,
    });
  }

  const portalUrl = await createBillingPortalSession(stripeCustomerId);
  await sendPortalLinkEmail({
    to: email,
    firstName: customer?.name || name || null,
    portalUrl,
    language: language || customer?.language || "en",
  });

  sendJson(res, 200, {
    ok: true,
    message:
      language === "es"
        ? "Te enviamos un enlace de administración de pagos a tu correo."
        : "We sent your billing portal link to your email.",
  });
}
