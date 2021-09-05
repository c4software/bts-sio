# Utiliser la session

Nous avons des informations, mais celle-ci est pour l'instant perdue « à chaque rafraichissement »… C'est dommage d'autant plus qu'en PHP sauvegarder des informations c'est simple comme bonjour.

::: details Sommaire
[[toc]]
:::

## Introduction

En PHP l'usage de la session est transparent, c'est à dire que vous n'avez pas vraiment à vous souciez du fonctionnement de celle-ci tout ce que vous devez retenir c'est que vos valeurs sont disponible dans les tableaux :

- `$_SESSION`
- `$_COOKIE`

::: tip Super-globales ?
C'est deux variables sont des `super-globales` elles sont donc toutes les deux en permanence disponible dans votre code, et sont automatiquement remplies dès le début du chargement de votre page.
:::

La SESSION comme le COOKIE sont donc des variables « un peu magiques » qui vont vous permettre de sauvegarder des données entre chaque chargement de pages. Elles ont chacune un usage propre :

- La session servira pour des données temporaires. Les valeurs de la session sont sauvegardées **sur le serveur** (donc non modifiable par un utilisateur).
- Le cookie servira plus pour de la sauvegarde de données « plus longue durée », mais non sensible. Exemple une préférence d'affichage, ou un identifiant permettant de suivre l'activité d'un utilisateur.

## Sauvegarder dans la session

L'utilisation de la SESSION est transparente, elle ne nécessite que le démarrage de celle-ci **une seule fois** et **au début de votre page** PHP. La fonction à appeler est :

```php
session_start();
```

::: tip C'est tout
À partir de cet instant vous avez maintenant accès à la SESSION de l'utilisateur, si celle-ci n'existait pas elle a été créée pour vous. :cool:
:::

::: warning Oui mais…
Il est également possible d'arrêter la SESSION pour détruire toutes les valeurs enregistrées. Cette opération se fait avec la fonction :

```php
session_destroy();
```

Cette opération est à faire par exemple à la déconnexion de l'utilisateur sur votre site.
:::

Dans le [TP3](./tp3.md) ([Le code du TP3 est disponible ici](/demo/php/bart/bart-form-structure.zip).), nous avions créé un « entry-point ». Ce point d'entrée (qui est une bonne pratique en termes de sécurité ! Pourquoi à votre avis ?) va-nous servir à démarrer la SESSION vous n'aurez comme plus à vous en soucier.

### Démarrer la sesion

Pour ça, dans le fichier `index.php`, ajouter tout en haut, la ligne de code suivante :

```php
session_start();
```

::: tip ATTENTION
Assurez-vous que cette ligne soit toujours la première de votre fichier.
:::

### Utiliser la session

Maintenant que notre SESSION est créée, vous pouvez :

```php
<?php
// Écrire dedans
$phrase = 'Je ne copie pas le code de valentin.';
$_SESSION['phrase'] = $phrase;
?>

<!-- Ou la lire, par exemple -->
<input type='text' value='<?php echo $_SESSION["phrase"]; ?>' name='phrase'>

<!-- Ou plus simplement -->
<input type='text' value='<?= $_SESSION["phrase"]; ?>' name='phrase'>


<?php
// Ou la lire, autre exemple
echo $_SESSION["phrase"];

// Ou faire des opérations algorithmiques, par exemple
if(isset($_SESSION['phrase'])){
    echo "Il y a une session";
} else {
    echo "Il n'y a pas de valeur en session";
}
```

### C'est à vous

Maintenant que nous avons revu les bases de l'utilisation de la session. Je vous propose de modifier le code que nous avons précédemment réalisé. Dans le code que vous avez réalisé / téléchargé nous avions créé un formulaire :

![Formulaire de choix pour le TP Bart](./res/form_bart.png)

Le formulaire est actuellement « non persisté », il est remis à zéro à chaque fois que vous accédez à votre site. C'est dommage… Je vous propose dans un premier temps de le persister via la SESSION.

_Vous devez dans un premier temps définir les variables nécessaires :_

| Variables             | Usage                                         |
| --------------------- | --------------------------------------------- |
| `$_SESSION['phrase']` | Sauvegarde la phrase saisie par l'utilisateur |
| `$_SESSION['count']`  | Sauvegarde le nombre choisi par l'utilisateur |

Maintenant que nous avons les noms de variables. Il faut trouver à quel moment sauvegarder les valeurs ?

Le bon moment est dans la page `bart.php`, cette page contient la logique d'exécution de votre code, il faudra donc dans cette page écrire quelque chose comme :

```php
$_SESSION['phrase'] = $_POST['phrase'];
$_SESSION['count'] = $_POST['count'];
```

La troisième, et dernière étape va être de relire les valeurs enregistrées dans la session afin de les utiliser dans votre formulaire, par exemple, si vous souhaitez afficher la valeur de `$_SESSION['phrase']` dans un `input`:

```php
<input type='text' value='<?php echo $_SESSION["phrase"]; ?>' name='phrase'>
```

::: tip Je vous laisse chercher pour le `select`

Pour le `select` la logique va être un peu similaire. Je vous laisse chercher comment écrire le code permettant de « pré-sélectionner » une option dans un `select`.

- [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)

:::

## Sauvegarder dans un cookie

Le Cookie fonctionne un peu comme la SESSION au détail près que vous enregistrez la valeur non pas sur le serveur, mais sur **le poste de l'utilisateur**. Ce détail _est important_, si vous stockez de l'information sur le poste du client, ça veut dire qu'il est possible pour lui de la modifier (nous allons voir comment ensemble).

L'autre différence entre la SESSION et les Cookies est la durée de vie de celle-ci, un cookie à une durée de vie que vous choisissez ! Ça peut aller de quelques secondes à plusieurs mois. À noter tout de même que le Cookie peut-être supprimé par le client.

Comme pour la session vous pouvez enregistrer ce que vous souhaitez dans un Cookie, cependant les données étant accessible par l'utilisateur je vous conseille de sauvegarder des informations non sensibles telles que :

- Paramétrage d'affichage.
- Identifiant de trekking (uuid).
- Données saisies par l'utilisateur (formulaire par exemple).

Vous l'avez peut-être remarqué, votre modification précédente fonctionne correctement, mais si vous attendez plus de 22 minutes vos données sont quand même perdues. Nous allons résoudre cette problématique en utilisant un Cookie plutôt.

### C'est à vous

Écrire & lire dans un cookie est très simple, tout aussi simple que dans la session. Ici pas de démarrage à faire **c'est automatique** !

```php

// Enregistre une valeur
$value = 'Valeur de test';
setcookie("monCookie", $value);
setcookie("monCookie", $value, time()+3600);  /* expire dans 1 heure */

// Récupération d'un cookie
echo $_COOKIE["monCookie"];

```

Je vous laisse modifier votre code précédent afin d'utiliser des COOKIES plutôt que la SESSION. Cette fois-ci pas d'aide, je vous laisse vous organiser.

## Utiliser la session pour créer une page « Protégé »

Nous avons vu qu'il était possible assez simplement de sauvegarder des informations persistantes entre les rechargements avec une SESSION (ou un Cookie). Je vous propose de réfléchir à l'utilisation de la SESSION pour sauvegarder une authentification.

Nous allons sauvegarder des informations dans celle-ci pour sauvegarder la réussite d'un login utilisateur. Pour ça je vous propose de réaliser une nouvelle page PHP, celle-ci va contenir :

- Un formulaire
- Un message indiquant « Bienvenue EMAIL » si la personne c'est connecté avec le bon « EMAIL & MOT DE PASSE ».

### Créer la page

Bon ici pas d'aide, je pense que vous savez tous créer un fichier `.php`. Je vous laisse le créer (le nom importe peu).

::: tip N'oubliez pas
Votre IDE intègre très certainement un template permettant la création du fichier en automatique. Exemple sous VSCode il suffit de saisir :

`html:5` suivi de la touche `tab`
:::

Dans la page je vous propose de créer un simple formulaire. Pour le formulaire vous pouvez de [vous inspirer de ceux proposés par Bootstrap](https://getbootstrap.com/docs/4.0/components/forms/)

![Exemple de formulaire](./res/form.png)

::: tip GET ou POST ?
À votre avis ? GET ou POST pour notre formulaire ?
:::

### Vérifier l'authentification

Pour vérifier l'authentification, nous allons rester simples (car ici l'objectif est de voir la SESSION rien de plus). Je vous propose de considérer une authentification valide si :

- Email == "admin@exemple.com"
- Mot de passe == "mdp"

Si nous écrivons « l'algo » de notre vérification d'authentification, ça va donner :

```

SI email === "admin@exemple.com" ET mot_de_passe == "mdp" ALORS

    SAUVEGARDER_DANS_LA_SESSION[CONNECTE] = email

FIN SI

```

::: danger Non !
Évidemment nous sommes d'accord **c'est nul** en termes de sécurité ! Vous ne devez JAMAIS « écrire en dur » un login mot de passe dans votre code.

=> À votre avis pourquoi ?
:::

- C'est à vous, je vous laisse écrire le code dans la page que vous avez précédemment créé.

### Afficher le formulaire ou le message

Maintenant que nous avons sauvegardé dans la SESSION le fait que la personne est connectée, je vous propose de conditionner l'affichage du formulaire ; celui-ci ne doit pas être visible si la personne est connectée (vous avez un exemple dans le code un peu plus haut).

Il faudra donc :

- Faire une condition (if) pour vérifier que l'élément est présent en SESSION.
- Si présent => Affichage du message de bienvenue.
- Si non présent => Affichage du formulaire de connexion.

### Gérer la déconnexion

À votre avis, comment allons-nous gérer la déconnexion ?
