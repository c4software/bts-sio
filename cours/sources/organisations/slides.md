# Organiser mon code

## Pour qui ? Pourquoi ? Comment !

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Pour qui

---

- Pour vous
- Pour moi
- Pour vous (du futur)
- Pour vos collègues
- Vos tests

---

### Pour réfléchir

---

![vous](./img/vous.jpeg)

---

### Petit apparté

![moi](./img/code_quality.jpg)

---

## Pourquoi ?

---

- Améliorer la lisibilité.
- Simplifier votre travail.
- Réduire votre charge mentale.

---

### Mais également

---

- S'améliorer.
- Pouvoir tester. <- 🤔
- Pouvoir faire évoluer son code.
- Avoir une meilleure note…

---

Car au final, le but c'est de ne pas être noyé dans son propre code

---

![better](./img/better.gif)

---

## Comment

---

- Découper.
- Modèle.
- DAO.
- Définir (configurations, constantes)
- Réutiliser.
- Code en commentaire 🤔

---

### Découper

- Fonctions d'aide.
- Accessible dans l'ensemble du projet (`/libs/…`, `/helpers/…`).
- Ne pas copier / coller. Découper pour réutiliser.

---

### Penser fonctionnalités pas finalités

---

Avez vous des exemples ?

---

### Modèle

C'est quoi ?

---

Représente votre objet. Intégre les méthodes qui s'implifie sa manipulation.

- Des exemples ?

---

## Pourquoi est-ce important ?

---

Pourquoi dans le cadre d'un developpement en mode API c'est encore plus important ?

---

- Centralise la logique métier.
- Permet les évolutions simplifiés.
- Évite le codes dupliqués.
- Normalise votre code

---

### DAO

- Défini les méthodes qui accède à la données
- Retourne un objet « typé » (un modèle)

---

## Pourquoi est-ce important ?

---

- Permet de tester
- Permet de changer la source de données
- Centralise votre code
- Simplifie les modifications (À votre avis ?)
- Facilite le partage de code

---

[Un exemple](https://gist.github.com/c4software/30947f2a86eb0ab065d26a6ed0edb3e9)

---

### Définir

---

### Fichier regroupant la configuration

À votre avis, que doit-il contenir ?

---

### Les constantes

- Utilité ?

--- 

[Un exemple](https://gist.github.com/c4software/8b5122405b38f4c933d6a4490f45e1ad)

---

Alors ?

---

- Simplifie la lecture du code.
- Centralise les éléments « sensible ».
- Évite le code dubliqués.
- Réduit la charge mentale. (évite la panique !)
- Être quelqu'un de bien.

---

### Réutiliser

- Savoir faire des librairies.
- Savoir faire des fichiers « d'aide ».
- Partager les définitions de méthodes entre client-serveur.

---

### Pourquoi ?

---

## Le but de tout ça (DAO, Modèle, …)

---

### Être prêt pour les modifications de

- L'examen !
- Du Stage !
- De la vie !
- …

---

![mad](./img/mad.gif)

---

### Point bonus

---

## Un code commenté, c'est du code supprimé

---

## Vous utilisez git !

### Le je garde au cas où

---

![nah](./img/nah.gif)

---

# Des questions ?
