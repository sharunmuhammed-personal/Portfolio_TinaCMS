# Sharun E M — Cinematographer & Colorist Portfolio

Built with Eleventy (11ty) + TinaCMS. Deploys to Vercel from a Git repo.

## What changed from the Decap CMS version

This site now uses **TinaCMS** instead of Decap CMS. The big difference:
login is handled entirely by **TinaCloud** (Tina's own hosted service) —
no GitHub OAuth App, no separate proxy project to deploy or maintain.

## One-time setup: connect to TinaCloud

1. Push this whole project to your GitHub repo (same as before — replace
   everything in the repo with these files).
2. Go to **https://app.tina.io** and sign up / log in (GitHub login is easiest).
3. Click "Create new project" (or similar) and connect it to this GitHub repo.
4. Tina will show you a **Client ID** and generate a **Token** — copy both.
5. In Vercel, open this project → **Settings → Environment Variables**, and add:
   - `TINA_CLIENT_ID` — paste the Client ID
   - `TINA_TOKEN` — paste the Token
6. Trigger a new deploy (push any small change, or use Vercel's "Redeploy"
   button). The build will now succeed and generate the real Tina admin panel.
7. Visit `your-site.vercel.app/admin/index.html`, log in with the same
   account you used at app.tina.io, and you're editing.

That's it — no OAuth App, no callback URLs, no proxy project.

## Local development (optional — not required)

```
npm install
npm run dev
```

This starts a local preview at http://localhost:8080/admin/index.html —
useful only if you're comfortable with a terminal. Not required for normal
day-to-day editing, which happens on the live site's `/admin/index.html`.

## Structure

- `tina/config.ts` — defines what's editable: Work/Projects (title, date,
  categories, summary, cover image, body) and Site Settings (name, contact
  info, reel link, social links, work categories)
- `src/index.njk` — Home (hero reel, stills grid, selected work)
- `src/work.njk` — Work page with category filtering (Corporate & Brand /
  Cinematography / Color Grading, multi-tag — a project can belong to more
  than one)
- `src/about.njk` — About page (DOP + Colorist roles, experience timeline)
- `src/contact.njk` — Contact page (mailto CTA + contact list, no
  form/backend needed)
- `src/content/projects/` — one markdown file per project, edited via
  `/admin` or by hand
- `src/_data/site.json` — global site settings, also editable via `/admin`
- `src/admin/` — intentionally near-empty in this repo; TinaCMS generates
  the actual admin panel files here automatically on every build (that's
  why `.gitignore` inside this folder excludes `index.html` and `assets/`
  — those are rebuilt fresh each time, not something you edit directly)

## Adding real photos

Once logged into `/admin`, open any project entry and upload a cover image
directly — no code editing needed. Same for the Home page stills grid (edit
`src/index.njk` directly on GitHub for now, or ask for a Home-page image
field to be added to the Tina schema).

## Notes

- The Work category "Weddings & Events" was intentionally excluded per
  brief; projects use multi-tag categories instead of one-category-per-project.
- Contact form was intentionally simplified to a mailto link — no backend
  or third-party form service required.
- `tina/tina-lock.json` should stay committed to the repo — it's Tina's
  schema lock file, not a build artifact to ignore.
