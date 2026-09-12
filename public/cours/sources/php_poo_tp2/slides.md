# Home et connexion en POO

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Où en sommes-nous ?

- Une classe `Database` et un modèle `Idea` (les données **et** le SQL).
- Un autoloader qui charge tout ça tout seul.
- Et… un site où **tout le monde peut tout faire**.

Aujourd'hui : qui a le droit de faire quoi ?

---

## Le flux de connexion (rappel)

1. L'utilisateur soumet le formulaire.
2. Le serveur vérifie les identifiants.
3. Si c'est bon : on écrit dans la session, et on redirige.

Rien de neuf depuis le TP 5. Ce qui change, c'est **où** ce code va vivre.

---

## La question du jour

Ce code de vérification, on le met où ?

Dans `pages/connexion.php` ?

---

## Non : dans une classe `Auth`

- Le test « est-il connecté ? » sert dans l'`index.php`, le header, l'admin.
- Écrit dans une page, il faudrait le **recopier** partout.
- Une classe, une responsabilité : `Auth` sait qui est connecté.

---

## Deux méthodes, deux noms à retenir

```php
Auth::attempt($email, $password); // bool
Auth::check();                    // bool
```

Des méthodes **statiques** : il n'y a qu'une session par visiteur, rien à instancier.

---

## Retenez bien ces noms

`attempt`, `check`, `logout` : ce sont les noms que vous croiserez partout.

Bien nommer une méthode, c'est déjà la documenter.

---

## Le mot de passe

Question : que stocke-t-on dans la colonne `mot_de_passe` ?

---

## Surtout pas le mot de passe

- On stocke une **empreinte** : `password_hash()`.
- On la vérifie avec `password_verify()`.
- Jamais de `==` entre deux hashs : le sel change à chaque fois.

Le détail est dans le TP sur l'authentification.

---

## Une ligne de sécurité en plus

```php
session_regenerate_id(true);
```

Au moment où le visiteur devient « connecté », on lui donne un **nouvel** identifiant de session.

Une ligne, et la fixation de session ne fonctionne plus.

---

## L'autorisation, elle se joue où ?

```php
if (Auth::check()) {
    $whitelist = ['home', 'proposer', 'idee', 'admin', 'deconnexion'];
} else {
    $whitelist = ['home', 'proposer', 'idee', 'connexion'];
}
```

Une page absente de la liste n'est même pas chargée.

---

## Une seule porte d'entrée

- L'autorisation est décidée **à l'entrée**, pas au fond d'une page.
- Impossible de l'oublier : tout passe par `index.php`.
- Un seul endroit à relire pour savoir qui a le droit de faire quoi.

---

## Récapitulatif

- Le flux de connexion n'a pas changé, sa place dans le code oui.
- `Auth` regroupe tout ce que l'application sait de la connexion.
- Un mot de passe se hache, se vérifie, ne se compare jamais.
- La whitelist conditionnelle protège l'espace d'administration.

---

## Des questions ?

Place au TP 🚀
