# HRToolKit India

HRToolKit India is a practical HR/payroll/compliance digital-product storefront.

## Website
- Static storefront: `index.html`
- Interactive demo dashboard: `/demo-dashboard.html`
- Contact: teamwork.hrsolution@zohomail.in

## Current demo behaviour
The storefront includes:
- Responsive mobile/tablet/desktop design
- HR digital product catalogue
- Order/service enquiry modal
- Email-based order request flow
- Free salary take-home estimator
- HR services section
- Interactive dashboard entry point
- FAQ and privacy-by-design section
- Local order draft in browser storage

## Production payment note
Razorpay is **not claimed as live** in this static demo. Production payments should use a server-side order-creation, signature-verification and webhook flow. Never put Razorpay secrets, SMTP passwords or database credentials in frontend/GitHub Pages code.

## Privacy note
The site copy is designed to support applicable DPDP requirements by design; it is not a legal certification. Obtain legal review before making a formal compliance claim.

## Deployment
For GitHub Pages, publish the repository root and ensure `index.html` is the Pages entry file. The static demo does not require a build step.
