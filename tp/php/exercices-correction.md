# Exercices PHP en classe : correction

Document réservé à l'enseignant. Non référencé dans les menus du site. La correction des sujets maison est dans [exercices-maison-correction.md](./exercices-maison-correction.md).

---

## Série 1 : Le client et le serveur

### 1.1 Que reçoit le navigateur ?

1. Le navigateur reçoit uniquement du HTML, le PHP a été exécuté :

```html
<!DOCTYPE html>
<html>
<body>
    <h1>Bonjour</h1>
    <p>Nous sommes le 24/12/2026</p>
</body>
</html>
```

2. Non. Le PHP est exécuté **côté serveur**, seul le résultat est envoyé. Le mot `echo` n'existe pas dans ce que reçoit le client.
3. La date affichée change (25/12/2026). C'est le **serveur** qui a régénéré la page à la nouvelle requête, le fichier `page.php` n'a pas changé.

### 1.2 Vrai ou faux ?

1. **Faux.** Le PHP s'exécute sur le serveur, le navigateur ne reçoit que le résultat.
2. **Faux.** Un fichier `.php` peut ne contenir que du HTML (voire rien).
3. **Faux.** Le serveur ne traite le PHP que dans les fichiers `.php` (configuration standard). Dans un `.html`, les balises arrivent telles quelles chez le client.
4. **Faux.** Le code PHP n'est jamais envoyé au client. (Mais un mot de passe dans le code reste une mauvaise pratique : dépôt Git, partage de code…)

---

## Série 2 : Variables et types

### 2.1 Quel type ?

| Valeur | Type |
| --- | --- |
| `42` | int |
| `"42"` | string (les guillemets font tout) |
| `10.5` | float |
| `true` | boolean |
| `array("a", "b")` | array |
| `"true"` | string |

### 2.2 Suivez la valeur

1. Affiche `5`.
2. `$b` a reçu une **copie** de la valeur de `$a` au moment de l'assignation. Modifier `$a` ensuite ne change pas `$b`.

### 2.3 Concaténer n'est pas calculer

1. `valentinbrosseau` (collés, pas d'espace) puis `valentin brosseau`.
2. `echo strtoupper($nom) . " " . ucfirst($prenom);` (toute réponse approchante est acceptable : l'objectif est qu'ils déduisent le rôle des fonctions depuis leur nom).

---

## Série 3 : Les conditions

### 3.1 Le bug du permis

1. « Vous pouvez passer le permis 2 roues. »
2. Non : à 22 ans on attend le permis voiture.
3. **Jamais.** Tout âge supérieur ou égal à 18 est aussi supérieur ou égal à 14 : la première branche capture tout. Une branche `else if` n'est testée que si les précédentes sont fausses.
4. Correction : tester `>= 18` en premier, puis `>= 14`, puis `else`. (C'est l'ordre des conditions qui compte : du plus restrictif au moins restrictif.)

### 3.2 Le tarif du cinéma

```php
if ($age < 14) {
    echo "Tarif enfant : 5€";
} else if ($age <= 25) {
    echo "Tarif jeune : 7€";
} else {
    echo "Tarif plein : 11€";
}
```

Point de vigilance en correction : le chevauchement des bornes (14 et 25 inclus / exclus).

### 3.3 La ternaire

1. « Bienvenue ».
2.

```php
if ($estConnecte) {
    echo "Bienvenue";
} else {
    echo "Veuillez vous connecter";
}
```

---

## Série 4 : Les boucles

### 4.1 Tracez la boucle

1. `0123fin:4`
2. 4 fois (i = 0, 1, 2, 3).
3. `$i` vaut **4** après la boucle (c'est la valeur qui a rendu la condition fausse).

### 4.2 La boucle qui ne s'arrête jamais

1. `$compteur` n'est jamais modifié dans la boucle : la condition reste vraie pour toujours. Boucle infinie.
2. Le script tourne jusqu'au timeout PHP (30 s par défaut), la page ne répond pas, le serveur consomme du CPU pour rien.
3. Ajouter `$compteur--;` dans le corps de la boucle.

### 4.3 À vous d'écrire

```php
// 1. Compte à rebours
for ($i = 10; $i >= 0; $i--) {
    echo $i;
}

// 2. Table de 7
for ($i = 1; $i <= 10; $i++) {
    echo "7 x " . $i . " = " . (7 * $i);
}

// 3. Nombres pairs
for ($i = 0; $i <= 20; $i++) {
    if ($i % 2 == 0) {
        echo $i;
    }
}
// Variante maligne acceptée : for ($i = 0; $i <= 20; $i = $i + 2)
```

---

## Série 5 : Tableaux et filtrage

### 5.1 Lire un tableau

1. `"Bart"`
2. `false` (10 >= 18 est faux)
3. `8` : les indices commencent à **0**, l'indice 1 est donc le deuxième élément.
4. `3`

### 5.2 Afficher une liste

```php
foreach ($courses as $course) {
    echo "- " . $course . "<br>";
}
```

### 5.3 Le filtrage

```php
// 1. Les majeurs
foreach ($students as $student) {
    if ($student['age'] >= 18) {
        echo $student['prenom'];
    }
}

// 2. Compter les mineurs
$compteur = 0;
foreach ($students as $student) {
    if ($student['age'] < 18) {
        $compteur++;
    }
}
echo $compteur;
```

3. **Non.** La boucle parcourt le tableau quelle que soit sa taille : c'est tout l'intérêt de séparer les données (le tableau) du traitement (la boucle).

---

## Série 6 : Les fonctions

### 6.1 `echo` n'est pas `return`

1. `AB`. Détail : `a()` affiche « A ». `b()` calcule « B » mais ne l'affiche pas (le résultat est perdu). `echo b()` affiche « B ».
2. Après `$x = a();` : `$x` vaut `null` (la fonction n'a pas de `return`)… mais « A » s'est affiché au passage ! Après `$x = b();` : `$x` vaut `"B"`, rien ne s'affiche.
3. `echo` **écrit dans la page**, `return` **renvoie une valeur au code appelant** (stockable, réutilisable). Une fonction bien conçue retourne, et c'est l'appelant qui décide d'afficher.

### 6.2 Tracez l'appel

1. `6` puis `12`.
2. De l'**intérieur vers l'extérieur** : `double(3)` est évalué d'abord (6), puis `double(6)` (12).

### 6.3 Écrivez vos fonctions

```php
function prixTTC($prixHT) {
    return $prixHT * 1.20;
}

function estMajeur($age) {
    return $age >= 18;
}

if (estMajeur($age)) {
    echo "Entrée autorisée";
} else {
    echo "Entrée refusée";
}
```

Points à valoriser : `return $age >= 18;` directement (plutôt que `if ... return true; else return false;`), et l'appel de fonction utilisé comme condition.

### 6.4 Le mystère de la variable invisible

1. `$tva` est définie **hors** de la fonction : à l'intérieur, elle n'existe pas (portée des variables). PHP émet un warning et le calcul est faux.
2. Passer la TVA en paramètre :

```php
function prixTTC($prix, $tva) {
    return $prix + ($prix * $tva / 100);
}

echo prixTTC(100, 20);
```

(Une valeur par défaut `$tva = 20` dans la signature est un plus.)

---

## Série 7 : Les includes et la structure

### 7.1 Qu'affiche la page ?

1.

```html
<header>Mon site</header>
<p>Réalisé par Bart</p>
<footer>© 2026</footer>
```

(L'include de `functions.php` ne produit **aucun** affichage : il ne fait que déclarer la fonction.)

2. Inverser les deux premières lignes : aucun changement visible (déclarer la fonction avant ou après le header n'importe pas, tant que c'est avant son **appel**). Déplacer `functions.php` tout en bas : erreur fatale « Call to undefined function signature() », la fonction est appelée avant d'exister.

### 7.2 Où corriger le bug ?

1. **Un seul** : `common/footer.php`.
2. Le développeur a écrit l'année en dur (`© 2024`) au lieu d'utiliser `date("Y")`.
3. Cinq (un par page). C'est exactement l'argument des includes.

### 7.3 Suivez l'entry-point

| URL | Fichier inclus |
| --- | --- |
| `index.php?page=contact` | `pages/contact.php` |
| `index.php?page=admin` | `pages/home.php` (« admin » n'est pas dans la whitelist) |
| `index.php` | `pages/home.php` (paramètre absent) |
| `index.php?page=HOME` | `pages/home.php` via le `else` (`in_array` est sensible à la casse, « HOME » est rejeté) |

La dernière ligne est le piège : ils doivent justifier par la casse.

### 7.4 Rangez le projet

```
projet/
├── index.php
├── common/
│   ├── header.php
│   ├── footer.php
│   └── functions.php
├── pages/
│   ├── home.php
│   └── bart.php
└── public/
    ├── main.css
    └── logo.png
```

---

## Série 8 : Le passage de paramètres

### 8.1 Les URL que vous utilisez tous les jours

| URL | Page | Paramètre(s) | Valeur(s) |
| --- | --- | --- | --- |
| youtube 1 | `watch` | `v` | `dQw4w9WgXcQ` |
| youtube 2 | `watch` | `v`, `t` | `dQw4w9WgXcQ`, `42` |
| google | `search` | `q`, `hl` | `bts+sio` (le `+` encode l'espace), `fr` |
| leboncoin | `recherche` | `text`, `sort` | `velo`, `price` |

Discussion :

1. **Un seul** (une seule route « watch »). C'est le paramètre `v` qui détermine la vidéo, exactement comme notre `tv.php?id=`.
2. Le temps de démarrage de la lecture (42 secondes). Le serveur envoie la même page, le lecteur exploite le paramètre.
3. Le tri change : les paramètres pilotent le comportement du serveur, et l'utilisateur peut les modifier librement. D'où la règle : ne jamais faire confiance à un paramètre.

### 8.2 Écrivez les URL

1. `film.php?id=12`
2. `film.php?id=12&vost=oui`
3. **Non.** Les clés de `$_GET` sont sensibles à la casse : `ID` et `id` sont deux clés différentes. `$_GET['id']` sera absent.

### 8.3 Que contient `$_GET` ?

1. `Bart Simpson`
2. Les clés `nom` et `prenom` n'existent pas : PHP affiche des warnings (`Undefined array key`) et rien d'utile.
3.

```php
if (isset($_GET['nom']) && isset($_GET['prenom'])) {
    echo $_GET['prenom'] . " " . $_GET['nom'];
} else {
    echo "Visiteur inconnu";
}
```

### 8.4 La mini BTS TV

```php
foreach ($videos as $id) {
    echo "<a href='tv.php?id=" . $id . "'>Vidéo " . $id . "</a>";
}
```

2. Deux raisons attendues (au moins) :
   - **Maintenance** : ajouter une vidéo = une ligne dans le tableau, pas de HTML à dupliquer.
   - **Fiabilité** : pas d'erreur de recopie ; un seul endroit à corriger si le format du lien change.
   - (Bonus : le tableau pourra demain venir d'une base de données sans changer la boucle.)

---

## Série 9 : Les formulaires

### 9.1 Anatomie d'un formulaire

1. Vers `inscription.php` (attribut `action`).
2. `$_POST` (attribut `method="post"`).
3. `pseudo` et `mdp` (les attributs `name`). Le submit `value` n'est pas une clé exploitable ici car il n'a pas de `name`.
4. C'est le texte affiché sur le bouton, rien de plus.

### 9.2 GET ou POST ?

1. `inscription.php?pseudo=bart&mdp=monSuperMotDePasse`
2. Le mot de passe est visible dans la barre d'adresse, enregistré dans l'historique du navigateur, dans les logs du serveur, et copié si on partage le lien.
3. **POST, toujours**, pour un formulaire.

### 9.3 La page de destination

```php
if (isset($_POST['pseudo']) && $_POST['pseudo'] != "") {
    echo "Bienvenue " . $_POST['pseudo'];
} else {
    echo "Formulaire incomplet";
}
```

(Accepter la version avec `isset()` seul ; valoriser ceux qui pensent au champ vide.)

---

## Série 10 : Session et cookies

### 10.1 Le tableau comparatif

| | Session | Cookie |
| --- | --- | --- |
| Stocké chez… | le serveur | le client |
| Durée de vie | la navigation (activité) | la durée choisie (jusqu'à des années) |
| Modifiable par l'utilisateur ? | non | **oui** |
| Exemple d'usage | utilisateur connecté | thème, préférences d'affichage |

### 10.2 Session ou cookie ?

1. **Session** : donnée de confiance, liée à la navigation.
2. **Cookie** : doit survivre à la session, donnée non sensible.
3. **Session** (le client ne doit pas pouvoir modifier les prix / quantités côté stockage). Cookie acceptable pour un panier « confort » non critique, si revalidé côté serveur.
4. **Cookie** : il faut s'en souvenir lors des prochaines visites.

Discussion : la **base de données** (panier lié au compte). Le panier survit au changement d'appareil, et reste sous le contrôle du serveur.

### 10.3 Prédisez le comportement

1. `Bart`. La session est partagée entre les pages du même site pour un même visiteur.
2. Warning `Undefined array key "prenom"` : sa session à lui est vide, chaque visiteur a la sienne.
3. Sans `session_start()`, `$_SESSION` n'est pas alimentée dans `b.php` : même symptôme qu'au 2, même pour le premier visiteur. C'est l'oubli classique à diagnostiquer.

---

## Série 11 : La sécurité

### 11.1 L'attaque du livre d'or

1. Le `<script>` est envoyé tel quel dans la page : le navigateur de **chaque** visiteur l'exécute et est redirigé vers le site pirate.
2. Une **XSS** (Cross-Site Scripting).
3. `htmlspecialchars()` : elle transforme `<` en `&lt;` etc., le script devient du texte inoffensif affiché à l'écran.

### 11.2 L'include trop confiant

1. Faire inclure (donc exécuter ou afficher) un fichier **hors** du dossier `pages/` : fichier de configuration, fichier système… Le `../` remonte dans l'arborescence.
2. Avec `in_array($_GET['page'], $whitelist)`, seules les valeurs **exactes** de la liste passent. `../config` n'y figure pas, il est rejeté avant l'include.
3. La sécurité par l'obscurité n'en est pas une : les noms se devinent (`config.php`, `db.php`…), se trouvent dans les messages d'erreur, sur Git, ou par force brute. On sécurise le mécanisme, pas le secret des noms.

### 11.3 L'injection SQL

1.

```sql
SELECT * FROM users WHERE login = 'admin' --' AND password = '…'
```

2. Le `--` met en commentaire toute la vérification du mot de passe. La requête renvoie l'utilisateur `admin` : l'attaquant est connecté **sans connaitre le mot de passe**.
3. La **requête préparée** : la valeur est transmise séparément de la requête, elle ne peut pas en modifier la structure. Le `'` devient une simple donnée.

### 11.4 Le champ caché pas si caché

1. Modifier la valeur `499` en `1` dans l'inspecteur, puis soumettre : il achète à 1€ si le serveur fait confiance au champ.
2. **Jamais.** Toute donnée venant du client est potentiellement falsifiée (`$_GET`, `$_POST`, cookies, champs cachés, en-têtes…).
3. Côté serveur : le prix se relit depuis la source de confiance (la base de données) à partir de l'identifiant du produit.

### 11.5 La fuite de la base

1. Usurpation des comptes du site, et surtout **credential stuffing** : les mêmes couples email / mot de passe sont testés sur les boites mail, banques, réseaux sociaux des victimes.
2. Des hash inexploitables directement (pas de retour en arrière possible, tester des candidats coûte très cher grâce à l'algorithme volontairement lent de `password_hash()`).
3. Qu'ils stockent le mot de passe **en clair** (ou chiffré réversible) : un hash ne permet pas de renvoyer le mot de passe d'origine. C'est un signal d'alarme connu.

---

## Série 12 : Lire un MLD

### 12.1 Lire un MLD

1. `categories.id` et `produits.id`.
2. `produits.id_categorie`, qui pointe vers `categories.id`.
3. **Non** : `id_categorie` ne peut contenir qu'une seule valeur. Pour du multi-catégories il faudrait une table de liaison (hors programme à ce stade, mais un étudiant qui le devine mérite un bravo).
4. Cela dépend du **comportement défini sur la clé étrangère** : `NO ACTION` (refus), `CASCADE` (les produits partent avec), `SET NULL`… C'est un choix de conception, pas une fatalité.

### 12.2 Le modèle qui sent mauvais

1. Le filtre `WHERE categorie = 'Écrans'` rate « écran », « Ecrans », « ecrans »… Les données incohérentes rendent le filtrage non fiable.
2. La catégorie n'est saisie **qu'une fois**, dans sa table. Les produits ne stockent qu'un identifiant : impossible d'avoir deux orthographes, la cohérence est garantie par la structure (et la clé étrangère).
3. Dès qu'une information est **répétée** sur plusieurs lignes (et qu'elle a une existence propre), elle mérite sa propre table, référencée par une clé étrangère.

### 12.3 Modélisez

Attendu (les noms peuvent varier) :

```
utilisateurs                    videos
--------------                  --------------
#id (int)                       #id (int)
login (varchar 255)             youtube_id (varchar 20)
password (varchar 255)          titre (varchar 255)
                                id_utilisateur (int) → utilisateurs.id
```

Le piège : `password` en `VARCHAR(255)`, car il contiendra un **hash** de `password_hash()` (jamais le mot de passe, et jamais un champ court type varchar(20)).

---

## Pour finir

1. Seules sont fiables : les variables écrites dans le code et `$_SESSION` (stockée côté serveur). `$_GET`, `$_POST` et `$_COOKIE` viennent du client : jamais de confiance.
2. Exemples au choix : le prix en champ caché (11.4), l'include sans whitelist (11.2), l'injection SQL (11.3)… Dans chaque cas, la faille est structurelle : la « rajouter à la fin » signifie réécrire le code.
3. Tous les trois appliquent le même principe : **ne jamais laisser une donnée venant du client être interprétée comme autre chose que de la donnée** (ni comme un chemin de fichier, ni comme du SQL, ni comme du HTML). C'est la validation / neutralisation des entrées.
