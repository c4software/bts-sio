---
description: Séries d'exercices sur papier à faire en classe pour s'entrainer au PHP. Analyse, réflexion collective et mise en pratique, sans ordinateur.
---

# Exercices PHP en classe

Ces exercices se font **à l'écrit, sans ordinateur**, en classe. L'objectif n'est pas d'écrire du code parfait à la virgule près, mais de **raisonner** : lire du code, prédire ce qu'il fait, repérer les pièges, et écrire la logique.

Les [sujets de révision](./exercices-maison.md) sont à faire **à la maison**, avant chaque évaluation.

Légende :

- **(analyse)** : lire, prédire, expliquer.
- **(collectif)** : on observe et on discute ensemble.
- **(pratique)** : écrire du code sur la feuille.

---

## Série 1 : Le client et le serveur

### Exercice 1.1 (collectif) Que reçoit le navigateur ?

Voici le contenu du fichier `page.php` sur le serveur :

```php
<!DOCTYPE html>
<html>
<body>
    <h1>Bonjour</h1>
    <p>Nous sommes le <?php echo date("d/m/Y"); ?></p>
</body>
</html>
```

1. Écrivez **exactement** ce que reçoit le navigateur d'un visiteur le 24/12/2026.
2. Le visiteur fait « Afficher le code source de la page ». Voit-il le mot `echo` ? Pourquoi ?
3. Le lendemain, le visiteur recharge la page. Qu'est-ce qui change, et **qui** a fait ce changement ?

### Exercice 1.2 (analyse) Vrai ou faux ?

Pour chaque affirmation, répondez vrai ou faux et **justifiez en une phrase** :

1. Le PHP s'exécute dans le navigateur du visiteur.
2. Un fichier `.php` doit obligatoirement contenir du PHP.
3. Un fichier `.html` peut exécuter du PHP si on met les balises `<?php ?>`.
4. Si mon code PHP contient un mot de passe, le visiteur peut le voir en affichant le code source.

---

## Série 2 : Variables et types

### Exercice 2.1 (analyse) Quel type ?

Donnez le type de chaque valeur (`string`, `int`, `float`, `boolean`, `array`) :

| Valeur | Type |
| --- | --- |
| `42` | |
| `"42"` | |
| `10.5` | |
| `true` | |
| `array("a", "b")` | |
| `"true"` | |

### Exercice 2.2 (analyse) Suivez la valeur

```php
$a = 5;
$b = $a;
$a = 10;
echo $b;
```

1. Qu'affiche ce code ?
2. Expliquez pourquoi en une phrase.

### Exercice 2.3 (analyse) Concaténer n'est pas calculer

```php
$nom = "brosseau";
$prenom = "valentin";

echo $prenom . $nom;
echo $prenom . " " . $nom;
```

1. Qu'affichent ces deux lignes (soyez précis, chaque caractère compte) ?
2. (pratique) Écrivez la ligne qui affiche `BROSSEAU Valentin` à partir des deux variables (indice : cherchez du côté des fonctions `strtoupper` et `ucfirst`, à quoi peuvent-elles servir d'après leur nom ?).

---

## Série 3 : Les conditions

### Exercice 3.1 (collectif) Le bug du permis

Un étudiant a écrit ce code :

```php
$age = 22;

if($age >= 14) {
    echo "Vous pouvez passer le permis 2 roues.";
} else if ($age >= 18) {
    echo "Vous pouvez passer le permis voiture";
} else {
    echo "Encore un peu de patience…";
}
```

1. Qu'affiche ce code avec `$age = 22` ?
2. Est-ce le comportement attendu ? Pourquoi ?
3. La branche `else if ($age >= 18)` peut-elle s'exécuter un jour ? Justifiez.
4. (pratique) Corrigez le code.

### Exercice 3.2 (pratique) Le tarif du cinéma

Écrivez le code qui affiche le tarif en fonction de la variable `$age` :

- Moins de 14 ans : « Tarif enfant : 5€ »
- De 14 à 25 ans inclus : « Tarif jeune : 7€ »
- Plus de 25 ans : « Tarif plein : 11€ »

### Exercice 3.3 (analyse) La ternaire

```php
$estConnecte = true;
echo $estConnecte ? "Bienvenue" : "Veuillez vous connecter";
```

1. Qu'affiche ce code ?
2. (pratique) Réécrivez-le avec un `if / else` classique.

---

## Série 4 : Les boucles

### Exercice 4.1 (analyse) Tracez la boucle

```php
$i = 0;
while ($i < 4) {
    echo $i;
    $i++;
}
echo "fin:" . $i;
```

1. Qu'affiche ce code exactement ?
2. Combien de fois le corps de la boucle s'exécute-t-il ?
3. Que vaut `$i` **après** la boucle ?

### Exercice 4.2 (collectif) La boucle qui ne s'arrête jamais

```php
$compteur = 10;
while ($compteur > 0) {
    echo "Il reste " . $compteur . " places";
}
```

1. Quel est le problème de ce code ?
2. Que va-t-il se passer concrètement sur le serveur ?
3. (pratique) Corrigez-le.

### Exercice 4.3 (pratique) À vous d'écrire

1. Écrivez une boucle qui affiche les nombres de 10 à 0 (compte à rebours).
2. Écrivez une boucle qui affiche la table de multiplication de 7 (de `7 x 1 = 7` à `7 x 10 = 70`).
3. Écrivez une boucle qui affiche uniquement les nombres **pairs** entre 0 et 20 (indice : l'opérateur `%` donne le reste de la division).

---

## Série 5 : Tableaux et filtrage

### Exercice 5.1 (analyse) Lire un tableau

```php
$student = array(
    "nom" => "Simpson",
    "prenom" => "Bart",
    "age" => 10,
    "moyennes" => array(4, 8, 12),
);
```

Que valent les expressions suivantes ?

1. `$student["prenom"]`
2. `$student["age"] >= 18`
3. `$student["moyennes"][1]` (attention au piège)
4. `count($student["moyennes"])`

### Exercice 5.2 (pratique) Afficher une liste

Soit le tableau :

```php
$courses = array("Pain", "Lait", "Chocolat", "Café");
```

Écrivez le code qui affiche chaque élément précédé d'un tiret, un par ligne, avec un `foreach`.

### Exercice 5.3 (pratique) Le filtrage

Soit le tableau :

```php
$students = array(
    array("prenom" => "Bart", "age" => 10),
    array("prenom" => "Lisa", "age" => 8),
    array("prenom" => "Valentin", "age" => 33),
    array("prenom" => "Homer", "age" => 39),
);
```

1. Écrivez le code qui affiche uniquement les prénoms des personnes **majeures** (boucle + condition : c'est ça, le filtrage).
2. Écrivez le code qui **compte** le nombre de mineurs et affiche le résultat à la fin.
3. (analyse) Si j'ajoute une personne au tableau, dois-je modifier votre code ? Justifiez.

---

## Série 6 : Les fonctions

### Exercice 6.1 (analyse) `echo` n'est pas `return`

```php
function a() {
    echo "A";
}

function b() {
    return "B";
}

a();
b();
echo b();
```

1. Qu'affiche ce code exactement ?
2. Que contient la variable `$x` après `$x = a();` ? Et après `$x = b();` ?
3. Formulez la règle : quelle est la différence entre `echo` et `return` ?

### Exercice 6.2 (analyse) Tracez l'appel

```php
function double($n) {
    return $n * 2;
}

echo double(3);
echo double(double(3));
```

1. Qu'affichent ces deux lignes ?
2. Dans `double(double(3))`, dans quel ordre les choses se passent-elles ?

### Exercice 6.3 (pratique) Écrivez vos fonctions

1. Écrivez une fonction `prixTTC($prixHT)` qui retourne le prix TTC (TVA à 20%).
2. Écrivez une fonction `estMajeur($age)` qui retourne `true` ou `false`.
3. Utilisez `estMajeur()` dans une condition qui affiche « Entrée autorisée » ou « Entrée refusée ».

### Exercice 6.4 (analyse) Le mystère de la variable invisible

Un étudiant a écrit ce code, qui ne fonctionne pas :

```php
$tva = 20;

function prixTTC($prix) {
    return $prix + ($prix * $tva / 100);
}

echo prixTTC(100);
```

1. Quel est le problème ? (Indice : une fonction est une boite **fermée**.)
2. (pratique) Proposez une correction **sans** variable globale.

---

## Série 7 : Les includes et la structure

### Exercice 7.1 (analyse) Qu'affiche la page ?

Quatre fichiers sur le serveur :

`common/header.php` :

```html
<header>Mon site</header>
```

`common/functions.php` :

```php
<?php
function signature() {
    return "Bart";
}
```

`common/footer.php` :

```php
<footer>© <?php echo date("Y"); ?></footer>
```

`index.php` :

```php
<?php include('common/functions.php'); ?>
<?php include('common/header.php'); ?>
<p>Réalisé par <?php echo signature(); ?></p>
<?php include('common/footer.php'); ?>
```

1. Écrivez **exactement** ce que reçoit le navigateur (nous sommes en 2026).
2. Que se passe-t-il si on inverse les deux premières lignes de `index.php` ? Et si on déplace l'include de `functions.php` tout en bas ?

### Exercice 7.2 (analyse) Où corriger le bug ?

Le site ci-dessus possède 5 pages, toutes construites sur le même modèle que `index.php`. Un client signale que le pied de page affiche « © 2024 » sur **toutes** les pages.

1. Combien de fichiers devez-vous ouvrir pour corriger le problème ?
2. Quelle est la cause probable du bug ? (Le code du footer ci-dessus est correct, imaginez ce qu'a écrit le développeur fautif.)
3. Sans les includes, combien de fichiers auraient été à corriger ?

### Exercice 7.3 (analyse) Suivez l'entry-point

```php
<?php
session_start();
include('common/header.php');

$whitelist = array('home', 'contact');

if(isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include("pages/" . $_GET['page'] . '.php');
} else {
    include('pages/home.php');
}

include('common/footer.php');
```

Pour chaque URL, indiquez quel fichier de `pages/` est inclus :

| URL | Fichier inclus |
| --- | --- |
| `index.php?page=contact` | |
| `index.php?page=admin` | |
| `index.php` | |
| `index.php?page=HOME` | |

### Exercice 7.4 (pratique) Rangez le projet

Voici les fichiers d'un projet, en vrac : `main.css`, `header.php`, `home.php`, `bart.php`, `index.php`, `functions.php`, `logo.png`, `footer.php`.

Dessinez l'arborescence du projet en rangeant chaque fichier au bon endroit (`common/`, `pages/`, `public/`, ou la racine), selon l'organisation vue en cours.

---

## Série 8 : Le passage de paramètres

C'est **le** gros morceau. Prenez le temps sur cette série.

### Exercice 8.1 (collectif) Les URL que vous utilisez tous les jours

Observez ces URL réelles (ou presque) :

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42
https://www.google.com/search?q=bts+sio&hl=fr
https://www.leboncoin.fr/recherche?text=velo&sort=price
```

Pour chaque URL, remplissez le tableau :

| URL | Page (fichier) demandée | Paramètre(s) | Valeur(s) |
| --- | --- | --- | --- |
| youtube 1 | | | |
| youtube 2 | | | |
| google | | | |
| leboncoin | | | |

Questions pour la discussion :

1. YouTube héberge des milliards de vidéos. Combien de fichiers `watch` existe-t-il sur leurs serveurs à votre avis ?
2. À quoi sert le `t=42` dans la deuxième URL ? Que fait le serveur (ou le navigateur) avec ?
3. Sur leboncoin, que se passe-t-il si vous changez `sort=price` en `sort=date` directement dans la barre d'adresse ?

### Exercice 8.2 (pratique) Écrivez les URL

Le site d'un cinéma possède une page `film.php`. Écrivez l'URL complète (partie après le nom de domaine) pour :

1. Afficher le film numéro `12`.
2. Afficher le film numéro `12` en version sous-titrée (`vost` à `oui`).
3. (analyse) Un utilisateur tape `film.php?ID=12` (ID en majuscules). Est-ce que `$_GET['id']` fonctionnera ? Justifiez.

### Exercice 8.3 (analyse) Que contient `$_GET` ?

La page est appelée avec : `fiche.php?nom=Simpson&prenom=Bart`

```php
echo $_GET['prenom'] . " " . $_GET['nom'];
```

1. Qu'affiche ce code ?
2. La page est maintenant appelée avec `fiche.php` tout court. Que se passe-t-il ?
3. (pratique) Réécrivez le code pour qu'il affiche « Visiteur inconnu » quand les paramètres sont absents.

### Exercice 8.4 (pratique) La mini BTS TV

Vous avez le tableau suivant dans `index.php` :

```php
$videos = array("abc123", "def456", "ghi789");
```

1. Écrivez le code qui génère un lien HTML par vidéo, pointant vers `tv.php` avec le bon identifiant en paramètre.
2. (analyse) Votre collègue a écrit `<a href="tv.php?id=abc123">` en dur, 3 fois. Son site fonctionne exactement comme le vôtre. Pourquoi votre version est-elle quand même meilleure ? Donnez deux raisons.

---

## Série 9 : Les formulaires

### Exercice 9.1 (analyse) Anatomie d'un formulaire

```html
<form method="post" action="inscription.php">
  <input type="text" name="pseudo" />
  <input type="password" name="mdp" />
  <input type="submit" value="S'inscrire" />
</form>
```

1. Vers quelle page les données sont-elles envoyées ?
2. Dans quelle superglobale PHP les données arriveront-elles ?
3. Quelles seront les **clés** disponibles dans cette superglobale ?
4. L'attribut `value="S'inscrire"` sert à quoi ?

### Exercice 9.2 (collectif) GET ou POST ?

Le même formulaire est passé en `method="get"`.

1. Après soumission, à quoi ressemble l'URL ? Écrivez-la.
2. Quel est le problème avec le champ `mdp` ? Pensez : historique du navigateur, écran partagé en cours, lien copié / collé…
3. Règle à retenir : pour un formulaire, quelle méthode choisit-on ?

### Exercice 9.3 (pratique) La page de destination

Écrivez le code de `inscription.php` qui :

1. Affiche « Bienvenue » suivi du pseudo si le formulaire a bien été soumis.
2. Affiche « Formulaire incomplet » si le pseudo est absent.

---

## Série 10 : Session et cookies

### Exercice 10.1 (analyse) Le tableau comparatif

Complétez de mémoire :

| | Session | Cookie |
| --- | --- | --- |
| Stocké chez… | | |
| Durée de vie | | |
| Modifiable par l'utilisateur ? | | |
| Exemple d'usage | | |

### Exercice 10.2 (collectif) Session ou cookie ?

Pour chaque besoin, choisissez **session** ou **cookie**, et justifiez :

1. Retenir que l'utilisateur est connecté pendant sa navigation.
2. Retenir le thème sombre choisi par le visiteur, même le mois prochain.
3. Retenir le contenu du panier d'un site marchand.
4. Retenir que le visiteur a déjà fermé le bandeau « cookies ».

Question de discussion : pour le panier, les grands sites marchands utilisent en réalité une troisième solution. Laquelle, à votre avis, et pourquoi ?

### Exercice 10.3 (analyse) Prédisez le comportement

Page `a.php` :

```php
<?php
session_start();
$_SESSION['prenom'] = "Bart";
```

Page `b.php` :

```php
<?php
session_start();
echo $_SESSION['prenom'];
```

1. Le visiteur ouvre `a.php` puis `b.php`. Qu'affiche `b.php` ?
2. Un **autre** visiteur ouvre directement `b.php` sans passer par `a.php`. Que se passe-t-il ?
3. Le développeur supprime la ligne `session_start()` de `b.php`. Que se passe-t-il ?

---

## Série 11 : La sécurité

### Exercice 11.1 (collectif) L'attaque du livre d'or

Votre livre d'or affiche les messages ainsi :

```php
foreach ($_SESSION['messages'] as $message) {
    echo "<p>" . $message . "</p>";
}
```

Un visiteur malveillant saisit ce « message » dans le formulaire :

```
<script>document.location = "http://site-pirate.fr";</script>
```

1. Qu'arrive-t-il à **tous les visiteurs suivants** qui ouvrent la page ?
2. Comment s'appelle cette faille ?
3. Cherchez dans vos souvenirs (ou discutez-en) : quelle fonction PHP permet de neutraliser les balises HTML d'une saisie avant affichage ?

### Exercice 11.2 (collectif) L'include trop confiant

Un étudiant a écrit cet entry-point, **sans whitelist** :

```php
include("pages/" . $_GET['page'] . ".php");
```

Un visiteur appelle : `index.php?page=../../../../etc/passwd%00` ou plus simplement `index.php?page=../config`.

1. Que tente-t-il de faire ?
2. Pourquoi la whitelist (`in_array`) empêche-t-elle complètement cette attaque ?
3. (analyse) « Personne ne connait les noms de mes fichiers, donc je ne risque rien. » Que répondez-vous à cet argument ?

### Exercice 11.3 (collectif) L'injection SQL

Le code de connexion d'un site est le suivant :

```php
$sql = "SELECT * FROM users WHERE login = '" . $_POST['login'] . "'
        AND password = '" . $_POST['password'] . "'";
```

Un attaquant saisit comme login : `admin' --` (et n'importe quoi comme mot de passe).

1. Écrivez la requête SQL **finale** telle qu'elle part vers la base de données (sachant que `--` commence un commentaire en SQL : tout ce qui suit est ignoré).
2. Que se passe-t-il ? L'attaquant connait-il le mot de passe ?
3. Quel mécanisme, vu en cours, rend cette attaque impossible ?

### Exercice 11.4 (analyse) Le champ caché pas si caché

Un site marchand envoie le prix dans le formulaire de commande :

```html
<form method="post" action="payer.php">
  <input type="hidden" name="prix" value="499" />
  <input type="submit" value="Acheter" />
</form>
```

1. Avec l'inspecteur d'éléments, que peut faire un client malhonnête avant de cliquer sur « Acheter » ?
2. Énoncez la règle générale : peut-on faire confiance à une donnée qui vient du client (`$_GET`, `$_POST`, cookie, champ caché) ?
3. Où le prix devrait-il être récupéré ?

### Exercice 11.5 (analyse) La fuite de la base

La base de données d'un site fuite sur Internet. Elle contient la table `users` avec les mots de passe **en clair**.

1. Citez deux conséquences graves pour les utilisateurs (pensez : beaucoup de gens utilisent le même mot de passe partout).
2. Si les mots de passe avaient été stockés avec `password_hash()`, qu'aurait obtenu l'attaquant ?
3. Le site vous envoie votre mot de passe **en clair par email** quand vous cliquez sur « mot de passe oublié ». Qu'est-ce que cela révèle sur leur façon de le stocker ?

---

## Série 12 : Lire un MLD (avant le SQL)

La modélisation se fait sur papier : autant s'entrainer sur papier.

### Exercice 12.1 (analyse) Lire un MLD

| categories | | produits |
| --- | --- | --- |
| <u>#id (int)</u> | | <u>#id (int)</u> |
| nom (varchar) | | nom (varchar) |
| | | prix (float) |
| | | id_categorie (int) |

Les deux tables sont reliées par un trait entre `categories.id` et `produits.id_categorie`.

1. Quelle est la clé primaire de chaque table ?
2. Quelle colonne est une clé étrangère ? Vers quoi pointe-t-elle ?
3. Un produit peut-il appartenir à deux catégories dans ce modèle ? Justifiez.
4. Peut-on supprimer une catégorie qui possède encore des produits ? Qu'est-ce qui décide de la réponse ?

### Exercice 12.2 (collectif) Le modèle qui sent mauvais

Un étudiant a modélisé sa table `produits` ainsi, **sans** table `categories` :

| produits |
| --- |
| <u>#id (int)</u> |
| nom (varchar) |
| prix (float) |
| categorie (varchar) |

Dans sa base, la colonne `categorie` contient : « Écrans », « écran », « Ecrans », « ecrans »…

1. Quel problème voyez-vous arriver quand il voudra afficher « tous les produits de la catégorie Écrans » ?
2. Comment le modèle en deux tables (exercice 12.1) empêche-t-il ce problème par construction ?
3. Énoncez la règle générale : quand faut-il sortir une information dans sa propre table ?

### Exercice 12.3 (pratique) Modélisez

La BTS TV doit stocker : des vidéos (identifiant YouTube, titre) et les utilisateurs de l'administration (login, mot de passe). Chaque vidéo est ajoutée par un utilisateur, et on veut savoir lequel.

Dessinez le MLD : tables, colonnes avec types, clés primaires, clé étrangère. N'oubliez pas la question piège : quel type et quelle taille pour le mot de passe, sachant qu'il sera haché ?

---

## Pour finir (collectif)

Trois questions de synthèse, à débattre :

1. Parmi tout ce que nous avons vu, quelle donnée peut-on considérer comme **fiable** côté serveur : une variable que vous avez écrite dans le code, `$_GET`, `$_POST`, `$_COOKIE`, `$_SESSION` ?
2. Un camarade vous dit « la sécurité, on la fera à la fin du projet ». Donnez un exemple vu dans ces exercices où ce raisonnement coûte cher.
3. Quel est le point commun entre la whitelist de l'entry-point, la requête préparée et `htmlspecialchars()` ?
