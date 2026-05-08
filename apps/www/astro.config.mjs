// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://synch.run",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/billing/success/"),
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko", "ja", "zh-cn", "zh-tw"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
