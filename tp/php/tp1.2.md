---
description: Nous avons vu dans le cours qu'il était possible grace à la fonction PHP « include » d'inclure une page dans une autre. Cette fonction nous permet également d'utiliser des librairies en les incluant dans les différentes pages ou ça est nécessaire.
---

# Utiliser des includes et une librairie

Nous avons vu dans le cours qu'il était possible grace à la fonction PHP `include` d'inclure une page dans une autre. Cette fonction nous permet également d'utiliser des librairies en les incluant dans les différentes pages ou ça est nécessaire.

## Les slides

Avant de commencer, un tour rapide des compétences du jour : l'`include` et la notion de librairie.

<ClientOnly>
<SlidesDeck src="php_tp1_2" />
</ClientOnly>

## Création d'un nouveau projet

Je vous laisse créer un nouveau projet. Ce projet sera constitué pour l'instant de :

- Une page (nommée `index.php`).
- La librairie Bootstrap. [Disponible ici](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- Un header avec dedans une [NavBar](https://getbootstrap.com/docs/5.0/components/navbar/).
- Un Footer (avec l'année actuelle `<?php echo date('Y'); ?>`)

## Utiliser les includes pour l'organisation

En reprenant [les propositions faites dans le cours](/tp/php/support.md#le-code) réorganisez votre code pour le séparer dans différents fichiers.

::: tip Point de contrôle
Avant d'aller plus loin, votre page doit ressembler à ceci : la NavBar en haut, le footer avec l'année en bas, et entre les deux un contenu provisoire.

![Page Bootstrap avec une NavBar sombre « Mon projet », un titre « Bienvenue » et un footer « 2026 Valentin »](./res/tp1.2_projet_depart.png)
:::

## La librairie

J'ai travaillé pour vous ! Je vous propose une super librairie. Celle-ci intègre quelques fonctions (utile ou non) que nous allons pouvoir utiliser dans notre page.

La librairie est <a target="_blank" download="sample.php" href="/demo/php/library/sample.php">disponible ici</a>

Je vous laisse télécharger la librairie et la mettre dans votre projet.

::: tip N'oubliez pas le rangement
Essayer de vous organiser _correctement_, je vous propose de mettre le fichier dans un dossier par exemple `lib`.
:::

## Utiliser la librairie

Pour utiliser la librairie **il suffit** de l'inclure dans la page. Nous avons dans ce projet qu'une seule page, il faut donc écrire _en haut_ de votre fichier `index.php` :

```php
<?php
    include('lib/sample.php');
?>
```

À partir de cette instance, nous avons accès maintenant à l'ensemble des fonctions présent dans le fichier. Mais quelles sont ces fonctions ?

Avant de les découvrir, voici ce que fait cet `include` :

![index.php inclut lib/sample.php, ce qui charge les fonctions sans rien afficher ; ensuite les appels à formatIdentity et getOrDefault exécutent le code de la librairie et leur résultat s'affiche dans la page ; sans l'include, PHP répond « Call to undefined function formatIdentity() »](./res/tp1.2_librairie.svg)

Pour connaitre les fonctions, il n'y a pas de miracle. Il faut lire la documentation ! Celle-ci est <a target="_blank" href="/demo/php/library/phpdoc/build/index.html">disponible ici</a>

::: details Voilà la liste des fonctions disponible

- isChristmas
- daysBeforeChristmas
- isDecember
- getOrDefault
- postOrDefault
- formatIdentity
- mailCountFormat

<a target="_blank" href="/demo/php/library/phpdoc/build/index.html">Voir la documentation complete</a>

:::

## Utiliser les fonctions

Afin de tester les différentes fonctionnalités, je vous propose de réaliser les éléments suivants :

- À gauche dans la Toolbar, afficher votre identité (fonction `formatIdentity`).
- À droite de la Toolbar, afficher un nombre d'emails (fonction `mailCountFormat`).
- Dans votre page, afficher dans une card le nombre de jours avant Noël (fonction `daysBeforeChristmas`).
- Le décompte du nombre de jours ne doit **pas être visible** si nous sommes le jour de Noël
- Votre page doit afficher un fond « sapin de Noël » si nous sommes au mois de décembre.
- Votre page doit afficher un fond « père Noël » si nous sommes le jour de Noël.
- Au **milieu de votre page** afficher une `card`, le contenu de cette `card` doit-être :
  - `Hello $prenom`, la valeur `$prenom` **doit venir** d'un paramètre `GET`.
  - Si aucune valeur n'est présente dans le paramètre `GET` vous devez afficher `world` (fonction `getOrDefault`)
  - Le lien d'accès sera donc `index.php?prenom=Valentin`

::: tip Point de contrôle
Une fois les deux premiers points réalisés, la Toolbar affiche déjà le résultat des fonctions de la librairie :

![NavBar sombre avec à gauche « La personne « Valentin » est agé de 39 ans. » et à droite « Vous avez 10 mails »](./res/tp1.2_toolbar.png)
:::

Voilà à quoi ça va ressembler :

![Sans le paramètre](./res/lib_screen1.png)
![Avec le paramètre](./res/lib_screen2.png)
