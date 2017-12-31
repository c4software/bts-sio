# Utiliser GitLab Pages

<!-- TOC -->

- [Utiliser GitLab Pages](#utiliser-gitlab-pages)
    - [Introduction](#introduction)
    - [Création d’un nouveau projet sur Gitlab](#création-dun-nouveau-projet-sur-gitlab)
    - [Création d’un site static](#création-dun-site-static)
    - [Activation de GitLab-CI](#activation-de-gitlab-ci)
    - [Push de votre code](#push-de-votre-code)
    - [Allez plus loin](#allez-plus-loin)
        - [Les moteurs de site static](#les-moteurs-de-site-static)
        - [Exemple avec Hugo](#exemple-avec-hugo)
        - [Exemple avec Jekyll](#exemple-avec-jekyll)

<!-- /TOC -->

## Introduction

Danc ce TP vous allez mettre en place grace à Gitlab-CI un site web static hébergé par Gitlab Pages. Dans le TP d’introduction au travail collaboratif vous avez travaillé à plusieurs avec une visualisation quasi temps réel des modifications après les commits, c’était réalisé grace à GitLab-CI et GitLab Pages. Avec un fichier et quelques configuration vous allez être capable de réaliser la même chose dans vos projets.

## Création d’un nouveau projet sur Gitlab

Pour commencer créer (https://gitlab.com/projects/new)[un nouveau projet sur votre compte Gitlab]. Vous pouvez le nommer comme vous voulez.

C’est tout.

## Création d’un site static

Créer rapidement sur votre machine un site static, une simple page web html est suffisante (vous pouvez également partir [d’un template disponnible ici](https://startbootstrap.com/template-categories/all/)).

Une fois votre page prête, commité et pusher votre travail sur GitLab.

```sh
git add -A
git commit -am "Premier Commit"
```

⚠️ Pour pusher votre code il faut avoir ajouter la remote, pour ça vous pouvez suivre les instuctions données par GitLab lors de la création du projet.

## Activation de GitLab-CI

Maintenant que votre première version est prête nous allons activer Gitlab-CI pour ça il faut **simplement** créer un fichier intitulé ```.gitlab-ci.yml``` à la racine de votre projet. Mettez y le contenu suivant :

```yml
pages:
  stage: deploy
  script:
    - mkdir .public
    - cp -r * .public
    - mv .public public
  artifacts:
    paths:
        - public
  only:
    - master
```

- Regarder le contenu du fichier, étudier les différentes instructions.

## Push de votre code

Pusher votre code sur GitLab, votre projet va maintenant « ce compiler » dans la partie CI. Attendez quelques secondes votre site web est maintenant en ligne.

## Allez plus loin

Écrire du code c’est bien, mais le faire en automatique c’est mieux. C’est pour ça que GitLab-CI et GitLab Pages existe, écrire du HTML pour une page c’est possible, mais quand il s’agit d’un site entier, c’est pas forcément adapté. C’est pour ça que l’on utilise régulièrement des CMS (écrit en PHP, Python, Ruby, …), mais ce n’est pas la seul façon de faire.

On trouve aussi régulièrement des « générateurs de site static », un générateur c’est un « logiciel » qui va « compiler » votre site pour générer toutes les pagse de votre site web (sans avoir à tous les écrires).

Plusieurs avantages :

- Cout d’hébergement réduit (pas de PHP, juste du HTML).
- Sauvegarde simple (c’est juste des fichiers).
- Rapide ! (Oui, pas de PHP).

Inconvénients :

- À votre avis ? 

### Les moteurs de site static

Comme toujours, il y a plusieurs choix pour faire des sites static, voici 3 exemples :

- [Jekyll](https://jekyllrb.com/)
- [Hugo](http://gohugo.io/)
- [Pelican](https://blog.getpelican.com/)

### Exemple avec Hugo

Télécharger le projet suivante [Exemple de site avec Hugo](https://gitlab.com/pages/hugo), créer un nouveau projet dans votre compte GitLab et envoyer les sources.

- Regarder le contenu du ```.gitlab-ci.yml```

### Exemple avec Jekyll

C’est à vous… Inspirez vous [du wiki de Gitlab](https://docs.gitlab.com/ee/user/project/pages/getting_started_part_four.html)