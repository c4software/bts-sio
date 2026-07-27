---
description: Nous allons créer une page fictive afin de tester un peu le fonctionnement des sélecteurs.
---

# Une petite mise en bouche

Nous allons créer une page fictive afin de tester un peu le fonctionnement des sélecteurs.

Pour réaliser ce TP nous utiliserons [les ressources disponibles ici](/tp/javascript/support.md#manipuler-le-html-et-la-css)

## Le fichier HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <div id="monId">
      <!-- Ajouter un titre ici en JavaScript -->
    </div>

    <!-- Cacher la div suivante via le JS -->
    <div id="cacheMoi">lorem ipsum…</div>

    <!-- Je souhaite que le texte soit rouge -->
    <div id="redText">Le texte présent ici doit être rouge</div>

    <!-- Ajouter ici un paragraphe (p) en JavaScript-->

    <script>
      // Vous devez écrire votre code JavaScript ici.
    </script>
  </body>
</html>
```

::: tip Hou hou
Les consignes sont présentes dans les commentaires du code fourni. Je vous laisse regarder, et tenter de faire les actions demandées.
:::

::: tip Point de contrôle
Avant de passer à la suite, vous devez savoir :

- Ajouter un élément dans la page en JavaScript.
- Masquer un élément (`style.display` ou une classe CSS).
- Modifier le style d'un élément.

👋 Si vous avez des questions, n'hésitez pas.
:::

La suite ? [Le TP 2 pour manipuler le DOM dans un vrai mini projet](./tp2.md).
