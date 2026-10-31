# Gruhapravesam Invitation · గృహప్రవేశ ఆహ్వానం

Animated, bilingual (Telugu + English) housewarming invitation for the Paruchuri family — **Friday, 20 November 2026**, Kushaiguda, Hyderabad.

**Live:** https://manideepgoudparuchuri.github.io/housewarming/

## Features
- Brass-studded temple-door intro with a kolam drawing itself; tapping OPEN plays a conch, a temple bell and a nadaswaram burst, then a gentle looping veena
- Silk-brocade background, gold-foil cards with temple corner ornaments, zari temple borders, parallax and gold sparkles
- Lord Ganesha blessing, thoranam, tappable brass temple bells, marigold garlands, diyas that light up, kalash and falling petals
- Animated "Gomata entry" scene: the doors open and a decorated cow and calf walk into the new home (tap to replay)
- "Add to Google Calendar"
- Programme timings, venue with Google Map and directions

---

# ✏️ Updating the invitation (step-by-step)

Everything is generated from **one file: [`src/data.js`](src/data.js)**. Change it once, then make the three outputs: the **website**, the **WhatsApp text** and the **video**.

## 0. One-time setup (only on a new laptop)

```bash
brew install node gh                            # tools (Google Chrome must also be installed)
gh auth login                                   # log in with your PERSONAL GitHub (manideepgoudparuchuri)
git clone https://github.com/manideepgoudparuchuri/housewarming.git
cd housewarming
npm install
```

On this Mac the project is already at `~/Documents/New OpenCode Project/housewarming-invite`, so just:

```bash
cd ~/Documents/"New OpenCode Project"/housewarming-invite
git pull
```

## 1. Change the date, times, names or venue

Open `src/data.js` in any editor (VS Code, TextEdit…). The top of the file has what you will usually change:

| What | Where in `src/data.js` | Example |
|------|-----------------------|---------|
| Date | `const DATE = '2026-11-20'` (YYYY-MM-DD) | `'2026-11-27'` |
| Times / programme | `schedule` list → `time:` | `time: '11:00 AM'` |
| Add / remove a programme item | copy or delete a whole `{ time, icon, te, en }` block | |
| Calendar end time | `const CALENDAR_END = '15:00'` (24-hour) | `'16:00'` |
| Names | `hosts` (`namesTe` / `namesEn`, and `family`) | |
| Address / map | `venue` (`te`, `en`, `short`, `mapsLink`, `lat`, `lng`) | |
| Invitation wording | `invitation`, `blessing`, `title` | |

Rules:
- Time format must be `'H:MM AM'` or `'H:MM PM'` — e.g. `'5:30 AM'`, `'12:30 PM'`.
- The **first** item in `schedule` is the main *Muhurtham* (used for the calendar start time and the link-preview text).
- Weekday and month names (Telugu + English) are calculated automatically from `DATE` — you don't type them anywhere.
- Keep the quotes `'…'` and commas `,` exactly as they are.

Check it in the browser before publishing:

```bash
npm run dev          # open http://localhost:5173/housewarming/  (Ctrl+C to stop)
```

## 2. Update the website (GitHub Pages)

```bash
npm run deploy -- "Change Vratham time to 11 AM"
```

This builds the site, commits, pushes to GitHub and waits until the live site is updated (~1 minute). Then open
https://manideepgoudparuchuri.github.io/housewarming/ (hard-refresh / reopen if you still see the old page).

<details>
<summary>Doing it by hand instead</summary>

```bash
npm run build                 # just to make sure there are no errors
git add -A
git commit -m "Change Vratham time"
git push
```
GitHub Actions (`.github/workflows/deploy.yml`) publishes automatically on every push to `main`. Watch it at
https://github.com/manideepgoudparuchuri/housewarming/actions.
</details>

## 3. Make the WhatsApp text message (Telugu + English)

```bash
npm run message
```

Prints the message, saves it to `video-out/whatsapp-message.txt` **and copies it to Downloads** as `Gruhapravesam-WhatsApp-Message.txt` (replacing the old one). Copy the **TELUGU** part and/or the **ENGLISH** part into WhatsApp (the `*stars*` become **bold** in WhatsApp). Telugu times (ఉదయం / మధ్యాహ్నం / సాయంత్రం / రాత్రి) are worked out automatically.

To copy straight to the clipboard: `npm run message --silent | pbcopy`.

## 4. Make the invitation video (MP4 for WhatsApp)

```bash
npm run video:preview      # optional: a few still pictures in video-out/ to check quickly
npm run video              # full video (~2 minutes)
```

The video is saved to `video-out/gruhapravesam-invitation.mp4` **and copied to Downloads** as `Gruhapravesam-Invitation-Paruchuri.mp4` (replacing the old one).

ffmpeg is needed to make the MP4. If it isn't installed, `npm run video` sets up a private copy automatically the first time (using Python, ~1 minute, saved in `~/.cache/housewarming-ffmpeg`). Installing it with `brew install ffmpeg` also works.

1080×1920, about 65 seconds, ~13 MB — fits in WhatsApp. To open the video design in a browser while editing: `npm run dev`, then go to http://localhost:5173/housewarming/video.html.

## 5. (Only if the DATE or place changed) Update the link-preview picture

When you paste the link in WhatsApp it shows a picture (`public/og-image.jpg`) with the date and place. Regenerate it, then deploy again:

```bash
npm run og
npm run deploy -- "Update preview image"
```

WhatsApp caches link previews for a while; to force a fresh preview send the link once with `?v=2` at the end, e.g. `https://manideepgoudparuchuri.github.io/housewarming/?v=2`.

## Quick checklist

```text
1. edit src/data.js
2. npm run dev                       → check it looks right
3. npm run og                        → only if date / place changed
4. npm run deploy -- "message"       → website live
5. npm run message                   → WhatsApp text
6. npm run video                     → WhatsApp video (video-out/)
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `git push` says **403 / permission denied** | Your work GitHub account is being used. Use `npm run deploy` (it uses your personal `gh` login), or run `unset GH_TOKEN GITHUB_TOKEN` first and `gh auth login` with the personal account. |
| `ffmpeg not found` / `Could not set up ffmpeg` | `brew install ffmpeg` (or run with `FFMPEG=/path/to/ffmpeg npm run video`). |
| Chrome not found (video / og) | Install Google Chrome, or run with `CHROME="/path/to/chrome" npm run video`. |
| Error mentioning `match` / `to24h` | A time in `schedule` is in the wrong format — use `'H:MM AM'` / `'H:MM PM'`. |
| Page shows old details | Wait a minute after deploy and hard-refresh (on phone: close the tab and reopen). |
| Something else broke | `git checkout src/data.js` throws away your edits so you can start again. |

## Where things are

| File | What it is |
|------|-----------|
| `src/data.js` | **All details** (edit this) |
| `src/App.jsx` | Website layout |
| `src/scene.jsx` | Animated cow-entry scene |
| `src/decor.jsx` | Ganesha, diya, kalash, bells, thoranam artwork |
| `src/video/Video.jsx` | Video scenes |
| `src/og/main.jsx` | Link-preview picture design |
| `scripts/` | `deploy.sh`, `whatsapp-message.mjs`, `render-video.mjs`, `render-og.mjs` |
| `public/audio/` | Music |

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
npm run lint
```

Built with React, Vite and Tailwind CSS.
