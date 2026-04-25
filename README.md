# Pro S; — As Smart As Simple

The official website for **Pro S;** — a Damascus-based technology company delivering enterprise software, IT infrastructure, and data analytics solutions.

🌐 **Live:** https://kusaisssd.github.io/ProS-website/ *(or `https://<username>.github.io/<repo>/` on GitHub Pages)*

## Pages

| Page | Description | Lang |
|---|---|---|
| `index.html` | Main landing — services, AI, products, team, partners, contact | EN |
| `ai-solutions.html` | **AI Solutions** — custom AI catalog, industries, process, tech stack, security, FAQ | EN |
| `ai-solutions-ar.html` | **حلول الذكاء الاصطناعي** — نسخة عربية كاملة من صفحة AI Solutions | AR |
| `smart-archiving-system-Tech_Details.html` | Smart Archiving System — full technical proposal | AR |
| `ProS_HR_Technical_Proposal.html` | Simple HR System — full technical proposal | AR |
| `camera-planner.html` | Camera Planner — engineering platform details | AR |
| `tower-landing-en.html` | Tower of Knowledge — educational game landing | EN |

## Stack

Pure static site — no build step, no dependencies.

- **HTML5** with semantic markup, JSON-LD structured data, OG tags, canonical URLs
- **CSS3** with CSS variables (light/dark theme)
- **Vanilla JavaScript** (~140 lines, in `assets/main.js` — also injects header/footer)
- **Google Fonts**: Outfit, Fraunces, Noto Sans Arabic, JetBrains Mono

## Project structure

```
.
├── index.html
├── ai-solutions.html                       # AI services page (English)
├── ai-solutions-ar.html                    # AI services page (Arabic, RTL)
├── camera-planner.html
├── ProS_HR_Technical_Proposal.html
├── smart-archiving-system-Tech_Details.html
├── tower-landing-en.html
├── assets/
│   ├── styles.css      # shared base styles
│   ├── main.js         # injects unified nav/footer + theme/scroll/reveal
│   └── favicon.svg
├── sitemap.xml         # SEO — list of all pages
├── robots.txt          # SEO — crawl directives
├── .nojekyll           # disables Jekyll on GitHub Pages
├── .gitignore
└── README.md
```

## How the unified header/footer works

Each HTML page declares its layout type via two `<body>` attributes:

```html
<body data-layout="home" data-page="home">    <!-- index only -->
<body data-layout="sub"  data-page="hr">      <!-- product pages: hr | archiving | camera | tower -->
```

And reserves two empty mount points:

```html
<nav id="nav" aria-label="Main navigation"></nav>
...
<footer id="ft" aria-label="Site footer"></footer>
```

`assets/main.js` reads `data-layout` and `<html lang>` and renders the right header & footer (English or Arabic, home or sub-page). **Change the markup in `main.js` once → all 5 pages update.**

## Bilingual AI page

The AI Solutions page is published in both **English** and **Arabic** as separate URLs (best for SEO):

- `ai-solutions.html` — `<html lang="en" dir="ltr">`
- `ai-solutions-ar.html` — `<html lang="ar" dir="rtl">`

The pages are linked together with `<link rel="alternate" hreflang="...">` tags so search engines serve the right version per user language.

A **language toggle button** (`عربي` ↔ `EN`) appears in the nav-bar automatically — but only on pages that declare an alternate-language version via:

```html
<body data-layout="sub" data-page="ai" data-alt-lang-href="ai-solutions-ar.html">
```

`assets/main.js` reads `data-alt-lang-href`. If present, it injects the toggle. If absent (e.g. on product pages with no translation), no button shows.

The "AI" link in the header & footer is also language-aware: Arabic visitors browsing AR pages are sent to `ai-solutions-ar.html`; English visitors to `ai-solutions.html`.

## Floating WhatsApp button

A green WhatsApp button is automatically injected on every page (bottom-right on LTR pages, bottom-left on RTL pages). It opens WhatsApp pre-filled with a message tailored to:

- The page the visitor is on (`data-page` on body — `home`, `ai`, `archiving`, `hr`, `camera`, `tower`)
- The page language (`<html lang>` — Arabic or English versions of the message)

Both the phone number and the per-page messages live in the `renderWhatsApp()` function in `assets/main.js` — change once, applies everywhere.

To override the message for a specific page, add `data-wa-msg` to body:

```html
<body data-layout="sub" data-page="ai" data-wa-msg="Custom message for this specific page...">
```

**Phone number**: `+963 966 654 441` (configured as `963966654441` in `main.js`).

## SEO features

- ✅ Unique `<title>` and `<meta description>` per page (action-oriented, keyword-rich, &lt;160 chars)
- ✅ `<link rel="canonical">` on every page
- ✅ Open Graph + Twitter Card meta on every page
- ✅ JSON-LD structured data:
  - `Organization` + `WebSite` + `ItemList` on home
  - `Service` + `OfferCatalog` + `FAQPage` on AI Solutions
  - `SoftwareApplication` on Smart Archiving / Simple HR / Camera Planner
  - `VideoGame` on Tower of Knowledge
  - `BreadcrumbList` on every sub-page
- ✅ `sitemap.xml` and `robots.txt` in root
- ✅ Semantic HTML: `<main>`, `<nav>`, `<footer>`, `aria-label`, skip-link
- ✅ `<html lang>` + correct `dir` on RTL pages
- ✅ Mobile-friendly viewport, `theme-color` for browser chrome
- ✅ Performance: `preconnect` to Google Fonts, lightweight CSS/JS

## Deploy on GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit — Pro S; website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then go to **Settings → Pages → Source: `main` / `root` → Save**. Site is live within a minute.

The included `.nojekyll` tells GitHub Pages to skip Jekyll and serve files exactly as-is.

## ⚠️ Update the canonical URL

All canonical URLs, OG URLs, and JSON-LD `url` fields currently point to **`https://kusaisssd.github.io/ProS-website/`** (the placeholder).

**If you deploy elsewhere** (e.g. `https://kusaisssd.github.io/pros-website/`), find-and-replace `https://kusaisssd.github.io/ProS-website/` across these files:

- All 5 `*.html` files (canonical, og:url, JSON-LD `url` fields)
- `sitemap.xml`
- `robots.txt`

A quick sed command (run from project root in bash):

```bash
NEW_URL="https://kusaisssd.github.io/pros-website/"
grep -rl "https://kusaisssd.github.io/ProS-website/" --include="*.html" --include="*.xml" --include="*.txt" \
  | xargs sed -i "s|https://kusaisssd.github.io/ProS-website/|$NEW_URL|g"
```

## Customization

- **Brand color**: change `--ac` in `assets/styles.css` (currently `#0d9373`).
- **Header/footer text**: edit the `i18n` object in `assets/main.js` — applies to all pages.
- **Fonts**: edit `<link href="...fonts.googleapis.com/...">` in each page's `<head>`, then update `--f`/`--fd`/`--fm` in `styles.css`.
- **Partner logos**: place `Partner_1.jpg` … `Partner_5.jpg` inside `assets/` (the home page references them; missing images fall back to emoji placeholders automatically).

## Contact

- 📧 info@pro-sss.com
- 📱 +963 966 654 441
- 📍 Damascus, Syria
- 🌐 [Founder portfolio](https://kosayalassaf.github.io/)

---

© Pro S; — As Smart As Simple.
