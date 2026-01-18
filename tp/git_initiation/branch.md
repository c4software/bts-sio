# TP – Découverte des branches Git (en local)

**Objectif**  
Comprendre et manipuler les branches Git en local pour travailler en parallèle sur différentes évolutions sans perturber la version principale.

::: details Table des matières
[[toc]]
:::

Ici, nous avons un TP très guidé, l'idée étant de vous faire manipuler les branches Git pour bien comprendre leur fonctionnement. Comme toujours, 
n'hésitez pas à consulter l'aide mémoire Git disponible ici :

- [Aide mémoire Git](../../cheatsheets/git/)

## Création du dépôt de travail

Créez un nouveau répertoire et initialisez un dépôt Git :

```bash
mkdir tp-branches
cd tp-branches
git init

echo "# Mon projet de test"      > README.md
echo "Version de base"           > contenu.txt
echo "Ligne 1 - texte initial"  >> contenu.txt

git add .
git commit -m "État initial du projet"
```

Vérifiez votre état actuel :

```bash
git status
git log --oneline
```

::: tip Echo dans un terminal ? 

Ici nous utilisons la commande echo pour créer rapidement des fichiers texte depuis le terminal. Vous pouvez aussi créer les fichiers avec un éditeur de texte (VSCode, nano, vim, etc.) si vous préférez.

:::

## Création d’une première branche de fonctionnalité

Vous allez maintenant travailler sur une nouvelle fonctionnalité sans toucher la branche principale.

Créez et basculez sur une nouvelle branche :

```bash
git switch -c feature/accueil
```

::: tip Syntaxe alternative (ancienne)

Alternative, vous pouvez utiliser la commande plus ancienne :

```bash
git checkout -b feature/accueil
```

:::

**Vérifiez** que vous êtes bien sur la nouvelle branche :

```bash
git branch
```

*(ou via le prompt du terminal qui affiche votre branche courante)*

Modifiez le fichier `contenu.txt` :

Ajoutez les éléments suivants dans votre fichier `contenu.txt` :

```
Ligne 2 - menu d'accueil
Ligne 3 - image principale
```

```bash
git add contenu.txt
git commit -m "Ajout du menu d'accueil"
```

Faites une deuxième modification sur cette même branche :

```bash
echo "Ligne 4 - footer avec copyright" >> contenu.txt
git add contenu.txt
git commit -m "Ajout du footer"
```

## Retour à la branche principale et constatation

Revenez sur la branche principale :

```bash
git switch main
```

Observez le contenu du fichier :

```bash
cat contenu.txt
```

**Que remarquez-vous ?** Les modifications faites sur la branche `feature/accueil` ne sont pas présentes ici.

## Visualisation de l’historique

Affichez l’historique sous forme graphique :

```bash
git log --oneline --graph --all
```

Vous devriez voir clairement la divergence entre les deux branches.

## Intégration des modifications (fusion simple)

Une fois la fonctionnalité validée, intégrez-la dans la branche principale :

```bash
git switch main
git merge feature/accueil
```

Regardez à nouveau le contenu :

```bash
cat contenu.txt
```

Vérifiez l’historique :

```bash
git log --oneline --graph --all
```

Vous observez un « fast-forward » : la branche principale a simplement avancé jusqu’au dernier commit de la branche feature.

## Nettoyage

Maintenant que la fonctionnalité est intégrée, supprimez la branche devenue inutile :

```bash
git branch -d feature/accueil
```

Vérifiez que la branche a bien disparu :

```bash
git branch
```

::: danger Attention !

Ne supprimez une branche que si vous êtes sûr que son contenu a été intégré ou n’est plus nécessaire. Une branche supprimée ne peut pas être récupérée facilement.

:::

## Simulation d’un conflit (situation classique)

Vous allez maintenant provoquer intentionnellement un conflit pour apprendre à le résoudre.

Créez une branche dédiée à une correction :

```bash
git switch -c hotfix/correction-titre
```

Modifiez **manuellement** la première ligne du fichier `contenu.txt` :  
remplacez « Version de base » par « Version stable 1.0 ».

Vous pouvez utiliser l’éditeur de votre choix, par exemple :

```bash
nano contenu.txt
# ou vim contenu.txt, ou code contenu.txt, etc.
```

Enregistrez et quittez, puis commitez :

```bash
git add contenu.txt
git commit -m "Correction du titre vers Version stable 1.0"
```

Revenez sur la branche `main` et effectuez une modification **différente** sur la **même ligne** :

```bash
git switch main
```

Modifiez **manuellement** la première ligne du fichier `contenu.txt` :  
remplacez « Version de base » par « Version 1.0 - production ».

Enregistrez, puis :

```bash
git add contenu.txt
git commit -m "Mise à jour du titre pour la production"
```

Maintenant, tentez de fusionner la branche hotfix dans main :

```bash
git merge hotfix/correction-titre
```

Git signale un **conflit** et arrête la fusion.

Ouvrez `contenu.txt` avec votre éditeur : vous verrez les marqueurs de conflit :

```
<<<<<<< HEAD
Version 1.0 - production
=======
Version stable 1.0
>>>>>>> hotfix/correction-titre
```

Résolvez le conflit en choisissant la version qui vous convient (ou en combinant les deux), puis **supprimez complètement** les marqueurs `<<<<<<<`, `=======` et `>>>>>>>`.

Enregistrez le fichier, puis finalisez la fusion :

```bash
git add contenu.txt
git commit -m "Résolution du conflit sur le titre de version"
```

Vérifiez l’historique pour voir le commit de merge :

```bash
git log --oneline --graph --all
```

### Cas pratique

Créer un nouveau fichier dans votre dépôt git : 

- Index.html contenant une structure HTML de base.
- styles.css contenant quelques règles CSS simples.

Tester le site et versionner les fichiers dans la branche principale (main).

Créer une branche `feature/homepage` pour développer une page d’accueil avec du contenu spécifique (texte, images, liens).

Une fois la page d’accueil terminée, fusionner la branche `feature/homepage` dans `main`.

C'est à vous de jouer !

### Bilan du TP – commandes essentielles

```bash
# Créer et basculer en une commande
git switch -c nom-de-branche
# Ou via l’ancienne syntaxe
git checkout -b nom-de-branche

# Changer de branche
git switch nom-de-branche
# Ou via l’ancienne syntaxe
git checkout nom-de-branche

# Fusionner une branche dans celle actuelle
git merge nom-de-branche

# Voir où on en est
git branch
git status

# Visualiser l’historique (très utile !)
git log --oneline --graph --all

# Supprimer une branche (après merge)
git branch -d nom-de-branche
```

**Pour aller plus loin**  
Installez l’extension **Git Graph** dans VSCode : elle rend la visualisation de l’historique beaucoup plus claire.

Bon travail !  
Les branches sont l’une des fonctionnalités les plus puissantes de Git. Prenez l’habitude de créer une branche pour chaque évolution, même quand vous travaillez seul.
