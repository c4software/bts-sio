# GitLab

Introduction au travail à plusieurs avec GIT. 

## Ressources utiles

* [Aide mémoire](https://github.com/c4software/cheatsheet/blob/master/git.md)
* [Google](https://docs.gitlab.com/ee/README.html)
* [Livre Git en ligne](https://git-scm.com/book/fr/v2)
* [GitLab.com](https://www.gitlab.com/)

## Situation

L’entreprise ou vous effectuez votre stage utilise GitLab, vous allez donc devoir utiliser en plus de GIT un outil permettant de gérer votre « workflow de travail ».

### Questions

* Pourquoi à votre avis l’entreprise utilise GitLab ?
* Pourquoi GitLab plutôt que GitHub ?

## Création du compte

Créer votre compte sur GitLab.com. Une fois votre compte créé « Demander l’accès au groupe : [BTS SIO Chevrollier](https://gitlab.com/bts-sio-chevrollier)

### Questions

* Pourquoi devez-vous demander l’accès ?
* Pourquoi est-ce important ?
* Si nous étions sur un GitLab « privé » (interne à l’entreprise) cela aurait-il été aussi important ?

## Cloner le projet

Maintenant que votre compte est actif, vous pouvez cloner le projet :

### Échange de clef

Pour vous reconnaitre GitLab / Github utilise un système de clef. Cette clef garantie votre identité sans utiliser un mot de passe.

#### Génération de votre clef

Sur votre ordinateur, en ligne de commande :

```
$ ssh-keygen
```

Deux fichiers seront créé une clef « publique » ET une clef privée.

⚠️ ⚠️  Vous ne devez JAMAIS rendre publique votre clef **privée**. Si ça vous arrive, vous devez imédiatement révoquer les clefs !

#### Envoyer votre clef sur GitLab

[Ajouter une clef sur votre profil](https://gitlab.com/profile/keys)

### Cloner le projet sur votre machine

```
$ 
```

## Traiter une des issues

Un ensemble « d’issues » / tickets dans le projet « SIO 2017-2018 » sont disponibles choisissez en une. Traitez là en utilisant le « Worflow GitLab » :

* Assignation de l’issue à vous même.
* Création d’une branche relative à l’issue (un bouton permet de le faire directement).
* Modification du code.
* Création d’une « merge request ».
* Assigner à un autre étudiant le « merge » du code que vous venez d’éffectuer.

### Mettre à jour le code local.

```
$ 
```

### Changer de branch

```
$
```

### Envoyer vos modifications sur le serveurs GitLab

```
$ 
```

### Question

* Pourquoi travailler de cette façon ?

## Bonne nouvelle ! 

Vous venez (normalement) d’avoir au moins un « merge request » d’assigner. Vous allez devoir traiter la demande, à votre avis comment se déroule la suite ?

## La revue de code

* Regarder l’issue.
* Regarder le code de votre « collègue ».
* Apporter des commentaires
	* Dans l’issue, général.
	* Directement dans la partie code de l’issue.
* Laisser votre collègue éffectuer « les corrections » par rapport à votre commentaire (ou débattre de pourquoi, etc)
* Si tout vous semble correcte « Merger » les modifications.

### Questions

* Quel est l’intérêt ?
* Est-ce contraignant ?
* Vous y voyez un intérêt ?
* À votre avis, est-il possible d’améliorer la revue de code ?
* En situation réel, est-ce votre rôle de « merger le code » ?
