# Règles du repo

Site de cours BTS SIO (VitePress 1.x), déployé sur Netlify. Le contenu est en français et s'adresse à des étudiants.

## Commandes

- `npm run docs:dev` : serveur de développement.
- `npm run docs:build` : build complet (lance d'abord `quiz:build`). C'est la commande exécutée par Netlify.
- `npm run quiz:build` : régénère les sorties des quiz (`node moodle/gift2md.mjs`). À relancer après toute modification d'un fichier `moodle/*.gift`.

## Structure

- `tp/`, `cours/`, `cheatsheets/` : contenu pédagogique (pages Markdown VitePress).
- `public/cours/sources/<nom>/slides.md` : slides reveal.js.
- `moodle/*.gift` : banques de questions au format GIFT (source unique des quiz).
- `moodle/print/` : versions imprimables générées (sujet + corrigé). Ne pas éditer à la main.
- `public/quiz/` : copies des .gift + `index.json` générés pour les quiz en ligne. Ne pas éditer à la main.
- `.vitepress/theme/components/QuizGift.vue` : composant de quiz en ligne (parseur GIFT inline, sans lib externe), utilisé par la page `moodle/index.md`.

## Exclusions de build (à ne jamais retirer)

`srcExclude` dans `.vitepress/config.mts` doit contenir `public/**/*.md`, `moodle/print/**` (les corrigés ne doivent pas être publiés comme pages), ainsi que `AGENTS.md` et `CLAUDE.md`.

## Style du contenu

### Ton d'écriture (TP, cours, TD, exercices)

- Français, vouvoiement, prof qui s'adresse directement aux étudiants.
- Formules récurrentes : « Je vous laisse… », « C'est à vous de jouer ! », « Pas de panique », « 👋 Si vous avez des questions, n'hésitez pas ».
- Jamais de tiret cadratin « — » : reformuler avec virgule, deux-points ou parenthèses.
- Emojis ponctuels et sobres, uniquement dans le corps du texte : jamais dans les titres.
- Points de contrôle en bloc `::: tip Point de contrôle` (pas de ligne « ✅ … »).
- Solutions dans `::: details Voir l'une des solutions possibles`.
- Blade hors bloc de code : entourer de `<span v-pre>` / `<code v-pre>` (sinon Vue interprète les `{{ }}`).

### Squelette type d'un TP

1. Frontmatter avec `description:` (entre guillemets si elle contient un `:`).
2. `# Titre`, puis `::: details Sommaire` avec `[[toc]]`.
3. Intro courte qui relie au TP précédent et annonce ce qu'on va construire.
4. `## Prérequis` (avec rattrapage en `::: details` si besoin) et `## Objectifs` (« À la fin de ce TP vous saurez : » + puces).
5. Éventuellement `## Les slides` en tête : `<ClientOnly><SlidesDeck src="…" /></ClientOnly>`, la théorie restant aussi dans le texte.
6. Étapes titrées avec questions de réflexion (réponse dans un `::: details`) et tips « que se passe-t-il derrière ? ».
7. `## Conclusion` : récap en puces, rappel du commit, lien vers la suite.
8. Guidage dégressif : très guidé au début, de moins en moins ensuite. Un TD est entièrement guidé ; un TP bonus s'ouvre sur un encart « pour les étudiants en avance ».

### Slides (reveal.js)

- Un deck = `public/cours/sources/<nom>/slides.md`, slides séparées par `---`. Première slide : titre + byline « Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software) ».
- Une idée par slide : titre + 2 à 4 puces max, ou un seul bloc de code court.
- Questions posées à l'audience, souvent seules sur leur slide, réponse sur la suivante (problème, question, réponse).
- Clôture systématique : slide « Récapitulatif » (puces), puis « Des questions ? » avec « Place au TP 🚀 » en corps.
- Le deck pose les concepts sans dupliquer les consignes du TP.

### TP évalués (points étapes)

- Mini projet calibré pour 2 heures (README et rendu compris), placé environ tous les 4 TP.
- Barème sur 20 exactement, dont README.md : 3 points. Section « Le challenge » bonus (+2 pts) à la fin.
- Consignes sans pas-à-pas, mais un bloc `::: details Coup de pouce : <sujet>` après chaque étape.
- Pas de rapport : tout passe par le README.md (contenu attendu défini dans tp/php/eval1.md#le-readme-md, y renvoyer).
- Restitution : code poussé sur https://gitlab.dombtsig.local puis lien déposé dans Moodle. Pas de zip ni de formulaire.
- Exception séquence 1er semestre (Git pas encore vu) : aucune mention de Git ni de commit dans les TP ; restitution des évaluations en archive zip déposée sur Moodle (avec rappel de vérifier l'archive avant dépôt).

## Quiz GIFT (`moodle/*.gift`)

- Ligne 1 : `// Questionnaire <Titre affiché>` (sans nombre de questions ni cadratin), puis `$CATEGORY: <Thème>/<Lot>`.
- IDs de questions : `::PREFIX-Qn Titre court::` (ex. `PHP-L1-Q3`). L'ID est retiré à l'affichage.
- Varier les types : QCM, vrai/faux, réponse courte, numérique, appariement, mot manquant, réponses multiples.
- Les réponses et feedbacks restent dans les .gift (correction automatique Moodle + corrigé enseignant).
- Échapper les caractères spéciaux dans le code : `\= \: \{ \} \~ \# \;`.
- Toujours plus de propositions que de réponses :
  - QCM et mot manquant : au moins 3 distracteurs.
  - Réponses multiples : au moins 2 distracteurs (poids négatifs `~%-50%`).
  - Appariement : 2 distracteurs avec la syntaxe côté gauche vide `= -> Texte distracteur`.
- Images dans les énoncés : sources dans `moodle/img/` (copiées vers `public/quiz/img/` par le build), référencées en URL absolue échappée `<img src\="https\://cours.brosseau.ovh/quiz/img/<nom>.png">` pour fonctionner aussi après import Moodle. Chaque question doit être autonome (tirage aléatoire) : répéter l'image dans chaque question qui en dépend.

## Enquête SQL (`scripts/enquete-sql/`, jeu `jeux/enquete-sql.md`)

- Les bases du jeu `jeux/enquete-sql.md` sont générées une seule fois (« one shot ») par `python3 scripts/enquete-sql/generate.py` (Python 3.11+, aucune dépendance) et versionnées. Une histoire = un fichier `histoires/*.toml` (format et procédure dans `scripts/enquete-sql/README.md`).
- Le script ne régénère jamais une base existante (il faut `--force`) et n'est pas appelé par le build : les histoires publiées doivent rester stables, les indices du jeu en dépendent. Les indices et solutions (`public/sqlite/enquete/solutions/*.md`) sont générés par le même script et inclus dans la page via `@include` : ne jamais les écrire à la main.
- `public/sqlite/enquete/` (bases + `index.json`) et `scripts/enquete-sql/corriges.json` sont générés : ne pas éditer à la main.
- `scripts/enquete-sql/mcd.py` génère le MCD `jeux/res/enquete_schema.svg` (ne pas éditer le SVG à la main).
- `public/sqlite/sqljs/` : sql.js vendu localement (chargé par les composants `SqlEnquete.vue` et `SqlInjection.vue`).

## Bac à sable SQL du TP injections (`SqlInjection.vue`)

- `tp/securite/tp1_injection_sql.md` intègre le composant `.vitepress/theme/components/SqlInjection.vue` (prop `type` : `login`, `defis`, `editor`) pour jouer les injections SQL en direct et réussir 5 épreuves (contournement de login, injection numérique, UNION SELECT, requête empilée, injection à l'aveugle).
- Le composant crée ses bases **en mémoire** (`new SQL.Database()` + `db.run(schema)`, schémas écrits en dur dans le composant) : aucun fichier `.sqlite`, rien à générer ni à versionner. Il réutilise sql.js vendu dans `public/sqlite/sqljs/`. Progression des épreuves en `localStorage` (`sql-injection:defis`).

## Bacs à sable des TP sécurité 2 et 4 (`XssLab.vue`, `AuthLab.vue`)

- `tp/securite/tp2_xss.md` intègre `.vitepress/theme/components/XssLab.vue` (prop `type` : `reflechie`, `livre`, `defis`) : la « page vulnérable » est rendue dans une **iframe sandboxée** (`sandbox="allow-scripts"`, `srcdoc`) et communique par `postMessage`. Un petit *harness* injecté dans l'iframe simule `document.cookie`, intercepte `alert()` et les exfiltrations (`new Image().src`, `fetch`) pour détecter la réussite. 4 épreuves (réfléchie, contournement de filtre, stockée, vol de session), progression en `localStorage` (`xss-lab:defis`). Le toggle « affichage échappé » applique un `htmlspecialchars` maison qui neutralise l'attaque.
- `tp/securite/tp4_authentification.md` intègre `.vitepress/theme/components/AuthLab.vue` (prop `type` : `hash`, `bruteforce`) : démos pures JavaScript, sans iframe. `hash` compare clair / SHA-256 (via `crypto.subtle`, avec table arc-en-ciel jouet) / faux bcrypt illustratif ; `bruteforce` rejoue un dictionnaire contre un compte cible, avec cases « limiter » et « délai » pour voir l'attaque échouer.
- Ces deux composants ne chargent **aucune dépendance externe** et ne génèrent aucun fichier. Ne jamais mettre de `</script>` littéral dans une chaîne ou un commentaire de ces `.vue` (échapper en `<\/script>`) : le découpeur de SFC fermerait le bloc `<script setup>` trop tôt.

## Enquête PHP (`scripts/enquete-algo/`)

- Déclinaison « algorithmes » de l'enquête SQL : un seul jeu, `jeux/enquete-php.md`, en deux parties dans la même page : histoires 1 à 4 procédurales (1er semestre : aucune mention de Git ni de SQL) puis histoires 5 à 7 en POO (section « La suite en orienté objet », après les cours POO/interfaces/polymorphisme). Composant `.vitepress/theme/components/AlgoEnquete.vue` (`<AlgoEnquete />`, sans prop : le mode procédural/POO est porté par chaque histoire dans `index.json`).
- Les données du jeu sont générées une seule fois (« one shot ») par `python3 scripts/enquete-algo/generate.py` (Python 3.11+, aucune dépendance) et versionnées. Une histoire = un fichier `histoires/*.toml` avec `mode = "procedural"` ou `"poo"` (format et procédure dans `scripts/enquete-algo/README.md`).
- Le script ne régénère jamais un fichier existant (il faut `--force`) et n'est pas appelé par le build : les histoires publiées doivent rester stables, les indices du jeu en dépendent. Les indices et solutions (`public/enquete-algo/solutions/*.md`) sont générés par le même script et inclus dans la page via `@include` : ne jamais les écrire à la main.
- `public/enquete-algo/` (`*.php`, `index.json`, `solutions/*.md`) et `scripts/enquete-algo/corriges.json` sont générés : ne pas éditer à la main.
- PHP tourne dans le navigateur via php-wasm, chargé depuis jsDelivr (version épinglée dans `AlgoEnquete.vue`) : c'est l'exception au « tout auto-hébergé » ; pour vendre localement, copier le loader et son `.wasm` dans `public/` et changer la constante d'URL du composant.

- Les pages des deux enquêtes vivent dans `jeux/` : ce sont des jeux bonus, pas des TP. L'ancienne URL `tp/php/sql/enquete` est redirigée via `public/_redirects` : ne pas la réutiliser.
