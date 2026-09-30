# V2Fashion — Design Spec (Rani Pink)

Reference for implementing the Astro storefront to match the approved mockups.
Live mockups: https://claude.ai/artifact/YLPMEHkNJ8EkRENw81Yds1 (canvas view — 9 pages).
Static reference pages: `design/*.html` (open directly in a browser — pixel-accurate copies of the mockups; view-source for exact markup/classes, including the CSS hover states described below).

## Colour tokens

Add these as Tailwind theme colors (e.g. `primary`, `accent`, etc.) so components reference names, not hex.

| Token | Hex | Use |
|---|---|---|
| `primary` | `#A3245B` | Buttons, links, active states, price — the one brand accent, used everywhere including the Men section |
| `accent` | `#D4A24C` | Badges, borders, small highlights, active-nav underline (Women/Kids/Jewellery) |
| `accentOnDark` | `#EAC173` | Accent text/icons on dark backgrounds (footer, hero) |
| `bg` | `#FFFFFF` | Page background — neutral white throughout the site (Myntra/Nykaa/Ajio style); no per-category re-skinning of the page background |
| `surface` | `#FFFFFF` | Cards, header, inputs |
| `ink` | `#2B1620` | Primary text |
| `muted` | `#6C5660` | Secondary text |
| `soft` | `#F9E6EC` | Subtle pink fills — badges/hover backgrounds, and the light intro band under the header on Women/Kids/Jewellery category pages |
| `line` | `#F0DDDF` | Borders/dividers |
| `footerBg` | `#4A0F28` | Footer background |
| `footerInk` | `#FBEFF3` | Footer text |
| `footerMuted` | `#DCC0CB` | Footer secondary text |
| `heroA` / `heroB` | `#8E1F50` / `#AC2F66` | Home hero gradient |
| `menAccent` | `#B23A3A` | **Men-only.** Light red used for the "Men" nav link's active/hover underline, in place of the pink `accent` used for other categories |
| `menSoft` | `#FBE3E0` | **Men-only.** Light red used for the intro band under the header on Men category pages, in place of `soft` |

## Typography

- **Display / headings / logo:** "Cormorant Garamond", weights 500/600/700 (serif, elegant — used for H1/H2 and the wordmark).
- **Body / UI / buttons / nav:** "Jost", weights 400/500/600 (clean sans — everything else).
- Load both via Google Fonts:
  `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@400;500;600&display=swap`

## The one deliberate per-category accent: Men

Everything on the site — background, buttons, badges, prices, footer, the logo — stays Rani Pink, for every category including Men. There is exactly **one** exception, demonstrated on the `Shop-Men.dc.html` / `design/shop-men.html` mockup (Men → Kurtas listing):

1. **Header nav underline/hover colour.** Each top-nav link gets a 2px underline on hover and on the active page. For Women, Kids, Jewellery and "Festive edit" this underline (and the active-page text colour) is the pink `accent` (`#D4A24C`)/`primary`. For **Men only**, the underline and active/hover text colour is `menAccent` (`#B23A3A`, a light shade of red) instead.
2. **The light intro band right under the header** (breadcrumb + page title + quick sub-category pills, e.g. "Sarees" or "Kurtas") uses `soft` (light pink) on Women/Kids/Jewellery pages, and `menSoft` (light red) on Men pages.

Everything else on the Men page — H1 text colour, "Ready to ship"/"New" badges, filter accents, price colour, buttons, footer — stays exactly the same pink `primary`/`accent` as the Women/Kids/Jewellery pages. Only those two elements switch to the red tint.

Implementation note: build this as a `category` prop/variant on the shared page-header and category-listing layout (`category: 'women' | 'men' | 'kids' | 'jewellery'`), where only `menAccent`/`menSoft` swap in for `accent`/`soft` in those two spots when `category === 'men'`. Don't build a second full theme — it's a two-token override, not a re-skin.

CSS reference (see the `<style>` block in any of the shared-header mockups): nav links use classes `cat` (pink hover/active) or `cat-men` (red hover/active) inside a `.v2-nav` wrapper, e.g.:
```css
.v2-nav a.cat:hover, .v2-nav a.cat[aria-current] { color: #A3245B; border-bottom-color: #D4A24C; }
.v2-nav a.cat-men:hover, .v2-nav a.cat-men[aria-current] { color: #B23A3A; border-bottom-color: #B23A3A; }
```

## Pages covered

1. **Home** (`design/home.html`) — header/nav, hero with gradient background + CTA, trust strip (4 icons: UPI payment, 24h delivery-date confirmation, 7-day exchange, ready-to-ship), "Shop by category" 4-card grid (Women/Men/Kids/Jewellery), "Festive favourites" 4-product grid (₹ price, ready-to-ship/new badges, wishlist icon), dark footer (brand blurb + Shop/Help/Policies/Follow-us columns + socials).
2. **Shop / Sarees listing (Women)** (`design/shop-sarees.html`) — same header/footer, pink intro band, breadcrumb + H1 + sub-category quick links, 2-column layout: filters sidebar (ready-to-ship checkbox, price ranges, fabric pills, colour swatches, occasion checkboxes, blouse-size buttons) + product grid (active-filter chips, sort dropdown, 6 cards with fabric/name/price/shipping time, pagination).
3. **Shop / Kurtas listing (Men)** (`design/shop-men.html`) — identical structure to the Sarees page, but: "Men" is the active/hover nav item in `menAccent` red, the intro band is `menSoft` light red, quick links are Kurtas/Sherwanis/Nehru jackets/Bandhgalas, the size filter is letter sizes (S–XXL) instead of blouse sizes, and the product grid shows men's kurtas/sherwanis/jackets. Everything else (badges, buttons, price colour, filters styling, footer) is unchanged pink.
4. **Search results** (`design/search.html`) — same header but with the search input expanded/focused in place of the nav links, "Results for ‹query›" + result count, sort dropdown, same product grid as Shop (no filters sidebar — keep it simpler than the category page).
5. **Wishlist** (`design/wishlist.html`) — same header/footer, breadcrumb + "My Wishlist (n items)" heading, product grid reusing the Home/Shop product card, with the wishlist heart replaced by a filled "remove" heart and a "Move to cart" button under each card.
6. **Cart** (`design/cart.html`) — same header (cart icon count matches item count) + footer, "Shopping Cart (n items)" heading, 2-column layout: left = stacked cart rows (thumbnail, name, variant, quantity stepper, price, remove ×), right = sticky order-summary card (promo code field, subtotal, free delivery, total, "Proceed to checkout" button, secure-payment note).
7. **My Account / Profile** (`design/profile.html`) — same header/footer, breadcrumb + "My Account", 2-column: left = account sidebar nav (Profile details [active] / My orders / Addresses / Wishlist / divider / Log out), right = "Profile details" card (name/phone/email fields + Save button) and a "Recent orders" card (order id, date, item count, status pill, total — reuse this row pattern for the full order-history page later).
8. **Log in** (`design/login.html`) — minimal centered header (logo only, no nav/icons), centered auth card: "Continue with Google" button, divider, email-or-phone field, "Send one-time code" button, note that no password is needed, link to Sign up. No full footer, just a one-line copyright bar.
9. **Sign up** (`design/signup.html`) — same auth-card layout as Log in, with a "Full name" field added above email/phone, CTA "Create account", link back to Log in, terms/privacy line instead of the copyright bar.

Pages 1–7 share the same header, footer, product-card and badge components — build those once and reuse across Women/Men/Kids/Jewellery category pages, Search, Wishlist and Cart. Pages 8–9 share a lighter auth-card component (no header nav, no footer columns) that can also serve future flows like "forgot code" or admin login (admin gets its own separate `/admin/login` route per CLAUDE.md — do not reuse the customer auth card there, just the visual style if useful).

## Notes for implementation

- Treat the static HTML files as ground truth for spacing, structure and copy tone — build Astro components/Tailwind classes to match them, not from scratch.
- Product photos in the mockups are placeholders (striped blocks) — swap for real photography; keep the same aspect ratios (roughly 3:4 for product cards, wide for hero/category banners).
- Badges: "Ready to ship" (accent-colored pill), "New" (primary-colored pill) — small caps, Jost 500.
- Buttons: primary filled (bg `primary`, text white) for main CTAs; outline/ghost variant (border `primary`, text `primary`) for secondary actions.
- Auth pages use Supabase Auth (per CLAUDE.md): Google OAuth or email/phone OTP — there is no password field anywhere in the customer flow, by design.
- Cart/Wishlist quantities and prices shown are static placeholder data — wire them to real cart/wishlist state; the layout and interaction points (stepper, remove, move-to-cart, promo code) are the spec.
- See "The one deliberate per-category accent: Men" above before building the category/nav components — it's the only place colour varies by category.
