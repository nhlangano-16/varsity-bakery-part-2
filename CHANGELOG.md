# Changelog

All notable changes to the Varsity Bakery website project (WEDE5020) are documented below.

## [Part 3 - Final POE Submission] - 2026-11-17
### Added
- **Repository Root Restructure:** Flattened nested project directories so index.html, README.md, CHANGELOG.md, obots.txt, and sitemap.xml reside directly at the repository root for grading and deployment compatibility.
- **Interactive Gallery Lightbox:** Added Previous/Next slide controls, slide counter (1 / 3), keyboard arrow navigation, Escape closing, and focus trapping in gallery.html and js/script.js.
- **Dynamic Product Filtering & Search:** Enhanced products.html and js/script.js with category filter pills (Morning, Light Meals, Bakery & Deli, Hot Grill, Extras & Drinks), real-time keyword search across titles and descriptions, and A–Z / Z–A sorting.
- **Page-Specific SEO Optimization:** Tailored unique <meta name="keywords">, <meta name="description">, and descriptive lt text attributes across all pages (index.html, bout.html, products.html, gallery.html, nquiry.html, contact.html).
- **Interactive Leaflet Map:** Configured custom store marker popup and styled 1.8 km delivery service radius overlay in contact.html.
- **Form Validation & Email Preparation:** Implemented client-side validation with accessible inline error messages (ria-invalid), Netlify Forms AJAX submission, and dynamic mailto: email preparation.

### Fixed
- Removed duplicate HTML markup accidentally appended to nquiry.html.
- Fixed universal box-sizing selector (*) in css/style.css.

## [Part 2 - CSS Styling & Responsive Layout] - 2026-10-15
### Added
- External stylesheet (css/style.css) with CSS custom properties (--brown, --cream, --accent), reset rules, and typography hierarchy.
- CSS Grid and Flexbox layouts for hero sections, product cards, gallery grids, and contact location cards.
- Responsive breakpoints for desktop (>900px), tablet (<=900px), and mobile (<=600px), plus responsive <picture> and srcset assets.

## [Part 1 - HTML Structure & Content Foundation] - 2026-09-01
### Added
- Initial semantic HTML5 structure across index.html, bout.html, products.html, gallery.html, nquiry.html, and contact.html.
- Organized asset directories (css/, js/, images/) and created original SVG bakery prototype graphics.
