import { defineConfig, searchForWorkspaceRoot } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import { svgBuilder } from './src/plugins/svgBuilder'

function resolve(dir) {
  return path.join(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd())
      ]
    }
  },
  // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
  plugins: [vue(), svgBuilder('src/assets/icons/svg/')],
  resolve: {
    // https://stackoverflow.com/questions/66043612/vue3-vite-project-alias-src-to-not-working
    alias: {
      '@': resolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/styles/variables.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }
})
