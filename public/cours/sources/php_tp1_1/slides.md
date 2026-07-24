# Le générateur de Bart

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Répéter, c'est le métier de l'ordinateur

Écrire 100× une phrase au tableau ? Bart déteste.

Votre ordinateur, lui, ne fatigue jamais : 10, 100, 10 000 lignes, même effort.

---

## La boucle `while`

```php
$ecrite = 0;

while ($ecrite < 100) {
    echo "Ma punition";
    $ecrite++;
}
```

Question : que se passe-t-il si vous oubliez le `$ecrite++` ?

---

## La boucle `for`

```php
for ($i = 0; $i < 100; $i++) {
    echo "Ma punition";
}
```

Le compteur, la condition et l'incrément **sur une seule ligne**.

Question : `while` ou `for`, lequel choisir ici ?

---

## Rendre le nombre dynamique

`bart.php?nb=200`

```php
if (isset($_GET['nb'])) {
    // ...
}
```

`isset()` : le paramètre est-il présent ? Sans ce test, un warning vous attend.

---

## Récapitulatif

- `while` : tant que la condition est vraie.
- `for` : compteur, condition, incrément en une ligne.
- `$_GET` + `isset()` pour personnaliser via l'URL.

---

## Des questions ?

Place au TP 🚀
