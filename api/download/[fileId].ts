import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Readable } from "node:stream";
import { get } from "@vercel/blob";
import {
  ensureSchema,
  getPaidDownloadByToken,
  incrementDownloadCount,
} from "../_lib/db.js";
import { ENV } from "../_lib/env.js";
import { getDownloadProduct } from "../_lib/products.js";

function firstString(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" ? value : null;
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method?.toUpperCase() !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const fileId = firstString(req.query.fileId);
  const token = firstString(req.query.token);

  const product = getDownloadProduct(fileId);
  if (!product) {
    res.status(404).json({ error: "Unknown file" });
    return;
  }
  if (!token) {
    res.status(400).json({ error: "Missing token" });
    return;
  }

  await ensureSchema();
  const record = await getPaidDownloadByToken(token);

  // Verify the token exists and is bound to THIS file.
  if (!record || record.file_id !== product.fileId) {
    res.status(403).json({ error: "Invalid or expired download link" });
    return;
  }

  // Enforce link expiry (age since purchase).
  const ttlDays = ENV.DOWNLOAD_LINK_TTL_DAYS();
  const ageMs = Date.now() - new Date(record.created_at).getTime();
  if (ttlDays > 0 && ageMs > ttlDays * 24 * 60 * 60 * 1000) {
    res.status(410).json({ error: "This download link has expired. Contact support for a new one." });
    return;
  }

  // Enforce redemption cap.
  const maxRedemptions = ENV.DOWNLOAD_MAX_REDEMPTIONS();
  if (maxRedemptions > 0 && record.download_count >= maxRedemptions) {
    res.status(429).json({ error: "This download link has reached its download limit. Contact support for help." });
    return;
  }

  let result;
  try {
    result = await get(product.blobPathname, { access: "private" });
  } catch (error) {
    console.error(`Blob fetch failed for ${product.blobPathname}:`, error);
    res.status(502).json({ error: "Failed to retrieve file" });
    return;
  }

  if (!result || result.statusCode !== 200 || !result.stream) {
    res.status(404).json({ error: "File not found in storage" });
    return;
  }

  // Count this redemption only once we know the file is actually deliverable.
  await incrementDownloadCount(record.id);

  res.status(200);
  res.setHeader("Content-Type", result.blob.contentType || "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${product.downloadFileName}"`);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "private, no-store");
  if (result.blob.size) {
    res.setHeader("Content-Length", String(result.blob.size));
  }

  Readable.fromWeb(result.stream as Parameters<typeof Readable.fromWeb>[0]).pipe(res);
}
