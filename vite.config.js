import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allows access via local network IP (0.0.0.0)
    port: 5173, // optional, change if you're using a different port
    proxy: {
      '/compare': 'http://localhost:8000',
      '/api': 'http://localhost:8000',
    }, 
  },
})
