import { defineConfig } from 'vitepress'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cours",
  description: "Cette documentation est réalisée par Valentin Brosseau (pour le BTS SIO, GRETA, et dans différentes interventions), vous retrouverez dans l’ensemble des cours (slide) ainsi que les TP.",
  srcExclude: ['public/**/*.md'],
  ignoreDeadLinks: [
    /^https?:\/\/localhost:*/,
  ],
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'icon', href: '/icons/icon-72x72.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3e80af' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3e80af' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#3e80af' }],
    ['meta', { name: 'google-site-verification', content: 'IpzGtrtih2KT0f0XkFOsx0qHPBihE6JADKtXpO-KN-4' }],
    ['script', { src: '/webllm/main.js', type: 'module' }],
    [
      'script',
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-8EFZPGCSXK' },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-8EFZPGCSXK');"
    ]
  ],
  lang: 'fr-FR',
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  },
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/c4software/bts-sio/tree/master/:path'
    },

    nav: [
      { text: 'Accueil', link: '/' },
      {
        text: 'Catégories',
        items: [
          { text: 'Le Web', link: '/pages/categories/le-web.md' },
          { text: 'Le mobile', link: '/pages/categories/le-mobile.md' },
          { text: 'Les serveurs / DevOps', link: '/pages/categories/les-serveurs.md' },
          { text: 'Les concepts', link: '/pages/categories/les-concepts.md' },
          { text: 'Les aides mémoires', link: '/pages/categories/aide-memoires.md' },
        ]
      },
      {
        text: 'Les parcours',
        items: [
          { text: 'Les TP web de base', link: '/pages/categories/les-tp-web-de-base.md' },
          { text: 'Les TP PHP avancés', link: '/pages/categories/les-tp-php-avances.md' },
          { text: 'Les TP JavaScript', link: '/pages/categories/les-tp-javascript.md' },
          { text: 'Les TP serveur / DevOps', link: '/pages/categories/les-tp-devops.md' },
          { text: 'Les TP mobile', link: '/pages/categories/les-tp-mobile.md' },
        ]
      },
      { text: 'Une question ?', link: '/pages/contact.md' },
    ],

    lastUpdatedText: 'Mis à jour le',

    sidebar: sidebar,
    logo: '/icons/icon-192x192.png',

    outline: {
      label: "Sommaire"
    },

    docFooter: {
      prev: false,
      next: false
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/c4software/bts-sio' },
      { icon: 'twitter', link: 'https://twitter.com/c4software' }
    ]
  }
})
