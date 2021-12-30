export const data = {
  "key": "v-72b228d8",
  "path": "/cours/cicd.html",
  "title": "CI/CD",
  "lang": "fr-FR",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1619116944000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "cours/cicd.md"
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
