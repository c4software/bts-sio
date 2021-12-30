export const data = {
  "key": "v-480aeb96",
  "path": "/tp/openfaas/openfaas-quicky-installation.html",
  "title": "Création stack OpenFaas (faasd) local via Multipass",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Ce document s'intéresse uniquement à la partie création de la stack initial faasd qui nous permettra d'utiliser OpenFaas. Le but de ce document est de monter rapidement / simplement une stack OpenFaas pour tester la solution."
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Installer Multipass",
      "slug": "installer-multipass",
      "children": []
    },
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
      "title": "Configuration Cloud-config",
      "slug": "configuration-cloud-config",
      "children": []
    },
    {
      "level": 2,
      "title": "SSH Key",
      "slug": "ssh-key",
      "children": []
    },
    {
      "level": 2,
      "title": "Créé et démarrer la VM",
      "slug": "cree-et-demarrer-la-vm",
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
    },
    {
      "level": 2,
      "title": "La suite ?",
      "slug": "la-suite",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1618864244000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 6
      }
    ]
  },
  "filePathRelative": "tp/openfaas/openfaas-quicky-installation.md"
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
