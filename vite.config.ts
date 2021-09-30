import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log(resolve('./src'))
// https://vitejs.dev/config/
// https://stackoverflow.com/questions/66043612/vue3-vite-project-alias-src-to-not-working
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  }
})
