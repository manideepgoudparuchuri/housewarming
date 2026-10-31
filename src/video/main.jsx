import { createRoot } from 'react-dom/client'
import '../index.css'
import './video.css'
import Video, { CLOSING_BELL, DURATION } from './Video.jsx'

// Deterministic frame stepping for the renderer: freeze every CSS animation at time t.
// Elements inside [data-t0="seconds"] use their own relative CSS delays, so shift their clock.
window.__duration = DURATION
window.__closingBell = CLOSING_BELL
window.__seek = (ms) => {
  for (const a of document.getAnimations()) {
    const t0 = a.effect?.target?.closest?.('[data-t0]')?.dataset.t0
    a.pause()
    a.currentTime = ms - (t0 ? Number(t0) * 1000 : 0)
  }
}
window.__ready = (async () => {
  await document.fonts.ready
  await Promise.all(
    ['24px "Tiro Telugu"', '24px "Great Vibes"', '24px "Cinzel Decorative"', '24px "Cormorant Garamond"', 'italic 24px "Cormorant Garamond"'].map(
      (f) => document.fonts.load(f, 'గృహ Aa'),
    ),
  )
})()

createRoot(document.getElementById('root')).render(<Video />)
