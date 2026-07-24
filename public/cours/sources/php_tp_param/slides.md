# Le passage de paramètres

## Les compétences du TP (BTS TV)

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Une page, plusieurs contenus

La BTS TV diffuse des dizaines de vidéos.

Question : faut-il créer un fichier PHP **par vidéo** ?

Non : **une seule page** `tv.php`, et un paramètre qui change.

---

## Le paramètre dans l'URL

`tv.php?id=abc123`

`tv.php?id=abc123&theme=dark`

- `?` démarre les paramètres.
- `&` les sépare.
- Côté PHP : `$_GET['id']`, `$_GET['theme']`.

---

## Générer les liens avec une boucle

Un tableau de vidéos + un `foreach` = la liste des liens de la page d'accueil.

Ajouter une vidéo ? **Une ligne dans le tableau**, zéro HTML à toucher.

---

## Et si le paramètre est absent ?

`tv.php` sans `?id=`… 💥

`isset()` + une valeur par défaut : votre page ne doit **jamais** afficher de warning.

---

## Récapitulatif

- Une page générique + un paramètre plutôt que N pages.
- `?param=valeur`, `&` pour en passer plusieurs, `$_GET` pour les lire.
- Tableau + boucle pour générer les liens.
- `isset()` : toujours prévoir l'absence du paramètre.

---

## Des questions ?

Place au TP 🚀
