# La boîte à idées

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Aujourd'hui

Un site que vous savez déjà faire :

- Une liste.
- Un formulaire.
- Une base de données.

Mais écrit **avec des classes**.

---

## Un site, deux classes

- `Database` : se connecter.
- `Idea` : le **modèle** de la table `idees`.

Une classe, une responsabilité.

---

## Que renvoie PDO ?

```php
$pdo->query("SELECT * FROM idees")->fetchAll(PDO::FETCH_ASSOC);
```

Question : quel est le format de ce que vous récupérez ?

---

## Un tableau associatif

```php
['id' => 1, 'titre' => 'Un babyfoot', 'auteur' => 'Bart']
```

Pratique, mais muet : `$row['titer']` ne dira jamais rien.

---

## Une ligne devient un objet

```php
foreach ($rows as $row) {
    $ideas[] = new Idea($row['id'], $row['titre'], ...);
}
```

Une ligne entre, un objet sort.

---

## Et alors ?

- `$idea->title` : l'éditeur complète tout seul.
- `$idea->titre` : PHP vous prévient tout de suite.
- `$idea->getShortContent()` : l'objet rend service.

La faute de frappe ne se cache plus.

---

## Le modèle, c'est quoi ?

Une classe par table, qui porte :

- les **données** d'une ligne (`title`, `author`, ...),
- et les **méthodes** qui parlent à la base.

---

## Le modèle contient tout le SQL

Avant, dans la page :

```php
$sql = "SELECT * FROM idees ORDER BY date_creation DESC";
$ideas = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
```

---

## Après

```php
$ideas = Idea::all();
```

La page affiche. Le modèle interroge. Personne ne fait les deux.

---

## `Idea::all()` ou `$idea->save()` ?

- `all()`, `find()`, `count()` sont **statiques** : on n'a pas encore d'objet.
- `save()`, `delete()` ne le sont pas : elles agissent sur **cet** objet.

Besoin d'un objet pour travailler ? Alors pas de `static`.

---

## Combien de connexions par page ?

Chaque classe qui veut la base ouvre-t-elle la sienne ?

---

## Une seule

```php
Database::getPdo();
```

- `static` : la connexion appartient à la **classe**.
- Créée à la première demande, réutilisée ensuite.
- Le mot de passe est écrit à **un seul endroit**.

---

## Et les require ?

```php
spl_autoload_register(function ($className) {
    require_once('classes/' . $className . '.php');
});
```

Vous utilisez une classe, PHP va chercher le fichier.

---

## Un formulaire, trois temps

1. `$_POST` : ce que l'utilisateur a saisi.
2. `new Idea(null, ...)` : un objet en mémoire.
3. `$idea->save()` : une ligne en base.

Pourquoi `null` comme id ? MySQL ne l'a pas encore attribué.

---

## Le flux complet

```txt
pages/home.php
   -> Idea::all()
      -> Database::getPdo()
         -> MySQL
```

Et le retour : des objets `Idea`, prêts à afficher.

---

## Récapitulatif

- Une classe = une responsabilité.
- Une ligne de la base devient un objet.
- Tout le SQL vit dans le modèle, les pages affichent.
- `static` pour une connexion unique, l'autoloader pour les `require`.

---

## Des questions ?

Place au TP 🚀
