---
description: Dans cette mise en pratique, nous allons voir comment déclarer et utiliser des Interfaces PHP. Les interfaces sont un élément important de la programmation-objet, pour rappel les Interfaces sont un type des classes abstraites (instanciation impossible)
---

# Interface : Mise en pratique 2

Dans cette mise en pratique, nous allons voir comment déclarer et utiliser des Interfaces PHP. Les interfaces sont un élément important de la programmation-objet, pour rappel les Interfaces sont un type des classes abstraites (instanciation impossible), elles vont :

- Va d'écrire un comportement.
- Définir les signatures des méthodes et propriétés
- Garantir au code qui fait l'appel que la méthode existera.

C'est donc un contrat que la classe doit respecter si elle implémente l'interface, si celle-ci implémente une Interface, elle devra forcément avoir l'ensemble des méthodes « décrite » dans l'interface.

## Ressources disponibles :

- [Aide mémoire POO](/cheatsheets/poo/README.md)
- [Aide mémoire POO-UML](/cheatsheets/poo-uml/README.md)
- [Cours POO](/cours/poo.md)

::: tip Définition

Une interface ressemble à une classe abstraite dans laquelle aucune méthode ne serait implémentée.

- Ne contiens que des méthodes publiques.
- Ne contiens aucun code.
- N'est pas instanciable.
- Son « un contrat » que les classes filles devront **implémenter**.

:::
