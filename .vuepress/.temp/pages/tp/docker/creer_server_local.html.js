export const data = {
  "key": "v-ec904c8e",
  "path": "/tp/docker/creer_server_local.html",
  "title": "Créer des services très rapidement (et simplement)",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Dans ce TP nous allons voir comment monter rapidement (et très simplement) un service avec Docker. Ici pas de Docker-Composes ou autre… Il s'agit de voir que Docker vous nous permettre de créer très simplement un « Serveur » pour répondre à une problématique ponctuelle de developpement."
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "PHP",
      "slug": "php",
      "children": [
        {
          "level": 3,
          "title": "PHP 7",
          "slug": "php-7",
          "children": []
        },
        {
          "level": 3,
          "title": "PHP 8",
          "slug": "php-8",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "PostgreSQL (ou autre BDD)",
      "slug": "postgresql-ou-autre-bdd",
      "children": [
        {
          "level": 3,
          "title": "Une autre BDD ?",
          "slug": "une-autre-bdd",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Wordpress",
      "slug": "wordpress",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1619373315000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "tp/docker/creer_server_local.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
