# Découpage du TP « Introduction à Laravel » en 4 TP

## Contexte

`tp/laravel/introduction.md` (~1330 lignes) est trop dense : il couvre l'installation, les routes/vues/contrôleurs, la base de données, l'authentification, le rate limiting, Tinker et les factories dans un seul support. Objectif : le découper en 4 TP progressifs, chacun avec sa propre introduction, ses objectifs et des enrichissements pour en faire de « vrais TP ».

Public cible : étudiants débutants en Laravel ayant fait le TP « Transition vers Laravel » (`tp/php/tp6.md`) — ils connaissent donc déjà routes, vues, GET/POST, sessions en Laravel, et le PHP pur (sessions, formulaires) de 1re année.

Décisions actées avec l'utilisateur :
- Le nouveau TP « auth manuelle » devient un **prérequis** du TP Breeze existant (`authentification.md`), qui reste inchangé.
- Les 3 nouveaux TP **continuent sur le même projet** (fil rouge TODO), avec un encart de rattrapage pour ceux qui n'ont pas le projet précédent.

## Découpage

Point de coupe dans `introduction.md` : la section `## La base de données` (ligne 634). Tout ce qui précède ne bouge pas.

### 1. `tp/laravel/introduction.md` (modifié)

- Conserver intégralement le début → fin de « Vous en voulez plus ? » (ligne ~631).
- Supprimer tout à partir de `## La base de données`.
- Ajouter une courte `## Conclusion` : récap de ce qui a été vu (routes, Blade, layouts, contrôleurs, directives, messages flash, middleware CSRF) + lien vers la suite : « [Laravel & la base de données](/tp/laravel/base_de_donnees.md) ». Rappeler de conserver/commiter le projet, il sera réutilisé.

### 2. Nouveau : `tp/laravel/base_de_donnees.md` — « Laravel & la base de données »

Contenu repris : sections « La base de données » → « Un formulaire de contact » (lignes 634–978) : SQLite, `make:model --migration`, migration, `$fillable`, `migrate`, Eloquent (all/where/find/create/save/delete), TODO list complète (lister, ajouter, terminer, supprimer), middleware `CheckTodo`, formulaire de contact.

Enrichissements :
- Frontmatter `description`, sommaire `[[toc]]`, encart « TP guidé » comme l'existant.
- Introduction dédiée : pourquoi un ORM, ce qu'on construit (une TODO list persistante), objectifs listés.
- Section « Reprendre votre projet » : reprendre le projet du TP introduction, avec encart ::: details pour ceux qui partent de zéro (create-project + layout de base minimal).
- Rappel court du vocabulaire : migration / modèle / Eloquent (schéma texte du flux contrôleur → modèle → BDD).
- Questions de compréhension ajoutées aux étapes clés (ex. : à quoi sert la méthode `down()` ? pourquoi `$fillable` ? que se passe-t-il si on relance `migrate` ?).
- Petite section « Vérifier avec SQLite » : ouvrir `database/database.sqlite` (extension VSCode / DB Browser) pour constater que les données sont bien là.
- Conclusion + lien vers le TP suivant (auth manuelle).

### 3. Nouveau : `tp/laravel/authentification_manuelle.md` — « Comprendre l'authentification »

Contenu repris : sections « Gérer de l'authentification » → « Créer un Middleware pour l'authentification » (lignes 980–1088) : modèle `Utilisateur`, `AuthentificationControleur` (login/register + traitements), `password_hash`/`password_verify`, session, middleware `CheckAuth`.

Enrichissements :
- Introduction théorique **en amont** : principe de l'authentification (identifier ≠ authentifier), pourquoi ne jamais stocker un mot de passe en clair, principe du hash (sens unique, salt), `password_hash` / `password_verify`.
- **Étape 0 en PHP pur, sans BDD** (demandée par l'utilisateur) : mini-exercice rapide dans un simple fichier `auth.php` (serveur `php -S`) — un tableau associatif d'utilisateurs avec mots de passe hashés en dur, un formulaire POST, `password_verify`, `$_SESSION`. Objectif : comprendre le mécanisme nu avant la version Laravel. Court (~30 min), guidé, avec questions (que voit-on en base/dans le hash ? deux utilisateurs avec le même mot de passe ont-ils le même hash ?).
- Puis la partie Laravel existante (reprise du projet TODO), enrichie : validation minimale des champs, messages flash d'erreur (réutilise ce qui a été vu au TP intro), route `/logout`, protection des routes TODO par le middleware `CheckAuth`.
- Conclusion : ouvrir sur le fait que Laravel sait automatiser tout ça → lien vers le TP Breeze existant (`authentification.md`) présenté comme la suite logique, et vers le TP conclusion.

### 4. Nouveau : `tp/laravel/aller_plus_loin.md` — « Aller plus loin avec Laravel » (TP de conclusion)

Contenu repris : « Limiter le nombre d'appels » (rate limiting), « Laravel tinker », Bonus 0 (factories/seeders), Bonus 1 (apparence + composants), Bonus 2 (relation Utilisateur ↔ Todo, `belongsTo`/`hasMany`), Bonus 3 (pages TODO par utilisateur) — lignes 1090–1333.

Enrichissements :
- Introduction : ce TP conclut la découverte de Laravel — on consolide le projet TODO (créé au TP BDD, sécurisé au TP auth) en le finissant proprement.
- Prérequis explicites : TP base de données + TP auth manuelle (encart de rattrapage).
- Restructuration : les « Bonus » deviennent des étapes numérotées du TP (rate limiting → Tinker → seeding → relations utilisateur/TODO → filtrage des TODO par utilisateur connecté → pages profil → apparence/composants en bonus final).
- Corriger au passage les coquilles héritées (`'completed'` → `'termine'` dans la factory, `$todos $utilisateur->todos;` → `$todos = $utilisateur->todos;`, « se TP » → « ce TP »).
- Conclusion générale du parcours : récap MVC/Eloquent/auth + orientation vers la suite du parcours (« Eloquent les modèles simplement », projets).

## Autres fichiers à modifier

- **`.vitepress/sidebar.ts:238-239`** : insérer dans « Les TP » après « Introduction à Laravel » :
  - « Laravel & la base de données » → `/tp/laravel/base_de_donnees`
  - « Comprendre l'authentification » → `/tp/laravel/authentification_manuelle`
  - « Aller plus loin avec Laravel » → `/tp/laravel/aller_plus_loin`
  (avant « Laravel & L'authentification » qui reste en place)
- **`tp/laravel/authentification.md`** : petite retouche d'intro uniquement — mentionner que les principes vus dans le TP « auth manuelle » vont être automatisés ici (une phrase + lien). Le reste inchangé.
- `tp/php/tp6.md` et `cheatsheets/laravel/quick.md` pointent vers `introduction.md` : liens toujours valides, rien à changer.

## Style / conventions à respecter

- Frontmatter `description:` en tête de chaque fichier.
- `::: details Sommaire [[toc]] :::` après le titre.
- Encarts VitePress `::: tip / warning / danger / details`, composant `<Reveal text="…">` pour les solutions.
- Ton existant : tutoiement collectif (« vous »), « Je vous laisse… », « 👋 Si vous avez des questions », questions de compréhension intercalées, code donné partiellement puis « C'est à vous ».
- `<span v-pre>` / `<code v-pre>` pour les exemples Blade hors blocs de code.

## Vérification

- `git diff` de `introduction.md` : uniquement des suppressions à partir de la ligne 634 + ajout de la conclusion (le début intact).
- Relire les 3 nouveaux fichiers : chaque TP est autonome (intro, objectifs, prérequis, conclusion, lien vers le suivant).
- Lancer le site (`npm run dev` / VitePress) et vérifier : les 3 nouvelles entrées du sidebar, le rendu des sommaires `[[toc]]`, les liens croisés entre les 4 TP, aucun lien mort vers les anciennes ancres de `introduction.md`.
