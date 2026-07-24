# Les includes et les librairies

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Le problème du copier / coller

Votre header est présent sur 5 pages. Vous modifiez le menu…

Question : combien de fichiers à modifier ? Et sur un site de 50 pages ?

---

## L'include

```php
<?php include('components/header.php'); ?>
```

Au moment de l'exécution, PHP **insère** le contenu du fichier à cet endroit.

Un seul fichier à modifier, toutes les pages sont à jour.

---

## Une librairie ?

Un fichier PHP qui ne contient **que des fonctions** :

```php
<?php
function maFonction() {
    return "…";
}
```

Seul, il n'affiche rien. Inclus, il rend ses fonctions disponibles partout.

---

## Récapitulatif

- Le copier / coller de code est votre ennemi.
- `include()` insère un fichier dans un autre à l'exécution.
- Une librairie = un fichier de fonctions à inclure.

---

## Des questions ?

Place au TP 🚀
