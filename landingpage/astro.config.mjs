import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

const build = {
  baseURL: '/',
  outDir: './dist',
  siteURL: 'http://localhost:4321/'
}

const env = process.env.NODE_ENV

switch (env) {
  case 'pages':
    build.baseURL = '/astro-landing-page/'
    build.outDir = './docs'
    build.siteURL = 'https://smartzoom.fun/astro-landing-page/'
    break

  case 'production':
    build.siteURL = 'https://smartzoom.fun/'
    break

  default:
    break
}

// https://astro.build/config
export default defineConfig({
  site: build.siteURL,
  base: build.baseURL,
  outDir: build.outDir,
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ]
})
