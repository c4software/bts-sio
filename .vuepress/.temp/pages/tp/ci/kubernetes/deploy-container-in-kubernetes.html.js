export const data = {
  "key": "v-bbff927a",
  "path": "/tp/ci/kubernetes/deploy-container-in-kubernetes.html",
  "title": "Déployer une Image Docker dans Kubernetes",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Nous avons vu précédemment qu'il était possible de compiler puis de packager une application grâce à Gitlab-CI, dans ce TP nous allons voir comment déployer cette image (**présente dans un registry privée**) dans un cluster Kubernetes"
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
      "title": "Le Cluster",
      "slug": "le-cluster",
      "children": [
        {
          "level": 3,
          "title": "k3d",
          "slug": "k3d",
          "children": []
        },
        {
          "level": 3,
          "title": "Accès du cluster à distance",
          "slug": "acces-du-cluster-a-distance",
          "children": []
        },
        {
          "level": 3,
          "title": "kubectl ?",
          "slug": "kubectl",
          "children": []
        },
        {
          "level": 3,
          "title": "Les solutions payantes",
          "slug": "les-solutions-payantes",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Créer l'image Docker via Gitlab-CI",
      "slug": "creer-l-image-docker-via-gitlab-ci",
      "children": [
        {
          "level": 3,
          "title": "Le projet",
          "slug": "le-projet",
          "children": []
        },
        {
          "level": 3,
          "title": "Le Docker File",
          "slug": "le-docker-file",
          "children": []
        },
        {
          "level": 3,
          "title": "La CI",
          "slug": "la-ci",
          "children": []
        },
        {
          "level": 3,
          "title": "L'image Docker",
          "slug": "l-image-docker",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Déployer l'image sur le cluster Kubernetes",
      "slug": "deployer-l-image-sur-le-cluster-kubernetes",
      "children": [
        {
          "level": 3,
          "title": "Introduction",
          "slug": "introduction-1",
          "children": []
        },
        {
          "level": 3,
          "title": "Le secret",
          "slug": "le-secret",
          "children": []
        },
        {
          "level": 3,
          "title": "L'authentification avec le Registry Gitlab",
          "slug": "l-authentification-avec-le-registry-gitlab",
          "children": []
        },
        {
          "level": 3,
          "title": "La configuration",
          "slug": "la-configuration",
          "children": []
        },
        {
          "level": 3,
          "title": "Déployer votre application",
          "slug": "deployer-votre-application",
          "children": []
        },
        {
          "level": 3,
          "title": "Tester",
          "slug": "tester",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Déployer une mise à jour",
      "slug": "deployer-une-mise-a-jour",
      "children": [
        {
          "level": 3,
          "title": "Modifier le deployment.yml",
          "slug": "modifier-le-deployment-yml",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "La suite ?",
      "slug": "la-suite",
      "children": []
    },
    {
      "level": 2,
      "title": "L'usage en plus",
      "slug": "l-usage-en-plus",
      "children": [
        {
          "level": 3,
          "title": "Gestion multi paths",
          "slug": "gestion-multi-paths",
          "children": []
        },
        {
          "level": 3,
          "title": "Gestion multidomaine",
          "slug": "gestion-multidomaine",
          "children": []
        },
        {
          "level": 3,
          "title": "Créer un pod MariaDB utilisant un volume (persistant)",
          "slug": "creer-un-pod-mariadb-utilisant-un-volume-persistant",
          "children": []
        },
        {
          "level": 3,
          "title": "Accéder à un port sans le rendre public",
          "slug": "acceder-a-un-port-sans-le-rendre-public",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1624036282000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 27
      }
    ]
  },
  "filePathRelative": "tp/ci/kubernetes/deploy-container-in-kubernetes.md"
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
