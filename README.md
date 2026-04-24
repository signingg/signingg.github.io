# signingg.github.io

Personal website for Donald Tsang — CS @ RIT, focused on AI & Data.

## Deploying to GitHub Pages

This is a static site. To deploy as a root user site at `https://signingg.github.io`:

1. Create a repo named **`signingg.github.io`** on GitHub.
2. Push this project's contents to the `main` branch.
3. In the repo's **Settings → Pages**, set:
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
4. Wait ~1 minute. The site will be live at `https://signingg.github.io`.

No build step is needed — React + Babel are loaded from CDN and the JSX files are transpiled in-browser. If you'd rather ship pre-built JS, let me know and I can switch to a Vite build.

## File layout

```
index.html                  — entry point
data.js                     — all resume/project copy lives here
variations/
  shared.css, shared.jsx    — clip player, STAR story view, detail page
  v1.css, v1-raw-grid.jsx   — the Raw Grid design itself
media/
  signshop/*.mp4            — SignShop demo clips
  auctionhouse/*.mp4, .png  — Auction House demo clips + webhook still
```

## Editing

- **Resume content** — edit `data.js`. Sections mirror the resume 1:1 (education, experience, projects, skills).
- **Sample project clips / STAR writeups** — edit the `projects: [...]` array inside the Freelance experience entry in `data.js`.
- **Visual style** — `variations/v1.css`. Color variables live at the top of `.v1-root`.
