# Les tableaux

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Vous en utilisez déjà

`$_GET`, `$_POST`, `$_SESSION`, `$_SERVER`

Ce sont tous des **tableaux**.

Depuis le TP 1 vous manipulez des tableaux sans le savoir.

---

## Rappel : le tableau numéroté

```php
$subjects = array('PHP', 'SQL', 'Réseau');

echo $subjects[0]; // PHP
```

- Les clés sont des nombres, et ça commence à **zéro**.
- `count($subjects)` donne 3.

---

## Rappel : le tableau associatif

```php
$student = array(
    'prenom' => 'Bart',
    'nom' => 'Simpson',
    'age' => 10,
);

echo $student['prenom']; // Bart
```

La clé porte du **sens**, c'est tout de suite plus lisible.

---

## Le problème

Skinner veut le carnet de notes de sa classe.

30 élèves, 4 matières.

Question : combien de variables faut-il si on n'utilise que des variables simples ?

---

## La réponse

`$prenom1`, `$nom1`, `$notePhp1`, `$prenom2`, `$nom2`…

Environ **180 variables**, et impossible à parcourir avec une boucle.

Il nous faut autre chose.

---

## Un tableau… de tableaux

```php
$students = array(
    array('prenom' => 'Bart', 'nom' => 'Simpson'),
    array('prenom' => 'Lisa', 'nom' => 'Simpson'),
);
```

Une case du tableau contient un autre tableau : c'est un tableau **à plusieurs dimensions**.

---

## Accéder à une valeur

```php
$students[1]['prenom']; // Lisa
```

On lit de gauche à droite : la case 1, puis dans cette case la clé `prenom`.

Et on peut descendre encore : `$students[1]['notes']['php']`.

---

## Voir ce qu'il y a dedans

```php
echo '<pre>';
print_r($students);
echo '</pre>';
```

Votre meilleur ami du TP : `print_r()` affiche la structure complète.

Le `<pre>` sert juste à garder l'indentation lisible.

---

## Parcourir : le foreach imbriqué

```php
foreach ($students as $student) {
    foreach ($student['notes'] as $subject => $note) {
        echo $subject . ' : ' . $note;
    }
}
```

Un `foreach` par niveau. Question : que vaut `$student` au premier tour ?

---

## La réponse

`$student` vaut le **tableau complet** du premier élève.

Pas une chaîne, pas un nombre : un tableau, avec ses clés `prenom`, `nom`, `notes`.

C'est pour ça qu'on peut refaire un `foreach` dessus.

---

## PHP fait le travail pour vous

```php
count($notes);      // combien de notes
array_sum($notes);  // la somme des notes
in_array('php', $subjects); // la matière existe ?
```

Une moyenne, c'est donc `array_sum($notes) / count($notes)`.

---

## Et depuis la base ?

```php
$students = $pdo->query('SELECT * FROM eleves')
                ->fetchAll(PDO::FETCH_ASSOC);
```

Question : quelle est la structure de `$students` après cette ligne ?

---

## La réponse

Un tableau **numéroté** de tableaux **associatifs**.

Une case par ligne de la table, une clé par colonne.

Autrement dit : ce que vous manipulez depuis le début de la séance.

---

## Pourquoi c'est important

Les pages affichent une **structure**, pas une source.

- Les données écrites à la main dans `common/data.php` : ça marche.
- Les mêmes données lues en base : ça marche **sans toucher aux pages**.
- C'est ça, séparer les données de l'affichage.

---

## Ce que vous allez construire

Le carnet de notes de Springfield :

- Sur la structure du TP 3 : entry-point, whitelist, une page par écran.
- La liste des matières, puis la fiche d'un élève, puis la classe entière.
- Les notes, les moyennes, le meilleur élève.
- Un classement par matière filtré depuis l'URL.
- Et pour finir : les mêmes données, lues dans une base.

---

## Récapitulatif

- Un tableau peut contenir des tableaux : c'est la structure de vos vraies données.
- `$students[0]['notes']['php']` : un crochet par niveau.
- Un `foreach` par niveau, et `print_r()` quand on est perdu.
- `count()`, `array_sum()`, `in_array()` évitent d'écrire des boucles inutiles.
- Une requête vous rend ce même format : changer de source ne change pas vos pages.

---

## Des questions ?

Place au TP 🚀
