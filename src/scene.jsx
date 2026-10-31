import { Diya, Kalash, Marigold } from './decor'

// Original illustration: Gomata (cow + calf) leading the Gruhapravesam into a decorated doorway.
const INK = '#4a3420'
const SKIN = '#8d5524'
const HAIR = '#1f1a17'
const fb = (origin) => ({ transformBox: 'fill-box', transformOrigin: origin })

function Leg({ x, far, phase }) {
  return (
    <g className={`gp-leg ${phase}`} style={fb('50% 0%')}>
      <path
        d={`M${x - 8},-62 C${x - 9},-34 ${x - 6},-20 ${x - 5},-7 L${x + 5},-7 C${x + 6},-22 ${x + 8},-38 ${x + 8},-62 Z`}
        fill={far ? '#ece2cc' : '#fffaf0'}
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d={`M${x - 6},-7 L${x + 6},-7 L${x + 7},0 L${x - 7},0 Z`} fill="#3b2a1a" />
    </g>
  )
}

function Cow({ calf = false }) {
  return (
    <g strokeLinejoin="round">
      <Leg x={-50} far phase="gp-a" />
      <Leg x={40} far phase="gp-b" />
      <g className="gp-tail" style={fb('50% 0%')}>
        <path d="M-76,-98 C-92,-90 -90,-62 -87,-40" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M-76,-98 C-92,-90 -90,-62 -87,-40" stroke="#fffaf0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M-87,-44 C-93,-36 -91,-26 -87,-22 C-83,-26 -81,-36 -87,-44 Z" fill="#3b2a1a" />
      </g>
      <path
        d="M-78,-92 C-80,-112 -50,-118 -10,-114 C10,-113 25,-116 32,-122 C40,-132 56,-130 60,-118 C64,-108 66,-98 66,-90 C66,-70 60,-58 50,-56 C20,-52 -20,-52 -55,-56 C-72,-58 -80,-70 -78,-92 Z"
        fill="#fffaf0"
        stroke={INK}
        strokeWidth="1.8"
      />
      <path d="M-40,-62 C-20,-58 10,-58 35,-62" stroke="#e7dcc4" strokeWidth="4" fill="none" strokeLinecap="round" />
      {!calf && (
        <g>
          <path d="M-36,-114 C-10,-118 14,-118 30,-121 L35,-78 C10,-74 -15,-74 -39,-78 Z" fill="#b91c1c" stroke="#f5c542" strokeWidth="3" />
          <path d="M-32,-108 C-8,-111 12,-111 28,-114" stroke="#f5c542" strokeWidth="1" strokeDasharray="2 4" fill="none" />
          {[-30, -16, -2, 12, 26].map((x) => (
            <circle key={x} cx={x} cy={-96} r="2.2" fill="#f5c542" />
          ))}
          {[-36, -27, -18, -9, 0, 9, 18, 27].map((x) => (
            <path key={x} d={`M${x},-77 l2,7 l2,-7`} stroke="#f5c542" strokeWidth="1.4" fill="none" />
          ))}
        </g>
      )}
      <Leg x={-38} phase="gp-b" />
      <Leg x={52} phase="gp-a" />
      <path d="M58,-96 C70,-82 74,-68 66,-58 C62,-66 58,-74 55,-82 Z" fill="#fffaf0" stroke={INK} strokeWidth="1.6" />
      <g className="gp-head" style={fb('0% 60%')}>
        {calf ? (
          <path d="M84,-118 l2,-7 l3,7 M91,-117 l2,-6 l3,7" stroke={INK} strokeWidth="1.8" fill="#d6c3a0" />
        ) : (
          <g stroke={INK} strokeWidth="1.4">
            <path d="M82,-117 C79,-131 83,-141 92,-147 C88,-139 88,-128 90,-118 Z" fill="#ea580c" />
            <path d="M90,-117 C90,-131 96,-140 105,-144 C100,-136 98,-126 98,-116 Z" fill="#f59e0b" />
            <circle cx="92" cy="-147" r="2.4" fill="#f5c542" />
            <circle cx="105" cy="-144" r="2.4" fill="#f5c542" />
          </g>
        )}
        <path d="M84,-114 C78,-123 68,-126 62,-123 C68,-117 75,-113 84,-111 Z" fill="#f1e6cf" stroke={INK} strokeWidth="1.5" />
        <path
          d="M58,-112 C70,-122 88,-122 96,-116 C106,-108 112,-92 112,-82 C112,-74 104,-72 98,-74 C92,-78 84,-92 74,-96 C66,-98 60,-100 58,-104 Z"
          fill="#fffaf0"
          stroke={INK}
          strokeWidth="1.8"
        />
        <ellipse cx="105" cy="-79" rx="7" ry="5" fill="#e7b9a4" stroke={INK} strokeWidth="1.2" />
        <circle cx="91" cy="-105" r="2.2" fill={INK} />
        <path d="M95,-114 C98,-112 100,-108 100,-104" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        <circle cx="98" cy="-111" r="2.3" fill="#dc2626" />
      </g>
      {[
        [61, -111],
        [64, -103],
        [67, -95],
        [70, -87],
        [70, -79],
        [67, -71],
      ].map(([x, y], i) => (
        <Marigold key={i} x={x} y={y} r={calf ? 4 : 5} tone={i % 2 ? 'yellow' : 'orange'} />
      ))}
      {!calf && (
        <g>
          <path d="M62,-66 l-5,10 h10 z" fill="#d4a017" stroke="#7c4a0b" strokeWidth="1" />
          <circle cx="62" cy="-55" r="1.8" fill="#7c4a0b" />
        </g>
      )}
    </g>
  )
}

function BananaLeaf({ x, y, rot, s = 1, delay }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <g className="gp-leaf" style={{ ...fb('50% 100%'), animationDelay: `${delay}s` }}>
        <path d="M0,0 C-26,-40 -26,-120 0,-175 C26,-120 26,-40 0,0 Z" fill="url(#gpLeaf)" stroke="#1f4d14" strokeWidth="1.2" />
        <path d="M0,-4 L0,-168" stroke="#a3d977" strokeWidth="1.6" opacity="0.8" />
        {[-40, -75, -110, -140].map((ty) => (
          <path key={ty} d={`M0,${ty} L-17,${ty + 14} M0,${ty - 8} L16,${ty + 6}`} stroke="#1f4d14" strokeWidth="0.8" opacity="0.6" />
        ))}
      </g>
    </g>
  )
}

function Man() {
  return (
    <g strokeLinejoin="round">
      <ellipse cx="-9" cy="-3" rx="7" ry="3.5" fill={SKIN} />
      <ellipse cx="9" cy="-3" rx="7" ry="3.5" fill={SKIN} />
      <path d="M-25,-90 L25,-90 L29,-6 L-29,-6 Z" fill="#fffdf5" stroke="#cbb994" strokeWidth="1.4" />
      <path d="M-28,-12 L28,-12" stroke="#d4a017" strokeWidth="3" />
      {[-12, 0, 12].map((x) => (
        <path key={x} d={`M${x},-86 L${x * 1.2},-14`} stroke="#e6dcc0" strokeWidth="1.2" />
      ))}
      <path d="M-27,-148 C-38,-130 -40,-110 -37,-94" stroke="#f2cf3f" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M27,-148 C38,-130 40,-110 37,-94" stroke="#f2cf3f" strokeWidth="12" strokeLinecap="round" fill="none" />
      <circle cx="-37" cy="-89" r="5.5" fill={SKIN} />
      <circle cx="37" cy="-89" r="5.5" fill={SKIN} />
      <path d="M-29,-150 C-31,-120 -31,-102 -28,-82 L28,-82 C31,-102 31,-120 29,-150 C20,-158 -20,-158 -29,-150 Z" fill="#f2cf3f" stroke="#a17f12" strokeWidth="1.4" />
      <path d="M-27,-153 C-12,-158 -4,-152 -6,-140 L-9,-92 L-25,-92 C-27,-112 -28,-135 -27,-153 Z" fill="#fffdf5" stroke="#cbb994" strokeWidth="1.2" />
      <path d="M-9,-140 L-11,-92" stroke="#d4a017" strokeWidth="2.5" />
      <rect x="-6" y="-166" width="12" height="12" fill={SKIN} />
      <ellipse cx="-16" cy="-176" rx="3.5" ry="5" fill={SKIN} />
      <ellipse cx="16" cy="-176" rx="3.5" ry="5" fill={SKIN} />
      <circle cx="0" cy="-178" r="17" fill={HAIR} />
    </g>
  )
}

function Woman() {
  return (
    <g strokeLinejoin="round">
      <path d="M-25,-94 C-29,-60 -33,-26 -35,-4 L35,-4 C31,-26 28,-60 25,-94 Z" fill="#7cb342" stroke="#3f6b1a" strokeWidth="1.4" />
      <path d="M-34,-10 L34,-10" stroke="#b91c1c" strokeWidth="9" />
      {[-26, -16, -6, 4, 14, 24].map((x) => (
        <circle key={x} cx={x} cy="-10" r="1.6" fill="#f5c542" />
      ))}
      {[-14, 0, 14].map((x) => (
        <path key={x} d={`M${x * 0.6},-88 L${x},-16`} stroke="#5f9230" strokeWidth="1.2" />
      ))}
      <path d="M-22,-146 C-32,-128 -34,-110 -32,-96" stroke={SKIN} strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M22,-146 C32,-128 34,-110 32,-96" stroke={SKIN} strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M-24,-146 C-28,-140 -29,-134 -29,-130" stroke="#b91c1c" strokeWidth="10" strokeLinecap="round" />
      <path d="M24,-146 C28,-140 29,-134 29,-130" stroke="#b91c1c" strokeWidth="10" strokeLinecap="round" />
      <path d="M-35,-104 L-29,-102 M-35,-100 L-29,-98 M35,-104 L29,-102 M35,-100 L29,-98" stroke="#dc2626" strokeWidth="2.2" />
      <path d="M-22,-148 C-24,-126 -24,-110 -22,-92 L22,-92 C24,-110 24,-126 22,-148 C14,-154 -14,-154 -22,-148 Z" fill="#7cb342" stroke="#3f6b1a" strokeWidth="1.4" />
      <path d="M-21,-150 C-6,-153 6,-149 11,-142 L17,-60 L-5,-55 C-12,-80 -18,-120 -21,-150 Z" fill="#6aa336" stroke="#3f6b1a" strokeWidth="1.2" />
      <path d="M11,-142 L17,-60 L-5,-55" stroke="#b91c1c" strokeWidth="6" fill="none" />
      {[-130, -115, -100, -85, -70].map((y) => (
        <circle key={y} cx={12 + (y + 142) * 0.07} cy={y} r="1.5" fill="#f5c542" />
      ))}
      <rect x="-5" y="-158" width="10" height="10" fill={SKIN} />
      <circle cx="0" cy="-168" r="15" fill={HAIR} />
      <path d="M0,-156 C2,-140 -1,-120 1,-96" stroke={HAIR} strokeWidth="9" strokeLinecap="round" fill="none" />
      {[-150, -143, -136, -129, -122].map((y) => (
        <g key={y}>
          <circle cx="-6" cy={y} r="2.6" fill="#fffdf5" stroke="#d6d3c4" strokeWidth="0.5" />
          <circle cx="6" cy={y + 3} r="2.6" fill="#fffdf5" stroke="#d6d3c4" strokeWidth="0.5" />
        </g>
      ))}
      <circle cx="0" cy="-160" r="3" fill="#f97316" />
      <circle cx="1" cy="-94" r="3.5" fill="#d4a017" />
    </g>
  )
}

function Star({ x, y, d }) {
  return (
    <path
      className="gp-twinkle"
      style={{ ...fb('50% 50%'), animationDelay: `${d}s` }}
      d={`M${x},${y - 7} L${x + 1.6},${y - 1.6} L${x + 7},${y} L${x + 1.6},${y + 1.6} L${x},${y + 7} L${x - 1.6},${y + 1.6} L${x - 7},${y} L${x - 1.6},${y - 1.6} Z`}
      fill="#fde68a"
    />
  )
}

export function GruhaScene({ className = '' }) {
  return (
    <svg viewBox="0 0 600 400" className={className} role="img" aria-label="A cow and calf walking into the decorated doorway of the new home while the couple welcomes them">
      <defs>
        <radialGradient id="gpBg" cx="0.45" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.6" stopColor="#f8e3a3" />
          <stop offset="1" stopColor="#efcd7c" />
        </radialGradient>
        <linearGradient id="gpFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ecd08a" />
          <stop offset="1" stopColor="#ddb565" />
        </linearGradient>
        <linearGradient id="gpRoom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8e1" />
          <stop offset="1" stopColor="#f6cf73" />
        </linearGradient>
        <radialGradient id="gpGlow">
          <stop offset="0" stopColor="#fffbeb" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gpLeaf" x1="0" x2="1">
          <stop offset="0" stopColor="#2f6b1f" />
          <stop offset="0.5" stopColor="#4d9a2a" />
          <stop offset="1" stopColor="#2f6b1f" />
        </linearGradient>
        <linearGradient id="gpWood" x1="0" x2="1">
          <stop offset="0" stopColor="#6b3f17" />
          <stop offset="0.5" stopColor="#9a6331" />
          <stop offset="1" stopColor="#6b3f17" />
        </linearGradient>
      </defs>

      <rect width="600" height="400" fill="url(#gpBg)" />
      {[
        [120, 60, 70],
        [260, 200, 90],
        [80, 300, 60],
      ].map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} fill="#e9c46a" opacity="0.18" />
      ))}
      <rect y="338" width="600" height="62" fill="url(#gpFloor)" />
      <path d="M0,338 H600" stroke="#c99a45" strokeWidth="1.2" />

      {/* Doorway */}
      <rect x="350" y="62" width="200" height="284" fill="url(#gpWood)" stroke="#4a2a0c" strokeWidth="2" />
      <rect x="362" y="74" width="176" height="272" fill="url(#gpRoom)" />
      <ellipse className="gp-glow" style={fb('50% 50%')} cx="450" cy="250" rx="110" ry="120" fill="url(#gpGlow)" />
      <Diya x="430" y="300" width="40" height="40" delay={0.3} />
      <g className="gp-door-l" style={fb('0% 50%')}>
        <rect x="362" y="74" width="88" height="272" fill="#8b5a2b" stroke="#4a2a0c" strokeWidth="1.5" />
        <rect x="372" y="88" width="68" height="110" rx="4" fill="none" stroke="#5c3a1a" strokeWidth="2" />
        <rect x="372" y="212" width="68" height="120" rx="4" fill="none" stroke="#5c3a1a" strokeWidth="2" />
        <circle cx="440" cy="206" r="3.5" fill="#f5c542" />
      </g>
      <g className="gp-door-r" style={fb('100% 50%')}>
        <rect x="450" y="74" width="88" height="272" fill="#8b5a2b" stroke="#4a2a0c" strokeWidth="1.5" />
        <rect x="460" y="88" width="68" height="110" rx="4" fill="none" stroke="#5c3a1a" strokeWidth="2" />
        <rect x="460" y="212" width="68" height="120" rx="4" fill="none" stroke="#5c3a1a" strokeWidth="2" />
        <circle cx="460" cy="206" r="3.5" fill="#f5c542" />
      </g>
      <rect x="344" y="344" width="212" height="10" rx="2" fill="#f5c542" stroke="#b8860b" />
      {[360, 384, 408, 432, 456, 480, 504, 528].map((x) => (
        <circle key={x} cx={x + 8} cy="349" r="2.6" fill="#dc2626" />
      ))}
      {Array.from({ length: 22 }, (_, i) => (
        <g key={i}>
          <Marigold x={344} y={74 + i * 12.6} r={6.5} tone={i % 2 ? 'yellow' : 'orange'} />
          <Marigold x={556} y={74 + i * 12.6} r={6.5} tone={i % 2 ? 'orange' : 'yellow'} />
        </g>
      ))}
      {[390, 450, 510].map((x, k) => (
        <g key={x} className="animate-swing" style={{ ...fb('50% 0%'), animationDelay: `${k * 0.5}s` }}>
          <path d={`M${x},66 V122`} stroke="#b8860b" strokeWidth="1" />
          {[0, 1, 2, 3].map((j) => (
            <Marigold key={j} x={x} y={76 + j * 12} r={6} tone={(j + k) % 2 ? 'orange' : 'yellow'} />
          ))}
          <path d={`M${x},126 l-5,12 l5,-3 l5,3 z`} fill="#3f8a22" />
        </g>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i} transform={`translate(${354 + i * 17} 66)`}>
          <g className="animate-sway" style={{ ...fb('50% 0%'), animationDelay: `${(i % 4) * 0.4}s` }}>
            <path d="M0,0 C7,9 8,26 0,40 C-8,26 -7,9 0,0 Z" fill="url(#gpLeaf)" stroke="#1f4d14" strokeWidth="0.7" />
          </g>
        </g>
      ))}
      <path d="M338,60 Q450,68 562,60" stroke="#b8860b" strokeWidth="2.5" fill="none" />
      {Array.from({ length: 17 }, (_, i) => (
        <Marigold key={i} x={340 + i * 13.75} y={61 + Math.sin((i / 16) * Math.PI) * 3} r={7.5} tone={i % 2 ? 'yellow' : 'orange'} />
      ))}
      {[
        [380, 110, 0],
        [520, 130, 0.9],
        [450, 160, 1.6],
        [410, 230, 2.2],
        [495, 215, 0.5],
      ].map(([x, y, d]) => (
        <Star key={`${x}${y}`} x={x} y={y} d={d} />
      ))}

      {/* Welcome text */}
      <g className="gp-text">
        <text x="230" y="118" textAnchor="middle" className="font-telugu" fontSize="34" fill="#7a1020">
          సుస్వాగతం
        </text>
        <text x="230" y="152" textAnchor="middle" className="font-script" fontSize="23" fill="#7a1020">
          Welcome to our new home
        </text>
        <path d="M170,168 H290" stroke="#b8860b" strokeWidth="1.2" />
        <circle cx="230" cy="168" r="3.5" fill="#ea580c" />
      </g>

      {/* Couple */}
      <ellipse cx="545" cy="380" rx="70" ry="7" fill="#b98a3e" opacity="0.35" />
      <g transform="translate(508 380)">
        <Man />
      </g>
      <g transform="translate(572 382)">
        <Woman />
      </g>

      {/* Gomata + calf */}
      <ellipse className="gp-shadow" cx="330" cy="358" rx="88" ry="7" fill="#b98a3e" opacity="0.4" />
      <g transform="translate(312 356)">
        <g className="gp-walk" style={{ '--from': '-440px' }}>
          <g className="gp-bob">
            <Cow />
          </g>
        </g>
      </g>
      <g transform="translate(262 376) scale(0.56)">
        <g className="gp-walk gp-calf" style={{ '--from': '-700px' }}>
          <g className="gp-bob">
            <Cow calf />
          </g>
        </g>
      </g>

      {/* Banana plant + kalasam in front */}
      <path d="M34,400 C36,340 40,290 44,250" stroke="#5d7f1f" strokeWidth="16" fill="none" strokeLinecap="round" />
      <BananaLeaf x={44} y={255} rot={-52} s={1} delay={0} />
      <BananaLeaf x={44} y={250} rot={-14} s={1.05} delay={0.8} />
      <BananaLeaf x={44} y={258} rot={22} s={0.85} delay={1.6} />
      <BananaLeaf x={40} y={300} rot={62} s={0.7} delay={0.4} />
      <rect x="66" y="368" width="84" height="10" rx="2" fill="#7c4a1e" />
      <rect x="72" y="378" width="8" height="22" fill="#6b3f17" />
      <rect x="136" y="378" width="8" height="22" fill="#6b3f17" />
      <Kalash x="68" y="272" width="80" height="100" />
    </svg>
  )
}
