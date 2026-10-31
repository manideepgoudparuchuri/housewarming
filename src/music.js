// Gentle devotional ambience synthesized with the Web Audio API
// (tanpura-style drone, bansuri-like melody in Raga Mohanam, temple bell).
// Generated in the browser, so there are no audio files or copyright concerns.

const SA = 261.63 // C4
const ratio = { S: 1, R: 9 / 8, G: 5 / 4, P: 3 / 2, D: 5 / 3, "S'": 2, "R'": 9 / 4, ',D': 5 / 6, ',P': 3 / 4 }

// [swara, beats]; '-' is a rest
const phrase = [
  ['P', 1.5], ['D', 0.5], ["S'", 2], ['D', 1], ['P', 1], ['G', 2], ['-', 1],
  ['G', 1], ['P', 1], ['D', 1], ['P', 1], ['G', 1], ['R', 1], ['S', 2], ['-', 1],
  ['R', 1], ['G', 1], ['P', 1.5], ['D', 0.5], ["S'", 1], ["R'", 1], ["S'", 2], ['-', 1],
  ["S'", 1], ['D', 1], ['P', 1], ['G', 1], ['R', 1.5], ['G', 0.5], ['R', 1], ['S', 1], [',D', 1], ['S', 3], ['-', 2],
]

const BEAT = 60 / 66

export function createMusic() {
  const Ctx = window.AudioContext || window.webkitAudioContext
  const ctx = new Ctx()
  const master = ctx.createGain()
  master.gain.value = 0
  const comp = ctx.createDynamicsCompressor()
  master.connect(comp).connect(ctx.destination)

  // simple generated reverb
  const reverb = ctx.createConvolver()
  const len = ctx.sampleRate * 3.2
  const impulse = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let c = 0; c < 2; c++) {
    const d = impulse.getChannelData(c)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6)
  }
  reverb.buffer = impulse
  const wet = ctx.createGain()
  wet.gain.value = 0.45
  reverb.connect(wet).connect(master)

  const bus = ctx.createGain()
  bus.connect(master)
  bus.connect(reverb)

  function tanpura(freq, t) {
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.05, t + 0.08)
    g.gain.exponentialRampToValueAtTime(0.0008, t + 4.2)
    g.connect(bus)
    ;[1, 2, 3, 4, 5, 6].forEach((h, i) => {
      const o = ctx.createOscillator()
      o.frequency.value = freq * h * (1 + (Math.random() - 0.5) * 0.002)
      const hg = ctx.createGain()
      hg.gain.value = [1, 0.6, 0.5, 0.35, 0.25, 0.15][i]
      o.connect(hg).connect(g)
      o.start(t)
      o.stop(t + 4.3)
    })
  }

  function flute(freq, t, dur) {
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.value = freq
    const o2 = ctx.createOscillator()
    o2.type = 'triangle'
    o2.frequency.value = freq * 2
    const o2g = ctx.createGain()
    o2g.gain.value = 0.08
    const vib = ctx.createOscillator()
    vib.frequency.value = 5
    const vibG = ctx.createGain()
    vibG.gain.setValueAtTime(0, t)
    vibG.gain.linearRampToValueAtTime(freq * 0.006, t + Math.min(dur, 0.6))
    vib.connect(vibG).connect(o.frequency)
    const g = ctx.createGain()
    const end = t + dur
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.11, t + 0.12)
    g.gain.setValueAtTime(0.1, Math.max(t + 0.12, end - 0.15))
    g.gain.linearRampToValueAtTime(0, end + 0.25)
    o.connect(g)
    o2.connect(o2g).connect(g)
    g.connect(bus)
    ;[o, o2, vib].forEach((n) => {
      n.start(t)
      n.stop(end + 0.3)
    })
  }

  function bell(t) {
    const base = SA * 2
    ;[[1, 0.06], [2.76, 0.03], [5.4, 0.018], [8.93, 0.01]].forEach(([m, a]) => {
      const o = ctx.createOscillator()
      o.frequency.value = base * m
      const g = ctx.createGain()
      g.gain.setValueAtTime(a, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 5)
      o.connect(g).connect(bus)
      o.start(t)
      o.stop(t + 5.1)
    })
  }

  const dronePattern = [SA * 0.75, SA, SA, SA * 0.5]
  let nextDrone = 0
  let droneIdx = 0
  let nextNote = 0
  let noteIdx = 0
  let nextBell = 0
  let timer = null

  function schedule() {
    const horizon = ctx.currentTime + 0.6
    while (nextDrone < horizon) {
      tanpura(dronePattern[droneIdx % 4] / 2, nextDrone)
      droneIdx++
      nextDrone += 1.05
    }
    while (nextNote < horizon) {
      const [sw, beats] = phrase[noteIdx % phrase.length]
      const dur = beats * BEAT
      if (sw !== '-') flute(SA * ratio[sw], nextNote, dur * 0.95)
      noteIdx++
      nextNote += dur
    }
    while (nextBell < horizon) {
      bell(nextBell)
      nextBell += 17
    }
  }

  return {
    async play() {
      await ctx.resume()
      const now = ctx.currentTime
      if (!timer) {
        nextDrone = now + 0.05
        nextNote = Math.max(nextNote, now + 2.2)
        nextBell = Math.max(nextBell, now + 0.1)
        timer = setInterval(schedule, 150)
        schedule()
      }
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0.55, now + 2.5)
    },
    pause() {
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + 0.6)
      setTimeout(() => {
        clearInterval(timer)
        timer = null
        ctx.suspend()
      }, 700)
    },
  }
}
