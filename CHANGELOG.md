# Changelog - TheERFG Website

All notable changes to this project are documented here.

---

## [v0.2.0] - 2026-03-12
**Design refinement to match staging site**

Git commit: `df3afb3`
Git tag: `v0.2.0`

### Changed
- Replaced placeholder logo with actual TEG logo from B12 CDN
- Replaced hero placeholder with actual hero image from B12 CDN
- Overhauled CSS color palette: navy primary (#1B3A5C), blue accent (#3B82F6)
- Added glassmorphism header with backdrop blur
- Added gradient backgrounds to hero and services sections
- Improved card hover animations (translateY lift + shadow)
- Added connecting line between methodology steps
- Refined typography: tighter letter-spacing on headings, improved line-heights
- Better responsive breakpoints for services/results grids
- Footer logo inverted for dark background

### Known Issues
- Visual design does not yet exactly match the B12 staging site
- Formspree form ID placeholder still needs to be replaced (`YOUR_FORM_ID`)

---

## [v0.1.0] - 2026-03-12
**Initial website build**

Git commit: `d6c3553`
Git tag: `v0.1.0`

### Added
- `index.html` - Single-page site with all 9 sections:
  - Header/Nav with "Schedule a Call" CTA
  - Hero section with headline and two CTA buttons
  - Industries section ("Built for Real Operators") - 7 industry cards
  - Services section ("Your Outsourced Financial Operations") - 9 service cards
  - Methodology section ("Your Financial Operating System") - 4-step process
  - Testimonials section - 3 client quotes
  - Results section - 4 value proposition cards
  - Contact section with form (Name, Email, Company, Industry, Message)
  - Footer with nav columns and contact info
- `styles.css` - Full responsive styling with CSS custom properties
- `script.js` - Mobile menu toggle, scroll header shadow, form submission handler
- `assets/` directory for future local assets

### Infrastructure
- Git repository initialized
- Pushed to GitHub: github.com/zramsky/TheERFG-Website
- Connected to Cloudflare Pages (auto-deploy on push to main)
- Custom domain configured: theerfg.com

### Decisions
- **Plain HTML/CSS/JS** chosen over frameworks (Astro, Next.js) for simplicity
- **Formspree** chosen for contact form email delivery (no backend needed)
- **Cloudflare Pages** for hosting (free, fast, auto-deploy from GitHub)
- Content sourced from B12 staging site: https://the-engine-room-financial-group-staging.b12sites.com/
