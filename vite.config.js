import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Electron loads the production build with a file:// URL. Relative asset
  // paths keep the generated JS and CSS beside dist/index.html instead of
  // incorrectly resolving /assets from the filesystem root.
  base: './',
  plugins: [react()],
})
