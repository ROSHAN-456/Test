# Imperium — GitHub Pages Deploy

A static React + Vite build of your single-file app, ready for GitHub Pages.

## Deploy in 5 steps

1. On github.com → **New repository** → name it (e.g. `imperium`) → **Public** → Create.
2. Unzip this folder locally.
3. On the new repo's page, click **uploading an existing file**, drag **all** files (including the hidden `.github/` folder), and Commit to `main`.
4. Repo → **Settings → Pages** → under **Build and deployment**, set **Source: GitHub Actions**.
5. The included workflow runs automatically. When it finishes (Actions tab → green check), your site is live at:
   `https://<your-username>.github.io/<repo-name>/`

No Personal Access Token needed — the workflow uses GitHub's built-in token.

## Local dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```
