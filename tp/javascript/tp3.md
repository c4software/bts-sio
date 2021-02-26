# Contrôle de saisie & intéractivité

Le JavaScript, comme je l'indiquai en introduction, est partout. Pour l'instant, nous allons le limiter principalement aux interactions utilisateurs (contrôle de saisie, validation de formulaire, interactivité).

Nous allons pratiquer les évènements JavaScript en ajoutant à notre TP Bart ([Version JavaScript](/tp/php/tp2.md)) un simple formulaire puis des contrôles de saisie.

L'objectif étant donc d'ajouter des contrôles de saisie sur votre page formulaire.

Deux solutions sont possibles coder nous même, ou faire confiance à une librairie « provenant d'Internet ».

## Ajouter le formulaire sur votre page

La première étape vas être d'ajouter dans la page un formulaire HTML doit ressembler à :

![Formulaire BART](./res/bart-form.png)

Je vais laisse écrire le code _et le style_ du formulaire en question. Quelques règles :

- Vous pouvez ajouter bootstrap si vous souhaitez.
- Vous devez utiliser un « form »
- Vous devez externaliser la CSS.
- Votre formulaire doit être avant le tableau.

## La validation sans Librairie

Ajouter des contrôles, finalement c'est simple. Il « faut juste » :

- Ajouter un évènement « onSubmit ».
- Vérifier que les champs `input` ne sont pas vide (ou du moins, possède les valeurs attendues).

En pratique ça va donner :

```javascript
function validateForm() {
  const name = document.getElementById("name");
  const password = document.getElementById("password");

  if (name == null || name == "") {
    alert("Name can't be blank");
    return false;
  } else if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  // Cas de réussite
}

document
  .getElementById("monForm")
  .addEventListener("submit", validateForm, true);
```

::: tip Un Instant !
`return false` ? Et oui, c'est aussi simple que ça ! En JS si vous souhaitez stopper la soumissions d'un formulaire il suffit que votre fonction de validation retourne `false`. Votre navigateur sera automatiquement qu'il doit arrêter imédiatement la soumission du formulaire. Votre _serveur ne recevra donc **pas**_ les données.
:::

### À faire

- Je vous laisse le mettre en place dans votre code.
- Rendre la page interactive avec les données saisies.
- Je vous laisse écrire la même chose avec jQuery.

## Avec une Librairie

Nous avons vu la façon manuelle de valider les formulaires. Je pense que sans vous faire un dessin… vous vous rendez compte que si nous avons 200 champs; ça va être plus compliqué ! D'autant plus que plus notre formulaire sera complexe plus celui-ci aura des règles complexes.

Heureusement des gens ont déjà pensé à ce genre de problématique pour vous… Je vous propose d'utiliser :

- [jQuery Validation](https://github.com/jquery-validation/jquery-validation)

::: warning C'est un plug-in parmi tant d'autres
Ce plug-in est juste « un permis d'autre », comme toujours utilisé celui le plus adapté à votre problématique.

Par exemple quand nous ferons du VueJS, **il ne faudra plus utiliser jQuery** !
:::

### À faire

Réécrire votre code précédent pour implémenter une validation via jQuery Validation.
