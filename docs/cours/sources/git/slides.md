# Git
## Introduction à GIT

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Historique

- FTP (À votre avis?) <!-- .element: class="fragment" -->
- Index1, Index2, … (À votre avis?) <!-- .element: class="fragment" -->
- Email (À votre avis?) <!-- .element:  class="fragment" -->
- CVS <!-- .element: class="fragment" -->
- SVN <!-- .element: class="fragment" -->
- Git <!-- .element: class="fragment" -->

---

## Quand utiliser un gestionnaire de version ?

- À votre avis ?

---

## Dès que l'on code !

---

## Définition

Un logiciel de gestion de versions ou VCS (Version Control System) est un logiciel qui permet de stocker un ensemble de fichiers en conservant la chronologie de toutes les modifications qui ont été effectuées dessus.

Un logiciel de gestion de versions agit sur une arborescence de fichiers afin de conserver toutes les versions des fichiers.

---

## Git en quelques mots

GIT est développé par Linus Torvalds (créateur du noyau Linux) depuis 2005.

C’est un SCM (Source Code Management), un gestionnaire de versions de fichiers comme CVS ou SVN à la différence prêt qu’il est décentralisé.

Les dépôts GIT d’un projet sont donc «distribués» (aucun dépôt n’est prioritaire sur les autres).

---

## Un peu d'histoire…
### Noyau Linux

- 150Mo de source
- Des milliers de developpeurs
- Stable

---

## Maintenu pendant des années par des patchs…

## … par emails <!-- .element: class="fragment" data-fragment-index="1" -->

![Via EMAIL](./img/via_email.gif)

---

## Maintenu pendant des années par des patchs…

# … par emails

![Via EMAIL](./img/via_email.gif)

---

- Linux Torvald n'aime pas les outils éxistant
- Il programme donc le sien

## GIT <!-- .element: class="fragment" -->

---

## Les points clés de Git

- Distribué
- Rapide (différences entre les versions)
- Très très fiable (Hash SHA)
- Ligne de commande très évoluée

---

## RAPIDE

![Rapide](./img/rapide.gif)

---

## Pourquoi
### Le principe des snapshots / et des diffs

![Snapshots](./img/git_snapshot.png) <!-- .element: class="fragment" -->

---

## Connaissez-vous d'autres systèmes utilisant le même principe ?

- Quel sont les autres avantages de fonctionner avec des « diffs »?

---

## Les points clés

- Tracabilité
- La gestion des branches <!-- .element: class="fragment" -->
- La fusion de code efficace (Merge) <!-- .element: class="fragment" -->
- Rapidité <!-- .element: class="fragment" -->
- La ligne de commande <!-- .element: class="fragment" -->
- Réécriture de l'histoire impossible <!-- .element: class="fragment" -->

---

## Terminologie

---

### Repository

Vos sources + plus un dossier « caché » le « .git ».

Le .git, est le dossier qui contient **l'historique de votre projet.** (et plus encore)

---

### Diff ou Patch

Différences entre 2 versions d'un fichier.

---

### Commiter

Action d'enregistrer les modifications d'un ou des fichiers. Création d'une version.

### Commit

Le résultat d'une action de commit, représenté par un hash SHA-1.

---

### Branche

Une lignée de développement. Par défaut tout le développement se fait dans la branche nommé « master ». 


---

### tag

Un identifiant symbolique pour un commit. 

« C'est une étiquette ou un raccourci vers une version »


---

## Les branches
### Et le merge <!-- .element: class="fragment" -->

![branches](./img/branch.png)


---

## Quelques chiffres

Nombre de commits par semain chez Facebook ?

- ~10 000 <!-- .element: class="fragment" -->


---

## Exemple
### Vous allez voir c'est simple…

(Enfin presque…, mais c'est puissante !) <!-- .element: class="fragment" -->

![I've got power](./img/power.gif) <!-- .element: class="fragment" -->


---

## Qui suis-je ?

```sh
$ git config --global user.name "Valentin Brosseau"
```

```sh
$ git config --global user.email "c4software@gmail.com"
```

---

## Initialisation

```sh
$ cd mon_projet
$ git init
```

Création d'un nouveau « repository » **vide**.

---

## Premier commit

```sh
$ vim mon_fichier.js
$ git add mon_fichier.js
```

---

## Premier commit

```sh
$ git commit -m "Mon premier commit"

[master 745a6ef] Mon premier commit
 1 files changed, 1 insertions(+), 0 deletions(-)
 create mode 100644 mon_fichier.js
```

![Git Commit](./img/git_commit.png) <!-- .element: class="fragment" -->

---

## Voilà !

![Done](./img/done.gif) <!-- .element: class="fragment" -->

---

```sh
$ git add fichier1.js fichier2.js
```

```sh
$ git commit -m "Mon 2nd commit"
``` 
<!-- .element: class="fragment" -->

```sh
[master aa2507d] Mon 2nd commit
 2 files changed, 2 insertions(+), 0 deletions(-)
 create mode 100644 fichier1.js
 create mode 100644 fichier2.js
```
<!-- .element: class="fragment" -->

![2nd commit](./img/git_commit1.png)

---

```sh
$ vim fichier.js
```

```sh
$ git commit -am "Changement dans le fichier"
```
<!-- .element: class="fragment" -->

```sh
[master 841036d] Changement dans le fichier
 1 files changed, 28 insertions(+), 0 deletions(-)
```
<!-- .element: class="fragment" -->

![3eme commit](./img/git_commit3.png) <!-- .element: class="fragment" -->

---

# À tout moment

## Vérifier le statut de mon dépot Git

```sh
$ git status

On branch master
Your branch is up-to-date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   index.html
	modified:   ../gitlab/index.html

no changes added to commit (use "git add" and/or "git commit -a")
```

---

## Via un Diff

Afficher les changements dans votre dépot.

```sh
$ git config --global diff.tool vimdiff
$ git difftool
```

![diff](./img/gitdiff.png)

---

## Figer une version

```sh
git tag V1.0
```

---

## Est-ce que tout doit être commité ?

- Oui <!-- .element: class="fragment" -->
- Non ? <!-- .element: class="fragment" -->
- La réponse D ? <!-- .element: class="fragment" -->

---

## Non bien évidemment

Filtrer les données sensibles (ou inutiles)

- Les mots de passes
- Les fichiers générés
- …

---

## Le .gitignore

```sh
$ cat .gitignore

lib.so
conf/
*.yml
.pyc
```

[Générer un gitignore](http://gitignore.io)

---

## Les branches

- Pourquoi ? <!-- .element: class="fragment" -->
- Quand ? <!-- .element: class="fragment" -->

---

## Les branches

```sh
$ git branch evolution1
```

![branche](./img/git_branch.png) <!-- .element: class="fragment -->

---

![Et ?](./img/and.gif)

---

```shell
$ git checkout evolution1
Switched to branch 'evolution1'
```

![Et ?](./img/git_branch2.png)

---

```sh
$ vim fichier2.js
```

```sh
$ git commit -am "Ajout de l’évolution"
``` 
<!-- .element: class="fragment" -->

```
[evolution1 54d9dde] Ajout de l’évolution
 1 files changed, 208 insertions(+), 10 deletions(-)
```
<!-- .element: class="fragment" -->

![Commit 4](./img/git_commit4.png) <!-- .element: class="fragment" -->

---

## À votre avis que faut-il faire maintenant ?

---

### « Merger » les branches

```sh
$ git checkout master
```
<!-- .element: class="fragment" -->

```sh
$ git merge evolution1
```
<!-- .element: class="fragment" -->

---

## Que vient t’il de se passer ?

- Qui fusionne le code ? <!-- .element: class="fragment" -->
- Fusion du code ?<!-- .element: class="fragment" -->
- Conflit ? <!-- .element: class="fragment" -->
- Et la branche ? On la coupe ? <!-- .element: class="fragment" -->

---

![Meh](img/git_branch3.gif)

---

## Suppression de la branche

```sh
$ git branch -d evolution1
```

---

## Allez plus loin

- Voir l'historique.
- « Tagger » une version.
- « Signer » un commit.

---

## J'ai un BUG en prod !

---

## Aucun soucis !

- Les branches <!-- .element: class="fragment" data-fragment-index="1" -->
- Git Stash <!-- .element: class="fragment" data-fragment-index="1" -->

---

## Les différentes façons d’utiliser Git

- Individuel/localement
- Collectif : Avec dépôt de références
- Collectif : Avec dépôt de références et Manager(s) d’intégration(s
- Collectif : Avec dépôt de références et Propriétaire(s) du dépot (GitLab, Github, …

---

## En résumé

---

## La zone de staging

Afficher le status

```sh
$ git status
```

Ajout en staging

```sh
$ git add monFichier
```

Suppression de la zone de staging

```sh
$ git rm --cached
# or
$ git checkout --
```

---

## En résumé : Le statut des fichiers

### La routine Git

![La routinge Git](./img/lifecycle.png)

---

## La gestion du code inutile

### Comment procédez-vous ?


- Je le commente ? <!-- .element: class="fragment" data-fragment-index="1" -->
- J'ajoute un « return false » <!-- .element: class="fragment" data-fragment-index="1" -->
- Je le supprime il est dans Git… <!-- .element: class="fragment" data-fragment-index="1" -->

---

# Je le supprime il est dans Git

---

## C'est bien mais moi je ne suis pas seul

---

## Et donc à plusieurs ?

---

## Pas de protocol « git »

- file://
- http(s)://
- ssh://
- rsync://
- …
- Bittorent

---

### Git à Plusieurs

## GitLab

![Logo Gitlab](./img/gitlab.png")