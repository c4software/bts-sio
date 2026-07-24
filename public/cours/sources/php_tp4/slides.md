# La session et les cookies

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Vos variables meurent

À chaque chargement de page, tout est remis à zéro.

Question : comment un site se souvient-il que vous êtes connecté ?

---

## La session

```php
session_start(); // Première ligne, toujours !

$_SESSION['pseudo'] = "Bart";
```

- Stockée **sur le serveur**.
- Propre à chaque visiteur.
- Vit le temps de la navigation.

---

## Le cookie

```php
setcookie("theme", "dark", time() + 3600);
```

- Stocké **chez le client**.
- Persiste selon la durée choisie.

Question : le client peut modifier son cookie… quelles données peut-on y mettre ?

---

## Session ou cookie ?

| | Session | Cookie |
| --- | --- | --- |
| Stocké | Serveur | Client |
| Durée | Navigation | Au choix |
| Confiance | Oui | **Non** |

Données sensibles → session. Confort d'affichage → cookie.

---

## Récapitulatif

- `session_start()` en première ligne, puis `$_SESSION` comme un tableau.
- Cookie = chez le client, donc modifiable : jamais de données sensibles.
- La session servira pour… l'authentification (prochain TP !).

---

## Des questions ?

Place au TP 🚀
