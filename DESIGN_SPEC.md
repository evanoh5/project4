# Portfolio Design Spec (shared contract for all builders)

Static site, no build step. Final assembly: `index.html` links every CSS file in `css/` and every JS file in `js/`.

## Aesthetic reference
Dark, minimal portfolio: near-black page, fixed left sidebar with a rounded
profile photo on top, pill/rounded-rect nav buttons with hairline borders,
main content on the right with an oversized uppercase page title and a
pipe-separated subtitle. Generous vertical whitespace between sections.

## Design tokens (use these CSS custom properties, defined ONCE in css/base.css)
```css
:root {
  --bg: #0a0a0a;
  --bg-card: #111111;
  --border: #1f1f1f;
  --border-hover: #333333;
  --text: #f5f5f5;
  --text-muted: #9ca3af;
  --text-dim: #6b7280;
  --radius-lg: 20px;
  --radius-md: 14px;
  --sidebar-w: 360px;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```
Body: `background: var(--bg); color: var(--text); font-family: var(--font-sans);`

## Layout
- `.sidebar`: fixed, left, full height, width `var(--sidebar-w)`, padding 40px 32px, flex column; profile block top, nav middle, contact/email bottom.
- `.main`: `margin-left: var(--sidebar-w)`, max-width 1100px, padding 96px 64px.
- Mobile (<900px): sidebar becomes static full-width header stacked above main; main margin-left 0.

## Structure contract
Each builder writes HTML **partials** (fragments, no <html>/<head>/<body>)
into `partials/`, plus their own CSS/JS files. The orchestrator assembles
`index.html` as:

```
<div class="sidebar">   ← partials/sidebar.html content
<main class="main">
  ← partials/about.html      (section id="about")
  ← partials/experience.html (section id="experience")
  ← partials/projects.html   (section id="projects")
</main>
```

- Section headings: `<h2 class="section-title">` — 2rem, weight 600, margin-bottom 28px.
- Nav anchors: `#about`, `#experience`, `#projects` (smooth scroll via CSS `scroll-behavior`).
- Profile image: `assets/profile.jpg`, with an `onerror` inline-SVG fallback (neutral gray monogram) so the page never shows a broken image.

## File ownership (do NOT touch files owned by another builder)
- Builder A: `css/base.css`, `partials/sidebar.html`
- Builder B: `css/content.css`, `partials/about.html`, `partials/experience.html`
- Builder C: `css/projects.css`, `js/projects.js`, `partials/projects.html`
