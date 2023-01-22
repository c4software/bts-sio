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
        ]
      },
      {
        text: "Laravel",
        collapsible: true,
        children: [
          { link: "/cheatsheets/laravel/README.md", text: "Laravel" },
          { link: "/cheatsheets/laravel/quick.md", text: "Les commandes Laravel" },
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
      { link: "/cheatsheets/owasp/README.md", text: "OWASP" },
      {
        text: "DevOps",
        collapsible: true,
        children: [
          { link: "/cheatsheets/serveur/linux-debian-based.md", text: "Linux base Debian" },
          { link: "/cheatsheets/serveur/debian-reseau.md", text: "Générateur de config" },
          { link: "/cheatsheets/serveur/debian-web.md", text: "Debian, Apache, PHP, MariaDB" },
          { link: "/cheatsheets/ssh-key/README.md", text: "Clef SSH" },
          { link: "/cheatsheets/mini-mvc-sample/README.md", text: "Mini MVC Sample" },
          { link: "/cheatsheets/docker/README.md", text: "Docker" }
        ]
      },
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
          { text: "POO", collapsible: true, children: ["/cours/poo", "/cours/les_interfaces", "/cours/poo_redefinition_polymorphisme"] },
          { text: "MVC", collapsible: true, children: ["/cours/mvc"] },
          { text: "Lire un diagramme de classe UML", link: "/cours/uml" },
          { text: "Entrainement", link: "/pages/urdle" },
          {
            text: "Interfaces & Abstractions", collapsible: true,
            children: [
              "/cours/exercices/poo/les-interfaces-1",
              "/cours/exercices/poo/les-interfaces-2",
              "/cours/exercices/poo/les-classes-abstraites.md"
            ]
          },
          {
            text: "Redéfinition et Polymorphisme", collapsible: true,
            children: [
              "/cours/exercices/poo/redefinition",
              "/cours/exercices/poo/polymorphisme"
            ]
          },
          {
            text: "Concepts",
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

  { collapsible: true, text: "Veille & Ressources", children: ["/cours/veille.md", "/tp/veille/ressources.md"] },

  {
    text: "Le HTML + CSS",
    collapsible: true,
    children: [
      { collapsible: true, text: "Les TP", children: ["/tp/html_css/tp1.md", "/tp/html_css/tp2.md", "/tp/html_css/tp3.md", "/tp/html_css/tp4.md", "/tp/html_css/tp5.md"] },
      { collapsible: true, text: "Librairies", children: ["/tp/html_css/bootstrap.md", "/tp/html_css/tailwind.md"] },
    ]
  },

  {
    text: "Le PHP",
    collapsible: true,
    children: [
      { text: "Les bases", collapsible: true, children: ["/cours/introduction_php", "/cours/introduction_sql_php", "/tp/php/support.md", "/tp/php/sql/support.md"] },
      { text: "Les TP basiques", collapsible: true, children: ["/tp/php/tp1.md", "/tp/php/tp-param.md", "/tp/php/tp1.1.md", "/tp/php/tp1.2.md", "/tp/php/tp2.md", "/tp/php/tp3.md", "/tp/php/tp4.md", "/tp/php/tp5.md"] },
      { text: "PHP & SQL", collapsible: true, children: ["/tp/php/sql/tp5.md", "/tp/php/sql/tp6.md"] },
      {
        text: "MVC",
        collapsible: true,
        children: [
          "/tp/php/mvc/tp1.md",
          "/tp/php/mvc/tp1.1.md",
          "/tp/php/mvc/tp2.md",
          { text: "iOT Dashboard", children: ["/tp/php/mvc/dashboard/tp0.md", "/tp/php/mvc/dashboard/tp1.md"] }
        ]
      },
      {
        text: "Laravel", collapsible: true, children: [
          "/cours/laravel",
          "/tp/laravel/introduction",
          "/tp/laravel/authentification",
          "/tp/laravel/generation_model",
          "/tp/laravel/application_todo_list",
          "/tp/laravel/api_produit",
          "/tp/laravel/laravel_api",
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
    text: "Les composants",
    collapsible: true,
    children: ["/cours/composants", "/tp/composants/vuejs", "/tp/composants/android"],
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
        children: [
          "/tp/vuejs3/tp0.md",
          "/tp/vuejs3/tp1.md",
          "/tp/vuejs3/vite.md",
          "/tp/vuejs3/routeur.md",
          "/tp/vuejs3/vuetify.md",
          "/tp/vuejs3/application.md",
          "/tp/vuejs3/firebase.md",
          "/tp/vuejs3/petite-vue.md"
        ]
      }
    ]
  },


  {
    text: "Le mobile",
    collapsible: true,
    children: [
      {
        text: "Android",
        collapsible: true,
        children: [
          "/cours/android_base",
          "/cours/android_ble",
          { text: "Les bases", collapsible: true, children: ["/tp/android/android-base-tp", "/tp/android/android-base2-tp", "/tp/composants/android"] },
          { text: "Les appels d'API", collapsible: true, children: ["/cours/android_http", "/tp/android/network"] },
          { text: "L'organisation", collapsible: true, children: ["/tp/android/sample-explication"] },
          { text: "Les projets", collapsible: true, children: ["/tp/android/app-base-android.md", "/tp/android/app-ble-network.md", "/tp/android/app-avance-android.md"] },
          { text: "Jetpack Compose", collapsible: true, children: ["/tp/composants/android.md", "/tp/android/compose/dirty-api.md"] }
        ]
      },
      { text: "Flutter", collapsible: true, children: ["/tp/flutter/sample_code"] },
      { text: "Cordova (Ancien)", collapsible: true, children: ["/cours/cordova", { link: "/cheatsheets/cordova/README.md", text: "En + du cours" }, "/tp/cordova/decouverte", "/tp/cordova/vuejs_cordova", "/tp/cordova/vuejs_api_led", "/tp/api/doc_api_led"] }
    ]
  },

  {
    text: "DevOps",
    collapsible: true,
    children: [
      { text: "Les bases", collapsible: true, children: ["/cours/serveur.md", "/tp/devops/serveur/support.md", { text: "Les TP", children: ["/tp/devops/serveur/tp1.md", "/tp/devops/serveur/tp1b.md", "/tp/devops/serveur/tp1c.md"] }] },
      { text: "L'intégration continue", collapsible: true, children: ["/tp/devops/support-docker-cicd.md", { link: "/cours/docker", text: "Docker" }, "/cours/cicd", { link: "/cours/gitlabci", text: "Gitlab CI" }] },
      { text: "GitLab-CI", collapsible: true, children: ["/tp/ci/pages", "/tp/ci/ci-test/tests", "/tp/ci/packager-docker", "/tp/ci/ci-hybride", "/tp/ci/gitlab/runner.md", "/tp/devops/sonarqube/sonarqube.md", "/tp/ops/deployer-laravel-ci.md"] },
      { text: "JamStack", collapsible: true, children: ["/tp/ci/jamstack/netlify.md"] },
      {
        text: "Debian",
        collapsible: true,
        children: [
          "/tp/devops/serveur/debian.md",
          { link: "/cheatsheets/serveur/linux-debian-based.md", text: "Linux à base Debian" },
          { link: "/cheatsheets/serveur/debian-reseau.md", text: "Générateur de config réseau" },
          { link: "/cheatsheets/serveur/debian-web.md", text: "Debian : Apache, PHP, MariaDB" },
        ]
      },
      {
        text: "Docker",
        collapsible: true,
        children: [
          { link: "/cheatsheets/docker/README.md", text: "En + du cours" },
          "/tp/docker/introduction",
          "/tp/docker/creer_server_local.md", "/tp/docker/dockerfile", "/tp/docker/docker_compose", "/tp/ops/deployer-laravel-docker.md"]
      },
      {
        text: "Alpine Linux",
        collapsible: true,
        children: [
          "/tp/devops/alpine-vm.md"
        ]
      },
      {
        text: "Portfolio",
        collapsible: true,
        children: ["/tp/ci/jamstack/netlify-portfolio.md", "/tp/ci/pages-portfolio.md"]
      },
      {
        text: "Laravel",
        collapsible: true,
        children: [
          "/tp/ops/deployer-laravel.md",
          "/tp/ops/deployer-laravel-docker.md",
          "/tp/ops/deployer-laravel-ci.md",
        ]
      },
      {
        text: "Mini MVC Sample",
        collapsible: true,
        children: [
          "/tp/ops/mini-mvc-sample/deployer-mini-mvc-sample.md",
          "/tp/ops/mini-mvc-sample/mini-mvc-sample-docker.md",
        ]
      },
      { text: "Kubernetes", collapsible: true, children: ["/tp/ci/kubernetes/deploy-container-in-kubernetes.md", "/tp/ci/kubernetes/cd-avec-kubernetes.md"] },
      { text: "OpenFaas", collapsible: true, children: ["/tp/openfaas/openfaas-quicky-installation", "/tp/openfaas/openfaas-quicky-installation-pi", "/tp/openfaas/openfaas-quicky-create-faas"] },
      { text: "Firebase", collapsible: true, children: ["/tp/ci/firebase/functions.md"] },
      "/tp/rpi/web-stack.md",
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