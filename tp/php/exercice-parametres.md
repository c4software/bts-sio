---
description: "Exercices d'entraînement sur le passage de paramètres du client vers le serveur : liens, formulaires et récupération en PHP. À faire avant les évaluations."
---

# Exercices : le passage de paramètres

Dans ces exercices, nous allons voir (ou revoir) comment passer des paramètres du client vers le serveur. C'est une mécanique que vous avez manipulée dans [le TP passage de paramètres](/tp/php/tp-param.md), et que vous retrouverez partout : dans vos pages PHP, mais aussi plus tard dans les API.

::: details Sommaire
[[toc]]
:::

## Objectifs

À la fin de ces exercices vous saurez :

- Construire une URL avec un ou plusieurs paramètres.
- Choisir la bonne méthode HTTP selon le besoin.
- Récupérer les valeurs côté serveur avec PHP.

## Rappel

Pour passer des paramètres (donc des valeurs) du client vers le serveur, il faut utiliser au minimum la méthode GET ou POST du protocole HTTP.

Mais nous l'avons vu en cours, il est possible d'utiliser l'ensemble des méthodes HTTP :

- GET : pour récupérer des données.
- POST : pour créer des données.
- PUT : pour mettre à jour des données (ou PATCH).
- DELETE : pour supprimer des données.

Techniquement, il est possible de n'utiliser que les méthodes GET et POST, mais il est préférable d'utiliser les méthodes HTTP de manière appropriée (car ça donnera du sens à vos appels réseau et plus globalement à votre application).

::: tip Point sécurité

GET, POST, … sont des méthodes HTTP. Elles ne sont pas sécurisées. Elles ne sont pas faites pour ça. Avec le bon outil, il est possible de modifier les paramètres envoyés par le client.

Il faut oublier l'idée que POST == Invisible et GET == Visible. C'est faux. Vous êtes informaticiens, vous devez savoir que tout est visible et modifiable.

:::

## Exercice 1 : Récupérer des données

Soit la problématique suivante :

> Je souhaite récupérer les informations d'un utilisateur en fonction de son identifiant.

1. Définir puis écrire le lien permettant de récupérer les informations de l'utilisateur ayant l'identifiant `42`.
2. Écrire le code PHP permettant de récupérer l'identifiant de l'utilisateur.

::: details Voir l'une des solutions possibles

```html
http://localhost:8080/api/users?id=42
```

```php
<?php

$id = $_GET['id'];
```

:::

## Exercice 2 : Créer des données

Soit la problématique suivante :

> Je souhaite créer un utilisateur (nom, prénom, email).

1. Définir puis écrire le lien (ou le formulaire) permettant de créer un utilisateur ayant les informations suivantes :
   - nom : `Doe`.
   - prénom : `John`.
   - email : `jdoe@email.com`.
2. Écrire le code PHP permettant de récupérer les données envoyées par le client.

::: details Voir l'une des solutions possibles

Nous créons une donnée, la méthode appropriée est donc POST, avec un formulaire :

```html
<form action="/api/users" method="post">
    <input type="text" name="nom" value="Doe">
    <input type="text" name="prenom" value="John">
    <input type="email" name="email" value="jdoe@email.com">
    <button type="submit">Créer</button>
</form>
```

```php
<?php

$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$email = $_POST['email'];
```

:::

## Exercice 3 : Mettre à jour des données

Soit la problématique suivante :

> Je souhaite mettre à jour un utilisateur (nom, prénom, email), ayant l'identifiant `42`.

Définir puis écrire le lien (ou le formulaire) permettant de mettre à jour un utilisateur ayant les informations suivantes :

- nom : `Doe`.
- prénom : `Jeane`.
- email : `jeane@email.com`.

::: details Voir l'une des solutions possibles

La méthode « idéale » est PUT (mise à jour), mais un formulaire HTML ne connaît que GET et POST. En PHP classique, nous utilisons donc un POST en précisant l'identifiant de la ressource :

```html
<form action="/api/users?id=42" method="post">
    <input type="text" name="nom" value="Doe">
    <input type="text" name="prenom" value="Jeane">
    <input type="email" name="email" value="jeane@email.com">
    <button type="submit">Mettre à jour</button>
</form>
```

```php
<?php

$id = $_GET['id']; // L'identifiant est dans l'URL
$nom = $_POST['nom']; // Les données sont dans le corps de la requête
$prenom = $_POST['prenom'];
$email = $_POST['email'];
```

:::

## Exercice 4 : Créer une pagination

Soit la problématique suivante :

> Je souhaite mettre en place une pagination sur mon site Internet.

1. Définir puis écrire le lien permettant de récupérer la page 3 de la liste des utilisateurs.
2. Écrire le code PHP permettant de récupérer le numéro de la page.

::: details Voir l'une des solutions possibles

```html
http://localhost:8080/api/users?page=3
```

```php
<?php

$page = $_GET['page'];
```

:::

## Exercice 5 : Créer un filtre

Soit la problématique suivante :

> Je souhaite mettre en place un filtre sur mon site Internet. Il doit permettre de filtrer les données en fonction du nom de l'utilisateur.

1. Définir puis écrire le lien permettant de récupérer la liste des utilisateurs ayant pour nom `Doe`.
2. Écrire le code PHP permettant de récupérer le paramètre du filtre.

::: details Voir l'une des solutions possibles

```html
http://localhost:8080/api/users?filter=Doe
```

```php
<?php

$filter = $_GET['filter'];
```

:::

## Exercice 6 : Créer un filtre et une pagination

Soit la problématique suivante :

> Je souhaite mettre en place un filtre et une pagination sur mon site Internet. Il doit permettre de filtrer les données en fonction du nom de l'utilisateur et de récupérer la page 3.

1. Définir puis écrire le lien permettant de récupérer la page 3 de la liste des utilisateurs ayant pour nom `Doe`.
2. Écrire le code PHP permettant de récupérer le paramètre du filtre et le numéro de la page.

::: details Voir l'une des solutions possibles

```html
http://localhost:8080/api/users?filter=Doe&page=3
```

Le premier paramètre est introduit par `?`, les suivants sont séparés par `&`.

```php
<?php

$filter = $_GET['filter'];
$page = $_GET['page'];
```

:::

## Conclusion

Vous savez maintenant :

- Construire une URL avec des paramètres (`?` puis `&`).
- Choisir la méthode HTTP adaptée au besoin (GET, POST, PUT, DELETE).
- Récupérer les valeurs côté serveur (`$_GET`, `$_POST`).

Vous pouvez vous entraîner davantage avec [le quiz en ligne](/moodle/) (thématiques PHP et API REST). Pour la suite, ces notions seront réutilisées dans [le cours sur les API](/cours/introduction_api.md).

👋 Si vous avez des questions, n'hésitez pas.
