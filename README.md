# Gruhapravesam Invitation · గృహప్రవేశ ఆహ్వానం

Animated, bilingual (Telugu + English) housewarming invitation for the Paruchuri family — **Friday, 20 November 2026**, Kushaiguda, Hyderabad.

**Live:** https://manideepgoudparuchuri.github.io/housewarming/

## Features
- Brass-studded temple-door intro with a kolam drawing itself; tapping OPEN plays a conch, a temple bell and a nadaswaram burst, then a gentle looping veena
- Silk-brocade background, gold-foil cards with temple corner ornaments, zari temple borders, parallax and gold sparkles
- Lord Ganesha blessing, thoranam, tappable brass temple bells, marigold garlands, diyas that light up, kalash and falling petals
- A brass lamp (kuthu vilakku) in the footer that guests tap to light
- Live countdown and "Add to Google Calendar"
- Programme timings, venue with Google Map and directions

## Editing details
All text, timings and venue live in [`src/data.js`](src/data.js). Edit and push — the site redeploys automatically.

The WhatsApp link preview image is `public/og-image.jpg` (1200×630).

## Invitation video
A 56-second 1080×1920 video (for WhatsApp) is rendered from `video.html` / `src/video/Video.jsx`, using the same artwork, `src/data.js` and the music below. After changing details, re-render:

```bash
brew install ffmpeg            # once (or set FFMPEG=/path/to/ffmpeg)
npm run video:preview          # a few still frames in video-out/
npm run video                  # video-out/gruhapravesam-invitation.mp4
```

The video page is not part of the deployed site.

## Music credits
Audio is in `public/audio/`, excerpted, trimmed and loudness-normalised from Wikimedia Commons recordings:

| File | Source | Author | License |
|------|--------|--------|---------|
| `veena.mp3` | [Viriboni, rendered on the Veena](https://commons.wikimedia.org/wiki/File:Viriboni,_rendered_on_the_Veena.ogg) | Smt. Pushpa Srivatsan | CC0 |
| `nadaswaram.mp3` | [Thakil & Nadaswaram during temple Deeparadhana](https://commons.wikimedia.org/wiki/File:Thakil_%26_Nadaswaram_during_temple_Deeparadhana.ogg) | Vis M | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `bell.mp3` | [ghanta-leather-mallet-2015-05-16](https://commons.wikimedia.org/wiki/File:274316_the-very-real-horst_ghanta-leather-mallet-2015-05-16.wav) | the_very_Real_Horst | CC0 |
| `conch.mp3` | [Conch shell.ogg](https://commons.wikimedia.org/wiki/File:Conch_shell.ogg) | David Bolton | [CC BY 2.5](https://creativecommons.org/licenses/by/2.5/) |

## Development
```bash
npm install
npm run dev      # http://localhost:5173/housewarming/
npm run build
```

## Deploy
Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

Built with React, Vite and Tailwind CSS.
