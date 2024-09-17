import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  //change port for dev
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    // for hot reload
    watch: {
      usePolling: true,
      interval: 500,
    }
  },
  //change port for production
  preview: {
    port: 3001,
    strictPort: true
  },
})