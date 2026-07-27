---
description: "Point étape final de la séquence HTML + CSS : réaliser votre CV, de la maquette Figma jusqu'à la mise en ligne sur Netlify."
---

# Évaluation finale : Mon CV en ligne

::: details Sommaire
[[toc]]
:::

## Introduction

Vous voilà au bout de la séquence HTML + CSS : la structure, la CSS, les boîtes, Flexbox, le responsive, [le maquettage](./maquette.md) et même [les frameworks CSS](./framework_css/introduction.md). Il est temps de tout assembler dans un projet qui vous servira vraiment : **votre CV en ligne**.

C'est le point étape final de la séquence. Il n'y aura pas de procédure pas à pas, à vous de mobiliser vos connaissances. Et cette fois, votre projet finira **réellement en ligne**, accessible au monde entier.

Le sujet est calibré pour une séance de **2 heures** (hors maquette, réalisée pendant [le TP Figma](./maquette.md)), README et rendu compris. Soyez original : c'est votre vitrine, elle peut accompagner vos recherches de stage.

::: tip TP évalué - Barème indicatif (Total 20 points + Bonus)

La réalisation de ce TP sera évaluée de la manière suivante :

- **La maquette (2 points)**
  - Le lien de partage Figma (ou l'export) présent dans le README : **2 points**.
- **Le HTML (3 points)**
  - Page structurée avec les balises sémantiques (`header`, `main`, `section`, `footer`) : **2 points**.
  - Contenu complet : identité, formation, compétences, liens vers vos réseaux (GitHub, LinkedIn…) : **1 point**.
- **La CSS (4 points)**
  - Une charte graphique personnelle et cohérente (couleurs, typographie) : **2 points**.
  - Une mise en page travaillée (Flexbox, cartes, espacements maitrisés) : **2 points**.
- **Le responsive (3 points)**
  - Le CV est agréable à lire du mobile au grand écran : **3 points**.
- **La mise en ligne (3 points)**
  - Le site est accessible en ligne via Netlify, l'URL est dans le README : **3 points**.
- **Qualité (2 points)**
  - Code indenté, fichiers bien organisés (`css/`, `img/`), images optimisées avec `alt` : **2 points**.
- **Le README.md (3 points)**
  - Présent à la racine et complet (voir la section dédiée) : **3 points**.
- **Bonus challenge (2 points)**
  - Le portfolio (voir la fin du sujet).

:::

## Le projet

Vous allez réaliser votre CV, en une page web :

1. **La maquette d'abord :** votre CV doit suivre la maquette réalisée pendant [le TP Figma](./maquette.md) (wireframe, version haute fidélité, déclinaison mobile). Si vous ne l'avez pas terminée, commencez par là.

2. **Le contenu :** votre identité et votre titre, une accroche « à propos », vos formations, vos compétences, vos expériences (stages, projets), et les liens vers vos réseaux.

::: details Coup de pouce : le contenu
Un CV est un document très structuré : chaque rubrique est une `section` avec son titre, les compétences sont une liste, le parcours peut être un tableau ou une liste ordonnée… Vous connaissez la musique : la bonne balise pour le bon sens.
:::

3. **Le design :** libre, et c'est bien ça le plus dur. Soyez original, mais lisible : un recruteur doit trouver l'information en quelques secondes.

::: details Coup de pouce : en manque d'inspiration ?
[CodePen](https://codepen.io/), [Dribbble](https://dribbble.com/search/resume) ou une recherche « CV web design » vous donneront des idées. S'inspirer c'est progresser, copier / coller sans comprendre c'est se pénaliser (et ça se voit).

Vous pouvez réaliser votre CV en CSS « pure » ou avec un framework CSS ([Bootstrap](./bootstrap.md), [Tailwind](./tailwind.md)) : les deux sont acceptés, l'important est la maitrise.
:::

4. **La mise en ligne :** pour l'hébergement je vous propose d'utiliser [Netlify](https://www.netlify.com/) ! C'est parti… « Mets en prod ». Pour rappel, Netlify est un hébergeur qui vous permettra d'héberger très simplement votre site statique.

::: details Coup de pouce : la mise en ligne
Créez un compte Netlify, puis le plus simple : le glisser / déposer de votre dossier de projet sur [app.netlify.com/drop](https://app.netlify.com/drop). Votre site est en ligne en quelques secondes, avec une URL à partager. Pour mettre à jour le site, on redépose le dossier, tout simplement. Plus tard dans l'année, quand nous aurons vu Git, vous découvrirez comment automatiser complètement cette mise en ligne.
:::

::: warning Un CV en ligne est… en ligne
Réfléchissez à ce que vous publiez : pas d'adresse postale complète ni de numéro de téléphone si vous ne le souhaitez pas. Une adresse e-mail et vos réseaux professionnels suffisent.
:::

## Le README.md

Votre projet doit contenir un fichier `README.md` **à la racine**, comme dans toutes les évaluations du parcours. Le contenu attendu est détaillé dans [la première évaluation PHP](/tp/php/eval1.md#le-readme-md), en résumé :

- Le titre du projet et votre nom.
- **L'URL du site en ligne** (Netlify) et **le lien de la maquette Figma**.
- Une courte présentation de vos choix de design (2 ou 3 phrases).
- La liste des fonctionnalités réalisées (et non réalisées, soyez honnête).
- Des captures d'écran desktop et mobile (dans un dossier `docs/`).
- Le challenge : réalisé ou non.

## Le challenge

Vous avez terminé ? Voici le défi bonus :

- Transformer votre CV en **portfolio** : une page supplémentaire présentant vos projets (le blog du fil rouge, la une du journal… vous avez déjà de la matière !), chacun en carte avec image, description et lien.
- La navigation entre les pages doit être cohérente, et le tout responsive évidemment.

## Restitution

Le rendu se fait sur Moodle :

1. **Vérifiez votre site en ligne** : l'URL Netlify doit fonctionner depuis n'importe quel appareil (testez depuis votre téléphone !).
2. **Vérifiez votre projet** : le `README.md` est à la racine, avec l'URL Netlify et le lien de la maquette Figma.
3. **Compressez le dossier complet** de votre projet au format `.zip` et **déposez l'archive dans Moodle**.

::: danger Vérifiez votre archive et votre URL
Une archive incomplète ou une URL Netlify qui ne répond pas = des points en moins bêtement perdus. Décompressez votre zip dans un autre dossier pour vérifier, et ouvrez votre URL en navigation privée **avant** de déposer.
:::

Bravo, vous avez terminé la séquence HTML + CSS ! Vous avez maintenant toutes les bases pour attaquer la suite du parcours : [les TP PHP de base](/pages/categories/les-tp-php-de-base.md), où vos pages vont enfin devenir dynamiques.
