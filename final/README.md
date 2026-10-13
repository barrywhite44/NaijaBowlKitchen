# Naija Bowl Kitchen — WDD 231 final project starter

A framework-free, responsive multi-page student website based on the Naija Bowl Kitchen preview.

## Pages
- `index.html`: landing page
- `menu.html`: 15 soup cards generated using Fetch API and JSON, with favorites, filtering, and accessible modal
- `order.html`: native GET form and price estimate
- `thanks.html`: form action page using URLSearchParams
- `attributions.html`: source credits

## Before submission
1. **IMPORTANT:** Replace the footer sentence about the video on *every* page with a real clickable URL to your public 3–5 minute recording (show your face and screen). A fake URL was intentionally not included.
2. Confirm your content and wording are your own original work; follow the course's individual-work requirements.
3. Open via a local server (for example VS Code Live Server or `python -m http.server 8000` from this directory); `fetch()` may not work from `file://`.
4. Publish this folder inside your `wdd231` GitHub repository as `final/` and update the Week 1 Final navigation link.
5. Run the official WDD 231 audit and Chrome Lighthouse on **all three main pages** (and check other pages too); test mobile 320px, keyboard navigation, contrast, and browser console. No scores have been claimed or verified.
6. The project uses no external images or fonts; the lightweight SVG illustration and favicon are original from the supplied preview. Verify transfer sizes after deployment.
7. Replace demo content/contact info with truthful, final content; this site intentionally does not submit actual orders.

## Demo talking points
- `scripts/shared.js`: asynchronous `fetchSoups()` and response checking
- `scripts/menu.js`: `async init()` with `try...catch`, `filter`, `map`, modal, localStorage
- `scripts/order.js`: async loading and calculated total
- `scripts/thanks.js`: URLSearchParams receipt
- ES Modules: `type="module"` in each HTML file and `import`/`export`

## Images and formatting
All 15 menu illustrations are stored locally in `images/` as lightweight SVG files. They are original programmatically drawn illustrations, not photographs. Replace them with properly licensed, optimized photos if desired, and update attributions. HTML is indented with one element per line and the CSS is expanded for readability. Run the site through Live Server (not `file://`) because Fetch API requires HTTP.

See IMAGE-CHECKLIST.md for remaining photographs and credits.
