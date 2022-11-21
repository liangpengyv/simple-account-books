import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer()
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-lib': ['vue', 'pinia', 'vue-router'],
          'naive-ui-lib': ['date-fns', 'date-fns-tz', 'vueuc', 'lodash-es'],
          'naive-ui': ['naive-ui']
        }
      }
    }
  }
})
