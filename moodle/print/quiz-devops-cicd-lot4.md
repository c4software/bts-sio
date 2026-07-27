# DevOps Lot 4 : CI/CD (Gitlab-CI, pipelines, runners)

Nom : ______________________  Prénom : ______________________

**Question 1 — L'intégration continue**

Qu'est-ce que l'intégration continue (CI) ?

- ☐ **a.** Fusionner toutes les branches une fois par mois
- ☐ **b.** Déployer manuellement le site chaque vendredi
- ☐ **c.** Vérifier automatiquement (compilation, tests) chaque modification poussée sur le dépôt
- ☐ **d.** Sauvegarder le code sur une clef USB

**Question 2 — Livraison ou déploiement**

Quelle est la différence entre la livraison continue et le déploiement continu ?

- ☐ **a.** La livraison concerne le front, le déploiement le back
- ☐ **b.** Aucune, ce sont deux synonymes
- ☐ **c.** Le déploiement continu ne passe pas par les tests
- ☐ **d.** En livraison continue la mise en production reste déclenchée manuellement, en déploiement continu elle est automatique

**Question 3 — Le fichier**

Quel fichier, placé à la racine du dépôt, décrit la pipeline Gitlab-CI ?

Réponse : ________________________________________

**Question 4 — Déclenchement**

Quand une pipeline Gitlab-CI se déclenche-t-elle par défaut ?

- ☐ **a.** Uniquement lors de la création d'un tag
- ☐ **b.** À chaque push sur le dépôt
- ☐ **c.** Une fois par jour, la nuit
- ☐ **d.** Uniquement quand on clique sur un bouton

**Question 5 — Les stages**

À quoi servent les stages dans un .gitlab-ci.yml ?

- ☐ **a.** À limiter le nombre de développeurs sur le projet
- ☐ **b.** À ordonner l'exécution des jobs : un stage ne démarre que si le précédent a réussi
- ☐ **c.** À définir les branches du dépôt
- ☐ **d.** À colorer l'interface de Gitlab

**Question 6 — Vrai ou Faux - Échec d'un job**

Si un job échoue, les stages suivants de la pipeline ne sont pas exécutés et la pipeline est marquée en échec.

☐ Vrai  ☐ Faux

**Question 7 — L'image d'un job**

Dans un job, que définit le mot-clef image: (par exemple image: node:22) ?

- ☐ **a.** Le logo du projet
- ☐ **b.** L'image de fond affichée dans l'interface Gitlab
- ☐ **c.** L'image Docker qui sera déployée en production
- ☐ **d.** L'image Docker dans laquelle le script du job sera exécuté

**Question 8 — Vrai ou Faux - Environnement propre**

Chaque job démarre dans un environnement neuf : les fichiers créés par un job ne sont pas automatiquement disponibles dans le suivant.

☐ Vrai  ☐ Faux

**Question 9 — Les artifacts**

À quoi servent les artifacts d'un job ?

- ☐ **a.** À accélérer le téléchargement des images Docker
- ☐ **b.** À stocker les mots de passe du projet
- ☐ **c.** À archiver le code source du dépôt
- ☐ **d.** À conserver des fichiers produits par le job et les transmettre aux jobs suivants

**Question 10 — Cibler la branche**

Complétez : pour ne lancer un job que sur la branche par défaut, on écrit rules: - if: $CI_COMMIT_BRANCH == ______ .

(a) $CI_JOB_NAME / (b) $CI_DEFAULT_BRANCH / (c) $CI_PIPELINE_ID / (d) $CI_PAGES_URL

**Question 11 — Associez les mots-clefs**

Associez chaque mot-clef d'un .gitlab-ci.yml à son rôle.

| | À relier à… |
|---|---|
| script → ______ | • Les commandes exécutées par le job |
| stage → ______ | • L'étape de la pipeline à laquelle appartient le job |
| rules → ______ | • La liste des développeurs autorisés |
| artifacts → ______ | • Les conditions de déclenchement du job |
|  | • Les fichiers conservés à la fin du job |
|  | • Le nom de la branche principale du dépôt |

**Question 12 — Gitlab Pages**

Pour publier un site avec Gitlab Pages, quelles sont les deux conditions à respecter dans la pipeline ?

- ☐ **a.** Un fichier pages.yml et un dossier site
- ☐ **b.** Un job nommé pages et les fichiers du site placés dans un dossier public déclaré en artifact
- ☐ **c.** Un tag de version et un dossier dist
- ☐ **d.** Un job nommé deploy et un dossier www

**Question 13 — Le runner**

Qu'est-ce qu'un runner Gitlab ?

- ☐ **a.** Un robot qui écrit le code à votre place
- ☐ **b.** Une machine (ou un conteneur) qui exécute les jobs des pipelines
- ☐ **c.** Un développeur chargé de valider les merge requests
- ☐ **d.** Le serveur qui héberge le dépôt Git

**Question 14 — Vrai ou Faux - Minutes offertes**

Sur gitlab.com, l'utilisation des runners partagés est gratuite et illimitée.

☐ Vrai  ☐ Faux

**Question 15 — Les tags d'un runner**

À quoi servent les tags associés à un runner ?

- ☐ **a.** À indiquer la version de Gitlab installée
- ☐ **b.** À classer les runners par ordre alphabétique
- ☐ **c.** À numéroter les versions du code déployé
- ☐ **d.** À faire correspondre les jobs et les runners : un job tagué ne s'exécute que sur un runner ayant ce tag

**Question 16 — Les secrets**

Où doit-on stocker un token ou un mot de passe utilisé par la pipeline (par exemple un token Docker Hub) ?

- ☐ **a.** Dans les variables CI/CD du projet (Settings &gt; CI/CD &gt; Variables), idéalement masquées
- ☐ **b.** Directement dans le .gitlab-ci.yml
- ☐ **c.** Dans le nom de la branche
- ☐ **d.** Dans un commentaire du README

**Question 17 — Pourquoi packager**

Quel est l'intérêt de faire produire une image Docker par la pipeline ?

- ☐ **a.** Rendre le code source secret
- ☐ **b.** Éviter d'écrire des tests
- ☐ **c.** Obtenir un livrable identique et exécutable partout, du poste de dev au serveur
- ☐ **d.** Réduire la taille du dépôt Git

**Question 18 — Le service dind**

Pourquoi ajoute-t-on le service docker:27-dind à un job qui construit une image Docker ?

- ☐ **a.** Pour déployer l'image sur le serveur de production
- ☐ **b.** Le job s'exécute déjà dans un conteneur : dind fournit un démon Docker pour pouvoir construire des images à l'intérieur
- ☐ **c.** Pour doubler la vitesse de construction
- ☐ **d.** Pour scanner l'image contre les virus

**Question 19 — Le registre du projet**

Que permet le Container Registry intégré à Gitlab ?

- ☐ **a.** Héberger le site web du projet
- ☐ **b.** Sauvegarder les branches supprimées
- ☐ **c.** Compiler les images plus rapidement que le Docker Hub
- ☐ **d.** Stocker les images Docker construites par la pipeline, à côté du code du projet

**Question 20 — Une bonne pipeline**

Quels éléments retrouve-t-on dans une pipeline complète de déploiement continu vue en TP ? (plusieurs réponses)

*Plusieurs réponses possibles.*

- ☐ **a.** Un déploiement conditionné à la branche par défaut
- ☐ **b.** L'envoi du code par email à l'hébergeur
- ☐ **c.** Un stage de tests exécuté à chaque push
- ☐ **d.** La modification manuelle des fichiers directement sur le serveur
- ☐ **e.** La construction d'un livrable (site compilé ou image Docker)


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (c) Vérifier automatiquement (compilation, tests) chaque modification poussée sur le dépôt — *Exact, l'objectif est de détecter les problèmes au plus tôt, à chaque push.*

**2.** (d) En livraison continue la mise en production reste déclenchée manuellement, en déploiement continu elle est automatique — *Exact, dans les deux cas tout le reste de la chaîne est automatisé.*

**3.** .gitlab-ci.yml (accepté aussi : gitlab-ci.yml)

**4.** (b) À chaque push sur le dépôt — *Exact, c'est le principe du « en continu » : chaque modification est vérifiée.*

**5.** (b) À ordonner l'exécution des jobs : un stage ne démarre que si le précédent a réussi — *Exact, par exemple build puis test puis deploy.*

**6.** Vrai — *Exact, c'est ce qui empêche de déployer un code dont les tests échouent.*

**7.** (d) L'image Docker dans laquelle le script du job sera exécuté — *Exact, chaque job tourne dans un conteneur créé à partir de cette image.*

**8.** Vrai — *Exact, c'est le rôle des artifacts (ou du cache) de transmettre des fichiers entre les jobs.*

**9.** (d) À conserver des fichiers produits par le job et les transmettre aux jobs suivants — *Exact, par exemple le dossier de build transmis au job de déploiement.*

**10.** (b) $CI_DEFAULT_BRANCH

**11.** script → Les commandes exécutées par le job ; stage → L'étape de la pipeline à laquelle appartient le job ; rules → Les conditions de déclenchement du job ; artifacts → Les fichiers conservés à la fin du job

**12.** (b) Un job nommé pages et les fichiers du site placés dans un dossier public déclaré en artifact — *Exact, c'est cette convention qui déclenche la publication.*

**13.** (b) Une machine (ou un conteneur) qui exécute les jobs des pipelines — *Exact, sans runner disponible, la pipeline reste bloquée en attente.*

**14.** Faux — *Exact, c'est faux : le tier gratuit offre un quota mensuel de « compute minutes », d'où l'intérêt de créer son propre runner.*

**15.** (d) À faire correspondre les jobs et les runners : un job tagué ne s'exécute que sur un runner ayant ce tag — *Exact, pratique pour réserver certains jobs à une machine précise.*

**16.** (a) Dans les variables CI/CD du projet (Settings &gt; CI/CD &gt; Variables), idéalement masquées — *Exact, jamais en clair dans le .gitlab-ci.yml qui est versionné et visible.*

**17.** (c) Obtenir un livrable identique et exécutable partout, du poste de dev au serveur — *Exact, l'image versionnée est le livrable : plus de « ça marche sur ma machine ».*

**18.** (b) Le job s'exécute déjà dans un conteneur : dind fournit un démon Docker pour pouvoir construire des images à l'intérieur — *Exact, « dind » signifie Docker in Docker.*

**19.** (d) Stocker les images Docker construites par la pipeline, à côté du code du projet — *Exact, accessible via les variables $CI_REGISTRY et un login automatique dans la CI.*

**20.** (a) Un déploiement conditionné à la branche par défaut ; (c) Un stage de tests exécuté à chaque push ; (e) La construction d'un livrable (site compilé ou image Docker) — *Oui, via rules et $CI_DEFAULT_BRANCH. / Oui, on ne déploie jamais un code non testé. / Oui, c'est le rôle du stage de build.*
