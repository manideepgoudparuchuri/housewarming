import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { event, schedule, venue } from './src/data.js'

// Fills {{...}} placeholders in index.html (page title + WhatsApp link preview text) from src/data.js
const invitationMeta = () => ({
  name: 'invitation-meta',
  transformIndexHtml: (html) =>
    html
      .replaceAll('{{DAY_MONTH_YEAR}}', `${event.day} ${event.monthShortEn} ${event.year}`)
      .replaceAll('{{DATE_LONG}}', event.dateEn)
      .replaceAll('{{DATE_SHORT}}', event.dateShortEn)
      .replaceAll('{{MUHURTHAM}}', schedule[0].time)
      .replaceAll('{{PLACE}}', venue.short),
})

export default defineConfig({
  base: '/housewarming/',
  plugins: [react(), tailwindcss(), invitationMeta()],
})
