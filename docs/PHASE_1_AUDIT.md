# Phase 1 Audit

| Severity | Issue | Where | Fix / status |
|---|---|---|---|
| High | Legacy Razorpay routes could conflict with manual-UPI business flow | app/api/create-order, app/api/payment/verify, app/api/razorpay/webhook | Removed in the existing Phase 1 foundation commit |
| High | UTR uniqueness was case-sensitive | orders.utr | Added case-insensitive unique index |
| High | Email action tokens had no durable single-use storage | database | Added action_tokens with expiry and used_at |
| High | Multiple Builder jobs could run concurrently for one order | ai_runs | Added partial unique index for active Builder runs |
| High | File retention dates were not stored | orders | Added sample/payment screenshot expiry timestamps |
| Medium | Consent booleans were not database-enforced | consents | Added CHECK constraints |
| Medium | Admin action values were unconstrained | orders | Added CHECK constraint |
| Medium | Payment/rate-limit enforcement is not yet complete | order/payment API | Phase 4 |
| Medium | Customer access token is stored in schema but not yet enforced by all customer routes | order/revision/status routes | Phase 3 |
| Medium | AI generation is still admin-triggered in application code | app/api/admin/generate | Phase 5 flow change |
| Medium | Email action token generation/confirmation UI is not implemented | admin email flow | Phase 6 |
| Low | Existing catalog helper may be stale | lib/catalog.ts | Safe cleanup candidate after reference audit |
| Low | Production build cannot be executed in this tool environment | tooling | Do not claim build passed; run npm audit locally/CI |

## Phase 1 exit condition
No known Critical issue remains in the Phase 1 foundation. High findings addressed at the schema/payment-architecture level. Medium findings are intentionally phase-scoped and must be closed before production.
