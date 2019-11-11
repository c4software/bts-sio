# GitLab-CI

### L’intégration continue

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

### L’intégration continue ?

- Test immédiat des modifications. <!-- .element: class="fragment" data-fragment-index="1" -->
- Notification rapide en cas de code incompatible ou manquant. <!-- .element: class="fragment" data-fragment-index="1" -->
- Les problèmes d'intégration sont détectés et réparés de façon continue, évitant les problèmes de dernière minute .<!-- .element: class="fragment" data-fragment-index="1" -->
- Une version est toujours disponible pour un test, une démonstration ou une distribution. <!-- .element: class="fragment" data-fragment-index="1" -->

---

### Un outil? Non des outils !

- GitLab-CI
- Jenkins
- SonarQube
- Travis-CI

---

### Pourquoi Gitlab-CI

- Intégration
- Démarrage simple
- Évolutif
- Isolé

---

### Intégration

Disponible dans l’interface de GitLab (même dans la version Cloud)

---

### Démarrage Simple

Un simple fichier yml permet de commencer à faire de l’intégration continue

---

### Évolutif

Plusieurs serveurs (Runners). Lancement conditionné (tags, branch, etc)

---

### Isolé

Les « runners » utilisent Docker (ou autre on y reviendra)

---

### Un fichier le « .gitlab-ci.yml »

##### Exemple :

```yaml

image: node:9.3.0
nodejs_test:
    stage: test
    script:
        - npm install
        - npm test

```

---

### Les runners

- Démon sur une machine
- Piloté par Gitlab-ci (Ordre)
- Taggé (lancement conditionné, OS, tag, etc…)
- Plusieurs mode de fonctionnement : « Executor »

---

### Les executors

- Shell (local)
- Docker
- SSH

---

### Les directives du « .gitlab-ci.yml »

- image
- before_script
- after_script
- stages (test/build/deploy)
- variables
- cache

---

### Les jobs

Les actions à faire pour notre test/compilation/déploiement

- script
- image
- stage (test/build/depoy)
- type
- variables
- only (master par exemple)
- except (master par exemple ;))
- tags (lancement uniquement sur les runners avec le même tag)
- allow_failure
- when (manuel, tag, etc)
- dependencies
- artifacts
- cache
- before_script
- after_script
- environment
- coverage
- retry

---

### Gestion du cache

Gagner du temps (et économiser des ressources), dans la définition :

```yaml
cache:
    untracked: true
    key: "$CI_PROJECT_ID"
    paths:
        - nodes_modules/
        - plugins/
```

---

### Les artifacts

La force de Gitlab-CI

- Sauvegarde du résultat de l’intégration continue
- Attaché au build
- Intégré à l’interface de Gitlab

---

#### Dans une « stage »

```yaml
artifacts:
    paths:
        - platforms/android/build/outputs/apk/
```

---

### Cas d’usages

- Tests unitaires
- Compilation d’application (Android, iOs)
- « Compilation » de site statique
- Hébergement de « page » directement dans GitLab
- Etc…

---

### Exemple 1: Cordova

```yaml
image: c4software/cordova-light

stages:
    - deploy

cache:
    untracked: true
    key: "$CI_PROJECT_ID"
    paths:
        - plugins/

android_debug:
    stage: deploy
    when: manual
    script:
        - cordova platform add android
        - cordova build android
    artifacts:
        paths:
            - platforms/android/build/outputs/apk/
```

---

### C’est tout !

#### GitLab-CI c’est aussi simple que ça !

---

### Allez plus loin…

#### Héberger des pages « web » sur GitLab

---

### Exemple 2: GitLab Page

```yaml
image: yasb:latest 

stages:
    - deploy

pages:
    stage: deploy
    script:
        - make full && git add --all && git commit -am "Build" && mv output public
    artifacts:
        paths:
            - public
```

---

### Quelques astuces / remarques

- Mettre en cache certains dossiers (exemple node_modules).
- GitLab-CI c’est de l’automatisation des taches (refait à l’identique à chaque fois).
- Vous pouvez interdir l’execution du gitlab-ci en mettant « [ci skip] » dans le message de commit.

---

### Des questions ?