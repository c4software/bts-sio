export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "Support de Cours & TP",
  "lang": "fr-FR",
  "frontmatter": {
    "next": {
      "text": "GitHub",
      "link": "https://github.com/c4software/bts-sio"
    }
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
      "title": "Programme de l'année",
      "slug": "programme-de-l-annee",
      "children": []
    },
    {
      "level": 2,
      "title": "Contenu",
      "slug": "contenu",
      "children": [
        {
          "level": 3,
          "title": "Compétences",
          "slug": "competences",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Licence",
      "slug": "licence",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1614354508000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 61
      },
      {
        "name": "Valentin Brosseau",
        "email": "vbrosseau@afone.com",
        "commits": 3
      },
      {
        "name": "Brosseau Valentin",
        "email": "c4software@gmail.com",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "README.md"
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
