# News Update

A lightweight, static news website scaffold. No build tools, no dependencies — just
HTML, CSS, and vanilla JavaScript.

## Features

- Responsive layout with a clean, newspaper-style hero
- Light/dark theme toggle (persists via `localStorage`)
- Stories rendered dynamically from `news.json`
- Graceful fallback to sample stories if the JSON cannot be loaded

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page markup and structure |
| `styles.css` | Theme variables, layout, and component styles |
| `script.js` | Theme toggle, date rendering, and story loading |
| `news.json` | Source of truth for current stories |

## Running locally

Because `script.js` fetches `news.json`, open the site through a local server
rather than `file://`:

```bash
# Python 3
python3 -m http.server 8000

# Or Node
npx serve .
```

Then visit <http://localhost:8000>.

## Adding a story

Edit `news.json` and add an entry to the `stories` array:

```json
{
  "category": "Tech",
  "title": "Your headline here",
  "summary": "One or two sentences that summarize the story.",
  "author": "Byline",
  "date": "2026-04-15"
}
```

## License

MIT
