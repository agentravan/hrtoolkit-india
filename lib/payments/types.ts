export type PaymentAdapter = {
  readonly id: string;
  createPaymentRequest(input: {
    orderId: string;
    amountInr: number;
    payeeName: string;
    paymentAddress: string;
  }): {
    method: "upi";
    amountInr: number;
    reference: string;
    deepLink: string;
  };
};

export type PaymentSubmission = {
  orderId: string;
  utr: string;
  screenshotUrl?: string;
};

export type PaymentVerificationAction = "DELIVER" | "NOT_RECEIVED";
