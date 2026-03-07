// @vitest-environment node
import crypto from "node:crypto";
import { describe, expect, it } from "vitest";
import { parseCalendlyBookingPayload, verifyCalendlySignature } from "../_lib/calendly.js";

describe("calendly utils", () => {
  it("verifies calendly signature", () => {
    const payload = JSON.stringify({
      event: "invitee.created",
      payload: { invitee: { email: "test@example.com" } },
    });
    const timestamp = "1712345678";
    const signingKey = "test_signing_key";
    const digest = crypto.createHmac("sha256", signingKey).update(`${timestamp}.${payload}`, "utf8").digest("hex");
    const header = `t=${timestamp},v1=${digest}`;

    expect(
      verifyCalendlySignature({
        signatureHeader: header,
        payload,
        signingKey,
      })
    ).toBe(true);
  });

  it("parses key booking details from calendly payload", () => {
    const parsed = parseCalendlyBookingPayload({
      event: "invitee.created",
      payload: {
        event_type: "https://api.calendly.com/event_types/clarity",
        event: {
          uri: "https://api.calendly.com/scheduled_events/abc",
          start_time: "2026-03-08T10:00:00.000Z",
        },
        invitee: {
          uri: "https://api.calendly.com/invitees/123",
          email: "client@example.com",
          name: "Client Name",
          phone_number: "555-1212",
        },
      },
    });

    expect(parsed.eventTypeUri).toContain("/clarity");
    expect(parsed.eventUri).toContain("/scheduled_events/");
    expect(parsed.inviteeEmail).toBe("client@example.com");
    expect(parsed.inviteeName).toBe("Client Name");
    expect(parsed.inviteePhone).toBe("555-1212");
    expect(parsed.scheduledAt).toBe("2026-03-08T10:00:00.000Z");
  });
});
