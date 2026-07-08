// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../webhooks/stripe.js";

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
  mockSendDownloadLinkEmail: vi.fn(),
  mockRecordPaidDownload: vi.fn(),
  mockCreateBillingPortalSession: vi.fn(),
  mockConstructEvent: vi.fn(),
  mockSubscriptionUpdate: vi.fn(),
}));

vi.mock("../_lib/db.js", () => ({
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
  recordPaidDownload: mocks.mockRecordPaidDownload,
}));

vi.mock("../_lib/email.js", () => ({
  sendBillingUpdateEmail: mocks.mockSendBillingUpdateEmail,
  sendDownloadLinkEmail: mocks.mockSendDownloadLinkEmail,
}));

vi.mock("../_lib/stripe.js", () => ({
  createBillingPortalSession: mocks.mockCreateBillingPortalSession,
  getStripeClient: () => ({
    webhooks: { constructEvent: mocks.mockConstructEvent },
    subscriptions: { update: mocks.mockSubscriptionUpdate },
  }),
}));

// The handler uses the Web-standard (Request -> Response) signature. Body content
// is irrelevant here because constructEvent is mocked; the signature header just
// needs to be present so the handler proceeds to constructEvent.
function makeRequest(body = "{}", headers: Record<string, string> = { "stripe-signature": "sig_123" }): Request {
  return new Request("https://change180.org/api/webhooks/stripe", {
    method: "POST",
    headers,
    body,
  });
}

describe("stripe webhook handler", () => {
  beforeEach(() => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    process.env.BILLING_SUPPORT_EMAIL = "support@test.com";
    process.env.BILLING_FROM_EMAIL = "billing@test.com";
    process.env.SITE_BASE_URL = "https://change180.org";

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
    mocks.mockSendDownloadLinkEmail.mockReset();
    mocks.mockRecordPaidDownload.mockReset();
    mocks.mockCreateBillingPortalSession.mockReset();
    mocks.mockConstructEvent.mockReset();
    mocks.mockSubscriptionUpdate.mockReset();

    mocks.mockMarkEventProcessed.mockResolvedValue(true);
    mocks.mockRecordPaidDownload.mockResolvedValue({ id: 1 });
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

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
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

  it("records a paid download and emails the buyer a tokenized link", async () => {
    mocks.mockConstructEvent.mockReturnValue({
      id: "evt_dl",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_dl",
          mode: "payment",
          payment_intent: "pi_dl",
          customer_details: { email: "buyer@example.com" },
          metadata: { file_id: "daily-growth-journal" },
        },
      },
    });

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
    expect(mocks.mockRecordPaidDownload).toHaveBeenCalledWith(
      expect.objectContaining({
        fileId: "daily-growth-journal",
        customerEmail: "buyer@example.com",
        checkoutSessionId: "cs_dl",
        paymentIntentId: "pi_dl",
        amountCents: 100,
      })
    );
    // Token is generated inside the handler; assert the link shape.
    const recordArgs = mocks.mockRecordPaidDownload.mock.calls[0][0];
    expect(recordArgs.downloadToken).toMatch(/^[0-9a-f]{64}$/);
    expect(mocks.mockSendDownloadLinkEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "buyer@example.com",
        fileName: "Change180 Daily Growth Journal",
        downloadUrl: `https://change180.org/api/download/daily-growth-journal?token=${recordArgs.downloadToken}`,
      })
    );
  });

  it("does not email again when the purchase was already recorded (idempotent)", async () => {
    mocks.mockRecordPaidDownload.mockResolvedValue(null);
    mocks.mockConstructEvent.mockReturnValue({
      id: "evt_dl_dup",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_dl_dup",
          mode: "payment",
          customer_details: { email: "buyer@example.com" },
          metadata: { file_id: "daily-growth-journal" },
        },
      },
    });

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
    expect(mocks.mockRecordPaidDownload).toHaveBeenCalledTimes(1);
    expect(mocks.mockSendDownloadLinkEmail).not.toHaveBeenCalled();
  });

  it("ignores an unknown file_id (not in the catalog)", async () => {
    mocks.mockConstructEvent.mockReturnValue({
      id: "evt_dl_unknown",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_dl_unknown",
          mode: "payment",
          customer_details: { email: "buyer@example.com" },
          metadata: { file_id: "does-not-exist" },
        },
      },
    });

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
    expect(mocks.mockRecordPaidDownload).not.toHaveBeenCalled();
    expect(mocks.mockSendDownloadLinkEmail).not.toHaveBeenCalled();
  });

  it("skips a paid download with no buyer email", async () => {
    mocks.mockConstructEvent.mockReturnValue({
      id: "evt_dl_noemail",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_dl_noemail",
          mode: "payment",
          metadata: { file_id: "daily-growth-journal" },
        },
      },
    });

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
    expect(mocks.mockRecordPaidDownload).not.toHaveBeenCalled();
    expect(mocks.mockSendDownloadLinkEmail).not.toHaveBeenCalled();
  });

  it("short-circuits duplicate stripe events", async () => {
    mocks.mockConstructEvent.mockReturnValue({
      id: "evt_dup",
      type: "checkout.session.completed",
      data: { object: { id: "cs_dup", mode: "payment", metadata: {} } },
    });
    mocks.mockMarkEventProcessed.mockResolvedValue(false);

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(expect.objectContaining({ duplicate: true }));
    expect(mocks.mockUpdateBillingIntentByCheckoutSession).not.toHaveBeenCalled();
  });
});
