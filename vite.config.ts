import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    plugins: [
      tailwindcss(),
      ...(isBuild
        ? [viteStaticCopy({
              targets: [
                {
                  src: 'src/**/*',
                  dest: 'src/', 
                },
              ],
            }),
          ]
        : []),
    ],
    server: {
      port: 3010,
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          contact: resolve(__dirname, 'contacts-page.html'),
          privacy: resolve(__dirname, 'dataprivacy.html'),
        },
      },
    },
  }
})
