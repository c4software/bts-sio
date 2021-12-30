export const data = {
  "key": "v-2e9c68e8",
  "path": "/tp/docker/dockerfile.html",
  "title": "Les Dockerfile’s",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Comme nous l’avons chaque image Docker repose sur un fichier Dockerfile. Pour l’instant, nous n’avons pas écrit le nôtre, nous avons juste utilisé ceux fournis sur le DockerHub. Dans ce TP nous allons voir la structure d’un fichier Dockerfile, et vous allez écrire votre premier Dockerfile. Il aura pour but de définir l’ensemble de la « stack applicative » nécessaire au bon fonctionnement de l’application « TODO »."
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
      "title": "Pourquoi faire des Dockerfile",
      "slug": "pourquoi-faire-des-dockerfile",
      "children": []
    },
    {
      "level": 2,
      "title": "Créer un Dockerfile",
      "slug": "creer-un-dockerfile",
      "children": []
    },
    {
      "level": 2,
      "title": "Builder votre image",
      "slug": "builder-votre-image",
      "children": []
    },
    {
      "level": 2,
      "title": "Image Docker pour l’application \"TODO\"",
      "slug": "image-docker-pour-l-application-todo",
      "children": [
        {
          "level": 3,
          "title": "1. Écriture du Dockerfile",
          "slug": "_1-ecriture-du-dockerfile",
          "children": []
        },
        {
          "level": 3,
          "title": "2. Ajout des sources dans l’image",
          "slug": "_2-ajout-des-sources-dans-l-image",
          "children": []
        },
        {
          "level": 3,
          "title": "3. Build de l’image",
          "slug": "_3-build-de-l-image",
          "children": []
        },
        {
          "level": 3,
          "title": "4. Lancer votre application",
          "slug": "_4-lancer-votre-application",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1618769299000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 18
      }
    ]
  },
  "filePathRelative": "tp/docker/dockerfile.md"
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
