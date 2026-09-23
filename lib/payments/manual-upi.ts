import type { PaymentAdapter } from "./types";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server configuration: ${name}`);
  return value;
}

export const manualUpiAdapter: PaymentAdapter = {
  id: "manual-upi",

  createPaymentRequest({ orderId, amountInr, payeeName, paymentAddress }) {
    if (!Number.isFinite(amountInr) || amountInr <= 0) {
      throw new Error("Payment amount must be a positive number.");
    }

    const deepLink =
      "upi://pay?" +
      new URLSearchParams({
        pa: paymentAddress,
        pn: payeeName,
        am: amountInr.toFixed(2),
        cu: "INR",
        tn: orderId,
      }).toString();

    return {
      method: "upi",
      amountInr,
      reference: orderId,
      deepLink,
    };
  },
};

export function createManualUpiPayment(orderId: string, amountInr: number) {
  return manualUpiAdapter.createPaymentRequest({
    orderId,
    amountInr,
    payeeName: requiredEnv("UPI_PAYEE_NAME"),
    paymentAddress: requiredEnv("UPI_ID"),
  });
}
