import path from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import type { UserConfig } from 'vite'

export default {
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, '.') }
    ]
  },
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [
        path.resolve(__dirname, './icons')
      ],
      symbolId: 'svg-icon/[name]',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'ui': ['element-plus']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
} as UserConfig
