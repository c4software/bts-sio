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

::: tip Comment choisir ?

Je vous laisse regarder sur le site de Gitlab et le site de Github. Et plus particulièrement :

- <https://github.com/pricing>
- <https://about.gitlab.com/pricing/>
- <https://about.gitlab.com/install/ce-or-ee/>
- <https://github.com/features>
- <https://about.gitlab.com/features/>
- <https://www.ionos.fr/digitalguide/sites-internet/developpement-web/gitlab-vs-github/>

Après avoir regardé les différents documents, nous allons réfléchir ensemble.

:::

## Contraintes de l’entreprise

Afin de s'assurer de la qualité du code, l'entreprise souhaite que vous utilisiez GitLab pour versionner votre code. Elle vous impose également quelques règles :

- Vous devez utiliser GitLab pour versionner votre code.
- Vous devez utiliser des branches pour travailler sur votre projet.
- Les branches doivent être nommées de la façon suivante : `feature/ma-branche`. (ex: `feature/ajout-article-git`)
- Vous devez faire des commits régulièrement. La fréquence est à définir en fonction de votre vision du projet.
- Vous devez utiliser des messages de commit explicites. (ex: `Ajout d’un nouvel article sur Git`)
- Vous devez faire des merges requests pour fusionner vos branches avec la branche `master`.
- Vous devez cloner votre projet sur votre ordinateur. En utilisant obligatoirement une clé SSH.

::: tip ✨ Ce TP est évalué ✨

Ce TP est évalué, il est donc important de le réaliser correctement. Vous pouvez vous aider des ressources ci-dessus.

:::

## Le TP

Dans ce TP vous allez avoir trois étapes importantes :

- Versionner votre projet avec Git.
- Travailler avec Gitlab directement sur le Web (via le Web IDE).
- Travailler avec Gitlab depuis votre ordinateur (envoi du code avec le push).

## Création du projet

Avant d’utiliser GitLab nous allons dans un premier temps créer un site Internet sur votre ordinateur.

Je vous propose de versionner le blog que vous avez réalisé dans le cadre de la première AP. Je vous laisse :

- Créer un dossier blog sur votre ordinateur (ou de réutiliser le dossier que vous avez créé dans le cadre de la première AP)
- Initialiser un projet git dans ce dossier. (`git init`)
- Créer un premier commit avec le message « Initialisation du projet ».
- Réaliser une modification en ajouter un nouvel article dans votre blog. (thématique `git`).
- Créer un nouveau commit avec le message « Ajout d’un nouvel article sur Git ».

## Les logs

Vérifier que votre projet est bien commité, avec la commande `git status`. Vous pouvez également vérifier l’historique de vos commits via `git log`

- Votre historique contient-il bien les deux commits que vous avez réalisés ?
- Quelle est la différence entre `git status` et `git log` ?

## GitLab

### Création du compte

Créer votre compte sur [GitLab.com onglet Register](https://gitlab.com/users/sign_in). Ce compte sera utile pour plusieurs projets, remplissez les champs avec attention.

#### Échange de clé

Pour vous reconnaître, GitLab/Github utilise un système de clé. Cette clé garantit votre identité sans utiliser un mot de passe.

#### Génération de votre clé

Cette procédure n'est à faire qu'une seule fois « par ordinateur », la clé que nous allons générer aujourd'hui vous servira pendant les deux ans.

Rendez-vous sur l'aide mémoire pour suivre la procédure : [Voir l'aide mémoire sur comment créer une clé SSH](/cheatsheets/ssh-key/README.md)

🚨 La procédure de génération de clé est la même pour Github et Gitlab, vous pouvez donc utiliser la même clé pour les deux services. 🚨

::: tip Important

- Cette clé est générée sur votre profil utilisateur, et ce quelques soit le poste au lycée. Vous pouvez donc utiliser cette clé sur plusieurs projets.
- Cette opération ne doit être faite qu’une seule fois.

:::

👋 Parlons un peu de cette clé. Elle est composée de deux parties :

- Une partie publique (que vous pouvez partager avec qui vous voulez)
- Une partie privée (que vous devez absolument garder pour vous)

#### Envoyer votre clé sur GitLab

[Ajouter une clé sur votre profil](https://gitlab.com/-/profile/keys)

La clé que vous devez envoyer est dans votre dossier personnel (`W:`) dans le dossier `.ssh`. Une fois dans le dossier (masqué par défaut) vous avez deux fichiers. Le fichier que vous devez ouvrir et copier le contenu est celui dont l’extension est `.pub` (**à ouvrir avec notepad++ ou bloc-note**).

::: tip Cette clé est importante
Vous devez vraiment maîtriser cette étape. C'est une notion très importante dans le monde du développement. Si vous souhaitez en savoir plus, n'hésiter pas à me demander 👋.
:::

### Création de votre premier projet

Maintenant que votre compte est créé (et que l’échange de clé est effectif), vous allez pouvoir créer un nouveau projet. Ce projet gitlab aura pour vocation de contenir les sources de votre site Internet (projet, que vous aller me partager). Donc, nommer le bien !

- Je vous laisse explorer les menus de GitLab pour créer votre projet.
- Attention, vous devez choisir le type de projet Blank project ».
- Vous devez choisir la visibilité du projet. (Public ou Private).

### Question

- Comment choisir la visibilité du projet ? (Visiblity Level)

### Envoi sur GitLab

Maintenant que votre projet est créé, GitLab doit vous donner les instructions pour « pusher » votre projet sur le serveur. Suivez les instructions.

Je vous invite pour cette première fois à suivre les instructions que Gitlab vous donne.

#### Exemple :

![Création d’un projet](./gitlab.png)

Une fois que c’est fait. Regarder les différentes options que GitLab vous propose.

- Inviter un (ou plusieurs) autre étudiant dans votre projet (c’est dans l’onglet Members dans les paramètres)
- Créer une nouvelle issue
- Assigner l’issue à vous-même (ou à un autre étudiant).
- Regarder les options autour de l’issue (Création de branch, issue board, etc…)

### Édition en ligne (via GitLab)

GitLab permet de se passer (en partie) d’un éditeur sur votre poste, tester les différentes fonctionnalités :

- Créer une issue (exemple, Ajout d'une nouvelle image sur la page d’accueil)
- Créer une branche relative à cette issue.
- Vérifier que vous êtes bien sur la branche en question avant d’éditer le fichier index.html dans l’onglet `files`
- Ajouter une image dans votre projet (via GitLab)
- Ajouter dans la page index.html l’image en question (`<img src…`)
- ⚠️ Comme en local, le commentaire est très important ! Indiquer un commentaire pertinent. (Astuce si vous ajoutez à la fin de votre commentaire Close #1, l’issue sera automatiquement « fermée » une fois votre modification en place sur la master. Je vous laisse tester 😉).


- Une fois les modifications faites, vous allez pouvoir créer une `merge request`. Une fois le merge request créé, assignez-le à un autre étudiant ! Demandez-lui de le merger pour vous.
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

### Mettre à jour votre projet

Vous avez édité votre projet en ligne, c'est bien… mais maintenant comment récupérer les modifications sur votre poste ? Pour récupérer les modifications, vous allez devoir faire un `pull` sur votre projet.

```sh
$ git pull
```

::: tip Attention
Vous devez être dans le dossier du projet pour faire un `pull`. Sinon Git vous dira que vous n’êtes pas dans un dépôt git.
:::

Je vous laisse vérifier si vous avez bien récupéré les modifications (en regardant le fichier index.html par exemple, ou via un `git status`).

## Édition en local

Maintenant que vous avez compris le fonctionnement de GitLab, vous allez pouvoir travailler en local. Pour faire cela, nous allons reprendre le processus depuis le début, et faire comme si vous étiez sur un nouvel ordinateur.

Quand nous changerons de poste, la première chose à faire sera de :

- Cloner le projet

::: warning Stop !

**L'étape de clone**, n'est pas à faire si vous êtes sur le même poste que précédemment. Elle est à faire si vous êtes sur un nouveau poste, ou si vous avez supprimé le dossier du projet.

:::

### Cloner le projet

Vous souhaitez maintenant modifier le code sur votre machine. Pour cela, vous **devez** cloner le projet.

::: danger Vous ne pouvez pas deviner les commandes !
Pour vous aider, n'hésitez pas à regarder [l'aide mémoire git](/cheatsheets/git/README.md)
:::

### Cloner le projet sur votre machine

```sh
$ 
```

## Créer une issue

Dans votre projet, créez une seconde issue. (Exemple : Ajouter une page à propos)

- Assignez-vous cette issue.
- Créer une nouvelle branche pour cette issue.
- Traiter la modification en local.
- Envoyer vos modifications sur le serveur GitLab.
- Créez une merge request et assignez-la à un autre étudiant pour qu’il la valide.
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
- Laisser votre collègue effectuer « les corrections » par rapport à votre commentaire (ou débattre de pourquoi, etc.). DISCUTER ! (du code)
- Si tout vous semble correcte « Merger » les modifications.

### Questions

- Quel est l’intérêt ?
- Est-ce contraignant ?
- Vous y voyez un intérêt ?
- À votre avis, est-il possible d’améliorer la revue de code ?
- En situation réelle, est-ce votre rôle de « merger le code » ?

## Ajout d'une page à propos

En utilisant le processus vu précédemment, ajouter une page « à propos » dans votre blog. Vous n'oublierez pas :

- De créer une issue.
- De créer une branche.
- De créer une merge request.
- De réaliser une revue de code (avec des commentaires).
- De merger le code.

## Questions

- À quoi sert la commande `git log` ?
- À quoi sert la commande `git status` ?
- À quoi sert la commande `git commit` ?
- Décrire le processus d'utilisation de Git et GitLab ? (Vous pouvez utiliser un schéma si vous le souhaitez (ex : <https://www.draw.io/>)))

## Document à rendre

- Screenshot de la clé SSH sur votre compte GitLab.
- Le document listant les différences entre Github et GitLab.
- Vos réponses aux questions et commandes présentes dans ce TP (format PDF).
- Lien vers votre projet GitLab (n'oubliez pas de m'inviter en tant que membre).

## Rendu

La restitution est à faire en utilisant le lien suivant : <https://forms.gle/f1hTk9X1EUAkgECp6>