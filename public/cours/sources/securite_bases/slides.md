# Les bases de la sécurité du web

## Les réflexes à avoir dès le premier projet

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Votre code va sortir de votre PC

Jusqu'ici, vos TP tournaient sur `localhost`.

Bientôt : un stage, un projet, un site en ligne.

Et là, **tout le monde** peut taper dedans.

---

## Question

Qui voudrait attaquer un petit site de BTS ?

Personne ne me connaît, je n'ai rien à voler.

---

## Des robots. Tout le temps.

- Ils ne vous visent pas : ils scannent **toutes** les adresses.
- Ils testent les failles les plus banales, en quelques secondes.
- Un serveur fraîchement mis en ligne est sondé dans l'heure.

La sécurité ne commence pas quand le site devient célèbre.

---

## La menace

Ce qui peut vous vouloir du mal.

- Un robot qui scanne toute la journée.
- Un curieux qui bidouille l'URL de votre livre d'or.
- Un concurrent, un ancien salarié, un client mécontent.

La menace existe, que votre code soit bon ou non.

---

## La vulnérabilité

La faiblesse, chez vous, dans votre code.

```php
$id = $_GET['id'];
$pdo->query("SELECT * FROM livres WHERE id = $id");
```

Un `$_GET` concaténé dans une requête : voilà une vulnérabilité.

---

## Le risque

Le risque, c'est la rencontre des deux :

> probabilité qu'une menace exploite une vulnérabilité **×** impact

Pas de vulnérabilité, pas de risque. Pas d'impact non plus.

---

## Le schéma à retenir

```
menace  +  vulnérabilité  =  risque
(dehors)     (chez vous)   (à mesurer)
```

Vous ne pouvez rien contre la menace.

Vous pouvez tout contre la vulnérabilité.

---

## Question

Quel est le risque si votre générateur de punitions est piraté ?

Et si c'est la base des adhérents de la médiathèque ?

---

## Ce qui change, c'est l'impact

- Générateur de punitions : une page moche, on restaure, on rigole.
- Base des adhérents : des noms, des emails, des adresses **volés**.

Les données personnelles sont protégées par le **RGPD** : une fuite doit être déclarée, et elle engage la responsabilité de l'organisation.

---

## Réflexe 1 : ne faites confiance à rien

Tout ce qui arrive dans votre script vient de **l'extérieur** :

- `$_GET`, `$_POST`,
- les cookies,
- les en-têtes HTTP, les fichiers envoyés.

---

## Question

```
index.php?page=home
```

Qui écrit la valeur de `page` ?

---

## Le visiteur. Donc on valide.

```php
$whitelist = ['home', 'bart', 'contact'];
$page = $_GET['page'] ?? 'home';

if (!in_array($page, $whitelist)) {
    $page = 'home';
}
```

Vous le faites déjà depuis le TP 3 : c'est de la sécurité.

Même logique ailleurs : `isset`, `filter_var`, `in_array`.

---

## Et à l'affichage ?

Dans votre livre d'or, quelqu'un laisse cette idée :

```html
<script>alert(1)</script>
```

Vous la réaffichez telle quelle. Que fait le navigateur ?

---

## Il l'exécute, donc on échappe

Le navigateur ne distingue pas votre HTML de celui du visiteur : c'est une faille **XSS** (Cross-Site Scripting).

```php
echo htmlspecialchars($idee, ENT_QUOTES, 'UTF-8');
```

`<script>` devient `&lt;script&gt;` : affiché comme du **texte**, jamais exécuté.

Valider à l'entrée, échapper à la sortie : les deux, toujours.

---

## Réflexe 2 : la requête concaténée

```php
$sql = "SELECT * FROM utilisateurs
        WHERE login = '$login' AND mot_de_passe = '$mdp'";
```

Ça marche très bien. C'est bien le problème.

---

## Question

Et si je saisis comme login :

```
' OR 1=1 --
```

Que devient la requête ?

---

## Elle change de sens

```sql
SELECT * FROM utilisateurs
WHERE login = '' OR 1=1 -- ' AND mot_de_passe = '...'
```

`1=1` est vrai, le reste est en commentaire.

Connecté en `admin`, sans mot de passe.

---

## La requête préparée

```php
$stmt = $pdo->prepare(
    "SELECT * FROM utilisateurs WHERE login = ? AND mot_de_passe = ?"
);
$stmt->execute([$login, $mdp]);
```

La valeur arrive **après** l'analyse du SQL : elle ne peut plus devenir du code.

---

## Réflexe 3 : les mots de passe

```
| id | login | mot_de_passe    |
|  1 | admin | motdepasseadmin |
```

Une fuite de la base, et tous les comptes sont ouverts.

Souvent bien au-delà : les gens réutilisent leurs mots de passe.

---

## On ne stocke pas, on hache

```php
// Inscription
$hash = password_hash($mdp, PASSWORD_DEFAULT);

// Connexion
password_verify($saisi, $hash); // true / false
```

Une fonction à sens unique : on ne revient jamais en arrière.

---

## Le sel et le bcrypt

- Le **sel** : une valeur aléatoire ajoutée avant le hachage, pour que deux mots de passe identiques ne donnent pas le même hash.
- Le **bcrypt** : un algorithme volontairement **lent**, pour rendre l'essai en masse insupportable.

`password_hash` fait les deux pour vous. On le voit au TP authentification.

---

## Deux réflexes en bonus

```php
session_regenerate_id(true); // juste après la connexion
session_destroy();           // à la déconnexion
```

Et en production : `display_errors = Off`.

Un message d'erreur PHP affiché, c'est un plan de votre application offert à l'attaquant.

---

## Récapitulatif

- Ne jamais faire confiance aux données reçues : valider à l'entrée, échapper à la sortie.
- Toujours des requêtes préparées : la valeur ne devient jamais du code.
- Toujours des mots de passe hachés : `password_hash` et `password_verify`.

Menace + vulnérabilité = risque. Vous travaillez sur la vulnérabilité.

---

## Des questions ?

Place à la pratique 🚀
