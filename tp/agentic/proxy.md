---
description: "Le développement agentique, TP bonus : monter son propre llm-proxy avec Docker Compose, y brancher les accès gratuits de NVIDIA et d'AMD (Token Lab), protéger le proxy par une clé, garder les clés des fournisseurs dans un .env, puis y relier OpenCode et suivre sa consommation dans le tableau de bord."
---

# Le développement agentique : monter son propre proxy

::: details Sommaire
[[toc]]
:::

::: tip TP bonus
Ce TP est pour les étudiants en avance. Il n'est pas nécessaire pour la suite, mais il vous fait passer de l'autre côté : jusqu'ici vous utilisiez le proxy de la classe, cette fois c'est vous qui le faites tourner.
:::

Dans [le TP sur l'utilisation](./utilisation.md#brancher-un-modele), vous avez branché OpenCode sur plusieurs fournisseurs : NVIDIA, AMD, le proxy de la classe. Et dans [le TP sur les limites](./limites.md#cout-et-quotas), vous avez vu que les offres gratuites ont toutes leurs règles : 40 requêtes par minute ici, 20 là, un accès qui s'arrête au bout de 30 jours ailleurs.

Résultat : chaque fournisseur a **son adresse, sa clé et ses noms de modèles**, et chaque agent (OpenCode, pi, Claude Code…) doit tous les connaître. Le jour où l'accès AMD expire, il faut tout reconfigurer.

C'est exactement le problème que règle [llm-proxy](https://github.com/c4software/llm-proxy), le proxy que votre enseignant fait tourner pour la classe. Dans ce TP, vous allez monter **le vôtre**, sur votre machine, avec deux fournisseurs gratuits derrière : NVIDIA et AMD.

## Prérequis

- Les TP [principe](./principe.md) et [utilisation](./utilisation.md) : la boucle d'un agent, OpenCode et son `opencode.json`.
- **Docker** et **Docker Compose** sur votre machine (`docker compose version`). Revoir [le cours Docker](/cours/docker.md) si besoin.
- Environ 5 Go d'espace disque libre : la construction de l'image prend plusieurs minutes la première fois.
- `git`, `curl` et `jq`.
- Un compte **NVIDIA** avec sa clé (voir [le TP sur l'utilisation](./utilisation.md#nvidia)), et un compte **AMD AI Developer Program** (nous le créons plus bas).

## Objectifs

À la fin de ce TP vous saurez :

- expliquer à quoi sert un proxy devant des fournisseurs de modèles ;
- obtenir une clé d'API chez NVIDIA et chez AMD (Token Lab) ;
- déployer llm-proxy avec Docker Compose ;
- déclarer des fournisseurs compatibles OpenAI dans `data/config.toml`, sans jamais y écrire une clé ;
- protéger le proxy par une clé et vérifier qu'il refuse les autres ;
- y brancher OpenCode et suivre votre consommation dans le tableau de bord.

## Le principe

Voici ce que vous allez construire :

![À gauche, vos agents (OpenCode avec son opencode.json, curl pour vérifier, le navigateur pour le tableau de bord /ui) envoient leurs requêtes avec la clé du proxy à llm-proxy, sur http://localhost:8000. Le proxy tourne sur votre machine avec Docker Compose ; il lit ses réglages dans data/config.toml (tables proxy, backends.nvidia et backends.amd) et ses secrets dans .env (PROXY_API_KEY, NVIDIA_API_KEY, AMD_API_KEY). Il vérifie la clé du proxy, lit le préfixe du modèle, remplace la clé par celle du fournisseur et envoie la requête à NVIDIA (integrate.api.nvidia.com, clé nvapi-, environ 40 requêtes par minute) pour les modèles nvidia/…, ou à AMD Token Lab (api.tokenlab.amd.com, clé tl-, 30 jours, 20 requêtes par minute) pour les modèles amd/…](./res/proxy_installation.svg)

Il y a **trois clés** dans ce schéma, et c'est tout l'intérêt :

- la **clé du proxy** : la seule que vos agents connaissent ;
- la clé **NVIDIA** (`nvapi-…`) et la clé **AMD** (`tl-…`) : elles restent sur la machine du proxy, dans un fichier `.env`, et ne sont jamais données à un agent.

Le proxy choisit le fournisseur grâce au **préfixe du nom de modèle** : `amd/Gemma-4-31B-IT` part chez AMD, qui reçoit `Gemma-4-31B-IT`. Vous l'avez vu côté client dans [le TP sur le principe](./principe.md#trois-api-pour-la-meme-chose) ; cette fois, c'est vous qui écrivez la table de routage.

::: details Question : pourquoi ne pas simplement mettre la clé NVIDIA dans `opencode.json` ?
Pour un seul agent sur une seule machine, ça marcherait (avec `{env:NVIDIA_API_KEY}`, jamais la clé en clair). Mais :

- chaque agent (OpenCode, pi, Claude Code, Codex) doit connaître chaque fournisseur, avec sa propre syntaxe ;
- Claude Code parle l'API Anthropic et Codex l'API Responses : ils ne savent pas parler directement à NVIDIA ou à AMD, le proxy fait la traduction ;
- changer de fournisseur, c'est modifier tous les clients au lieu d'une ligne dans le proxy ;
- et si vous voulez partager l'accès (avec un binôme, avec une classe), donner sa clé NVIDIA revient à donner son compte. Avec le proxy, chacun a sa clé, que vous pouvez retirer sans toucher au reste.
:::

## Obtenir les clés des fournisseurs

### NVIDIA

Vous l'avez normalement déjà fait dans [le TP sur l'utilisation](./utilisation.md#nvidia) : un compte sur [build.nvidia.com](https://build.nvidia.com/), un numéro de téléphone vérifié, et une clé qui commence par `nvapi-`. Le point d'accès est `https://integrate.api.nvidia.com/v1`, compatible OpenAI.

### AMD (Token Lab)

AMD donne un accès gratuit à son API d'inférence, **Token Lab**, aux membres de son programme développeurs. Les modèles tournent sur des cartes AMD, et il n'y a ni carte bancaire ni demande de crédits à faire :

1. inscrivez-vous (gratuitement) au [AMD AI Developer Program](https://developer.amd.com/ai-developer-program/) ;
2. dans votre espace membre, ouvrez **Member Perks**, puis **Cloud Credits**, et descendez jusqu'à **Token Lab** ;
3. créez votre clé d'API : elle commence par `tl-`.

Le point d'accès est `https://api.tokenlab.amd.com/v1`, lui aussi **compatible OpenAI**. On y trouve par exemple `Gemma-4-31B-IT`, `DeepSeek-V4.1-Flash` ou `Qwen3.8-27B`.

::: warning Un accès limité dans le temps
Relevé le 14 novembre 2026 : une clé Token Lab donne **30 jours** d'accès (prolongeables une fois de 15 jours), un budget de **points** (chaque million de tokens en coûte une fraction, selon le modèle) et **20 requêtes par minute**. Ces conditions changent souvent : vérifiez-les sur [la page du programme](https://developer.amd.com/ai-developer-program/) au moment de vous inscrire. C'est justement une bonne raison de passer par un proxy : quand l'accès expire, vous retirez une table de la configuration, et vos agents ne voient rien d'autre que des modèles en moins.
:::

Avant d'aller plus loin, vérifiez que chaque clé marche **directement**, sans proxy :

```bash
export NVIDIA_API_KEY="nvapi-…"
export AMD_API_KEY="tl-…"

curl -s -H "Authorization: Bearer $NVIDIA_API_KEY" https://integrate.api.nvidia.com/v1/models | jq -r '.data[].id' | head -5
curl -s -H "Authorization: Bearer $AMD_API_KEY" https://api.tokenlab.amd.com/v1/models | jq -r '.data[].id'
```

::: tip Point de contrôle
Les deux commandes affichent une liste de modèles. Si l'une d'elles répond par une erreur, inutile d'aller plus loin : le proxy ne fera pas mieux que la clé qu'on lui donne.
:::

## Installer llm-proxy

### Récupérer le projet

```bash
git clone https://github.com/c4software/llm-proxy.git
cd llm-proxy
```

Le projet contient un `docker-compose.yml` avec deux services : le proxy (`albert-proxy`, du nom du premier fournisseur pour lequel il a été écrit) et SearXNG, un moteur de recherche qui ne sert qu'aux outils de recherche web (nous ne les utilisons pas ici).

### Les secrets : le fichier `.env`

Toutes les clés vont dans un fichier `.env`, à la racine du projet. Partez de l'exemple fourni :

```bash
cp .env.example .env
```

Puis générez une clé pour **votre** proxy (n'importe quelle chaîne longue et aléatoire fait l'affaire) et un secret pour SearXNG :

```bash
python3 -c "import uuid; print(uuid.uuid4())"
openssl rand -hex 32
```

Complétez `.env` (les autres lignes restent vides) :

```ini
PROXY_API_KEY=la-cle-generee-par-python
NVIDIA_API_KEY=nvapi-…
AMD_API_KEY=tl-…
SEARXNG_SECRET=la-valeur-generee-par-openssl
```

::: danger Le .env ne quitte jamais votre machine
Vérifiez qu'il est bien ignoré par Git :

```bash
git check-ignore -v .env
```

La commande doit afficher la ligne du `.gitignore` qui l'ignore. Une clé NVIDIA ou AMD poussée sur GitLab, c'est votre compte utilisé par n'importe qui, et des robots parcourent les dépôts publics à la recherche de ce genre de clé en quelques minutes.
:::

### Les réglages : `data/config.toml`

Toute la configuration du proxy tient dans un seul fichier, `data/config.toml`. Au premier démarrage, s'il n'existe pas, le proxy le crée à partir d'un exemple très complet (`data/config.example.toml`, à lire pour votre culture). Nous allons plutôt écrire le nôtre, réduit à l'essentiel, **avant** le premier démarrage :

```toml
# data/config.toml

[proxy]
# Les clés acceptées par le proxy. Une liste vide = proxy ouvert à tous !
api_keys = ["${PROXY_API_KEY}"]

# Le nom de la table est le préfixe des modèles : nvidia/…
[backends.nvidia]
url = "https://integrate.api.nvidia.com"
api_key = "${NVIDIA_API_KEY}"

# … et amd/…
[backends.amd]
url = "https://api.tokenlab.amd.com"
api_key = "${AMD_API_KEY}"
```

Quelques remarques :

- `${NVIDIA_API_KEY}` est remplacé au démarrage par la variable d'environnement du même nom : le fichier ne contient **aucun secret**.
- L'`url` s'écrit **sans** `/v1` : le proxy ajoute lui-même le chemin demandé par le client (`/v1/models`, `/v1/chat/completions`…).
- Tout le reste prend sa valeur par défaut, décrite dans [la documentation de la configuration](https://github.com/c4software/llm-proxy/blob/master/docs/configuration.md).

::: details Question : que se passerait-il avec `api_keys = []` ?
Le proxy serait **ouvert** : n'importe qui capable de joindre votre machine sur le port 8000 (un camarade sur le même Wi-Fi, par exemple) pourrait utiliser vos clés NVIDIA et AMD, sans même les connaître. C'est le piège classique d'un proxy : il transforme une clé secrète en un service accessible à tous. D'où la première ligne de notre configuration.
:::

### Transmettre les clés au conteneur

Dernier piège : le `.env` est lu par Docker Compose, mais une variable n'arrive dans le conteneur **que si le service la demande** dans sa section `environment:`. Le `docker-compose.yml` du projet transmet `PROXY_API_KEY`, mais il ne connaît ni NVIDIA ni AMD.

On ne modifie pas le fichier du projet (il serait écrasé à la prochaine mise à jour) : on ajoute un `docker-compose.override.yml`, que Docker Compose fusionne automatiquement avec le premier, et que le projet ignore déjà dans Git :

```yaml
# docker-compose.override.yml
services:
  albert-proxy:
    environment:
      NVIDIA_API_KEY: "${NVIDIA_API_KEY}"
      AMD_API_KEY: "${AMD_API_KEY}"
```

Vérifiez la fusion (attention, cette commande affiche les clés en clair, ne la faites pas en partageant votre écran) :

```bash
docker compose config | grep -A6 "environment:"
```

## Démarrer le proxy

```bash
docker compose up -d --build
```

La première fois, la construction de l'image prend plusieurs minutes (le proxy embarque de quoi faire tourner du code dans le navigateur pour son chat). Les fois suivantes, le démarrage est immédiat.

Regardez ensuite le journal du proxy :

```bash
docker compose logs albert-proxy | grep -E "backend|auth"
```

```
INFO backend nvidia (fallback sans modèle) → https://integrate.api.nvidia.com | sans quota, contacté à la demande | clé : injectée
INFO backend amd → https://api.tokenlab.amd.com | sans quota, contacté à la demande | clé : injectée
INFO auth proxy ACTIVE : 1 clé(s) acceptée(s), /healthz exempté
```

Trois choses à vérifier : les deux backends sont là, chacun avec `clé : injectée`, et l'authentification est **active**.

::: details Le conteneur redémarre en boucle avec « unable to open database file » ?
Le proxy écrit dans le dossier `data/` de votre machine, sous l'identité `PUID:PGID` du `.env` (1000 par défaut, le premier utilisateur d'une machine Linux). Si ce n'est pas votre identifiant (`id -u`), corrigez `PUID` et `PGID`. Avec Docker **rootless**, votre utilisateur correspond à `root` dans le conteneur : mettez `PUID=0` et `PGID=0`.
:::

## Vérifier avec curl

Comme pour le proxy de la classe, l'adresse et la clé vont dans des variables d'environnement. Reprenez **les mêmes noms** que dans le TP précédent : votre `opencode.json` marchera sans changement.

```bash
export LLM_PROXY_URL="http://localhost:8000"
export LLM_PROXY_API_KEY="la-cle-du-proxy"   # la valeur de PROXY_API_KEY
```

Puis, trois essais :

```bash
# 1. le catalogue, avec la clé
curl -s -H "Authorization: Bearer $LLM_PROXY_API_KEY" "$LLM_PROXY_URL/v1/models" | jq -r '.data[].id'

# 2. le même, sans la clé
curl -s "$LLM_PROXY_URL/v1/models" | jq -r .error.type

# 3. une vraie question, à un modèle AMD
curl -s "$LLM_PROXY_URL/v1/chat/completions" \
  -H "Authorization: Bearer $LLM_PROXY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "amd/Gemma-4-31B-IT", "messages": [{"role": "user", "content": "Réponds uniquement par le mot OK."}]}' \
  | jq -r '.choices[0].message.content'
```

![Dans un terminal, dans le dossier llm-proxy : docker compose ps montre albert-proxy et searxng en bonne santé ; curl sur /v1/models avec la clé liste les modèles de NVIDIA préfixés par nvidia/ (nemotron-3.5-lightning, qwen3.8-coder, deepseek-v4.1-flash…) puis ceux d'AMD préfixés par amd/ (Gemma-4-31B-IT, DeepSeek-V4.1-Flash, Qwen3.8-27B, MiniCPM5-2B) ; le même curl sans la clé renvoie invalid_api_key ; opencode run avec le modèle llmproxy/amd/Gemma-4-31B-IT répond OK](./res/proxy_terminal.png)

Le catalogue réunit **les deux fournisseurs**, chacun sous son préfixe. Remarquez `nvidia/nvidia/nemotron-…` : le premier `nvidia/` est le nom de **votre** table, le second fait partie du nom du modèle chez NVIDIA (qui sert aussi des modèles `qwen/…` ou `deepseek-ai/…`).

::: tip Point de contrôle
Vous obtenez la liste des modèles avec la clé, `invalid_api_key` sans, et `OK` à la troisième commande. Essayez aussi la troisième avec un modèle NVIDIA.
:::

::: details Question : que se passe-t-il si vous oubliez une variable dans `docker-compose.override.yml` ?
Faites l'essai : retirez la ligne `AMD_API_KEY`, puis `docker compose up -d` (le service est recréé avec le nouvel environnement). Trois indices :

- au démarrage, le journal prévient : `variables d'environnement absentes ou vides […] : AMD_API_KEY (une clé dans .env doit AUSSI être transmise au conteneur […])` ;
- les modèles `amd/…` disparaissent de `/v1/models` : sans clé, AMD refuse de donner son catalogue ;
- une question à `amd/Gemma-4-31B-IT` répond `upstream_auth_error` : c'est **AMD** qui a refusé la clé du proxy, pas le proxy qui a refusé la vôtre.

Et avec un préfixe inconnu (`"model": "mistral/x"`), le proxy répond `unknown_backend_prefix` en rappelant les préfixes qu'il connaît. Remettez la ligne avant de continuer.
:::

## Brancher OpenCode

Rien à réécrire : l'`opencode.json` du [TP précédent](./utilisation.md#le-proxy-de-la-classe) lit déjà `LLM_PROXY_URL` et `LLM_PROXY_API_KEY`. Il suffit d'y déclarer les modèles de **votre** proxy, par exemple un modèle de chaque fournisseur :

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "llmproxy/amd/Gemma-4-31B-IT",
  "providers": {
    "llmproxy": {
      "name": "Mon llm-proxy",
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": {
        "baseURL": "{env:LLM_PROXY_URL}/v1",
        "apiKey": "{env:LLM_PROXY_API_KEY}"
      },
      "models": {
        "amd/Gemma-4-31B-IT": {
          "name": "Gemma 4 31B (AMD)",
          "capabilities": { "tools": true, "input": ["text"], "output": ["text"] },
          "limit": { "context": 131072, "output": 8192 }
        },
        "nvidia/nvidia/nemotron-3.5-lightning-30b-a3b": {
          "name": "Nemotron 3.5 Lightning (NVIDIA)",
          "capabilities": { "tools": true, "input": ["text"], "output": ["text"] },
          "limit": { "context": 32768, "output": 4096 }
        }
      }
    }
  }
}
```

Puis, dans un dossier de travail :

```bash
opencode models | grep llmproxy
opencode run "Réponds uniquement par le mot OK."
opencode run --model llmproxy/nvidia/nvidia/nemotron-3.5-lightning-30b-a3b "Réponds uniquement par le mot OK."
```

```
> build · amd/Gemma-4-31B-IT
OK
> build · nvidia/nvidia/nemotron-3.5-lightning-30b-a3b
OK
```

Passer d'AMD à NVIDIA, c'est changer de modèle dans `/models`. Et le jour où l'accès AMD expire, vous changez la ligne `"model"`, sans toucher à aucune clé.

::: tip Que se passe-t-il derrière ?
Pour chaque requête d'OpenCode, le proxy :

1. vérifie l'en-tête `Authorization: Bearer <clé du proxy>` ;
2. lit le modèle demandé, `amd/Gemma-4-31B-IT`, et trouve la table `[backends.amd]` ;
3. retire le préfixe : AMD reçoit `"model": "Gemma-4-31B-IT"` ;
4. **remplace** l'en-tête `Authorization` par la clé AMD, puis envoie la requête à `https://api.tokenlab.amd.com/v1/chat/completions` ;
5. relaie la réponse à OpenCode, en notant au passage la date, le modèle, le nombre de tokens et la durée (jamais le contenu).

Votre clé de proxy ne part jamais chez AMD, et la clé AMD ne part jamais chez OpenCode.
:::

## Le tableau de bord

Ouvrez [http://localhost:8000/ui](http://localhost:8000/ui) dans votre navigateur. La page demande une clé : donnez celle du proxy. Après quelques requêtes, la vue **Statistiques** ressemble à ceci :

![Le tableau de bord de llm-proxy, vue Statistiques : 35 requêtes, 54 111 tokens (54 041 en entrée, 70 en sortie), 5 modèles actifs (amd : 19 requêtes, nvidia : 16 requêtes), 0 erreur ; le graphique du trafic empilé par modèle et le tableau par modèle : amd/Gemma-4-31B-IT, 9 requêtes et 23 827 tokens, soit 2 647 en moyenne par requête ; nvidia/nvidia/nemotron-3.5-lightning-30b-a3b, 14 requêtes et 18 127 tokens ; amd/DeepSeek-V4.1-Flash, 8 requêtes et 256 tokens, soit 32 en moyenne](./res/proxy_tableau_de_bord.png)

::: details Comment cette capture a-t-elle été faite ?
Pour ne pas consommer de quota, elle a été prise avec deux **backends simulés**, qui imitent les catalogues de NVIDIA et d'AMD et répondent toujours « OK ». Le proxy, la configuration, les requêtes d'OpenCode et de curl, et les compteurs sont réels. Les chiffres de votre tableau de bord seront donc différents, mais pas les ordres de grandeur.
:::

Je vous laisse observer le tableau **Par modèle**, puis répondre :

1. Les requêtes faites avec curl coûtent quelques dizaines de tokens. Combien coûte, en moyenne, une requête d'OpenCode, pour la même question « Réponds uniquement par le mot OK. » ?
2. D'où vient la différence ?
3. Avec 20 requêtes par minute chez AMD, combien de tours de boucle un agent peut-il faire par minute ? Est-ce que ça suffit pour la tâche du [TP sur l'utilisation](./utilisation.md) ?

::: details Voir les réponses
1. Autour de **2 600 tokens** d'entrée par requête dans notre capture (`Moy./req`), contre une trentaine pour curl.
2. OpenCode envoie, **à chaque requête**, son prompt système et la description de tous ses outils (lire, écrire, exécuter…), avant même votre question. Vous l'avez vu dans [le TP sur le principe](./principe.md) : le contexte d'un agent n'est jamais vide.
3. 20 tours de boucle par minute au maximum, une lecture de fichier ou un lancement de tests par tour. Pour une tâche qui demande 30 à 50 tours, comptez plusieurs minutes, et des erreurs `429` si l'agent va plus vite que la limite. Le proxy relaie ces erreurs ; c'est l'agent qui attend et réessaie.
:::

## Pour aller plus loin

### Partager le proxy avec un binôme

`api_keys` est une **liste** : une clé par personne. Ajoutez une variable `BINOME_API_KEY` dans `.env` (avec une nouvelle clé générée), transmettez-la dans `docker-compose.override.yml`, puis :

```toml
[proxy]
api_keys = ["${PROXY_API_KEY}", "${BINOME_API_KEY}"]
```

Chaque clé a ses propres statistiques dans le tableau de bord, et retirer la clé de votre binôme ne change rien pour vous.

Mais vous partagez alors **vos** limites : 20 requêtes par minute chez AMD pour deux agents. Pour qu'un agent qui boucle ne prenne pas tout, le proxy propose un **partage équitable** : une part de tokens par heure et par clé, au-delà de laquelle les requêtes attendent leur tour (rien n'est refusé). C'est ce que fait le proxy de la classe :

```toml
[fair_share]
# Tokens (entrée + sortie) par heure glissante et par clé. 0 = aucune limite.
tokens_per_hour = 200000
```

Voir [la documentation du partage équitable](https://github.com/c4software/llm-proxy/blob/master/docs/tableau-de-bord.md#partage-équitable).

::: warning Lisez les conditions des fournisseurs
Votre clé NVIDIA ou AMD est attachée à **votre** compte : c'est vous qui répondez de ce qui passe par elle. Avant de la partager, même à travers un proxy, lisez les conditions d'utilisation du fournisseur. Et ne publiez jamais votre proxy sur Internet : un proxy ouvert, ou mal protégé, c'est une clé offerte à tout le monde.
:::

### Ajouter d'autres fournisseurs

Tout fournisseur **compatible OpenAI** se branche de la même façon, avec une table `[backends.<nom>]` : un modèle qui tourne sur votre propre PC avec [llama.cpp](https://github.com/ggml-org/llama.cpp) ou [Ollama](https://ollama.com/), l'API Albert de l'État, une autre offre gratuite… Pour un serveur qui tourne sur votre machine hôte, l'adresse vue depuis le conteneur est `http://host.docker.internal:<port>` (sous Linux, ajoutez `extra_hosts: ["host.docker.internal:host-gateway"]` au service dans l'override).

### Les autres agents

Le proxy parle aussi l'API Anthropic (Claude Code) et l'API Responses (Codex), en les traduisant. Elles sont désactivées dans notre configuration minimale : voir `[anthropic]` et `[responses]` dans `data/config.example.toml`. L'onglet **Configuration → Clients** du tableau de bord génère ensuite la configuration de Claude Code, de Codex ou de pi.

## Arrêter et nettoyer

```bash
docker compose down        # arrête le proxy ; data/ (configuration et statistiques) est gardé
docker compose up -d       # le relance, sans reconstruire
```

Pensez aussi à **révoquer** vos clés NVIDIA et AMD sur leurs sites quand vous n'en avez plus besoin : une clé qui ne sert plus est une clé qui peut encore fuir.

## Conclusion

Dans ce TP bonus, vous avez changé de côté :

- un proxy met **plusieurs fournisseurs derrière une seule adresse**, et le préfixe du modèle choisit le fournisseur ;
- les clés des fournisseurs restent dans un `.env` ignoré par Git, la configuration ne contient que des `${VAR}`, et une variable n'entre dans un conteneur que si le service la demande ;
- un proxy sans `api_keys` est ouvert à tous : c'est la première ligne à écrire ;
- vos agents ne connaissent qu'une adresse et une clé, et changer de fournisseur ne les concerne plus ;
- le tableau de bord montre ce que coûte vraiment un agent : des milliers de tokens par tour, avant même votre question.

C'est, en plus grand (comptes, une clé par étudiant, partage équitable), ce que fait le proxy de la classe. Vous savez maintenant ce que voit son administrateur, et ce qu'il ne voit pas : relisez [ce que le proxy ne protège pas](./limites.md#vos-donnees-partent-chez-un-tiers) avec ce nouvel œil.

👋 Si vous avez des questions, n'hésitez pas.
