export const data = {
  "key": "v-e3e5f5fe",
  "path": "/cheatsheets/vuejs/",
  "title": "Aide mémoire VueJS 2.0",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Le document présent ainsi que les supports de cours et TP sont actuellement écrits pour VueJS 2.0"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "VueCLI (Recommandé pour les débutants)",
      "slug": "vuecli-recommande-pour-les-debutants",
      "children": []
    },
    {
      "level": 2,
      "title": "Utilisation en mode « standalone »",
      "slug": "utilisation-en-mode-«-standalone-»",
      "children": []
    },
    {
      "level": 2,
      "title": "Les évènements",
      "slug": "les-evenements",
      "children": []
    },
    {
      "level": 2,
      "title": "Cycle de vie",
      "slug": "cycle-de-vie",
      "children": []
    },
    {
      "level": 2,
      "title": "Les directives",
      "slug": "les-directives",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1609190464000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 4
      }
    ]
  },
  "filePathRelative": "cheatsheets/vuejs/README.md"
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
