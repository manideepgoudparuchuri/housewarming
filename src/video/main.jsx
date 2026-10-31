import { createRoot } from 'react-dom/client'
import '../index.css'
import './video.css'
import Video, { DURATION } from './Video.jsx'

// Deterministic frame stepping for the renderer: freeze every CSS animation at time t.
window.__duration = DURATION
window.__seek = (ms) => {
  for (const a of document.getAnimations()) {
    a.pause()
    a.currentTime = ms
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
