# Complément du cours CSS

Ce document est un complément du cours. Il vous permettra de revenir sur les différentes notions avec différents exemples. La CSS est un vaste sujet il serait difficile de tout couvrir dans un simple document.

## Boite à outils

Je ne le répèterai jamais assez, mais vous devez avoir une boite à outils de ressources. Celle-ci vous servira d'inspiration, de technique, mais aussi « de référence ».

- [CodePen](https://codepen.io)
- Les autres sites (Inspecteurs d'éléments, sources …)
- [MDN CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
- [Material.io](https://material.io/design)

Cette liste est bien évidemment non exhaustive.

## Fonds et couleurs

Il faut imaginer votre navigateur un peu comme Word (ou Libre Office Writter), c'est-à-dire un logiciel capable de faire de la mise en forme « d'éléments ». Dans le cas du navigateur nous n'avons pas d'interface graphique pour le faire, nous avons seulement du code.

La base de la personnalisation c'est les « couleurs » et les images de fonds.

### Les couleurs

Pour les couleurs, c'est relativement simple. Nous avons trois solutions :

- Une [des 140 couleurs disponibles](https://www.w3schools.com/cssref/css_colors.asp).
- Via le code hexadécimal d'une couleur.
- Via la notation RGB (ou RGBA avec de la transparence).

La notation hexadécimale est quelque chose de massivement utilisé dans le monde de l'informatique (et du design) pour représenter les couleurs. Cette notation offre un choix très large de couleurs avec la possibilité de réaliser de la transparence (appelée alpha).

Une couleur « Hex » est représentée comme ça :

![Couleur Hexa](/cours/sources/introduction_css/res/hex-reading.png)

Vous pouvez l'écrire à la main… C'est une question d'habitude! Mais le plus simple est de passer par un logiciel qui possède un « colorimètre » (un Color Picker en anglais) :

- Gimp
- Photoshop
- [Via un site en ligne](https://www.webfx.com/web-design/color-picker/)
- [Directement sur Google](https://www.google.com/search?q=colorpicker&oq=colorpicker)

### Les images de fonds

Mais votre navigateur ne se limite pas à une simple couleur de fond et du texte… Il permet également d'afficher des images. Nous l'avons vu il est possible d'afficher des images avec la balise `<img />`, mais pas uniquement.

Il est possible également d'afficher des images en CSS. Via la propriété `background-…` ou `background`. La propriété `background` est très puissante et vous nous permettre de « composer » un fond avec énormément de possibilités.

::: tip Ah oui !
Vous allez le voir, il est possible d'appliquer un fond sur « presque » n'importe quels éléments HTML. (div, h1, p, body, …)
:::

#### Définir un fond

Mettre un fond à un élément en HTML s'effectue avec la propriété `background-image`. Celle-ci accepte plusieurs formats d'image cette liste dépend de votre navigateur, mais à minima vous pouvez mettre :

- png
- jpeg
- gif

Une fois votre fichier « au bon format » il vous suffit de spécifier le lien de celui-ci avec la syntaxe suivante :

```css
.monElement {
  background-image: url("lien-vers-votre-image.png");
}
```

::: danger Attention
De base, le fond se répète à l'infini dans toutes les directions.

_Exemple avec le logo du Greta :_
![Fond répétition](/cours/sources/introduction_css/res/logo_repeat.png)
:::

#### Régler son comportement

Comme vous avez pu le constater, nous avons pour l'instant un fond qui se répète dans toute les directions. Dans certains cas c'est pratique, par exemple un fond de site qui va se répéter à l'infini pour créer un « pattern ». Mais dans certains cas nous ne voulons pas forcément de répétitions.

Nous avons donc la liste suivante :

| Propriété             | Valeurs                                      |
| --------------------- | -------------------------------------------- |
| background-attachment | fixed, scroll                                |
| background-repeat     | no-repeat, repeat-x, repeat-y, repeat        |
| background-position   | en pixel, ou top, bottom, left, right center |

`background-repeat` vas nous permettre de choisir le comportement de répétitions du fond. Cette propriété permet de définir une non-répétition avec `no-repeat`, mais également d'autres options comme une répétition seulement en `x` ou seulement en `y`.

`background-attachment` permet de choisir comment le fond va se comporter lors du scroll. Par défaut votre fond `scroll` quand vous vous descendez dans la page. Mais vous pouvez également choisir « d'ancrer » le fond pour que celui-ci soit toujours visible.

`background-position` permet de choisir la position de notre fond, celle-ci peut-être exprimé en pixel ou en « anglais » avec `top`, `bottom`, `left`, `right` ou encore `center`. Avec cette propriété vous allez pouvoir placer finement votre fond, avec une notation X,Y exemple :

```css
.monElement {
  background-image: url("lien-vers-votre-image.png");
  background-position: bottom left;
}

/* ou encore */
body {
  background-image: url("lien-vers-votre-image.png");
  background-position: center;
}
```

::: tip Exemple

L'ensemble des propriétés est combinable afin d'afficher le fond **tel que vous le souhaitez**

```css
body {
  background-image: url("greta.png");
  background-attachment: fixed; /* Le Logo sera fixe */
  background-repeat: no-repeat; /* Le logo ne sera pas répété */
  background-position: center; /* Le logo sera centré */
}
```

_En reprenant le logo du greta comme exemple :_

![Fond sans répétition](/cours/sources/introduction_css/res/logo_center.png)

:::

#### La « short-hand »

Comme vous pouvez le voir, rapidement « ça va être verbeux », en CSS vous pouvez combiner l'ensemble des propriétés via une notation appelée « short-hand » :

```css
background: url("greta.png") fixed no-repeat center;
```

::: tip Astuce de pro
Ne vous inquiétez pas, votre IDE (éditeur de code) vous proposera très certainement de simplifier votre CSS.
:::

## Formater du texte

Comme je vous le disais précédemment, votre navigateur est un vrai « Word », vous pouvez également mettre en forme votre texte comme bon vous semble.

| Propriété       | Usage                              | Valeurs                                                       |
| --------------- | ---------------------------------- | ------------------------------------------------------------- |
| font-weight     | Indique « le gras de votre texte » | 100 à 900 (ou bold, bolder, light, lighter, normal)           |
| font-style      | Style de votre texte               | normal, italic                                                |
| text-decoration | Décoration de votre police         | underline, line-through                                       |
| font-size       | Défini la taille de votre texte    | Taille absolue _ou_ relative (px, em ou anglais)              |
| color           | La couleur de votre texte          | Couleur en hexa, Anglais ou RGB (comme les fond donc)         |
| text-align      | Position de votre texte            | Positionnement de votre texte (left, right, center, justify…) |

### Taille du texte (absolue ou relative ?)

En CSS nous avons deux possibilités pour la taille de la police.

- Absolue
- Relative

#### Absolue

Si vous choisissez de définir votre taille de texte en valeur absolue, vous devez indiquer votre taille en `pixel` avec la notation px. Cette notation doit être utilisée avec la plus grande des précautions en effet, en fonction de l'écran (densité de pixels) le texte peut apparaitre trop petit.

```css
.element {
  font-size: 18px;
}
```

::: tip À savoir
Les `px` ne sont pas la seule unité disponible vous pouvez également définir la taille en `cm` ou en `mm`. Cependant comme vous l'imaginez ces unités ne sont pas vraiment « adaptées pour un écran d'ordinateur ».
:::

#### Relative

La notation relative est clairement la notation à privilégier, celle-ci utilise une notation en `em` (ou `rem`) elle permet de définir une taille de texte qui changera proportionnellement à la densité de pixel de l'écran de la personne qui visite votre site 👌.

::: tip À savoir
`em`, `rem` ? Kézako ? La notation `em` est relative au parent. La notation `rem` est basée à la racine de votre document. Concrètement ça veut dire que votre taille sera relative au parent ou non.
:::

### Gras, Italic, Souligné

Dans notre « traitement de texte » sans interface, nous avons également la possibilité de définir le style de notre texte. Pour ça nous utiliserons les propriétés suivantes :

- font-weight
- font-style
- text-decoration

`font-weight` permet de définir « le niveau de gras » de votre police. Vous pouvez définir cette valeur en chiffre en utilisant la notation de 100 à 900 ou via une notation relative en anglais bold, bolder, light, lighter, normal.

`font-style` nous permet d'indiquer le style de la police à savoir `italic` ou `normal`.

`font-decoration` nous permet de « décorer » votre texte. Concrètement ça veut dire si celui-ci sera souligné ou barré par exemple.

::: tip Astuce de pro
Votre navigateur vous propose une interface de développement puissante vous permettant de voir les valeurs possibles pour chaque propriété. C'est disponible dans votre inspecteur d'éléments.
![Inspecteur d'éléments](./res/inspect.png)
:::

### Les alignements

Je vais me répéter, mais comme dans « word » vous pouvez en CSS placer votre texte. Pour ça nous utiliserons la propriété `text-align`. Celle-ci peut prendre les valeurs suivantes :

- left
- right
- center
- justify

Je ne m'étale pas sur le sujet les valeurs parlent d'elles-mêmes.

## Placer des éléments

### Les positions

### Le Float

## Décoration / Mise en forme

### Border

### Shadow (les ombres)

## Interactivité

Les pseudo-formats (`:hover`, …)

## Le responsive

## Les animations

à voir ?
