// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../webhooks/calendly.js";

const mocks = vi.hoisted(() => ({
  mockEnsureSchema: vi.fn(),
  mockInsertOrGetBooking: vi.fn(),
  mockMarkEventProcessed: vi.fn(),
  mockTrackAnalyticsEvent: vi.fn(),
  mockUpdateBookingStatus: vi.fn(),
  mockUpsertBillingIntent: vi.fn(),
  mockUpsertCustomer: vi.fn(),
  mockSendPaymentRequestEmail: vi.fn(),
  mockCreateCheckoutSession: vi.fn(),
  mockFindOrCreateStripeCustomer: vi.fn(),
}));

vi.mock("../_lib/db.js", () => ({
  ensureSchema: mocks.mockEnsureSchema,
  insertOrGetBooking: mocks.mockInsertOrGetBooking,
  markEventProcessed: mocks.mockMarkEventProcessed,
  trackAnalyticsEvent: mocks.mockTrackAnalyticsEvent,
  updateBookingStatus: mocks.mockUpdateBookingStatus,
  upsertBillingIntent: mocks.mockUpsertBillingIntent,
  upsertCustomer: mocks.mockUpsertCustomer,
}));

vi.mock("../_lib/email.js", () => ({
  sendPaymentRequestEmail: mocks.mockSendPaymentRequestEmail,
}));

vi.mock("../_lib/stripe.js", () => ({
  createCheckoutSession: mocks.mockCreateCheckoutSession,
  findOrCreateStripeCustomer: mocks.mockFindOrCreateStripeCustomer,
}));

vi.mock("../_lib/calendly.js", () => ({
  verifyCalendlySignature: () => true,
  parseCalendlyBookingPayload: () => ({
    eventTypeUri: "https://api.calendly.com/event_types/discovery",
    eventTypeName: "Discovery Session",
    eventUri: "https://api.calendly.com/scheduled_events/evt_1",
    inviteeUri: "https://api.calendly.com/invitees/inv_1",
    inviteeEmail: "client@example.com",
    inviteeName: "Client",
    inviteePhone: "555-1212",
    scheduledAt: "2026-03-08T10:00:00.000Z",
    raw: { payload: {} },
  }),
}));

function createMockResponse() {
  const response = {
    statusCode: 200,
    payload: null as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.payload = payload;
      return this;
    },
  };
  return response;
}

describe("calendly webhook handler", () => {
  beforeEach(() => {
    process.env.CALENDLY_WEBHOOK_SIGNING_KEY = "test_key";
    process.env.STRIPE_SECRET_KEY = "sk_test";
    process.env.RESEND_API_KEY = "re_test";
    process.env.BILLING_FROM_EMAIL = "billing@test.com";
    process.env.BILLING_SUPPORT_EMAIL = "support@test.com";

    mocks.mockEnsureSchema.mockReset();
    mocks.mockInsertOrGetBooking.mockReset();
    mocks.mockMarkEventProcessed.mockReset();
    mocks.mockTrackAnalyticsEvent.mockReset();
    mocks.mockUpdateBookingStatus.mockReset();
    mocks.mockUpsertBillingIntent.mockReset();
    mocks.mockUpsertCustomer.mockReset();
    mocks.mockSendPaymentRequestEmail.mockReset();
    mocks.mockCreateCheckoutSession.mockReset();
    mocks.mockFindOrCreateStripeCustomer.mockReset();

    mocks.mockMarkEventProcessed.mockResolvedValue(true);
    mocks.mockUpsertCustomer.mockResolvedValue({
      id: 10,
      email: "client@example.com",
      name: "Client",
      language: "en",
    });
    mocks.mockInsertOrGetBooking.mockResolvedValue({
      booking: { id: 25 },
      created: true,
    });
    mocks.mockFindOrCreateStripeCustomer.mockResolvedValue({ id: "cus_123" });
    mocks.mockCreateCheckoutSession.mockResolvedValue({
      id: "cs_123",
      url: "https://checkout.stripe.com/c/pay_123",
    });
  });

  it("creates checkout and sends payment link after invitee.created", async () => {
    const req = {
      method: "POST",
      headers: {
        "calendly-webhook-signature": "t=1,v1=abc",
      },
      body: {
        event: "invitee.created",
      },
    } as unknown as VercelRequest;
    const res = createMockResponse() as unknown as VercelResponse;

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(mocks.mockInsertOrGetBooking).toHaveBeenCalledTimes(1);
    expect(mocks.mockCreateCheckoutSession).toHaveBeenCalledTimes(1);
    expect(mocks.mockUpsertBillingIntent).toHaveBeenCalledTimes(1);
    expect(mocks.mockSendPaymentRequestEmail).toHaveBeenCalledTimes(1);
    expect(mocks.mockTrackAnalyticsEvent).toHaveBeenCalledWith(
      "payment_link_sent",
      "calendly",
      expect.any(Object)
    );
  });

  it("short-circuits duplicate webhook deliveries", async () => {
    mocks.mockMarkEventProcessed.mockResolvedValue(false);

    const req = {
      method: "POST",
      headers: {
        "calendly-webhook-signature": "t=1,v1=abc",
      },
      body: {
        event: "invitee.created",
      },
    } as unknown as VercelRequest;
    const res = createMockResponse() as unknown as VercelResponse;

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(mocks.mockCreateCheckoutSession).not.toHaveBeenCalled();
    expect(mocks.mockSendPaymentRequestEmail).not.toHaveBeenCalled();
    expect((res as unknown as { payload: unknown }).payload).toEqual(expect.objectContaining({ duplicate: true }));
  });
});
