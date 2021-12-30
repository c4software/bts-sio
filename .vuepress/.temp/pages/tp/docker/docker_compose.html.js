export const data = {
  "key": "v-81a1121e",
  "path": "/tp/docker/docker_compose.html",
  "title": "Le Docker Compose",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Dans ce TP nous allons voir comment créer une vraie arborescence de service avec Docker. Dans une application réelle, il n’est pas rare d’avoir plusieurs technologies (ou plusieurs « services ») pour assurer le bon fonctionnement d’un système dans son ensemble (Exemple pour faire fonctionner mon application j’ai besoin de MySQL, PHP, et d’un serveur Web pour l’interface client)."
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Introduction",
      "slug": "introduction",
      "children": []
    },
    {
      "level": 2,
      "title": "Installer Docker Compose",
      "slug": "installer-docker-compose",
      "children": []
    },
    {
      "level": 2,
      "title": "Structure d’un Docker Compose",
      "slug": "structure-d-un-docker-compose",
      "children": []
    },
    {
      "level": 2,
      "title": "Monter une application grâce Docker Compose",
      "slug": "monter-une-application-grace-docker-compose",
      "children": [
        {
          "level": 3,
          "title": "Remarques",
          "slug": "remarques",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "HomeAssistant ?",
      "slug": "homeassistant",
      "children": []
    },
    {
      "level": 2,
      "title": "Allons plus loin ?",
      "slug": "allons-plus-loin",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1619128204000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 15
      },
      {
        "name": "Valentin Brosseau",
        "email": "vbrosseau@afone.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "tp/docker/docker_compose.md"
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
