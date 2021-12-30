export const data = {
  "key": "v-3f8aa970",
  "path": "/tp/devops/alpine-vm.html",
  "title": "VM Express : Alpine Linux, K3d & Docker",
  "lang": "fr-FR",
  "frontmatter": {
    "description": "Un petit TP/Guide rapide pour créer une VM légère et rapide afin d'héberger un cluster Kubernetes."
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
      "title": "L'ISO",
      "slug": "l-iso",
      "children": []
    },
    {
      "level": 2,
      "title": "L'installation",
      "slug": "l-installation",
      "children": [
        {
          "level": 3,
          "title": "Premier boot",
          "slug": "premier-boot",
          "children": []
        },
        {
          "level": 3,
          "title": "Premier reboot",
          "slug": "premier-reboot",
          "children": []
        },
        {
          "level": 3,
          "title": "Première étape : Les dépôts",
          "slug": "premiere-etape-les-depots",
          "children": []
        },
        {
          "level": 3,
          "title": "Installer les paquets",
          "slug": "installer-les-paquets",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Docker",
      "slug": "docker",
      "children": []
    },
    {
      "level": 2,
      "title": "K3D",
      "slug": "k3d",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1622408195000,
    "contributors": [
      {
        "name": "Valentin Brosseau",
        "email": "c4software@gmail.com",
        "commits": 6
      }
    ]
  },
  "filePathRelative": "tp/devops/alpine-vm.md"
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
