import type { VercelRequest, VercelResponse } from "@vercel/node";

export async function readRawBody(req: VercelRequest): Promise<string> {
  if (typeof req.body === "string") {
    return req.body;
  }

  if (Buffer.isBuffer(req.body)) {
    return req.body.toString("utf8");
  }

  if (req.body && typeof req.body === "object") {
    return JSON.stringify(req.body);
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", (error) => reject(error));
  });
}

export function sendJson(res: VercelResponse, status: number, payload: Record<string, unknown>): void {
  res.status(status).json(payload);
}

export function isPost(req: VercelRequest): boolean {
  return req.method?.toUpperCase() === "POST";
}
