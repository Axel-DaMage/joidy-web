# Contributing to joidy-web

Thanks for your interest in contributing. This is the marketing site and
documentation for [Joidy](https://github.com/Axel-DaMage/joidy).

## Development setup

```bash
git clone https://github.com/Axel-DaMage/joidy-web.git
cd joidy-web
npm ci
npm run dev
```

Requires Node.js `>=20.9.0` (see `.nvmrc`).

## Before opening a PR

Run the same checks CI enforces:

```bash
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run build       # next build
```

All three must pass.

## Conventions

- **Language:** issues, PRs, commits, and code comments in English.
- **Commits:** conventional commits (`feat:`, `fix:`, `docs:`, `chore:`, ...)
  with a short body explaining the *why*.
- **Style:** match the surrounding code — Tailwind utility classes, mono
  terminal aesthetic, single quotes in TS where already used.
- **i18n:** user-facing strings go through `src/i18n/en.json` +
  `src/i18n/es.json` (both must stay key-parallel — `Dict` enforces this
  at compile time). Keep both locales in sync.
- **Docs content** lives in `docs/*.mdx`; register new pages in
  `DOCS_INDEX` (see `src/app/docs/`).

## Reporting bugs

Open an issue with steps to reproduce, expected vs actual behavior, and
the browser/device if relevant.
