# Des variables en veux tu en voilà !

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

Vérifier que la constante n'est pas écrasée pendant le fonctionnement de votre programme.

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

Maintenant que vous savez poser des questions et afficher des valeurs. Je vous propose de créer une machine à additionner pour ça votre programme doit :

- Demander la première valeur à additionner à l'utilisateur
- Demander la seconde valeur à l'utilisateur
- Réaliser l'opération `variable1 + variable2` et afficher le résultat à l'utilisateur (dans la console ou dans une alerte).

C'est à vous :)

::: tip Astuce
Il est possible en JavaSscript de « changer le type d'une variable ». [Je vous laisse tester](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
:::
