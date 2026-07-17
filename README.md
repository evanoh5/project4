# Personal Portfolio

A static, dependency-free personal portfolio site: dark sidebar layout with
About, Experience, and Projects sections, and floating animated project cards.

## Running locally

No build step. Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Structure

- `index.html` — assembled page
- `css/` — `base.css` (tokens, layout, sidebar), `content.css` (about/experience), `projects.css` (project cards)
- `js/projects.js` — pointer-tilt enhancement for project cards (optional; page works without JS)
- `partials/` — source fragments the page was assembled from
- `assets/profile.jpg` — profile photo (see `assets/README.md`)
