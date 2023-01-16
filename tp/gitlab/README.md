---
description: Introduction au travail à plusieurs avec GIT.
---

# GitLab

Introduction au travail à plusieurs avec GIT.

## Ressources utiles

- [Aide mémoire](https://github.com/c4software/cheatsheet/blob/master/git/README.md)
- [Documentation Gitlab](https://docs.gitlab.com/ee/README.html)
- [Livre Git en ligne](https://git-scm.com/book/fr/v2)
- [GitLab.com](https://www.gitlab.com/)
- [Créer une clé SSH](/cheatsheets/ssh-key/README.md)

## Situation

L’entreprise ou vous effectuez votre stage utilise GitLab, vous allez donc devoir utiliser en plus de GIT un outil permettant de gérer votre « workflow de travail ».

### Questions

- Pourquoi à votre avis l’entreprise utilise GitLab ?
- Pourquoi GitLab plutôt que GitHub ?

## Création du projet

Avant d’utiliser GitLab nous allons dans un premier temps créer un site Internet sur votre ordinateur.

Je vous propose de versionner le blog que vous avez réalisé dans le cadre de la première AP. Je vous laisse :

- Créer un dossier blog sur votre ordinateur.
- Initialiser un projet git dans ce dossier. (`git init`)
- Créer un premier commit avec le message « Initialisation du projet ».
- Réaliser une modification en ajouter un nouvelle article dans votre blog. (thèmatique `git`).
- Créer un nouveau commit avec le message « Ajout d’un nouvel article sur Git ».

## Les logs

Vérifier que votre projet est bien commité, avec la commande `git status`. Vous pouvez également vérifier l’historique de vos commits via `git log`

## GitLab

### Création du compte

Créer votre compte sur [GitLab.com onglet Register](https://gitlab.com/users/sign_in). Se compte sera utile pour plusieurs projets, remplissez les champs avec attention.

#### Échange de clé

Pour vous reconnaître, GitLab/Github utilise un système de clé. Cette clé garantit votre identité sans utiliser un mot de passe.

#### Génération de votre clé

[Voir l'aide mémoire sur comment créer une clé SSH](/cheatsheets/ssh-key/README.md)

::: tip Important

- Cette clé est générée sur votre profil utilisateur, et ce quelques soit le poste au lycée. Vous pouvez donc utiliser cette clé sur plusieurs projets.
- Cette opération ne doit être faite qu’une seule fois.

:::

👋 Parlons un peu de cette clé. Elle est composée de deux parties :

- Une partie publique (que vous pouvez partager avec qui vous voulez)
- Une partie privée (que vous devez absolument garder pour vous)

#### Envoyer votre clé sur GitLab

[Ajouter une clé sur votre profil](https://gitlab.com/-/profile/keys)

La clé que vous devez envoyer est dans votre dossier personnel (`W:`) dans le dossier `.ssh`. Une fois dans le dossier (masqué par défaut) vous avez deux fichiers. Le fichier que vous devez ouvrir et copier le contenu est celui dont l’extension est `.pub` (à ouvrire avec notepad++ ou bloc-note).

### Création de votre premier projet

Maintenant que votre compte est créé (et que l’échange de clé est effectif), vous allez pouvoir créer un nouveau projet. Ce projet « gitlab », aura pour vocation de contenir les sources de votre site Internet (celui créé au début du TP). Nommer le bien !

### Question

- Comment choisir la visibilité du projet ? (Visiblity Level)

### Envoi sur GitLab

Maintenant que votre projet est créé, GitLab doit vous donner les instructions pour « pusher » votre projet sur le serveur. Suivez les instructions.

#### Exemple :

![Création d’un projet](./gitlab.png)

Une fois que c’est fait. Regarder les différentes options que GitLab vous propose.

- Inviter un (ou plusieurs) autre étudiant dans votre projet (c’est dans l’onglet Members dans les paramètres)
- Créer une nouvelle issue
- Assigner l’issue à vous-même (ou a un autre étudiant).
- Regarder les options autour de l’issue (Création de branch, issue board, etc…)

### Édition en ligne

GitLab permet de se passer (en partie) d’un éditeur sur votre poste, tester les différentes fonctionnalités :

- Créer une issue (exemple, Ajout d'une nouvelle image sur la page d’accueil)
- Créer une branche relative à cette issue.
- Vérifier que vous êtes bien sur la branche en question avant d’éditer le fichier index.html dans l’onglet `files`
- Ajouter une image dans votre projet (via GitLab)
- Ajouter dans la page index.html l’image en question (`<img src…`)
- ⚠️ Comme en local, le commentaire est très important ! Indiquer un commentaire pertinent. (Astuce si vous ajoutez à la fin de votre commentaire Close #1, l’issue sera automatiquement « fermée » une fois votre modification en place sur la master. Je vous laisse tester 😉).


- Une fois les modifications faites, vous allez pouvoir créer une `merge request`. Une fois le merge request créé assignez le à un autre étudiant ! Demandez-lui de le merger pour vous.
- ⚠️ ⚠️ L’autre étudiant doit regarder le code, et si possible vous faire des commentaires, par exemple :
  _ Tu as oublié le `alt` à ton image.
  _ Tu as oublié le `title` à ton image. \* Ou même pourquoi as-tu choisi cette image ?
- Prenez en compte les remarques et modifiez le code
- Ajouter un commentaire (dans le merge request) pour indiquer à l’autre étudiant que vous avez terminé.
- L’autre étudiant approuve votre code.
- Vous pouvez merger votre code.

### Question (à faire en groupe)

- Pourquoi est-ce que l’on utilise des branches ?
- Pourquoi demander à un autre étudiant d'approuver votre code ?

### Observation

Je vous invite à regarder les différentes options de GitLab. Vous pouvez par exemple :

- Créer un « issue board » (un tableau Kanban)
- Créer un « wiki »
- Créer un « snippet »

Pourquoi est-ce intéressant ?

## Édition en local

### Cloner le projet

Maintenant que votre compte est actif, vous pouvez cloner le projet :

### Cloner le projet sur votre machine

```sh
$ 
```

## Créer une issue

Dans votre projet, créez une seconde issue. (Exemple : Ajouter une page à propos)

- Assignez vous cette issue.
- Créer une nouvelle branche pour cette issue.
- Traiter la modification en local.
- Envoyer vos modifications sur le serveur GitLab.
- Créer une merge request et assignez-la à un autre étudiant pour qu’il la valide.
- Une fois la merge request validée, merger la branche.

### Mettre à jour le code local.

Avant de commencer à travailler, il est important de mettre à jour votre code local. Pour cela, il faut faire un `pull` sur la branche `master`.

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

### Créer une merge request

Maintenant que vous avez terminé votre travail, vous allez devoir créer une merge request. Pour cela, il faut aller sur le serveur GitLab, et aller dans l’onglet `merge request`.

### Question

- Pourquoi travailler de cette façon ?

## Bonne nouvelle !

Vous venez (normalement) d’avoir au moins un « merge request » d’assigner. Vous allez devoir traiter la demande, à votre avis, comment se déroule la suite ?

## La revue de code

- Regarder l’issue.
- Regarder le code de votre « collègue ».
- Apporter des commentaires
  _ Dans l’issue, générale.
  _ Directement dans la partie code de l’issue.
- Laisser votre collègue effectuer « les corrections » par rapport à votre commentaire (ou débattre de pourquoi, etc). DISCUTER ! (du code)
- Si tout vous semble correcte « Merger » les modifications.

### Questions

- Quel est l’intérêt ?
- Est-ce contraignant ?
- Vous y voyez un intérêt ?
- À votre avis, est-il possible d’améliorer la revue de code ?
- En situation réelle, est-ce votre rôle de « merger le code » ?