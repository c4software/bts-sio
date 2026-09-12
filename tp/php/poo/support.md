---
description: "En plus du cours : la POO en PHP, des classes aux modèles, pour préparer le MVC"
---

# PHP et la POO : en plus du cours

::: details Sommaire
[[toc]]
:::

Voilà le complément écrit du cours « PHP et la POO ». Il n'est pas à lire d'une traite : gardez-le ouvert dans un onglet pendant les deux TP POO, et revenez-y dès qu'une syntaxe vous échappe.

L'objectif de cette partie est simple : reprendre le PHP que vous savez déjà écrire, et le réorganiser en **objets**. Pas pour faire joli, mais pour que votre code reste lisible quand un projet grossit, et parce que c'est exactement la manière dont fonctionnent les outils que vous rencontrerez ensuite.

::: tip Ce document ne remplace pas le cours POO général
Ici, on reste **côté PHP et côté pratique**. L'héritage, les classes abstraites et les interfaces sont traités en profondeur dans [le cours POO complet](/cours/poo.md) et dans [l'aide mémoire](/cheatsheets/poo/).
:::

## Pourquoi la POO ?

Depuis le début, vos données sont des **tableaux associatifs** :

```php
$student = [
    'firstname' => 'Camille',
    'lastname'  => 'Durand',
    'email'     => 'camille.durand@example.com',
];
```

Ça marche très bien… jusqu'au jour où vous écrivez ceci :

```php
echo $student['nmo'];
```

PHP affiche une alerte (`Undefined array key`) et **continue son chemin**. Votre page s'affiche, presque normalement, avec un trou au milieu. Vous allez passer vingt minutes à chercher.

Et rien, absolument rien, n'empêche non plus :

```php
$student['couleur_preferee'] = 'bleu'; // au milieu d'une page, pourquoi pas
$student['email'] = 42;                // un email qui est un nombre
```

Le tableau associatif ne sait pas ce qu'il contient. Il n'y a aucun endroit dans votre projet où il est écrit « un étudiant, c'est un prénom, un nom et un email ».

**La réponse, c'est une classe.** Une classe est un moule : elle décrit une fois pour toutes les données (les propriétés) et ce qu'on peut en faire (les méthodes). Ensuite, chaque étudiant de votre site est un **objet** fabriqué avec ce moule.

Les avantages, concrètement :

- **Le code se relit.** Le typage documente la donnée, l'éditeur vous propose les propriétés et les méthodes, et une faute de frappe devient une erreur immédiate.
- **Les données et les traitements sont au même endroit.** Une classe = une responsabilité. Quand quelque chose ne va pas, vous savez dans quel fichier regarder.
- **On réutilise.** Une classe `Database` écrite une fois vous suivra de projet en projet.
- **On prépare la suite.** Le Java, l'Android, le MVC : ce ne sont que des classes. Ce que vous apprenez ici se retrouve au mot près.

::: tip Quand crée-t-on une classe ?
Dès qu'une donnée revient plusieurs fois dans le projet avec toujours la même forme (un étudiant, une idée, un livre, une commande), ou dès qu'un bout de code technique est copié dans plusieurs pages (la connexion à la base, une requête). Inutile, en revanche, de créer une classe pour une variable utilisée une seule fois sur une seule page.
:::

## Une classe

Une classe se déclare avec le mot-clé `class`, suivi du nom de la classe et d'un bloc d'accolades :

```php
<?php

class Student
{
    public string $firstname;
    public string $lastname;
    private string $email;
}
```

Ce que l'on voit ici :

- `Student` est le **nom de la classe**, en `PascalCase` (chaque mot commence par une majuscule, pas de tiret ni d'espace).
- `$firstname`, `$lastname` et `$email` sont les **propriétés** : les données que chaque étudiant portera.
- Les propriétés sont **typées** (`string`, `int`, `float`, `bool`, `array`). PHP refusera d'y mettre autre chose.
- `public` et `private` sont la **visibilité** : on y revient [un peu plus bas](#la-visibilite).

::: warning La convention : un fichier par classe
Chaque classe vit dans son propre fichier, dans un dossier `classes/`, et **le nom du fichier est exactement le nom de la classe** :

```
classes/
├── Student.php    → class Student
├── Database.php   → class Database
└── Idea.php       → class Idea
```

Ce n'est pas une coquetterie : c'est ce qui permettra à PHP de charger vos classes tout seul, voir [Charger les classes automatiquement](#charger-les-classes-automatiquement).
:::

::: tip Nommage
Les classes, propriétés et méthodes sont en **anglais** (comme toutes vos variables depuis le début), les tables et colonnes SQL restent en français. Une classe porte un nom au **singulier** : `Student`, pas `Students`.
:::

## Les objets

La classe est le moule, l'**objet** est ce qui sort du moule. On le fabrique avec `new` :

```php
$student = new Student();
```

`$student` est maintenant une **instance** de la classe `Student`. On accède à ce qu'il y a dedans avec la flèche `->` :

```php
$student->firstname = 'Camille';
$student->lastname = 'Durand';

echo $student->firstname; // Camille
```

::: warning Attention à la flèche
Sur un objet : `$student->firstname`, **sans dollar** devant `firstname`. Sur un tableau, c'était `$student['firstname']`. Les deux syntaxes n'ont rien à voir, c'est l'erreur numéro un des débuts.
:::

Une classe, un moule… donc autant d'objets que vous voulez, tous indépendants :

```php
$first = new Student();
$first->firstname = 'Camille';

$second = new Student();
$second->firstname = 'Sofiane';

echo $first->firstname;  // Camille
echo $second->firstname; // Sofiane
```

Et comme n'importe quelle valeur, un objet se range dans un tableau et se parcourt avec le `foreach` que vous connaissez déjà :

```php
$students = [
    new Student('Camille', 'Durand'),
    new Student('Sofiane', 'Baptiste'),
];

foreach ($students as $student) {
    echo $student->getFullName();
}
```

::: tip Que se passe-t-il derrière ?
`var_dump()` fonctionne sur un objet, et il est très bavard :

```php
var_dump($students[0]);
```

```
object(Student)#1 (3) {
  ["firstname"]=> string(7) "Camille"
  ["lastname"]=>  string(6) "Durand"
  ["email":"Student":private]=> string(26) "camille.durand@example.com"
}
```

Vous y lisez le **nom de la classe**, le numéro de l'objet en mémoire (`#1`), et pour chaque propriété son type, sa valeur, et sa visibilité. C'est votre meilleur outil de débogage en POO.
:::

## Le constructeur

Écrire `new Student()` puis remplir les propriétés une par une, c'est long, et surtout on peut en oublier une. Le **constructeur** est une méthode spéciale appelée automatiquement au moment du `new` :

```php
class Student
{
    public string $firstname;
    public string $lastname;

    public function __construct(string $firstname, string $lastname)
    {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
    }
}
```

```php
$student = new Student('Camille', 'Durand');
```

Les paramètres du `new` sont ceux de `__construct`. Si vous en oubliez un, PHP vous le dit tout de suite : plus moyen de créer un étudiant sans nom.

`$this` désigne **l'objet en cours de fabrication**. `$this->firstname` est la propriété de l'objet, `$firstname` (sans `$this`) est le paramètre reçu. Ce sont deux choses différentes, d'où la ligne `$this->firstname = $firstname;`.

**La promotion de constructeur (PHP 8).** Vous avez remarqué qu'on écrit trois fois la même information : la propriété, le paramètre, l'affectation. PHP 8 permet de tout dire en une fois. Les deux écritures ci-dessous donnent **exactement la même classe** :

```php
// Écriture classique
class Point
{
    public int $x;
    public int $y;

    public function __construct(int $x = 0, int $y = 0)
    {
        $this->x = $x;
        $this->y = $y;
    }
}
```

```php
// Avec la promotion de constructeur
class Point
{
    public function __construct(
        public int $x = 0,
        public int $y = 0,
    ) {
    }
}
```

En ajoutant la visibilité (`public`, `private`) devant le paramètre, PHP crée la propriété et l'affecte pour vous. C'est l'écriture que vous croiserez partout, autant s'y habituer maintenant.

Les **valeurs par défaut** fonctionnent comme pour n'importe quelle fonction : un paramètre avec une valeur par défaut devient facultatif, et doit se placer après ceux qui n'en ont pas.

```php
$origin = new Point();      // 0, 0
$point  = new Point(3, 4);  // 3, 4
```

## La visibilité

Devant chaque propriété et chaque méthode, on précise qui a le droit d'y toucher :

- `public` : accessible de partout, depuis l'intérieur comme depuis l'extérieur de la classe.
- `private` : accessible **uniquement depuis l'intérieur** de la classe.

```php
class Student
{
    public string $firstname;  // tout le monde peut lire et écrire
    private string $email;     // seule la classe Student y touche
}
```

Pourquoi se compliquer la vie ? Parce qu'une propriété `public`, c'est une porte ouverte : n'importe quelle page de votre site peut écrire n'importe quoi dedans, et le jour où la valeur est fausse, vous devrez chercher le coupable dans tout le projet. En passant la propriété en `private`, vous décidez **vous-même** ce qui entre et ce qui sort, via des méthodes.

Ces méthodes portent des noms consacrés : un **getter** (accesseur) pour lire, un **setter** (mutateur) pour écrire.

```php
class Student
{
    private string $email;

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        // Ici, on peut contrôler avant d'accepter la valeur.
        $this->email = strtolower(trim($email));
    }
}
```

```php
$student->setEmail('  Camille.Durand@Example.com ');
echo $student->getEmail(); // camille.durand@example.com
```

Tout l'intérêt est là : le setter a pu nettoyer la valeur au passage. Avec une propriété publique, personne n'aurait rien nettoyé.

::: tip Que se passe-t-il derrière si on accède à du privé ?
Essayez, pour voir :

```php
echo $student->email;
```

```
Fatal error: Uncaught Error: Cannot access private property Student::$email
```

Une **erreur fatale** : le script s'arrête net. Ce n'est pas un bug, c'est exactement ce que vous avez demandé en écrivant `private`. La classe protège ses données, y compris contre vous.
:::

::: tip Et `protected` ?
Il existe une troisième visibilité, `protected` (accessible dans la classe et dans les classes qui en héritent). Elle n'a d'intérêt qu'avec l'héritage : rendez-vous dans [le cours POO complet](/cours/poo.md).
:::

## Les méthodes

Une méthode, c'est une fonction qui vit dans une classe. Elle s'écrit comme une fonction normale, avec en plus une visibilité devant, et l'accès à `$this` :

```php
class Student
{
    public function __construct(
        public string $firstname,
        public string $lastname,
    ) {
    }

    public function getFullName(): string
    {
        return $this->firstname . ' ' . strtoupper($this->lastname);
    }
}
```

```php
$student = new Student('Camille', 'Durand');
echo $student->getFullName(); // Camille DURAND
```

- `$this` désigne **l'objet sur lequel la méthode a été appelée**. Sans `$this`, la méthode ne saurait pas de quel étudiant on parle.
- `: string` après les parenthèses est le **type de retour**. PHP vérifie que vous retournez bien ce que vous avez annoncé. Utilisez `: void` quand la méthode ne retourne rien.

**Les méthodes statiques.** Une méthode `static` appartient à la **classe**, pas à un objet. On l'appelle avec `::` et sans jamais faire de `new` :

```php
class Math
{
    public static function percent(float $value, float $total): float
    {
        return $total === 0.0 ? 0.0 : ($value / $total) * 100;
    }
}
```

```php
echo Math::percent(3, 12); // 25
```

Dans une méthode statique, `$this` n'existe pas (il n'y a pas d'objet). Pour accéder à une propriété statique de la classe, on écrit `self::` :

```php
self::$pdo
```

::: tip Quand utiliser `static` ?
Quand la méthode n'a **besoin d'aucune donnée propre à un objet**. Un calcul, un utilitaire, ou… une connexion à la base de données partagée par tout le site. C'est précisément le cas de la section suivante.

Dans le doute : si vous vous demandez « de quel objet parle-t-on ? » et que la question n'a pas de sens, c'est que la méthode est statique.
:::

## Une classe pour la base de données

Voici notre premier cas concret. Jusqu'ici, la connexion PDO vivait dans `utils/db.php`, un fichier que chaque page faisait `require`. Nous allons le remplacer par une classe.

```php
<?php
// classes/Database.php

class Database
{
    // La connexion, partagée par tout le projet.
    private static ?PDO $pdo = null;

    public static function getPdo(): PDO
    {
        // Première utilisation : on ouvre la connexion.
        if (self::$pdo === null) {
            $dsn = "mysql:host=localhost;dbname=idees;charset=utf8mb4";
            self::$pdo = new PDO($dsn, "root", "");
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        // Les fois suivantes : on renvoie celle qui existe déjà.
        return self::$pdo;
    }
}
```

Décortiquons :

- `private static ?PDO $pdo = null;` : une propriété **statique** (elle appartient à la classe, il n'y en a qu'une pour tout le site), **privée** (personne d'autre n'y touche), de type `PDO` mais qui peut valoir `null`, d'où le `?`.
- `getPdo()` est statique : vous n'aurez **jamais** à écrire `new Database()`.
- Le `if (self::$pdo === null)` fait tout le travail : la connexion n'est ouverte qu'une seule fois, même si dix pages appellent `getPdo()`.
- `charset=utf8mb4` évite les accents transformés en « Ã© », et `ERRMODE_EXCEPTION` vous donne un vrai message quand une requête échoue. Exactement comme dans `utils/db.php`, ces deux réglages ne changent pas.

Comparez avec l'ancien fichier :

| `utils/db.php`                             | `classes/Database.php`                            |
| ------------------------------------------ | ------------------------------------------------- |
| `require 'utils/db.php';` dans chaque page  | rien à faire, l'autoloader s'en charge             |
| une variable globale `$pdo`                 | une méthode `Database::getPdo()`                   |
| reconnecté à chaque `require` mal maîtrisé  | une seule connexion, garantie par le `if`          |
| impossible à réutiliser ailleurs            | un fichier à copier dans le projet suivant         |

À l'usage, ça donne ceci :

```php
$statement = Database::getPdo()->prepare("SELECT * FROM idees WHERE id = ?");
$statement->execute([$id]);
$row = $statement->fetch(PDO::FETCH_ASSOC);
```

C'est le même PDO, les mêmes requêtes préparées que depuis le début. Seule la façon d'obtenir l'objet `$pdo` a changé.

::: warning Les identifiants
Dans le fichier ci-dessus, les identifiants sont ceux de XAMPP / WAMP : hôte `localhost`, utilisateur `root`, mot de passe vide. Adaptez le nom de la base (`idees` ici) à votre projet.
:::

## Le modèle

Nous avons une connexion. Il nous manque la classe qui représente **une ligne** de la table `idees`, et qui sait aussi aller la chercher, l'enregistrer et la supprimer en base.

Cette classe, on l'appelle **le modèle** (*model* en anglais) : une classe par table, qui porte à la fois les **données** d'une ligne et les **méthodes d'accès** à la base.

```php
<?php
// classes/Idea.php

class Idea
{
    public function __construct(
        public ?int $id,
        public string $title,
        public string $author,
        public string $content,
        public string $createdAt
    ) {
    }

    public function getShortContent(int $length = 100): string
    {
        if (mb_strlen($this->content) <= $length) {
            return $this->content;
        }

        return mb_substr($this->content, 0, $length) . '...';
    }

    // Toutes les idées, la plus récente en premier.
    public static function all(): array
    {
        $pdo = Database::getPdo();
        $rows = $pdo->query("SELECT * FROM idees ORDER BY date_creation DESC")->fetchAll(PDO::FETCH_ASSOC);

        $ideas = [];
        foreach ($rows as $row) {
            $ideas[] = new Idea(
                $row['id'],
                $row['titre'],
                $row['auteur'],
                $row['contenu'],
                $row['date_creation']
            );
        }

        return $ideas;
    }

    // Une idée précise, ou null si l'identifiant n'existe pas.
    public static function find(int $id): ?Idea
    {
        $stmt = Database::getPdo()->prepare("SELECT * FROM idees WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return null;
        }

        return new Idea(
            $row['id'],
            $row['titre'],
            $row['auteur'],
            $row['contenu'],
            $row['date_creation']
        );
    }

    public static function count(): int
    {
        return (int) Database::getPdo()->query("SELECT COUNT(*) FROM idees")->fetchColumn();
    }

    // Enregistre CETTE idée en base.
    public function save(): void
    {
        $pdo = Database::getPdo();
        $stmt = $pdo->prepare(
            "INSERT INTO idees (titre, auteur, contenu, date_creation) VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([$this->title, $this->author, $this->content, $this->createdAt]);

        $this->id = (int) $pdo->lastInsertId();
    }

    // Supprime CETTE idée de la base.
    public function delete(): void
    {
        $stmt = Database::getPdo()->prepare("DELETE FROM idees WHERE id = ?");
        $stmt->execute([$this->id]);
    }
}
```

C'est long, mais chaque morceau est déjà connu. Reprenons dans l'ordre.

**Les données.** Le constructeur décrit ce qu'est une idée : cinq propriétés typées. L'`id` est de type `?int` parce qu'une idée qui n'a pas encore été enregistrée n'a pas d'identifiant (on lui passe `null`), c'est la base qui le lui donnera.

**Un service rendu.** `getShortContent()` rend un extrait du contenu : un objet sait faire des choses avec ses propres données.

**Les méthodes statiques : `all()`, `find()`, `count()`.** On les appelle sur la **classe**, avec le double deux-points : `Idea::all()`, `Idea::find(3)`, `Idea::count()`. Pourquoi statiques ? Parce qu'au moment où on les appelle, **on n'a pas encore d'objet** : c'est justement leur travail d'en fabriquer un (ou une liste). Écrire `$idea = new Idea(...)` juste pour pouvoir demander `$idea->find(3)` n'aurait aucun sens.

**Les méthodes d'instance : `save()`, `delete()`.** On les appelle sur un **objet**, avec la flèche : `$idea->save()`, `$idea->delete()`. Ici l'objet existe déjà, et la méthode agit sur **lui** : elle lit ses propriétés avec `$this->title`, `$this->id`, et met même à jour `$this->id` après l'`INSERT`.

::: tip La règle, en une phrase
Si la méthode a besoin d'un objet pour travailler, elle n'est pas statique (`$idea->save()`). Si elle sert à en obtenir un, elle l'est (`Idea::find(3)`).
:::

Deux détails qui comptent encore :

- Le modèle renvoie des **objets**, pas des tableaux. C'est la boucle `foreach` de `all()` qui fait la traduction « ligne SQL → objet `Idea` », et c'est **le seul endroit du projet** où `titre` devient `title` et `contenu` devient `content`.
- `find()` a pour type de retour `?Idea` : soit une idée, soit `null` si l'identifiant n'existe pas. Le `?` vous oblige, côté page, à penser au cas « pas trouvé ».

Et voilà ce que devient une page :

```php
<?php
// pages/idees.php

$ideas = Idea::all();
?>

<h1>Les idées</h1>
<ul>
    <?php foreach ($ideas as $idea) { ?>
        <li><?= htmlspecialchars($idea->title) ?> : <?= htmlspecialchars($idea->getShortContent(60)) ?></li>
    <?php } ?>
</ul>
```

Plus **une seule ligne de SQL** dans la page. Relisez-la : elle se comprend sans rien connaître de votre base.

::: tip Et pour enregistrer ?
Le trajet est toujours le même : on construit l'objet, puis on lui demande de s'enregistrer.

```php
$idea = new Idea(null, $title, $author, $content, date('Y-m-d H:i:s'));
$idea->save();

echo $idea->id; // Le numéro attribué par MySQL, disponible juste après le save().
```

:::


## Charger les classes automatiquement

Plusieurs classes, plusieurs fichiers. Faut-il écrire un `require` par classe en haut de `index.php` ? Et dix demain ?

Non. PHP propose `spl_autoload_register()` : vous lui donnez une fonction, et PHP l'appelle **tout seul** la première fois qu'il rencontre une classe qu'il ne connaît pas.

```php
<?php
// index.php

// PHP appelle cette fonction dès qu'une classe inconnue est utilisée.
spl_autoload_register(function ($className) {
    // $className vaut par exemple "Idea".
    $file = __DIR__ . '/classes/' . $className . '.php';

    // Si le fichier correspondant existe, on le charge.
    if (file_exists($file)) {
        require_once $file;
    }
});
```

Cinq lignes utiles, et c'est fini : le jour où vous écrivez `new Idea(...)`, PHP va chercher `classes/Idea.php` et le charge. C'est là que la convention « un fichier par classe, portant le nom de la classe » prend tout son sens.

::: tip Où le mettre ?
Tout en haut de `index.php`, avant `session_start()` ou juste après, **mais obligatoirement avant la première utilisation d'une classe**. En pratique, c'est la toute première chose de votre point d'entrée :

```php
<?php
spl_autoload_register(function ($className) { /* ... */ });

session_start();

$whitelist = ['home', 'idees', 'connexion'];
// ...
```

:::

::: tip Que se passe-t-il derrière ?
`__DIR__` est le dossier du fichier en cours (ici, la racine de votre projet). On l'utilise pour que le chemin fonctionne quelle que soit la page appelée.

Et le `if (file_exists(...))` ? Sans lui, une classe absente provoquerait une erreur de `require` illisible. Avec lui, vous obtenez le message clair `Class "Idea" not found`, qui vous dit vraiment ce qui manque.
:::

## Vers le MVC

Vous venez, sans le savoir, de faire la moitié du chemin vers une architecture qui porte un nom : le **MVC** (Modèle, Vue, Contrôleur). L'idée tient en trois phrases :

- Le **Modèle** s'occupe des données : vos classes `Idea` et `User`.
- La **Vue** s'occupe de l'affichage : le HTML, et rien d'autre.
- Le **Contrôleur** s'occupe du traitement : lire `$_POST`, décider quoi faire, appeler le modèle, puis choisir la vue. C'est exactement ce que vous écrivez aujourd'hui en haut de vos pages, avant le `?>`.

Le bénéfice est le même que celui du modèle, en plus large : chaque type de code a **une seule place**. On ne cherche plus une requête SQL au milieu d'un tableau HTML, et deux personnes peuvent travailler sur le même projet sans se marcher dessus.

La suite, c'est par ici : [les slides MVC](/cours/mvc.md) et [le support MVC](/tp/mvc/support.md).

::: tip Pour aller plus loin
Nous n'avons vu ici que ce dont vous avez besoin pour vos TP. La POO va bien plus loin : l'**héritage**, les **classes abstraites**, les **interfaces**, le **polymorphisme**. Tout est détaillé dans [le cours POO complet](/cours/poo.md) et dans [l'aide mémoire](/cheatsheets/poo/).

👋 Si vous avez des questions, n'hésitez pas.
:::
