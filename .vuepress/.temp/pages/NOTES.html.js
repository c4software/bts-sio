export const data = {
  "key": "v-303d92de",
  "path": "/NOTES.html",
  "title": "Notes sur les temps sur chaque « cours »",
  "lang": "fr-FR",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "2019",
      "slug": "_2019",
      "children": []
    },
    {
      "level": 2,
      "title": "2020",
      "slug": "_2020",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1607806439000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 9
      }
    ]
  },
  "filePathRelative": "NOTES.md"
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
