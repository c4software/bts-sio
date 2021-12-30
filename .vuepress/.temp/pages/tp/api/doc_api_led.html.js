export const data = {
  "key": "v-8e9ba06e",
  "path": "/tp/api/doc_api_led.html",
  "title": "Fake LED Api",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Cette documentation décrit le fonctionnement de l'API « Fake LED »"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Modèle",
      "slug": "modele",
      "children": []
    },
    {
      "level": 2,
      "title": "Status",
      "slug": "status",
      "children": []
    },
    {
      "level": 2,
      "title": "API",
      "slug": "api",
      "children": [
        {
          "level": 3,
          "title": "Allumer",
          "slug": "allumer",
          "children": []
        },
        {
          "level": 3,
          "title": "Éteindre",
          "slug": "eteindre",
          "children": []
        },
        {
          "level": 3,
          "title": "Obtenir le status",
          "slug": "obtenir-le-status",
          "children": []
        },
        {
          "level": 3,
          "title": "Obtenir l'ensemble des états",
          "slug": "obtenir-l-ensemble-des-etats",
          "children": []
        },
        {
          "level": 3,
          "title": "Allumer & Éteindre en indiquant la position",
          "slug": "allumer-eteindre-en-indiquant-la-position",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1556031685000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "tp/api/doc_api_led.md"
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
