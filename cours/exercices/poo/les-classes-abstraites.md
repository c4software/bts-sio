---
description:
---

# Classe abstraite : Mise en pratique

Dans cette mise en pratique, nous allons voir comment déclarer et utiliser des `Classes Abstraites en PHP`. Les classes abstraites sont un élément important de la programmation-objet, pour rappel les classes abstraites ne sont pas instanciable :

- Sers de base à d'autres classes dérivées (héritées).
- Ne peut pas être instanciée (pas de new).
- Permets de factoriser du code.
- Dois être héritée depuis une classe fille.

::: details Sommaire
[[toc]]
:::

## Ressources disponibles :

- [Aide mémoire POO](/cheatsheets/poo/README.md)
- [Aide mémoire POO-UML](/cheatsheets/poo-uml/README.md)
- [Cours POO](/cours/poo.md)

## Mise en situation

![UML](./res/abstract_uml.png)

```php
abstract class EtudiantAbstrait
{
    // Force les classes filles à définir cette méthode
    abstract protected function getSpecificite();
    abstract protected function setSpecificite($valeur);

    // méthode commune
    public function parler() {
        print "Je suis " . $this->getSpecificite() . "\n";
    }
}
```

::: tip Questionnement

- Une classe`abstraite` est définie avec le mot clé :
- Identifier les particularités de la classe `EtudiantAbstrait`
  - **Particularité 1 :**
  - **Particularité 2 :**
  - **Particularité 3 :**
- Selon vous, pourquoi la classe abstraite ne possède-t-elle pas de constructeur ?

::::

## Déclarer les classes

Pour utiliser une classe abstraite, nous allons devoir « **hériter** » de celle-ci avec les mots clés que vous connaissez déjà :

- `extends` en php et en java.
- `:` en C#.

La différence avec un simple héritage, c'est que vous devrez « implémenter » / « écrire » les deux méthodes :

- `getBlahBlah()`
- `demarrerUneDiscussion()`

Et la méthode parler ?

Pour la méthode `parler()` c'est au choix. Vous pouvez :

- La redéfinir dans votre classe pour en changer le comportement.
- Ne pas la redéfinir et bénéficier du comportement de « base de la classe abstraite ».

::: tip Questionnement

- Écrire la définition de la classe pour `EtudiantSIO`.
- Écrire la définition de la classe pour `EtudiantSEN`.
- Quelle différence majeure observez-vous entre la classe abstraite `EtudiantAbstrait` et les classes filles ?

:::

## Utilisation

Je souhaite créer **6 étudiants** (3 SEN et 3 SIO).

Pour les SEN ils doivent avoir les compétences suivantes

- La sécurité.
- La soudure.
- Le réseau.

Pour le SIO ils doivent avoir les options suivantes :

- SLAM
- SISR
- SLAM

Vous placerez ces étudiants dans une liste. Puis pour chacun d'entre eux, vous appellerez la méthode `parler()`.

::: tip Questionnement

- Identifier l'avantage d'une classe abstraite VS un simple héritage.
- Faire évoluer le code pour ajouter le `nom` et le `prenom` de l'étudiant.
  - Quelle(s) classe(s) seront impactées ?
  - Et de quelle manière ?

:::
