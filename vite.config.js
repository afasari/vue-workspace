import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-workspace/',
  plugins: [vue()],
  server: {
    watch: {
      usePolling: true
    },
  }
})