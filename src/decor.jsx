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

export function Diya({ className = '', delay = 0 }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
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
      <circle cx="40" cy="34" r="26" fill="url(#diyaGlow)" className="animate-halo" style={{ ...fillBox, transformOrigin: 'center', animationDelay: `${delay}s` }} />
      <path
        className="animate-flicker"
        style={{ ...fillBox, animationDelay: `${delay}s` }}
        d="M40,18 C46,28 47,36 40,44 C33,36 34,28 40,18 Z"
        fill="url(#flameGrad)"
      />
      <path d="M12,48 C16,66 64,66 68,48 C58,52 22,52 12,48 Z" fill="url(#clayGrad)" />
      <path d="M12,48 C22,52 58,52 68,48" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
      <path d="M68,48 C72,46 76,44 78,40 C74,46 70,48 66,50 Z" fill="#b45309" />
      <circle cx="30" cy="57" r="1.6" fill="#fbbf24" />
      <circle cx="40" cy="59" r="1.6" fill="#fbbf24" />
      <circle cx="50" cy="57" r="1.6" fill="#fbbf24" />
    </svg>
  )
}

export function Kalash({ className = '' }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
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
