# HRToolkit India — Design System v1.0

## Brand principles
- Trust first: transparent pricing, clear payment states and visible policies.
- Professional B2B: restrained visual hierarchy, strong whitespace and readable data.
- Fast comprehension: users should understand product, platform, price and next action quickly.
- Mobile-first: checkout and payment must work comfortably on a phone.
- Accessible by default: keyboard navigation, visible focus, labels, sufficient contrast and reduced-motion support.

## Colours
- Ink: #101828
- Muted text: #667085
- Primary: #3156D9
- Primary dark: #2445B7
- Surface: #FFFFFF
- Canvas: #F6F8FC
- Border: #E4E7EC
- Success: #087443
- Warning: #B54708
- Danger: #B42318
- Dark surface: #0B1220
- Dark secondary: #152238

Do not introduce arbitrary brand colours without updating this file.

## Typography
- Primary: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif.
- Display: same family; use weight and spacing rather than decorative fonts.
- Body: 14–17px depending on context.
- Small metadata: 11–13px.
- Headings: tight line-height and negative letter-spacing.

## Spacing
Use a 4px base:
- 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px.

## Radius
- Small controls: 8–10px
- Cards: 12–16px
- Hero/premium panels: 18–24px
- Pills: 999px

## Buttons
Primary:
- Background Primary
- White text
- 10–12px radius
- 12px vertical / 16px horizontal minimum
- Disabled opacity ~45%
- Visible keyboard focus ring

Secondary:
- White/surface background
- Border
- Ink text

Danger:
- Use only for destructive/admin actions.
- Never style a payment action as destructive unless it truly is.

## Cards
- Surface background
- 1px Border
- 12–16px radius
- Minimal shadow
- Hover movement only where it communicates interactivity

## Forms
- Every input has a visible label.
- Errors appear next to the affected field and in a summary when needed.
- Never rely on colour alone.
- Required fields use text/semantic required state.
- File controls state accepted types and maximum size.

## Layout
- Content max width: 1160px.
- Mobile horizontal padding: 11–16px.
- Desktop section padding: 64–80px.
- Prefer 1–2 strong columns over dense dashboards on marketing pages.

## Motion
- Keep transitions 150–220ms.
- Respect prefers-reduced-motion.
- No decorative animation that delays checkout.

## Product UI rules
Always show:
1. What the customer gets.
2. Platform compatibility.
3. Price.
4. Revision limit.
5. Refund rule.
6. Expected delivery target: usually within 1 hour after payment submission/verification workflow, without presenting it as a guarantee.
7. The next action.

## Accessibility baseline
- WCAG 2.2 AA is the design target.
- Minimum visible focus treatment.
- Semantic headings.
- Form labels.
- Keyboard usable controls.
- Descriptive link/button text.
- Images require useful alt text or empty alt for decorative imagery.
