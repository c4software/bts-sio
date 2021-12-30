export const data = {
  "key": "v-4c50482b",
  "path": "/tp/ci/kubernetes/cd-avec-kubernetes.html",
  "title": "Livraison continue, Gitlab-CI + Kubernetes",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Nous avons vu que nous pouvions déployer une image Docker produite par Gitlab-CI « directement » dans un cluster Kubernetes. Dans ce TP nous allons voir comment il est possible d'automatiser ce (re)déploiement."
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
      "title": "Le retour de la question « On commit la configuration ? »",
      "slug": "le-retour-de-la-question-«-on-commit-la-configuration-»",
      "children": []
    },
    {
      "level": 2,
      "title": "Mise en place du CI/CD",
      "slug": "mise-en-place-du-ci-cd",
      "children": []
    },
    {
      "level": 2,
      "title": "Authentification (aka comment se connecter à votre serveur depuis la CI)",
      "slug": "authentification-aka-comment-se-connecter-a-votre-serveur-depuis-la-ci",
      "children": [
        {
          "level": 3,
          "title": "Création de la variable",
          "slug": "creation-de-la-variable",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Configuration et variable dans la CI",
      "slug": "configuration-et-variable-dans-la-ci",
      "children": [
        {
          "level": 3,
          "title": "Modifier le deployment.yaml",
          "slug": "modifier-le-deployment-yaml",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "3 étapes",
      "slug": "_3-etapes",
      "children": [
        {
          "level": 3,
          "title": "La commande sed",
          "slug": "la-commande-sed",
          "children": []
        },
        {
          "level": 3,
          "title": "Déterminer les actions de déploiement",
          "slug": "determiner-les-actions-de-deploiement",
          "children": []
        },
        {
          "level": 3,
          "title": "Solution alternative",
          "slug": "solution-alternative",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Un résultat possible",
      "slug": "un-resultat-possible",
      "children": []
    },
    {
      "level": 2,
      "title": "Image multi-architectures ?",
      "slug": "image-multi-architectures",
      "children": []
    },
    {
      "level": 2,
      "title": "Déployer dans un cluster « privés »",
      "slug": "deployer-dans-un-cluster-«-prives-»",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1623941605000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 16
      }
    ]
  },
  "filePathRelative": "tp/ci/kubernetes/cd-avec-kubernetes.md"
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
