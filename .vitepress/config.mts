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
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Une question ?', link: '/pages/contact.md' },
    ],

    lastUpdatedText: 'Mis à jour le',

    sidebar: sidebar,

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
