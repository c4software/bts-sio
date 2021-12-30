export const data = {
  "key": "v-1a05f928",
  "path": "/tp/rpi/web-stack.html",
  "title": "Transformer un Raspberry Pi en server Web",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "La solution présentée dans cette page décrit l'installation de la solution Open-Source développée par Valentin Brosseau disponible sur GitHub"
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
      "title": "Flasher / installer le Raspberry Pi",
      "slug": "flasher-installer-le-raspberry-pi",
      "children": [
        {
          "level": 3,
          "title": "Activer le SSH",
          "slug": "activer-le-ssh",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Installer Docker",
      "slug": "installer-docker",
      "children": []
    },
    {
      "level": 2,
      "title": "Installer Docker-Compose",
      "slug": "installer-docker-compose",
      "children": []
    },
    {
      "level": 2,
      "title": "Installer la stack LAMP",
      "slug": "installer-la-stack-lamp",
      "children": []
    },
    {
      "level": 2,
      "title": "Lancer la stack LAMP",
      "slug": "lancer-la-stack-lamp",
      "children": []
    },
    {
      "level": 2,
      "title": "Fonctionnement",
      "slug": "fonctionnement",
      "children": []
    },
    {
      "level": 2,
      "title": "Accès à la base de données",
      "slug": "acces-a-la-base-de-donnees",
      "children": []
    },
    {
      "level": 2,
      "title": "Fonctionnement du FTP intégré",
      "slug": "fonctionnement-du-ftp-integre",
      "children": [
        {
          "level": 3,
          "title": "Mode 1 : Ouvert à tous.",
          "slug": "mode-1-ouvert-a-tous",
          "children": []
        },
        {
          "level": 3,
          "title": "Mode 2 : Le mode classique",
          "slug": "mode-2-le-mode-classique",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Accéder à votre Raspberry Pi",
      "slug": "acceder-a-votre-raspberry-pi",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1612724293000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 12
      }
    ]
  },
  "filePathRelative": "tp/rpi/web-stack.md"
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
