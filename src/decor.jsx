const fillBox = { transformBox: 'fill-box' }

export function Marigold({ x = 0, y = 0, r = 9, tone = 'orange' }) {
  const outer = tone === 'orange' ? '#ea580c' : '#f59e0b'
  const inner = tone === 'orange' ? '#f97316' : '#fbbf24'
  const petals = 12
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: petals }, (_, i) => {
        const a = (i / petals) * Math.PI * 2
        return <circle key={i} cx={Math.cos(a) * r * 0.62} cy={Math.sin(a) * r * 0.62} r={r * 0.45} fill={outer} />
      })}
      <circle r={r * 0.62} fill={inner} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 + 0.3
        return <circle key={i} cx={Math.cos(a) * r * 0.32} cy={Math.sin(a) * r * 0.32} r={r * 0.22} fill={outer} opacity="0.8" />
      })}
      <circle r={r * 0.18} fill="#7c2d12" />
    </g>
  )
}

function MangoLeaf({ x, delay }) {
  return (
    <g transform={`translate(${x} 10)`}>
      <g className="animate-sway" style={{ ...fillBox, animationDelay: `${delay}s` }}>
        <path d="M0,0 C9,12 10,34 0,54 C-10,34 -9,12 0,0 Z" fill="url(#leafGrad)" stroke="#1f4d14" strokeWidth="0.8" />
        <path d="M0,3 L0,50" stroke="#a3d977" strokeWidth="0.9" opacity="0.7" />
      </g>
    </g>
  )
}

export function Thoranam({ className = '' }) {
  const width = 420
  const items = []
  for (let i = 0; i < 14; i++) {
    const x = 15 + i * 30
    items.push(<MangoLeaf key={`l${i}`} x={x} delay={(i % 5) * 0.35} />)
  }
  return (
    <svg viewBox={`0 0 ${width} 80`} className={className} preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <defs>
        <linearGradient id="leafGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#2f6b1f" />
          <stop offset="0.5" stopColor="#4d9a2a" />
          <stop offset="1" stopColor="#2f6b1f" />
        </linearGradient>
      </defs>
      <path d={`M0,9 Q${width / 2},16 ${width},9`} stroke="#b8860b" strokeWidth="2.5" fill="none" />
      {items}
      {Array.from({ length: 15 }, (_, i) => (
        <Marigold key={`m${i}`} x={i * 30} y={11} r={8} tone={i % 2 ? 'yellow' : 'orange'} />
      ))}
    </svg>
  )
}

export function Garland({ count = 9, className = '', delay = 0 }) {
  const h = count * 18 + 20
  return (
    <svg viewBox={`0 0 24 ${h}`} className={`animate-swing ${className}`} style={{ animationDelay: `${delay}s` }} aria-hidden="true">
      <line x1="12" y1="0" x2="12" y2={h - 10} stroke="#b8860b" strokeWidth="1" />
      {Array.from({ length: count }, (_, i) => (
        <Marigold key={i} x={12} y={10 + i * 18} r={9} tone={i % 2 ? 'yellow' : 'orange'} />
      ))}
      <path d={`M12,${h - 12} l-4,10 h8 z`} fill="#dc2626" />
    </svg>
  )
}

export function Diya({ className = '', delay = 0, lit = true, lightDelay = 0, ...rest }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" {...rest}>
      <defs>
        <radialGradient id="diyaGlow">
          <stop offset="0" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#dc2626" />
          <stop offset="0.35" stopColor="#f97316" />
          <stop offset="0.75" stopColor="#fde047" />
          <stop offset="1" stopColor="#fffbeb" />
        </linearGradient>
        <linearGradient id="clayGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d97706" />
          <stop offset="1" stopColor="#7c2d12" />
        </linearGradient>
      </defs>
      <g className={`flame-wrap ${lit ? 'is-lit' : ''}`} style={{ transitionDelay: `${lightDelay}s` }}>
        <circle cx="40" cy="34" r="26" fill="url(#diyaGlow)" className="animate-halo" style={{ ...fillBox, transformOrigin: 'center', animationDelay: `${delay}s` }} />
        <path
          className="animate-flicker"
          style={{ ...fillBox, animationDelay: `${delay}s` }}
          d="M40,18 C46,28 47,36 40,44 C33,36 34,28 40,18 Z"
          fill="url(#flameGrad)"
        />
      </g>
      <path d="M39,42 L40,47 L41,42 Z" fill="#3b1d07" />
      <path d="M12,48 C16,66 64,66 68,48 C58,52 22,52 12,48 Z" fill="url(#clayGrad)" />
      <path d="M12,48 C22,52 58,52 68,48" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
      <path d="M68,48 C72,46 76,44 78,40 C74,46 70,48 66,50 Z" fill="#b45309" />
      <circle cx="30" cy="57" r="1.6" fill="#fbbf24" />
      <circle cx="40" cy="59" r="1.6" fill="#fbbf24" />
      <circle cx="50" cy="57" r="1.6" fill="#fbbf24" />
    </svg>
  )
}

export function Kalash({ className = '', ...rest }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id="potGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#92400e" />
          <stop offset="0.35" stopColor="#f5c542" />
          <stop offset="0.6" stopColor="#d4a017" />
          <stop offset="1" stopColor="#78350f" />
        </linearGradient>
        <radialGradient id="cocoGrad" cx="0.4" cy="0.35">
          <stop offset="0" stopColor="#a16207" />
          <stop offset="1" stopColor="#5b3a12" />
        </radialGradient>
      </defs>
      {[-58, -32, -10, 10, 32, 58].map((a, i) => (
        <path
          key={i}
          d="M0,0 C7,-10 8,-28 0,-44 C-8,-28 -7,-10 0,0 Z"
          transform={`translate(60 62) rotate(${a})`}
          fill={i % 2 ? '#3f8a22' : '#2f6b1f'}
          stroke="#1f4d14"
          strokeWidth="0.6"
        />
      ))}
      <ellipse cx="60" cy="42" rx="17" ry="20" fill="url(#cocoGrad)" />
      <path d="M60,22 C57,14 52,10 48,9 M60,22 C62,13 66,10 71,9" stroke="#5b3a12" strokeWidth="2" fill="none" />
      <path d="M43,48 C50,52 70,52 77,48" stroke="#dc2626" strokeWidth="3" fill="none" />
      <rect x="40" y="58" width="40" height="8" rx="3" fill="#b8860b" />
      <path d="M44,66 C44,72 38,76 30,84 C14,100 20,138 60,140 C100,138 106,100 90,84 C82,76 76,72 76,66 Z" fill="url(#potGrad)" />
      <path d="M26,96 C45,104 75,104 94,96" stroke="#dc2626" strokeWidth="3" fill="none" />
      <path d="M24,108 C45,116 75,116 96,108" stroke="#7c2d12" strokeWidth="1.5" fill="none" />
      <g transform="translate(60 122)" fill="#dc2626">
        <circle r="4.5" />
        <circle cx="-12" r="2.5" fill="#fbbf24" />
        <circle cx="12" r="2.5" fill="#fbbf24" />
      </g>
    </svg>
  )
}

export function Rangoli({ className = '' }) {
  const rings = [
    { n: 8, r: 88, rx: 12, ry: 26, color: '#f59e0b' },
    { n: 16, r: 70, rx: 6, ry: 14, color: '#ec4899' },
    { n: 12, r: 52, rx: 9, ry: 18, color: '#fde68a' },
    { n: 8, r: 32, rx: 7, ry: 14, color: '#22c55e' },
  ]
  return (
    <svg viewBox="-110 -110 220 220" className={className} aria-hidden="true">
      <circle r="104" fill="none" stroke="#f5c542" strokeWidth="1" strokeDasharray="2 5" opacity="0.7" />
      <circle r="96" fill="none" stroke="#f5c542" strokeWidth="0.6" opacity="0.5" />
      {Array.from({ length: 36 }, (_, i) => {
        const a = (i / 36) * Math.PI * 2
        return <circle key={i} cx={Math.cos(a) * 100} cy={Math.sin(a) * 100} r="2" fill={i % 2 ? '#fde68a' : '#f97316'} />
      })}
      {rings.map((ring, k) =>
        Array.from({ length: ring.n }, (_, i) => (
          <ellipse
            key={`${k}-${i}`}
            cx="0"
            cy={-ring.r + ring.ry}
            rx={ring.rx}
            ry={ring.ry}
            transform={`rotate(${(360 / ring.n) * i + (k % 2 ? 360 / ring.n / 2 : 0)})`}
            fill={ring.color}
            opacity="0.85"
          />
        )),
      )}
      <circle r="16" fill="#dc2626" opacity="0.9" />
      <circle r="9" fill="#fde68a" />
    </svg>
  )
}

export function Ganesha({ className = '' }) {
  return (
    <svg viewBox="0 0 200 230" className={className} role="img" aria-label="Lord Ganesha">
      <defs>
        <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.45" stopColor="#f5c542" />
          <stop offset="1" stopColor="#b8860b" />
        </linearGradient>
        <linearGradient id="gSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb36b" />
          <stop offset="1" stopColor="#e2742b" />
        </linearGradient>
      </defs>
      {/* ears */}
      <path d="M62,88 C30,70 10,92 16,124 C21,150 44,160 64,146 Z" fill="url(#gSkin)" stroke="#7c2d12" strokeWidth="2" />
      <path d="M138,88 C170,70 190,92 184,124 C179,150 156,160 136,146 Z" fill="url(#gSkin)" stroke="#7c2d12" strokeWidth="2" />
      <path d="M58,98 C38,92 28,106 32,124 C35,138 48,144 60,136" fill="none" stroke="#f5c542" strokeWidth="2" opacity="0.8" />
      <path d="M142,98 C162,92 172,106 168,124 C165,138 152,144 140,136" fill="none" stroke="#f5c542" strokeWidth="2" opacity="0.8" />
      {/* crown */}
      <path d="M64,74 L70,40 C78,30 88,22 100,6 C112,22 122,30 130,40 L136,74 Z" fill="url(#gGold)" stroke="#92400e" strokeWidth="2" />
      <path d="M68,58 L132,58" stroke="#92400e" strokeWidth="1.5" />
      <circle cx="100" cy="46" r="6" fill="#dc2626" stroke="#92400e" strokeWidth="1.5" />
      <circle cx="84" cy="64" r="2.5" fill="#16a34a" />
      <circle cx="100" cy="66" r="3" fill="#dc2626" />
      <circle cx="116" cy="64" r="2.5" fill="#16a34a" />
      <rect x="60" y="70" width="80" height="10" rx="4" fill="url(#gGold)" stroke="#92400e" strokeWidth="1.5" />
      {/* head + trunk */}
      <path
        d="M62,80 C58,106 66,128 84,138 C86,160 84,180 92,196 C100,212 122,214 128,200 C132,190 124,182 116,186 C110,189 112,198 118,198 C112,192 104,180 106,160 C108,148 112,140 116,138 C134,128 142,106 138,80 Z"
        fill="url(#gSkin)"
        stroke="#7c2d12"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* trunk folds */}
      <path d="M88,150 C94,153 102,153 108,150" stroke="#7c2d12" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M88,164 C94,167 101,167 106,164" stroke="#7c2d12" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M90,178 C95,181 101,181 106,178" stroke="#7c2d12" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* tilak */}
      <path d="M90,86 L110,86 M90,91 L110,91 M90,96 L110,96" stroke="#fff8e7" strokeWidth="2" strokeLinecap="round" />
      <path d="M100,84 C97,90 97,98 100,104 C103,98 103,90 100,84 Z" fill="#dc2626" />
      {/* eyes */}
      <path d="M76,110 C80,104 88,104 92,110" stroke="#2a0509" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108,110 C112,104 120,104 124,110" stroke="#2a0509" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* tusks */}
      <path d="M82,134 C76,142 72,146 66,148 C72,140 74,136 78,130 Z" fill="#fff8e7" stroke="#7c2d12" strokeWidth="1.2" />
      <path d="M118,134 C121,138 122,140 124,140 C121,136 121,134 121,131 Z" fill="#fff8e7" stroke="#7c2d12" strokeWidth="1.2" />
      {/* modak */}
      <path d="M130,200 C136,192 146,194 146,204 C146,212 132,212 130,200 Z" fill="#fde68a" stroke="#b8860b" strokeWidth="1.5" />
    </svg>
  )
}

/* ---------- Temple / silk ornaments ---------- */

export function TempleBorder({ className = '' }) {
  return (
    <svg className={className} height="26" aria-hidden="true">
      <defs>
        <linearGradient id="tbGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.5" stopColor="#d4a017" />
          <stop offset="1" stopColor="#8a5a0b" />
        </linearGradient>
        <pattern id="tbPat" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M1,21 L13,5 L25,21 Z" fill="url(#tbGold)" />
          <path d="M6,21 L13,11 L20,21 Z" fill="#6b0f1a" />
          <circle cx="13" cy="17" r="1.8" fill="#f5c542" />
          <circle cx="0" cy="24" r="1.3" fill="#f5c542" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="2" fill="url(#tbGold)" />
      <rect x="0" y="2" width="100%" height="22" fill="url(#tbPat)" />
      <rect x="0" y="24" width="100%" height="2" fill="url(#tbGold)" />
    </svg>
  )
}

export function CornerOrnament({ className = '', style }) {
  return (
    <svg viewBox="0 0 60 60" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="coGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.5" stopColor="#f5c542" />
          <stop offset="1" stopColor="#a16207" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#coGold)" strokeLinecap="round">
        <path d="M3,57 L3,18 Q3,3 18,3 L57,3" strokeWidth="2" />
        <path d="M9,50 C9,26 26,9 50,9" strokeWidth="1.2" />
        <path d="M14,34 C18,34 20,30 18,27" strokeWidth="1" />
        <path d="M34,14 C34,18 30,20 27,18" strokeWidth="1" />
      </g>
      <path d="M12,12 C24,10 30,18 26,26 C22,30 16,28 17,23 C18,20 22,20 22,23 C18,18 13,16 12,12 Z" fill="url(#coGold)" />
      <circle cx="40" cy="5.5" r="1.6" fill="#f5c542" />
      <circle cx="5.5" cy="40" r="1.6" fill="#f5c542" />
      <circle cx="31" cy="31" r="2.2" fill="#dc2626" />
    </svg>
  )
}

export function BrassBell({ className = '', ringing = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Ring the temple bell"
      className={`origin-top ${ringing ? 'animate-ring' : 'animate-swing'} ${className}`}
    >
      <svg viewBox="0 0 40 140" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="bellBrass" x1="0" x2="1">
            <stop offset="0" stopColor="#6b3f0a" />
            <stop offset="0.35" stopColor="#f5c542" />
            <stop offset="0.55" stopColor="#fff3c4" />
            <stop offset="0.8" stopColor="#d4a017" />
            <stop offset="1" stopColor="#6b3f0a" />
          </linearGradient>
        </defs>
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse key={i} cx="20" cy={4 + i * 8} rx="2.4" ry="4" fill="none" stroke="#d4a017" strokeWidth="1.4" />
        ))}
        <circle cx="20" cy="78" r="4" fill="url(#bellBrass)" />
        <path d="M20,80 C11,80 9,90 9,104 C9,112 6,118 3,122 L37,122 C34,118 31,112 31,104 C31,90 29,80 20,80 Z" fill="url(#bellBrass)" stroke="#6b3f0a" strokeWidth="1" />
        <path d="M5,118 L35,118" stroke="#8a5a0b" strokeWidth="1" />
        <path d="M10,100 L30,100" stroke="#8a5a0b" strokeWidth="0.8" opacity="0.7" />
        <circle cx="20" cy="128" r="4.5" fill="url(#bellBrass)" stroke="#6b3f0a" strokeWidth="0.8" />
      </svg>
    </button>
  )
}

function loopedSquare(s, d, r) {
  // square of half-size s with a teardrop loop at every corner (kolam style)
  const c = [
    [s, -s],
    [s, s],
    [-s, s],
    [-s, -s],
  ]
  const dirIn = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]
  let path = `M${-s + d},${-s}`
  c.forEach(([x, y], i) => {
    const [ix, iy] = dirIn[i]
    const [ox, oy] = dirIn[(i + 1) % 4]
    path += ` L${x - ix * d},${y - iy * d}`
    path += ` A${r},${r} 0 1 1 ${x + ox * d},${y + oy * d}`
  })
  return path + ' Z'
}

export function Kolam({ className = '', delay = 0, colored = true }) {
  const dots = []
  for (let i = -3; i <= 3; i++)
    for (let j = -3; j <= 3; j++) if (Math.abs(i) + Math.abs(j) <= 3) dots.push([i * 20, j * 20])
  const scallops = 20
  const R = 84
  let ring = ''
  for (let k = 0; k < scallops; k++) {
    const a1 = (k / scallops) * Math.PI * 2
    const a2 = ((k + 1) / scallops) * Math.PI * 2
    const p1 = [Math.cos(a1) * R, Math.sin(a1) * R]
    const p2 = [Math.cos(a2) * R, Math.sin(a2) * R]
    ring += `${k ? '' : `M${p1[0].toFixed(1)},${p1[1].toFixed(1)}`} A14,14 0 0 1 ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  const petal = 'M0,-12 C13,-22 11,-38 0,-50 C-11,-38 -13,-22 0,-12 Z'
  const lines = [
    { d: ring, w: 2 },
    { d: loopedSquare(48, 12, 10), w: 2.2 },
    { d: loopedSquare(48, 12, 10), w: 2.2, rot: 45 },
    { d: 'M0,-12 A12,12 0 1 1 0,12 A12,12 0 1 1 0,-12', w: 2 },
  ]
  return (
    <svg viewBox="-104 -104 208 208" className={`kolam ${className}`} style={{ '--kd': `${delay}s` }} aria-hidden="true">
      <g fill="#fff8e7">
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" className="kolam-dot" style={{ '--i': i }} />
        ))}
      </g>
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={`p${i}`}
          d={petal}
          transform={`rotate(${i * 45 + 22.5})`}
          pathLength="1"
          className="kolam-line kolam-petal"
          style={{ '--i': 4 + i * 0.25, fill: colored ? (i % 2 ? '#f59e0b' : '#dc2626') : 'none' }}
        />
      ))}
      {lines.map((l, i) => (
        <path
          key={i}
          d={l.d}
          transform={l.rot ? `rotate(${l.rot})` : undefined}
          pathLength="1"
          strokeWidth={l.w}
          className="kolam-line"
          style={{ '--i': i }}
        />
      ))}
    </svg>
  )
}

export function BrassLamp({ className = '', lit = 0 }) {
  const wicks = [
    [36, 118],
    [66, 124],
    [100, 127],
    [134, 124],
    [164, 118],
  ]
  return (
    <svg viewBox="0 0 200 300" className={className} role="img" aria-label="Brass lamp">
      <defs>
        <linearGradient id="brass" x1="0" x2="1">
          <stop offset="0" stopColor="#5c3608" />
          <stop offset="0.3" stopColor="#d4a017" />
          <stop offset="0.5" stopColor="#fff3c4" />
          <stop offset="0.7" stopColor="#e0b030" />
          <stop offset="1" stopColor="#5c3608" />
        </linearGradient>
        <radialGradient id="lampGlow">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lampFlame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#dc2626" />
          <stop offset="0.35" stopColor="#f97316" />
          <stop offset="0.75" stopColor="#fde047" />
          <stop offset="1" stopColor="#fffbeb" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="112" r="95" fill="url(#lampGlow)" className="lamp-aura" style={{ opacity: lit ? 0.35 + lit * 0.13 : 0 }} />
      {/* finial */}
      <path d="M100,8 C108,22 110,34 100,44 C90,34 92,22 100,8 Z" fill="url(#brass)" stroke="#5c3608" strokeWidth="1" />
      <ellipse cx="100" cy="48" rx="9" ry="5" fill="url(#brass)" />
      <rect x="96" y="52" width="8" height="46" fill="url(#brass)" />
      <ellipse cx="100" cy="66" rx="8" ry="5" fill="url(#brass)" />
      <ellipse cx="100" cy="84" rx="10" ry="6" fill="url(#brass)" />
      {/* bowl with five spouts */}
      <path
        d="M22,112 C24,108 30,108 36,112 C46,116 56,118 66,118 C78,120 90,121 100,121 C110,121 122,120 134,118 C144,118 154,116 164,112 C170,108 176,108 178,112 C176,128 150,146 100,148 C50,146 24,128 22,112 Z"
        fill="url(#brass)"
        stroke="#5c3608"
        strokeWidth="1.2"
      />
      <ellipse cx="100" cy="112" rx="70" ry="9" fill="#3b1d07" opacity="0.55" />
      <path d="M40,130 C70,140 130,140 160,130" stroke="#8a5a0b" strokeWidth="1.2" fill="none" />
      {/* stem */}
      <rect x="93" y="148" width="14" height="90" fill="url(#brass)" />
      {[160, 186, 214].map((y, i) => (
        <ellipse key={y} cx="100" cy={y} rx={14 + i * 2} ry="7" fill="url(#brass)" stroke="#5c3608" strokeWidth="0.6" />
      ))}
      {/* base */}
      <path d="M74,238 L126,238 L140,256 L60,256 Z" fill="url(#brass)" stroke="#5c3608" strokeWidth="0.8" />
      <ellipse cx="100" cy="262" rx="58" ry="10" fill="url(#brass)" stroke="#5c3608" strokeWidth="0.8" />
      <path d="M44,266 C44,280 156,280 156,266 L160,282 C160,292 40,292 40,282 Z" fill="url(#brass)" stroke="#5c3608" strokeWidth="0.8" />
      {/* wicks + flames */}
      {wicks.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M-1.5,0 L0,-6 L1.5,0 Z" fill="#fff8e7" />
          <g className={`flame-wrap ${lit > i ? 'is-lit' : ''}`} style={{ '--w': i }}>
            <circle cy="-16" r="14" fill="url(#lampGlow)" />
            <path
              className="animate-flicker"
              style={{ transformBox: 'fill-box', animationDelay: `${i * 0.23}s` }}
              d="M0,-30 C6,-20 7,-12 0,-4 C-7,-12 -6,-20 0,-30 Z"
              fill="url(#lampFlame)"
            />
          </g>
        </g>
      ))}
    </svg>
  )
}
