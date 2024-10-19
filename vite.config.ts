import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/myteam/',
  build: {
    outDir: 'myteam',
  },
  plugins: [react()],
  server: {
    hmr: true,
  },
})