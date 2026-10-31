import { blessing, event, hosts, invitation, schedule, title, venue } from '../data'
import { GruhaScene } from '../scene'
import { BrassLamp, CornerOrnament, Diya, Ganesha, Garland, Kalash, Kolam, Marigold, Rangoli, TempleBorder, Thoranam } from '../decor'

// 540x960 CSS px stage, captured at 2x => 1080x1920 portrait video.
// All motion is CSS animation with absolute delays so the renderer can seek any frame.
const DOORS_OPEN = 2.8
const SCENES = {
  hero: [DOORS_OPEN, 11.5],
  invite: [11.5, 18],
  date: [18, 24.5],
  programme: [24.5, 33.5],
  venue: [33.5, 40],
  entry: [40, 49.5],
  family: [49.5, 57],
  closing: [57, 99],
}
export const DURATION = 65.5
export const CLOSING_BELL = SCENES.closing[0] + 1.1

const anim = (name, dur, at, extra = '') => ({ animation: `${name} ${dur}s ${at}s ${extra} both` })

function Scene({ id, children, className = '' }) {
  const [start, end] = SCENES[id]
  return (
    <section
      className={`absolute inset-0 flex flex-col items-center justify-center px-9 text-center ${className}`}
      style={{ animation: `v-in 0.8s ${start}s both, v-out 0.8s ${end - 0.8}s forwards` }}
    >
      {children}
    </section>
  )
}

function Rise({ at, children, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={className} style={anim('v-rise', 1, at, 'cubic-bezier(.2,.7,.3,1)')}>
      {children}
    </Tag>
  )
}

function Divider({ at }) {
  return (
    <Rise at={at} className="my-5 flex items-center justify-center gap-3">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
      <svg viewBox="-12 -12 24 24" className="h-5 w-5">
        <Marigold r={10} />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
    </Rise>
  )
}

function Heading({ te, en, at }) {
  return (
    <Rise at={at} className="mb-2">
      <p className="font-telugu text-4xl text-gold-400">{te}</p>
      <p className="mt-1 font-display text-base tracking-[0.25em] text-gold-300/80 uppercase">{en}</p>
    </Rise>
  )
}

function Frame({ children, at, className = '' }) {
  return (
    <div className={`foil relative w-full rounded-3xl px-7 py-8 ${className}`} style={anim('v-zoom', 0.9, at, 'cubic-bezier(.2,.7,.3,1)')}>
      <div className="pointer-events-none absolute inset-2 rounded-[1.25rem] border border-gold-500/25" />
      <CornerOrnament className="absolute top-1 left-1 h-12 w-12" />
      <CornerOrnament className="absolute top-1 right-1 h-12 w-12" style={{ transform: 'scaleX(-1)' }} />
      <CornerOrnament className="absolute bottom-1 left-1 h-12 w-12" style={{ transform: 'scaleY(-1)' }} />
      <CornerOrnament className="absolute right-1 bottom-1 h-12 w-12" style={{ transform: 'scale(-1)' }} />
      <div className="relative">{children}</div>
    </div>
  )
}

function Petals() {
  const colors = ['#f97316', '#fbbf24', '#ef4444', '#f59e0b', '#ec4899']
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" style={anim('v-in', 1, DOORS_OPEN)}>
      {Array.from({ length: 18 }, (_, i) => {
        const size = 10 + ((i * 7) % 12)
        return (
          <span
            key={i}
            className="v-petal"
            style={{
              left: `${(i * 37) % 100}%`,
              width: size,
              height: size * 0.7,
              background: `radial-gradient(circle at 30% 30%, #fff7, ${colors[i % 5]})`,
              borderRadius: '70% 0 70% 0',
              animationDuration: `${9 + ((i * 5) % 9)}s`,
              animationDelay: `${-((i * 3.3) % 18)}s`,
              '--drift': `${((i * 53) % 160) - 80}px`,
              '--spin': `${360 + ((i * 97) % 540)}deg`,
            }}
          />
        )
      })}
    </div>
  )
}

function Doors() {
  const t = DOORS_OPEN
  return (
    <div className="v-stage absolute inset-0 z-40" style={{ animation: `v-out 1s ${t + 2}s forwards` }}>
      {['l', 'r'].map((side) => (
        <div
          key={side}
          className={`v-door ${side} absolute top-0 h-full w-1/2 ${side === 'l' ? 'left-0' : 'right-0'}`}
          style={{
            background: 'repeating-linear-gradient(90deg, #5a2d0c 0 6px, #6b3510 6px 14px, #4a240a 14px 18px), linear-gradient(#6b3510, #3b1d07)',
            boxShadow: side === 'l' ? 'inset -8px 0 20px rgba(0,0,0,.5)' : 'inset 8px 0 20px rgba(0,0,0,.5)',
            animation: `v-door-${side} 2.2s ${t}s cubic-bezier(0.65,0,0.35,1) both`,
          }}
        >
          <div className="door-studs absolute inset-0 opacity-70" />
          <div className="absolute inset-6 rounded-t-[50%_20%] border-4 border-gold-600/70" />
          <div className="absolute inset-x-12 top-1/4 bottom-1/4 border-2 border-gold-600/50" />
          <div className="absolute top-1/2 h-16 w-3.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-gold-300 to-gold-600 shadow" style={side === 'l' ? { right: 16 } : { left: 16 }} />
        </div>
      ))}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -mt-[420px] -ml-[420px] h-[840px] w-[840px] rounded-full bg-[radial-gradient(circle,#fff8e7_0%,#fde68acc_20%,#f5c54255_45%,transparent_70%)]"
        style={anim('v-burst', 2.2, t, 'ease-out')}
      />
      <div className="absolute inset-0 flex items-center justify-center px-10" style={{ animation: `v-in 0.8s 0.2s both, v-out 0.5s ${t - 0.4}s forwards` }}>
        <Kolam className="is-drawn absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-25" colored={false} />
        <div className="relative rounded-3xl border border-gold-500/40 bg-maroon-950/80 px-8 py-10 text-center shadow-2xl">
          <p className="font-telugu text-2xl text-gold-300">{blessing.te}</p>
          <p className="mt-5 font-telugu text-5xl leading-snug">
            <span className="gold-text inline-block py-1">శుభ ఆహ్వానం</span>
          </p>
          <p className="mt-2 font-script text-6xl text-gold-300">You&apos;re Invited</p>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 flex w-full justify-center gap-8 v-lit" style={{ '--ld': '0.5s', animation: `v-out 0.5s ${t - 0.4}s forwards` }}>
        <Diya className="h-16 w-16" lit={false} />
        <Diya className="h-16 w-16" lit={false} delay={0.4} />
        <Diya className="h-16 w-16" lit={false} delay={0.8} />
      </div>
    </div>
  )
}

function Chrome() {
  // Persistent temple frame once doors open
  return (
    <div className="pointer-events-none absolute inset-0 z-20" style={anim('v-in', 1, DOORS_OPEN)}>
      <Thoranam className="absolute top-0 left-0 h-20 w-full" />
      <Garland className="absolute top-12 left-1 h-72 w-6" />
      <Garland className="absolute top-12 right-1 h-72 w-6" delay={0.8} />
      <TempleBorder className="absolute bottom-0 left-0 block w-full" />
    </div>
  )
}

export default function Video() {
  const muhurtham = schedule[0]
  const [fam1, fam2] = hosts.family
  return (
    <div className="relative h-[960px] w-[540px] overflow-hidden">
      <Scene id="hero" className="pt-10">
        <div className="relative h-72 w-72" style={anim('v-zoom', 1.4, DOORS_OPEN + 0.6, 'cubic-bezier(.2,.7,.3,1)')}>
          <div className="absolute inset-0 rounded-full bg-gold-400/25 blur-2xl animate-halo" />
          <Rangoli className="absolute inset-0 h-full w-full opacity-70 animate-spin-slow" />
          <Ganesha className="absolute inset-[16%] h-[68%] w-[68%] drop-shadow-[0_0_18px_rgba(245,197,66,0.5)]" />
        </div>
        <Rise at={DOORS_OPEN + 1.6} className="mt-4">
          <p className="font-telugu text-3xl text-gold-300">{blessing.te}</p>
          <p className="mt-1 text-sm tracking-widest text-cream/70 uppercase">{blessing.en}</p>
        </Rise>
        <Rise at={DOORS_OPEN + 3} className="mt-7">
          <p className="font-telugu text-[2.6rem] leading-normal">
            <span className="gold-text inline-block py-2">{title.te}</span>
          </p>
          <p className="font-script text-6xl text-gold-300">{title.en}</p>
          <p className="mt-2 font-display text-base tracking-[0.3em] text-cream/80 uppercase">{title.subEn}</p>
        </Rise>
        <Rise at={DOORS_OPEN + 4.2} className="v-lit mt-6 flex items-end justify-center gap-5">
          <span style={{ '--ld': `${DOORS_OPEN + 4.8}s` }}>
            <Diya className="h-16 w-16" lit={false} />
          </span>
          <Kalash className="h-24 w-20" />
          <span style={{ '--ld': `${DOORS_OPEN + 5.3}s` }}>
            <Diya className="h-16 w-16" lit={false} delay={0.5} />
          </span>
        </Rise>
      </Scene>

      <Scene id="invite">
        <Frame at={SCENES.invite[0] + 0.2}>
          <p className="font-telugu text-2xl leading-loose text-cream" style={anim('v-in', 1.2, SCENES.invite[0] + 0.8)}>
            {invitation.te}
          </p>
          <Divider at={SCENES.invite[0] + 2} />
          <p className="text-2xl leading-relaxed text-cream/90 italic" style={anim('v-in', 1.2, SCENES.invite[0] + 2.4)}>
            {invitation.en}
          </p>
        </Frame>
      </Scene>

      <Scene id="date">
        <Heading te="శుభ ముహూర్తం" en="The Auspicious Day" at={SCENES.date[0] + 0.2} />
        <Divider at={SCENES.date[0] + 0.5} />
        <Frame at={SCENES.date[0] + 0.8}>
          <p className="font-display text-xl tracking-widest text-gold-300 uppercase">{event.weekdayEn}</p>
          <p className="font-telugu text-xl text-cream/85">{event.weekdayTe}</p>
          <div className="relative mx-auto my-5 grid h-40 w-40 place-items-center rounded-full border-2 border-gold-400 bg-maroon-950/60" style={anim('v-zoom', 1, SCENES.date[0] + 1.5)}>
            <span className="absolute inset-1.5 rounded-full border border-dashed border-gold-500/50 animate-spin-slow" />
            <span className="font-serif text-8xl font-bold text-gold-400 lining-nums">{event.day}</span>
          </div>
          <p className="font-display text-xl tracking-widest text-gold-300 uppercase">
            {event.monthEn} {event.year}
          </p>
          <p className="font-telugu text-xl text-cream/85">
            {event.monthTe} {event.year}
          </p>
          <Rise at={SCENES.date[0] + 2.6} className="mt-6 rounded-2xl border border-gold-500/40 bg-maroon-950/50 px-4 py-3">
            <p className="font-telugu text-lg text-cream">
              {muhurtham.te} · <span className="font-serif font-bold text-gold-400">{muhurtham.time}</span>
            </p>
            <p className="text-base text-cream/75">{muhurtham.en}</p>
          </Rise>
        </Frame>
      </Scene>

      <Scene id="programme">
        <Heading te="కార్యక్రమ వివరాలు" en="Programme" at={SCENES.programme[0] + 0.2} />
        <Divider at={SCENES.programme[0] + 0.5} />
        <div className="w-full space-y-4">
          {schedule.map((s, i) => (
            <Rise key={s.en} at={SCENES.programme[0] + 1 + i * 1.1}>
              <div className="foil relative flex items-center gap-4 rounded-2xl px-5 py-4 text-left">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold-500/50 bg-maroon-950/60 text-3xl">{s.icon}</div>
                <div className="min-w-0">
                  <p className="font-serif text-2xl leading-tight font-bold text-gold-400 lining-nums">{s.time}</p>
                  <p className="font-telugu text-lg leading-snug text-cream">{s.te}</p>
                  <p className="text-base leading-tight text-cream/75">{s.en}</p>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </Scene>

      <Scene id="venue">
        <Heading te="వేదిక" en="Venue" at={SCENES.venue[0] + 0.2} />
        <Divider at={SCENES.venue[0] + 0.5} />
        <Frame at={SCENES.venue[0] + 0.8}>
          <p className="text-5xl" style={anim('v-zoom', 0.8, SCENES.venue[0] + 1.2)}>
            🏡
          </p>
          <p className="mt-4 font-telugu text-xl leading-relaxed text-cream" style={anim('v-in', 1, SCENES.venue[0] + 1.6)}>
            {venue.te}
          </p>
          <p className="mt-4 text-xl leading-relaxed text-cream/85" style={anim('v-in', 1, SCENES.venue[0] + 2.4)}>
            {venue.en}
          </p>
          <Rise at={SCENES.venue[0] + 3.2} className="mt-5 inline-block rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-6 py-2.5 font-bold text-maroon-950">
            📍 Map link in the message
          </Rise>
        </Frame>
      </Scene>

      <Scene id="entry">
        <Heading te="శుభ గృహప్రవేశం" en="Auspicious Entry" at={SCENES.entry[0] + 0.2} />
        <Divider at={SCENES.entry[0] + 0.5} />
        {/* data-t0: main.jsx offsets this scene's own CSS animations to start here */}
        <div className="scene-frame w-full" style={anim('v-zoom', 0.9, SCENES.entry[0] + 0.6, 'cubic-bezier(.2,.7,.3,1)')}>
          <div className="is-visible" data-t0={SCENES.entry[0] + 0.8}>
            <GruhaScene className="block h-auto w-full rounded-[16px]" />
          </div>
        </div>
        <Rise at={SCENES.entry[0] + 1.6} className="mt-6">
          <p className="font-telugu text-xl text-gold-300">గోమాత ఆశీస్సులతో నూతన గృహప్రవేశం</p>
          <p className="mt-1 font-script text-3xl leading-snug text-cream/90">With Gomata&rsquo;s blessings, we step into our new home</p>
        </Rise>
      </Scene>

      <Scene id="family">
        <Heading te={hosts.labelTe} en={hosts.labelEn} at={SCENES.family[0] + 0.2} />
        <Divider at={SCENES.family[0] + 0.5} />
        <Frame at={SCENES.family[0] + 0.8} className="py-7">
          <Rise at={SCENES.family[0] + 1.3}>
            {hosts.namesTe.split(' & ').map((n, i) => (
              <span key={n} className="gold-text block py-0.5 font-telugu text-2xl">
                {i ? `& ${n}` : n}
              </span>
            ))}
            <p className="mt-1 font-script text-[2rem] leading-snug text-gold-300">
              {hosts.namesEn.split(' & ').map((n, i) => (
                <span key={n} className="block">
                  {i ? `& ${n}` : n}
                </span>
              ))}
            </p>
          </Rise>
          {[fam1, fam2].map((f, k) => (
            <Rise key={f.labelEn} at={SCENES.family[0] + 2.4 + k * 1.2} className="mt-5">
              <p className="font-telugu text-lg text-gold-300/90">{f.labelTe}</p>
              <p className="text-xs tracking-widest text-cream/60 uppercase">{f.labelEn}</p>
              {f.namesTe.map((te, j) => (
                <div key={te} className="mt-1">
                  <p className="font-telugu text-xl text-cream">{te}</p>
                  <p className="font-script text-3xl leading-tight text-gold-300">{f.namesEn[j]}</p>
                </div>
              ))}
            </Rise>
          ))}
        </Frame>
      </Scene>

      <Scene id="closing">
        <div className="relative h-80 w-80">
          <Kolam className="is-drawn absolute inset-0 h-full w-full opacity-60" delay={SCENES.closing[0]} />
          <div className="v-lit absolute inset-x-0 top-[4%] mx-auto h-[92%] w-[62%]" style={{ '--ld': `${SCENES.closing[0] + 1.2}s` }}>
            <BrassLamp className="h-full w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]" lit={5} />
          </div>
        </div>
        <Rise at={SCENES.closing[0] + 3.8} className="mt-3">
          <p className="font-telugu text-3xl text-gold-300">శుభమస్తు</p>
        </Rise>
        <Rise at={SCENES.closing[0] + 4.6} className="mt-5">
          <p className="font-telugu text-2xl text-gold-300">మీ రాకకై ఎదురుచూస్తూ</p>
          <p className="mt-1 font-script text-4xl text-cream/90">Awaiting your gracious presence</p>
          <p className="mt-4 text-lg text-cream/70">With love, the Paruchuri family 🙏</p>
        </Rise>
        <Rise at={SCENES.closing[0] + 5.6} className="mt-6 rounded-full border border-gold-400/50 px-5 py-2 text-sm tracking-wide text-gold-300">
          manideepgoudparuchuri.github.io/housewarming
        </Rise>
      </Scene>

      <Chrome />
      <Petals />
      <Doors />
    </div>
  )
}
