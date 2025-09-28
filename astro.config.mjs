// @ts-check
import { defineConfig } from 'astro/config';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), devtoolsJson()],
    server: {
      watch: {
        usePolling: true,
      },
      allowedHosts: ['95100d7cfb64.ngrok-free.app'],
      port: 4231,
    },
  },

  integrations: [preact()]
});