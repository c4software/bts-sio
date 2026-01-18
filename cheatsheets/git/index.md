---
description: Aide mémoire Git avec les commandes les plus courantes.
# Aide mémoire Git
---

::: details Table des matières
[[toc]]
:::

## Un tutoriel interactif

Pour apprendre Git de manière interactive, je vous conseille le site [learngitbranching.js.org](https://learngitbranching.js.org/?locale=fr_FR).

## Configuration de base

Définir son identité :

```sh
git config --global user.email "email@example.com"
git config --global user.name "Valentin Brosseau"
```

Vérifier la configuration :

```sh
git config --list
```

## Initialisation & clonage

Créer un nouveau dépôt local :

```sh
git init
```

::: tip Projet distant
Si le projet existe déjà sur GitHub / GitLab, **ne faites jamais `git init`**.
Vous devez **cloner** le dépôt.
:::

Cloner un dépôt existant (SSH recommandé) :

```sh
git clone git@domain.com:utilisateur/repo.git
```

## `.gitignore`

Créer manuellement :

```sh
vim .gitignore
git add .gitignore
git commit -m "Ajout du .gitignore"
```

Créer via un template :

```sh
curl -s https://www.toptal.com/developers/gitignore/api/windows,macos,linux > .gitignore
git add .gitignore
git commit -m "Ajout du .gitignore"
```

## État et modifications locales

État du dépôt :

```sh
git status
```

Différences non indexées :

```sh
git diff
```

Indexer des fichiers :

```sh
git add fichier.txt
```

Indexer tous les changements :

```sh
git add .
# ou
git add --all
```

Créer un commit :

```sh
git commit -m "Message du commit"
```

Commit rapide (fichiers déjà suivis uniquement) :

```sh
git commit -am "Message du commit"
```

Modifier le dernier commit (message ou contenu) :

```sh
git commit --amend
```

## Historique

Historique complet :

```sh
git log
```

Historique simplifié :

```sh
git log --oneline --graph --decorate
```

Historique par auteur :

```sh
git log --author="Nom"
```

Historique d’un fichier :

```sh
git log -p fichier.txt
```

Qui a modifié quoi :

```sh
git blame fichier.txt
```

## Branches & tags

Lister les branches :

```sh
git branch
```

Créer une branche :

```sh
git branch ma-branche
```

Changer de branche (commande moderne) :

```sh
git switch ma-branche
```

Changer de branche (ancienne commande) :

```sh
git checkout ma-branche
```

Créer et changer de branche :

```sh
git switch -c ma-branche
```

Supprimer une branche locale :

```sh
git branch -d ma-branche
```

Créer un tag :

```sh
git tag v1.0.0
```

## Merge & rebase

Fusionner une branche dans `main` :

```sh
git switch main
git merge ma-branche
```

::: warning Attention
Modifier l’historique (`rebase`, `reset`) est **dangereux sur une branche partagée**.
:::

Mettre à jour une branche avec `main` :

```sh
git switch ma-branche
git rebase main
```

Annuler un rebase :

```sh
git rebase --abort
```

Continuer après résolution de conflits :

```sh
git rebase --continue
```

## Dépôts distants

Lister les remotes :

```sh
git remote -v
```

Informations sur `origin` :

```sh
git remote show origin
```

Ajouter un dépôt distant :

```sh
git remote add origin git@domain.com:user/repo.git
```

Premier push et définition du upstream :

```sh
git push -u origin main
```

Récupérer sans fusionner :

```sh
git fetch origin
```

Récupérer et fusionner :

```sh
git pull
# ou explicitement
git pull origin main
```

Publier les commits locaux :

```sh
git push
```

Publier les tags :

```sh
git push --tags
```

## Annulation & restauration

Retirer des fichiers de l’index :

```sh
git reset HEAD fichier.txt
```

Restaurer un fichier (commande moderne) :

```sh
git restore fichier.txt
```

Annuler un commit (sans réécrire l’historique) :

```sh
git revert <commit>
```

Revenir à un commit en conservant les modifications :

```sh
git reset <commit>
```

⚠️ Supprimer TOUTES les modifications locales :

```sh
git reset --hard HEAD
```

⚠️ Revenir à un commit en supprimant tout :

```sh
git reset --hard <commit>
```

## Clients graphiques

Git peut être utilisé via des interfaces graphiques :

* GitKraken
* Visual Studio Code
* Tower
* Sourcetree
* WebStorm / PhpStorm

L’objectif n’est pas d’éviter Git, mais de **choisir l’outil qui vous rend le plus efficace**, sans perdre la compréhension des concepts fondamentaux.