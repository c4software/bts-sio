# La session et les cookies

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Vos punitions sont en base

Depuis le TP 2, les données sont rangées là où il faut : dans MySQL.

Mais votre site ne sait toujours rien **du visiteur**.

---

## Deux mémoires, deux usages

- La **base de données** : les données. Elles survivent à tout.
- La **session** : l'état du visiteur. Son dernier choix, un message, son identité.

Question : « la liste des punitions », c'est laquelle des deux ?

---

## La réponse

La **base**.

La session est propre à un visiteur et disparait quand il s'en va.

Une donnée que tout le monde doit voir n'a rien à y faire.

---

## La session

```php
session_start(); // Avant tout affichage

$_SESSION['last_phrase'] = "Je ne copie pas...";
```

- Stockée **sur le serveur**.
- Propre à chaque visiteur.
- Vit le temps de la navigation.

---

## Le message flash

Après un formulaire : on redirige, on ne réaffiche pas.

```php
$_SESSION['message'] = "Punition enregistrée !";
header('location: index.php?page=home');
die();
```

Question : pourquoi rediriger plutôt qu'afficher directement ?

---

## Parce que F5

Recharger une page de traitement renvoie le formulaire.

Donc : deuxième enregistrement, et un troisième, et un quatrième…

Rediriger coupe court : il n'y a plus rien à renvoyer.

---

## Afficher, puis oublier

```php
if (isset($_SESSION['message'])) {
    echo $_SESSION['message'];
    unset($_SESSION['message']);
}
```

Sans le `unset()`, le message s'affiche à chaque chargement, toute la visite.

---

## Le cookie

```php
setcookie("theme", "sombre", time() + 3600);
```

- Stocké **chez le client**.
- Persiste selon la durée choisie.
- Lisible au chargement **suivant**.

Question : le client peut le modifier… qu'a-t-on le droit d'y mettre ?

---

## Session ou cookie ?

| | Session | Cookie |
| --- | --- | --- |
| Stocké | Serveur | Client |
| Durée | La visite | Au choix |
| Confiance | Oui | **Non** |

Préférence d'affichage → cookie. Autorisation → jamais.

---

## Récapitulatif

- `session_start()` avant tout affichage, puis `$_SESSION` comme un tableau.
- Session = l'état du visiteur. Base = les données.
- Flash : j'écris, j'affiche, j'oublie.
- Cookie = chez le client, donc modifiable : rien de sensible.
- `header()` + `die()`, les deux, toujours.

---

## Des questions ?

Place au TP 🚀
