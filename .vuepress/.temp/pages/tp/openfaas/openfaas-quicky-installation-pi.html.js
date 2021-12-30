export const data = {
  "key": "v-503e2c54",
  "path": "/tp/openfaas/openfaas-quicky-installation-pi.html",
  "title": "Création stack OpenFaas (faasd) sur un Raspberry Pi",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Ce document s'intéresse uniquement à la partie création de la stack initial faasd qui nous permettra d'utiliser OpenFaas. Le but de ce document est de monter rapidement / simplement une stack OpenFaas pour tester la solution."
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Installer faas-cli",
      "slug": "installer-faas-cli",
      "children": [
        {
          "level": 3,
          "title": "Linux et Mac",
          "slug": "linux-et-mac",
          "children": []
        },
        {
          "level": 3,
          "title": "Windows Powershell",
          "slug": "windows-powershell",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "OpenFaas et RaspberryPi",
      "slug": "openfaas-et-raspberrypi",
      "children": []
    },
    {
      "level": 2,
      "title": "Récupération de l'authentification",
      "slug": "recuperation-de-l-authentification",
      "children": []
    },
    {
      "level": 2,
      "title": "Connexion à l'instance",
      "slug": "connexion-a-l-instance",
      "children": []
    },
    {
      "level": 2,
      "title": "Valider le fonctionnement",
      "slug": "valider-le-fonctionnement",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1618864244000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "tp/openfaas/openfaas-quicky-installation-pi.md"
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
