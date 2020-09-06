module.exports = {
  title: "Cours",
  description: "Cette documentation est réalisée par Valentin Brosseau (pour le BTS SIO - SLAM 5, mais également dans divers cours et interventions), vous retrouverez dans l’ensemble des cours (slide) ainsi que les TP.",
  plugins: [
    "@vuepress/last-updated",
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
  themeConfig: {
    docsBranch: 'master',
    editLinks: true,
    nextLinks: false,
    prevLinks: false,
    displayAllHeaders: true,
    sidebarDepth: 0,
    sidebar: [
      ["/", "Introduction"],
      { collapsable: false, title: "Aides mémoires", children: [["cheatsheets/git/", "Git"], ["cheatsheets/cordova/", "Cordova"], ["cheatsheets/docker/", "Docker"], ["cheatsheets/vuejs/", "VueJS"]] },
      { collapsable: false, title: "Initiation à Git", children: ["cours/git", "/tp/git_initiation/"] },
      { collapsable: false, title: "Git en groupe + GitLab", children: ["cours/gitlab", "/tp/gitlab/"] },
      { collapsable: false, title: "Organisation du code", children: ["cours/organisations", "/tp/organisation/introduction"] },
      { collapsable: false, title: "Javascript avancé", children: ["cours/javascript_avances", "tp/javascript_avances/introduction"] },
      { collapsable: false, title: "Programmation sécurisée avec OWASP", children: ["cours/securite_applications", "cours/introduction_securite", "tp/securite/"] },
      { collapsable: false, title: "Laravel", children: ["cours/laravel", "/tp/laravel/introduction", "/tp/laravel/application_todo_list", "/tp/laravel/creation_api"] },
      { collapsable: false, title: "VueJS", children: ["cours/vuejs", "/tp/vuejs/tp1-vuejs-laravel-api", "/tp/vuejs/tp1", "/tp/vuejs/tp2", "/tp/vuejs/firebase-vuejs"] },
      { collapsable: false, title: "VueJS exemple", children: ["cours/demo/vuejs/demo1", "cours/demo/vuejs/counter", "cours/demo/vuejs/clock", "cours/demo/vuejs/timestamp-color", "cours/demo/vuejs/sound", "cours/demo/vuejs/12vue"] },
      { collapsable: false, title: "Framework Javascript", children: ["cours/framework_javascript"] },
      { collapsable: false, title: "Typescript (À venir)", children: ["cours/typescript", "tp/typescript/vuejs"] },
      { collapsable: false, title: "NodeJS  (À venir)", children: ["cours/nodejs", "/tp/nodejs/api", "/tp/nodejs/firebase"] },
      { collapsable: false, title: "GraphQL (À venir)", children: ["cours/graphql", "tp/graphql/hasura"] },
      { collapsable: false, title: "Cordova + VueJS", children: ["cours/cordova", "/tp/cordova/decouverte", "/tp/cordova/vuejs_cordova", "/tp/cordova/vuejs_api_led", "/tp/api/doc_api_led"] },
      { collapsable: false, title: "Docker", children: [["https://rawgit.com/c4software/bts/master/.vuepress/public/cours/docker/", "Slides"], "/tp/docker/introduction", "/tp/docker/dockerfile", "/tp/docker/docker_compose"] },
      { collapsable: false, title: "GitLab-CI", children: ["cours/gitlabci", "/tp/ci/pages", "/tp/ci/ci-hybride"] },
      { collapsable: false, title: "Python : Framework Flask", children: ["cours/python", "/tp/python/flask", "/tp/python/flask_todolist_api"] },
      { collapsable: false, title: "Android", children: ["/tp/android/sample-explication"] }
    ]
  }
};
