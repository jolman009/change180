import { Resend } from "resend";
import { ENV } from "./env";
import { amountToDollars, getPackageConfig } from "./billing-config";
import type { BillingPackageId } from "./types";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(ENV.RESEND_API_KEY());
  }
  return resendClient;
}

export async function sendPaymentRequestEmail(input: {
  to: string;
  firstName?: string | null;
  packageId: BillingPackageId;
  checkoutUrl: string;
  language?: string;
}): Promise<void> {
  const pkg = getPackageConfig(input.packageId);
  const greetingName = input.firstName?.trim() || "there";
  const isSpanish = input.language === "es";
  const cadence =
    pkg.mode === "subscription"
      ? isSpanish
        ? `${amountToDollars(pkg.amountCents)} semanal por ${pkg.totalIterations} semanas`
        : `${amountToDollars(pkg.amountCents)} weekly for ${pkg.totalIterations} weeks`
      : amountToDollars(pkg.amountCents);

  const subject = isSpanish
    ? `Tu enlace de pago para ${pkg.displayName}`
    : `Your payment link for ${pkg.displayName}`;

  const text = isSpanish
    ? [
        `Hola ${greetingName},`,
        "",
        `Gracias por reservar tu sesión de ${pkg.displayName}.`,
        `Tu inversión: ${cadence}.`,
        "",
        "Completa tu pago de forma segura aquí:",
        input.checkoutUrl,
        "",
        `Si tienes preguntas, responde a este correo o escribe a ${ENV.BILLING_SUPPORT_EMAIL()}.`,
      ].join("\n")
    : [
        `Hi ${greetingName},`,
        "",
        `Thanks for booking your ${pkg.displayName}.`,
        `Your investment: ${cadence}.`,
        "",
        "Complete your secure payment here:",
        input.checkoutUrl,
        "",
        `If you have questions, reply to this email or contact ${ENV.BILLING_SUPPORT_EMAIL()}.`,
      ].join("\n");

  await getResend().emails.send({
    from: ENV.BILLING_FROM_EMAIL(),
    to: input.to,
    subject,
    text,
  });
}

export async function sendPortalLinkEmail(input: {
  to: string;
  firstName?: string | null;
  portalUrl: string;
  language?: string;
}): Promise<void> {
  const greetingName = input.firstName?.trim() || "there";
  const isSpanish = input.language === "es";
  const subject = isSpanish ? "Administra tus pagos" : "Manage your billing";

  const text = isSpanish
    ? [
        `Hola ${greetingName},`,
        "",
        "Aquí está tu enlace seguro para administrar pagos, facturas y método de pago:",
        input.portalUrl,
        "",
        `Si no solicitaste este enlace, contáctanos en ${ENV.BILLING_SUPPORT_EMAIL()}.`,
      ].join("\n")
    : [
        `Hi ${greetingName},`,
        "",
        "Here is your secure link to manage payment methods, invoices, and subscription settings:",
        input.portalUrl,
        "",
        `If you did not request this link, contact us at ${ENV.BILLING_SUPPORT_EMAIL()}.`,
      ].join("\n");

  await getResend().emails.send({
    from: ENV.BILLING_FROM_EMAIL(),
    to: input.to,
    subject,
    text,
  });
}

export async function sendBillingUpdateEmail(input: {
  to: string;
  firstName?: string | null;
  subject: string;
  body: string;
}): Promise<void> {
  await getResend().emails.send({
    from: ENV.BILLING_FROM_EMAIL(),
    to: input.to,
    subject: input.subject,
    text: input.body,
  });
}
