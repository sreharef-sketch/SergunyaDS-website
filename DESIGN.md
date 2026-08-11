# Sergunya Dolls — Website Design Brief

## Status

Planning in progress. Decisions are recorded here as they are made.

## Source references

- `references/design.png` — full visual guideline
- `references/design-compressed.png` — compressed copy of the guideline
- `references/website-background.png` — page texture/background
- `references/item-background.png` — product-card background
- `references/modal-window-design.jpg` — product-modal layout guideline
- `references/SegunyaDS-logo.png` — supplied SergunyaDS monogram logo

## Visual direction (observed)

- Dark, textured, editorial presentation with warm off-white typography and red accents.
- Rounded, outlined content panels.
- A hero featuring a doll sculpture, large serif display type, restrained navigation, and social links.
- A grid-led STL files section with framed product cards.

## Confirmed scope

### Pages

- **Main page**: hero followed by a scrollable section titled **“STL dolls for self-printing.”**
- **Gallery**: a separate page.
- **Info**: a separate page.

### STL product grid

- Each card represents one printable STL doll and includes a representative image.
- Use a consistent, modestly cropped **3:4 portrait** image ratio for cards.
- Hovering a card slightly zooms its image.
- A detail panel rises in from the bottom on hover.
- The detail panel shows the doll name and price in USD.
- Clicking a card opens a product modal rather than navigating away.

### Product modal and purchase flow

- The modal contains a vertical preview-thumbnail slider and one large active model preview.
- It includes a compact detail card, the price, and a **Buy** button.
- On desktop, its layout follows the reference: thumbnail rail at left, large preview in the centre, and a right-hand information/action panel.
- Each **Buy** button redirects to that doll’s dedicated Patreon post, where the purchase/access journey continues.
- Product descriptions include the short overview, printable height/scale, included files/parts, and key assembly or printing notes.

### Gallery

- Purpose: showcase finished renders, printed/painted dolls, and work-in-progress imagery independently of the store.
- Images open in a simple lightbox.
- The gallery uses a responsive ArtStation-style masonry mosaic with deliberately mixed item aspect ratios.
- The layout is data-driven and reflows automatically when an image is added; no manual positioning per item.
- The layout may apply modest automatic cropping to form a dense mosaic; authors do not tune image ratios or tile placement.
- Display newest items first, with an optional `featured` flag to keep selected works prominent.
- Do not include Gallery categories, tags, or filter UI in the first release.
- Gallery lightboxes support an optional short caption and remain image-only when no caption is supplied.

## Content and publishing model

- The site will be statically hosted on **GitHub Pages**; no VPS or paid CMS is in scope.
- A repository `config.ini` is the source-of-truth database state for dolls, gallery entries, and their metadata.
- The Info-page copy and all external links also live in `config.ini`.
- The author maintains the site by adding/removing/editing entries in `config.ini` and adding the associated static image files in an asset folder.
- A rebuild publishes the updated static site to GitHub Pages.
- The author commits and pushes content changes to `main`; GitHub Actions automatically builds and deploys the site to GitHub Pages.

## Technical foundation

- Build with **Astro**, **TypeScript**, and CSS.
- Read `config.ini` at build time to generate static product and gallery content.
- Client-side JavaScript is limited to interactive components: product modal, preview selection, and Gallery lightbox.
- Launch on the default GitHub Pages `github.io` URL; defer custom-domain purchase and DNS configuration.
- Include basic SEO and social-sharing metadata: page titles/descriptions, a site-wide social-preview image, canonical URLs, and descriptive product/gallery image text.
- Do not include visitor analytics or tracking in the first release.

## Audience and language

- The intended audience is Western/international.
- All interface and editorial copy is English-only; multilingual support is out of scope.

## Brand

- Brand name: **SergunyaDS**.
- Use the supplied monogram logo (`references/SegunyaDS-logo.png`) as the primary mark.
- Use a dark-only visual system; do not provide a light-mode toggle.
- The visual language follows the references: textured dark ground, soft off-white typography, muted grey panels, narrow borders, and restrained red accents.
- Select and self-host an open-licensed serif display face close to the design reference, paired with a restrained sans-serif for UI text.

## Responsive behaviour

- Mobile is a first-class responsive layout, not a scaled-down desktop page.
- Navigation collapses for small screens.
- The STL grid becomes one or two columns depending on available width.
- The product modal stacks: prominent active preview first, then scrollable thumbnails and details.
- The Gallery uses a one-column masonry layout on narrow screens.

## Accessibility baseline

- Keep scope lightweight while supporting sensible essentials: semantic structure, keyboard-usable navigation and modal controls, visible focus states, `Escape` to close overlays, alt text supplied through `config.ini`, readable contrast, and reduced-motion support.

## Content contract (draft)

`config.ini` is organised into site, links, info, product, and gallery sections. Product entries provide an identifier, name, USD price, description, Patreon URL, cover image, preview-image list, and alt text. Gallery entries provide an identifier, image, alt text, date, optional featured flag, and optional caption.

The generated site reads the configuration at build time; static source images live under `src/assets/` (or `public/assets/` where transformation is not needed). Placeholder image paths are replaced with the final artist assets before launch.

## Implementation sequence

1. Scaffold the Astro/TypeScript static site and GitHub Pages deployment workflow.
2. Add the content parser, initial `config.ini`, static asset structure, and placeholders.
3. Build shared dark visual system, typography, header/footer, and responsive navigation.
4. Build Main: hero, scroll CTA, responsive 3:4 STL grid, and product-preview modal.
5. Build Gallery: automatically arranged dense masonry mosaic and caption-aware lightbox.
6. Build Info from config content and outbound Patreon, X, Discord, and email links.
7. Add metadata, keyboard/reduced-motion basics, responsive QA, and verify a push deploys successfully.

## Info page

- Concise artist introduction and BJD-design approach.
- Practical self-printing and assembly notes.
- Usage/licensing terms.
- Direct contact and community links: Patreon, X, Discord, and email.
- The page is deliberately compact and may evolve as the author clarifies its role.

## Navigation

- Top-level navigation: **Main**, **Gallery**, **Info**.
- The reference’s **COMM DOLLS** item is replaced by **Info** for this release.

## Main-page hero

- The primary CTA is **“Explore STL dolls”** and smoothly scrolls to the STL product grid.
- Gallery remains a secondary destination through navigation.

## Asset status

- Use clearly marked placeholders for the hero, product previews, and Gallery during initial implementation.
- The author will later supply real renders/photos; replacing placeholder assets is required before launch.

## Open decisions

- Gallery content and purpose.
- Final external URLs, editorial copy, and real artwork (required before public launch).
- Brand assets, copy, languages, and social/contact destinations.
- Technology, hosting, content-management, and responsive behaviour.
