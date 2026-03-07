// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../webhooks/stripe";

const mocks = vi.hoisted(() => ({
  mockEnsureSchema: vi.fn(),
  mockFindBookingIdByCheckoutSession: vi.fn(),
  mockFindCustomerByStripeCustomerId: vi.fn(),
  mockGetSubscriptionByStripeId: vi.fn(),
  mockMarkEventProcessed: vi.fn(),
  mockTrackAnalyticsEvent: vi.fn(),
  mockUpdateBillingIntentByCheckoutSession: vi.fn(),
  mockUpdateBillingIntentByInvoiceId: vi.fn(),
  mockUpdateBillingIntentBySubscriptionId: vi.fn(),
  mockUpdateBookingStatus: vi.fn(),
  mockUpsertSubscription: vi.fn(),
  mockSendBillingUpdateEmail: vi.fn(),
  mockCreateBillingPortalSession: vi.fn(),
  mockConstructEvent: vi.fn(),
  mockSubscriptionUpdate: vi.fn(),
}));

vi.mock("../_lib/db", () => ({
  ensureSchema: mocks.mockEnsureSchema,
  findBookingIdByCheckoutSession: mocks.mockFindBookingIdByCheckoutSession,
  findCustomerByStripeCustomerId: mocks.mockFindCustomerByStripeCustomerId,
  getSubscriptionByStripeId: mocks.mockGetSubscriptionByStripeId,
  markEventProcessed: mocks.mockMarkEventProcessed,
  trackAnalyticsEvent: mocks.mockTrackAnalyticsEvent,
  updateBillingIntentByCheckoutSession: mocks.mockUpdateBillingIntentByCheckoutSession,
  updateBillingIntentByInvoiceId: mocks.mockUpdateBillingIntentByInvoiceId,
  updateBillingIntentBySubscriptionId: mocks.mockUpdateBillingIntentBySubscriptionId,
  updateBookingStatus: mocks.mockUpdateBookingStatus,
  upsertSubscription: mocks.mockUpsertSubscription,
}));

vi.mock("../_lib/email", () => ({
  sendBillingUpdateEmail: mocks.mockSendBillingUpdateEmail,
}));

vi.mock("../_lib/stripe", () => ({
  createBillingPortalSession: mocks.mockCreateBillingPortalSession,
  getStripeClient: () => ({
    webhooks: { constructEvent: mocks.mockConstructEvent },
    subscriptions: { update: mocks.mockSubscriptionUpdate },
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

describe("stripe webhook handler", () => {
  beforeEach(() => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    process.env.BILLING_SUPPORT_EMAIL = "support@test.com";
    process.env.BILLING_FROM_EMAIL = "billing@test.com";

    mocks.mockEnsureSchema.mockReset();
    mocks.mockFindBookingIdByCheckoutSession.mockReset();
    mocks.mockFindCustomerByStripeCustomerId.mockReset();
    mocks.mockGetSubscriptionByStripeId.mockReset();
    mocks.mockMarkEventProcessed.mockReset();
    mocks.mockTrackAnalyticsEvent.mockReset();
    mocks.mockUpdateBillingIntentByCheckoutSession.mockReset();
    mocks.mockUpdateBillingIntentByInvoiceId.mockReset();
    mocks.mockUpdateBillingIntentBySubscriptionId.mockReset();
    mocks.mockUpdateBookingStatus.mockReset();
    mocks.mockUpsertSubscription.mockReset();
    mocks.mockSendBillingUpdateEmail.mockReset();
    mocks.mockCreateBillingPortalSession.mockReset();
    mocks.mockConstructEvent.mockReset();
    mocks.mockSubscriptionUpdate.mockReset();

    mocks.mockMarkEventProcessed.mockResolvedValue(true);
    mocks.mockFindBookingIdByCheckoutSession.mockResolvedValue(22);
    mocks.mockFindCustomerByStripeCustomerId.mockResolvedValue({
      email: "client@example.com",
      name: "Client",
    });
    mocks.mockCreateBillingPortalSession.mockResolvedValue("https://billing.stripe.com/session_123");
    mocks.mockGetSubscriptionByStripeId.mockResolvedValue({
      stripe_subscription_id: "sub_123",
      paid_iterations: 0,
      total_iterations: 4,
      booking_id: 22,
    });
  });

  it("handles checkout.session.completed and updates billing state", async () => {
    mocks.mockConstructEvent.mockReturnValue({
      id: "evt_1",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_123",
          mode: "payment",
          payment_intent: "pi_123",
          invoice: "in_123",
          customer: "cus_123",
          metadata: {
            booking_id: "22",
            package_id: "discovery",
          },
        },
      },
    });

    const req = {
      method: "POST",
      headers: { "stripe-signature": "sig_123" },
      body: "{}",
    } as unknown as VercelRequest;
    const res = createMockResponse() as unknown as VercelResponse;

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(mocks.mockUpdateBillingIntentByCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        checkoutSessionId: "cs_123",
        status: "checkout_completed",
      })
    );
    expect(mocks.mockUpdateBookingStatus).toHaveBeenCalledWith(22, "checkout_completed");
    expect(mocks.mockTrackAnalyticsEvent).toHaveBeenCalledWith(
      "checkout_completed",
      "stripe",
      expect.any(Object)
    );
  });

  it("short-circuits duplicate stripe events", async () => {
    mocks.mockConstructEvent.mockReturnValue({
      id: "evt_dup",
      type: "checkout.session.completed",
      data: { object: { id: "cs_dup", mode: "payment", metadata: {} } },
    });
    mocks.mockMarkEventProcessed.mockResolvedValue(false);

    const req = {
      method: "POST",
      headers: { "stripe-signature": "sig_123" },
      body: "{}",
    } as unknown as VercelRequest;
    const res = createMockResponse() as unknown as VercelResponse;

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.payload).toEqual(expect.objectContaining({ duplicate: true }));
    expect(mocks.mockUpdateBillingIntentByCheckoutSession).not.toHaveBeenCalled();
  });
});
