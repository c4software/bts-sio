---
description: "Le développement agentique, le principe : ce qu'est un agent de code (un modèle de langage dans une boucle qui lit, décide, appelle des outils), le harness qui l'entoure et ce qui le distingue d'un chat, ses briques (modèle, contexte, outils, permissions, AGENTS.md), les API qui le relient au modèle et ce que coûtent les tokens."
---

# Le développement agentique : le principe

::: details Sommaire
[[toc]]
:::

Vous avez probablement déjà posé une question de code à ChatGPT, au Chat de Mistral ou à Claude, puis recopié la réponse dans votre éditeur. Ça fonctionne, mais les allers-retours, c'est vous qui les faites. Depuis 2025, une autre manière de travailler s'est installée chez les développeurs : l'**agent de code**. On ne lui demande plus un bout de code, on lui confie une tâche (« ajoute les codes promo au panier, avec les tests »), et c'est lui qui ouvre les fichiers, les modifie, lance les tests et recommence jusqu'à ce que ce soit fini.

Cette série de trois TP fait le tour du sujet :

1. **le principe** (ce TP) : ce qu'est un agent, de quoi il est fait, et ce qui circule réellement entre lui et le modèle ;
2. [l'utilisation](./utilisation.md) : installer un agent, le brancher sur un modèle gratuit, et le faire travailler sur un vrai petit projet avec une méthode ;
3. [les limites](./limites.md) : tout ce qui peut mal tourner, et ce que l'on attend de vous en tant que développeur.

Les notions de la série sont aussi résumées dans [les slides du cours](/cours/agentic.md).

Il n'y aura pas d'installation ici : on démonte la machine pour voir comment elle tourne. Ça vous servira la prochaine fois qu'un agent fera un truc surprenant, parce que ça arrivera.

::: tip Merci à AMD University
Les modèles que nous utilisons dans cette série sont en partie mis gratuitement à disposition des étudiants par [AMD](https://www.amd.com/en/corporate/university-program.html), dans le cadre de son programme universitaire. Un grand merci à AMD University pour sa contribution à ce cours.
:::

## Prérequis

- Savoir ouvrir un terminal et y lancer une commande.
- Les bases de Git (`git status`, `git diff`, `git commit`), vues dans [l'initiation à Git](/tp/git_initiation/).
- Avoir déjà utilisé un assistant IA en mode « chat ».
- Pour la partie pratique (facultative mais conseillée) : `curl` et `jq` (ils sont déjà dans la [dev-box](/cheatsheets/dev-box/)), et l'adresse et la clé du proxy de la classe, fournies par votre enseignant.

## Objectifs

À la fin de ce TP vous saurez :

- expliquer ce qu'est un agent de code : un modèle de langage dans une boucle ;
- expliquer ce qu'est un **harness**, et pourquoi un chat et un agent peuvent utiliser exactement le même modèle ;
- faire la différence entre l'autocomplétion, un chat et un agent ;
- nommer les briques d'un agent : le modèle, le contexte et sa fenêtre, les outils, les permissions, les fichiers d'instructions comme `AGENTS.md` ;
- lire une requête et une réponse de l'API d'un modèle, et reconnaître un appel d'outil ;
- citer les trois API que vous croiserez (OpenAI Chat Completions, Anthropic Messages, OpenAI Responses) ;
- estimer ce que coûte une tâche confiée à un agent, en tokens et en euros.

## Un agent, c'est quoi ?

Un **modèle de langage** (un LLM : GPT, Claude, Mistral, Qwen, Nemotron…) ne sait faire qu'une seule chose. On lui donne du texte, il écrit la suite. Il ne lit pas vos fichiers, il ne lance aucune commande, et il n'a aucune mémoire entre deux appels.

Un **agent de code**, c'est un programme (OpenCode, Claude Code, Codex, pi…) qui place ce modèle dans une boucle :

![La boucle d'un agent : votre demande part au modèle avec le contexte ; le modèle décide de répondre ou de demander un appel d'outil ; l'agent exécute l'outil sur votre machine (read, edit, shell) ; il lit le résultat, l'ajoute au contexte et recommence ; quand le modèle ne demande plus d'outil, sa réponse finale vous est affichée](./res/principe_boucle.svg)

1. L'agent envoie au modèle tout le **contexte** : ses propres consignes, votre demande, la liste des outils disponibles et tout ce qui s'est passé jusque-là.
2. Le modèle **décide** : soit il répond, soit il demande d'appeler un outil (« lis le fichier `src/panier.js` »).
3. L'agent **exécute** l'outil, sur votre machine. Lire un fichier, en modifier un, lancer `npm test`…
4. Il **lit le résultat**, l'ajoute au contexte, et on repart au point 1.

La boucle s'arrête quand le modèle répond sans réclamer d'outil. Une petite tâche la fait tourner quelques fois. Une grosse, des dizaines.

Question :

- Le modèle « sait-il » qu'il a modifié un fichier au tour précédent ? Comment ?

::: details Réponse
Le modèle, lui, ne se souvient de rien : chaque appel repart de zéro. S'il « sait » qu'il a modifié un fichier, c'est uniquement parce que l'agent lui **renvoie tout l'historique** à chaque tour, sa demande de modification comprise, suivi du résultat de l'outil (« fichier modifié »). Toute la mémoire de l'agent tient dans ce texte renvoyé à chaque fois. Retenez-le bien, c'est la clé de la partie sur les tokens.
:::

### Le modèle et le harness

Dans cette boucle, il y a deux pièces bien distinctes :

- le **modèle**, qui tourne chez un fournisseur et ne fait que produire du texte ;
- tout le reste, qui tourne sur votre machine, et qu'on appelle le **harness**.

Le mot vient de l'anglais, le harnais, ce qui permet d'atteler un cheval et de diriger sa force. C'est le terme que vous retrouverez partout dans la documentation des agents. Le harness, c'est concrètement le programme que vous installez quand vous installez OpenCode ou Claude Code :

![Le harness tourne sur votre machine : la boucle, le prompt système avec AGENTS.md, les outils décrits au modèle et exécutés sur place, les permissions, la gestion du contexte (historique, compaction) et l'interface (terminal, diffs, validations). Il lit, modifie et lance des commandes dans votre projet. Il parle au modèle, chez le fournisseur, par une API HTTP : il envoie le contexte et la liste des outils, il reçoit du texte ou un appel d'outil. Le modèle lit du texte et produit la suite, n'exécute rien et ne retient rien ; il est interchangeable](./res/principe_harness.svg)

Le modèle apporte l'intelligence, si l'on peut dire : comprendre la demande, choisir le bon outil, écrire le code. Le harness apporte tout le reste, tout ce qui transforme cette intelligence en actions, la boucle, les consignes, les outils et leur exécution, les garde-fous, la gestion de la mémoire, l'affichage. Nous détaillons chacune de ces briques [un peu plus bas](#les-briques-d-un-agent).

Les deux se changent indépendamment.

Changer de modèle tient dans une ligne de configuration : le même OpenCode peut travailler avec Qwen, Nemotron ou Claude. Changer de harness, c'est changer d'agent, et là les choses bougent vraiment. Avec le même modèle, OpenCode, Claude Code et Codex n'envoient pas les mêmes consignes, ne proposent pas les mêmes outils et ne compactent pas de la même façon. Leurs résultats non plus ne se ressemblent pas.

Question :

- Un camarade affirme : « Claude Code est meilleur qu'OpenCode, parce que son modèle est meilleur. » Qu'est-ce qui est vrai, qu'est-ce qui est faux dans cette phrase ?

::: details Réponse
Il mélange les deux pièces. Claude Code et OpenCode sont deux **harness**, ni l'un ni l'autre n'est un modèle. OpenCode peut d'ailleurs très bien utiliser les modèles Claude, et Claude Code se brancher sur d'autres modèles via un proxy. Pour comparer honnêtement les deux, il faut leur donner le même modèle et la même tâche : les différences qui restent viennent alors du harness, de ses consignes, de ses outils, de ses permissions, de sa façon de gérer le contexte. Et pour comparer deux modèles entre eux, c'est l'inverse, on garde le même harness.
:::

## Autocomplétion, chat ou agent ?

Les trois utilisent les mêmes modèles. Ce qui change, c'est qui agit, et ce que le modèle voit :

![Comparaison en trois colonnes. L'autocomplétion propose la suite de la ligne, voit le fichier ouvert, et c'est vous qui acceptez avec Tab. Le chat répond par du texte, ne voit que ce que vous collez, et c'est vous qui copiez, collez et lancez. L'agent lit, modifie et lance des commandes en boucle, voit le projet entier et la sortie de ses commandes, et c'est lui qui agit, avec vos permissions, pendant que vous relisez](./res/principe_trois_outils.svg)

Avec un chat, c'est vous, la boucle. Vous copiez le code, vous le lancez, vous revenez avec le message d'erreur. Avec un agent, le programme fait ces allers-retours à votre place. Il va beaucoup plus vite, et en échange vous voyez beaucoup moins ce qui se passe. C'est exactement pourquoi il faut comprendre la mécanique.

Question :

- Vous demandez à un chat : « mon test `formatPrice` échoue, pourquoi ? ». Il ne peut répondre qu'à partir de ce que vous lui avez collé. Que ferait un agent avec la même phrase ?

::: details Réponse
Il irait chercher lui-même ce qui lui manque. Lire le fichier de test, lire `src/panier.js`, lancer `npm test` pour récupérer l'erreur exacte, puis proposer la correction, ou la faire directement, et relancer les tests derrière. Plusieurs tours de boucle, sans que vous ayez rien copié du tout.
:::

Voici les deux déroulés côte à côte. Regardez qui apparaît le plus souvent dans chaque colonne :

![La même demande, « mon test formatPrice échoue, pourquoi ? », traitée de deux façons. Avec un chat, vous êtes la boucle : vous collez la question et le test, le chat demande src/panier.js, vous le copiez, il propose une correction, vous la recopiez et lancez npm test, vous collez la nouvelle erreur, et ainsi de suite ; le modèle ne voit que ce que vous collez. Avec un agent, le harness est la boucle : vous tapez la phrase une seule fois, puis le modèle demande read tests/panier.test.js, shell npm test (l'erreur exacte), read src/panier.js, edit src/panier.js, shell npm test (tout passe), et vous recevez une explication et un diff à relire](./res/principe_chat_agent.svg)

Le modèle peut être strictement le même des deux côtés. Ce qui change, c'est ce qui l'entoure : dans le cas du chat, c'est vous qui jouez le rôle du harness, à la main.

Question :

- ChatGPT, Le Chat ou Claude.ai savent aujourd'hui chercher sur le web, et même exécuter du code Python pour faire un calcul ou un graphique. Ce sont donc des agents ?

::: details Réponse
Une application de chat a elle aussi un harness : un prompt système, l'historique de la discussion renvoyé à chaque message, et parfois quelques outils, la recherche web, l'exécution de code. La frontière est donc moins nette qu'elle n'en a l'air.

Mais regardez **où** s'exécutent ces outils et **ce qu'ils peuvent atteindre**. Ils tournent sur les serveurs du fournisseur, dans un bac à sable jetable. Ils ne voient ni votre projet, ni votre terminal, ni votre base de données. Pour votre code, c'est toujours vous qui faites les allers-retours.

Un agent de code, lui, a des outils qui agissent sur votre projet (lire, modifier, lancer les tests, utiliser Git), et une boucle qui tourne jusqu'à ce que la tâche soit finie. Certains agents tournent d'ailleurs dans le cloud, Codex dans le navigateur, Claude Code sur le web : ils clonent votre dépôt dans une machine distante, mais c'est bien le même principe, un harness avec des outils branchés sur votre projet.

Pour situer un outil d'IA, posez-vous trois questions : quels outils a-t-il ? Où s'exécutent-ils ? Qui fait tourner la boucle ?
:::

## Les harness du moment

Il existe des dizaines de harness, et il en sort de nouveaux chaque mois. Ils se rangent en trois familles, selon l'endroit où vous les utilisez.

::: warning Relevé le 14 novembre 2026
Ce paysage change très vite : des outils sont renommés, rachetés ou arrêtés en quelques mois. Par exemple, Gemini CLI a été remplacé par Antigravity CLI pour les comptes individuels le 18 juin 2026, Windsurf est devenu Devin Desktop le 2 juin 2026, et Roo Code a fermé en mai. Vérifiez sur le site de l'éditeur avant de vous lancer.
:::

### Dans le terminal

| Harness | Éditeur | Modèles | Code source |
|---|---|---|---|
| **OpenCode** (celui de cette série) | Anomaly | plus de 75 fournisseurs, modèles locaux | ouvert (MIT) |
| **Claude Code** | Anthropic | Claude (d'autres par un proxy) | fermé |
| **Codex** | OpenAI | OpenAI d'abord, d'autres possibles | ouvert (Apache 2.0) |
| **Copilot CLI** | GitHub | le catalogue Copilot, ou votre clé | fermé |
| **Antigravity CLI** (`agy`) | Google | Gemini | fermé |
| **Mistral Vibe** | Mistral AI | Mistral (Devstral) | ouvert (Apache 2.0) |
| **Qwen Code** | Alibaba | Qwen d'abord, d'autres possibles | ouvert (Apache 2.0) |
| **Kimi Code** | Moonshot AI | Kimi d'abord, d'autres possibles | ouvert (MIT) |
| **pi** | Earendil | multi-fournisseurs, modèles locaux | ouvert (MIT) |
| **goose** | Linux Foundation (créé par Block) | multi-fournisseurs, modèles locaux | ouvert (Apache 2.0) |
| **Crush** | Charm | multi-fournisseurs | code source consultable |

Vous croiserez aussi le nom d'**Aider**, l'un des tout premiers agents de code en terminal (2023), aujourd'hui peu maintenu.

### Dans l'éditeur

| Harness | Éditeur | Où |
|---|---|---|
| **GitHub Copilot** (mode agent) | GitHub | VS Code, JetBrains, Visual Studio… |
| **Cursor** | Cursor | son propre éditeur, dérivé de VS Code |
| **Cline** | Cline | extension VS Code et JetBrains, ouverte |
| **Kilo Code** | Kilo | extension VS Code et JetBrains, ouverte |
| **Junie** | JetBrains | les IDE JetBrains (PhpStorm, IntelliJ…) |
| **Kiro** | AWS | son propre éditeur |
| **Devin Desktop** (ex-Windsurf) | Cognition | son propre éditeur |
| **Zed** | Zed Industries | agent intégré à l'éditeur, qui peut aussi accueillir d'autres agents |

### Dans le cloud

Vous confiez une tâche, souvent une issue GitHub, et l'agent travaille seul dans une machine distante qui a cloné votre dépôt. Il vous rend une **pull request** à relire :

- **Codex** dans le navigateur (OpenAI) ;
- **Claude Code** sur le web (Anthropic) ;
- l'**agent de code de GitHub Copilot**, à qui l'on assigne une issue ;
- **Devin** (Cognition) ;
- **OpenHands**, ouvert, que l'on peut héberger soi-même.

Beaucoup d'outils existent sous plusieurs formes : Claude Code, Codex et Copilot ont chacun une version terminal, une extension d'éditeur et une version cloud. C'est le même harness avec une autre interface.

Questions :

- Pourquoi cette série utilise-t-elle OpenCode plutôt que Claude Code ou Copilot ?
- Quelle famille de harness vous laisse le moins voir ce qui se passe pendant le travail ?

::: details Réponse
- OpenCode est ouvert : on peut lire son code et voir ce qu'il envoie au modèle. Et il est multi-fournisseurs, donc il se branche sur le proxy de la classe, sur des modèles gratuits (NVIDIA, AMD) ou sur un modèle local, sans abonnement. Les notions que vous y apprenez, la boucle, les outils, les permissions, `AGENTS.md`, se retrouvent à l'identique ailleurs.
- Le cloud. L'agent travaille seul sur une machine distante et vous ne voyez que le résultat final, la pull request. C'est pratique, mais la relecture du diff devient votre seul contrôle.
:::

## Les briques d'un agent

Un agent, c'est un modèle et un harness. Voyons chaque brique en détail, le modèle d'abord, puis tout ce que le harness lui ajoute.

### Le modèle

C'est le cerveau, si vous préférez : il lit le contexte et produit la suite. Il tourne rarement sur votre machine, il faudrait pour ça une très grosse carte graphique, mais chez un **fournisseur** : OpenAI, Anthropic, Mistral, NVIDIA, AMD, ou le serveur de votre établissement. L'agent lui parle par une **API** HTTP, que nous verrons plus bas.

Un même agent peut donc utiliser des modèles très différents. Un modèle plus gros fait en général moins d'erreurs, mais il coûte plus cher et répond plus lentement.

### Le contexte et la fenêtre de contexte

Le **contexte**, c'est tout le texte envoyé au modèle à un tour donné. Le modèle ne peut en lire qu'une quantité limitée, c'est sa **fenêtre de contexte**, mesurée en tokens, de 32 000 à plus d'un million selon les modèles.

Chaque fichier lu, chaque sortie de commande, chaque réponse s'ajoute au contexte. Une longue session finit donc par remplir la fenêtre, et l'agent doit alors **compacter** son contexte. Nous le verrons [un peu plus bas](#un-contexte-limite-la-compaction).

### Les outils

Un **outil**, c'est une fonction que l'agent sait exécuter et qu'il décrit au modèle : un nom, une phrase d'explication, et les paramètres attendus, au format JSON Schema. Voici la définition de l'outil `read` qu'OpenCode envoie au modèle, un peu raccourcie :

```json
{
  "type": "function",
  "function": {
    "name": "read",
    "description": "Read the contents of a file or directory. [...]",
    "parameters": {
      "type": "object",
      "properties": {
        "path": { "type": "string", "description": "File or directory to read" },
        "offset": { "type": "integer", "minimum": 0 }
      }
    }
  }
}
```

OpenCode en déclare une douzaine : `read`, `edit`, `write`, `glob`, `grep`, `shell`, `webfetch`, `websearch`… Le modèle, lui, n'exécute jamais rien. Il demande un appel (« `read` avec `path` = `src/panier.js` ») et c'est l'agent qui l'exécute.

### Les permissions

Puisque c'est l'agent qui exécute, c'est aussi lui qui décide de ce qui est autorisé : lire oui, modifier sur demande, `git push` jamais. Ce sont les **permissions**. Chaque agent a les siennes, avec des valeurs par défaut plus ou moins prudentes.

::: warning Lisez les réglages par défaut
Dans OpenCode, la règle de base est « tout est autorisé », sauf la lecture des fichiers `.env` qui demande votre accord ([documentation des permissions](https://opencode.ai/docs/permissions/)). Ce que cela permet, et comment le restreindre, est démontré dans [le TP sur les limites](./limites.md#des-permissions-trop-larges).
:::

### Les fichiers d'instructions : AGENTS.md

Le modèle ne connaît pas votre projet. Pour lui donner les règles de la maison, comment lancer les tests, les conventions de nommage, ce qu'il ne faut pas toucher, on écrit un fichier **`AGENTS.md`** à la racine du dépôt. C'est un [format ouvert](https://agents.md/), reconnu par la plupart des agents. Claude Code lit plutôt `CLAUDE.md` ; OpenCode lit `AGENTS.md`, et `CLAUDE.md` à défaut.

L'agent recopie ce fichier au début du contexte, à chaque tour. Voici ce qu'OpenCode a réellement envoyé au modèle avec un `AGENTS.md` de deux lignes dans le projet, à la fin du message « system » :

```text
Instructions from: /root/bts-panier/AGENTS.md
# Boutique BTS

- Tous les montants sont des entiers en centimes.
- Lancez npm test après chaque modification.
```

Questions :

- Pourquoi est-il préférable d'écrire une règle dans `AGENTS.md` plutôt que de la répéter dans chaque demande ?
- Que risque-t-on avec un `AGENTS.md` de 500 lignes ?

::: details Réponse
- La règle est appliquée à chaque session, par chaque membre de l'équipe, sans que personne ait à y penser. Et comme elle est versionnée avec le code, elle évolue avec le projet.
- Il est renvoyé à chaque tour. 500 lignes, ce sont des milliers de tokens payés à chaque appel, et autant de place en moins dans la fenêtre de contexte. Ajoutez à ça qu'un modèle a d'autant plus tendance à oublier une consigne qu'il en reçoit davantage. Un bon `AGENTS.md` est court et ne dit que ce que le modèle ne peut pas deviner en lisant le code.
:::

## Ce qui circule entre l'agent et le modèle

Ouvrons le capot. Chaque tour de boucle est une requête HTTP vers l'API du fournisseur.

### Une requête, une réponse

Le format le plus répandu est celui d'OpenAI, **Chat Completions** (`POST /v1/chat/completions`). La requête contient le modèle, la liste des messages avec leur rôle (`system`, `user`, `assistant`, `tool`) et la liste des outils :

```json
{
  "model": "nvidia/nemotron-3.5-lightning-30b-a3b",
  "messages": [
    { "role": "system", "content": "Tu es un agent de code. [...]" },
    { "role": "user", "content": "Que fait la fonction subtotal du fichier src/panier.js ?" }
  ],
  "tools": [ { "type": "function", "function": { "name": "read", "...": "..." } } ]
}
```

Quand le modèle veut un outil, il ne répond pas par du texte mais par un appel d'outil, et le `finish_reason` vaut `tool_calls` :

```json
{
  "message": {
    "role": "assistant",
    "content": null,
    "tool_calls": [
      {
        "id": "call_9",
        "type": "function",
        "function": { "name": "read", "arguments": "{\"path\": \"src/panier.js\"}" }
      }
    ]
  },
  "finish_reason": "tool_calls"
}
```

L'agent lit alors le fichier, puis renvoie toute la conversation augmentée de deux messages : l'appel du modèle, et un message `tool` qui porte le résultat, avec le même `id`. Au tour suivant le modèle a le contenu du fichier sous les yeux et peut répondre. `finish_reason` vaut alors `stop`, la boucle s'arrête.

### Trois API pour la même chose

Vous en croiserez trois. Elles disent toutes la même chose, des messages, des outils, des appels d'outils, avec des noms différents :

| | OpenAI Chat Completions | Anthropic Messages | OpenAI Responses |
|---|---|---|---|
| Adresse | `POST /v1/chat/completions` | `POST /v1/messages` | `POST /v1/responses` |
| Utilisée par | OpenCode, pi, la plupart des serveurs | Claude Code | Codex |
| Consignes de l'agent | un message `role: "system"` | un champ `system` à part | un champ `instructions` |
| Outil décrit par | `parameters` | `input_schema` | `parameters` |
| Appel d'outil rendu | `tool_calls` dans le message | un bloc `tool_use` | un élément `function_call` |
| Résultat renvoyé | un message `role: "tool"` | un bloc `tool_result` | un élément `function_call_output` |
| Clé envoyée dans | `Authorization: Bearer` | `x-api-key` | `Authorization: Bearer` |

Documentation officielle : [Chat Completions](https://platform.openai.com/docs/api-reference/chat), [Messages](https://docs.claude.com/en/api/messages), [Responses](https://platform.openai.com/docs/api-reference/responses).

Voici la même demande, « lis `src/panier.js` » avec un outil `read`, et ce que rendent réellement les trois API. On a gardé uniquement l'appel d'outil :

```jsonc
// Chat Completions
"tool_calls": [{ "id": "call_9", "type": "function",
  "function": { "name": "read", "arguments": "{\"path\": \"src/panier.js\"}" } }]

// Anthropic Messages
"content": [{ "type": "tool_use", "id": "call_11", "name": "read",
  "input": { "path": "src/panier.js" } }]

// OpenAI Responses
"output": [{ "type": "function_call", "call_id": "call_12", "name": "read",
  "arguments": "{\"path\": \"src/panier.js\"}" }]
```

::: tip Que se passe-t-il derrière ? Le proxy de la classe
Dans cette série, vos agents passent par [llm-proxy](https://github.com/c4software/llm-proxy), le proxy de votre enseignant. Il met plusieurs fournisseurs derrière une seule adresse et laisse chaque agent parler sa propre API :

![llm-proxy au centre : à gauche OpenCode et pi parlent /v1/chat/completions, Claude Code /v1/messages et Codex /v1/responses ; le proxy vérifie la clé du client, traduit Anthropic et Responses en chat/completions, lit le préfixe du modèle pour choisir le backend, remplace la clé par celle du backend et compte les requêtes et les tokens ; à droite, trois backends (nvidia, albert, un PC local) reçoivent tous du chat/completions](./res/principe_proxy.svg)

- Le **préfixe du nom de modèle** choisit le backend : `nvidia/nvidia/nemotron-3.5-lightning-30b-a3b` part chez NVIDIA, et le proxy retire `nvidia/` au passage.
- Les requêtes Anthropic (`/v1/messages`) et Responses (`/v1/responses`) sont traduites en Chat Completions : aucun backend n'a besoin de parler les trois.
- La clé du fournisseur ne vit que dans le proxy. Vous n'avez que la clé du proxy.

Nous l'avons vérifié en envoyant le même « Bonjour » par les trois API : le backend a reçu trois fois une requête `/v1/chat/completions`, avec le préfixe retiré (`"model": "agent-demo"` au lieu de `demo/agent-demo`).
:::

Question :

- Codex parle l'API Responses. Le proxy de la classe la traduit vers des backends qui ne connaissent que Chat Completions. Avec OpenAI, l'API Responses peut garder la conversation côté serveur (`previous_response_id`) ; le proxy, lui, répond `400` : « ce proxy ne conserve rien, renvoyer l'historique dans `input` ». Pourquoi est-ce cohérent avec ce que vous savez du modèle ?

::: details Réponse
Le modèle n'a aucune mémoire, donc quelqu'un doit renvoyer tout l'historique à chaque tour. Soit c'est le serveur du fournisseur qui le garde et le recolle, c'est ce que fait OpenAI avec `previous_response_id`, soit c'est le client. Le proxy a fait le choix de ne rien stocker : c'est donc à l'agent de tout renvoyer, comme il le fait déjà avec Chat Completions.
:::

### À vous de jouer : faire tourner la boucle à la main

Pour vraiment comprendre, rien ne vaut le fait de jouer soi-même le rôle de l'agent. Votre enseignant vous donne l'adresse du proxy, une clé et un nom de modèle. Ne les écrivez jamais en dur dans un fichier : mettez-les dans des variables d'environnement, le temps de la session.

```bash
export LLM_PROXY_URL="https://adresse-donnee-par-l-enseignant"
export LLM_PROXY_API_KEY="votre-cle"
```

Vérifiez d'abord que le proxy vous répond, en listant les modèles :

```bash
curl -s -H "Authorization: Bearer $LLM_PROXY_API_KEY" "$LLM_PROXY_URL/v1/models" | jq -r '.data[].id'
```

Récupérez ensuite le [petit projet du TP suivant](/demo/agentic/bts-panier.zip), décompressez-le et placez-vous dans son dossier. Créez un fichier `tour1.json`, en remplaçant `MODELE` par le nom donné par votre enseignant :

```json
{
  "model": "MODELE",
  "messages": [
    { "role": "system", "content": "Tu es un agent de code. Pour lire un fichier du projet, appelle l'outil read." },
    { "role": "user", "content": "Que fait la fonction subtotal du fichier src/panier.js ?" }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "read",
        "description": "Lit un fichier du projet et renvoie son contenu",
        "parameters": {
          "type": "object",
          "properties": { "path": { "type": "string", "description": "Chemin du fichier" } },
          "required": ["path"]
        }
      }
    }
  ]
}
```

Premier tour : envoyez-le au modèle.

```bash
curl -s "$LLM_PROXY_URL/v1/chat/completions" \
  -H "Authorization: Bearer $LLM_PROXY_API_KEY" \
  -H "Content-Type: application/json" \
  -d @tour1.json | tee reponse1.json | jq '.choices[0]'
```

Si tout va bien, le modèle ne répond pas à la question. Il demande l'outil `read`. Vérifiez le chemin qu'il réclame dans `arguments`, puis jouez l'outil : c'est vous qui lisez le fichier et qui renvoyez son contenu. La commande ci-dessous ajoute à la conversation l'appel du modèle et un message `tool` avec le contenu de `src/panier.js` :

```bash
jq --slurpfile r reponse1.json --rawfile code src/panier.js \
  '.messages += [$r[0].choices[0].message,
     {"role": "tool", "tool_call_id": $r[0].choices[0].message.tool_calls[0].id, "content": $code}]' \
  tour1.json > tour2.json
```

Deuxième tour :

```bash
curl -s "$LLM_PROXY_URL/v1/chat/completions" \
  -H "Authorization: Bearer $LLM_PROXY_API_KEY" \
  -H "Content-Type: application/json" \
  -d @tour2.json | jq '.choices[0].message.content, .choices[0].finish_reason, .usage'
```

Questions :

- Quel est le `finish_reason` au premier tour ? Et au second ?
- Comparez `usage.prompt_tokens` entre les deux tours. Pourquoi a-t-il augmenté ?
- Que se passerait-il si vous renvoyiez dans le message `tool` le contenu d'un autre fichier que celui demandé ?

::: details Réponse
- Premier tour : `tool_calls`, le modèle attend le résultat d'un outil. Second tour : `stop`, il a répondu et la boucle est finie.
- Au second tour, vous avez renvoyé toute la conversation plus le contenu de `src/panier.js`. Il y a beaucoup plus de texte en entrée, donc plus de tokens.
- Le modèle n'a aucun moyen de le vérifier. Il croit ce que l'agent lui dit et répondra à partir de ce faux contenu sans sourciller. Le modèle fait entièrement confiance à ce qui entre dans son contexte. Gardez cette idée pour [les injections de prompt](./limites.md#les-injections-de-prompt).
:::

::: tip Point de contrôle
Vous avez fait tourner deux tours de boucle à la main : un appel d'outil (`finish_reason` à `tool_calls`), le résultat renvoyé dans un message `tool`, puis une réponse finale (`finish_reason` à `stop`) qui explique ce que fait `subtotal`. Un agent ne fait rien d'autre, simplement beaucoup plus vite et des dizaines de fois de suite.

Pas de clé, ou le proxy ne répond pas ? Pas de panique : lisez la suite, les exemples ci-dessus montrent des réponses réelles.
:::

## Les tokens

### Un token ?

Un modèle ne lit pas des caractères mais des **tokens**, des morceaux de mots. « Bonjour » peut être un seul token, « anticonstitutionnellement » plusieurs. En moyenne, comptez environ 4 caractères par token, un peu moins en français qu'en anglais, et beaucoup moins pour du code plein de symboles.

Tout se compte en tokens : la taille de la fenêtre de contexte, les limites de débit, et le prix. Et on distingue toujours deux sens :

- les tokens d'**entrée** (*input*, *prompt*) : tout ce qui est envoyé au modèle ;
- les tokens de **sortie** (*output*, *completion*) : ce qu'il produit, plusieurs fois plus chers.

### Ce qu'un agent envoie vraiment

Nous avons mesuré ce qu'OpenCode 2.2.6 envoie au modèle quand on lui demande, sur le petit projet du TP suivant, « Ajoute des codes promo au panier. Commence par lire le code et propose-moi un plan. ». Il lit un fichier, lance les tests, puis répond :

![Trois barres empilées, une par tour. Tour 1 : les consignes de l'agent (environ 9 000 caractères) et la définition de 12 outils (environ 14 000 caractères), plus la demande de 114 caractères, soit environ 5 800 tokens. Tour 2 : la même chose plus l'appel de read et le contenu du fichier, environ 6 200 tokens. Tour 3 : en plus l'appel de shell et la sortie de npm test, environ 6 500 tokens. Le modèle ne retient rien d'un tour à l'autre : tout le début est renvoyé à chaque fois, soit environ 18 500 tokens d'entrée pour une demande de 114 caractères](./res/principe_contexte.svg)

Ce qui frappe :

- votre demande pèse moins de 1 % du texte envoyé. L'essentiel, ce sont les consignes de l'agent et la description de ses outils ;
- tout est renvoyé à chaque tour, trois tours c'est trois fois les 23 000 caractères de départ ;
- le contexte ne fait que grossir au fil de la session.

::: tip Que se passe-t-il derrière ? Le cache
Comme le début du contexte ne change pas d'un tour à l'autre, beaucoup de fournisseurs le gardent en **cache** et facturent ces tokens « déjà vus » bien moins cher. C'est pour ça que les agents évitent de modifier le début de la conversation. llm-proxy, lui, ne cache rien, mais il veille à ne pas casser le cache des serveurs qui sont derrière (il le mesure : colonne *Cache* de son tableau de bord).
:::

### Un contexte limité : la compaction

Le contexte grossit à chaque tour, la fenêtre, elle, ne grandit pas. Que fait l'agent quand elle est presque pleine ? Il ne peut pas simplement couper le début, il perdrait la demande de départ et le modèle ne saurait plus ce qu'il est en train de faire.

Il **compacte**. Quand le contexte approche de la limite, et le seuil dépend de l'agent, il fait une pause dans la tâche et envoie au modèle une demande spéciale : « Résume cette conversation : le but, ce qui a été fait, les décisions prises, les fichiers modifiés, ce qu'il reste à faire. » Puis il repart de ce résumé, l'historique complet étant remplacé par le résumé et les tout derniers échanges. Les consignes de l'agent, la définition des outils et `AGENTS.md`, eux, sont toujours renvoyés tels quels.

![Deux barres sur une fenêtre de 32 768 tokens. Au tour 14, les consignes (environ 5 800 tokens) et un long historique de 13 tours (fichiers lus, sorties de commandes) atteignent environ 27 800 tokens et dépassent le seuil de compaction, ici 80 %. L'agent demande au modèle de résumer l'historique. Au tour 15, il ne reste que les consignes, le résumé et les derniers échanges, environ 9 300 tokens : de la place pour continuer. Ce qui n'est pas dans le résumé est perdu, comme le contenu exact des fichiers lus ou une consigne donnée en route](./res/principe_compaction.svg)

#### Un exemple

Reprenons la tâche du TP suivant : vous demandez à l'agent d'ajouter la livraison et les codes promo au panier de la Boutique BTS. En route, vous lui précisez deux choses : « les prix sont en centimes, pas en euros », puis « le seuil de 50 € de la livraison offerte se calcule **après** la remise ». L'agent lit `src/panier.js`, `src/catalogue.js`, la page, il lance les tests plusieurs fois, se trompe sur un arrondi, corrige… Treize tours plus tard, la fenêtre est presque pleine.

Voici le genre de résumé qu'il produit pour repartir :

```text
Objectif : livraison (4,90 €, offerte dès 50 €) et codes promo
           (BTS10 : -10 % du sous-total, LIVRAISON : livraison offerte).
Fait : calcul de la remise et de la livraison dans src/panier.js ;
       5 tests ajoutés dans test/panier.test.js, tous verts.
Décisions : les montants restent en centimes (entiers).
Reste à faire : champ « Code promo » sur la page, message pour un code inconnu.
```

Comparez avec ce que vous aviez dit. « Les prix sont en centimes » a survécu, mais « le seuil se calcule après la remise » a disparu. Si l'agent retouche le calcul pour brancher la page, rien ne l'empêche de comparer le seuil au sous-total avant remise : un panier de 50,60 € avec `BTS10`, soit 45,54 € après remise, aurait alors la livraison offerte, à tort. Et le contenu exact des fichiers lus n'est plus dans le contexte. S'il en a besoin, il devra les relire, donc payer de nouveaux tokens.

Questions :

- Pourquoi l'agent ne se contente-t-il pas de supprimer les premiers messages de l'historique ?
- Comment auriez-vous pu éviter de perdre la règle du seuil de livraison ?

::: details Réponse
- Les premiers messages contiennent la demande de départ. Sans elle, le modèle ne saurait plus quel est le but. Un résumé, lui, garde l'essentiel de tout l'historique, début compris, en beaucoup moins de tokens.
- En l'écrivant ailleurs que dans la conversation : dans `AGENTS.md` si c'est une règle du projet, puisqu'il est renvoyé à chaque tour et survit à toutes les compactions, ou dans un test, par exemple panier de 50,60 € avec `BTS10` et livraison à 4,90 €, qui échouera si l'agent l'oublie. Une règle qui compte ne doit pas vivre seulement dans le fil de la discussion.
:::

Un petit calcul : avec une fenêtre de 32 768 tokens, une compaction déclenchée à 80 % et un contexte de départ de 5 800 tokens, combien de fichiers de 2 000 tokens l'agent peut-il lire avant de devoir compacter ?

::: details Réponse
80 % de 32 768, c'est environ 26 200 tokens. Il reste 26 200 - 5 800 = 20 400 tokens, soit 10 fichiers de 2 000 tokens, sans compter les sorties de commandes et les réponses du modèle qui consomment de la place eux aussi. Sur un vrai projet, c'est vite atteint. D'où l'intérêt des modèles à grande fenêtre, et surtout des sessions courtes.
:::

::: tip Les bons réflexes
- **Une tâche, une session** : quand une tâche est terminée et commitée, ouvrez une nouvelle session plutôt que d'enchaîner dans la même.
- Ce qui doit durer va dans `AGENTS.md` ou dans les tests, pas dans le fil de la conversation.
- La plupart des agents vous laissent aussi compacter à la main, au bon moment (par exemple la commande `/compact` de Claude Code, ou celle du chat de llm-proxy), et vous montrent le remplissage de la fenêtre : surveillez-le.
:::

Les risques de la compaction, ces détails qui disparaissent sans prévenir, sont traités dans [le TP sur les limites](./limites.md#la-fenetre-de-contexte-sature).

### Ce que ça coûte

Les fournisseurs payants facturent au million de tokens. Quelques prix relevés le 8 novembre 2026 sur [la page des modèles d'OpenCode](https://opencode.ai/docs/zen/), en dollars par million de tokens :

| Modèle | Entrée | Sortie | Entrée en cache |
|---|---|---|---|
| DeepSeek V4.1 Flash | 0,30 $ | 1,20 $ | 0,006 $ |
| Claude Sonnet 5.5 | 2,00 $ | 10,00 $ | 0,20 $ |
| GPT 5.5 | 5,00 $ | 30,00 $ | 0,50 $ |

C'est à vous de jouer ! Calculez, sans le cache :

1. le prix des trois tours mesurés plus haut (18 500 tokens d'entrée, environ 300 de sortie) avec Claude Sonnet 5.5 ;
2. le prix d'une après-midi de travail avec un agent : 150 tours de boucle, avec un contexte moyen de 40 000 tokens en entrée et 500 tokens de sortie par tour, avec Claude Sonnet 5.5 puis avec DeepSeek V4.1 Flash ;
3. la même après-midi pour une classe de 30 étudiants.

::: details Réponse
1. Entrée : 18 500 × 2 / 1 000 000 = 0,037 $. Sortie : 300 × 10 / 1 000 000 = 0,003 $. Environ **0,04 $**, quelques centimes, pour une seule petite demande.
2. Entrée : 150 × 40 000 = 6 000 000 tokens ; sortie : 150 × 500 = 75 000 tokens.
   - Claude Sonnet 5.5 : 6 × 2 + 0,075 × 10 = 12 + 0,75 = **12,75 $** ;
   - DeepSeek V4.1 Flash : 6 × 0,30 + 0,075 × 1,20 = 1,80 + 0,09 = **1,89 $**.
3. Multipliez par 30 : environ **380 $** avec Claude Sonnet 5.5, **57 $** avec DeepSeek V4.1 Flash. Pour une seule séance.

Le cache fait baisser ces chiffres, parce qu'une bonne partie de l'entrée est relue, mais l'ordre de grandeur reste le même : un agent consomme énormément de tokens d'entrée, bien plus qu'un chat. C'est aussi pour ça que les offres « gratuites » ont des quotas, et que le proxy de la classe compte ce que chacun consomme.
:::

## Pour résumer

Questions de synthèse, à faire sans relire le TP :

1. Qui exécute la commande `npm test` quand un agent « lance les tests » : le modèle ou l'agent ? Sur quelle machine ?
2. Pourquoi un agent consomme-t-il beaucoup plus de tokens qu'un chat pour la même question ?
3. Quel champ de la réponse Chat Completions vous dit que le modèle veut un outil ?
4. Que contient le fichier `AGENTS.md`, et quand est-il lu ?
5. Qu'est-ce qu'un harness ? Citez trois de ses composants.
6. Avec le même modèle, quelle est la différence entre un chat et un agent ?

::: details Réponse
1. L'agent, sur votre machine, ou dans votre dev-box. Le modèle, lui, a seulement demandé l'appel ; il ne voit que le résultat que l'agent lui renvoie.
2. Parce qu'il renvoie à chaque tour tout le contexte : ses consignes, la description de ses outils, l'historique, le contenu des fichiers lus et la sortie des commandes. Et une tâche demande souvent beaucoup de tours.
3. `finish_reason` vaut `tool_calls`, et le message contient un tableau `tool_calls` avec le nom de l'outil et ses arguments en JSON.
4. Les règles du projet que le modèle ne peut pas deviner : commandes, conventions, interdits. L'agent le recopie au début du contexte, à chaque tour.
5. Tout ce qui entoure le modèle et tourne sur votre machine, le programme que vous installez (OpenCode, Claude Code…). On y trouve la boucle, le prompt système avec `AGENTS.md`, les outils et leur exécution, les permissions, la gestion du contexte, historique et compaction, et l'interface.
6. Le harness. Avec un chat, le modèle ne voit que ce que vous collez et c'est vous qui faites la boucle, copier, lancer, revenir avec l'erreur. Avec un agent, le harness donne au modèle des outils qui agissent sur votre projet et fait tourner la boucle tout seul. Vous, vous relisez le résultat.
:::

## Conclusion

Dans ce TP, vous avez vu que :

- un agent de code, c'est un modèle de langage placé dans une boucle : il lit le contexte, décide, demande un outil, l'agent l'exécute et lui renvoie le résultat ;
- le modèle n'exécute rien et ne retient rien. C'est l'agent qui agit sur votre machine, et qui renvoie tout l'historique à chaque tour ;
- avec le même modèle, un chat vous laisse faire la boucle alors qu'un agent la fait à votre place, des outils branchés sur votre projet en plus ;
- le harness est fait d'un contexte limité par sa fenêtre, d'outils, de permissions et de fichiers d'instructions comme `AGENTS.md` ;
- quand la fenêtre se remplit, l'agent compacte, et ce qui n'entre pas dans le résumé est perdu ;
- trois API se partagent le terrain (Chat Completions, Anthropic Messages, Responses), et un proxy comme llm-proxy peut les traduire ;
- tout se paie en tokens. Un agent en consomme beaucoup.

Place à la pratique ! Dans [le TP suivant](./utilisation.md), vous installez OpenCode, vous le branchez sur un modèle gratuit et vous lui faites ajouter une fonctionnalité à un vrai petit projet, en gardant la main à chaque étape.

👋 Si vous avez des questions, n'hésitez pas.
