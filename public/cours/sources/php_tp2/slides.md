# Les formulaires

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## GET ou POST ?

Deux façons d'envoyer des données au serveur.

Question : votre mot de passe dans l'URL, visible dans l'historique… bonne idée ?

Pour un formulaire : **POST**, toujours.

---

## L'anatomie d'un formulaire

```html
<form method="post" action="bart.php">
  <input type="text" name="phrase" />
  <input type="submit" value="Envoyer" />
</form>
```

- `action` : la page qui **reçoit**.
- `method` : GET ou POST.
- `name` : le nom de la donnée (le plus important !).

---

## Côté serveur

```php
$_POST['phrase']
```

La clé du tableau `$_POST` = l'attribut `name` de l'input.

Question : que vaut `$_POST['phrase']` si on arrive sur la page **sans** soumettre le formulaire ?

---

## Récapitulatif

- Formulaire = POST.
- `action` désigne la page de destination, `name` désigne la donnée.
- `$_POST` côté PHP, avec `isset()` pour les cas vides.
- La saisie utilisateur affichée sans contrôle = XSS, nous y reviendrons.

---

## Des questions ?

Place au TP 🚀
