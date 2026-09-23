# HRToolkit India

HRToolkit India is a custom digital-product storefront for HR, Sales, Finance, Inventory, Project and Operations dashboards/templates.

## Architecture baseline

- Next.js 15 + TypeScript
- Existing UI styling retained; canonical rules live in design-system.md
- Supabase/Postgres
- Supabase service-role access is server-only
- Row Level Security is enabled on all application tables
- Vercel Blob for private files
- Upstash QStash for asynchronous jobs
- OpenRouter for structured AI planning/review
- Zoho SMTP for transactional email
- Manual UPI payment adapter; gateway adapters can be added later
- Vercel deployment through GitHub

## Customer flow

Browse → choose template/platform → submit requirements and consent → create PENDING_PAYMENT order → pay by UPI → submit valid, unique UTR → PAYMENT_SUBMITTED → AI generation starts asynchronously → QA → AWAITING_ADMIN_CONFIRMATION → admin confirms payment → delivery.

**Nothing is delivered without explicit admin confirmation.**

AI generation normally starts after a payment proof submission. “Usually within 1 hour” is a target, not a guarantee. The admin is alerted when generation has not completed within 60 minutes.

Customer revisions are change requests made after delivery. QA auto-regeneration loops do not consume revision credits. A customer may submit at most two revisions.

## Refund rule

No refunds after purchase except:
1. Duplicate payment for the same order.
2. HRToolkit India fails to deliver the purchased product.

The legal text is a template and must be reviewed by a qualified Indian lawyer before launch.

## Data retention

Customer sample uploads and payment screenshots are scheduled for deletion 30 days after delivery. Order/payment records are retained for periods required by applicable Indian tax and accounting requirements. The privacy policy should document the exact operational retention schedule and deletion workflow.

## Payment adapter

Payment logic lives behind lib/payments/types.ts. Manual UPI is the active adapter. No Razorpay routes are retained in this architecture. A future gateway can implement the same adapter boundary without changing order business logic.

## Development gates

Before each phase is pushed:

    npm install
    npm run typecheck
    npm run test
    npm run build

Only one Git push should be made per phase after the local gates pass.

## Database

Apply the migration:

    supabase db push

Seed templates after the migration:

    supabase db seed

If using the Supabase dashboard SQL editor, run supabase/migrations/001_initial.sql, then supabase/seed.sql.

## Environment

Copy .env.example to .env.local and fill server-only secrets locally. Never commit .env.local, service-role keys, SMTP passwords or AI keys.

## Design

The canonical design rules live in design-system.md.

Legal copy is a template and is not legal advice or a legal certification of DPDP compliance.
