# Écrire des API avec Flask

## Introduction

Dans ce TP nous allons créer des API à l’aide de Flask pour notre site web TodoList. Nous allons bien évidement utiliser l’interface que vous avez développé dans le TP 1 VueJS. Ici nous allons recoder la partie « serveur » en python grâce au micro framework Flask.

## Le main.py

Comme dans le premier TP notre code sera intégralement dans un fichier nommé « main.py ». Le fichier va contenir les différentes fonctions pour répondre aux différentes requêtes des clients.

Comme dans le premier TP, avant de commencer à coder nous allons déterminer le nom des fonctions ainsi que le chemin :

| Description           | Chemin | Fonction |
|-----------------------|--------|----------|
| Liste                 |        |          |
| Création              |        |          |
| Marquer comme terminé |        |          |
| Supprimer             |        |          |

Question :

- C’est à vous, Avant de continuer un papier un crayon !

### Solution possible

| Description           | Chemin           | Fonction      |
|-----------------------|------------------|---------------|
| Liste                 | /api/liste       | liste()       |
| Création              | /api/creer       | creer()       |
| Marquer comme terminé | /api/terminer    | terminer()    |
| Supprimer             | /api/suppression | suppression() |

Question :

- À votre avis pourquoi est-ce important de fair ce travail ?
- Quel sont les autres solutions pour répondre à ce genre de soucis ?

### Liste

### Création

### Marquer comme terminé

### Suppression