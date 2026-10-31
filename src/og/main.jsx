import { createRoot } from 'react-dom/client'
import '../index.css'
import { blessing, event, title, venue } from '../data'
import { Diya, Ganesha, Kalash, Rangoli, Thoranam } from '../decor'

// 1200x630 WhatsApp / social link preview. Rendered to public/og-image.jpg by `npm run og`.
function OgImage() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: 1200, height: 630, background: 'radial-gradient(ellipse at 30% 40%, #6b0f1a 0%, #4a0a12 45%, #2a0509 100%)' }}
    >
      <div className="absolute inset-4 rounded-2xl border border-gold-500/40" />
      <Thoranam className="absolute top-0 left-0 h-[92px] w-full" />
      <div className="absolute top-[128px] left-[70px] h-[420px] w-[420px]">
        <Rangoli className="absolute inset-0 h-full w-full opacity-80" />
        <Ganesha className="absolute inset-[16%] h-[68%] w-[68%]" />
      </div>
      <div className="absolute top-[112px] right-[50px] flex w-[620px] flex-col items-center text-center">
        <p className="font-telugu text-3xl text-gold-300">{blessing.te}</p>
        <p className="gold-text mt-2 block py-3 font-telugu text-[64px] leading-tight" style={{ animation: 'none' }}>
          {title.te}
        </p>
        <p className="font-script text-[64px] leading-none text-gold-300">{title.en}</p>
        <p className="mt-9 font-display text-[34px] tracking-[0.12em] text-cream">
          {event.weekdayEn} · {event.day} {event.monthShortEn} {event.year}
        </p>
        <p className="mt-4 font-serif text-[28px] text-cream/85">{venue.short}</p>
        <div className="mt-6 flex items-end gap-16">
          <Diya className="h-16 w-16" />
          <Kalash className="h-24 w-20" />
          <Diya className="h-16 w-16" />
        </div>
      </div>
    </div>
  )
}

window.__ready = document.fonts.ready.then(() =>
  Promise.all(['24px "Tiro Telugu"', '24px "Great Vibes"', '24px "Cinzel Decorative"', '24px "Cormorant Garamond"'].map((f) => document.fonts.load(f, 'గృహ Aa'))),
)
createRoot(document.getElementById('root')).render(<OgImage />)
