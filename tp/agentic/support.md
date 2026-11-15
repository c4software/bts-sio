---
description: "En plus du cours : le développement agentique par écrit, ce qu'est un agent de code (un modèle dans une boucle, entouré d'un harness), ce qui circule entre l'agent et le modèle, ce que coûtent les tokens, la méthode pour le piloter (décrire, planifier, relire, tester, commiter) et ses limites."
---

# Le développement agentique : en plus du cours

::: details Sommaire
[[toc]]
:::

Voilà le complément écrit du cours [« Le développement agentique »](/cours/agentic.md). Il reprend les idées des slides, avec un peu plus de place pour les expliquer. Inutile de le lire d'une traite : gardez-le ouvert dans un onglet pendant les TP, et revenez-y quand une notion vous échappe.

Les TP, eux, vous font manipuler : faire tourner la boucle à la main, piloter OpenCode sur un vrai projet, provoquer chaque risque. Ce document ne remplace aucun d'entre eux :

- [Le principe](./principe.md) ;
- [Utiliser un agent (OpenCode)](./utilisation.md) ;
- [Les limites](./limites.md) ;
- [Bonus : monter son propre proxy](./proxy.md).

## Du chat à l'agent

Aujourd'hui, si vous utilisez l'IA pour coder, ça ressemble sans doute à ça :

1. vous posez une question dans un chat ;
2. vous copiez la réponse dans votre éditeur ;
3. vous lancez, ça plante ;
4. vous recollez l'erreur dans le chat… et on recommence.

Qui fait le travail répétitif, là-dedans ? Vous. Avec un chat, c'est vous qui êtes la boucle : copier, coller, lancer, revenir.

Depuis 2025, les **agents de code** ont changé la donne. On ne leur demande plus un bout de code, on leur confie une tâche : « Ajoute les codes promo au panier, avec les tests. » L'agent lit le projet, modifie les fichiers, lance les tests, corrige, et revient vous voir quand il a fini.

Le reste de ce document suit le plan du cours : le principe (de quoi est fait un agent), l'utilisation (comment le piloter sur un vrai projet) et les limites (tout ce qui peut mal tourner).

## Le principe

### Un modèle de langage, et rien de plus

Au cœur de tout agent, il y a un modèle de langage, un LLM : GPT, Claude, Mistral, Qwen, DeepSeek… Un modèle ne sait faire qu'une chose, on lui donne du texte et il produit la suite. C'est tout. Il ne lit pas vos fichiers, il ne lance aucune commande, et il n'a aucune mémoire entre deux appels : chaque appel repart de zéro.

Alors, comment un agent peut-il modifier vos fichiers ?

### Un agent, c'est un modèle dans une boucle

![La boucle d'un agent : la demande part au modèle avec le contexte, le modèle répond ou demande un outil, l'agent exécute l'outil sur votre machine, ajoute le résultat au contexte et recommence](./res/principe_boucle.svg)

La boucle tient en quatre temps :

1. L'agent envoie au modèle tout le contexte : ses consignes, votre demande, la liste des outils, et tout ce qui s'est passé jusque-là.
2. Le modèle décide : soit il répond, soit il demande d'appeler un outil (« lis le fichier `src/panier.js` »).
3. L'agent exécute l'outil, sur votre machine.
4. Il ajoute le résultat au contexte… et on recommence.

La boucle s'arrête quand le modèle répond sans demander d'outil.

::: tip Que se passe-t-il derrière ?
Si le modèle n'a pas de mémoire, comment « sait-il » qu'il a modifié un fichier au tour précédent ? Parce que l'agent lui renvoie tout l'historique à chaque tour. Toute la mémoire de l'agent est dans ce texte renvoyé à chaque fois. Gardez cette idée en tête : c'est elle qui explique ce que coûte un agent ([les tokens](#les-tokens)).
:::

### Le modèle et le harness

![Le modèle tourne chez le fournisseur, le harness tourne sur votre machine](./res/principe_harness.svg)

Un agent, c'est donc deux choses. Le **modèle**, qui tourne chez un fournisseur et qu'on appelle par une API. Et le **harness**, tout ce qui entoure le modèle : la boucle, les outils, les permissions, l'interface. C'est le programme que vous installez (OpenCode, Claude Code, Codex, pi…).

Changer de modèle tient dans une ligne de configuration. Changer de harness, c'est changer d'agent.

Question : « Claude Code est meilleur qu'OpenCode, parce que son modèle est meilleur. » Vrai ou faux ?

::: details Réponse
Faux, et la question est mal posée : Claude Code et OpenCode sont deux harness, ni l'un ni l'autre n'est un modèle. On peut d'ailleurs brancher le même modèle sur les deux.

- Pour comparer deux harness : même modèle, même tâche.
- Pour comparer deux modèles : même harness, même tâche.
:::

### Autocomplétion, chat ou agent ?

![Autocomplétion, chat et agent : trois façons d'utiliser les mêmes modèles](./res/principe_trois_outils.svg)

Les trois outils utilisent les mêmes modèles. Ce qui change, c'est qui agit et ce que le modèle voit. L'autocomplétion propose la suite de la ligne que vous tapez. Le chat répond à vos questions, mais ne voit que ce que vous lui collez. L'agent, lui, lit le projet et agit dessus, tout seul.

![Avec un chat, vous êtes la boucle ; avec un agent, le harness est la boucle](./res/principe_chat_agent.svg)

Avec un chat, vous êtes le harness. Un agent va beaucoup plus vite… et vous voyez beaucoup moins ce qui se passe. C'est tout le sujet de la partie [limites](#les-limites).

Question : ChatGPT sait chercher sur le web et exécuter du Python. C'est un agent ?

::: details Réponse
Il a bien un harness (une boucle et des outils), mais pas sur votre projet. Ses outils tournent chez le fournisseur, dans un bac à sable : ils ne voient ni votre code, ni votre terminal.

Pour savoir à quoi vous avez affaire, posez-vous trois questions : quels outils ? Où s'exécutent-ils ? Qui fait tourner la boucle ?
:::

### Les harness du moment

Il en existe beaucoup, et la liste change tous les six mois. En novembre 2026 :

- **dans le terminal** : OpenCode, Claude Code, Codex, Copilot CLI, Antigravity CLI, Mistral Vibe, Qwen Code, Kimi Code, pi, goose… ;
- **dans l'éditeur** : GitHub Copilot, Cursor, Cline, Kilo Code, Junie, Kiro, Devin Desktop, Zed… ;
- **dans le cloud** : Codex, Claude Code sur le web, l'agent de Copilot, Devin, OpenHands… Vous leur confiez une tâche, et vous récupérez une pull request à relire.

Ne retenez pas les noms : retenez le principe, il est le même partout. Le détail est dans [le TP sur le principe](./principe.md#les-harness-du-moment).

### Les briques d'un agent

Quel que soit le harness, on retrouve toujours les mêmes briques.

**Le modèle.** Il tourne chez un fournisseur, et on l'appelle par une API.

**Le contexte et sa fenêtre.** Le contexte, c'est tout le texte envoyé au modèle à chaque tour. La fenêtre de contexte, c'est la taille maximale de ce texte : au-delà, le modèle ne peut plus rien lire.

**Les outils.** Un outil, c'est une fonction décrite au modèle : un nom, une phrase qui dit à quoi elle sert, des paramètres.

```json
{
  "name": "read",
  "description": "Read the contents of a file",
  "parameters": {
    "properties": { "path": { "type": "string" } }
  }
}
```

Le modèle ne voit que cette description. Il ne connaît pas le code de l'outil.

Question : quand un agent « lance les tests », qui exécute `npm test` ?

::: details Réponse
L'agent, sur votre machine. Le modèle n'a fait que demander l'appel de l'outil. Il ne voit que le résultat que l'agent lui renvoie.
:::

**Les permissions.** Puisque c'est l'agent qui exécute, c'est lui qui décide de ce qui est autorisé. Une configuration raisonnable ressemble à : lire, oui ; modifier, sur demande ; `git push`, jamais.

::: danger Attention
Dans OpenCode, par défaut… tout est autorisé 🚨. On y revient dans [les limites](#des-permissions-trop-larges).
:::

**Les instructions : `AGENTS.md`.** Ce sont les règles de la maison, dans un fichier à la racine du dépôt :

```markdown
# Boutique BTS

- Tous les montants sont des entiers en centimes.
- Lancez npm test après chaque modification.
```

L'agent le recopie au début du contexte, à chaque tour.

Question : un `AGENTS.md` de 500 lignes, bonne idée ?

::: details Réponse
Non. Il est renvoyé à chaque tour, ce sont des milliers de tokens payés à chaque appel, et autant de place en moins dans la fenêtre de contexte. Et plus il y a de consignes, plus le modèle en oublie.

Un bon `AGENTS.md` est court, et ne contient que ce que le code ne dit pas.
:::

### Ce qui circule entre l'agent et le modèle

Ouvrons le capot. Chaque tour de boucle, c'est une requête HTTP vers l'API du fournisseur, par exemple :

```bash
POST /v1/chat/completions
```

La requête contient le modèle, les messages (consignes, demande, historique) et la liste des outils. Voici deux tours de boucle pour la demande « Que fait la fonction `subtotal` ? » :

![Deux tours de boucle : au premier, le modèle demande de lire un fichier ; au second, il a le contenu sous les yeux et répond](/cours/sources/agentic/img/slides_deux_tours.svg)

Au premier tour, le modèle ne répond pas par du texte : il demande un outil. C'est le signal que l'agent surveille :

```json
"tool_calls": [{
  "function": { "name": "read",
    "arguments": "{\"path\": \"src/panier.js\"}" }
}],
"finish_reason": "tool_calls"
```

`finish_reason` vaut `tool_calls` ? Le modèle attend le résultat d'un outil, la boucle continue. `finish_reason` vaut `stop` ? C'est fini, la réponse est affichée.

Il existe trois grandes API pour faire la même chose :

| API | Éditeur | Utilisée par |
|---|---|---|
| **Chat Completions** | OpenAI | OpenCode, pi, la plupart des serveurs |
| **Messages** | Anthropic | Claude Code |
| **Responses** | OpenAI | Codex |

Des messages, des outils, des appels d'outils : seuls les noms changent. C'est ce qui permet à un proxy comme celui de la classe de se placer entre les agents et les fournisseurs, et de traduire de l'une à l'autre :

![Le proxy de la classe, entre les agents des étudiants et les fournisseurs de modèles](./res/principe_proxy.svg)

Si vous voulez voir ces requêtes de vos propres yeux, [le TP sur le principe](./principe.md#a-vous-de-jouer-faire-tourner-la-boucle-a-la-main) vous fait faire tourner la boucle à la main, avec `curl`.

Question : que se passe-t-il si l'agent renvoie au modèle le contenu d'un autre fichier que celui demandé ?

::: details Réponse
Le modèle le croit. Il n'a aucun moyen de vérifier, il fait entièrement confiance à ce qui entre dans son contexte. Gardez cette idée pour plus tard… 😉 (elle revient avec [les injections de prompt](#les-injections-de-prompt)).
:::

### Les tokens

Un modèle ne lit pas des caractères mais des tokens, des morceaux de mots. Comptez environ 4 caractères par token en moyenne.

Tout se compte en tokens : la taille de la fenêtre, les quotas, le prix. On distingue toujours les tokens d'entrée, tout ce qu'on envoie au modèle, et les tokens de sortie, ce qu'il produit, qui sont plusieurs fois plus chers.

Voici ce qu'un agent envoie vraiment, mesuré sur une petite demande de trois tours :

![Le contexte envoyé à chaque tour : les consignes de l'agent et la définition des outils pèsent l'essentiel, la demande moins de 1 %, et tout est renvoyé à chaque tour](./res/principe_contexte.svg)

Ce qui frappe : votre demande pèse moins de 1 % du texte envoyé, l'essentiel ce sont les consignes de l'agent et la description de ses outils. Tout est renvoyé à chaque tour. Et le contexte ne fait que grossir au fil de la session.

### Quand la fenêtre est pleine : la compaction

Le contexte grossit, mais la fenêtre, elle, ne grandit pas. Quand elle est presque pleine, l'agent compacte : il demande au modèle de résumer la conversation, puis il repart de ce résumé.

![La compaction : l'historique complet est remplacé par un résumé, les consignes et AGENTS.md restent](./res/principe_compaction.svg)

Le problème, c'est que le résumé oublie. Vous aviez précisé en route « le seuil de 50 € de la livraison offerte se calcule après la remise » ? Si le résumé ne l'a pas gardé, l'agent n'en sait plus rien 🚨.

::: tip Les bons réflexes
- Une règle qui compte va dans `AGENTS.md` (renvoyé à chaque tour, il survit aux compactions)… ou mieux, dans un test, qui échouera si l'agent l'oublie.
- Une tâche, une session : quand une tâche est terminée et commitée, ouvrez une nouvelle session.
:::

### Combien ça coûte ?

Les fournisseurs payants facturent au million de tokens. Prenons une après-midi de travail avec un agent : 150 tours de boucle, avec un contexte moyen de 40 000 tokens d'entrée par tour (et 500 de sortie).

| Modèle | Une personne | Une classe de 30 |
|---|---|---|
| Claude Sonnet 5.5 | ~ 12,75 $ | ~ 380 $ |
| DeepSeek V4.1 Flash | ~ 1,89 $ | ~ 57 $ |

Et c'est pour une seule séance. Un agent consomme énormément de tokens d'entrée, bien plus qu'un chat. Le détail du calcul (et les prix utilisés) est dans [le TP sur le principe](./principe.md#ce-que-ca-coute).

## L'utilisation

### OpenCode

Pour les TP, nous utilisons OpenCode. C'est un agent Open Source, qui tourne dans le terminal, avec des modèles gratuits et sans compte, et qui se branche sur presque n'importe quel fournisseur. Il est déjà installé dans la dev-box (avec Claude Code, Codex, pi…).

![L'écran d'accueil d'OpenCode](./res/utilisation_opencode_accueil.png)

### D'où viennent les modèles ?

![Les fournisseurs de modèles : modèles gratuits d'OpenCode, NVIDIA, AMD, proxy de la classe](./res/utilisation_fournisseurs.svg)

Plusieurs fournisseurs sont possibles : les modèles gratuits d'OpenCode, NVIDIA, AMD, ou le proxy de la classe. Leur configuration est détaillée dans [le TP utilisation](./utilisation.md#brancher-un-modele).

Quel que soit le fournisseur, une règle ne souffre aucune exception.

::: danger Règle n°1
La clé d'API ne va jamais dans un fichier du projet. On la met dans une variable d'environnement :

```bash
export LLM_PROXY_API_KEY="votre-cle"
```

Et la configuration y fait référence, sans jamais la contenir :

```json
"apiKey": "{env:LLM_PROXY_API_KEY}"
```

Pourquoi ? Parce qu'un fichier du projet finit dans Git, puis sur GitLab… puis chez n'importe qui.
:::

### Avant de lancer l'agent : lire le code

Le terrain de jeu des TP, c'est la Boutique BTS, un petit panier en JavaScript :

![La Boutique BTS, avant l'ajout des codes promo](./res/utilisation_panier_avant.png)

Avant de lancer l'agent, que faut-il faire ? Lire le code. C'est vous qui allez juger le travail de l'agent : si vous ne connaissez pas le projet, vous ne verrez pas ce qu'il casse.

### La méthode

![La méthode en cinq étapes : décrire, planifier, relire le diff, tester, commiter](./res/utilisation_methode.svg)

#### Décrire

Une bonne demande à un agent, c'est une bonne demande à un collègue : le quoi, pas le comment, et des critères pour savoir quand c'est fini. Par exemple : « Chaque règle est testée. »

#### Planifier

L'agent **Plan** d'OpenCode lit le projet et propose un plan, sans modifier les fichiers. C'est le moment de relire ce qu'il a compris, avant qu'il n'écrive une ligne.

![Une session OpenCode en mode Plan](./res/utilisation_opencode_session.png)

Question : on demande « Livraison offerte à partir de 50 € ». Le seuil s'applique avant ou après la remise ?

::: details Réponse
Personne ne l'a dit. Et l'agent tranche presque toujours… sans le dire.

C'est une décision métier : c'est à vous de la prendre, de l'écrire dans la demande, et de la faire tester. Le plan est le bon moment pour repérer ces ambiguïtés.
:::

#### Relire le diff

```bash
git status
git diff
```

Posez-vous systématiquement ces questions :

- Y a-t-il des fichiers modifiés que vous n'attendiez pas ?
- Une dépendance a-t-elle été ajoutée ?
- Pour chaque ligne : pourquoi est-elle là, et que se passerait-il sans elle ?

Pas d'accord avec ce que vous lisez ? On annule et on reformule la demande, plutôt que d'empiler les corrections :

```bash
git restore .
```

Git est votre filet de sécurité : travaillez toujours dans un dépôt propre, tout commité, avant de lancer l'agent.

#### Tester, pour de vrai

- Lancez `npm test` vous-même : « l'agent dit que ça passe » ne compte pas.
- Cassez volontairement une règle : un test doit devenir rouge (sinon, il ne teste rien).
- Puis testez à la main, dans la page : `BTS10`, `bts10`, un code inconnu…

#### Commiter

Un commit par étape. Le message, c'est vous qui l'écrivez, et il dit ce que vous avez validé.

## Les limites

Tout s'est bien passé ? Tant mieux. Voyons maintenant tout ce qui peut mal tourner 😈. Chaque risque est provoqué pour de vrai dans [le TP sur les limites](./limites.md).

### Les hallucinations

Un modèle produit le texte le plus probable, pas le texte vrai. Ça donne une fonction qui n'existe pas, un paquet npm inventé (ou pire, un paquet piégé qui porte ce nom), ou une explication sûre d'elle… et fausse.

::: tip La parade
- Lisez la sortie des outils, pas seulement le résumé final de l'agent.
- Vérifiez dans la documentation officielle.
- Toute nouvelle dépendance se vérifie à la main.
:::

### Du code qui marche, mais faux

```js
message.innerHTML = "Code inconnu : " + code;
```

Ça fonctionne, le message s'affiche. Bon signe ?

::: details Réponse
C'est une faille XSS : ce que tape l'utilisateur est injecté tel quel dans la page, balises comprises. Un « code promo » qui contient une balise `<script>` ou un `<img onerror=…>` s'exécute.

La parade : `textContent` au lieu d'`innerHTML`. Et surtout, le code de l'agent se relit comme celui d'un inconnu.
:::

### Les tests complaisants

L'agent a écrit ce test pour les frais de livraison :

```js
assert.equal(summary(cart).shipping,
  cart.subtotal < 5000 ? 490 : 0);
```

Qu'en pensez-vous ?

::: details Réponse
Il recopie la règle. Si le code se trompe de seuil, le test se trompe de la même façon… et passe. Un bon test utilise une valeur écrite en dur, et teste les frontières :

```js
assert.equal(summary(panierA4999).shipping, 490);
assert.equal(summary(panierA5000).shipping, 0);
```
:::

Pour vérifier qu'un test sert à quelque chose, on peut faire la chasse aux mutants : on modifie volontairement le code (un `<` qui devient `<=`, un seuil qui change), et on regarde si un test devient rouge. Si tous les tests restent verts, le mutant a survécu : il manque un test.

![La chasse aux mutants : on modifie le code, un bon test doit échouer](/cours/sources/agentic/img/slides_mutants.svg)

### Coût et quotas

![Les requêtes par minute : au-delà du quota, les requêtes sont refusées](./res/limites_quota.svg)

Les offres gratuites ont des quotas, des requêtes par minute ou des tokens par jour, et un agent les atteint vite puisqu'il enchaîne les tours de boucle. Les offres payantes, elles, ont [une facture](#combien-ca-coute).

Et gratuit, ça veut dire quoi ? Posez-vous la question : qu'avez-vous donné en échange ? Un numéro de téléphone (NVIDIA, par exemple). Parfois vos données, puisque certains modèles gratuits sont entraînés sur ce que vous leur envoyez. Et toujours une forme de dépendance, puisque c'est gratuit « pour une durée limitée ». Lisez les conditions, à chaque fois.

### Vos données partent chez un tiers

![Les données quittent votre machine pour aller chez le fournisseur du modèle](./res/limites_donnees.svg)

Tout ce que l'agent lit part dans le contexte, donc chez le fournisseur du modèle. Ce qui pose problème : les secrets, un `.env` lu par l'agent c'est un secret compromis ; le code de l'entreprise, qui ne vous appartient pas et que vous n'avez pas forcément le droit d'envoyer ; et les données personnelles, là c'est le RGPD.

### Les injections de prompt

Vous vous souvenez ? Le modèle croit tout ce qui entre dans son contexte.

![Une injection de prompt : un fichier lu par l'agent contient des consignes, que le modèle suit](./res/limites_injection.svg)

Pour le modèle, tout est du texte : votre demande, un fichier lu, une page web, un message d'erreur… Il ne fait aucune différence entre une donnée et une consigne. Un commentaire dans un fichier, un README, une issue GitLab peuvent donc donner des ordres à votre agent.

Il n'existe pas de parade parfaite. On limite les dégâts possibles : c'est le rôle des permissions.

### Des permissions trop larges

On demande à l'agent « Nettoie le projet ». Avec les permissions par défaut d'OpenCode, voilà ce qui se passe :

![Sans règle de permission, l'agent exécute rm -rf test sans rien demander](./res/limites_permissions_defaut.png)

Le dossier de tests a disparu, sans une question. Les permissions se règlent dans `opencode.json`, par une liste de règles :

```json
{ "action": "shell", "resource": "*", "effect": "ask" },
{ "action": "shell", "resource": "npm test", "effect": "allow" },
{ "action": "shell", "resource": "rm *", "effect": "deny" },
{ "action": "read", "resource": "*.env", "effect": "deny" }
```

Chaque règle a une action, une ressource et un effet (`allow`, `ask` ou `deny`). Les règles sont lues dans l'ordre, et la dernière qui correspond l'emporte : c'est pour ça que `npm test` (autorisé) vient après `shell *` (sur demande).

Même demande, avec ces règles :

![Avec les règles, la commande rm est refusée et rien n'est supprimé](./res/limites_permissions_regles.png)

Question : un `deny` sur `rm *` suffit-il à empêcher toute suppression ?

::: details Réponse
Non. Il reste `find -delete`, `git clean -fdx`, `node -e "…"`, un script npm… Une liste noire se contourne toujours.

La règle sûre :

- `ask` par défaut pour le shell et les modifications ;
- une liste blanche courte de commandes inoffensives ;
- un conteneur (la dev-box, par exemple) : si tout part de travers, les dégâts restent dedans ;
- et Git, toujours : tout ce qui est commité se récupère.
:::

### Le dernier risque : vous

Le dernier risque ne se voit pas dans un `git diff`. C'est vous.

Relire un diff, repérer un test complaisant, une faille, une ambiguïté dans une demande : tout ça s'apprend en codant. Si l'agent écrit tout à votre place pendant votre formation, vous n'apprendrez jamais à le faire… et vous ne saurez pas juger son travail. Pour bien utiliser un agent, il faut savoir faire sans.

### Quand ne pas utiliser un agent ?

- Quand vous apprenez une notion.
- En évaluation (sauf autorisation explicite).
- Sur du code ou des données que vous n'avez pas le droit d'envoyer.
- Quand vous ne savez pas vérifier le résultat.

## Qui fait quoi ?

![Le modèle propose, l'agent exécute, vous validez](/cours/sources/agentic/img/slides_qui_fait_quoi.svg)

Si vous ne deviez retenir qu'une image, ce serait celle-là : le modèle propose, l'agent exécute, et c'est vous qui validez.

Ce que l'on attend de vous : lire et expliquer tout le code que vous livrez, le tester pour de vrai, savoir refuser une proposition et dire pourquoi, savoir dire ce que vous envoyez et à qui.

En épreuve comme en entretien d'embauche, vous serez seul face au code.

## Pour résumer

- Un agent, c'est un modèle dans une boucle : le modèle demande, l'agent (le harness) exécute, sur votre machine.
- Le modèle ne retient rien : tout le contexte est renvoyé à chaque tour, et ça se paie en tokens.
- La méthode : décrire, planifier, relire le diff, tester, commiter.
- Hallucinations, tests complaisants, données, injections, permissions : on relit tout, et on limite ce que l'agent a le droit de faire.
- Le code livré est le vôtre.

::: tip Pour aller plus loin
Tout ce qui est résumé ici se manipule dans les TP : [le principe](./principe.md), [l'utilisation](./utilisation.md), [les limites](./limites.md), et pour les plus curieux, [monter son propre proxy](./proxy.md).

👋 Si vous avez des questions, n'hésitez pas.
:::
