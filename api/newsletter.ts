import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { sendNewsletterSignupEmail } from "./_lib/email.js";
import { isPost, sendJson } from "./_lib/http.js";

const requestSchema = z.object({
  email: z.string().trim().email(),
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

  try {
    await sendNewsletterSignupEmail({ email: parsed.data.email });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    sendJson(res, 502, { error: "Failed to subscribe" });
    return;
  }

  sendJson(res, 200, { ok: true });
}
