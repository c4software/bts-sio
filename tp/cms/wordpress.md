---
description: Créer un site depuis zéro n'est pas la seule solution, en informatique nous avons également ce que nous appelons des CMS. Un CMS est un outil qui va nous fournir une base de code « Client & Administration »
---

# Installer & Configurer Wordpress

Créer un site depuis zéro n'est pas la seule solution, en informatique nous avons également ce que nous appelons des CMS. Un CMS est un outil qui va nous fournir une base de code « Client & Administration » pour créer un site tel que :

- Un site web.
- Une boutique en ligne.
- Un Blog.

Pour toutes ces situations, vous avez la possibilité d'installer, de configurer, de personnaliser un CMS.

## Introduction

Dans ce document nous allons voir l'installation de Wordpress, sa configuration et sa personnalisation avec des plug-ins.

![](./res/logo.png)

## Installer Wordpress

L'installation de la solution Wordpress est très simple, elle se résume à :

- [Télécharger Wordpress](https://fr.wordpress.org/download/)
- Extraire Wordpress « dans un dossier sur votre serveur Apache » (htdocs)
- Ouvrir votre navigateur afin de configurer le Wordpress fraîchement téléchargé

## Créer la base de données

La première étape va être de créer une base de données « vide ». Celle-ci sera entièrement configurée / remplie par l'installeur de Wordpress.

- [Ouvrir phpMyAdmin](http://localhost/phpmyadmin/)
- Créer une nouvelle base de données nommée `wordpress`

![phpMyAdmin](./res/pma.png)

## Configurer Wordpress

Wordpress intègre une interface « pas à pas » pour configurer votre nouveau CMS. Cette interface va nous permettre de configurer :

![Première étape de l'installation](./res/setup_wp.png)

### Les paramètres de base de données

Nous avons créé une base de données nommée `wordpress`, nous allons donc indiquer ceci à l'installeur de Wordpress :

![Base de données Wordpress](./res/bdd_wp.png)

Si tout se passe bien, vous devez avoir :

![Installation réussie](./res/bdd_wp2.png)

::: tip Lancer l'installation
Pour lancer l'installation, il suffit de cliquer sur « Run the Installation ». À cette étape Wordpress va créer l'ensemble de la base de données.

Soyez curieux ! Je vous invite **fortement** [à regarder les tables créées par Wordpress](http://localhost/phpmyadmin/db_structure.php?server=1&db=wordpress)
:::

### Configurer votre Wordpress

Votre Wordpress est maintenant installé, il nous reste maintenant à spécifier quelques paramètres :

- Le nom du site.
- Le nom et le mot de passe de l'administrateur.
- Votre email « d'administrateur ».
- Si votre Wordpress doit être indexé par les moteurs de recherche.

![Configuration de WP](./res/configuration_wp.png)

Une fois l'installation terminée, vous serez redirigé vers la partie d'administration de Wordpress.

::: tip Et voilà !

Et oui c'est tout ! Votre CMS est maintenant installé. 🥳

![Wordpress c'est ça](./res/wp_main_admin.png)

:::

## Installer un thème

Wordpress intègre un système permettant de télécharger en quelques clics un thème. Vous trouverez ça dans le menu « Apparence ».

Vous pouvez personnaliser le thème dans le menu « Apparence > Personnaliser ».

Testons ensemble, nous allons installer un Thème nommé « Nouveau Blog ».

::: tip Un instant
Chaque thème propose des personnalisations différentes. Donc le choix du thème de départ est plutôt important.
:::

## Installer des plug-ins

Votre Wordpress est maintenant configuré et est prêt à être personnalisé plus en profondeur. Vous pouvez installer des plug-ins qui permettront de le modifier en profondeur afin d'en faire autre chose qu'un simple blog.

Les extensions sont disponibles dans le menu « Extensions ».

Je vous propose d'installer un plug-in « très commun en ce moment » : `Cookie Notice`

## Créer une page

Un site sans page ce n’est pas un site non ? Avec Wordpress, vous pouvez créer très simplement des pages. La création de pages est complètement graphique et vous permet **sans écrire de code** la création de pages simples :

![Création de pages](./res/wp_page.png)

L'éditeur est ce que l'on appelle un WYSIWYG, il vous permettra de rédiger visuellement votre contenu (texte, mais également intégration de contenu provenant d'autres sites). Vous souhaitez ajouter une image ? Un simple Drag&Drop est suffisant. Puissant hein !

✋ Au passage, le thème « Nouveau blog » que nous avons choisi tout à l'heure, nous permet de mettre une « page » en « page d'accueil ». Cette option est disponible dans « Apparence > Personnaliser ».

::: tip Et le responsive ?
Chez Wordpress ils ont également pensé à tout ça. Vous avez la possibilité de « Prévisualiser » votre page sous différents formats.

![Visuel](./res/previsualiser.png)
:::

## Personnaliser le thème

Nous avons installé un thème oui, mais il ne vous convient peut-être pas à 100% ? Vous souhaitez peut-être le modifier pour le transformer légèrement. Pour ça vous avez quatre possibilités :

- Écrire une CSS personnalisée depuis l'interface d'admin.
- Modifier le code source du thème depuis l'interface d'admin **ou** depuis le dossier du thème dans le code source de Wordpress.
- [Créer un thème enfant](https://www.tutowp.fr/comment-creer-un-theme-enfant-sur-wordpress/)
- [Créer votre propre thème from scratch](https://capitainewp.io/formations/developper-theme-wordpress/creer-base-theme-wordpress/)

## Et la maintenance ?

Maintenir un CMS est très important ! En effet un CMS est un développement « complexe », même si les développeurs de Wordpress ont travaillé avec des contraintes de sécurité importantes, un bug / une faille est toujours possible.

C'est dans cet objectif que Wordpress intègre un système automatique et simplifié de mise à jour, il suffit de cliquer sur le bon menu dans l'interface.

::: tip La sécurité avant tout
S'il y a des mises à jour, ce **n’est pas pour vous embêter** mais pour **vous protéger !**
:::
