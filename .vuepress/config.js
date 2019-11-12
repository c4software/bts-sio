module.exports = {
  title: "Cours",
  description: "Cette documentation est faite pour la matière Slam 5 du BTS SIO, vous retrouverez dans l’ensemble des cours (slide) ainsi que les TP.",
  plugins: ["@vuepress/last-updated", ["vuepress-plugin-code-copy", true]],
  lang: "fr-FR",
  dest: "docs",
  themeConfig: {
    docsBranch: 'master',
    editLinks: true,
    nextLinks: false,
    prevLinks: false,
    displayAllHeaders: true,
    sidebarDepth: 0,
    sidebar: [
      ["/", "Introduction"],
      { collapsable: false, title: "Aides mémoires", children: [["cheatsheets/git/", "Git"], ["cheatsheets/cordova/", "Cordova"], ["cheatsheets/docker/", "VueJS"], ["cheatsheets/vuejs/", "Docker"]] },
      { collapsable: false, title: "Initiation à Git", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=git", "Slides"], "/tp/git_initiation/"] },
      { collapsable: false, title: "Git en groupe + GitLab", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=gitlab", "Slides"], "/tp/gitlab/"] },
      { collapsable: false, title: "Organisation du code", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=organisations", "Slides"], "/tp/organisation/introduction"] },
      { collapsable: false, title: "Javascript avancé (À venir)", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=javascript_avances", "Slides"], "tp/javascript_avances/introduction"] },
      { collapsable: false, title: "Programmation sécurisée avec OWASP", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=securite_applications", "Slides"], "tp/securite/"] },
      { collapsable: false, title: "Laravel", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=laravel", "Slides"], "/tp/laravel/introduction", "/tp/laravel/application_todo_list", "/tp/laravel/creation_api"] },
      { collapsable: false, title: "Typescript (À venir)", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=typescript", "Slides"]] },
      { collapsable: false, title: "NodeJS  (À venir)", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=nodejs", "Slides"], "/tp/nodejs/api", "/tp/nodejs/firebase"] },
      { collapsable: false, title: "VueJS", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=vuejs", "Slides"], "/tp/vuejs/tp1-vuejs-laravel-api", "/tp/vuejs/tp1", "/tp/vuejs/tp2", "/tp/vuejs/firebase-vuejs"] },
      {
        collapsable: false,
        title: "VueJS exemple",
        children: [["https://cours.brosseau.ovh/demo/vuejs/demo1/index.html", "Demo 1"], ["https://cours.brosseau.ovh/demo/vuejs/counter/index.html", "Compteur 1"], ["https://cours.brosseau.ovh/demo/vuejs/clock/index.html", "Horloge"], ["https://cours.brosseau.ovh/demo/vuejs/timestamp-color/index.html", "Horloge 2"], ["https://cours.brosseau.ovh/demo/vuejs/sound/index.html", "Sonomètre"]]
      },
      { collapsable: false, title: "Cordova + VueJS", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=cordova", "Slides"], "/tp/cordova/decouverte", "/tp/cordova/vuejs_cordova", "/tp/cordova/vuejs_api_led", "/tp/api/doc_api_led"] },
      { collapsable: false, title: "Docker", children: [["https://rawgit.com/c4software/bts/master/cours/docker/", "Slides"], "/tp/docker/introduction", "/tp/docker/dockerfile", "/tp/docker/docker_compose"] },
      { collapsable: false, title: "GitLab-CI", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=gitlabci", "Slides"], "/tp/ci/pages", "/tp/ci/ci-hybride"] },
      { collapsable: false, title: "Python : Framework Flask", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=python", "Slides"], "/tp/python/flask", "/tp/python/flask_todolist_api"] },
      { collapsable: false, title: "Android", children: [["https://cours.brosseau.ovh/cours/sources/revealjs/index.html?source=android", "Slides"]] }
    ]
  }
};
