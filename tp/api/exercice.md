# Exercices passage de paramètres

Dans ce document, nous allons voir (ou revoir) comment passer des paramètres du client vers le serveur.

## Introduction

Pour passer des paramètres (donc des valeurs) du client vers le serveur, il faut utiliser au minimum la méthode GET ou POST du protocole HTTP.

Mais nous l'avons vu en cours, il est possible d'utiliser l'ensemble des méthodes HTTP :

- GET : pour récupérer des données
- POST : pour créer des données
- PUT : pour mettre à jour des données (ou PATCH)
- DELETE : pour supprimer des données

Techniquement, il est possible de n'utiliser que les méthodes GET et POST, mais il est préférable d'utiliser les méthodes HTTP de manière appropriée (car ça donnera du sens à vos appels réseau et plus globalement à votre application).

::: tip Point sécurité

GET, POST, … sont des méthodes HTTP. Elles ne sont pas sécurisées. Elles ne sont pas faites pour ça. Avec le bon outil, il est possible de modifier les paramètres envoyés par le client. 

Il faut oubliez l'idée que POST == Invisible et GET == Visible. C'est faux. Vous êtes informaticiens, vous devez savoir que tout est visible et modifiable.

:::

## Exercice : Récupérer des données

Soit la problématique suivante :

> Je souhaite récupérer les informations d'un utilisateur en fonction de son identifiant.

Définir puis écrire le lien permettant de récupérer les informations de l'utilisateur ayant l'identifiant `42`.

Écrire le code PHP permettant de récupérer l'identifiant de l'utilisateur.

::: details Solution

```html
http://localhost:8080/api/users?id=42
```

```php
<?php

$id = $_GET['id'];
```

:::

## Exercice : Créer des données

Soit la problématique suivante :

> Je souhaite créer un utilisateur (nom, prénom, email).

Définir puis écrire le lien (ou le formulaire) permettant de créer un utilisateur ayant les informations suivantes :

- nom : `Doe`.
- prénom : `John`.
- email : `jdoe@email.com`.

Écrire le code PHP permettant de récupérer les données envoyées par le client.

## Exercice : Mettre à jour des données

Soit la problématique suivante :

> Je souhaite mettre à jour un utilisateur (nom, prénom, email), ayant l'identifiant `42`.

Définir puis écrire le lien (ou le formulaire) permettant de mettre à jour un utilisateur ayant les informations suivantes :

- nom : `Doe`
- prénom : `Jeane`
- email : `jeane@email.com`

## Exercice : Créer une pagination

Soit la problématique suivante :

> Je souhaite mettre en place une pagination sur mon site Internet.

Définir puis écrire le lien permettant de récupérer la page 3 de la liste des utilisateurs.

Écrire le code PHP permettant de récupérer le numéro de la page.

::: details Solution

```html
http://localhost:8080/api/users?page=3
```

```php
<?php

$page = $_GET['page'];
```

:::

## Exercice : Créer un filtre

Soit la problématique suivante :

> Je souhaite mettre en place un filtre sur mon site Internet. Il doit permettre de filtrer les données en fonction du nom de l'utilisateur.

Définir puis écrire le lien permettant de récupérer la liste des utilisateurs ayant pour nom `Doe`.

Écrire le code PHP permettant de récupérer le paramètre du filtre.

::: details Solution

```html
http://localhost:8080/api/users?filter=Doe
```

```php
<?php

$filter = $_GET['filter'];
```

:::

## Exercice : Créer un filtre et une pagination

Soit la problématique suivante :

> Je souhaite mettre en place un filtre et une pagination sur mon site Internet. Il doit permettre de filtrer les données en fonction du nom de l'utilisateur et de récupérer la page 3.

Définir puis écrire le lien permettant de récupérer la page 3 de la liste des utilisateurs ayant pour nom `Doe`.

Écrire le code PHP permettant de récupérer le paramètre du filtre et le numéro de la page.

::: details Solution

```html
http://localhost:8080/api/users?filter=Doe&page=3
```

```php
<?php

$filter = $_GET['filter'];
$page = $_GET['page'];
```

:::