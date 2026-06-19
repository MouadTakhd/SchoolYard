import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    port: 5174,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@schoolyard/types': path.resolve(__dirname, '../../packages/types/src/index.ts'),
    },
  },
})
