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
- `public/reformulation/` : reformulation d'une sélection et chat sur la page (Gemini Nano intégré à Chrome par défaut, ou Gemma 2 / Qwen3 au choix via WebLLM si WebGPU). Le bouton de chat de la barre du haut (`.vitepress/theme/components/ChatNavButton.vue`) ne fait qu'émettre des événements `reformulation:*` écoutés par ce script.
- `archives/` : anciens codes conservés pour mémoire, hors de `public/` donc jamais publiés. Ne pas y mettre de `.md` (ils deviendraient des pages).
- Bloc « Nouveautés » de l'accueil : `.vitepress/recent.ts` lit l'historique Git au build (`tp/`, `cours/`, `cheatsheets/`) et sépare deux listes (titre = `title:` ou premier `# `, texte = `description:`). Les **nouveautés** : pages créées, ou modifiées de manière importante (au moins 60 lignes et 15 % de la page dans la même journée, ou 200 lignes) ; `RecentPages.vue` en affiche 3 en cartes compactes sous les cartes de `HomeContent.vue`, les 20 sur `nouveautes.md`, et le flux `/rss.xml` les reprend (hook `buildEnd` de `config.mts`, lien `alternate` dans le `head`). Les **mises à jour** : pages retouchées depuis, affichées par `RecentUpdates.vue` en une ligne qui défile sous les cartes de l'accueil (pause au survol, rien si `prefers-reduced-motion`) et en liste en bas de `nouveautes.md`. Données via `.vitepress/theme/recent.data.ts`. Une page avec `lastUpdated: false` n'y apparaît jamais.
- Fil de veille (`tp/veille/flux.md`, composant `VeilleReader.vue`) : la liste blanche des sources et un lecteur RSS/Atom sans dépendance sont dans `.vitepress/veille.ts`. Instantané au build (`.vitepress/theme/veille.data.ts`, une source en panne est ignorée) ; la page (à l'ouverture et avec « Actualiser ») appelle la fonction Netlify `netlify/functions/veille.mts` (`/api/veille`) : **sans paramètre** (jamais de relais ouvert), **réservée aux pages du site** (`Sec-Fetch-Site: same-origin`, sinon `Referer` du site, sinon 403), avec un **cache côté serveur de 5 heures** dans Netlify Blobs (`@netlify/blobs`, store `veille`, clé `latest`) qui borne les lectures des flux même si le CDN est contourné, et devant elle le cache durable du CDN, 5 heures aussi (`Netlify-CDN-Cache-Control`, clé `Netlify-Vary: query=v,header=Sec-Fetch-Site|Referer`). Ajouter une source = une ligne dans `SOURCES` et sur `tp/veille/ressources.md`.
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

### Structure de projet des TP PHP (à partir du TP 3)

- Tout TP PHP après `tp/php/tp3.md` utilise l'organisation entry-point : `index.php` avec `$whitelist` + `in_array()`, `common/header.php`, `common/footer.php`, `pages/<page>.php`, `public/`, `utils/db.php` (PDO). Liens sous la forme `index.php?page=xxx`.
- Première ligne d'`index.php` : `ob_start();` (expliquée une fois par TP dans un tip « Que se passe-t-il derrière ? ») : les pages redirigent après l'include du header, sans tampon de sortie `header()` échoue hors XAMPP.
- TP POO (`tp/php/poo/`) : même structure, plus `classes/` (un fichier par classe, `Database::getPdo()`, un **modèle** par table, ex. `Idea`, qui porte à la fois les données (propriétés typées, constructeur) et les méthodes d'accès : `Idea::all()`, `Idea::find()`, `$idea->save()`, `$idea->delete()`) et un autoloader `spl_autoload_register` dans `index.php`. Jamais de « repository » ni de « dépôt » séparé. Aucun équivalent Laravel dans la partie POO (trop tôt), pas de namespace ni d'héritage à ce niveau.
- La base de données arrive dès le TP 2 (formulaires) sur le fil rouge Bart (base `bart`, table `phrases`). La modélisation et le langage SQL sont enseignés par un autre enseignant : les supports du site n'expliquent que l'accès depuis PHP (PDO, `query`, `prepare`/`execute`, `fetchAll`) et fournissent les requêtes nécessaires, sans cours de MCD ni de SQL.
- La session sert à l'état du visiteur (préférence, message flash, connecté ou non), jamais à stocker des données métier.
- Nommage : variables, fonctions, classes en anglais ; tables, colonnes SQL et noms de pages en français ; tableaux en `[...]` (équivalence avec `array()` rappelée une fois).
- TP de création (`creation-*.md`) : intro en séance (2 h), suite à la maison, grille de validation « validé / à revoir » (pas de barème), README par renvoi à `tp/php/eval1.md#le-readme-md`, rendu Git + Moodle.
- Captures d'écran des TP dans le dossier `res/` voisin (`<tp>_<page>.png`, 1000 px, Chrome headless sur une solution de référence).
- Validation : tout code donné dans un TP doit provenir d'une solution complète exécutée (PHP 8.3 + MariaDB via Docker, image locale `bts-php` avec `pdo_mysql`, serveur `php -S`), captures prises sur cette solution.

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

## Briques communes des bacs à sable (`.vitepress/theme/components/lab/`)

- Tous les labs des TP sécurité (`SqlInjection.vue`, `XssLab.vue`, `AuthLab.vue`…) sont construits par composition sur ces briques, sans héritage : `LabFrame.vue` (cadre + bouton « ↺ Recommencer » en haut à droite qui émet `reset`, prop `disabled`, et **tous les styles partagés**, non scopés mais préfixés `.lab`), `LabModes.vue` (bascule vulnérable / corrigé, `v-model` + `options`), `LabCode.vue` (ce que le serveur produit : HTML, requête SQL…), `LabVerdict.vue` (`{ ok, texte, lignes?, ton? }`), `LabDefis.vue` (sélecteur d'épreuve + progression, slot pour le formulaire), `useProgression.js` (progression des épreuves en `localStorage`).
- Couleur des verdicts, commune à tous les labs : **vert = l'action de l'élève aboutit** (y compris une attaque réussie), **rouge = elle échoue** (attaque bloquée), `ton: 'warn'` orange pour un cas à surveiller (attaque ratée sur une page qui reste vulnérable, réussite partielle), `ton: 'info'` neutre pour un comportement normal, un coup de pouce ou une étape intermédiaire. Dans une démo jouée en défenseur (logs du TP 3), le vert reste l'objectif de l'élève : l'alerte levée.
- Un nouveau lab ou un nouveau `type` réutilise ces briques et ne garde dans son `<style scoped>` que ce qui lui est propre. Chaque lab a un `recommencer()` branché sur `LabFrame` qui remet **tout** l'exercice à l'état de départ (saisies, mode, résultats, minuteries, et progression des épreuves en `localStorage`) : l'étendre à chaque ajout.

## Bac à sable SQL du TP injections (`SqlInjection.vue`)

- `tp/securite/tp1_injection_sql.md` intègre le composant `.vitepress/theme/components/SqlInjection.vue` (prop `type` : `login`, `fiche` ex. 1, `fauxami` ex. 2, `recherche` ex. 3, `insertion` ex. 4 avec base conservée d'un envoi à l'autre, `defis`, `editor`) pour jouer les injections SQL en direct et réussir 5 épreuves (contournement de login, injection numérique, UNION SELECT, requête empilée, injection à l'aveugle). sql.js est du SQLite : quand MariaDB se comporte autrement, la démo imite MariaDB (comparaison `id = '1 OR 1=1'` convertie en 1 ; placeholder entre apostrophes `'?'` / `'%?%'` qui lève `SQLSTATE[HY093]`, vérifié en PHP 8.3 + MariaDB 11.4). Schémas : `tp/securite/res/tp1_sql_*.svg`.
- Le composant crée ses bases **en mémoire** (`new SQL.Database()` + `db.run(schema)`, schémas écrits en dur dans le composant) : aucun fichier `.sqlite`, rien à générer ni à versionner. Il réutilise sql.js vendu dans `public/sqlite/sqljs/`. Progression des épreuves en `localStorage` (`sql-injection:defis`).

## Bacs à sable des TP sécurité 2, 3 et 4 (`XssLab.vue`, `AccessLab.vue`, `AuthLab.vue`)

- `tp/securite/tp2_xss.md` intègre `.vitepress/theme/components/XssLab.vue` (prop `type` : `reflechie` ex. 1, `bonjour` ex. 2 paramètre d'URL et lien piégé, `formulaire` ex. 3 avec comparaison sans protection / `htmlspecialchars` / `strip_tags`, `livre` ex. 4, `defis`) : la « page vulnérable » est rendue dans une **iframe sandboxée** (`sandbox="allow-scripts"`, `srcdoc`) et communique par `postMessage`. Un petit *harness* injecté dans l'iframe simule `document.cookie`, intercepte `alert()` et les exfiltrations (`new Image().src`, `fetch`) pour détecter la réussite. 4 épreuves (réfléchie, contournement de filtre, stockée, vol de session), progression en `localStorage` (`xss-lab:defis`). Le toggle « affichage échappé » applique un `htmlspecialchars` maison qui neutralise l'attaque.
- `tp/securite/tp4_authentification.md` intègre `.vitepress/theme/components/AuthLab.vue` (prop `type` : `hash`, `bruteforce`) : démos pures JavaScript, sans iframe. `hash` compare clair / SHA-256 (via `crypto.subtle`, avec table arc-en-ciel jouet) / faux bcrypt illustratif ; `bruteforce` rejoue un dictionnaire contre un compte cible, avec cases « limiter » et « délai » pour voir l'attaque échouer. `csrf` (ex. 3) rejoue `admin.php` en trois versions (GET vulnérable, POST seul, POST + jeton) contre un email piégé (`<img>` en GET) et un site piégé (formulaire POST auto-soumis), avec une case `SameSite=Strict` ; une note signale l'hypothèse d'un contrôle de session dans `admin.php` (TP 3). `totp` (ex. 4) rejoue la connexion sans et avec 2FA, avec un vrai TOTP RFC 6238 (HMAC-SHA1 via `crypto.subtle`, pas de 30 s, tolérance d'un pas, usage unique) ; la minuterie du téléphone est arrêtée dans `onBeforeUnmount` ; une note signale que ce comportement d'`isCodeValid` est supposé (classe `TwoFactorAuth` non détaillée dans le TP). Schémas : `tp/securite/res/tp4_auth_*.svg`.
- `tp/securite/tp3_controle_acces.md` intègre `.vitepress/theme/components/AccessLab.vue` (prop `type` : `logs`, `idor`, `admin`, `admin-factures`) : démos pures JavaScript, sans iframe. `logs` (ex. 1) remplit un `access.log` au format du TP et compare la lecture humaine à une règle de détection (3 identifiants `/facture` différents pour une même IP). `idor` (ex. 2) simule `FactureController@index` pour Alice (`Auth::id() = 1`), d'origine ou corrigé avec `checkIfUserCanAccessFacture`, avec requête, trace PHP, statut 200/403/404 et énumération 8980 à 8990. `admin` (ex. 3) et `admin-factures` (ex. 4) rejouent `routes/web.php` avec ou sans le groupe `middleware(['admin'])` pour un visiteur non connecté, un membre et un admin ; le middleware (exemple, le TP n'en donne pas le code) redirige un visiteur non connecté vers `/login` (302) et renvoie 403 à un membre, comme le schéma `tp3_acces_controles.svg`. Les données en dur restent alignées sur le TP (factures 8982 à 8986, 8986 à Alice, au-delà 404 comme dans les logs de l'ex. 1).
- Schémas des TP sécurité : SVG dans `tp/securite/res/` (`tp<n>_<sujet>.svg`), fond blanc arrondi lisible dans les deux thèmes, police système, rouge = attaque, bleu = flux normal, vert = protection ; vérifiés par une capture Chrome headless (aucun texte qui chevauche).
- Ces composants ne chargent **aucune dépendance externe** et ne génèrent aucun fichier. Ne jamais mettre de `</script>` littéral dans une chaîne ou un commentaire de ces `.vue` (échapper en `<\/script>`) : le découpeur de SFC fermerait le bloc `<script setup>` trop tôt.

## Enquête PHP (`scripts/enquete-algo/`)

- Déclinaison « algorithmes » de l'enquête SQL : un seul jeu, `jeux/enquete-php.md`, en deux parties dans la même page : histoires 1 à 4 procédurales (1er semestre : aucune mention de Git ni de SQL) puis histoires 5 à 7 en POO (section « La suite en orienté objet », après les cours POO/interfaces/polymorphisme). Composant `.vitepress/theme/components/AlgoEnquete.vue` (`<AlgoEnquete />`, sans prop : le mode procédural/POO est porté par chaque histoire dans `index.json`).
- Les données du jeu sont générées une seule fois (« one shot ») par `python3 scripts/enquete-algo/generate.py` (Python 3.11+, aucune dépendance) et versionnées. Une histoire = un fichier `histoires/*.toml` avec `mode = "procedural"` ou `"poo"` (format et procédure dans `scripts/enquete-algo/README.md`).
- Le script ne régénère jamais un fichier existant (il faut `--force`) et n'est pas appelé par le build : les histoires publiées doivent rester stables, les indices du jeu en dépendent. Les indices et solutions (`public/enquete-algo/solutions/*.md`) sont générés par le même script et inclus dans la page via `@include` : ne jamais les écrire à la main.
- `public/enquete-algo/` (`*.php`, `index.json`, `solutions/*.md`) et `scripts/enquete-algo/corriges.json` sont générés : ne pas éditer à la main.
- PHP tourne dans le navigateur via php-wasm, chargé depuis jsDelivr (version épinglée dans `AlgoEnquete.vue`) : c'est l'exception au « tout auto-hébergé » ; pour vendre localement, copier le loader et son `.wasm` dans `public/` et changer la constante d'URL du composant.

- Les pages des deux enquêtes vivent dans `jeux/` : ce sont des jeux bonus, pas des TP. L'ancienne URL `tp/php/sql/enquete` est redirigée via `public/_redirects` : ne pas la réutiliser.
