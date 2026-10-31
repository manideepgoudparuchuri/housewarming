import { useEffect, useMemo, useRef, useState } from 'react'
import { blessing, event, hosts, invitation, schedule, title, venue } from './data'
import {
  BrassBell,
  CornerOrnament,
  Diya,
  Ganesha,
  Garland,
  Kalash,
  Kolam,
  Marigold,
  Rangoli,
  TempleBorder,
  Thoranam,
} from './decor'
import { createSound } from './music'
import { GruhaScene } from './scene'

function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => document.documentElement.style.setProperty('--sy', String(window.scrollY)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}

const SPARKLES = [
  [8, 22, 0],
  [88, 18, 0.8],
  [20, 48, 1.6],
  [80, 44, 0.4],
  [12, 70, 2.1],
  [92, 66, 1.2],
  [50, 10, 1.9],
  [30, 84, 0.6],
  [70, 88, 1.4],
]

function Sparkles({ items = SPARKLES }) {
  return items.map(([x, y, d], i) => (
    <span key={i} className="sparkle" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s`, scale: i % 3 ? '0.8' : '1.3' }} />
  ))
}

function Burst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const a = (i / 36) * Math.PI * 2
        const dist = 160 + (i % 4) * 70
        return {
          x: `${Math.cos(a) * dist}px`,
          y: `${Math.sin(a) * dist}px`,
          r: `${(i % 2 ? 1 : -1) * (200 + i * 15)}deg`,
          size: 10 + (i % 3) * 5,
          color: ['#f97316', '#fbbf24', '#ef4444', '#fde68a', '#ec4899', '#f59e0b'][i % 6],
          delay: (i % 5) * 0.06,
        }
      }),
    [],
  )
  return pieces.map((p, i) => (
    <span
      key={i}
      className="burst-piece"
      style={{
        width: p.size,
        height: p.size * 0.7,
        background: `radial-gradient(circle at 30% 30%, #fff8, ${p.color})`,
        borderRadius: '70% 0 70% 0',
        animationDelay: `${p.delay}s`,
        '--x': p.x,
        '--y': p.y,
        '--r': p.r,
      }}
    />
  ))
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Petals({ count = 16 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 12,
        duration: 9 + Math.random() * 9,
        delay: -Math.random() * 18,
        drift: (Math.random() - 0.5) * 160,
        spin: 360 + Math.random() * 540,
        color: ['#f97316', '#fbbf24', '#ef4444', '#f59e0b', '#ec4899'][i % 5],
      })),
    [count],
  )
  return petals.map((p, i) => (
    <span
      key={i}
      className="petal"
      style={{
        left: `${p.left}vw`,
        width: p.size,
        height: p.size * 0.7,
        background: `radial-gradient(circle at 30% 30%, #fff7, ${p.color})`,
        borderRadius: '70% 0 70% 0',
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`,
        '--drift': `${p.drift}px`,
        '--spin': `${p.spin}deg`,
      }}
    />
  ))
}

function SectionTitle({ te, en }) {
  return (
    <div className="mb-8 text-center">
      <p className="font-telugu text-2xl text-gold-400 sm:text-3xl">{te}</p>
      <p className="mt-1 font-display text-sm tracking-[0.25em] text-gold-300/80 uppercase sm:text-base">{en}</p>
      <div className="mx-auto mt-4 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
        <svg viewBox="-12 -12 24 24" className="h-5 w-5">
          <Marigold r={10} />
        </svg>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
      </div>
    </div>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`foil relative rounded-3xl p-7 shadow-[0_0_40px_rgba(212,160,23,0.15)] sm:p-9 ${className}`}>
      <div className="pointer-events-none absolute inset-2 rounded-[1.25rem] border border-gold-500/25" />
      <CornerOrnament className="pointer-events-none absolute top-1 left-1 h-10 w-10 sm:h-12 sm:w-12" />
      <CornerOrnament className="pointer-events-none absolute top-1 right-1 h-10 w-10 sm:h-12 sm:w-12" style={{ transform: 'scaleX(-1)' }} />
      <CornerOrnament className="pointer-events-none absolute bottom-1 left-1 h-10 w-10 sm:h-12 sm:w-12" style={{ transform: 'scaleY(-1)' }} />
      <CornerOrnament className="pointer-events-none absolute right-1 bottom-1 h-10 w-10 sm:h-12 sm:w-12" style={{ transform: 'scale(-1)' }} />
      <div className="foil-shine" />
      <div className="relative">{children}</div>
    </div>
  )
}

function Intro({ onOpen, opening }) {
  return (
    <div
      className={`door-stage fixed inset-0 z-50 overflow-hidden transition-opacity duration-1000 ${
        opening ? 'doors-open pointer-events-none' : ''
      }`}
      style={{ opacity: opening === 'done' ? 0 : 1 }}
    >
      <div className="absolute inset-0 bg-maroon-950" style={{ opacity: opening ? 0 : 1, transition: 'opacity 1.6s 0.6s' }} />
      {['left', 'right'].map((side) => (
        <div
          key={side}
          className={`door door-${side} absolute top-0 h-full w-1/2 ${side === 'left' ? 'left-0' : 'right-0'}`}
          style={{
            background:
              'repeating-linear-gradient(90deg, #5a2d0c 0 6px, #6b3510 6px 14px, #4a240a 14px 18px), linear-gradient(#6b3510, #3b1d07)',
            boxShadow: side === 'left' ? 'inset -8px 0 20px rgba(0,0,0,.5)' : 'inset 8px 0 20px rgba(0,0,0,.5)',
          }}
        >
          <div className="door-studs absolute inset-0 opacity-70" />
          <div className="absolute inset-4 rounded-t-[50%_20%] border-4 border-gold-600/70 sm:inset-8" />
          <div className="absolute inset-x-8 top-1/4 bottom-1/4 border-2 border-gold-600/50 sm:inset-x-14" />
          <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 opacity-60">
            <Rangoli className="h-full w-full" />
          </div>
          <div
            className={`absolute top-1/2 h-14 w-3 -translate-y-1/2 rounded-full bg-gradient-to-b from-gold-300 to-gold-600 shadow ${
              side === 'left' ? 'right-4' : 'left-4'
            }`}
          />
        </div>
      ))}

      <Thoranam className="absolute top-0 left-0 z-10 h-16 w-full sm:h-20" />

      {opening && (
        <div className="light-burst pointer-events-none absolute top-1/2 left-1/2 z-[5] -mt-[40vmax] -ml-[40vmax] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(circle,#fff8e7_0%,#fde68acc_20%,#f5c54255_45%,transparent_70%)]" />
      )}

      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500"
        style={{ opacity: opening ? 0 : 1 }}
      >
        <Kolam className="is-drawn pointer-events-none absolute top-1/2 left-1/2 h-[min(118vw,560px)] w-[min(118vw,560px)] -translate-x-1/2 -translate-y-1/2 opacity-25" colored={false} />
        <div className="relative rounded-3xl border border-gold-500/40 bg-maroon-950/75 px-6 py-8 shadow-2xl backdrop-blur-sm sm:px-10">
          <p className="font-telugu text-xl text-gold-300">{blessing.te}</p>
          <p className="mt-4 font-telugu text-3xl leading-snug sm:text-4xl">
            <span className="gold-text inline-block py-1">శుభ ఆహ్వానం</span>
          </p>
          <p className="mt-1 font-script text-4xl text-gold-300 sm:text-5xl">You&apos;re Invited</p>
          <button
            onClick={onOpen}
            className="relative mt-8 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-8 py-3 font-display text-sm font-bold tracking-widest text-maroon-950 shadow-lg shadow-gold-500/30"
          >
            <span className="absolute inset-0 -z-10 rounded-full bg-gold-400 animate-pulse-ring" />
            ద్వారం తెరవండి · OPEN
          </button>
          <p className="mt-4 text-sm text-cream/60">Tap to open · with temple music 🎵</p>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 z-10 flex w-full justify-center gap-6" style={{ opacity: opening ? 0 : 1 }}>
        <Diya className="h-14 w-14" lightDelay={0.3} />
        <Diya className="h-14 w-14" delay={0.4} lightDelay={0.7} />
        <Diya className="h-14 w-14" delay={0.8} lightDelay={1.1} />
      </div>
    </div>
  )
}

function EntryScene() {
  const [run, setRun] = useState(0)
  return (
    <figure className="relative mx-auto max-w-3xl">
      <div className="pointer-events-none absolute -inset-6">
        <Sparkles />
      </div>
      <button type="button" onClick={() => setRun((r) => r + 1)} aria-label="Replay animation" className="scene-frame block w-full">
        <GruhaScene key={run} className="block h-auto w-full rounded-[16px]" />
      </button>
      <figcaption className="mt-5 text-center">
        <p className="font-telugu text-lg text-gold-300">గోమాత ఆశీస్సులతో నూతన గృహప్రవేశం</p>
        <p className="font-script text-3xl text-cream/90">With Gomata&rsquo;s blessings, we step into our new home</p>
        <p className="mt-2 text-xs text-cream/50">Tap the picture to replay ↻</p>
      </figcaption>
    </figure>
  )
}

function calendarUrl() {
  const fmt = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Gruhapravesam (Housewarming) - Paruchuri Family',
    dates: `${fmt(event.start)}/${fmt(event.end)}`,
    details: `${schedule.map((s) => `${s.en} ${s.time}`).join(', ')}.\nMaps: ${venue.mapsLink}`,
    location: venue.en,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

function MusicButton({ playing, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed right-4 bottom-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-gold-400/60 bg-maroon-900/90 text-xl text-gold-300 shadow-lg backdrop-blur"
    >
      {playing && <span className="absolute inset-0 rounded-full border border-gold-400 animate-pulse-ring" />}
      {playing ? (
        <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
          {[0, 0.25, 0.5, 0.15].map((d) => (
            <span key={d} className="eq-bar h-full w-[3px] rounded-full bg-gold-300" style={{ animationDelay: `${d}s` }} />
          ))}
        </span>
      ) : (
        '🔇'
      )}
    </button>
  )
}

export default function App() {
  const [opening, setOpening] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [heroLit, setHeroLit] = useState(false)
  const [ringing, setRinging] = useState(null)
  const sound = useRef(null)
  useReveal()
  useParallax()

  useEffect(() => {
    try {
      sound.current = createSound()
    } catch {
      sound.current = null
    }
  }, [])

  useEffect(() => {
    const onVis = () => {
      const s = sound.current
      if (!s || !playing) return
      if (document.hidden) s.mute()
      else s.unmute()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [playing])

  const open = () => {
    if (sound.current) {
      sound.current.open()
      setPlaying(true)
    }
    setOpening(true)
    setTimeout(() => setOpening('done'), 2400)
    setTimeout(() => {
      setShowIntro(false)
      setHeroLit(true)
    }, 3400)
  }

  const toggleMusic = () => {
    const s = sound.current
    if (!s) return
    if (playing) s.mute()
    else s.unmute()
    setPlaying(!playing)
  }

  const ringBell = (side) => {
    if (playing) sound.current?.bell(0.55)
    setRinging(null)
    requestAnimationFrame(() => setRinging(side))
    setTimeout(() => setRinging((r) => (r === side ? null : r)), 1600)
  }


  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : ''
  }, [showIntro])

  return (
    <>
      {showIntro && <Intro onOpen={open} opening={opening} />}
      {!showIntro || opening ? <Petals /> : null}
      {opening && showIntro && <Burst />}
      {!showIntro && <MusicButton playing={playing} onToggle={toggleMusic} />}

      <main className="relative">
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pt-20 pb-16 text-center sm:pt-24">
          <div className="pointer-events-none absolute inset-0 parallax" style={{ '--f': 0.35 }}>
            <Sparkles />
          </div>
          <Thoranam className="absolute top-0 left-0 z-10 h-16 w-full sm:h-20" />
          <Garland className="absolute top-10 left-1 h-56 w-5 sm:left-6 sm:h-80 sm:w-7" />
          <Garland className="absolute top-10 right-1 h-56 w-5 sm:right-6 sm:h-80 sm:w-7" delay={0.8} />
          <BrassBell className="absolute top-12 left-8 h-28 w-8 sm:left-20 sm:h-36 sm:w-10" ringing={ringing === 'l'} onClick={() => ringBell('l')} />
          <BrassBell className="absolute top-12 right-8 h-28 w-8 sm:right-20 sm:h-36 sm:w-10" ringing={ringing === 'r'} onClick={() => ringBell('r')} />

          <div className="parallax relative mx-auto h-56 w-56 sm:h-72 sm:w-72" style={{ '--f': 0.12 }}>
            <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-2xl animate-halo" />
            <Rangoli className="absolute inset-0 h-full w-full opacity-70 animate-spin-slow" />
            <Ganesha className="absolute inset-[16%] h-[68%] w-[68%] drop-shadow-[0_0_18px_rgba(245,197,66,0.5)]" />
          </div>

          <p className="mt-6 font-telugu text-2xl text-gold-300 sm:text-3xl">{blessing.te}</p>
          <p className="mt-1 text-sm tracking-widest text-cream/70 uppercase">{blessing.en}</p>
          <div className="mx-auto mt-4 max-w-md font-telugu text-sm leading-relaxed text-cream/80 sm:text-base">
            {blessing.shloka.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>

          <h1 className="mt-10 font-telugu text-4xl leading-normal sm:text-6xl">
            <span className="gold-text inline-block py-2">{title.te}</span>
          </h1>
          <p className="mt-2 font-script text-5xl text-gold-300 sm:text-7xl">{title.en}</p>
          <p className="mt-2 font-display text-sm tracking-[0.3em] text-cream/80 uppercase sm:text-lg">{title.subEn}</p>

          <div className="mt-8 flex justify-center gap-4">
            <Diya className="h-12 w-12 sm:h-16 sm:w-16" lit={heroLit} lightDelay={0.4} />
            <Kalash className="h-20 w-16 sm:h-28 sm:w-24" />
            <Diya className="h-12 w-12 sm:h-16 sm:w-16" delay={0.5} lit={heroLit} lightDelay={1} />
          </div>
        </section>

        <TempleBorder className="mb-14 block w-full opacity-90" />

        {/* Invitation */}
        <section className="reveal px-5 pb-16">
          <Card className="mx-auto max-w-2xl text-center">
            <p className="font-telugu text-lg leading-loose text-cream sm:text-xl">{invitation.te}</p>
            <div className="my-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold-500/60" />
              <span className="text-gold-400">❁</span>
              <span className="h-px w-12 bg-gold-500/60" />
            </div>
            <p className="text-lg leading-relaxed text-cream/90 italic sm:text-xl">{invitation.en}</p>
          </Card>
        </section>

        {/* Date */}
        <section className="reveal px-5 pb-16">
          <SectionTitle te="శుభ ముహూర్తం" en="The Auspicious Day" />
          <Card className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="text-right">
                <p className="font-display text-sm tracking-widest text-gold-300 uppercase sm:text-base">{event.weekdayEn}</p>
                <p className="font-telugu text-sm text-cream/80 sm:text-base">{event.weekdayTe}</p>
              </div>
              <div className="relative grid h-24 w-24 place-items-center rounded-full border-2 border-gold-400 bg-maroon-950/60 sm:h-28 sm:w-28">
                <span className="absolute inset-1 rounded-full border border-dashed border-gold-500/50 animate-spin-slow" />
                <span className="font-serif text-6xl font-bold text-gold-400 lining-nums sm:text-7xl">{event.day}</span>
              </div>
              <div className="text-left">
                <p className="font-display text-sm tracking-widest text-gold-300 uppercase sm:text-base">
                  {event.monthShortEn} {event.year}
                </p>
                <p className="font-telugu text-sm text-cream/80 sm:text-base">
                  {event.monthTe} {event.year}
                </p>
              </div>
            </div>
            <a
              href={calendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full border border-gold-400/60 px-6 py-2.5 text-gold-300 transition hover:bg-gold-400/10"
            >
              📅 <span className="font-telugu">క్యాలెండర్‌లో చేర్చండి</span>
              <span className="block text-sm sm:ml-2 sm:inline">Add to calendar</span>
            </a>
          </Card>
        </section>

        {/* Schedule */}
        <section className="reveal px-5 pb-16">
          <SectionTitle te="కార్యక్రమ వివరాలు" en="Programme" />
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {schedule.map((s) => (
              <Card key={s.en} className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold-500/50 bg-maroon-950/60 text-3xl">
                  {s.icon}
                </div>
                <p className="mt-4 font-serif text-3xl font-bold text-gold-400 lining-nums">{s.time}</p>
                <p className="mt-2 font-telugu text-xl text-cream">{s.te}</p>
                <p className="mt-1 text-lg text-cream/80">{s.en}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Venue */}
        <section className="reveal px-5 pb-16">
          <SectionTitle te="వేదిక" en="Venue" />
          <Card className="mx-auto max-w-3xl text-center">
            <p className="text-3xl">🏡</p>
            <p className="mt-3 font-telugu text-lg leading-relaxed text-cream sm:text-xl">{venue.te}</p>
            <p className="mt-3 text-lg leading-relaxed text-cream/85">{venue.en}</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-gold-500/40">
              <iframe
                title="Venue map"
                src={`https://maps.google.com/maps?q=${venue.lat},${venue.lng}&z=16&output=embed`}
                className="h-64 w-full sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={venue.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-8 py-3 font-bold text-maroon-950 shadow-lg shadow-gold-500/20 transition hover:scale-105"
            >
              📍 దారి చూపించు · Get directions
            </a>
          </Card>
        </section>

        {/* Hosts */}
        <section className="reveal px-5 pb-16">
          <SectionTitle te={hosts.labelTe} en={hosts.labelEn} />
          <Card className="mx-auto max-w-2xl text-center">
            <p className="font-telugu text-xl leading-relaxed sm:text-3xl">
              {hosts.namesTe.split(' & ').map((n, i) => (
                <span key={n} className="gold-text block py-1">
                  {i ? `& ${n}` : n}
                </span>
              ))}
            </p>
            <p className="mt-2 font-script text-[1.7rem] leading-snug text-gold-300 sm:text-4xl">
              {hosts.namesEn.split(' & ').map((n, i) => (
                <span key={n} className="block">
                  {i ? `& ${n}` : n}
                </span>
              ))}
            </p>
            <div className="my-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold-500/60" />
              <span className="text-gold-400">❁</span>
              <span className="h-px w-12 bg-gold-500/60" />
            </div>
            {hosts.family.map((f, i) => (
              <div key={f.labelEn} className={i ? 'mt-8' : ''}>
                <p className="font-telugu text-base text-gold-300/90">{f.labelTe}</p>
                <p className="text-xs tracking-widest text-cream/60 uppercase">{f.labelEn}</p>
                {f.namesTe.map((te, j) => (
                  <div key={te} className={j ? 'mt-3' : ''}>
                    <p className="mt-2 font-telugu text-xl text-cream sm:text-2xl">{te}</p>
                    <p className="mt-1 font-script text-3xl text-gold-300">{f.namesEn[j]}</p>
                  </div>
                ))}
              </div>
            ))}
          </Card>
        </section>

        <TempleBorder className="mb-10 block w-full opacity-90" />

        {/* Gruhapravesam scene */}
        <section className="reveal px-5 pb-12">
          <SectionTitle te="శుభ గృహప్రవేశం" en="Auspicious Entry" />
          <EntryScene />
        </section>

        <footer className="relative overflow-hidden px-5 pt-2 pb-24 text-center">
          <div className="flex justify-center gap-6">
            {[0, 0.4, 0.8].map((d) => (
              <Diya key={d} className="h-12 w-12 sm:h-14 sm:w-14" delay={d} />
            ))}
          </div>
          <p className="mt-6 font-telugu text-xl text-gold-300 sm:text-2xl">మీ రాకకై ఎదురుచూస్తూ</p>
          <p className="mt-1 font-script text-3xl text-cream/90 sm:text-4xl">Awaiting your gracious presence</p>
          <p className="mt-6 text-sm text-cream/50">With love, the Paruchuri family 🙏</p>
          <details className="mx-auto mt-8 max-w-md text-left text-xs text-cream/40">
            <summary className="cursor-pointer text-center">Music credits</summary>
            <ul className="mt-2 space-y-1">
              <li>Veena: &ldquo;Viriboni&rdquo; by Smt. Pushpa Srivatsan, CC0 (excerpt)</li>
              <li>
                Nadaswaram: &ldquo;Thakil &amp; Nadaswaram during temple Deeparadhana&rdquo; by Vis M,{' '}
                <a className="underline" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
                  CC BY 4.0
                </a>{' '}
                (excerpted, edited)
              </li>
              <li>Temple bell: ghanta recording by the_very_Real_Horst, CC0</li>
              <li>
                Conch: &ldquo;Conch shell&rdquo; by David Bolton,{' '}
                <a className="underline" href="https://creativecommons.org/licenses/by/2.5/" target="_blank" rel="noreferrer">
                  CC BY 2.5
                </a>{' '}
                (trimmed)
              </li>
              <li>All via Wikimedia Commons.</li>
            </ul>
          </details>
        </footer>
      </main>
    </>
  )
}
