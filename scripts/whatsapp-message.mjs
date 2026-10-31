// Builds the WhatsApp invitation text (Telugu + English) from src/data.js.
// Usage: npm run message   → prints it and writes video-out/whatsapp-message.txt
import fs from 'node:fs'
import path from 'node:path'
import { blessing, event, hosts, invitation, schedule, site, title, to24h, venue } from '../src/data.js'

function teluguTime(time) {
  const [h, m] = to24h(time).split(':').map(Number)
  const part = h < 12 ? 'ఉదయం' : h < 16 ? 'మధ్యాహ్నం' : h < 19 ? 'సాయంత్రం' : 'రాత్రి'
  return `${part} ${h % 12 || 12}:${String(m).padStart(2, '0')}`
}

const familyTe = hosts.family.map((f) => f.namesTe.join(' & '))
const familyEn = hosts.family.map((f) => f.namesEn.join(' & '))

const telugu = `🙏 *${blessing.te}* 🙏

🏡 *${title.te.replace('మహోత్సవం', 'మహోత్సవ')} ఆహ్వానం* 🏡

${invitation.te}

📅 *${event.dateTe}*

${schedule.map((s) => `${s.icon} ${s.te} – ${teluguTime(s.time)}`).join('\n')}

📍 *వేదిక:* ${venue.te}
🗺️ దారి: ${venue.mapsLink}

✨ ఆహ్వాన పత్రిక: ${site.url}

*${hosts.labelTe}:*
${[hosts.namesTe, ...familyTe].join('\n')}

మీ రాకకై ఎదురుచూస్తూ 🙏`

const english = `🙏 *${blessing.en}* 🙏

🏡 *${title.en} (Housewarming) Invitation* 🏡

${invitation.en}

📅 *${event.dateEn}*

${schedule.map((s) => `${s.icon} ${s.en} – ${s.time}`).join('\n')}

📍 *Venue:* ${venue.en}
🗺️ Directions: ${venue.mapsLink}

✨ Invitation: ${site.url}

*With love,*
${[hosts.namesEn, ...familyEn].join('\n')}

Awaiting your gracious presence 🙏`

const text = `===== TELUGU =====\n\n${telugu}\n\n\n===== ENGLISH =====\n\n${english}\n`
const outDir = path.resolve(import.meta.dirname, '../video-out')
fs.mkdirSync(outDir, { recursive: true })
const out = path.join(outDir, 'whatsapp-message.txt')
fs.writeFileSync(out, text)
console.log(text)
console.error(`Saved → ${out}`)
