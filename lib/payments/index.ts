import { manualUpiAdapter } from "./manual-upi";
import type { PaymentAdapter } from "./types";

export function getPaymentAdapter(): PaymentAdapter {
  const provider = process.env.PAYMENT_PROVIDER || "manual_upi";

  if (provider === "manual_upi") {
    return manualUpiAdapter;
  }

  throw new Error(`Unsupported payment provider: ${provider}`);
}
