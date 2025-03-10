import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envs = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools({
        launchEditor: 'webstorm',
      }),
      tailwindcss(),
    ],
    server: {
      port: Number(envs.VITE_PORT),
      proxy: {
        '/api': {
          target: envs.VITE_API_HOST ?? 'http://localhost:3666',
          changeOrigin: true,
          rewrite: (path) =>path.replace(/^\/api/, '')
        },
      }
    },
    resolve: {
      alias: {
        '#': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
