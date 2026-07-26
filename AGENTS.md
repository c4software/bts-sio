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
