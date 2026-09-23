# HRToolkit-India Project Log

## Approved architecture
- Supabase/Postgres with the existing server-side REST approach.
- RLS enabled on all application tables; service-role access remains server-only.
- Next.js 15; continue auditing/fixing the existing codebase.
- Manual UPI is the active payment adapter. Future gateways must implement the adapter boundary.
- AI generation starts immediately after PAYMENT_SUBMITTED with a valid, unique UTR.
- Product delivery is impossible until an explicit admin confirmation.
- “Usually within 1 hour” is a target. Admin is alerted after 60 minutes.
- Customer revision = a post-delivery change request; QA auto-regeneration does not consume revisions; maximum 2 customer revisions.
- Refund exceptions: duplicate payment for the same order or failure to deliver. Legal copy requires lawyer review.
- Sample uploads and payment screenshots are scheduled for deletion 30 days after delivery. Order/payment records follow applicable Indian tax/accounting retention requirements.
- Public order ID and secret customer access token are separate.
- One Git push per phase after local gates when the execution environment permits.

## Phase 1 audit result
### Keep
Next.js 15.5.9, App Router, existing server-side Supabase helper, Zoho SMTP helper, Vercel Blob/QStash dependencies, existing public/admin/legal UI as the base for later phases, existing initial database migration and 15-template seed.

### Fixed in this phase
- Removed legacy Razorpay routes in the existing Phase 1 foundation commit.
- Added manual-UPI payment adapter boundary.
- Added RLS to all application tables.
- Added unique UTR protection and idempotency foundation.
- Added customer access-token hash.
- Added AI run/cost tracking.
- Added single-active-builder protection.
- Added 30-day file retention timestamps.
- Added single-use admin action-token storage.
- Added foundation audit documentation and project log.

### Deferred
- Phase 3 customer access-token implementation and sample-file upload.
- Phase 4 payment submission/rate limiting.
- Phase 5 QStash + AI builder and deterministic generators.
- Phase 6 independent QA + signed admin emails.
- Phase 7 delivery/revisions.
- Phase 8 admin command centre.
- Phase 9 security headers/E2E.
- Phase 10 production deployment.
- Phase 11 operations agents.

## Verification note
The execution environment cannot install the repository dependencies because outbound package-network access is unavailable. Therefore I will not claim a local npm build passed. Foundation/static checks can be run here; the repository's CI/Vercel build remains the authoritative full build gate until dependencies are available locally.

## External blocker
Vercel has recently reported deployment build-rate limiting. This is separate from application source correctness.
