# Webpage audit: personal profile

Reviewed files: `index.html`, `style.css`, `script.js`.

## Requirements

| Requirement | Result |
| --- | --- |
| HTML in `index.html` | Met |
| All styling in `style.css` | Met — no `style=""` attributes |
| JavaScript in `script.js` | Met — linked at the end of `body` |
| Page title | Met — `<title>` in the document head |
| One main heading | Met — a single `<h1>` |
| About section | Met — `#about` |
| Skills as a list | Met — `#skills` uses `<ul>` |
| Projects with links | Met — three project items with `<a href>` |
| Unknown details marked `PLACEHOLDER` | Met in visible copy and in `href` / `mailto` values |

## Structure and semantics

The page uses `header`, `nav`, `main`, `section`, and `footer`. Section headings are `<h2>` and are tied to their sections with `aria-labelledby`. In-page links go to `#about`, `#skills`, and `#projects`. A skip link targets `#main`.

Project URLs still use `https://PLACEHOLDER.example.com/...`. Those hosts will not resolve until they are replaced.

## Styling

Layout is centered, readable, and responsive through fluid wrapping (nav flex wrap, default block flow). Link hover/focus uses underline plus a slight scale. Motion is disabled when `prefers-reduced-motion: reduce` is set.

No inline styles were found.

## JavaScript

`script.js` sets the copyright year and highlights the word `PLACEHOLDER` in text nodes. It also shows a status banner while those text placeholders remain.

Gap: placeholders inside attributes (`href`, `mailto`) are not highlighted, because the script only walks text nodes. Search the source files for `PLACEHOLDER` to catch those too.

## Accessibility notes

- `lang="en"` and a viewport meta tag are present.
- Focus styles exist on links (color + underline + scale).
- Skip link is visible on keyboard focus.
- Color contrast of the gold `<h2>` (`#8a6d1b` on `#f4f1ea`) is worth checking if you keep that palette after replacing placeholders.

## Placeholders to replace

Search the project for `PLACEHOLDER`. Expected locations:

- Document title, name heading, tagline
- About paragraphs
- Five skill list items
- Three project titles, descriptions, and URLs
- Contact email (visible text and `mailto:`)
- Footer name

After you replace them, reload the page. The yellow marks and the status banner should disappear once no text node contains `PLACEHOLDER`.

## Live check

This audit is from the source files. A local preview server was not available in this environment (no working Python or Node), so click/hover behavior was not exercised in a browser here. Open `index.html` locally and confirm: nav jumps, skip link, project links, hover scale, and the placeholder banner.
