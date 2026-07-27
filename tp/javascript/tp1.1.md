---
description: Nous avons vu comment déclarer une balise `script`. Un code sans variable c'est un peu comme une pizza sans olives…
---

# Des variables en veux-tu en voilà !

Nous avons vu comment déclarer une balise `script`. Un code sans variable c'est un peu comme une pizza sans olives…

## Introduction

Nous avons vu dans le cours que les variables pouvaient être de deux types, `variable` et `constante`, dans ce TP nous allons les utiliser.

## Une variable

Modifier le code du [TP précédent](./tp1.md) afin de déclarer une variable :

```javascript
let message = "Bonjour à tous";
```

Utiliser cette variable dans votre alerte.

## Une constante

En utilisant le code suivant :

```javascript
const nom = "Brosseau";

nom = "valentin";
```

Vérifier que la constante n'est pas écrasée pendant le fonctionnement de votre programme. Que voyez-vous dans la console de votre navigateur ?

::: details La réponse
Votre navigateur produit une erreur : `Uncaught TypeError: Assignment to constant variable.`. Une constante ne peut pas être réécrite, c'est tout l'intérêt.
:::

## Poser une question ?

Nous avons vu qu'il était possible de déclarer une variable, mais il est également possible de poser des questions à votre utilisateur. Pour ça nous avons la fonction `prompt`, cette fonction s'utilise comme ça :

```javascript
prompt("Votre âge ?");
```

Cette fonction retourne la valeur saisie par l'utilisateur, vous pouvez donc écrire :

```javascript
let age = prompt("Votre âge ?");
```

### À faire

Écrire le code permettant :

- De demander l'âge à votre utilisateur.
- Afficher la valeur avec une alerte.

## Et si nous allions plus loin ?

Maintenant que vous savez poser des questions et afficher des valeurs. Je vous propose de créer une machine à additionner. Pour ça votre programme doit :

- Demander la première valeur à additionner à l'utilisateur
- Demander la seconde valeur à l'utilisateur
- Réaliser l'opération `variable1 + variable2` et afficher le résultat à l'utilisateur (dans la console ou dans une alerte).

C'est à vous de jouer !

::: tip Astuce
Surpris par le résultat ? `10 + 5` qui donne `105` ? La fonction `prompt` retourne toujours du **texte**, l'opérateur `+` fait donc une concaténation. Il est possible en JavaScript de « changer le type d'une variable » avec [parseInt](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseInt). Je vous laisse tester.
:::

La suite ? [Le TP 1.2 pour découvrir les sélecteurs](./tp1.2.md).
