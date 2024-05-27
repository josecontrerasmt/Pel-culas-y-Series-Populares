import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'https://josecontrerasmt.github.io/Peliculas-y-Series-Populares'
})
