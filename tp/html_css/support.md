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
- [Via un site ligne](https://www.webfx.com/web-design/color-picker/)
- [Directement sur Google](https://www.google.com/search?q=colorpicker&oq=colorpicker)

### Les images de fonds

Mais votre navigateur ne se limite pas à une simple couleur de fond et du texte… Il permet également d'afficher des images. Nous l'avons vu il est possible d'afficher des images avec la balise `<img />`, mais pas uniquement.

Il est possible également d'afficher des images en CSS. Via la propriété `background-…` ou `background`. La propriété `background` est très puissante et vous nous permettre de « composer » un fond avec énormément de possibilités.

::: tip Ah oui !
Vous allez le voir, il est possible d'appliquer un fond sur « presque » n'importe quels éléments HTML.
:::

#### Définir un fond

#### Régler son comportement

## Formater du texte

### Gras, Italic, Souligné

### Font-Style

### Taille du texte (em, rem, les unités, etc)

### Les alignements

## Placer des éléments

### Les positions

### Le Float

## Décoration / Mise en forme

### Border

### Shadow (les ombres)

## Interactivité

Les pseudo-formats (`:hover`, …)

## Les animations

à voir ?
