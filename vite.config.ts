import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { PROXY_API } from './src/constans'

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
      host: true,
      port: Number(envs.VITE_PORT),
      proxy: {
        [PROXY_API]: {
          target: envs.VITE_API_HOST ?? 'http://localhost:3666',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${PROXY_API}`), ''),
        },
      },
      watch: {
        ignored: ['**/src/db.json'],
      },
    },
    resolve: {
      alias: {
        '#': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
