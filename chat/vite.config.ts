import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
import path from 'path'

// https://vitejs.dev/config/
// const { resolve } = require('path')
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => {
            return `vant/es/${name}/style`;
          },
        },
      ]
    })
  ],
  resolve: {
    // alias: [
    //   {
    //     find: '@',
    //     replacement: path.resolve(__dirname, './src')
    //   },
    //   {
    //     find: 'types',
    //     replacement: path.resolve(__dirname, './src/types')
    //   }
    // ],
    alias: {
      '@': path.resolve(__dirname, "src"),
      '@types': path.resolve(__dirname, "src/types")
    }
  },
})
