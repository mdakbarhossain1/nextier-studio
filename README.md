# Nextier Studio — Premium V4 (HTML / CSS / JavaScript)

A fully static multi-page website for Nextier Studio. Built with native HTML, CSS and JavaScript — no bundler, framework or npm setup needed.

## Open locally

1. Extract the ZIP and open `index.html`, or run a static server in this directory:
   ```bash
   python -m http.server 8000
   ```
2. Visit `http://localhost:8000/` in your browser.

## Pages

- Homepage, About, Contact, Privacy
- Services overview, three main services, and 11 individual specialist service pages
- Work archive and three experience case-study pages
- Insights hub and four substantive educational articles

## Required before publishing

1. **Contact email:** replace every instance of `nextier.studio@gmail.com` with the inbox you actually own. It is a placeholder.
2. **EmailJS:** edit `assets/js/config.js` with your EmailJS **public key**, service ID and template ID. Create a template that uses `from_name`, `reply_to`, `company`, `service`, `budget`, and `message`. Use `reply_to` as the template's reply-to address. Until configured, the form opens the visitor's email application rather than claiming the message was sent. Enable EmailJS domain restriction and consider bot protection/rate limits. Never include a private key.
3. **Domain:** Replace `https://nextierstudio.com/` in HTML metadata, `robots.txt`, and `sitemap.xml` with the actual launch domain if different. The default is a placeholder; confirm ownership before launch.
4. **Portfolio permissions:** The featured projects may reflect work from previous employers or studios. Get permission to publish case-study details and replace all *illustrative* HTML mockups with approved screenshots. Do not claim outcomes, results, testimonials or independent agency ownership unless verified.
5. **Privacy:** `privacy.html` is draft informational text, **not** a reviewed legal privacy policy. Update it to match your actual form handling, EmailJS, analytics, audience and applicable laws.
6. **Tracking:** No GA4, GTM, Meta Pixel, Google Ads conversions or cookie consent tools have been installed. Add them after checking consent and privacy requirements.
7. **SEO:** SEO metadata, breadcrumbs, headings, internal links, BlogPosting / Service JSON-LD, `sitemap.xml`, `robots.txt`, OG image, semantic HTML and responsive CSS are included. Recheck canonical domain, indexability and Search Console after deploy; SEO setup does not guarantee search rankings.
8. **Copy:** Review service scope so it matches the expertise and contractor capacity you can deliver. Do not make unsupported revenue or performance claims.

## Design notes

- Original user-provided logo retained as `assets/img/nextier-logo-white.png` with only transparent outer margins cropped.
- Mobile-first visual hierarchy: headline and two CTAs appear **before** the showcase graphic in DOM and layout.
- Mobile menu uses animated grid rows; service dropdown is click/tap accessible.
- FAQ uses an accessible button and `grid-template-rows` animation with inert closed panels, and respects reduced-motion user preferences.
- Hero uses CSS and HTML browser mockups only, no large decorative glowing orb.
- Icons are crisp consistent inline SVGs, not emoji or font icons.
- Modern type with CSS fallback; Google Fonts is loaded at runtime if available. For strictly offline display, download and self-host fonts with suitable licenses.

## Structure

`assets/css/site.css` — all responsive styles and animations.
`assets/js/site.js` — nav, dropdown, scroll reveal, problem selector, FAQ, portfolio filters, contact handling.
`assets/js/config.js` — EmailJS placeholders.
`assets/img/` — logos, favicon and social preview.

## QA notes

Local syntactic validation and internal-link checks are performed. Complete visual checks in Chrome/Safari/Firefox and real mobile devices are still recommended prior to going live.
