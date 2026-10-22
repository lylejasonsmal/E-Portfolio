# Lyle's Portfolio

A one-page portfolio in Vue 3 + Vite, built from WebTemplate's shell with RoomDashboard's header.

```sh
npm install
npm run dev      # http://localhost:6174
npm test
npm run deploy   # tests, builds, and pushes dist/ to the `deploy` branch
```

## Deploying to GitHub Pages

`npm run deploy` publishes `dist/` to the `deploy` branch with `gh-pages`, the same way RoomDashboard does. In the repository's **Settings → Pages**, set the source to **Deploy from a branch**, branch `deploy`, folder `/ (root)`.

`base` in `vite.config.js` is `./`, so the build works at `<user>.github.io/` or `<user>.github.io/<repository>/` without changes.

## Adding a section

Add an entry to `src/content/sections.js`. The header nav and the page both read from it.
