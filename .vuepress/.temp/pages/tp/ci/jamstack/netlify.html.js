export const data = {
  "key": "v-20bddf8c",
  "path": "/tp/ci/jamstack/netlify.html",
  "title": "Build, Deploy avec Netlify",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Dans ce document nous allons voir comment déployer une application simplement dans « le cloud » avec la plateforme Netlify."
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
      "title": "Principe de fonctionnement",
      "slug": "principe-de-fonctionnement",
      "children": [
        {
          "level": 3,
          "title": "JamStack ?",
          "slug": "jamstack",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Déployer un site",
      "slug": "deployer-un-site",
      "children": [
        {
          "level": 3,
          "title": "Créer le site sur Github / Gitlab",
          "slug": "creer-le-site-sur-github-gitlab",
          "children": []
        },
        {
          "level": 3,
          "title": "Connecter Github / Gitlab à Netlify",
          "slug": "connecter-github-gitlab-a-netlify",
          "children": []
        },
        {
          "level": 3,
          "title": "Compilation & Build",
          "slug": "compilation-build",
          "children": []
        },
        {
          "level": 3,
          "title": "Apporter des modifications",
          "slug": "apporter-des-modifications",
          "children": []
        },
        {
          "level": 3,
          "title": "Paramètrage",
          "slug": "parametrage",
          "children": []
        },
        {
          "level": 3,
          "title": "Aller plus loin",
          "slug": "aller-plus-loin",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1618912137000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 3
      }
    ]
  },
  "filePathRelative": "tp/ci/jamstack/netlify.md"
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
