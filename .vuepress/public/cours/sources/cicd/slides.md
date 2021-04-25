# CI/CD

## L'outillage du DevOps

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

![Flow](./img/flow.png)

---

## CI ?

---

## Integration Continue

- Validation en continu
- Régulièrement
- Workflow GIT
- **Automatique**

---

## CD ?

---

## Déploiement continu

- Si validation OK
- Prépare **le livrable** (Artifact)
- Automatisation des tâches

---

## Livraison continue

- Si validation OK
- Mise en ligne « régulière »
  - Prod
  - Staging

---

## Déploiement ou Livraison ?

### Objectifs identiques

Automatiser pour simplifier et améliorer la qualité.

---

## Revenons au CI

---

- Découpage des actions (Instal, Tests …).
- Répétable à l'infini (à chaque « Push » mais également localement).
- L'échec est possible (pas d'erreur silencieuse)

---

## Tester ?

### Quoi à votre avis ?

---

![Pyramide du test](./img/cost_test_unit.jpeg)

---

## Et le CD ?

---

- Automatiser au maximum (Code, Configuration, Environement …)
  - Dev / Staging / Review
  - Prod
- S'assure de la qualité
- Versionne la livraison (suivi, archivage, rollback)

---

![Workfow](./img/gitlab_workflow_example_11_9.png)

---

## CI / CD

### Complémentaires « s'enchaine »

---

![CI/CD Loop](./img/cicd-loop.jpg.imgw.850.x.jpg)

---

![Workfow](./img/gitlab_workflow_example_extended_v12_3.png)

---

## Rends le test « utile »

Ou plutôt visible et très intéressant

---

- Simplification de leurs exécutions
- Aussi simple qu'en « Local »
- Libère du temps

---

## Que le test ?

Non !

---

- Vérifie le Lint
- Analyse statique
- Couverture du code
- Qualité du code
- Sécurité du code

---

<center><iframe src="https://giphy.com/embed/chES7uKgwnloDZeS03" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>

---

![SonarQube](./img/sonarqube.png)

---

## Ah ouais…

### C'est moins fun…

---

## Si si c'est très intéressant !

### Parlons-en…

---

![SonarQube](./img/sonarqube.png)

---

## Test & Build

- Docker
- Répétable
- Multi-developpeur

---

![Ci Flow Docker](./img/ci_flow.png)

---

## Centralisation des Artifacts

---

- Toujours présent
- Centralisé
- Nommage cohérent

---

## Pourquoi est-ce intéressant ?

---

- Réduction du risque d'erreurs
- Automatisation (plus d'humain)
- La sécurité

---

![Visuel](./img/pipelines_index_v13_0.png)

<center>visuellement compréhensible</center>

---

- Intégré dans le développement
- Simplifie le test
- Amélioration continue

---

- Tester souvent, tester tout le temps.
- Simplification de la livraison
- Automatisation de la livraison
- Déploiement plus fréquent

---

- Réduis les erreurs (tests)
- Amélioration de la qualité
- Centrée client

---

## En résumé

- Pour vous ?
- Pour votre produit ?
- Pour votre client ?

---

## Quels outils ?

- Gratuit ?
- Payant ?
- Cloud / Interne

---

## Cloud : Gratuit / Payant

- Gitlab-CI
- CircleCI
- Bitrise
- Travis
- …

---

## Interne : Gratuit / Payant

- Gitlab-CI
- Jenkins
- …

---

[Une liste plus complète](https://github.com/ligurio/awesome-ci)

---

## Des questions ?
