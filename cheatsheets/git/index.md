---
description: Aide mémoire GIT
---

# Aide mémoire GIT

::: details Table des matières
[[toc]]
:::

## Personnaliser

Définir son identité :

```sh
git config --global user.email "email@example.com"
git config --global user.name "Valentin Brosseau"
```

Voir la configuration :

```sh
git config --list
```

## Setup & Init

Créer un nouveau dépôt local (dans le dossier courant) :

```sh
git init
```

::: tip Si vous projet
Si votre projet est sur github/gitlab, **vous devez cloner le dépôt** et non le créer (via un `git clone`).
:::

Cloner un dépôt existant :

```sh
git clone ssh://user@domain.com/repo.git
```

Créer un fichier « .gitignore » :

```sh
# Création du fichier
vim .gitignore
# …
git add .gitignore
git commit -m "Ajout gitignore"
```

Créer un fichier « .gitignore » en utilisant un template « Windows »:

```sh
curl -s https://www.gitignore.io/api/windows > .gitignore
git add .gitignore
git commit -m "Ajout gitignore"
```

Créer un fichier « .gitignore » en utilisant un template « MacOS »:

```sh
curl -s https://www.gitignore.io/api/osx > .gitignore
git add .gitignore
git commit -m "Ajout gitignore"
```

## Modifications locales

Fichiers modifiés dans votre répertoire de travail :

```sh
git status
```

Modifications sur les fichiers suivis :

```sh
git diff
```

Ajouter tous les changements actuels au prochain commit :

```sh
git add
```

Ajouter tous les changements de toute l’arborescence :

```sh
git add --all
```

Commiter tous les changements locaux des fichiers suivis :

```sh
git commit -a
```

Commiter les modifications en attente :

```sh
git commit -m 'Votre message'
```

Modifier le commit précédent :

```sh
git commit --amend
# ou
git commit --am
```

## Historique de Commit

Afficher tous les commits :

```sh
git log
```

Afficher tous les commits (uniquement l’identifiant et le texte) :

```sh
git log --oneline
```

Afficher l’historique d’un utilisateur uniquement :

```sh
git log --author="utilisateur"
```

Afficher l’historique des modifications pour un fichier uniquement :

```sh
git log -p <fichier>
```

Affiche les changements (en détail) dans le fichier :

```sh
git blame <file>
```

## Branches & Tags

Lister toutes les branches :

```sh
git branch
```

Changer de branche :

```sh
git checkout <votre-branche>
```

Créer une nouvelle branche en se basant sur le HEAD :

```sh
git branch <votre-branche>
```

Créer une nouvelle branche de suivi, basée sur une branche distante :

```sh
git branch --track <nouvelle-branche> <branche-distante>
```

Supprimer une branche :

```sh
git branch -d <votre-branche>
```

Marquer le commit courant avec un tag :

```sh
git tag <non-du-tag>
```

## Merge & Rebase

Fusionner la branche `<votre-branche>` avec la master :

```sh
git checkout master
git merge <votre-branche>
```

⚠️ Attention ⚠️

Jouer avec l’historique est toujours dangereux surtout si vous travaillez à plusieurs !

Mettre à jour votre branche avec le code de la master :

```sh
git checkout <votre-branch>
git rebase master
```

Annuler un rebase en cours :

```sh
git rebase --abort
```

Continuer un rebase après avoir résolu des conflits :

```sh
git rebase --continue
```

## Travailler avec un dépôt distant

::: danger Accès à votre repository distant

Même si Github/Gitlab vous permet de récupérer un repository distant, vous devez **toujours** le cloner la première fois. Cette étape de clone est nécessaire pour initialiser le dossier local, et donc pour pouvoir y travailler.

Vous devez donc **toujours** utiliser la commande `git clone` pour récupérer un repository distant. La récupération d'un projet est à réaliser en ssh, et non en https (voir [Aide mémoire SSH](/cheatsheets/ssh-key/)).

:::

Lister tous les dépôts distants configurés :

```sh
git remote -v
```

Monter les informations d'un dépôt distant :

```sh
git remote show origin
```

Ajouter un nouveau dépôt distant, nommé &lt;remote&gt; :

```sh
git remote add <remote> <url>
```

Synchroniser la branche « origin » avec la master. Et indiquer origin comme le dépôt distant par défaut.

```sh
git push -u origin master
```

Télécharger toutes les modifications d'un dépôt distant nommé &lt;remote&gt;, sans les fusionner :

```sh
git fetch <remote>
```

Télécharger les modifications et les fusionner directement dans le HEAD :

```sh
git remote pull <remote> <url>
```

Fusionner les modifications de la `master` distante sur la branche courante :

```sh
git pull origin master
```

Récupérer toutes les modifications du HEAD dans le dépôt local :

```sh
git pull
# ou
git pull origin
```

Publier les modifications locales sur un dépôt distant :

```sh
git push
ou
git push remote <remote> <branch>
```

Publier les tags :

```sh
git push --tags
```

## Annulation

Annuler le dernier `git add` :

```sh
git reset HEAD
```

Annuler les modifications locales d'un fichier spécifique :

```sh
git checkout HEAD <file>
```

Annuler un commit (création d’un commit avec les modifications inverses) :

```sh
git revert <commit>
```

Placer le pointeur du HEAD sur un commit précédent.
Conserve toutes les modifications effectuées depuis :

```sh
git reset <commit>
```

⚠️ Annuler toutes les modifications dans le répertoire de travail :

```sh
git reset --hard HEAD
```

⚠️ Placer le pointeur du HEAD sur un commit précédent.
Annule toutes les modifications effectuées depuis :

```sh
git reset --hard <commit>
```

## Les clients graphiques

Git ne s'utilise pas forcément en ligne de commande. Il existe de nombreux clients graphiques qui permettent de visualiser l'historique des commits, de gérer les branches, de faire des merges, etc.

- [GitKraken](https://www.gitkraken.com/)
- [VsCode](https://code.visualstudio.com/docs/sourcecontrol/overview)
- [Tower](https://www.git-tower.com/)
- [Sourcetree](https://www.sourcetreeapp.com/)
- [Webstorm](https://www.jetbrains.com/help/webstorm/using-git-integration.html)
- [PHPStorm](https://www.jetbrains.com/help/phpstorm/using-git-integration.html)

L'idée derrière ces outils c'est que Git ne doit pas être un frein à la productivité. Vous devez donc trouver le bon équilibre entre l'utilisation de la ligne de commande et l'utilisation d'un client graphique (si vous n'êtes pas à l'aise avec la ligne de commande).