// Sound engine: conch + temple bell + nadaswaram burst when the doors open,
// then a gentle looping veena. Short clips are decoded into Web Audio buffers
// for precise timing; the long veena track streams from an <audio> element.
// Recordings are CC0 / CC BY from Wikimedia Commons (see README for credits).

const base = import.meta.env.BASE_URL + 'audio/'
const CLIPS = ['conch', 'bell', 'nadaswaram']
const VEENA_VOLUME = 0.65

export function createSound() {
  const Ctx = window.AudioContext || window.webkitAudioContext
  const ctx = Ctx ? new Ctx() : null
  const master = ctx?.createGain()
  if (master) {
    master.gain.value = 1
    master.connect(ctx.destination)
  }

  const buffers = {}
  const ready = Promise.all(
    CLIPS.map(async (name) => {
      if (!ctx) return
      try {
        const res = await fetch(`${base}${name}.mp3`)
        const data = await res.arrayBuffer()
        buffers[name] = await new Promise((ok, fail) => ctx.decodeAudioData(data, ok, fail))
      } catch {
        /* sound is a nice-to-have */
      }
    }),
  )

  const veena = new Audio(`${base}veena.mp3`)
  veena.loop = true
  veena.preload = 'auto'
  veena.volume = 0

  let muted = false
  let fadeTimer = null
  let veenaTimer = null
  const active = new Set()

  function fadeVeena(to, ms) {
    clearInterval(fadeTimer)
    const from = veena.volume
    const start = performance.now()
    fadeTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - start) / ms)
      veena.volume = from + (to - from) * k
      if (k === 1) clearInterval(fadeTimer)
    }, 50)
  }

  function playClip(name, delay = 0, gain = 1) {
    if (!ctx || muted || !buffers[name]) return
    const src = ctx.createBufferSource()
    src.buffer = buffers[name]
    const g = ctx.createGain()
    g.gain.value = gain
    src.connect(g).connect(master)
    src.start(ctx.currentTime + delay)
    active.add(src)
    src.onended = () => active.delete(src)
  }

  function startVeena() {
    if (muted) return
    veena.play().then(() => fadeVeena(VEENA_VOLUME, 4000)).catch(() => {})
  }

  return {
    // Must be called from a user gesture (tap) so mobile browsers allow audio.
    async open() {
      ctx?.resume()
      // unlock the <audio> element inside the gesture so it can start later
      veena.play().then(() => veena.pause()).catch(() => {})
      await Promise.race([ready, new Promise((r) => setTimeout(r, 1500))])
      playClip('conch', 0, 0.9)
      playClip('bell', 0.5, 0.7)
      playClip('nadaswaram', 2.2, 0.85)
      const nadaLen = buffers.nadaswaram ? buffers.nadaswaram.duration : 0
      veenaTimer = setTimeout(startVeena, (2.2 + Math.max(0, nadaLen - 4)) * 1000)
    },
    bell(gain = 0.6) {
      ctx?.resume()
      playClip('bell', 0, gain)
    },
    get muted() {
      return muted
    },
    mute() {
      muted = true
      clearTimeout(veenaTimer)
      active.forEach((s) => {
        try {
          s.stop()
        } catch {
          /* already stopped */
        }
      })
      fadeVeena(0, 500)
      setTimeout(() => veena.pause(), 550)
    },
    unmute() {
      muted = false
      ctx?.resume()
      veena.volume = 0
      startVeena()
    },
  }
}
