// Renders og.html (src/og/main.jsx) to public/og-image.jpg — the picture WhatsApp shows for the link.
// Usage: npm run og    (requires Google Chrome)
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createServer } from 'vite'

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const root = path.resolve(import.meta.dirname, '..')
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'hw-og-'))
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const server = await createServer({ root, server: { port: 5198, strictPort: false }, logLevel: 'error' })
await server.listen()
const port = 9341
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
}
const send = (method, params = {}) => new Promise((r) => { pending[++id] = r; ws.send(JSON.stringify({ id, method, params })) })

await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: `${server.resolvedUrls.local[0]}og.html` })
await sleep(2000)
await send('Runtime.evaluate', { expression: 'window.__ready', awaitPromise: true })
await sleep(1500)
const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 88 })
const out = path.join(root, 'public/og-image.jpg')
fs.writeFileSync(out, Buffer.from(r.result.data, 'base64'))
ws.close()
chrome.kill()
await server.close()
fs.rmSync(profile, { recursive: true, force: true })
console.log('wrote', out)
