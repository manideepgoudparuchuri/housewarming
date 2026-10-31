# Gruhapravesam Invitation · గృహప్రవేశ ఆహ్వానం

Animated, bilingual (Telugu + English) housewarming invitation for the Paruchuri family — **Friday, 20 November 2026**, Kushaiguda, Hyderabad.

**Live:** https://manideepgoudparuchuri.github.io/housewarming/

## Features
- Temple-door intro that opens on tap (starts soft tanpura + flute background music)
- Lord Ganesha blessing, thoranam, marigold garlands, diyas, kalash and falling petals
- Live countdown and "Add to Google Calendar"
- Programme timings, venue with Google Map and directions
- RSVP via pre-filled WhatsApp message

## Editing details
All text, timings, venue and RSVP number live in [`src/data.js`](src/data.js). Edit and push — the site redeploys automatically.

The WhatsApp link preview image is `public/og-image.jpg` (1200×630).

## Development
```bash
npm install
npm run dev      # http://localhost:5173/housewarming/
npm run build
```

## Deploy
Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

Built with React, Vite and Tailwind CSS.
