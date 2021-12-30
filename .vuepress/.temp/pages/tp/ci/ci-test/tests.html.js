export const data = {
  "key": "v-8f299b06",
  "path": "/tp/ci/ci-test/tests.html",
  "title": "Tester en continu",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "L'autre gros avantage d'une stack d'intégration continue c'est la partie « test en continu ». Actuellement il y a fort à parier que vous avez appris que vous pouviez tester vos projets pour garantir la bonne qualité du code que vous produisez, mais également vous assurer de la non-régression."
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Les tests et le JavaScript",
      "slug": "les-tests-et-le-javascript",
      "children": []
    },
    {
      "level": 2,
      "title": "Modifier les tests",
      "slug": "modifier-les-tests",
      "children": []
    },
    {
      "level": 2,
      "title": "Intégrer le test dans un flow CI/CD entier",
      "slug": "integrer-le-test-dans-un-flow-ci-cd-entier",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1618936592000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "tp/ci/ci-test/tests.md"
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
