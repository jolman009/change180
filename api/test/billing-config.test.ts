// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getPackageConfig, getPackageFromEventType } from "../_lib/billing-config.js";

describe("billing config", () => {
  it("returns weekly installment settings for program packages", () => {
    const clarity = getPackageConfig("clarity");
    const rooted = getPackageConfig("rooted");
    const flourish = getPackageConfig("flourish");

    expect(clarity.mode).toBe("subscription");
    expect(clarity.amountCents).toBe(7500);
    expect(clarity.totalIterations).toBe(4);

    expect(rooted.totalIterations).toBe(8);
    expect(flourish.amountCents).toBe(10000);
    expect(flourish.totalIterations).toBe(12);
  });

  it("maps calendly event type names to package ids", () => {
    expect(getPackageFromEventType(null, "Discovery Session")).toBe("discovery");
    expect(getPackageFromEventType(null, "Family Coaching")).toBe("family");
    expect(getPackageFromEventType(null, "Clarity Package")).toBe("clarity");
    expect(getPackageFromEventType(null, "Rooted and Renewed")).toBe("rooted");
    expect(getPackageFromEventType(null, "Flourish Forward")).toBe("flourish");
    expect(getPackageFromEventType(null, "Unknown Session")).toBeNull();
  });
});
