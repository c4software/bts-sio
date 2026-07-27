# DevOps Lot 3 : Docker (conteneurs, Dockerfile, Compose)

Nom : ______________________  Prénom : ______________________

**Question 1 — Image et conteneur**

Quelle est la différence entre une image et un conteneur Docker ?

- ☐ **a.** L'image est le modèle (figé), le conteneur est une instance en cours d'exécution de cette image
- ☐ **b.** L'image est plus récente que le conteneur
- ☐ **c.** Ce sont deux noms pour la même chose
- ☐ **d.** Le conteneur est le fichier téléchargé, l'image est ce qui tourne

**Question 2 — Vrai ou Faux - Conteneur et VM**

Un conteneur Docker embarque un système d'exploitation complet avec son propre noyau, comme une machine virtuelle.

☐ Vrai  ☐ Faux

**Question 3 — Pourquoi Docker sur un serveur**

Quel est l'intérêt principal d'installer des services via Docker sur un serveur ?

- ☐ **a.** Ne plus avoir besoin de sauvegardes
- ☐ **b.** Isoler chaque service et ses dépendances, sans « polluer » le serveur
- ☐ **c.** Remplacer le pare-feu du serveur
- ☐ **d.** Rendre le serveur plus rapide que sans Docker

**Question 4 — Le registre**

Comment s'appelle le service en ligne officiel où sont stockées et partagées les images Docker ?

Réponse : ________________________________________

**Question 5 — Lister les conteneurs**

Quelle commande liste les conteneurs en cours d'exécution ?

- ☐ **a.** docker ps
- ☐ **b.** docker images
- ☐ **c.** docker list
- ☐ **d.** docker ls

**Question 6 — Le mode détaché**

Que fait l'option -d dans docker run -d nginx ?

- ☐ **a.** Elle active le mode debug
- ☐ **b.** Elle supprime le conteneur après son arrêt
- ☐ **c.** Elle télécharge l'image sans la lancer
- ☐ **d.** Elle lance le conteneur en arrière-plan (détaché du terminal)

**Question 7 — Exposer un port**

Complétez : la commande docker run ______ 8080:80 nginx rend le port 80 du conteneur accessible sur le port 8080 de la machine hôte.

(a) -e / (b) -p / (c) -v / (d) --name

**Question 8 — Les volumes**

À quoi sert un volume (option -v) sur un conteneur ?

- ☐ **a.** À limiter la mémoire utilisée par le conteneur
- ☐ **b.** À conserver des données en dehors du conteneur, pour qu'elles survivent à sa suppression
- ☐ **c.** À augmenter l'espace disque disponible dans le conteneur
- ☐ **d.** À monter le son du conteneur

**Question 9 — Associez les commandes**

Associez chaque commande Docker à son rôle.

| | À relier à… |
|---|---|
| docker pull → ______ | • Télécharger une image depuis un registre |
| docker exec → ______ | • Arrêter proprement un conteneur |
| docker logs → ______ | • Créer une nouvelle machine virtuelle |
| docker stop → ______ | • Afficher la sortie d'un conteneur |
|  | • Exécuter une commande dans un conteneur en cours d'exécution |
|  | • Mettre à jour le système hôte |

**Question 10 — Première instruction**

Quelle instruction débute (presque) toujours un Dockerfile, en indiquant l'image de base ?

Réponse : ________________________________________

**Question 11 — RUN et CMD**

Dans un Dockerfile, quelle est la différence entre RUN et CMD ?

- ☐ **a.** RUN exécute une commande pendant la construction de l'image, CMD définit la commande lancée au démarrage du conteneur
- ☐ **b.** RUN est pour Linux, CMD pour Windows
- ☐ **c.** CMD s'exécute pendant le build, RUN au démarrage
- ☐ **d.** Aucune, les deux sont interchangeables

**Question 12 — Construire une image**

Que fait la commande docker build -t monapp . ?

- ☐ **a.** Elle lance un conteneur nommé monapp
- ☐ **b.** Elle construit une image nommée monapp à partir du Dockerfile du dossier courant
- ☐ **c.** Elle télécharge l'image monapp depuis le Docker Hub
- ☐ **d.** Elle teste l'image monapp sans la construire

**Question 13 — Vrai ou Faux - Le cache**

Lors d'un docker build, les instructions dont rien n'a changé sont réutilisées depuis le cache, ce qui accélère les constructions suivantes.

☐ Vrai  ☐ Faux

**Question 14 — EXPOSE**

Dans un Dockerfile, que fait réellement l'instruction EXPOSE 80 ?

- ☐ **a.** Elle configure le pare-feu du serveur
- ☐ **b.** Elle documente le port utilisé par le conteneur, mais ne publie rien sur l'hôte
- ☐ **c.** Elle ouvre le port 80 sur la machine hôte
- ☐ **d.** Elle redirige automatiquement le port 80 vers le port 8080

**Question 15 — Pourquoi Compose**

Quel est l'intérêt de Docker Compose par rapport à des docker run successifs ?

- ☐ **a.** Compose rend les conteneurs plus rapides
- ☐ **b.** Compose remplace le Dockerfile
- ☐ **c.** Décrire toute la stack (services, ports, volumes) dans un fichier versionnable et la lancer en une commande
- ☐ **d.** Compose est obligatoire pour utiliser des volumes

**Question 16 — Lancer la stack**

Quelle commande lance tous les services d'un fichier Compose en arrière-plan ?

Réponse : ________________________________________

**Question 17 — Communication entre services**

Dans une stack Compose, comment le service web joint-il le service de base de données nommé db ?

- ☐ **a.** En utilisant localhost
- ☐ **b.** En utilisant l'adresse IP publique du serveur
- ☐ **c.** En utilisant directement le nom du service (db) comme nom d'hôte
- ☐ **d.** C'est impossible, les services sont isolés entre eux

**Question 18 — Le contenu d'un service**

Que peut-on déclarer pour un service dans un fichier Compose ? (plusieurs réponses)

*Plusieurs réponses possibles.*

- ☐ **a.** Les ports publiés (ports:)
- ☐ **b.** La vitesse de la connexion Internet
- ☐ **c.** Les volumes montés (volumes:)
- ☐ **d.** La marque du serveur physique
- ☐ **e.** L'image utilisée (image:)

**Question 19 — Vrai ou Faux - compose down**

La commande docker compose down arrête et supprime les conteneurs de la stack, mais conserve par défaut les volumes nommés.

☐ Vrai  ☐ Faux

**Question 20 — Un service rapidement**

Vous devez fournir en local une base MySQL et son interface phpMyAdmin pour un projet. Quelle est la solution la plus adaptée vue en TP ?

- ☐ **a.** Créer une machine virtuelle complète avec Debian
- ☐ **b.** Installer MySQL et phpMyAdmin directement sur votre machine
- ☐ **c.** Un fichier Docker Compose avec les deux services officiels
- ☐ **d.** Développer sans base de données et l'ajouter à la fin


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (a) L'image est le modèle (figé), le conteneur est une instance en cours d'exécution de cette image — *Exact, on peut lancer plusieurs conteneurs à partir de la même image.*

**2.** Faux — *Exact, c'est faux : le conteneur partage le noyau de la machine hôte, c'est ce qui le rend léger et rapide à démarrer.*

**3.** (b) Isoler chaque service et ses dépendances, sans « polluer » le serveur — *Exact, on peut installer, mettre à jour ou supprimer un service sans impacter les autres.*

**4.** Docker Hub (accepté aussi : docker hub, DockerHub)

**5.** (a) docker ps — *Exact, avec l'option -a vous voyez aussi les conteneurs arrêtés.*

**6.** (d) Elle lance le conteneur en arrière-plan (détaché du terminal) — *Exact, sans cette option le terminal reste attaché à la sortie du conteneur.*

**7.** (b) -p

**8.** (b) À conserver des données en dehors du conteneur, pour qu'elles survivent à sa suppression — *Exact, sans volume, les données écrites dans le conteneur disparaissent avec lui.*

**9.** docker pull → Télécharger une image depuis un registre ; docker exec → Exécuter une commande dans un conteneur en cours d'exécution ; docker logs → Afficher la sortie d'un conteneur ; docker stop → Arrêter proprement un conteneur

**10.** FROM (accepté aussi : from)

**11.** (a) RUN exécute une commande pendant la construction de l'image, CMD définit la commande lancée au démarrage du conteneur — *Exact, il peut y avoir plusieurs RUN, mais un seul CMD effectif.*

**12.** (b) Elle construit une image nommée monapp à partir du Dockerfile du dossier courant — *Exact, le -t « tague » l'image avec un nom, le point indique le contexte de build.*

**13.** Vrai — *Exact, chaque instruction crée une « couche » ; l'ordre des instructions a donc un impact sur l'efficacité du cache.*

**14.** (b) Elle documente le port utilisé par le conteneur, mais ne publie rien sur l'hôte — *Exact, c'est l'option -p (ou ports dans Compose) qui publie réellement le port.*

**15.** (c) Décrire toute la stack (services, ports, volumes) dans un fichier versionnable et la lancer en une commande — *Exact, le fichier compose.yaml documente et reproduit l'installation.*

**16.** docker compose up -d (accepté aussi : docker-compose up -d)

**17.** (c) En utilisant directement le nom du service (db) comme nom d'hôte — *Exact, Docker fournit une résolution de noms interne entre les services d'une même stack.*

**18.** (a) Les ports publiés (ports:) ; (c) Les volumes montés (volumes:) ; (e) L'image utilisée (image:) — *Oui, l'équivalent du -p. / Oui, l'équivalent du -v. / Oui, ou un build: vers un Dockerfile.*

**19.** Vrai — *Exact, il faut ajouter l'option -v pour supprimer aussi les volumes (et donc les données).*

**20.** (c) Un fichier Docker Compose avec les deux services officiels — *Exact, deux images officielles, un fichier, une commande : l'environnement est prêt et jetable.*
