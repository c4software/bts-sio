# PHP et la base de données

## Lire et écrire des données depuis PHP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Où en sommes-nous ?

- Vous savez écrire des pages PHP.
- Vous savez recevoir un formulaire.
- Vous affichez le résultat…

Et au rechargement de la page, **tout a disparu**.

---

## La vraie question

Vos données, vous les rangez **où** ?

Un fichier ? La session ? Une variable ?

---

## Dans une base de données

- Elle survit au rechargement, au redémarrage, au changement de navigateur.
- Elle est partagée par tous les visiteurs.
- C'est un **serveur** à part, à qui on parle depuis PHP.

---

## Le vocabulaire minimal

- Une **base** contient des **tables**.
- Une table a des **colonnes** (id, phrase, nombre).
- Chaque enregistrement est une **ligne**.

La modélisation et le langage SQL, c'est votre cours de base de données. Ici, on apprend à **s'en servir depuis PHP**.

---

## Notre table de travail

| id  | phrase                        | nombre |
| --- | ----------------------------- | ------ |
| 1   | Je ne ferai plus de bêtises   | 10     |
| 2   | Je rendrai mes devoirs à temps | 5      |

Une ligne = une punition de Bart.

---

## phpMyAdmin

- Livré avec XAMPP, accessible sur `http://localhost/phpmyadmin/`.
- C'est un **site web** pour regarder votre base.
- Vos bases à gauche, le contenu de la table au centre.

---

## phpMyAdmin : deux onglets utiles

- **Importer** : je vous fournis un fichier `.sql`, vous le chargez.
- **SQL** : vous collez une requête et vous l'exécutez.

C'est votre outil de vérification : « ma ligne est-elle bien arrivée ? »

---

## Comment PHP parle-t-il à MySQL ?

PHP n'est pas la base de données.

Il faut donc un **intermédiaire**. Lequel ?

---

## Plusieurs connecteurs, un seul choix

- `mysql_*` : supprimé de PHP, à fuir (vous en trouverez en ligne).
- `mysqli` : son remplaçant.
- **PDO** : celui que nous utiliserons, toujours.

PDO parle à MySQL, MariaDB, PostgreSQL, SQLite… avec le même code.

---

## La connexion en 4 lignes

`utils/db.php` :

```php
$server = "localhost";
$db = "bart";
$user = "root";
$passwd = "";

$dsn = "mysql:host=$server;dbname=$db;charset=utf8mb4";
$pdo = new PDO($dsn, $user, $passwd);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

Une « librairie » : ce fichier se copie tel quel dans chacun de vos projets, seules les 4 premières lignes changent.

---

## Lire des données

```php
$phrases = $pdo->query("SELECT * FROM phrases")
               ->fetchAll(PDO::FETCH_ASSOC);
```

Une requête, un résultat. Rien de plus.

---

## Question

`$phrases`, ça contient quoi exactement ?

Quel **type** PHP renvoie `fetchAll` ?

---

## Un tableau de tableaux associatifs

```php
[
  ['id' => 1, 'phrase' => 'Je ne ferai plus de bêtises', 'nombre' => 10],
  ['id' => 2, 'phrase' => 'Je rendrai mes devoirs à temps', 'nombre' => 5],
]
```

Exactement la structure du TP Tableaux : une ligne = un tableau associatif.

---

## Donc on l'affiche comme d'habitude

```php
foreach ($phrases as $phrase) {
    echo "<li>" . htmlspecialchars($phrase['phrase']) . "</li>";
}
```

Vous savez déjà faire, la seule nouveauté est **d'où vient** le tableau.

---

## Une seule ligne ?

```php
$stmt = $pdo->prepare("SELECT * FROM phrases WHERE id = ?");
$stmt->execute([1]);
$phrase = $stmt->fetch(PDO::FETCH_ASSOC);
```

`fetchAll` : toutes les lignes. `fetch` : **une seule** ligne.

---

## Et si la ligne n'existe pas ?

`fetch()` renvoie `false`.

```php
if ($phrase === false) {
    echo "Cette phrase n'existe pas.";
}
```

À tester **avant** d'afficher, sinon `Undefined array key`.

---

## Une valeur qui vient de l'utilisateur

L'identifiant arrive en `$_GET['id']`.

Question : on le colle directement dans la requête ?

```php
$pdo->query("SELECT * FROM phrases WHERE id = " . $_GET['id']);
```

---

## Jamais. Regardez pourquoi

Le visiteur appelle `index.php?page=phrase&id=1 OR 1=1`

```sql
SELECT * FROM phrases WHERE id = 1 OR 1=1
```

Toute la table sort. Avec un peu d'imagination, la table des mots de passe aussi.

---

## La requête préparée

```php
$stmt = $pdo->prepare("SELECT * FROM phrases WHERE id = ?");
$stmt->execute([$_GET['id']]);
$phrase = $stmt->fetch(PDO::FETCH_ASSOC);
```

Le `?` est un **trou**. La valeur est envoyée à part, elle ne peut plus devenir du SQL.

---

## La règle, une seule à retenir

Une valeur **variable** dans la requête (formulaire, URL, session) ?

**Requête préparée. Toujours.**

Sinon (requête 100 % en dur), `query()` suffit.

---

## Écrire : ajouter une ligne

```php
$stmt = $pdo->prepare("INSERT INTO phrases (phrase, nombre) VALUES (?, ?)");
$stmt->execute([$_POST['phrase'], $_POST['nombre']]);

$id = $pdo->lastInsertId();
```

`lastInsertId()` vous donne l'identifiant qui vient d'être créé.

---

## Écrire : modifier une ligne

```php
$stmt = $pdo->prepare("UPDATE phrases SET phrase = ?, nombre = ? WHERE id = ?");
$stmt->execute([$_POST['phrase'], $_POST['nombre'], $_POST['id']]);
```

Sans `WHERE`, vous modifiez **toute** la table.

---

## Écrire : supprimer une ligne

```php
$stmt = $pdo->prepare("DELETE FROM phrases WHERE id = ?");
$stmt->execute([$_GET['id']]);

echo $stmt->rowCount() . " ligne(s) supprimée(s)";
```

Pas de corbeille, pas de retour en arrière.

---

## Afficher proprement

```php
echo htmlspecialchars($phrase['phrase']);
```

Le contenu de la base a été saisi par un visiteur : il peut contenir du HTML.

---

## Et pour deux tables ?

```php
$livres = $pdo->query("SELECT livres.titre, auteurs.nom
                       FROM livres
                       LEFT JOIN auteurs ON livres.id_auteur = auteurs.id")
              ->fetchAll(PDO::FETCH_ASSOC);
```

Une jointure s'exécute **exactement** comme le reste. L'écrire, c'est votre cours de base de données.

---

## Où mettre tout ce code ?

- `utils/db.php` : inclus **une seule fois**, dans `index.php`.
- La requête : en haut de `pages/xxx.php`.
- L'affichage : en dessous, dans le HTML.

On récupère d'abord, on affiche ensuite.

---

## Récapitulatif

- Les données vivent en base, pas dans une variable PHP.
- `utils/db.php` crée `$pdo`, une fois pour tout le projet.
- `query()` + `fetchAll()` pour lire, `fetch()` pour une ligne (`false` si rien).
- Valeur variable : `prepare()` + `execute([...])`, toujours.
- `INSERT`, `UPDATE`, `DELETE` : le même `prepare` / `execute`.

---

## Des questions ?

Place au TP 🚀
