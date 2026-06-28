function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  STRIPE_SECRET_KEY: () => requireEnv("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: () => requireEnv("STRIPE_WEBHOOK_SECRET"),
  CALENDLY_WEBHOOK_SIGNING_KEY: () => requireEnv("CALENDLY_WEBHOOK_SIGNING_KEY"),
  RESEND_API_KEY: () => requireEnv("RESEND_API_KEY"),
  BILLING_FROM_EMAIL: () => requireEnv("BILLING_FROM_EMAIL"),
  BILLING_SUPPORT_EMAIL: () => requireEnv("BILLING_SUPPORT_EMAIL"),
  CONTACT_RECIPIENT: () => process.env.CONTACT_RECIPIENT || "change180life@gmail.com",
  SITE_BASE_URL: () => process.env.SITE_BASE_URL || "http://localhost:8080",
  PORTAL_RETURN_URL: () => process.env.STRIPE_PORTAL_RETURN_URL || process.env.SITE_BASE_URL || "http://localhost:8080",
};
