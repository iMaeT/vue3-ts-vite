import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log(resolve('./src'))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': resolve('./src')
    }
  }
})
