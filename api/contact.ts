import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { sendContactEmail } from "./_lib/email.js";
import { isPost, sendJson } from "./_lib/http.js";

const requestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().max(40).optional(),
  organization: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1).max(5000),
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

  const { name, email, phone, organization, message } = parsed.data;

  try {
    await sendContactEmail({
      name,
      email,
      phone: phone || null,
      organization: organization || null,
      message,
    });
  } catch (error) {
    console.error("Contact email failed:", error);
    sendJson(res, 502, { error: "Failed to send message" });
    return;
  }

  sendJson(res, 200, { ok: true });
}
