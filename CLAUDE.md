# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Tauhidul Islam's personal website, hosted on GitHub Pages at the custom domain
`mdtauhidulislam.com` (see `CNAME`). It's a plain static HTML/CSS/JS site — no
build tooling, no framework, no Jekyll (`.gitignore` is a generic Node/Angular
template left over from `github.com/gitignore`, but nothing Node-based is
actually used here). Just edit the `.html` files directly and commit.

`index.html` is a single-page portfolio (home/about/services/skills/
education/experience/work/blog/contact/social-qr, navigated by in-page anchor
links). `css/portfolio.css` is the real stylesheet used by every page in the
site — `css/bootstrap.min.css` and `css/style.css` are unused stubs, don't add
to them.

## Directory map

- `index.html` — the portfolio homepage.
- `css/portfolio.css` — the stylesheet used everywhere.
- `js/family-tree.js` + `js/*ancestor*.json` — renders the family tree on
  `index.html` from the JSON data files.
- `notes/` — personal learning notes (German, English grammar, Qur'an study),
  listed via cards on `notes/index.html`.
- `tutorial/` — blog-style articles, linked from the "Blog" section of
  `index.html`.
- `advance/` — older coding-standard reference pages (Angular, JS, TS,
  React, Node, etc.), each with a paired `.md` source and rendered `.html`.
  Less consistent than `notes/`/`tutorial/` — mostly pasted Google style-guide
  content.
- `assets/` — images (including favicon and social QR codes), the CV PDF,
  and images embedded in notes (e.g. `assets/deutsch-language/`).

## Page template (notes/ and tutorial/ pages)

Every page under `notes/` and `tutorial/` follows the same structure — when
adding a new one, copy an existing page rather than building from scratch:

1. `<head>`: charset/IE-edge meta, title `"<Topic> - Tauhidul Islam"`,
   description meta, viewport, favicon (`../assets/images/favicon.png`),
   Google Fonts Rubik, `<link rel="stylesheet" href="../css/portfolio.css">`.
2. `<body>`: `#backToTop` button → sticky `.navbar` (logo links to
   `../index.html#home`) → `.container.article-container` containing a
   `.back-link` ("← Back to Notes"), `.article-header` (emoji icon + `<h1>` +
   dated subtitle), an optional `.article-toc` in-page anchor list, and
   `.article-body` with `<h2 id="...">` sections (tables are used heavily for
   vocab/grammar/reference data).
3. Footer: `&copy; 2026 Tauhidul Islam. All rights reserved.`
4. A bottom inline `<script>` for the hamburger menu + back-to-top button —
   this is duplicated verbatim on every page rather than pulled into a shared
   JS file. That's an accepted/known duplication in this codebase, not a bug
   to silently "fix" by extracting a shared file.

**Adding a new note/article**: copy an existing page's HTML skeleton, update
the title/description/icon/content, then add a matching card to
`notes/index.html` (or the Blog section of `index.html` for tutorials).

## Naming conventions

- `notes/`: page files are kebab-case (`english-language.html`,
  `deutsch-language.html`). Many also have a snake_case `.md` file alongside
  (`english_note.md`, `deutch_note.md`) — these are **scratch drafts only**,
  not rendered by the site. When new content/links land in one of these `.md`
  drafts, the task is to fold it into the corresponding `.html` page; the
  `.md` file itself is not part of the published site and is left alone.
- `advance/`: files are camelCase (`javaScript.html`, `nodeJs.html`).

## Commit style

Small, incremental commits, one note/feature per commit, often prefixed
`fix:` even for additions (e.g. "fix: added english notes", "added quran note
and set link in the top").

## Pending

The user started noting a standing preference ("I always prefer...") that got
cut off mid-message — not yet captured here. Ask if it comes up again.
