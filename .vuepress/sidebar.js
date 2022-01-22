module.exports = [
  { link: "/README.md", text: "Introduction" },
  {
    text: "Aides mémoires",
    collapsible: true,
    children: [
      {
        text: "Web",
        collapsible: true,
        children: [
          { link: "/cheatsheets/html/README.md", text: "Html" },
          { link: "/cheatsheets/php/README.md", text: "PHP" },
          { link: "/cheatsheets/javascript/README.md", text: "JavaScript" },
          { link: "/cheatsheets/vuejs/README.md", text: "VueJS" },
          { link: "/cheatsheets/laravel/README.md", text: "Laravel" },
        ]
      },
      {
        text: "POO",
        collapsible: true,
        children: [
          { link: "/cheatsheets/poo-uml/README.md", text: "Représentation UML" },
          { link: "/cheatsheets/poo/README.md", text: "Programmation Orientée Objet" },
        ]
      },
      { link: "/cheatsheets/api/README.md", text: "Les API" },
      { link: "/cheatsheets/git/README.md", text: "Git" },
      { link: "/cheatsheets/sql/README.md", text: "SQL" },
      { link: "/cheatsheets/cordova/README.md", text: "Cordova" },
      { link: "/cheatsheets/docker/README.md", text: "Docker" },
      { link: "/cheatsheets/owasp/README.md", text: "OWASP" },
    ]
  },

  {
    text: "Les cours",
    collapsible: true,
    children: [
      { text: "En + du cours", collapsible: true, children: ["/cheatsheets/html/README.md", "/tp/html_css/support.md", "/tp/php/support.md", "/tp/php/sql/support.md", "/tp/javascript/support.md"] },
      { text: "HTML + CSS", collapsible: true, children: ["/cours/introduction_html_css", "/tp/html_css/maquette.md"] },
      { text: "PHP", collapsible: true, children: ["/cours/introduction_php"] },
      { text: "PHP & SQL", collapsible: true, children: ["/cours/introduction_sql_php"] },
      { text: "Javascript", collapsible: true, children: ["/cours/introduction_javascript"] },
      { text: "Les API", collapsible: true, children: ["/cours/introduction_api"] },
      {
        text: "La POO",
        collapsible: true,
        children: [
          { text: "POO", collapsible: true, children: ["/cours/poo", "/cours/les_interfaces"] },
          { text: "MVC", collapsible: true, children: ["/cours/mvc"] },
          {
            text: "Interfaces & Abstractions", collapsible: true,
            children: [
              "/cours/exercices/poo/les-interfaces-1",
              "/cours/exercices/poo/les-interfaces-2",
              "/cours/exercices/poo/les-classes-abstraites.md"
            ]
          },
          {
            text: "Aide mémoire",
            collapsible: true,
            children: [
              { link: "/cheatsheets/poo-uml/README.md", text: "Représentation UML" },
              { link: "/cheatsheets/poo/README.md", text: "Programation Orientée Objet" }
            ]
          }
        ]
      },
    ]
  },

  {
    text: "Le HTML + CSS",
    collapsible: true,
    children: [
      { collapsible: true, text: "Les TP", children: ["/tp/html_css/tp1.md", "/tp/html_css/tp2.md", "/tp/html_css/tp3.md", "/tp/html_css/tp4.md", "/tp/html_css/tp5.md"] },
      { collapsible: true, text: "Librairies", children: ["/tp/html_css/bootstrap.md", "/tp/html_css/tailwind.md"] },
      { collapsible: true, text: "Ressources & Intégrations", children: ["/tp/html_css/integration.md"] }
    ]
  },

  {
    text: "Le PHP",
    collapsible: true,
    children: [
      { text: "Les bases", collapsible: true, children: ["/cours/introduction_php", "/cours/introduction_sql_php", "/tp/php/support.md", "/tp/php/sql/support.md"] },
      { text: "Les TP basiques", collapsible: true, children: ["/tp/php/tp1.md", "/tp/php/tp-param.md", "/tp/php/tp1.1.md", "/tp/php/tp1.2.md", "/tp/php/tp2.md", "/tp/php/tp3.md", "/tp/php/tp4.md"] },
      { text: "PHP & SQL", collapsible: true, children: ["/tp/php/sql/tp5.md", "/tp/php/sql/tp6.md"] },
      {
        text: "MVC",
        collapsible: true,
        children: [
          "/tp/php/mvc/tp1.md",
          "/tp/php/mvc/tp1.1.md",
          { text: "iOT Dashboard", children: ["/tp/php/mvc/dashboard/tp0.md", "/tp/php/mvc/dashboard/tp1.md"] }
        ]
      },
      {
        text: "Laravel", collapsible: true, children: [
          "/cours/laravel",
          "/tp/laravel/introduction",
          "/tp/laravel/authentification",
          "/tp/laravel/application_todo_list",
          "/tp/laravel/laravel_api",
          "/tp/laravel/creation_api",
          "/tp/ops/deployer-laravel.md"
        ]
      }
    ]
  },

  {
    text: "Le JavaScript",
    collapsible: true,
    children: [
      { text: "Les bases", collapsible: true, children: ["/cours/introduction_javascript", "/tp/javascript/support.md"] },
      { text: "Les TP basiques", collapsible: true, children: ["/tp/javascript/tp1.md", "/tp/javascript/tp1.1.md", "/tp/javascript/tp1.2.md", "/tp/javascript/tp2.md", "/tp/javascript/tp3.md", "/tp/javascript/tp3.1.md", "/tp/javascript/tp5.md", "/tp/javascript/tp4.md", "/tp/javascript/tp4.1.md"] },
      { text: "Javascript avancé", collapsible: true, children: ["/cours/javascript_avances", "/tp/javascript_avances/introduction", "/tp/javascript_avances/revision"] },
      { text: "Les frameworks", collapsible: true, children: ["/cours/framework_javascript", "/tp/javascript_avances/introduction.md"] }
    ]
  },

  {
    text: "Les CMS",
    collapsible: true,
    children: ["/tp/cms/wordpress.md"]
  },

  {
    text: "Le versionning",
    collapsible: true,
    children: [
      { link: "/cheatsheets/git/README.md", text: "En + du cours" },
      { text: "Initiation à Git", collapsible: true, children: ["/cours/git", "/tp/git_initiation/"] },
      { text: "Git en groupe + GitLab", collapsible: true, children: ["/cours/gitlab", "/tp/gitlab/"] },
    ]
  },

  {
    text: "L'organisation",
    collapsible: true,
    children: ["/cours/organisations", "/tp/organisation/introduction"],
  },

  {
    text: "Sécurité du code",
    collapsible: true,
    children: [
      { text: "OWASP", children: ["/cours/securite_applications", { link: "/cheatsheets/owasp/README.md", text: "Synthèse du cours" }, "/tp/securite/"] }
    ]
  },

  {
    text: "VueJS",
    collapsible: true,
    children: [
      { text: "Cours Vue 2.0", collapsible: true, children: ["/cheatsheets/vuejs/README.md", "/cours/vuejs"] },
      { text: "Exemples", collapsible: true, children: ["/cours/demo/vuejs/demo1", "/cours/demo/vuejs/counter", "/cours/demo/vuejs/clock", "/cours/demo/vuejs/timestamp-color", "/cours/demo/vuejs/sound", "/cours/demo/vuejs/12vue", "/cours/demo/vuejs/chat"] },
      {
        text: "Version 2.0",
        collapsible: true,
        children: ["/tp/vuejs/tp0.md", "/tp/vuejs/tp1-vuejs-laravel-api", "/tp/vuejs/tp1", "/tp/vuejs/tp2", "/tp/vuejs/firebase-vuejs", "/tp/vuejs/vuetify-vuejs.md"]
      },
      {
        text: "Version 3.0",
        collapsible: true,
        children: ["/tp/vuejs3/vite.md", "/tp/vuejs3/petite-vue.md"]
      }
    ]
  },


  {
    text: "Le mobile",
    collapsible: true,
    children: [
      { text: "Cordova", collapsible: true, children: ["/cours/cordova", { link: "/cheatsheets/cordova/README.md", text: "En + du cours" }, "/tp/cordova/decouverte", "/tp/cordova/vuejs_cordova", "/tp/cordova/vuejs_api_led", "/tp/api/doc_api_led"] },
      {
        text: "Android",
        collapsible: true,
        children: [
          "/cours/android_base",
          "/cours/android_ble",
          { text: "Les bases", collapsible: true, children: ["/tp/android/android-base-tp", "/tp/android/android-base2-tp"] },
          { text: "Les appels d'API", collapsible: true, children: ["/cours/android_http", "/tp/android/network"] },
          { text: "L'organisation", collapsible: true, children: ["/tp/android/sample-explication"] },
          { text: "Les projets", collapsible: true, children: ["/tp/android/app-base-android.md", "/tp/android/app-ble-network.md", "/tp/android/app-avance-android.md"] }
        ]
      }
    ]
  },

  {
    text: "DevOps",
    collapsible: true,
    children: [
      { text: "Support de cours", collapsible: true, children: ["/tp/devops/support.md", { link: "/cours/docker", text: "Docker" }, "/cours/cicd", { link: "/cours/gitlabci", text: "Gitlab CI" }] },
      { text: "GitLab-CI", collapsible: true, children: ["/tp/ci/pages", "/tp/ci/ci-test/tests", "/tp/ci/packager-docker", "/tp/ci/ci-hybride", "/tp/ci/gitlab/runner.md", "/tp/devops/sonarqube/sonarqube.md"] },
      { text: "JamStack", collapsible: true, children: ["/tp/ci/jamstack/netlify.md"] },
      {
        text: "Docker",
        collapsible: true,
        children: [
          { link: "/cheatsheets/docker/README.md", text: "En + du cours" },
          "/tp/docker/introduction",
          "/tp/docker/creer_server_local.md", "/tp/docker/dockerfile", "/tp/docker/docker_compose"]
      },
      "/tp/ops/deployer-laravel.md",
      "/tp/ops/deployer-laravel-docker.md",
      { text: "Kubernetes", collapsible: true, children: ["/tp/ci/kubernetes/deploy-container-in-kubernetes.md", "/tp/ci/kubernetes/cd-avec-kubernetes.md"] },
      { text: "OpenFaas", collapsible: true, children: ["/tp/openfaas/openfaas-quicky-installation", "/tp/openfaas/openfaas-quicky-installation-pi", "/tp/openfaas/openfaas-quicky-create-faas"] },
      { text: "Firebase", collapsible: true, children: ["/tp/ci/firebase/functions.md"] },
      "/tp/rpi/web-stack.md",
      "/tp/devops/alpine-vm.md"
    ]
  },

  {
    text: "Les API",
    collapsible: true,
    children: [
      { text: "Framework Flask (Python)", children: ["/cours/python", "/tp/python/flask", "/tp/python/flask_todolist_api"] },
      { text: "Typescript (prochainement)", children: ["/cours/typescript", "/tp/typescript/vuejs"] },
      { text: "NodeJS (prochainement)", children: ["/cours/nodejs"] },
    ]
  }

]