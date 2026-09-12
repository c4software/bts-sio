# PHP et la POO

## Du procédural aux objets

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Où en sommes-nous ?

Vous savez déjà construire un site PHP complet :

- Un point d'entrée `index.php` avec sa whitelist.
- Des pages dans `pages/`, un `common/header.php`.
- Une connexion PDO dans `utils/db.php`.

C'est solide. Nous allons maintenant l'organiser autrement.

---

## Nos données aujourd'hui

```php
$student = [
    'firstname' => 'Camille',
    'lastname'  => 'Durand',
    'email'     => 'camille.durand@example.com',
];

echo $student['firstname'];
```

Un tableau associatif, vous en avez écrit des dizaines.

---

## Le souci

```php
echo $student['nmo'];
```

Faute de frappe… et PHP affiche une simple alerte, puis **continue**.

Rien ne dit qu'un « étudiant » doit avoir un prénom, un nom, un email. Et rien n'empêche non plus d'y glisser `$student['couleur_preferee']` au passage.

---

## Question

Comment **garantir la forme** de nos données ?

Comment dire, une fois pour toutes, « un étudiant, c'est un prénom, un nom et un email » ?

---

## La réponse : une classe

Une classe, c'est un **moule** :

- Elle décrit les données (les propriétés).
- Elle décrit ce qu'on peut en faire (les méthodes).
- Elle est écrite **une seule fois**, dans un fichier.

---

## Une première classe

```php
class Student
{
    public string $firstname;
    public string $lastname;
    public string $email;
}
```

Un fichier `classes/Student.php`, un nom en `PascalCase`, des propriétés **typées**.

---

## Le constructeur

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

`__construct` est appelé automatiquement à la création.

---

## Créer un objet

```php
$student = new Student('Camille', 'Durand');

echo $student->firstname; // Camille
```

- `new` fabrique un **objet** à partir du moule.
- `->` accède à ce qu'il y a dedans.
- `$this`, à l'intérieur de la classe, désigne l'objet en cours.

---

## Une méthode

```php
public function getFullName(): string
{
    return $this->firstname . ' ' . strtoupper($this->lastname);
}
```

```php
echo $student->getFullName(); // Camille DURAND
```

La classe porte **les données et le traitement**.

---

## Question

Pourquoi voudrait-on **cacher** une propriété ?

---

## La visibilité

```php
class Student
{
    public string $firstname;   // lisible partout
    private string $email;      // uniquement dans la classe
}
```

- `public` : accessible de l'extérieur.
- `private` : réservé à la classe, on passe par une méthode.

On cache pour **maîtriser** ce qui entre et ce qui sort.

---

## Accéder à du privé ?

```php
echo $student->email;
```

```
Error: Cannot access private property Student::$email
```

Erreur fatale, et c'est **voulu** : la classe protège ses données.

---

## Le constructeur, version longue

```php
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

Trois lignes pour dire deux fois la même chose.

---

## La promotion de constructeur (PHP 8)

```php
class Point
{
    public function __construct(
        public int $x = 0,
        public int $y = 0,
    ) {
    }
}
```

Exactement la même classe, en deux fois moins de lignes.

---

## Un tableau d'objets

```php
$students = [
    new Student('Camille', 'Durand'),
    new Student('Sofiane', 'Baptiste'),
];

foreach ($students as $student) {
    echo $student->getFullName();
}
```

Le `foreach` que vous connaissez, avec des objets dedans.

---

## Côte à côte

```php
// Hier
echo $row['firstname'] . ' ' . strtoupper($row['lastname']);

// Aujourd'hui
echo $student->getFullName();
```

Le second dit **ce qu'il fait**, pas comment il le fait.

---

## Avantage 1 : le code se relit

- L'éditeur propose `->getFullName()` tout seul.
- Le typage `public string $email` documente la donnée.
- Une propriété qui n'existe pas : erreur **immédiate**.

Fini les fautes de frappe qui passent inaperçues.

---

## Avantage 2 : données et comportement ensemble

Une classe = **une responsabilité**.

- `Student` sait se présenter, et sait aussi se lire et s'écrire en base.
- `Database` sait se connecter.

Quand quelque chose ne va pas, vous savez dans quel fichier regarder.

---

## Avantage 3 : on réutilise

Votre classe `Database`, vous l'écrivez **une fois**…

… et vous la copiez dans le projet suivant, telle quelle.

Difficile d'en dire autant d'un bout de code collé en haut de dix pages.

---

## Avantage 4 : on prépare la suite

Le MVC, le Java, l'Android : **ce ne sont que des classes**.

Tout ce que vous voyez aujourd'hui, vous le retrouverez au mot près.

---

## La base de données en objet

```php
class Database
{
    private static ?PDO $pdo = null;

    public static function getPdo(): PDO
    {
        if (self::$pdo === null) {
            $dsn = "mysql:host=localhost;dbname=idees;charset=utf8mb4";
            self::$pdo = new PDO($dsn, "root", "");
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        return self::$pdo;
    }
}
```

`classes/Database.php` remplace `utils/db.php`.

---

## Question

Pourquoi `static` ?

Pourquoi pas un `new Database()` dans chaque page ?

---

## Parce qu'une connexion suffit

- On n'a **pas besoin d'un objet** `Database` : il n'a rien à retenir de personnel.
- On veut **une seule** connexion, partagée par tout le site.
- On l'appelle sans rien instancier :

```php
$pdo = Database::getPdo();
```

---

## Le problème suivant

Le SQL est éparpillé dans toutes les pages :

```php
$statement = $pdo->prepare("SELECT * FROM etudiants WHERE id = ?");
```

Changez une colonne, et vous partez à la chasse dans dix fichiers.

---

## Le modèle (model)

Une classe par table, qui porte les **données** d'une ligne **et** le SQL :

```php
class Student
{
    public static function all(): array { /* SELECT */ }

    public function save(): void { /* INSERT */ }
}
```

Tout le SQL du projet vit dans les modèles.

---

## Le modèle, en vrai

```php
public static function all(): array
{
    $statement = Database::getPdo()->query("SELECT * FROM etudiants");
    $students = [];

    foreach ($statement->fetchAll(PDO::FETCH_ASSOC) as $row) {
        $students[] = new Student($row['prenom'], $row['nom']);
    }

    return $students;
}
```

Il entre des lignes SQL, il sort des **objets**.

---

## `static`, ou pas ?

- `Student::all()` : on n'a pas encore d'objet, c'est elle qui en fabrique.
- `$student->save()` : elle enregistre **cet** objet, via `$this`.

Besoin d'un objet pour travailler ? Alors pas de `static`.

---

## Une page, avant

```php
require 'utils/db.php';
$statement = $pdo->query("SELECT * FROM etudiants");
foreach ($statement->fetchAll() as $row) {
    echo $row['prenom'] . ' ' . strtoupper($row['nom']);
}
```

---

## La même page, après

```php
foreach (Student::all() as $student) {
    echo $student->getFullName();
}
```

Plus **une ligne** de SQL dans la page.

---

## Question

Une classe = un fichier. Trois classes, quatre, dix…

Un `require` par classe en haut de `index.php` ?

---

## L'autoloader

```php
spl_autoload_register(function ($className) {
    $file = __DIR__ . '/classes/' . $className . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});
```

Cinq lignes : PHP va chercher `classes/Student.php` le jour où vous écrivez `new Student(...)`.

---

## Le MVC : trois familles de classes

- **Modèle** : les données et la base, notre classe `Student`.
- **Vue** : l'affichage, le HTML.
- **Contrôleur** : le traitement, ce que vous écrivez aujourd'hui en haut de vos pages.

Chaque famille a sa place, et une seule.

---

## Et la suite ?

Ce découpage porte un nom, et il se généralise.

La suite dans [les slides MVC](/cours/mvc.md).

---

## Récapitulatif

- Une classe décrit des données typées et leur comportement.
- `new`, `->`, `$this`, `__construct`, `public` / `private`.
- `Database::getPdo()` remplace `utils/db.php`.
- Un modèle sort le SQL des pages et renvoie des objets.
- `spl_autoload_register` charge les classes toutes seules.
- Le MVC n'est que la suite logique.

---

## Des questions ?

Place au TP 🚀
