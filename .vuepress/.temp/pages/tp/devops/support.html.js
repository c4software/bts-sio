export const data = {
  "key": "v-3b914ee2",
  "path": "/tp/devops/support.html",
  "title": "Complément du cours Dev Ops",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Ce document est un complément du cours. Il vous permettra de revenir sur les différentes notions avec différents exemples."
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
      "title": "Docker",
      "slug": "docker",
      "children": [
        {
          "level": 3,
          "title": "Introduction",
          "slug": "introduction-1",
          "children": []
        },
        {
          "level": 3,
          "title": "Les microservices",
          "slug": "les-microservices",
          "children": []
        },
        {
          "level": 3,
          "title": "Containers ou Machines virtuelles ?",
          "slug": "containers-ou-machines-virtuelles",
          "children": []
        },
        {
          "level": 3,
          "title": "Pour résumer Docker c’est :",
          "slug": "pour-resumer-docker-c-est",
          "children": []
        },
        {
          "level": 3,
          "title": "Créer des machines simplement",
          "slug": "creer-des-machines-simplement",
          "children": []
        },
        {
          "level": 3,
          "title": "La ligne de commande",
          "slug": "la-ligne-de-commande",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Quelques paramètres de la ligne de commande",
      "slug": "quelques-parametres-de-la-ligne-de-commande",
      "children": [
        {
          "level": 3,
          "title": "Les volumes",
          "slug": "les-volumes",
          "children": []
        },
        {
          "level": 3,
          "title": "Quelques cas d'usage",
          "slug": "quelques-cas-d-usage",
          "children": []
        },
        {
          "level": 3,
          "title": "Mettre en pratique",
          "slug": "mettre-en-pratique",
          "children": []
        },
        {
          "level": 3,
          "title": "Le DockerFile",
          "slug": "le-dockerfile",
          "children": []
        },
        {
          "level": 3,
          "title": "Le Docker Compose",
          "slug": "le-docker-compose",
          "children": []
        },
        {
          "level": 3,
          "title": "Les alternatives",
          "slug": "les-alternatives",
          "children": []
        },
        {
          "level": 3,
          "title": "Une stack complète sur un Raspberry Pi",
          "slug": "une-stack-complete-sur-un-raspberry-pi",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "CI / CD",
      "slug": "ci-cd",
      "children": [
        {
          "level": 3,
          "title": "Introduction",
          "slug": "introduction-2",
          "children": []
        },
        {
          "level": 3,
          "title": "CI (Intégration continue)",
          "slug": "ci-integration-continue",
          "children": []
        },
        {
          "level": 3,
          "title": "CD (Déploiement continu / Livraison continue)",
          "slug": "cd-deploiement-continu-livraison-continue",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Gitlab CI",
      "slug": "gitlab-ci",
      "children": [
        {
          "level": 3,
          "title": "Gitlab-ci.yml",
          "slug": "gitlab-ci-yml",
          "children": []
        },
        {
          "level": 3,
          "title": "Gitlab Pages",
          "slug": "gitlab-pages",
          "children": []
        },
        {
          "level": 3,
          "title": "Tester en continu",
          "slug": "tester-en-continu",
          "children": []
        },
        {
          "level": 3,
          "title": "Compilation d'application",
          "slug": "compilation-d-application",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Netlify",
      "slug": "netlify",
      "children": [
        {
          "level": 3,
          "title": "La JamStack ?",
          "slug": "la-jamstack",
          "children": []
        },
        {
          "level": 3,
          "title": "Déployer un site automatiquement",
          "slug": "deployer-un-site-automatiquement",
          "children": []
        },
        {
          "level": 3,
          "title": "FaaS",
          "slug": "faas",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1619421772000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 9
      }
    ]
  },
  "filePathRelative": "tp/devops/support.md"
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
