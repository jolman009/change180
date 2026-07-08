import type { VercelRequest, VercelResponse } from "@vercel/node";

export async function readRawBody(req: VercelRequest): Promise<string> {
  // IMPORTANT: read the raw request stream BEFORE touching req.body. On the
  // @vercel/node runtime the body is parsed lazily on first req.body access,
  // and that access drains the stream — so reading the stream up front is the
  // only way to recover the exact bytes that Stripe/Calendly signed. (Their
  // signatures are computed over the raw payload; a JSON.stringify() of the
  // parsed object is not guaranteed byte-identical and fails verification.)
  // Unit tests pass a plain object with a `body` property and no stream, which
  // falls through to the fallbacks below.
  const isStream = typeof (req as unknown as { on?: unknown }).on === "function";
  if (isStream && !req.readableEnded) {
    const streamBody = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];
      req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      req.on("error", (error) => reject(error));
    });
    if (streamBody.length > 0) {
      return streamBody;
    }
  }

  if (typeof req.body === "string") {
    return req.body;
  }

  if (Buffer.isBuffer(req.body)) {
    return req.body.toString("utf8");
  }

  if (req.body && typeof req.body === "object") {
    return JSON.stringify(req.body);
  }

  return "";
}

export function sendJson(res: VercelResponse, status: number, payload: Record<string, unknown>): void {
  res.status(status).json(payload);
}

export function isPost(req: VercelRequest): boolean {
  return req.method?.toUpperCase() === "POST";
}
