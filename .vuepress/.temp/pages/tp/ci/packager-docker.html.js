export const data = {
  "key": "v-7f9c4087",
  "path": "/tp/ci/packager-docker.html",
  "title": "Packager une application avec Docker",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Nous avons vu précédemment qu'il était possible de compiler, déployer, voire de créer un Artifact (livrable) avec l'intégration continue. Cependant nous pouvons aller bien plus loin, nous pouvons carrément créer un conteneur Docker directement depuis le CI."
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Objectif",
      "slug": "objectif",
      "children": []
    },
    {
      "level": 2,
      "title": "Créer un projet sur Gitlab",
      "slug": "creer-un-projet-sur-gitlab",
      "children": [
        {
          "level": 3,
          "title": "Ajouter l'application à packager",
          "slug": "ajouter-l-application-a-packager",
          "children": []
        },
        {
          "level": 3,
          "title": "Commiter / pusher une première version",
          "slug": "commiter-pusher-une-premiere-version",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Ajouter un gitlab-ci.yml",
      "slug": "ajouter-un-gitlab-ci-yml",
      "children": [
        {
          "level": 3,
          "title": "Tester",
          "slug": "tester",
          "children": []
        },
        {
          "level": 3,
          "title": "Dockeriser",
          "slug": "dockeriser",
          "children": []
        },
        {
          "level": 3,
          "title": "Packager",
          "slug": "packager",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Tester depuis votre poste l'image obtenue",
      "slug": "tester-depuis-votre-poste-l-image-obtenue",
      "children": [
        {
          "level": 3,
          "title": "Vous connecter",
          "slug": "vous-connecter",
          "children": []
        },
        {
          "level": 3,
          "title": "Lancer votre image",
          "slug": "lancer-votre-image",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Apporter des modifications",
      "slug": "apporter-des-modifications",
      "children": []
    },
    {
      "level": 2,
      "title": "Booster les performances",
      "slug": "booster-les-performances",
      "children": [
        {
          "level": 3,
          "title": "Image multi-architectures ?",
          "slug": "image-multi-architectures",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1620765374000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 4
      }
    ]
  },
  "filePathRelative": "tp/ci/packager-docker.md"
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
