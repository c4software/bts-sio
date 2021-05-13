# Déployer une Image Docker dans Kubernetes

Nous avons vu précédemment qu'il était possible de compiler puis de packager une application grâce à Gitlab-CI, dans ce TP nous allons voir comment déployer cette image (**présente dans un registry privée**) dans un cluster Kubernetes

::: details Sommaires
[[toc]]
:::

## Introduction

Dans ce TP nous allons voir comment :

- Configurer un cluster Kubernetes simple avec `k3d`.
- Comment autoriser le cluster Kubernetes à « pull » l'image depuis le repo privé de Gitlab.
- Comment lancer & autoriser les connexions sur un port accessible depuis le réseau.

::: tip Contenu non exhaustif
Kubernetes est un sujet très large qui est très large. Dans ce TP nous poserons uniquement les bases, celle-ci vous servirons à découvrir le fonctionnement de Kubernetes, mais également comme l'utiliser dans un usage « avancés » c'est-à-dire sans forcément utiliser une image sur le hub public de Docker.
:::

## Le Cluster

Contrairement à un simple Docker, compose Kubernetes reposes sur un principe de Cluster. Le cluster n'est pas « une simple image ». Il s’agit d'un outil d'orchestration qui regroupera à la fois :

- Les images (container).
- Les paramétrages des volumes.
- Le nombre d'instances déployé.
- Le réseau
- En passant par l'exposition des services.

L'idée ici est donc de gérer l'ensemble de votre « stack » et pas seulement la combinaison d'images dans un Docker-Compose. L'ensemble de votre configuration sera configurée en YAML dans _un_ ou **plusieurs** fichiers.

Nous allons avoir plusieurs possibilités pour créer notre cluster, il existe plusieurs « logiciels » permettant de créer des Clusters Kubernetes :

- k8s
- minikube
- k3s
- k3d (en réalité c'est k3s in Docker)
- kind
- …

Beaucoup de possibilité pour répondre à des cas d'usage différents, le plus simple dans notre cas c'est « k3d » ; pourquoi ? Car il permet de déployer un cluster Kubernetes dans un environnement conteneurisé type Docker.

::: warning Du YAML ?
Oui… Beaucoup de YAML ! Mais vous allez voir… Une fois une bonne base en place c'est « plutôt simple ».

![YAML](./res/yaml.jpeg)

:::

::: danger Gérer son cluster… kubectl ? helm ?
Le monde Kubernetes est rempli de plusieurs outils, les différents outils ont été créé à différentes époques et répondent à des besoins différents, et surtout des tailles de projet différentes.

Pour cette introduction, je vais rester sur l'outil de base à savoir `kubectl`, il sera amplement suffisant et vous les verrez il nous permettra même de déployer sans trop de difficultés en automatique dans un flow de CI/CD.
:::

### k3d

Nous allons donc installer [k3d](https://k3d.io/), l'installation va être relativement simple, il s'agit ici juste d'un petit outil qui nous permettra de créer / initialiser, mais également de manager nos différents clusters.

Pour l'installation, je vous laisse vous reporter [à la documentation officielle](https://github.com/rancher/k3d#get) en effet, en fonction de votre OS l'installation sera évidemment différente.

Une fois installé sur votre machine / serveur, vous devriez pouvoir jouer dans votre terminal la commande :

```sh
$ k3d --version
k3d version v4.4.3
k3s version v1.20.6-k3s1 (default)
```

Dans mon cas, j'ai donc la version `4.4.3` de k3d.

#### Initialiser un Cluster

Pour l'instant nous n'avons pas initialisé de cluster, notre machine / serveur est toujours identique à avant l'installation. La création de clusters va se réaliser via la commande `k3d` récemment installés. Pour faire simple, si vous souhaitez créer un cluster il vous suffira de :

```sh
k3d cluster create --api-port 20135 -p "8080:80@loadbalancer" --volume ./volume/:/data/ -s 1 -a 2 monCluster
```

**Avant de jouer la commande comme un sauvage**, détaillons un peu ce que vous allez lancer sur votre machine :

![Infra](./res/infra.jpg)

| Options                     | Usage                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `cluster`                   | Indique que nous souhaitons gérer la partie cluster                                         |
| `create`                    | Indique que nous souhaitons créer un nouveau cluster                                        |
| `--api-port 20125`          | Port d'écoute de la partie API **de management** du cluster                                 |
| `-p "8888:80@loadbalancer"` | Expose le port `8888` sur votre machine, il permettra d'accéder à votre « service déployé » |
| `--volume ./volume/:/data/` | Fournis un espace de stockage persistant à votre cluster                                    |
| `-s 1`                      | Indique que vous souhaitez 1 serveur                                                        |
| `-a 2`                      | Indique que vous souhaitez 2 agents                                                         |
| `monCluster`                | Le nom du cluster que vous souhaitez créer                                                  |

Vous pouvez maintenant lancer la commande. Dans quelques minutes / secondes en fonctions de votre machine vous aurez un cluster Kubernetes disponible.

::: tip C'est dans « du docker »

Vous pouvez vérifier que nous sommes bien dans différents Container Docker via un simple `docker ps`.

![Docker PS](./res/docker_ps.png)

:::

Votre cluster Kubernetes est maintenant **opérationnel**, vous pouvez déployer dessus ce que vous souhaitez. Si vous avez initialisé le cluster sur votre machine, celui-ci est normalement disponible immédiatement.

Cependant, je vous invite à réaliser un cluster « distant » ; même si fondamentalement ça ne change pas grand-chose au fonctionnement, vous devrez vous poser des questions toutes bêtes comme par exemple :

« Mais comment j'accède à distance à mon Cluster ? Comment est gérée la sécurité de mon cluster ? »

### Accès du cluster à distance

Nous allons donc voir comment « récupérer » la configuration du cluster `monCluster` que nous avons initialisé précédemment.

::: warning Pourquoi est-ce important à mon avis ?

Dans le monde réel, il est peu probable que votre cluster Kubernetes soit en local sur votre serveur, l'intérêt est très limité et l'ajout de Kubernetes serait très subjectif…

Même si ce TP utilise une implémentation « simple » d'un cluster Kubernetes, il peut complètement être utilisé dans le cadre d'un environnement de développement. Et dans ce cadre, il est évident qu’accéder à son cluster à distance est primordial.

:::

k3d (ou k3s in Docker) utilise la même logique d'authentification que les autres solution Kubernetes du marché. Ça repose comme souvent avec Kubernetes sur … un fichier YAML, celui-ci va contenir l'ensemble de la configuration et des clés d'accès de votre cluster.

Il est donc **important que celui-ci reste privé**, vous ne devez jamais le partager, le comité dans un dépot public, voire le diffuser en ligne. Car évidemment celui-ci donne les pleins pouvoirs pour modifier / déployer / interagir avec votre Cluster.

Pour forcer `k3d` à écrire la configuration de votre Cluster, il faut saisir la commande:

```sh
$ k3d kubeconfig write monCluster
/home/vbrosseau/.k3d/kubeconfig-monCluster.yaml
```

À cette étape, vous venez d'écrire la configuration de votre Cluster dans votre serveur. Cette configuration va nous permettre par la suite de piloter le cluster via **votre ordinateur**.

Le fichier est sauvegardé dans le dossier `.k3d` dans la home de votre utilisateur. Vous pouvez la récupérer via un `scp` (ou autre solution de transfert).

```sh
scp vbrosseau@monServer.dev:.k3d/kubeconfig-monCluster.yaml .
```

Et voilà vous avez maintenant l'ensemble des `secrets` nécessaires pour que votre serveur vous reconnaisse 👋. Pour les fournir à `kubectl` il suffit de :

```sh
export KUBECONFIG=kubeconfig-monCluster.yaml
kubectl cluster-info
```

Si vous avez bien suivi… vous devriez avoir les informations de votre cluster.

::: danger STOP !
La curiosité n'est pas un vilain défaut ! Regardons ensemble le contenu du fichier que vous venez de récupérer !
:::

Votre Cluster est maintenant pleinement fonctionnel. Il est pour l'instant vide, mais vous allez voir, nous allons très prochainement déployer votre application.

### Les solutions payantes

Bon, même si ce n’est pas le sujet de ce TP, il faut avoir en tête qu'il existe énormément de solutions pour monter un Cluster Kubernetes. Ici nous avons créé un cluster avec `k3s` (via `k3d`), aucun problème votre cluster va fonctionner comme attendu. **Cependant** cette solution est valide pour expérimenter Kubernetes ou pour déployer une application perso.

Si vous souhaitez utiliser Kubernetes **en prod** ou de manière professionnelle, je vous conseille vivement de passer par une solution manager du type :

- [Kubernetes sur AWS](https://aws.amazon.com/fr/kubernetes/)
- [Google Engine Kubernetes](https://cloud.google.com/kubernetes-engine)
- [OVH Kubernetes](https://www.ovhcloud.com/en/public-cloud/kubernetes/)
- [Kubernetes Kapsule de Scaleway](https://www.scaleway.com/en/kubernetes-kapsule/)

L'usage de ce type de solution ne change rien à ce que nous avons vu / allons voir. Leur avantage c'est que vous n'avez rien à gérer, la solution est **managée** par le fournisseur de service.

## Créer l'image Docker via Gitlab-CI

Avant d'aller plus loin… Il nous faut quelque chose à déployer. Dans Kubernetes nous pouvons déployer différents types d'application :

- Des outils sans « interface » (HTML, ou API).
- Des API (exposée en HTTP).
- Un site Internet.
- Une base de données
- Une combinaison de site Internet + API + BDD

Bref, ce que vous souhaitez donc !

### Le projet

Pour débuter nous allons déployer un projet simple, je vous propose de déployer un projet similaire à la documentation que vous êtes entrain de lire. La solution que j'utilise s'appelle [VuePress](https://vuepress.vuejs.org/), cette solution permet de créer rapidement un site à partir de fichier `Markdown` nous sommes donc en plein dans la JamStack.

**-> Je vous laisse regarder un peu la documentation de VuePress avant de continuer**

Pour créer un projet VuePress, il suffit d'entrer la commande :

```sh
npx create-vuepress-site vuePressInKube
```

::: tip Au passage
Je vous avais parlé de `pnpm` précédemment… Ici si vous souhaitez l'utiliser également vous pouvez faire `pnpx` à la place à `npx`.
:::

Avant d'aller plus loin, je vous laisse :

- Tester que ça fonctionne en local avec un `npm install` puis un `npm run dev` (attention à être dans le dossier `docs`).
- Créer votre projet sur Gitlab et créer une première version du dossier `docs`.

Pour le premier point si tout va bien vous devriez avoir :

![VuePress](./res/init.png)

### Le Docker File

Si tout est bon, continuons, nous allons maintenant créer une image Docker de votre site. C'est celle-ci que nous déploierons dans notre container.

Ici il s'agit d'un site Internet, donc comme [dans le TP sur le packaging avec Docker](/tp/ci/packager-docker.md) nous utiliserons une image « simpliste » à base de nginx.

Cette image aura pour but de prendre le résultat du Build de VuePress pour l'héberger de manière statique. La première version est donc de créer une première version via :

```sh
pnpm run build
```

Votre site static est généré dans le dossier `src/.vuepress/dist` c'est ce dossier que nous allons mettre dans notre image Docker.

Je vous laisse créer le dossier `Dockerfile` dans le dossier `docs` avec le contenu suivant

```yaml
FROM nginx:stable-alpine
COPY src/.vuepress/dist /usr/share/nginx/HTML
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

::: danger STOP !

Avant de pusher votre code, tester sur votre ordinateur le bon fonctionnement !

```sh
docker build -t vuepress:test .
docker run -it -p 8888:80 --rm --name vuepresstest vuepress:test
```

« Votre site » doit-être accessible sur [le port 8888](http://localhost:8888)

:::

### La CI

### L'image Docker

## Déployer l'image sur le cluster Kubernetes

### Introduction

### L'authentification avec le Registry Gitlab

### Le deployment.yml

### Le services.yml

### Le ingress.yml

## Déployer une mise à jour

### Votre code et la CI

### Modifier le deployment.yml

Pourquoi ? le nom du tag… etc

## La suite ?

La suite de cette introduction ça va être le déploiement automatisé en cas de mise à jour du projet. [La suite c'est par ici =>](./cd-avec-kubernetes.md)
