import { defineConfig, searchForWorkspaceRoot } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import ElementPlus from 'unplugin-element-plus/vite'

import { svgBuilder } from './src/plugins/svgBuilder'

function resolve(dir) {
  return path.join(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  // https://cn.vitejs.dev/config/#mode
  // https://github.com/vitejs/vite/issues/2723
  define: {
    'process.platform': null,
    'process.version': null
  },
  server: {
    proxy: {
      '/api': {
        // target: 'localhost:3000',
        target: 'http://220.160.52.164:8213',
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
  plugins: [
    vue(),
    // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
    svgBuilder('src/assets/icons/svg/'),
    // 按需导入 element-plus 组件样式
    // https://github.com/element-plus/unplugin-element-plus
    ElementPlus({})
  ],
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
          // 用于全局导入，以避免需要单独导入每个样式文件。
          // reference:  避免重复引用
          hack: `true; @import (reference) "${resolve('src/styles/variables.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }
})
