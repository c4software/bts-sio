# La structure

## Un entry-point unique

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Le problème

Votre site grandit : 2, 3, 10 pages…

- Le header est copié dans chaque fichier.
- La session est démarrée… parfois.
- Un bug commun = 10 fichiers à corriger.

Question : où corrigez-vous un bug présent sur **toutes** les pages ?

---

## L'include, notre sauveur

Vous le connaissez déjà : `include()` insère un fichier dans un autre.

Jusqu'ici, chaque page incluait le header et le footer.

Et si on **inversait** la logique ?

---

## L'idée : un point d'entrée unique

**Toutes** les demandes passent par un seul fichier : `index.php`.

`index.php?page=home`

`index.php?page=bart`

C'est lui qui inclut la bonne page, au bon moment. C'est un **routeur**.

---

## Ce que gère l'entry-point

Une seule fois, pour tout le site :

- La session (`session_start()`).
- Le header et le footer.
- La connexion à la base de données (plus tard).
- Le choix de la page à afficher.

---

## Le code

```php
<?php
session_start();

include('common/header.php');

$whitelist = array('home', 'bart');

if(isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
  include("pages/" . $_GET['page'] . '.php');
} else {
  include('pages/home.php');
}

include('common/footer.php');
```

Aucun HTML : l'entry-point est **générique**.

---

## La whitelist : de la sécurité

Question : pourquoi ne pas écrire directement `include($_GET['page'])` ?

Imaginez un visiteur qui demande :

`index.php?page=../../config`

Sans whitelist, il inclut **ce qu'il veut**. Avec : uniquement ce que **vous** avez autorisé.

---

## L'organisation des dossiers

- `common/` : header, footer, fonctions… le partagé.
- `pages/` : une page = un fichier.
- `public/` : CSS, images, fonts… ce qui part au navigateur.
- `index.php` : l'entry-point, à la racine.

---

## Les liens changent

Avant : `<a href="bart.php">`

Maintenant : `<a href="index.php?page=bart">`

Question : que se passe-t-il si la page demandée n'existe pas dans la whitelist ?

---

## Cette logique est partout

WordPress, Laravel, Symfony… **tous** les CMS et frameworks modernes reposent sur un entry-point unique.

Aujourd'hui vous l'écrivez à la main. Demain, le framework le fera pour vous. Mais vous saurez **ce qu'il fait**.

---

## Récapitulatif

- Un entry-point unique = le code commun écrit **une seule fois**.
- L'entry-point est un routeur : `?page=` choisit la page.
- La whitelist contrôle les includes : c'est de la **sécurité**.
- `common/`, `pages/`, `public/` : chaque chose à sa place.

---

## Des questions ?

Place au TP 🚀
