# OffshoreCV Redesign Plan

Pivoting from "editorial PDF store" to "modern SaaS offshore career platform" per the developer brief and the reference image. Cleaner, more professional, less book-selling.

## 1. Design system overhaul (`src/styles.css`)

Switch the palette to the brief's required colors:
- **Primary (Navy):** deep navy `oklch(0.22 0.06 260)` — used for hero background, header on scroll, primary surfaces
- **Accent (Gold/Yellow):** `oklch(0.82 0.16 85)` — CTAs, highlights, icon backgrounds
- **Surface:** clean white / very light gray
- **Text:** near-black on light, white on navy

Typography pivot:
- Drop the heavy italic Instrument Serif as the primary display font (it reads "book").
- New: **Space Grotesk** for headings (modern SaaS) + **Inter** for body. No italic display copy.

## 2. Header (`src/components/site/Header.tsx`)

Reference-style nav: solid white background, navy text, gold "Shop Now" / "Get Started" pill CTA on the right. Simpler — no gradient pill button, no rounded floating card. Logo: small navy anchor icon + "OffshoreCV" wordmark (CV in navy, no gradient).

New nav structure (matches brief sections):
`Home · Career Guides · Bundles · Training · CV Services · About · Contact` + gold `Shop Now` CTA.

## 3. Homepage rebuild (`src/routes/index.tsx`)

Sections in order, mirroring the reference image:

1. **Hero** — navy background, left: "Your Offshore Career Starts Here" + subtitle + gold `Browse Career Guides` and outline `View CV Services`. Right: worker-on-rig image.
2. **Feature row (4 cards)** — Professional Career Guides · Industry Expertise · Career Advancement · Trusted by Thousands. Gold line icons on navy strip.
3. **Explore Career Categories** — 6-up grid of category cards with images: Offshore Wind, Oil & Gas, Marine, Technical Trades, Lifting & Construction, Entry Level. Each links to a category page.
4. **Popular Bundles** — 3 product cards (Beginner / Wind / Technical Trades) with price + gold "View Bundle" button.
5. **Quality strip** — navy band: "High Quality. Practical. Results Driven." + Learn More.
6. **How It Works** — 4 numbered steps (Choose · Download · Learn & Apply · Get Hired).
7. **CTA section** — "Ready to Take the Next Step?" over rig backdrop with gold button.
8. **CV Services teaser** — "Need a CV that gets you hired?" with laptop image and gold CTA.

Remove the contact form, testimonials block, and "Engineer Your Next Deployment" italic hero — they belong to the old direction.

## 4. Tone & copy

Strip all "book", "ebook", "120 page", "PDF playbook" framing from the homepage hero and category copy. Reframe as **guides, resources, and CV services**. PDF format still mentioned on product detail pages only.

## 5. Out of scope (this pass)

- Recruiter dashboard, candidate profile system, auth — these are big platform features from the brief that need Lovable Cloud and their own milestones. I'll flag them as the next phase, not build them now.
- Inner pages (services, shop, guide, etc.) — restyled visually via the new tokens automatically, but their layouts stay as-is for this pass. We can polish them next round once the homepage direction is approved.

## Files touched

- `src/styles.css` — palette + fonts
- `src/components/site/Header.tsx` — new nav structure + clean style
- `src/routes/index.tsx` — full rebuild
- `src/components/site/Footer.tsx` — minor color/style cleanup to match
