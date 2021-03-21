module.exports = {
  title: "Cours",
  description: "Cette documentation est réalisée par Valentin Brosseau (pour le BTS SIO, GRETA, et dans différentes interventions), vous retrouverez dans l’ensemble des cours (slide) ainsi que les TP.",
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
    ['autometa', {}],
    ["vuepress-plugin-code-copy", true],
    ['@vuepress/pwa', { serviceWorker: false, updatePopup: false }],
    ['@vuepress/google-analytics', { 'ga': 'UA-2107503-8' }]
  ],
  locales: {
    '/': {
      lang: 'fr-FR',
      title: "Cours",
      description: "Cette documentation est réalisée par Valentin Brosseau (BTS SIO - SLAM 5, Greta, mais également dans divers cours et interventions), vous retrouverez dans l’ensemble des cours (slide) ainsi que les TP.",
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
        "/cours/android_ble.html",
        "/cours/android_base.html",
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
      {
        collapsable: true,
        title: "Aides mémoires",
        children: [
          ["cheatsheets/git/", "Git"],
          ["cheatsheets/html/", "Html"],
          ["cheatsheets/php/", "PHP"],
          ["cheatsheets/sql/", "SQL"],
          ["cheatsheets/javascript/", "JavaScript"],
          ["cheatsheets/cordova/", "Cordova"],
          ["cheatsheets/docker/", "Docker"],
          ["cheatsheets/vuejs/", "VueJS"]
        ]
      },

      {
        title: "Les bases",
        initialOpenGroupIndex: -1,
        children: [
          { title: "En + du cours", children: ["cheatsheets/html/", "tp/html_css/support.md", "tp/php/support.md", "tp/php/sql/support.md", "tp/javascript/support.md"] },
          { title: "HTML + CSS", children: ["cours/introduction_html_css", "tp/html_css/maquette.md"] },
          { title: "PHP", children: ["cours/introduction_php"] },
          { title: "PHP & SQL", children: ["cours/introduction_sql_php"] },
          { title: "Javascript", children: ["cours/introduction_javascript"] },
          { title: "La POO", children: ["cours/les_interfaces"] },
        ]
      },

      {
        title: "Le HTML + CSS",
        initialOpenGroupIndex: -1,
        children: [
          { initialOpenGroupIndex: -1, title: "Les TP", children: ["tp/html_css/tp1.md", "tp/html_css/tp2.md", "tp/html_css/tp3.md", "tp/html_css/tp4.md", "tp/html_css/tp5.md"] },
          { initialOpenGroupIndex: -1, title: "Librairies", children: ["tp/html_css/bootstrap.md", "tp/html_css/tailwind.md"] },
          { initialOpenGroupIndex: -1, title: "Ressources & Intégrations", children: ["tp/html_css/integration.md"] }
        ]
      },

      {
        title: "Le PHP",
        initialOpenGroupIndex: -1,
        children: [
          { title: "Les bases", children: ["cours/introduction_php", "cours/introduction_sql_php", "tp/php/support.md", "tp/php/sql/support.md"] },
          { title: "Les TP basiques", children: ["tp/php/tp1.md", "tp/php/tp-param.md", "tp/php/tp1.1.md", "tp/php/tp1.2.md", "tp/php/tp2.md", "tp/php/tp3.md", "tp/php/tp4.md"] },
          { title: "PHP & SQL", children: ["tp/php/sql/tp5.md", "tp/php/sql/tp6.md"] },
          { title: "Laravel", children: ["cours/laravel", "/tp/laravel/introduction", "/tp/laravel/authentification", "/tp/laravel/application_todo_list", "/tp/laravel/creation_api"] }
        ]
      },

      {
        title: "Le JavaScript",
        initialOpenGroupIndex: -1,
        children: [
          { title: "Les bases", children: ["cours/introduction_javascript", "tp/javascript/support.md"] },
          { title: "Les TP basiques", children: ["tp/javascript/tp1.md", "tp/javascript/tp1.1.md", "tp/javascript/tp1.2.md", "tp/javascript/tp2.md", "tp/javascript/tp3.md", "tp/javascript/tp5.md", "tp/javascript/tp4.md", "tp/javascript/tp4.1.md"] },
          { title: "Javascript avancé", children: ["cours/javascript_avances", "tp/javascript_avances/introduction", "tp/javascript_avances/revision"] },
          { title: "Les frameworks", children: ["cours/framework_javascript", "/tp/javascript_avances/introduction.md", "/tp/vuejs/tp0.md", "/tp/vuejs/tp1.md", "/tp/vuejs/vuetify-vuejs.md", "/tp/vuejs/firebase-vuejs.md"] }
        ]
      },

      {
        title: "Les CMS",
        initialOpenGroupIndex: -1,
        children: ["tp/cms/wordpress.md"]
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
        title: "L'organisation",
        initialOpenGroupIndex: -1,
        children: ["cours/organisations", "/tp/organisation/introduction"],
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
          ["cheatsheets/vuejs/", "cours/vuejs", "En + du cours"],
          { title: "Exemples", children: ["cours/demo/vuejs/demo1", "cours/demo/vuejs/counter", "cours/demo/vuejs/clock", "cours/demo/vuejs/timestamp-color", "cours/demo/vuejs/sound", "cours/demo/vuejs/12vue"] },
          {
            title: "Version 2.0",
            children: ["/tp/vuejs/tp0.md", "/tp/vuejs/tp1-vuejs-laravel-api", "/tp/vuejs/tp1", "/tp/vuejs/tp2", "/tp/vuejs/firebase-vuejs", "/tp/vuejs/vuetify-vuejs.md"]
          },
          {
            title: "Version 3.0",
            children: ["tp/vuejs3/vite.md"]
          }
        ]
      },


      {
        title: "Le mobile",
        initialOpenGroupIndex: -1,
        children: [
          { title: "Cordova", children: ["cours/cordova", ["cheatsheets/cordova/", "En + du cours"], "/tp/cordova/decouverte", "/tp/cordova/vuejs_cordova", "/tp/cordova/vuejs_api_led", "/tp/api/doc_api_led"] },
          {
            title: "Android",
            children: [
              "cours/android_base",
              "cours/android_ble",
              { title: "Les bases", children: ["/tp/android/android-base-tp", "/tp/android/android-base2-tp"] },
              { title: "Les appels d'API", children: ["cours/android_http", "/tp/android/network"] },
              { title: "Le BLE", children: ["/tp/android/app-ble-network"] },
              { title: "L'organisation", children: ["/tp/android/sample-explication"] }
            ]
          }
        ]
      },

      {
        title: "Full-Stack",
        initialOpenGroupIndex: -1,
        children: [
          "tp/rpi/web-stack.md",
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
