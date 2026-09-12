---
aside: false
description: "Le portail de tout ce qui touche au web dans les supports : les parcours dans l'ordre, les cours, les compléments, les aide-mémoire, les TP, les évaluations et les jeux."
---

# Le Web

Le développement web est un domaine très vaste, et il occupe une bonne partie des supports de ce site. Cette page est votre point d'entrée : tout ce qui touche au web y est référencé, du HTML au déploiement d'une application Laravel, en passant par PHP, la base de données, JavaScript, VueJS, les API et la sécurité.

::: tip Comment lire cette page
Si vous suivez les cours, la section « Les parcours » vous donne l'ordre conseillé. Le reste de la page est un annuaire : vous y retrouverez rapidement un cours, un complément, un aide-mémoire ou un TP précis.
:::

## Les parcours

Les parcours sont des pages qui listent les TP **dans l'ordre** dans lequel je vous conseille de les faire, avec les points étapes évalués. Ils s'enchaînent :

1. [Les fondamentaux du web](/pages/categories/les-fondamentaux-du-web.md) : HTML, CSS, la mise en page, la maquette, un premier site en ligne.
2. [Les TP PHP de base](/pages/categories/les-tp-php-de-base.md) : PHP, les formulaires et la base de données dès le début, la session, l'authentification, l'organisation du code, puis les premières classes (POO).
3. [Les TP PHP avancés](/pages/categories/les-tp-php-avances.md) : le MVC, puis Laravel jusqu'aux API et au déploiement.
4. [Les TP JavaScript](/pages/categories/les-tp-javascript.md) : le JavaScript dans le navigateur, le DOM, l'Ajax, puis VueJS.
5. [La sécurité OWASP](/pages/categories/securite-owasp.md) : les failles les plus courantes, comment les reconnaître et les corriger.

Et en transversal, quel que soit le parcours : [le versionning avec Git et GitLab](/tp/git_initiation/), utilisé pour tous les rendus.

## Le poste de travail

- [Installer un environnement de développement web](/cheatsheets/web/index.md) (Windows, Linux, macOS) : éditeur, PHP, XAMPP ou WAMP, Git.
- [Initiation à Git](/tp/git_initiation/) et [utiliser GitLab](/tp/gitlab/), avec [l'aide-mémoire Git](/cheatsheets/git/).

## HTML et CSS

- Les slides : [introduction HTML et CSS](/cours/introduction_html_css.md).
- Les compléments : [le mémo HTML](/cheatsheets/html/) et [le complément CSS](/tp/html_css/support.md).
- [Les frameworks CSS](/tp/html_css/framework_css/introduction.md), avec [Bootstrap](/tp/html_css/bootstrap.md) et [Tailwind](/tp/html_css/tailwind.md).
- [Maquetter un site avec Figma](/tp/html_css/maquette.md).
- Les TP et les évaluations : dans [le parcours des fondamentaux du web](/pages/categories/les-fondamentaux-du-web.md).

## PHP et la base de données

- Les slides : [introduction PHP](/cours/introduction_php.md), [la structure entry-point](/cours/php_structure.md), [PHP et la base de données](/cours/introduction_sql_php.md), [les bases de la sécurité du web](/cours/securite_bases.md), [PHP et la POO](/cours/php_poo.md), [l'organisation du code](/cours/organisations.md).
- Les compléments : [le complément PHP](/tp/php/support.md), [le complément PHP et base de données](/tp/php/sql/support.md), [le complément sécurité](/tp/php/securite/support.md), [le complément PHP et POO](/tp/php/poo/support.md).
- Les aide-mémoire : [PHP](/cheatsheets/php/), [SQL](/cheatsheets/sql/), [la POO](/cheatsheets/poo/), [la modélisation UML](/cheatsheets/poo-uml/).
- Les exercices : [en classe](/tp/php/exercices.md) et [à la maison](/tp/php/exercices-maison.md).
- Les TP, les TP de création et les évaluations : dans [le parcours des TP PHP de base](/pages/categories/les-tp-php-de-base.md).
- Les jeux bonus : [l'enquête PHP](/jeux/enquete-php.md) (algorithmes) et [l'enquête SQL](/jeux/enquete-sql.md) (requêtes).

## Le MVC et Laravel

- Les slides : [rappels PHP](/cours/php_rappels.md), [le design pattern MVC](/cours/mvc.md), [Laravel](/cours/laravel.md).
- Les compléments : [le support MVC](/tp/mvc/support.md), [le support Laravel](/tp/laravel/support.md).
- Les aide-mémoire : [Mini MVC Sample](/cheatsheets/mini-mvc-sample/), [Laravel](/cheatsheets/laravel/), [les commandes Laravel](/cheatsheets/laravel/quick.md).
- Les TP, du MVC pédagogique au déploiement : dans [le parcours des TP PHP avancés](/pages/categories/les-tp-php-avances.md).
- Le déploiement : [déployer un site Laravel](/tp/ops/deployer-laravel.md), [avec l'intégration continue](/tp/ops/deployer-laravel-ci.md), [avec Docker](/tp/ops/deployer-laravel-docker.md).

## JavaScript et VueJS

- Les slides : [introduction JavaScript](/cours/introduction_javascript.md), [JavaScript avancé](/cours/javascript_avances.md), [les frameworks JavaScript](/cours/framework_javascript.md), [VueJS](/cours/vuejs.md), [les composants](/cours/composants.md), [NodeJS](/cours/nodejs.md), [TypeScript](/cours/typescript.md).
- Les compléments : [le complément JavaScript](/tp/javascript/support.md), [prise en main du JavaScript avancé](/tp/javascript_avances/introduction.md).
- Les aide-mémoire : [JavaScript et Ajax](/cheatsheets/javascript/), [VueJS](/cheatsheets/vuejs/), [VueJS 3](/cheatsheets/vuejs3/).
- Les TP : dans [le parcours des TP JavaScript](/pages/categories/les-tp-javascript.md), puis [les composants avec VueJS 3](/tp/composants/vuejs.md), [HTMX](/tp/javascript/htmx.md) et [Larablog 2.0 (Ajax et VueJS)](/tp/javascript/tp6.md).

## Les API

- Les slides : [introduction aux API](/cours/introduction_api.md), [Python](/cours/python.md).
- L'aide-mémoire : [les API](/cheatsheets/api/).
- S'entraîner : [le passage de paramètres](/tp/php/exercice-parametres.md).
- Créer des API : [avec Laravel](/tp/laravel/api_produit.md), [avec Flask (Python)](/tp/python/flask_todolist_api.md), [avec Bun.sh et ExpressJS (TypeScript)](/tp/typescript/api.md).
- Consommer des API : [depuis le JavaScript](/tp/javascript/tp4.md), [depuis VueJS 3](/tp/vuejs3/application.md).

## La sécurité

- Dès la première année : [les bases de la sécurité du web](/cours/securite_bases.md) et [le complément sécurité](/tp/php/securite/support.md) (risque, menace, données filtrées, requêtes préparées, mots de passe hachés).
- En deuxième année : [le parcours OWASP](/pages/categories/securite-owasp.md), [les slides](/cours/securite_applications.md) et [la synthèse OWASP](/cheatsheets/owasp/).

## Les CMS

- [Installer et configurer WordPress](/tp/cms/wordpress.md).

## Pour réviser

- [Les quiz d'entraînement](/moodle/) : HTML et CSS, PHP, Laravel, API REST, VueJS, sécurité.
- [Les aides mémoires](/pages/categories/aide-memoires.md), tous domaines confondus.
