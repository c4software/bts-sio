export default [
    {
        text: "Aides mémoires",
        link: "/pages/categories/aide-memoires.md",
    },

    {
        collapsed: true, text: "Veille & Ressources",
        items: [
            { text: "La veille de développeur", link: "/cours/veille.md" },
            { text: "Ressources veille & développement", link: "/tp/veille/ressources.md" }
        ]
    },

    {
        text: "Programmation Orientée Objet",
        collapsed: true,
        items: [
            { text: "Introduction", link: "/pages/categories/les-concepts.md" },
            {
                text: "Le cours", collapsed: true, items: [
                    { text: "Les bases", link: "/cours/poo" },
                    { text: "Les Interfaces", link: "/cours/les_interfaces" },
                    { text: "Le polymorphisme", link: "/cours/poo_redefinition_polymorphisme" },
                    { text: "Lire un diagramme de classe UML", link: "/cours/uml" },
                ]
            },
            {
                text: "Aide mémoire",
                collapsed: true,
                items: [
                    { link: "/cheatsheets/poo-uml/", text: "Représentation UML" },
                    { link: "/cheatsheets/poo/", text: "Programation Orientée Objet" }
                ]
            },
            {
                "text": "Les exercices",
                "collapsed": true,
                items: [
                    { text: "Entrainement multi exercices", link: "/pages/urdle" },
                    { text: "Redéfinition", link: "/cours/exercices/poo/redefinition", },
                    { text: "Polymorphisme", link: "/cours/exercices/poo/polymorphisme" },
                    { text: "Les Interface 1", link: "/cours/exercices/poo/les-interfaces-1" },
                    { text: "Les Interface 2", link: "/cours/exercices/poo/les-interfaces-2" },
                    { text: "Les classes abstraites", link: "/cours/exercices/poo/les-classes-abstraites.md" }
                ]
            },

        ]
    },

    {
        text: "Le versionning",
        collapsed: true,
        items: [
            {
                text: "Initiation à Git", collapsed: true,
                items: [
                    { text: "Slides", link: "/cours/git" },
                    { text: "Initiation à GIT", link: "/tp/git_initiation/" }
                ]
            },
            {
                text: "Git en groupe + GitLab", collapsed: true, items: [
                    { text: "Slides Gitlab", link: "/cours/gitlab" },
                    { text: "Utiliser Gitlab", link: "/tp/gitlab/" },
                    { text: "Gitlab à plusieurs", link: "/tp/gitlab/projet-collaboratif.md" },
                ]
            },
            { text: "En + du cours", link: "/cheatsheets/git/" },
            { text: "La clé SSH", link: "/cheatsheets/ssh-key/" },
        ]
    },

    {
        text: "HTML + CSS",
        collapsed: true,
        items: [
            {
                text: "Le cours", collapsed: true, items: [
                    { text: "Slides HTML + CSS", link: "/cours/introduction_html_css" },
                    { text: "Maquetter un site Internet", link: "/tp/html_css/maquette.md" }]
            },
            {
                text: "En + du cours", collapsed: true, items: [
                    { text: "Aide mémoire HTML", link: "/cheatsheets/html/" },
                    { text: "Complément cours CSS", link: "/tp/html_css/support.md" }]
            },
            {
                collapsed: true,
                text: "Les TP",
                items: [
                    { text: "Découverte du HTML", link: "/tp/html_css/tp1.md" },
                    { text: "Découverte de la CSS", link: "/tp/html_css/tp2.md" },
                    { text: "Mise en pratique CSS", link: "/tp/html_css/tp3.md" },
                    { text: "Mise en pratique Responsive", link: "/tp/html_css/tp4.md" },
                    { text: "Mon CV", link: "/tp/html_css/tp5.md" },
                ]
            },
            {
                collapsed: true,
                text: "Librairies",
                items: [
                    { text: "Découverte de Bootstrap", link: "/tp/html_css/bootstrap.md" },
                    { text: "Découverte de Tailwind", link: "/tp/html_css/tailwind.md" },
                ]
            },
        ]
    },

    {
        text: "Le JavaScript",
        collapsed: true,
        items: [
            {
                text: "Le cours", collapsed: true, items: [
                    { text: "Slides JavaScript", link: "/cours/introduction_javascript" },
                    { text: "Complément cours JavaScript", link: "/tp/javascript/support.md" },
                    { text: "Slides JavaScript avancé", link: "/cours/javascript_avances" },
                    { text: "Slides Framework JavaScript", link: "/cours/framework_javascript" }
                ]
            },
            {
                text: "Les TP basiques", collapsed: true, items: [
                    { text: "Hello World", link: "/tp/javascript/tp1.md" },
                    { text: "Des variables en veux tu en voilà !", link: "/tp/javascript/tp1.1.md" },
                    { text: "Une petite mise en bouche", link: "/tp/javascript/tp1.2.md" },
                    { text: "Le retour de Bart", link: "/tp/javascript/tp2.md" },
                    { text: "Contrôle de saisie & intéractivité", link: "/tp/javascript/tp3.md" },
                    { text: "Intéractivité", link: "/tp/javascript/tp3.1.md" },
                    { text: "Les librairies pour vous sauvez", link: "/tp/javascript/tp5.md" }
                ]
            },
            {
                text: "Javascript avancé", collapsed: true, items: [
                    { text: "Prise en main « JavaScript Avancé »", link: "/tp/javascript_avances/introduction" },
                    { text: "Questions complémentaires", link: "/tp/javascript_avances/revision" },
                    { text: "Pratiquer l'Ajax", link: "/tp/javascript/tp4.md" },
                    { text: "La Greta TV 2.0 (Ajax)", link: "/tp/javascript/tp4.1.md" },
                    { text: "Larablog 2.0 (Ajax & VueJS)", link: "/tp/javascript/tp6.md" }
                ]
            },
        ]
    },

    {
        text: "Le PHP",
        collapsed: true,
        items: [
            {
                text: "Les cours", collapsed: true, items: [
                    { text: "Slides introduction PHP", link: "/cours/introduction_php" },
                    { text: "Slides introduction à SQL avec PHP", link: "/cours/introduction_sql_php" }
                ]
            },
            {
                text: "En + du cours", collapsed: true, items: [
                    { text: "Complément du cours PHP", link: "/tp/php/support.md" },
                    { text: "Complément cours SQL", link: "/tp/php/sql/support.md" }
                ]
            },
            {
                text: "TP bases", collapsed: true, items: [
                    { text: "Créer ma première page PHP", link: "/tp/php/tp1.md" },
                    { text: "Le passage de paramètres", link: "/tp/php/tp-param.md" },
                    { text: "Le générateur de Bart", link: "/tp/php/tp1.1.md" },
                    { text: "Utiliser des includes et une librairie", link: "/tp/php/tp1.2.md" },
                    { text: "Jouer avec les formulaires", link: "/tp/php/tp2.md" },
                    { text: "Structurer mon code", link: "/tp/php/tp3.md" },
                    { text: "Utiliser la session", link: "/tp/php/tp4.md" },
                    { text: "Protéger des pages à l'aide de la session", link: "/tp/php/tp5.md" }
                ]
            },
            {
                text: "TP SQL", collapsed: true, items: [
                    { text: "Bart PHP et MySQL", link: "/tp/php/sql/tp5.md" },
                    { text: "Greta TV - Administrable", link: "/tp/php/sql/tp6.md" }
                ]
            }
        ]
    },

    {
        text: "L'organisation",
        collapsed: true,
        items: [
            { text: "Slides Organisation", link: "/cours/organisations" },
            { text: "(Ré)organiser mon code", link: "/tp/organisation/introduction" }
        ]
    },

    {
        text: "Le PHP Avancé",
        collapsed: true,
        items: [
            { text: "Introduction", link: "/pages/categories/le-web.md" },
            {
                text: "MVC",
                collapsed: true,
                items: [
                    { text: "Le cours", link: "/cours/mvc" },
                    {
                        text: "En + du cours", collapsed: true, items: [
                            { text: "Aide mémoire Mini MVC Sample", link: "/cheatsheets/mini-mvc-sample/" }
                        ]
                    },
                    {
                        text: "Les TP",
                        collapsed: true,
                        items: [
                            { text: "Structure de développement MVC", link: "/tp/php/mvc/tp1.md" },
                            { text: "TP TODO List", link: "/tp/php/mvc/tp1.1.md" },
                            { text: "Pratiquer la POO et le MVC", link: "/tp/php/mvc/tp2.md" }
                        ]
                    }
                ]
            },
            {
                text: "Laravel", collapsed: true, items: [
                    { text: "Le cours", link: "/cours/laravel" },
                    { text: "En + du cours", collapsed: true, items: ["/cheatsheets/laravel/", "/cheatsheets/laravel/quick.md"] },
                    {
                        text: "Les TP",
                        collapsed: true,
                        items: [
                            { text: "Introduction à Laravel", link: "/tp/laravel/introduction" },
                            { text: "Laravel & L'authentification", link: "/tp/laravel/authentification" },
                            { text: "Eloquent les modèles simplement", link: "/tp/laravel/generation_model" },
                            { text: "Projet - Larablog", link: "/tp/laravel/larablog.md" },
                            { text: "Larablog 2.0 (Ajax & VueJS)", link: "/tp/javascript/tp6.md" },
                            { text: "Des API avec Laravel", link: "/tp/laravel/api_produit" },
                            { text: "Déployer un site Laravel", link: "/tp/ops/deployer-laravel.md" }
                        ]
                    }
                ]
            }
        ]
    },

    {
        text: "Les composants",
        collapsed: true,
        items: [
            { text: "Le cours", link: "/cours/composants" },
            {
                text: "Les TP",
                collapsed: true,
                items: [
                    { text: "Les composants avec VueJS 3", link: "/tp/composants/vuejs" },
                    { text: "Introduction à Android Compose", link: "/tp/composants/android" }
                ]
            }
        ]
    },

    {
        text: "Les API",
        collapsed: true,
        items: [
            {
                text: "Le cours",
                collapsed: true,
                items: [
                    { text: "Slides Introduction API", link: "/cours/introduction_api" },
                    { text: "Aide mémoire API", link: "/cheatsheets/api/" },
                    { text: "Exercice passage de paramètres", link: "/tp/api/exercice.md" }
                ]
            },
            {
                text: "Flask (Python)",
                collapsed: true,
                items: [
                    { text: "Slides Python", link: "/cours/python" },
                    { text: "Découvrir Flask", link: "/tp/python/flask" },
                    { text: "Écrire des API avec Flask", link: "/tp/python/flask_todolist_api" }
                ]
            },
            {
                text: "Laravel", collapsed: true, items: [
                    { text: "Des API avec Laravel", link: "/tp/laravel/api_produit" }
                ]
            },
            {
                text: "TypeScript", collapsed: true, items: [
                    { text: "Réaliser une API avec Bun.sh et TypeScript", link: "/tp/typescript/api" }
                ]
            }
        ]
    },


    {
        text: "Sécurité du code (OWASP)",
        collapsed: true,
        items: [
            { text: "Le cours", link: "/cours/securite_applications" },
            { text: "Synthèse du cours", link: "/cheatsheets/owasp/" },
            { text: "Exercices OWASP", link: "/tp/securite/exercice.md" },
            { text: "TP Sécurité", link: "/tp/securite/" }
        ]
    },

    {
        text: "VueJS",
        collapsed: true,
        items: [
            {
                text: "Le cours",
                collapsed: true,
                items: [
                    { text: "Slides VueJS", link: "/cours/vuejs" },
                    { text: "Aide mémoire VueJS 2.0", link: "/cheatsheets/vuejs/" }
                ]
            },
            {
                text: "Exemples",
                collapsed: true,
                items: [
                    { text: "Demo 1", link: "/cours/demo/vuejs/demo1" },
                    { text: "Compteur", link: "/cours/demo/vuejs/counter" },
                    { text: "Horloge", link: "/cours/demo/vuejs/clock" },
                    { text: "Horloge 2", link: "/cours/demo/vuejs/timestamp-color" },
                    { text: "Sonomètre", link: "/cours/demo/vuejs/sound" },
                    { text: "1-2 Vue", link: "/cours/demo/vuejs/12vue" },
                    { text: "Chat", link: "/cours/demo/vuejs/chat" }
                ]
            },
            {
                text: "TP Vue 2.X",
                collapsed: true,
                items: [
                    { text: "Prise en main de VueJS 2.0", link: "/tp/vuejs/tp0.md" },
                    { text: "Ajouter VueJS 2.0 + Laravel", link: "/tp/vuejs/tp1-vuejs-laravel-api" },
                    { text: "Ajouter VueJS 2.0 dans une application existante", link: "/tp/vuejs/tp1" },
                    { text: "Réaliser une application avec VueJS 2.0", link: "/tp/vuejs/tp2" },
                    { text: "Firebase + VueJS 2.0", link: "/tp/vuejs/firebase-vuejs" },
                    { text: "Vuetify + VueJS 2.0", link: "/tp/vuejs/vuetify-vuejs.md" }
                ]
            },
            {
                text: "TP Vue 3.X",
                collapsed: true,
                items: [
                    { text: "Prise en main VueJS 3", link: "/tp/vuejs3/tp0.md" },
                    { text: "Suite prise en main VueJS 3", link: "/tp/vuejs3/tp1.md" },
                    { text: "Découverte de ViteJS", link: "/tp/vuejs3/vite.md" },
                    { text: "VueJS 3 et un routeur", link: "/tp/vuejs3/routeur.md" },
                    { text: "Vuetify + VueJS 3", link: "/tp/vuejs3/vuetify.md" },
                    { text: "Créer une application Web avec VueJS 3", link: "/tp/vuejs3/application.md" },
                    { text: "Firebase + VueJS 3", link: "/tp/vuejs3/firebase.md" },
                    { text: "Petite Vue : Vue par petite dose", link: "/tp/vuejs3/petite-vue.md" }
                ]
            }
        ]
    },


    {
        text: "Mobile",
        collapsed: true,
        items: [
            { text: "Introduction", link: "/pages/categories/le-mobile.md" },
            {
                text: "Android",
                collapsed: true,
                items: [
                    {
                        text: "Le cours",
                        collapsed: true,
                        items: [
                            { text: "Slides Android Base", link: "/cours/android_base" },
                            { text: "Slides Android + BLE", link: "/cours/android_ble" },
                            { text: "Slides Android + HTTP", link: "/cours/android_http" },
                            { text: "Slides Android + Compose", link: "/cours/android_compose.md" }
                        ]
                    },
                    {
                        text: "Les TP simple",
                        collapsed: true,
                        items: [
                            { text: "Découverte des bases d'Android", link: "/tp/android/android-base-tp" },
                            { text: "Suite découverte des base d'Android", link: "/tp/android/android-base2-tp" },
                            { text: "Introduction à Android Compose", link: "/tp/composants/android" }
                        ]
                    },
                    {
                        text: "Les TP API",
                        collapsed: true,
                        items: [
                            { text: "Appeler une API Simplement", link: "/tp/android/network" }
                        ]
                    },
                    {
                        text: "Les projets",
                        collapsed: true,
                        items: [
                            { text: "Android Base : Projet final", link: "/tp/android/app-base-android.md" },
                            { text: "Télécommand Bluetooth & Réseau", link: "/tp/android/app-ble-network.md" },
                            { text: "Application Client / Serveur", link: "/tp/android/app-avance-android.md" }
                        ]
                    },
                    {
                        text: "Jetpack Compose",
                        collapsed: true,
                        items: [
                            { text: "Introduction à Android Compose", link: "/tp/composants/android.md" },
                            { text: "Android Compose, une liste et une API REST", link: "/tp/android/compose/dirty-api.md" }
                        ]
                    },
                    {
                        text: "Code d'exemple",
                        collapsed: true,
                        items: [
                            {
                                text: "Explication structure « Android Boilerplate »", link: "/tp/android/sample-explication"
                            }
                        ]
                    }
                ]
            },
            { text: "Flutter", collapsed: true, items: [{ text: "", link: "/tp/flutter/sample_code" }] },
            {
                text: "Cordova (Ancien)",
                collapsed: true,
                items: [
                    { text: "Slides Cordova", link: "/cours/cordova" },
                    { text: "En + du cours", link: "/cheatsheets/cordova/" },
                    { text: "Découverte de Cordova", link: "/tp/cordova/decouverte" },
                    { text: "VueJS et Cordova", link: "/tp/cordova/vuejs_cordova" },
                    { text: "VueJS, le réseau et une LED", link: "/tp/cordova/vuejs_api_led" },
                    { text: "Fake LED API", link: "/tp/api/doc_api_led" }
                ]
            }
        ]
    },

    {
        text: "DevOps / Serveur",
        collapsed: true,
        items: [
            { text: "Introduction", link: "/pages/categories/les-serveurs.md" },
            {
                text: "Les cours",
                collapsed: true,
                items: [
                    { text: "Serveur / DevOps", link: "/cours/serveur.md" },
                    { text: "Slides Docker", link: "/cours/docker" },
                    { text: "CI/CD", link: "/cours/cicd" },
                    { text: "Slides Gitlab-CI", link: "/cours/gitlabci" }
                ]
            },
            {
                text: "En + du cours",
                collapsed: true,
                items: [
                    { text: "Complément du cours Serveur", link: "/tp/devops/serveur/support.md" },
                    { text: "Complément du cours DevOps (Docker + CI/CD)", link: "/tp/devops/support-docker-cicd.md" }
                ]
            },
            {
                text: "Les TP",
                collapsed: true,
                items: [
                    {
                        text: "La base",
                        collapsed: true,
                        items: [
                            { text: "TP1. Créer une VM sur la ferme", link: "/tp/devops/serveur/tp1.md" },
                            { text: "TP1. Créer une VM sur la ferme à partir d'un modèle", link: "/tp/devops/serveur/tp1alt.md" },
                            { text: "TP1b. Installer votre premier serveur", link: "/tp/devops/serveur/tp1b.md" },
                            { text: "TP1c. Prendre en main la ligne de commande", link: "/tp/devops/serveur/tp1c.md" },
                            { text: "TP2. Configurer un serveur Web", link: "/tp/devops/serveur/tp2.md" },
                            { text: "TP3. Configrer un serveur de base de données", link: "/tp/devops/serveur/tp3.md" },
                            { text: "TP4. Déployer (et redéployer) son code sur un serveur", link: "/tp/devops/serveur/tp4.md" },
                            { text: "TP5. Créer un serveur Web et base de données", link: "/tp/devops/serveur/tp5.md" }
                        ]
                    },
                    {
                        text: "Docker",
                        collapsed: true,
                        items: [
                            { text: "Introduction à Docker", link: "/tp/docker/introduction.md" },
                            { text: "Déployer Docker sur un serveur", link: "/tp/docker/deployer-docker-sur-un-serveur.md" },
                            { text: "Créer des services très rapidement (et simplement)", link: "/tp/docker/creer_server_local.md" },
                            { text: "Les Dockerfile's", link: "/tp/docker/dockerfile.md" },
                            { text: "Le Docker Compose", link: "/tp/docker/docker_compose.md" }
                        ]
                    },
                    {
                        text: "L'intégration continue",
                        collapsed: true,
                        items: [
                            { text: "Utiliser Gitlab Pages", link: "/tp/ci/pages" },
                            { text: "Tester en continue", link: "/tp/ci/ci-test/tests" },
                            { text: "Packager une application avec Docker", link: "/tp/ci/packager-docker" },
                            { text: "Compiler une application hybride avec Gitlab-CI", link: "/tp/ci/ci-hybride" },
                            { text: "Installation & Configuration d'un Runner Gitlab", link: "/tp/ci/gitlab/runner.md" },
                            { text: "SonarQube", link: "/tp/devops/sonarqube/sonarqube.md" },
                            { text: "Intégration continue avec Laravel", link: "/tp/ops/deployer-laravel-ci.md" }
                        ]
                    },
                    {
                        text: "Déployer un site static",
                        collapsed: true,
                        items: [
                            { text: "Build, Deploy avec Netlify", link: "/tp/ci/jamstack/netlify.md" },
                            { text: "Déployer votre portfolio avec Netlify", link: "/tp/ci/jamstack/netlify-portfolio.md" },
                            { text: "Déployer votre portfolio avec Gitlab-CI", link: "/tp/ci/pages-portfolio.md" }
                        ]
                    },
                    {
                        text: "Kubernetes",
                        collapsed: true,
                        items: [
                            {
                                text: "Déployer une Image Docker dans Kubernetes", link: "/tp/ci/kubernetes/deploy-container-in-kubernetes.md"
                            },
                            {
                                text: "Livraison continue, Gitlab-CI + Kubernetes", link: "/tp/ci/kubernetes/cd-avec-kubernetes.md"
                            }
                        ]
                    },
                    {
                        text: "OpenFaas",
                        collapsed: true,
                        items: [
                            {
                                text: "Création stack OpenFaas (faasd) local via Multipass", link: "/tp/openfaas/openfaas-quicky-installation"
                            },
                            {
                                text: "Création stack OpenFaas (faasd) sur un Raspberry Pi", link: "/tp/openfaas/openfaas-quicky-installation-pi"
                            },
                            {
                                text: "Création d'un projet OpenFaas (Express)", link: "/tp/openfaas/openfaas-quicky-create-faas"
                            }
                        ]
                    },
                    {
                        text: "Firebase",
                        collapsed: true,
                        items: [
                            {
                                text: "Déploiement continue d'un projet Firebase (function, web, …)", link: "/tp/ci/firebase/functions.md"
                            }
                        ]
                    }
                ]
            },

            {
                text: "Les procédures",
                collapsed: true,
                items: [
                    {
                        text: "Debian",
                        collapsed: true,
                        items: [
                            { link: "/tp/devops/serveur/tp1.md", text: "Créer une VM sur la ferme" },
                            { link: "/tp/devops/serveur/tp1alt.md", text: "Utiliser les modèles sur la ferme" },
                            { link: "/cheatsheets/serveur/linux-debian-based.md", text: "Linux à base Debian" },
                            { link: "/cheatsheets/serveur/debian-reseau.md", text: "Générateur de config réseau" },
                            { link: "/cheatsheets/serveur/debian-web.md", text: "Debian : Apache, PHP, MariaDB" },
                            { link: "/cheatsheets/serveur/debian-docker.md", text: "Installer Docker sur Debian" }
                        ]
                    },
                    {
                        text: "Laravel",
                        collapsed: true,
                        items: [
                            { text: "Déployer un site Laravel", link: "/tp/ops/deployer-laravel.md" },
                            { text: "Déployer un site Laravel avec Docker", link: "/tp/ops/deployer-laravel-docker.md" },
                            { text: "Intégration continue avec Laravel", link: "/tp/ops/deployer-laravel-ci.md" }
                        ]
                    },
                    {
                        text: "Alpine Linux",
                        collapsed: true,
                        items: [
                            {
                                text: "Alpine Linux, K3d & Docker", link: "/tp/devops/alpine-vm.md"
                            }
                        ]
                    },
                    {
                        text: "Mini MVC Sample",
                        collapsed: true,
                        items: [
                            {
                                text: "Déployer Mini-MVC-Sample sur Apache", link: "/tp/ops/mini-mvc-sample/deployer-mini-mvc-sample.md"
                            },
                            {
                                text: "Déployer Mini-MVC-Sample avec Docker", link: "/tp/ops/mini-mvc-sample/mini-mvc-sample-docker.md"
                            }
                        ]
                    },
                    {
                        text: "Transformer un Raspberry Pi en server Web", link: "/tp/rpi/web-stack.md"
                    }
                ]
            }
        ]
    },

    {
        text: "Les CMS",
        collapsed: true,
        items: [
            {
                text: "Installer & Configurer Wordpress", link: "/tp/cms/wordpress.md"
            }
        ]
    }
]