export const data = {
  "key": "v-253f9046",
  "path": "/pages/contact.html",
  "title": "Une question ?",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Vous avez des questions ? Vous souhaitez plus d'informations sur un cours."
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Par Twitter",
      "slug": "par-twitter",
      "children": []
    },
    {
      "level": 2,
      "title": "Par email",
      "slug": "par-email",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1605435525000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "pages/contact.md"
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
