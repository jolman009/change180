export type BillingPackageId = "discovery" | "family" | "clarity" | "rooted" | "flourish";

export function buildCalendlyPrefill(packageId?: BillingPackageId) {
  if (!packageId) return undefined;

  return {
    customAnswers: {
      a1: packageId,
    },
  };
}
