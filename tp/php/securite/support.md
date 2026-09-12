---
description: "Les bases de la sécurité du web en PHP : risque, menace, vulnérabilité, validation des données reçues, requêtes préparées, mots de passe hachés et sessions."
---

# Les bases de la sécurité du web : en plus du cours

::: details Sommaire
[[toc]]
:::

Ce complément accompagne le cours [« Les bases de la sécurité du web »](/cours/securite_bases). Il s'adresse à vous, étudiants de première année, au moment où vos projets PHP commencent à ressembler à de vrais sites : des formulaires, une base de données, une connexion.

Ce n'est **pas** un cours de hacking. Vous n'y trouverez pas de quoi attaquer quoi que ce soit. C'est un cours de **bons réflexes** : les quelques gestes qui, appliqués systématiquement, évitent la très grande majorité des problèmes que l'on rencontre sur un site de débutant.

::: warning Un rappel important
Les exemples d'attaque présentés ici ne se testent que sur **votre propre code**, en local. Tester une faille sur un site qui ne vous appartient pas, sans autorisation écrite, est un délit.
:::

La suite (les dix grandes familles de failles, le détail des attaques, les contre-mesures avancées) est au programme de deuxième année, dans la [série de TP sécurité OWASP](/tp/securite/).

## Risque, menace, vulnérabilité

On mélange souvent ces trois mots. Ils désignent pourtant trois choses bien différentes, et c'est en les distinguant qu'on arrive à raisonner correctement.

- **La menace** : ce qui peut vous vouloir du mal. Un robot qui scanne Internet, un curieux qui bidouille l'URL, un concurrent, un ancien collègue. Elle est à l'extérieur, et vous n'avez aucune prise dessus.
- **La vulnérabilité** : la faiblesse dans **votre** code ou votre configuration. Un `$_GET` concaténé dans une requête SQL, un mot de passe stocké en clair, une page d'administration accessible sans vérification. C'est la seule chose sur laquelle vous pouvez agir.
- **Le risque** : la rencontre des deux, pondérée par ce que ça coûterait.

```
risque = probabilité (qu'une menace exploite la vulnérabilité) × impact
```

Voici quelques exemples tirés de vos propres TP :

| Vulnérabilité (votre code) | Menace (l'extérieur) | Risque (probabilité × impact) |
| --- | --- | --- |
| Le message du livre d'or est réaffiché sans `htmlspecialchars` | Un visiteur qui poste `<script>` | Élevé : facile à trouver, et le script s'exécute chez **tous** les visiteurs |
| Le login est concaténé dans la requête SQL | Un robot qui teste `' OR 1=1 --` sur tous les formulaires | Très élevé : automatisable, et ça donne la base entière |
| Les mots de passe des adhérents sont en clair en base | Une fuite, une sauvegarde oubliée sur le serveur | Très élevé : les gens réutilisent leurs mots de passe ailleurs |
| Le générateur de punitions accepte n'importe quelle valeur de `taille` | Un curieux qui met `taille=999999999` | Moyen : la page rame ou plante, mais rien n'est volé |

Vous voyez que la dernière ligne n'a pas du tout le même poids que les autres : la probabilité est la même, mais **l'impact** change tout. C'est exactement ce qui vous permet de décider par quoi commencer quand vous n'avez que deux heures devant vous.

::: tip Les robots n'ont pas de cible
« Qui voudrait attaquer mon petit site de BTS ? » Personne, justement. Et c'est bien ça le problème : l'essentiel du trafic hostile vient de **robots** qui parcourent les adresses IP et les noms de domaine en testant mécaniquement les failles les plus banales. Ils ne savent pas ce qu'est votre site, ils ne cherchent même pas à le savoir. Un serveur fraîchement mis en ligne reçoit ses premières sondes en quelques minutes.
:::

### Les données personnelles et le RGPD

Dès que vous stockez un nom, un email, une adresse, une date de naissance ou une photo, vous manipulez des **données à caractère personnel**, et vous entrez dans le champ du RGPD (Règlement Général sur la Protection des Données). Concrètement, pour vous : on ne collecte que ce dont on a réellement besoin, on ne garde pas les données indéfiniment, on les protège raisonnablement, et une fuite doit être signalée (à la CNIL, et aux personnes concernées quand le risque est élevé). Ce n'est pas un détail administratif : c'est la raison pour laquelle « la base des adhérents de la médiathèque » et « le générateur de punitions » ne se protègent pas avec la même énergie.

## Ne jamais faire confiance aux données reçues

C'est le réflexe numéro un, celui dont découlent presque tous les autres.

### D'où viennent les données ?

Tout ce qui arrive dans votre script depuis l'extérieur est écrit par le visiteur, et un visiteur peut écrire ce qu'il veut :

- `$_GET` : les paramètres de l'URL. Il suffit de modifier la barre d'adresse.
- `$_POST` : les champs du formulaire. On peut enregistrer la page, modifier le HTML, et renvoyer le formulaire.
- `$_COOKIE` : les cookies. Ils sont stockés chez le visiteur, donc modifiables par lui.
- Les en-têtes HTTP (`User-Agent`, `Referer`, …) : envoyés par le client, donc inventables.
- `$_FILES` : le nom, le type annoncé et le contenu d'un fichier envoyé sont fournis par le client.

Retenez la formule : **rien de ce qui vient du client n'est fiable**, même ce que vous croyez avoir imposé vous-même.

::: warning Le contrôle côté client, c'est du confort
```html
<input type="email" name="email" required maxlength="50">
```
`required`, `type="email"`, `maxlength`, et même votre plus beau JavaScript : tout cela sert à **aider l'utilisateur** à ne pas se tromper. Rien de plus. Ces contrôles vivent dans le navigateur, et on peut les désactiver en trois clics (ou simplement ne pas utiliser de navigateur du tout). Un contrôle qui compte est un contrôle **côté serveur**, en PHP.
:::

### Valider à l'entrée

Valider, c'est décider ce que l'on accepte, puis refuser tout le reste. Quelques outils, tous déjà connus :

```php
// La donnée est-elle présente ?
$email = $_POST['email'] ?? '';

// Nettoyer les espaces avant / après
$email = trim($email);

// Un email valide ?
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $erreurs[] = "L'adresse email n'est pas valide.";
}
```

Pour un nombre :

```php
$age = filter_var($_POST['age'] ?? '', FILTER_VALIDATE_INT);

if ($age === false || $age < 0 || $age > 120) {
    $erreurs[] = "L'âge doit être un nombre entre 0 et 120.";
}
```

::: tip Attention au piège du zéro
`filter_var('0', FILTER_VALIDATE_INT)` renvoie l'entier `0`, qui vaut `false` dans un test. Comparez donc **toujours** avec `=== false`, jamais avec un simple `if (!$valeur)`. C'est exactement le même piège qu'avec `strpos()`.
:::

Pour une valeur choisie dans une liste connue, la **whitelist** (liste blanche) reste la méthode la plus solide. Vous l'utilisez déjà dans votre `index.php` :

```php
$whitelist = ['home', 'bart', 'contact'];
$page = $_GET['page'] ?? 'home';

if (!in_array($page, $whitelist)) {
    $page = 'home';
}

require './pages/' . $page . '.php';
```

Sans ce `in_array`, un visiteur qui demande `?page=../../../../etc/passwd` demande à PHP d'inclure un fichier du serveur. Votre entry-point n'est donc pas seulement une astuce d'organisation : c'est une protection.

Enfin, pensez à la longueur. Un champ « prénom » de 4 000 caractères n'est jamais un vrai prénom :

```php
$prenom = trim($_POST['prenom'] ?? '');

if (mb_strlen($prenom) < 2 || mb_strlen($prenom) > 50) {
    $erreurs[] = "Le prénom doit faire entre 2 et 50 caractères.";
}
```

::: tip strlen ou mb_strlen ?
`strlen()` compte les **octets**, `mb_strlen()` compte les **caractères**. Sur la chaîne `héllo`, `strlen()` renvoie 6 et `mb_strlen()` renvoie 5, parce que le `é` est codé sur deux octets en UTF-8. Pour une limite affichée à l'utilisateur, utilisez `mb_strlen()`.
:::

### Échapper à la sortie

Valider ne suffit pas. Un message de livre d'or peut parfaitement être « valide » (du texte, de la bonne longueur) et contenir malgré tout du HTML. Le navigateur, lui, ne fait aucune différence entre le HTML que vous avez écrit et celui qui vient d'un visiteur : il exécute tout.

Le code fautif, celui qu'on écrit tous au début :

```php
<p><?= $message ?></p>
```

Si `$message` vaut `<script>alert(1)</script>`, la page affichée contient :

```html
<p><script>alert(1)</script></p>
```

et le script s'exécute chez **chaque** visiteur de la page. C'est une faille **XSS** (Cross-Site Scripting, « script inter-sites »). Ici une simple alerte, mais le même script peut envoyer le cookie de session du visiteur vers un serveur qui ne vous appartient pas.

La correction tient en une fonction :

```php
<p><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></p>
```

La page affichée contient alors :

```html
<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>
```

Le visiteur lit bien `<script>alert(1)</script>` à l'écran, mais c'est du **texte** : rien ne s'exécute.

::: tip Que se passe-t-il derrière ?
`htmlspecialchars()` remplace les cinq caractères qui ont un sens spécial en HTML : `<` devient `&lt;`, `>` devient `&gt;`, `&` devient `&amp;`, et avec `ENT_QUOTES` les guillemets `"` et `'` deviennent `&quot;` et `&#039;`. Le navigateur les réaffiche tels quels, sans jamais y voir une balise.

Les deux arguments supplémentaires comptent. Sans `ENT_QUOTES`, l'apostrophe n'est pas échappée, et une valeur placée dans un attribut peut encore s'échapper de cet attribut :

```php
// $couleur vaut : " onmouseover="alert(1)
<input value="<?= $couleur ?>">
// donne : <input value="" onmouseover="alert(1)">
```

Prenez l'habitude d'écrire la forme complète : `htmlspecialchars($valeur, ENT_QUOTES, 'UTF-8')`.
:::

::: tip Valider à l'entrée, échapper à la sortie : les deux, toujours
Ce sont deux gestes différents, à deux moments différents, et l'un ne remplace pas l'autre.

- **À l'entrée**, vous décidez si la donnée est acceptable (le bon type, la bonne longueur, dans la bonne liste).
- **À la sortie**, vous la rendez inoffensive pour le support où vous l'écrivez (le HTML avec `htmlspecialchars`, le SQL avec une requête préparée).

On échappe **au moment de l'affichage**, pas au moment de l'enregistrement : la même donnée peut finir dans une page HTML, dans un email ou dans un export CSV, et l'échappement n'est pas le même.
:::

## Les requêtes préparées

Une requête SQL mélange deux choses : du **code** (`SELECT … WHERE login =`) et des **données** (`'bart'`). Tout le problème de l'injection SQL tient dans cette phrase : quand vous collez une saisie utilisateur dans la chaîne de la requête, vous laissez le visiteur écrire du code.

### Le code fautif

```php
$login = $_POST['login'];
$mdp   = $_POST['mot_de_passe'];

$sql = "SELECT * FROM utilisateurs
        WHERE login = '$login' AND mot_de_passe = '$mdp'";

$utilisateur = $pdo->query($sql)->fetch();
```

Ça fonctionne parfaitement avec une saisie normale. C'est bien ce qui rend la faille si fréquente.

Maintenant, imaginons que le visiteur saisisse dans le champ « login » :

```
' OR 1=1 --
```

La chaîne assemblée par PHP devient :

```sql
SELECT * FROM utilisateurs
WHERE login = '' OR 1=1 -- ' AND mot_de_passe = 'nimportequoi'
```

Décortiquons :

1. L'apostrophe de la saisie **ferme** la chaîne `'…'` que vous aviez ouverte.
2. `OR 1=1` est une condition toujours vraie : la clause `WHERE` accepte toutes les lignes.
3. `--` ouvre un commentaire SQL : toute la fin de la requête, dont la vérification du mot de passe, est ignorée.

Résultat : la requête renvoie la première ligne de la table, en général l'administrateur, et votre code le considère comme connecté. Sans mot de passe.

::: warning Ce n'est pas qu'une histoire de connexion
Avec la même technique, on lit une autre table (`UNION SELECT`), on modifie des données, on en supprime. L'injection SQL est en tête des classements de failles depuis vingt ans, et c'est toujours d'actualité.
:::

### La requête préparée

La solution ne consiste pas à filtrer les apostrophes une par une (on y passerait la journée, et on oublierait toujours un cas), mais à **ne plus jamais mélanger** le code et la donnée :

```php
$sql = "SELECT * FROM utilisateurs WHERE login = ? AND mot_de_passe = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$login, $mdp]);

$utilisateur = $stmt->fetch();
```

Avec la même saisie piégée, la requête ne renvoie plus rien : la base cherche très sérieusement un utilisateur dont le login est la chaîne `' OR 1=1 --`, ne le trouve pas, et renvoie `false`.

La version avec des marqueurs **nommés** est souvent plus lisible dès qu'il y a plusieurs paramètres :

```php
$sql = "SELECT * FROM utilisateurs WHERE login = :login AND actif = :actif";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':login' => $login,
    ':actif' => 1,
]);
```

::: tip Que se passe-t-il derrière ?
`prepare()` envoie à la base la **structure** de la requête, avec des trous. Le moteur l'analyse et décide une fois pour toutes de ce qui est du code. `execute()` envoie ensuite les **valeurs**, qui arrivent après l'analyse : elles ne peuvent plus changer le sens de la requête. La valeur ne devient jamais du code, quoi qu'elle contienne.

Corollaire important : un marqueur `?` ne se met **jamais** entre guillemets. On écrit `WHERE login = ?`, pas `WHERE login = '?'`.
:::

::: danger Le faux ami
```php
$sql = "SELECT * FROM utilisateurs WHERE login = '$login'";
$pdo->prepare($sql)->execute();
```
Cette requête est bien « préparée »… mais la saisie a déjà été collée dans la chaîne **avant** l'appel à `prepare()`. Elle ne protège donc de rien. Ce qui protège, ce n'est pas le mot `prepare`, c'est le fait que la valeur voyage séparément, dans `execute()`.
:::

### Le cas du LIKE

Pour une recherche, les `%` font partie de la **valeur**, pas de la requête. On les ajoute donc en PHP :

```php
$sql = "SELECT * FROM livres WHERE titre LIKE :recherche";

$stmt = $pdo->prepare($sql);
$stmt->execute([':recherche' => '%' . $recherche . '%']);
```

Et surtout pas `LIKE '%:recherche%'`, qui ne fonctionne pas : à l'intérieur d'une chaîne SQL, le marqueur n'est plus un marqueur.

### Quand on ne peut pas préparer

Un marqueur ne remplace qu'une **valeur**. Il ne peut pas remplacer un nom de table, un nom de colonne, ni le sens d'un tri. Ce code est donc impossible :

```php
// Ne trie rien du tout
$stmt = $pdo->prepare("SELECT * FROM livres ORDER BY ?");
$stmt->execute(['titre']);
```

Et c'est pire qu'une erreur : il n'y a **aucun** message. Le marqueur est remplacé par la chaîne `'titre'`, donc la base trie par une valeur constante, identique pour toutes les lignes, ce qui revient à ne pas trier. Vous chercheriez le bug longtemps.

La tentation est alors de concaténer, et de recréer la faille. La bonne réponse est la **whitelist**, exactement comme pour `?page=` :

```php
$colonnes = ['titre', 'auteur', 'annee'];
$tri = $_GET['tri'] ?? 'titre';

if (!in_array($tri, $colonnes)) {
    $tri = 'titre';
}

$sens = ($_GET['sens'] ?? 'asc') === 'desc' ? 'DESC' : 'ASC';

$stmt = $pdo->prepare("SELECT * FROM livres ORDER BY $tri $sens");
$stmt->execute();
```

Ici, `$tri` ne peut valoir que l'une des trois chaînes que **vous** avez écrites : ce n'est plus une donnée du visiteur, c'est un choix parmi vos propres valeurs.

Pour les détails de PDO et le reste du SQL, retournez voir [le complément de cours SQL](../sql/support.md#requete-prepare-ou-requete-normal).

## Les mots de passe hachés

### Hacher n'est pas chiffrer

- **Chiffrer** (on dit souvent « crypter », à tort), c'est **réversible** : avec la clé, on retrouve le message d'origine. C'est ce qu'il faut pour un message que le destinataire doit lire.
- **Hacher**, c'est **à sens unique** : on calcule une empreinte de la donnée, et il n'existe aucun moyen de revenir en arrière. Un steak haché ne redevient pas un steak.

Pour un mot de passe, c'est toujours un hachage. Vous n'avez jamais besoin de relire le mot de passe d'un utilisateur : vous avez seulement besoin de vérifier que celui qu'il saisit donne la même empreinte que celle enregistrée. C'est d'ailleurs pour cette raison qu'un site sérieux ne vous renvoie jamais votre mot de passe par email : il ne l'a pas.

### Pourquoi md5 et sha1 ne conviennent plus

Ces fonctions existent toujours en PHP, et vous en trouverez des tonnes d'exemples en ligne. Elles sont pourtant à proscrire pour des mots de passe, pour deux raisons :

- Elles sont **rapides**. Une carte graphique de jeu calcule des milliards de `md5` par seconde : tester un dictionnaire entier de mots de passe courants prend quelques instants.
- Elles sont **sans sel**. `md5('aycaramba')` donne toujours `886e11fbf4dc1bc05753ea1878905ac2`, sur toutes les machines du monde. Il suffit donc de pré-calculer une immense table (une « table arc-en-ciel ») pour retrouver le mot de passe d'origine par simple lecture.

### Le sel et le bcrypt

- Le **sel** (salt) est une valeur aléatoire, différente pour chaque utilisateur, ajoutée au mot de passe avant le hachage. Conséquence : deux personnes qui choisissent le même mot de passe obtiennent deux empreintes différentes, et les tables pré-calculées deviennent inutilisables.
- Le **bcrypt** est un algorithme volontairement **lent**, réglable par un paramètre de **coût**. Augmenter le coût de 1 double le temps de calcul. Pour vous, quelques dizaines de millisecondes à la connexion ne changent rien ; pour l'attaquant qui doit tester des milliards de combinaisons, c'est rédhibitoire.

Bonne nouvelle : vous n'avez rien à implémenter. PHP le fait pour vous.

### password_hash et password_verify

À l'inscription :

```php
$hash = password_hash($_POST['mot_de_passe'], PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO utilisateurs (login, mot_de_passe) VALUES (?, ?)");
$stmt->execute([$login, $hash]);
```

À la connexion :

```php
$stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE login = ?");
$stmt->execute([$login]);
$utilisateur = $stmt->fetch();

if ($utilisateur !== false && password_verify($_POST['mot_de_passe'], $utilisateur['mot_de_passe'])) {
    // Connexion réussie
} else {
    $erreur = "Identifiant ou mot de passe incorrect.";
}
```

Remarquez le déroulé : on cherche l'utilisateur **par son login uniquement**, puis on vérifie le mot de passe en PHP. On ne met jamais le mot de passe dans le `WHERE`, puisque le hash stocké est différent à chaque inscription.

::: tip Anatomie d'un hash
```
$2y$10$uQPEudTRqI9BEGZWJl2aSeSEko3AwrkgsMRKRqwnBtEBQX6zL7dyC
 |   |  |
 |   |  +-- le sel (22 caractères) puis l'empreinte
 |   +----- le coût (10, la valeur par défaut aujourd'hui)
 +--------- l'algorithme (2y = bcrypt)
```
Le tout fait 60 caractères : prévoyez une colonne `VARCHAR(255)`, jamais `VARCHAR(32)`. Le sel est **contenu dans le hash** : vous n'avez aucune colonne supplémentaire à gérer, `password_verify()` sait le retrouver tout seul.

Conséquence amusante à tester : hachez deux fois le même mot de passe, vous obtenez deux chaînes différentes (le sel change). Et pourtant `password_verify()` accepte les deux.
:::

### password_needs_rehash

Les recommandations évoluent : le coût par défaut de PHP augmente au fil des versions. Cette fonction vous permet de mettre à niveau les hashs existants, au moment où l'utilisateur se connecte (c'est le seul instant où vous avez le mot de passe en clair sous la main) :

```php
if (password_verify($saisi, $utilisateur['mot_de_passe'])) {

    if (password_needs_rehash($utilisateur['mot_de_passe'], PASSWORD_DEFAULT)) {
        $nouveau = password_hash($saisi, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("UPDATE utilisateurs SET mot_de_passe = ? WHERE id = ?");
        $stmt->execute([$nouveau, $utilisateur['id']]);
    }

    // Connexion réussie
}
```

::: danger Deux erreurs classiques
1. **Ne jamais écrire un mot de passe dans un log**, ni dans un `var_dump`, ni dans un email de confirmation. Un fichier de log traîne, se copie, se sauvegarde, et finit par être lu.
2. **Un seul message d'erreur à la connexion**, générique : « Identifiant ou mot de passe incorrect ». Si vous distinguez « cet identifiant n'existe pas » et « mot de passe incorrect », vous offrez à l'attaquant la liste de vos comptes valides.
:::

Vous mettrez tout cela en pratique dans le [TP authentification](../sql/tp-authentification.md).

## La session

Une fois l'utilisateur connecté, c'est la session qui le maintient connecté. Deux appels à ne pas oublier.

### À la connexion : régénérer l'identifiant

```php
session_start();

// ... la vérification du mot de passe a réussi

session_regenerate_id(true);

$_SESSION['user_id'] = $utilisateur['id'];
$_SESSION['login']   = $utilisateur['login'];
```

::: tip Pourquoi regénérer ?
Parce qu'une session existe **avant** la connexion : dès la première visite, PHP attribue un identifiant de session, et il est visible dans le cookie du navigateur. Si un attaquant parvient à imposer cet identifiant à sa victime (par un lien piégé, par exemple), il n'a plus qu'à attendre qu'elle se connecte pour se retrouver dans une session authentifiée : c'est la **fixation de session**.

`session_regenerate_id(true)` change l'identifiant au moment de la connexion (et le `true` supprime l'ancien fichier de session) : l'identifiant que l'attaquant connaissait ne vaut plus rien.
:::

### À la déconnexion : tout détruire

```php
session_start();
$_SESSION = [];
session_destroy();

header('location: index.php?page=home');
die();
```

Vider `$_SESSION` puis appeler `session_destroy()` : vider le tableau seul laisserait la session vivante côté serveur.

### Ce qu'on met en session

On y stocke le strict nécessaire pour savoir **qui** est connecté :

```php
$_SESSION['user_id'] = 12;
$_SESSION['login']   = 'bart';
$_SESSION['role']    = 'admin';
```

Et surtout pas le mot de passe, ni même son hash : vous n'en avez aucun besoin après la connexion, et il n'y a pas de raison de le promener. Pour le reste (le nom complet, l'email, les préférences), une requête sur l'`id` vous les redonne à tout moment, et vous êtes sûr d'avoir les valeurs à jour.

Enfin, une session ne dure pas éternellement : par défaut PHP l'abandonne après une vingtaine de minutes d'inactivité. C'est une protection, pas un défaut : sur un poste partagé (une salle de TP, par exemple), une session qui ne se ferme jamais est une porte ouverte.

## Les erreurs et la configuration

### Les erreurs PHP

En **développement**, vous voulez voir les erreurs, et le plus tôt possible :

```ini
display_errors = On
error_reporting = E_ALL
```

En **production**, c'est exactement l'inverse. On enregistre les erreurs dans un fichier, et on n'affiche rien :

```ini
display_errors = Off
log_errors = On
```

::: warning Pourquoi c'est important
Un message d'erreur PHP affiché sur la page, c'est un cadeau pour l'attaquant. Il y lit le chemin complet de vos fichiers sur le serveur, le nom de votre base de données, parfois un extrait de requête SQL avec le nom de vos tables et de vos colonnes. C'est la carte de votre application, offerte gratuitement. Le visiteur, lui, doit voir un message neutre : « Une erreur est survenue, réessayez plus tard ».
:::

### Les identifiants de la base de données

Votre `utils/db.php` contient l'hôte, l'utilisateur et le mot de passe de votre base. Sur XAMPP, ce mot de passe est vide et personne ne s'en émeut. Le jour où votre projet part sur un serveur, puis sur un dépôt Git, c'est une autre histoire : un mot de passe poussé une fois sur un dépôt public y reste, y compris dans l'historique, même si vous le retirez ensuite.

La bonne habitude, dès maintenant : isoler la configuration dans un fichier à part, et ne pas le versionner.

```php
// utils/config.php (ce fichier n'est PAS envoyé sur le dépôt)
$dbHost = 'localhost';
$dbName = 'mediatheque';
$dbUser = 'root';
$dbPass = '';
```

```
# .gitignore
utils/config.php
```

On fournit alors au projet un `utils/config.exemple.php` avec des valeurs bidon, que chacun recopie et adapte chez lui. Et cela vaut pour tous les secrets : clés d'API, jetons, mots de passe d'envoi d'email.

### HTTPS

Dernier point, en une phrase : en HTTP, tout circule en clair sur le réseau (y compris le mot de passe saisi dans votre formulaire et le cookie de session) ; en **HTTPS**, tout est chiffré entre le navigateur et le serveur. Aujourd'hui un certificat est gratuit (Let's Encrypt), il n'y a plus aucune raison de s'en passer.

## La liste de contrôle

À relire avant chaque rendu de projet. Si une case reste vide, vous savez par quoi commencer.

- [ ] Toutes mes requêtes SQL sont **préparées**, aucune saisie n'est concaténée dans une chaîne SQL.
- [ ] Là où je ne peux pas préparer (nom de colonne, sens du tri), j'utilise une **whitelist**.
- [ ] Toute donnée venant d'un visiteur est affichée avec `htmlspecialchars($v, ENT_QUOTES, 'UTF-8')`.
- [ ] Chaque `$_GET` et `$_POST` est **vérifié côté serveur** (présence, type, longueur, valeurs autorisées) avant d'être utilisé.
- [ ] Mon `index.php` valide `?page=` avec `in_array()` sur une liste blanche.
- [ ] Les mots de passe sont stockés avec `password_hash()` et vérifiés avec `password_verify()`, jamais en clair.
- [ ] La colonne du mot de passe est un `VARCHAR(255)`.
- [ ] Le message d'erreur de connexion est **générique**, et aucun mot de passe n'apparaît dans un log ou un `var_dump`.
- [ ] J'appelle `session_regenerate_id(true)` après la connexion et `session_destroy()` à la déconnexion.
- [ ] Les pages protégées vérifient la session **en haut de page**, avant d'afficher quoi que ce soit.
- [ ] Aucun identifiant de base de données n'est présent dans mon dépôt Git.

## Pour aller plus loin

Tout ce qui précède, ce sont les réflexes. La théorie complète vous attend en deuxième année :

- La [série de TP sécurité OWASP](/tp/securite/) : quatre TP progressifs sur les injections SQL, les failles XSS, le contrôle d'accès et l'authentification, avec des bacs à sable pour jouer les attaques dans le navigateur.
- La [synthèse OWASP](/cheatsheets/owasp/) et le [cours sécurité des applications](/cours/securite_applications).
- Le **Top 10 de l'OWASP** : le classement, mis à jour régulièrement, des dix familles de failles les plus répandues dans les applications web, et la référence sur laquelle s'appuient les questions de sécurité de l'examen.

👋 Si vous avez des questions, n'hésitez pas.
