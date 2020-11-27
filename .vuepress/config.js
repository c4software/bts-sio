module.exports = {
  title: "Cours",
  description: "Cette documentation est réalisée par Valentin Brosseau (pour le BTS SIO - SLAM 5, mais également dans divers cours et interventions), vous retrouverez dans l’ensemble des cours (slide) ainsi que les TP.",
  plugins: [
    ["@vuepress/last-updated", {
      dateOptions: {
        hour12: false,
        timeZone: "Europe/Paris",
        timeZoneName: "short",
        hourCycle: "h24"
      }
    }],
    '@vuepress/medium-zoom',
    ["vuepress-plugin-code-copy", true],
    ['@vuepress/pwa', { serviceWorker: false, updatePopup: false }],
    ['@vuepress/google-analytics', { 'ga': 'UA-2107503-8' }]
  ],
  locales: {
    '/': {
      lang: 'fr-FR',
      title: "Cours",
      description: "Cette documentation est réalisée par Valentin Brosseau (pour le BTS SIO - SLAM 5, mais également dans divers cours et interventions), vous retrouverez dans l’ensemble des cours (slide) ainsi que les TP.",
    }
  },
  lang: "fr-FR",
  dest: "docs",
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
    ['meta', { name: 'google-site-verification', content: 'IpzGtrtih2KT0f0XkFOsx0qHPBihE6JADKtXpO-KN-4' }]
  ],
  evergreen: true,
  themeConfig: {
    /** Objectif: dissuasion rien de plus… */
    protected: {
      pass: 'eseo',
      paths: [
        "/cours/android.html",
        "/tp/android/android-base-tp.html",
        "/tp/android/app-ble-network.html"
      ]
    },
    docsBranch: 'master',
    editLinks: true,
    nextLinks: false,
    prevLinks: false,
    displayAllHeaders: true,
    searchPlaceholder: 'Rechercher...',
    lastUpdated: 'Mis à jour le',
    sidebarDepth: 0,
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Une question ?', link: '/pages/contact.md' },
    ],
    sidebar: [
      ["/", "Introduction"],
      { collapsable: true, title: "Aides mémoires", children: [["cheatsheets/git/", "Git"], ["cheatsheets/html/", "Html"], ["cheatsheets/cordova/", "Cordova"], ["cheatsheets/docker/", "Docker"], ["cheatsheets/vuejs/", "VueJS"]] },

      {
        title: "Les bases Web",
        initialOpenGroupIndex: -1,
        children: [
          { title: "En + du cours", children: ["cheatsheets/html/", "tp/html_css/support.md", "tp/php/support.md", "tp/javascript/support.md"] },
          { title: "HTML + CSS", children: ["cours/introduction_html_css", "tp/html_css/tp1.md", "tp/html_css/tp2.md", "tp/html_css/tp3.md", "tp/html_css/tp4.md", "tp/html_css/tp5.md"] },
          { title: "PHP", children: ["cours/introduction_php", "tp/php/tp1.md", "tp/php/tp1.1.md", "tp/php/tp2.md", "tp/php/tp3.md", "tp/php/tp4.md", "tp/php/tp5.md"] },
          { title: "Javascript", children: ["cours/introduction_javascript"] },
          { title: "Librairies", children: ["tp/html_css/bootstrap.md", "tp/html_css/tailwind.md"] }
        ]
      },

      {
        title: "Le PHP",
        initialOpenGroupIndex: -1,
        children: [
          { title: "Les bases", children: ["cours/introduction_php", "tp/php/support.md"] },
          { title: "Les TP basiques", children: ["tp/php/tp1.md", "tp/php/tp1.1.md", "tp/php/tp2.md", "tp/php/tp3.md", "tp/php/tp4.md", "tp/php/tp5.md"] },
          { title: "Laravel", children: ["cours/laravel", "/tp/laravel/introduction", "/tp/laravel/application_todo_list", "/tp/laravel/creation_api"] }
        ]
      },

      {
        title: "Le JavaScript",
        initialOpenGroupIndex: -1,
        children: [
          { title: "Les bases", children: ["cours/introduction_javascript"] },
          { title: "Les TP basiques", children: ["tp/javascript/tp1.md"] },
          { title: "Javascript avancé", children: ["cours/javascript_avances", "tp/javascript_avances/introduction", "tp/javascript_avances/revision"] },
          { title: "Les frameworks", children: ["cours/framework_javascript", "/tp/javascript_avances/introduction.md", "/tp/vuejs/tp0.md", "/tp/vuejs/tp1.md", "/tp/vuejs/vuetify-vuejs.md", "/tp/vuejs/firebase-vuejs.md"] },
          { title: "Organisation du code", children: ["cours/organisations", "/tp/organisation/introduction"] },

        ]
      },

      {
        title: "Le versionning",
        initialOpenGroupIndex: -1,
        children: [
          ["cheatsheets/git/", "En + du cours"],
          { title: "Initiation à Git", children: ["cours/git", "/tp/git_initiation/"] },
          { title: "Git en groupe + GitLab", children: ["cours/gitlab", "/tp/gitlab/"] },
        ]
      },

      {
        title: "Sécurité du code",
        children: [
          { title: "Introduction OWASP", children: ["cours/introduction_securite"] },
          { title: "Sur le WEB", children: ["cours/securite_applications", "tp/securite/"] }
        ]
      },

      {
        title: "VueJS",
        initialOpenGroupIndex: -1,
        children: [
          ["cheatsheets/vuejs/", "En + du cours"],
          { title: "Les bases", children: ["cours/vuejs", "/tp/vuejs/tp0.md", "/tp/vuejs/tp1-vuejs-laravel-api", "/tp/vuejs/tp1", "/tp/vuejs/tp2", "/tp/vuejs/firebase-vuejs", "/tp/vuejs/vuetify-vuejs.md"] },
          { title: "Exemples", children: ["cours/demo/vuejs/demo1", "cours/demo/vuejs/counter", "cours/demo/vuejs/clock", "cours/demo/vuejs/timestamp-color", "cours/demo/vuejs/sound", "cours/demo/vuejs/12vue"] },
        ]
      },

      {
        title: "Le mobile",
        initialOpenGroupIndex: -1,
        children: [
          { title: "Cordova", children: ["cours/cordova", ["cheatsheets/cordova/", "En + du cours"], "/tp/cordova/decouverte", "/tp/cordova/vuejs_cordova", "/tp/cordova/vuejs_api_led", "/tp/api/doc_api_led"] },
          { title: "Android", children: ["cours/android", "/tp/android/android-base-tp", "/tp/android/app-ble-network", "/tp/android/sample-explication"] }
        ]
      },

      {
        title: "Full-Stack",
        initialOpenGroupIndex: -1,
        children: [
          { title: "GitLab-CI", children: ["cours/gitlabci", "/tp/ci/pages", "/tp/ci/ci-hybride"] },
          { title: "Docker", children: [["https://rawgit.com/c4software/bts/master/.vuepress/public/cours/docker/", "Slides"], ["cheatsheets/docker/", "En + du cours"], "/tp/docker/introduction", "/tp/docker/dockerfile", "/tp/docker/docker_compose"] },
        ]
      },

      {
        title: "Les API",
        initialOpenGroupIndex: -1,
        children: [
          { title: "Framework Flask (Python)", children: ["cours/python", "/tp/python/flask", "/tp/python/flask_todolist_api"] },
          { title: "Typescript (prochainement)", children: ["cours/typescript", "tp/typescript/vuejs"] },
          { title: "NodeJS (prochainement)", children: ["cours/nodejs"] },
        ]
      }

    ]
  }
};
