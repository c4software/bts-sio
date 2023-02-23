# TP1c. Prendre en main la ligne de commande.

::: details Sommaire
[[toc]]
:::

::: tip TP évalué

Nous sommes à un point étape. La réalisation de ce TP sera évaluée. Il sera évalué de la manière suivante :

- VM fonctionnelle : **5 points** (en intégrant les éléments de sécurité).
- Accès à la VM via échange de clés : **2 points**. (La clé publique à ajouter à votre VM est disponible en fin de TP).
- Réalisation des étapes présentées dans le TP : **5 points**.
- Fourniture d'un rapport illustrant les différentes étapes : **2 points**.
- Fourniture de la fiche serveur : **2 points**.

:::

## Introduction

Avant de commencer, il est important de savoir que la ligne de commande est un outil puissant et très utile. Maîtriser les rudiments de celle-ci vous permettra de gagner du temps et donc d’être plus efficace.

## Préparation

Pour réaliser ce TP, vous aurez besoin d'un environnement de Linux. Je vous propose d'en créer une en suivant le [TP précédent](./tp1b.md).

## Pré-requis

Dans ce TP nous allons utiliser l'accès SSH pour nous connecter à la VM.

Vous êtes prêt ?

<iframe src="https://giphy.com/embed/2uIlaHVsql55CLP3as" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

## Ressources

Pour réaliser ce TP, vous aurez besoin de :

- [Aide mémoire Debian](/cheatsheets/serveur/linux-debian-based.md)
- [Générateur de configuration](/cheatsheets/serveur/debian-reseau.md)
- [Aide mémoire clé SSH](/cheatsheets/ssh-key/)

## La VM

Pour ce TP je vais vous demander de créer une VM. Cette VM doit respecter les spécifications suivantes :

- Nom de la VM : `<votre nom>-ligne-de-commande`.
- OS : Debian 11.
- Mémoire : 1Go.
- CPU : 1.
- Disque : 10Go.
- Utilisateur : `<votre nom>`.
- Mot de passe : `<votre mot de passe>` (mot de passe de votre choix mais qui respecte les règles de sécurité).

::: tip Rappel

Ici je ne vais pas vous redonner les commandes, je vous laisse chercher dans les ressources :

- [Aide mémoire Debian](/cheatsheets/serveur/linux-debian-based.md)
- [TP précédent](./tp1b.md)
- Votre prise de notes

c'est à vous de jouer !

:::

### Étape 1 : Créez une VM

À l'aide des TP précédents, créez une VM qui respecte les spécifications ci-dessus.

### Étape 2 : Configurez la VM

Configurez la VM pour qu'elle respecte les spécifications suivantes :

- La VM doit avoir une IP statique. (Vous pouvez utiliser le générateur de configuration).
- La VM doit avoir accès à Internet (`ping www.google.com` doit fonctionner).
- La VM doit posséder les **vmtools**.

### Étape 3 : Connectez-vous à la VM

Pour vous connecter à la VM vous devez utiliser la commande `ssh` depuis votre machine hôte. Pour que cela fonctionne :

- Vous devez avoir installé le serveur SSH sur votre VM (voir [TP précédent](./tp1b.md)).
- Vous devez avoir généré une clé SSH sur votre machine hôte et l'avoir ajoutée à votre VM (voir [TP précédent](./tp1b.md)).
- L'accès par mot de passe doit être désactivé sur votre VM (voir [TP précédent](./tp1b.md)).
- L'accès `root` par SSH doit être désactivé sur votre VM (voir [TP précédent](./tp1b.md)).

## L'OS

Nous avons maintenant une VM qui fonctionne. Nous allons maintenant nous intéresser à l'OS et les programmes qui y sont installés. Avant de commencer nous allons voir comment utiliser les bases de la ligne de commande.

- `ls` : Liste les fichiers et dossiers. (Exemple : `ls -l` affiche les fichiers et dossiers avec les permissions).
- `cd` : Change de dossier. (Exemple : `cd /var/log` change de dossier pour aller dans le dossier `/var/log`).
- `mkdir` : Crée un dossier. (Exemple : `mkdir /var/log/mon-dossier` crée le dossier `/var/log/mon-dossier`).
- `touch` : Crée un fichier. (Exemple : `touch /var/log/mon-fichier` crée le fichier `/var/log/mon-fichier`).
- `rm` : Supprime un fichier. (Exemple : `rm /var/log/mon-fichier` supprime le fichier `/var/log/mon-fichier`).
- `rm -r` : Supprime un dossier. (Exemple : `rm -r /var/log/mon-dossier` supprime le dossier `/var/log/mon-dossier`).
- `mv` : Déplace un fichier. (Exemple : `mv /var/log/mon-fichier /var/log/mon-dossier` déplace le fichier `/var/log/mon-fichier` dans le dossier `/var/log/mon-dossier`).
- `cp` : Copie un fichier. (Exemple : `cp /var/log/mon-fichier /var/log/mon-dossier` copie le fichier `/var/log/mon-fichier` dans le dossier `/var/log/mon-dossier`).
- `cat` : Affiche le contenu d'un fichier. (Exemple : `cat /var/log/syslog` affiche le contenu du fichier syslog).
- `nano` : Éditeur de texte (_personnellement je préfère `vim`_). (Exemple : `nano /var/log/mon-fichier` ouvre le fichier `/var/log/mon-fichier` dans l'éditeur de texte).
- `tail` : Affiche les dernières lignes d'un fichier. (Exemple : `tail -f /var/log/syslog` affiche les dernières lignes du fichier syslog en temps réel).

Il existe de nombreuses autres commandes, mais celles-ci sont les plus utilisées. **Il est important de savoir les utiliser.**

### Créer une arborescence

À l'aide des commandes vues précédemment, créez une arborescence qui respecte les spécifications suivantes :

- Créez un dossier `vbrosseau` dans le dossier `/home/`.
- Créez un dossier `tp1` dans le dossier `/home/vbrosseau/`.
- Créez un fichier `fichier1.md` dans le dossier `/home/vbrosseau/tp1/`. (deux solutions possibles, via `touch` ou via `nano`).
- Créez un fichier `fichier2.md` dans le dossier `/home/vbrosseau/tp1/`. (deux solutions possibles, via `touch` ou via `nano`).
- Mettre le contenu suivant dans le fichier `fichier1` :

```bash
Voici le contenu du fichier 1.

- Ligne 1
- Ligne 2
- Ligne 3
```

- Mettre le contenu suivant dans le fichier `fichier2` :

```bash
Voici le contenu du fichier 2.

- Ligne 1
- Ligne 2
- Ligne 3
```

- Déplacez le fichier `fichier1.md` dans le dossier `/home/vbrosseau/`.
- Dupliquez le fichier `fichier2.md` dans le dossier `/home/vbrosseau/tp1/` et renommez le `fichier2bis.md`.
- Renommez le fichier `fichier1.md` en `introduction.md`.
- Changer le contenu du fichier `introduction.md` pour qu'il contienne :

```bash
Avec ce fichier je vais avoir une bonne note.
```

::: detail Solution (je vous conseille de faire l'exercice avant de regarder la solution)

```bash
mkdir /home/vbrosseau
mkdir /home/vbrosseau/tp1
touch /home/vbrosseau/tp1/fichier1.md
touch /home/vbrosseau/tp1/fichier2.md
nano /home/vbrosseau/tp1/fichier1.md
nano /home/vbrosseau/tp1/fichier2.md
mv /home/vbrosseau/tp1/fichier1.md /home/vbrosseau/
cp /home/vbrosseau/tp1/fichier2.md /home/vbrosseau/tp1/fichier2bis.md
mv /home/vbrosseau/fichier1.md /home/vbrosseau/introduction.md
nano /home/vbrosseau/introduction.md
```

:::

### Installer un serveur web

Notre serveur a maintenant besoin d'un service Web (HTML seulement), nous allons donc y installer Apache. Nous allons utiliser la commande `apt` pour installer Apache.

- Installez Apache avec la commande `apt`.
- Vérifiez que le service Apache est bien lancé.

::: tip Comment faire ? 
Je vous laisse regarder dans les ressources du TP précédent (voir [TP précédent](./tp1b.md)). Pour voir comment installer Apache.
:::

::: detail Solution (je vous conseille de faire l'exercice avant de regarder la solution)

```bash
apt update
apt install apache2
systemctl status apache2
```

:::

#### Créer votre page web

Vous êtes en SLAM, du coup le Web vous conaissez. Créez une page web qui respecte les spécifications suivantes :

- Le titre de la page doit être `SLAM 4`.
- Le titre principal de la page doit être `SLAM 4`.
- Le texte de la page doit être `Bienvenue sur la page de SLAM 4`.
- Le texte de la page doit être en rouge et en gras et centré.
- Votre page doit contenir 3 liens vers les pages suivantes :
  - [Google](https://www.google.com)
  - [Facebook](https://www.facebook.com)
  - [Twitter](https://www.twitter.com)