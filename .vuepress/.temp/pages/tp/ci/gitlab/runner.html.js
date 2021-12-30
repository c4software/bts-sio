export const data = {
  "key": "v-1a33b904",
  "path": "/tp/ci/gitlab/runner.html",
  "title": "Installation & Configuration d'un Runner",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Dans ce TP nous allons voir comment installer un Runner Gitlab-CI sur votre machine. Posséder un Runner Gitlab aura plusieurs avantages que nous détaillerons au fur et à mesure ensemble."
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
      "title": "L'exécuteur",
      "slug": "l-executeur",
      "children": [
        {
          "level": 3,
          "title": "Comment choisir ?",
          "slug": "comment-choisir",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Installation",
      "slug": "installation",
      "children": [
        {
          "level": 3,
          "title": "En mode « natif » (binaire)",
          "slug": "en-mode-«-natif-»-binaire",
          "children": []
        },
        {
          "level": 3,
          "title": "Dans un Docker",
          "slug": "dans-un-docker",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Configuration & Test",
      "slug": "configuration-test",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1621884336000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 3
      }
    ]
  },
  "filePathRelative": "tp/ci/gitlab/runner.md"
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
