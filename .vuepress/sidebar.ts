module.exports = [
  {
    text: "Aides mémoires",
    link: "/pages/categories/aide-memoires.md",
  },

  { collapsible: true, text: "Veille & Ressources", children: ["/cours/veille.md", "/tp/veille/ressources.md"] },

  {
    text: "Programmation Orientée Objet",
    collapsible: true,
    children: [
      {
        text: "Le cours", collapsible: true, children: [
          { text: "Les bases", link: "/cours/poo" },
          { text: "Les Interfaces", link: "/cours/les_interfaces" },
          { text: "Le polymorphisme", link: "/cours/poo_redefinition_polymorphisme" },
          { text: "Lire un diagramme de classe UML", link: "/cours/uml" },
        ]
      },
      {
        text: "Aide mémoire",
        collapsible: true,
        children: [
          { link: "/cheatsheets/poo-uml/README.md", text: "Représentation UML" },
          { link: "/cheatsheets/poo/README.md", text: "Programation Orientée Objet" }
        ]
      },
      {
        "text": "Les exercices",
        "collapsible": true,
        "children": [
          { text: "Entrainement multi exercices", link: "/pages/urdle" },
          { text: "Redéfinition", link: "/cours/exercices/poo/redefinition", },
          { text: "Polymorphisme", link: "/cours/exercices/poo/polymorphisme" },
          { text: "Les Interface 1", link: "/cours/exercices/poo/les-interfaces-1" },
          { text: "Les Interface 2", link: "/cours/exercices/poo/les-interfaces-2" },
          { text: "Les classes abstraites", link: "/cours/exercices/poo/les-classes-abstraites.md" },
        ]
      },

    ]
  },

  {
    text: "Le versionning",
    collapsible: true,
    children: [
      { text: "Initiation à Git", collapsible: true, children: ["/cours/git", "/tp/git_initiation/"] },
      { text: "Git en groupe + GitLab", collapsible: true, children: ["/cours/gitlab", "/tp/gitlab/"] },
      { text: "En + du cours", link: "/cheatsheets/git/README.md" },
    ]
  },

  {
    text: "HTML + CSS",
    collapsible: true,
    children: [
      { text: "Le cours", collapsible: true, children: ["/cours/introduction_html_css", "/tp/html_css/maquette.md"] },
      { text: "En + du cours", collapsible: true, children: ["/cheatsheets/html/README.md", "/tp/html_css/support.md"] },
      { collapsible: true, text: "Les TP", children: ["/tp/html_css/tp1.md", "/tp/html_css/tp2.md", "/tp/html_css/tp3.md", "/tp/html_css/tp4.md", "/tp/html_css/tp5.md"] },
      { collapsible: true, text: "Librairies", children: ["/tp/html_css/bootstrap.md", "/tp/html_css/tailwind.md"] },
    ]
  },

  {
    text: "Le JavaScript",
    collapsible: true,
    children: [
      { text: "Le cours", collapsible: true, children: ["/cours/introduction_javascript", "/tp/javascript/support.md", "/cours/javascript_avances", "/cours/framework_javascript"] },
      { text: "Les TP basiques", collapsible: true, children: ["/tp/javascript/tp1.md", "/tp/javascript/tp1.1.md", "/tp/javascript/tp1.2.md", "/tp/javascript/tp2.md", "/tp/javascript/tp3.md", "/tp/javascript/tp3.1.md", "/tp/javascript/tp5.md", "/tp/javascript/tp4.md", "/tp/javascript/tp4.1.md"] },
      { text: "Javascript avancé", collapsible: true, children: ["/tp/javascript_avances/introduction", "/tp/javascript_avances/revision"] },
    ]
  },

  {
    text: "Le PHP",
    collapsible: true,
    children: [
      { text: "Les cours", collapsible: true, children: ["/cours/introduction_php", "/cours/introduction_sql_php"] },
      { text: "En + du cours", collapsible: true, children: ["/tp/php/support.md", "/tp/php/sql/support.md"] },
      { text: "TP bases", collapsible: true, children: ["/tp/php/tp1.md", "/tp/php/tp-param.md", "/tp/php/tp1.1.md", "/tp/php/tp1.2.md", "/tp/php/tp2.md", "/tp/php/tp3.md", "/tp/php/tp4.md", "/tp/php/tp5.md"] },
      { text: "TP SQL", collapsible: true, children: ["/tp/php/sql/tp5.md", "/tp/php/sql/tp6.md"] }
    ]
  },

  {
    text: "L'organisation",
    collapsible: true,
    children: ["/cours/organisations", "/tp/organisation/introduction"],
  },

  {
    text: "Le PHP Avancé",
    collapsible: true,
    children: [
      {
        text: "MVC",
        collapsible: true,
        children: [
          { text: "Le cours", link: "/cours/mvc" },
          { text: "En + du cours", collapsible: true, children: ["/cheatsheets/mini-mvc-sample/README.md"] },
          {
            text: "Les TP",
            collapsible: true,
            children: [
              "/tp/php/mvc/tp1.md",
              "/tp/php/mvc/tp1.1.md",
              "/tp/php/mvc/tp2.md"]
          }
        ]
      },
      {
        text: "Laravel", collapsible: true, children: [
          { text: "Le cours", link: "/cours/laravel" },
          { text: "En + du cours", collapsible: true, children: ["/cheatsheets/laravel/README.md", "/cheatsheets/laravel/quick.md"] },
          {
            text: "Les TP",
            collapsible: true,
            children: [
              "/tp/laravel/introduction",
              "/tp/laravel/authentification",
              "/tp/laravel/generation_model",
              "/tp/laravel/application_todo_list",
              "/tp/laravel/api_produit",
              "/tp/ops/deployer-laravel.md"]
          }
        ]
      }
    ]
  },

  {
    text: "Les CMS",
    collapsible: true,
    children: ["/tp/cms/wordpress.md"]
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
      { text: "Le cours", collapsible: true, children: ["/cours/vuejs", "/cheatsheets/vuejs/README.md"] },
      { text: "Exemples", collapsible: true, children: ["/cours/demo/vuejs/demo1", "/cours/demo/vuejs/counter", "/cours/demo/vuejs/clock", "/cours/demo/vuejs/timestamp-color", "/cours/demo/vuejs/sound", "/cours/demo/vuejs/12vue", "/cours/demo/vuejs/chat"] },
      {
        text: "TP Vue 2.X",
        collapsible: true,
        children: ["/tp/vuejs/tp0.md", "/tp/vuejs/tp1-vuejs-laravel-api", "/tp/vuejs/tp1", "/tp/vuejs/tp2", "/tp/vuejs/firebase-vuejs", "/tp/vuejs/vuetify-vuejs.md"]
      },
      {
        text: "TP Vue 3.X",
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
    text: "Mobile",
    collapsible: true,
    children: [
      {
        text: "Android",
        collapsible: true,
        children: [
          { text: "Le cours", collapsible: true, children: ["/cours/android_base", "/cours/android_ble", "/cours/android_http"] },
          { text: "Les TP simple", collapsible: true, children: ["/tp/android/android-base-tp", "/tp/android/android-base2-tp", "/tp/composants/android"] },
          { text: "Les TP API", collapsible: true, children: ["/tp/android/network"] },
          { text: "Les projets", collapsible: true, children: ["/tp/android/app-base-android.md", "/tp/android/app-ble-network.md", "/tp/android/app-avance-android.md"] },
          { text: "Jetpack Compose", collapsible: true, children: ["/tp/composants/android.md", "/tp/android/compose/dirty-api.md"] },
          { text: "Code d'exemple", collapsible: true, children: ["/tp/android/sample-explication"] },
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
        text: "Hébergement mini MVC Sample",
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
      { text: "Le cours", collapsible: true, children: ["/cours/introduction_api", "/cheatsheets/api/README.md"] },
      { text: "Framework Flask (Python)", children: ["/cours/python", "/tp/python/flask", "/tp/python/flask_todolist_api"] },
    ]
  }

]