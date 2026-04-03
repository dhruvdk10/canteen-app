import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isRender = process.env.RENDER || false
const basePath = isRender ? '/' : '/canteen-app/'

export default defineConfig({
  plugins: [react()],
  base: basePath,
})
