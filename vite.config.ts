import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        display: 'fullscreen',
        name: 'Barbershop',
        short_name: 'BarberApp',
        description: 'Aplicație pentru programări la frizerie',
        theme_color: '#1A2331',
        icons: [
          {
            src: 'assets/images/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/images/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})