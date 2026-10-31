// Renders src/video (video.html) to a 1080x1920 MP4 with the temple soundtrack.
// Usage: FFMPEG=/path/to/ffmpeg node scripts/render-video.mjs [--fps 30] [--preview]
// Requires Google Chrome. Uses ffmpeg from FFMPEG / PATH (brew install ffmpeg); if none is found it
// downloads a private copy once via Python (imageio-ffmpeg) into ~/.cache/housewarming-ffmpeg.
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createServer } from 'vite'

const args = process.argv.slice(2)
const fps = Number(args[args.indexOf('--fps') + 1]) || 30
const preview = args.includes('--preview')
const FFMPEG = preview ? null : findFfmpeg()
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'video-out')
const frames = fs.mkdtempSync(path.join(os.tmpdir(), 'hw-frames-'))
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'hw-chrome-'))
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function findFfmpeg() {
  if (process.env.FFMPEG) return process.env.FFMPEG
  if (spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status === 0) return 'ffmpeg'
  const venv = path.join(os.homedir(), '.cache/housewarming-ffmpeg')
  const py = path.join(venv, 'bin/python')
  const locate = () => spawnSync(py, ['-c', 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())'], { encoding: 'utf8' })
  let found = fs.existsSync(py) ? locate() : null
  if (found?.status !== 0) {
    console.log('ffmpeg not found — setting up a private copy with Python (one time, ~1 min)…')
    const steps = [
      ['python3', ['-m', 'venv', venv]],
      [path.join(venv, 'bin/pip'), ['install', '-q', '--disable-pip-version-check', 'imageio-ffmpeg']],
    ]
    for (const [cmd, a] of steps) {
      if (spawnSync(cmd, a, { stdio: 'inherit' }).status !== 0) {
        console.error('Could not set up ffmpeg automatically. Install it with:  brew install ffmpeg')
        process.exit(1)
      }
    }
    found = locate()
  }
  return found.stdout.trim()
}

const server = await createServer({ root, server: { port: 5199, strictPort: false }, logLevel: 'error' })
await server.listen()
const url = `${server.resolvedUrls.local[0]}video.html`

const port = 9340
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--hide-scrollbars', '--force-color-profile=srgb', 'about:blank'], { stdio: 'ignore' })
let tabs
for (let i = 0; i < 60 && !tabs?.length; i++) {
  try {
    tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json()
  } catch {
    await sleep(250)
  }
}
const ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = {}
ws.onmessage = (m) => {
  const d = JSON.parse(m.data)
  if (d.id && pending[d.id]) pending[d.id](d)
  if (d.method === 'Runtime.exceptionThrown') console.error('page error', JSON.stringify(d.params).slice(0, 400))
}
const send = (method, params = {}) => new Promise((r) => { pending[++id] = r; ws.send(JSON.stringify({ id, method, params })) })
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.result?.value

await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 540, height: 960, deviceScaleFactor: 2, mobile: false })
await send('Page.navigate', { url })
await sleep(2000)
await evaluate('window.__ready')
await sleep(1500)
const duration = await evaluate('window.__duration')
const closingBell = await evaluate('window.__closingBell')
const total = preview ? 0 : Math.round(duration * fps)
const shots = preview ? [1, 3.5, 7, 9, 15, 22, 30, 37, 45, 52, 55] : null

const capture = async (t, file) => {
  await evaluate(`window.__seek(${t * 1000})`)
  const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 92, optimizeForSpeed: true })
  fs.writeFileSync(file, Buffer.from(r.result.data, 'base64'))
}

fs.mkdirSync(outDir, { recursive: true })
if (preview) {
  for (const t of shots) await capture(t, path.join(outDir, `preview-${String(t).padStart(4, '0')}s.jpg`))
  console.log('previews in', outDir)
} else {
  const started = Date.now()
  for (let f = 0; f < total; f++) {
    await capture(f / fps, path.join(frames, `f${String(f).padStart(5, '0')}.jpg`))
    if (f % (fps * 5) === 0) console.log(`frame ${f}/${total} (${Math.round((Date.now() - started) / 1000)}s)`)
  }
}
ws.close()
chrome.kill()
await server.close()

if (!preview) {
  const a = (n) => path.join(root, 'public/audio', `${n}.mp3`)
  const fade = duration - 3.5
  const filter = [
    '[1]aformat=channel_layouts=stereo,adelay=200:all=1,volume=0.9[conch]',
    '[2]aformat=channel_layouts=stereo,adelay=900:all=1,volume=0.7[bell1]',
    '[3]aformat=channel_layouts=stereo,adelay=2700:all=1,volume=0.9[nada]',
    `[4]aformat=channel_layouts=stereo,atrim=0:${duration},afade=t=in:d=4,adelay=19000:all=1,volume=0.85[veena]`,
    `[5]aformat=channel_layouts=stereo,adelay=${Math.round(closingBell * 1000)}:all=1,volume=0.45[bell2]`,
    `[conch][bell1][nada][veena][bell2]amix=inputs=5:normalize=0:duration=longest,atrim=0:${duration},afade=t=out:st=${fade}:d=3.5[aout]`,
  ].join(';')
  const out = path.join(outDir, 'gruhapravesam-invitation.mp4')
  const res = spawnSync(
    FFMPEG,
    ['-hide_banner', '-loglevel', 'error', '-y', '-framerate', String(fps), '-i', path.join(frames, 'f%05d.jpg'),
      '-i', a('conch'), '-i', a('bell'), '-i', a('nadaswaram'), '-i', a('veena'), '-i', a('bell'),
      '-filter_complex', filter, '-vf', 'scale=in_range=pc:out_range=tv,format=yuv420p', '-color_range', 'tv', '-map', '0:v', '-map', '[aout]',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-maxrate', '2800k', '-bufsize', '5600k', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.1',
      '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', String(duration), out],
    { stdio: 'inherit' },
  )
  if (res.status !== 0) process.exit(res.status ?? 1)
  console.log('wrote', out, `${(fs.statSync(out).size / 1e6).toFixed(1)} MB`)
  const dl = path.join(os.homedir(), 'Downloads/Gruhapravesam-Invitation-Paruchuri.mp4')
  fs.rmSync(dl, { force: true })
  fs.copyFileSync(out, dl)
  console.log('copied to', dl)
}
fs.rmSync(frames, { recursive: true, force: true })
fs.rmSync(profile, { recursive: true, force: true })
