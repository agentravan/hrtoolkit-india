import { describe, expect, it } from "vitest";
import { orderSchema, paymentSchema, revisionSchema } from "../lib/backend";

describe("orderSchema", () => {
  const valid = {
    name: "Test Customer",
    contactNumber: "9876543210",
    email: "customer@example.com",
    deliveryEmail: "delivery@example.com",
    templateSlug: "hr-payroll-mis",
    platform: "excel" as const,
    requirements: "Build a monthly payroll dashboard with department and location filters.",
    consentRequired: true as const,
    consentOffers: false,
    consentRevisions: true as const,
    termsVersion: "2026-09-24",
  };

  it("accepts a valid order", () => {
    expect(orderSchema.parse(valid)).toMatchObject(valid);
  });

  it("rejects requirements shorter than 30 characters", () => {
    expect(() => orderSchema.parse({ ...valid, requirements: "too short" })).toThrow();
  });

  it("rejects missing required consent", () => {
    expect(() => orderSchema.parse({ ...valid, consentRequired: false })).toThrow();
  });

  it("rejects missing revision acknowledgement", () => {
    expect(() => orderSchema.parse({ ...valid, consentRevisions: false })).toThrow();
  });

  it("rejects an unsupported platform", () => {
    expect(() => orderSchema.parse({ ...valid, platform: "razorpay" })).toThrow();
  });
});

describe("paymentSchema", () => {
  it("accepts a valid UTR", () => {
    expect(paymentSchema.parse({
      orderId: "HRTK-ABCDEF1234567890",
      utr: "123456789012",
    })).toMatchObject({ utr: "123456789012" });
  });

  it("rejects malformed order IDs", () => {
    expect(() => paymentSchema.parse({
      orderId: "ORDER-123",
      utr: "123456",
    })).toThrow();
  });
});

describe("revisionSchema", () => {
  it("requires a meaningful revision request", () => {
    expect(() => revisionSchema.parse({
      orderId: "HRTK-ABCDEF1234567890",
      message: "Please change the monthly attrition chart.",
    })).not.toThrow();
  });

  it("rejects an empty revision request", () => {
    expect(() => revisionSchema.parse({
      orderId: "HRTK-ABCDEF1234567890",
      message: "change",
    })).toThrow();
  });
});
