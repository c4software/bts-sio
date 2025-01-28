---
description: Mise en pratique du travail collaboratif avec GitLab.
---

# Travail collaboratif avec GitLab

Dans ce TP, nous allons travailler à plusieurs sur un projet commun.

## Participation à un projet collectif

GitLab (comme Github) est un outil/site web, permettant le travail collaboratif, dans cette optique vous allez pouvoir travailler sur un projet à plusieurs :

- Rejoindre le projet : [Entrainement Gitlab](https://gitlab.dombtsig.local/slam-1ere-ann-e/entrainement-gitlab)

::: tip Un instant

Pour accéder au projet :

- Vous devez avoir un compte GitLab.
- Vous devez avoir réalisé [un échange de clés SSH avec GitLab](/cheatsheets/ssh-key/index.md).

:::

## Génération de votre clé

Cette procédure n'est à faire qu'une seule fois « par ordinateur », la clé que nous allons générer aujourd'hui vous servira pendant les deux ans.

Rendez-vous sur l'aide mémoire pour suivre la procédure : [Voir l'aide mémoire sur comment créer une clé SSH](/cheatsheets/ssh-key/)

🚨 La procédure de génération de clé est la même pour Github et Gitlab, vous pouvez donc utiliser la même clé pour les deux services. 🚨

::: tip Important

- Cette clé est générée sur votre profil utilisateur, et ce quelques soit le poste au lycée. Vous pouvez donc utiliser cette clé sur plusieurs projets.
- Cette opération ne doit être faite qu’une seule fois.

:::

👋 Parlons un peu de cette clé. Elle est composée de deux parties :

- Une partie publique (que vous pouvez partager avec qui vous voulez)
- Une partie privée (que vous devez absolument garder pour vous)

### Questions

- Pourquoi devez-vous vous connecter à GitLab ?
- Pourquoi est-ce important ?

## Introduction

Dans ce projet, vous avez accès à un ensemble de fichiers. Le site proposé est déjà fonctionnel, mais il manque quelques fonctionnalités (listé dans les issues).

Dans un premier temps, vous pouvez voir le site en accédant à l'adresse suivante : [https://pages.gitlab.dombtsig.local/slam-1ere-ann-e/entrainement-gitlab/]

## Cloner le projet

Maintenant que vous avez observé le site, vous pouvez le cloner sur votre machine. Plusieurs solutions s'offrent à vous :

- Utiliser un IDE (comme [Visual Studio Code](https://code.visualstudio.com/)) et cloner le projet.
- Utiliser le client GIT en ligne de commande (via Git Bash ou le terminal).

## Traiter une des issues

Un ensemble « d’issues »/tickets dans le projet « Découverte GitLab » sont disponibles, choisissez en une. Traitez là en utilisant le « Worflow GitLab » :

- Assignation de l’issue à vous-même.
- Création d’une branche relative à l’issue (un bouton permet de le faire directement).
- Modification du code.
- Création d’une « merge request ».
- Assigner à un autre étudiant le « merge » du code que vous venez d’effectuer.

### Mettre à jour le code local.

::: danger Pour ces commandes…

Vous devez utiliser l'aide mémoire sur Git pour vous aider : [Voir l'aide mémoire sur Git](/cheatsheets/git/)

:::

```sh
$ 
```

### Créer une nouvelle branche

```sh
$ 
```

### Changer de branche

```sh
$ 
```

### Envoyer vos modifications sur le serveur GitLab

```sh
$ 
```

### Création d’une merge request

[Création de la merge request](https://gitlab.dombtsig.local/slam-1ere-ann-e/entrainement-gitlab/-/merge_requests/new)

- Remplissez l’ensemble des champs qui vous semblent nécessaires. N’oubliez pas que ça sera quelqu’un d’autre qui va regarder et traiter votre demande !

### Question

- Pourquoi travailler de cette façon ?

## Bonne nouvelle !

Vous venez (normalement) d’avoir au moins un « merge request » d’assigner. Vous allez devoir traiter la demande, à votre avis, comment se déroule la suite ?

## La revue de code

- Regarder l’issue.
- Regarder le code de votre « collègue ».
- Apporter des commentaires
  _Dans l’issue, générale.
  _ Directement dans la partie code de l’issue.
- Laisser votre collègue effectuer « les corrections » par rapport à votre commentaire (ou débattre de pourquoi, etc.). DISCUTER ! (du code)
- Si tout vous semble correcte « Merger » les modifications.

### Questions

- Quel est l’intérêt ?
- Est-ce contraignant ?
- Vous y voyez un intérêt ?
- À votre avis, est-il possible d’améliorer la revue de code ?
- En situation réelle, est-ce votre rôle de « merger le code » ?