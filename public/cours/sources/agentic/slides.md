# Le développement agentique

## Principe, utilisation, limites

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Aujourd'hui, comment utilisez-vous l'IA pour coder ?

---

- Vous posez une question dans un chat.
- Vous copiez la réponse dans votre éditeur.
- Vous lancez, ça plante.
- Vous recollez l'erreur dans le chat… et on recommence.

---

## À votre avis

Dans ce scénario, qui fait le travail répétitif ?

---

## Vous.

Avec un chat, **vous êtes la boucle** : copier, coller, lancer, revenir.

---

## Depuis 2025

### L'agent de code

On ne lui demande plus un bout de code, on lui confie une **tâche** :

« Ajoute les codes promo au panier, avec les tests. »

---

## Le programme

1. **Le principe** : de quoi est fait un agent.
2. **L'utilisation** : le piloter sur un vrai projet.
3. **Les limites** : tout ce qui peut mal tourner.

---

# Le principe

---

## Un modèle de langage (LLM)

- On lui donne du texte, il produit **la suite**.
- Il ne lit pas vos fichiers.
- Il ne lance aucune commande.
- Il n'a **aucune mémoire** entre deux appels.

---

## Alors, comment un agent peut-il modifier mes fichiers ?

---

## Un agent = un modèle dans une boucle

![La boucle d'un agent](/cours/sources/agentic/img/principe_boucle.svg)

---

## La boucle, en quatre temps

1. L'agent envoie **tout le contexte** au modèle.
2. Le modèle **décide** : répondre, ou demander un outil.
3. L'agent **exécute** l'outil, sur votre machine.
4. Il ajoute le résultat au contexte… et on recommence.

---

## Autocomplétion, chat ou agent ?

![Autocomplétion, chat et agent](/cours/sources/agentic/img/principe_trois_outils.svg)

---

## Les mêmes modèles

Ce qui change : **qui agit**, et **ce que le modèle voit**.

Un agent va beaucoup plus vite… et vous voyez beaucoup moins ce qui se passe.

---

## Les briques d'un agent

- Le **modèle** (chez un fournisseur, par une API).
- Le **contexte** et sa fenêtre.
- Les **outils**.
- Les **permissions**.
- Les **instructions** : `AGENTS.md`.

---

## Un outil, c'est quoi ?

Une fonction **décrite** au modèle : un nom, une phrase, des paramètres.

```json
{
  "name": "read",
  "description": "Read the contents of a file",
  "parameters": {
    "properties": { "path": { "type": "string" } }
  }
}
```

---

## Question

Quand un agent « lance les tests », qui exécute `npm test` ?

---

## L'agent. Sur votre machine.

Le modèle n'a fait que **demander** l'appel.

Il ne voit que le résultat que l'agent lui renvoie.

---

## Les permissions

Puisque c'est l'agent qui exécute, c'est lui qui décide de ce qui est autorisé.

- Lire : oui.
- Modifier : sur demande.
- `git push` : jamais.

Dans OpenCode, par défaut… **tout est autorisé**. 🚨

---

## AGENTS.md

Les règles de la maison, à la racine du dépôt :

```markdown
# Boutique BTS

- Tous les montants sont des entiers en centimes.
- Lancez npm test après chaque modification.
```

Recopié **au début du contexte**, à chaque tour.

---

## À votre avis

Un `AGENTS.md` de 500 lignes, bonne idée ?

---

## Non.

- Il est renvoyé à **chaque tour** : des milliers de tokens payés à chaque appel.
- Autant de place en moins dans la fenêtre.
- Plus il y a de consignes, plus le modèle en oublie.

Court, et uniquement ce que le code ne dit pas.

---

## Ouvrons le capot

Chaque tour de boucle = **une requête HTTP** vers l'API du fournisseur.

```bash
POST /v1/chat/completions
```

---

## Deux tours de boucle

![Deux tours de boucle entre l'agent et le modèle](/cours/sources/agentic/img/slides_deux_tours.svg)

---

## Le signal

```json
"tool_calls": [{
  "function": { "name": "read",
    "arguments": "{\"path\": \"src/panier.js\"}" }
}],
"finish_reason": "tool_calls"
```

`tool_calls` : le modèle attend un outil. `stop` : c'est fini.

---

## Trois API pour la même chose

- **Chat Completions** (OpenAI) : OpenCode, pi, la plupart des serveurs.
- **Messages** (Anthropic) : Claude Code.
- **Responses** (OpenAI) : Codex.

Des messages, des outils, des appels d'outils : seuls les noms changent.

---

## Le proxy de la classe

![llm-proxy](/cours/sources/agentic/img/principe_proxy.svg)

---

## Question

Que se passe-t-il si l'agent renvoie le contenu d'un **autre** fichier que celui demandé ?

---

## Le modèle le croit.

Il n'a aucun moyen de vérifier.

Il fait **entièrement confiance** à ce qui entre dans son contexte.

Gardez cette idée pour plus tard… 😉

---

## Les tokens

- Des morceaux de mots : environ **4 caractères** par token.
- Tout se compte en tokens : la fenêtre, les quotas, le prix.
- **Entrée** (ce qu'on envoie) et **sortie** (ce qu'il produit, plus cher).

---

## Ce qu'un agent envoie vraiment

![Le contexte envoyé à chaque tour](/cours/sources/agentic/img/principe_contexte.svg)

---

## Ce qui frappe

- Votre demande : **moins de 1 %** du texte envoyé.
- Tout est **renvoyé à chaque tour**.
- Le contexte ne fait que **grossir**.

---

## Et quand la fenêtre est pleine ?

---

## La compaction

![La compaction du contexte](/cours/sources/agentic/img/principe_compaction.svg)

---

## Le résumé oublie

Vous aviez dit « le seuil de 50 € se calcule **après** la remise ».

Le résumé ne l'a pas gardé. 🚨

Une règle qui compte va dans `AGENTS.md`… ou dans **un test**.

---

## Combien ça coûte ?

Une après-midi d'agent : 150 tours, 40 000 tokens d'entrée par tour.

| Modèle | Une personne | Une classe de 30 |
|---|---|---|
| Claude Sonnet 5.5 | ~ 12,75 $ | ~ 380 $ |
| DeepSeek V4.1 Flash | ~ 1,89 $ | ~ 57 $ |

Pour **une seule** séance.

---

# L'utilisation

---

## OpenCode

- Un agent Open Source, dans le terminal.
- Des modèles **gratuits**, sans compte.
- Se branche sur presque n'importe quel fournisseur.
- Déjà dans la dev-box (avec Claude Code, Codex, pi…).

---

## OpenCode

![L'écran d'accueil d'OpenCode](/cours/sources/agentic/img/utilisation_opencode_accueil.png)

---

## D'où viennent les modèles ?

![Les fournisseurs de modèles](/cours/sources/agentic/img/utilisation_fournisseurs.svg)

---

## Règle n°1

La clé d'API ne va **jamais** dans un fichier du projet.

```bash
export LLM_PROXY_API_KEY="votre-cle"
```

```json
"apiKey": "{env:LLM_PROXY_API_KEY}"
```

---

## Pourquoi ?

Un fichier du projet → Git → GitLab → n'importe qui.

---

## Le terrain de jeu : la Boutique BTS

![La Boutique BTS](/cours/sources/agentic/img/utilisation_panier_avant.png)

---

## Avant de lancer l'agent ?

---

## On lit le code.

C'est **vous** qui allez juger le travail de l'agent.

Si vous ne connaissez pas le projet, vous ne verrez pas ce qu'il casse.

---

## La méthode

![La méthode en cinq étapes](/cours/sources/agentic/img/utilisation_methode.svg)

---

## Décrire

Une bonne demande à un agent = une bonne demande à un collègue.

- **Le quoi**, pas le comment.
- Des critères pour savoir **quand c'est fini**.
- « Chaque règle est testée. »

---

## Planifier

L'agent **Plan** lit et propose, sans modifier les fichiers.

![Une session OpenCode en mode Plan](/cours/sources/agentic/img/utilisation_opencode_session.png)

---

## Question

« Livraison offerte à partir de 50 €. »

Avant ou après la remise ?

---

## Personne ne l'a dit.

L'agent tranche presque toujours… **sans le dire**.

C'est une décision métier : à vous de la prendre, et de la faire tester.

---

## Relire le diff

```bash
git status
git diff
```

- Des fichiers modifiés que vous n'attendiez pas ?
- Une dépendance ajoutée ?
- Pour chaque ligne : pourquoi, et que se passerait-il sans ?

---

## Pas d'accord ?

On annule et on reformule, plutôt que d'empiler les corrections.

```bash
git restore .
```

Git est votre **filet de sécurité**.

---

## Tester, pour de vrai

- `npm test` : **vous-même**, pas « l'agent dit que ça passe ».
- Cassez volontairement une règle : un test doit devenir rouge.
- Puis à la main, dans la page : `BTS10`, `bts10`, un code inconnu…

---

## Commiter

- Un commit **par étape**.
- Le message, c'est **vous** qui l'écrivez.
- Il dit ce que **vous** avez validé.

---

# Les limites

---

## Tout s'est bien passé ?

Tant mieux.

Voyons maintenant tout ce qui peut mal tourner. 😈

---

## Les hallucinations

Un modèle produit le texte **le plus probable**, pas le texte **vrai**.

- Une fonction qui n'existe pas.
- Un paquet npm inventé (ou piégé).
- Une explication sûre d'elle… et fausse.

---

## La parade

- Lire la **sortie des outils**, pas seulement le résumé final.
- Vérifier dans la documentation officielle.
- Toute nouvelle dépendance se vérifie à la main.

---

## Du code qui marche, mais faux

```js
message.innerHTML = "Code inconnu : " + code;
```

Bon signe ?

---

## Une faille XSS.

Ce que tape l'utilisateur est injecté dans la page.

Le code de l'agent se relit **comme celui d'un inconnu**.

---

## Les tests complaisants

```js
assert.equal(summary(cart).shipping,
  cart.subtotal < 5000 ? 490 : 0);
```

Qu'en pensez-vous ?

---

## Il recopie la règle.

Si le code se trompe de seuil, le test se trompe pareil… et passe.

```js
assert.equal(summary(panierA4999).shipping, 490);
assert.equal(summary(panierA5000).shipping, 0);
```

Une valeur **écrite en dur**, et les **frontières**.

---

## La chasse aux mutants

![La chasse aux mutants](/cours/sources/agentic/img/slides_mutants.svg)

---

## Coût et quotas

![Requêtes par minute](/cours/sources/agentic/img/limites_quota.svg)

---

## Gratuit ?

Qu'avez-vous donné en échange ?

---

- Un **numéro de téléphone** (NVIDIA).
- Parfois **vos données** (certains modèles gratuits entraînent dessus).
- Une **dépendance** : gratuit « pour une durée limitée ».

Lisez les conditions, à chaque fois.

---

## Vos données partent chez un tiers

![Les données quittent votre machine](/cours/sources/agentic/img/limites_donnees.svg)

---

## Ce qui pose problème

- **Les secrets** : un `.env` lu = un secret compromis.
- **Le code de l'entreprise** : il ne vous appartient pas.
- **Les données personnelles** : c'est le RGPD.

---

## Vous vous souvenez ?

Le modèle croit **tout** ce qui entre dans son contexte.

---

## L'injection de prompt

![Une injection de prompt](/cours/sources/agentic/img/limites_injection.svg)

---

## Pour le modèle, tout est du texte

Votre demande, un fichier lu, une page web, un message d'erreur…

Aucune différence entre **une donnée** et **une consigne**.

Pas de parade parfaite : on limite les **dégâts possibles**.

---

## « Nettoie le projet »

![rm -rf test, sans rien demander](/cours/sources/agentic/img/limites_permissions_defaut.png)

---

## Les permissions

```json
{ "action": "shell", "resource": "*", "effect": "ask" },
{ "action": "shell", "resource": "npm test", "effect": "allow" },
{ "action": "shell", "resource": "rm *", "effect": "deny" },
{ "action": "read", "resource": "*.env", "effect": "deny" }
```

La **dernière** règle qui correspond l'emporte.

---

## Même demande, avec les règles

![La commande est refusée](/cours/sources/agentic/img/limites_permissions_regles.png)

---

## Question

Un `deny` sur `rm *` suffit-il à empêcher toute suppression ?

---

## Non.

`find -delete`, `git clean -fdx`, `node -e "…"`, un script npm…

Une liste noire se contourne **toujours**.

`ask` par défaut, une liste blanche courte, un conteneur, et **Git**.

---

## Le dernier risque

Il ne se voit pas dans un `git diff`.

---

## C'est vous.

Pour bien utiliser un agent… **il faut savoir faire sans**.

Relire un diff, repérer un test complaisant, une faille, une ambiguïté : ça s'apprend en codant.

---

## Quand ne pas utiliser un agent ?

- Quand vous **apprenez** une notion.
- En **évaluation** (sauf autorisation).
- Sur du code ou des données que vous n'avez **pas le droit d'envoyer**.
- Quand vous ne savez **pas vérifier** le résultat.

---

## Qui fait quoi ?

![Le modèle propose, l'agent exécute, vous validez](/cours/sources/agentic/img/slides_qui_fait_quoi.svg)

---

## Ce que l'on attend de vous

- **Lire** et **expliquer** tout le code que vous livrez.
- Le **tester** pour de vrai.
- **Refuser** une proposition, et dire pourquoi.
- Dire **ce que vous envoyez, et à qui**.

En épreuve comme en entretien : vous serez **seul face au code**.

---

## Récapitulatif

- Un agent = un modèle dans une boucle : il demande, l'agent exécute.
- Le modèle ne retient rien : tout le contexte est renvoyé, et ça se paie en tokens.
- La méthode : décrire, planifier, relire le diff, tester, commiter.
- Hallucinations, tests complaisants, données, injections, permissions : on relit tout.
- Le code livré est **le vôtre**.

---

## Des questions ?

Place au TP 🚀
