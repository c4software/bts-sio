---
description: Dans ce TP nous allons voir comment créer une VM (machine virtuelle) sur la ferme VMWare du BTS SIO à Angers depuis un modèle.
---

# TP1. Créer une VM sur la ferme à partir d'un modèle.

::: details Sommaire
[[toc]]
:::

## Objectifs

Dans ce TP nous allons voir comment créer une VM sur la ferme VMWare du BTS SIO à Angers depuis un modèle. L'idée de ce TP est de comprendre la démarche à suivre.

::: danger 👋 Attention

La ferme est un équipement partagé par l'ensemble des étudiants du BTS (1ère et 2ème année). Il est donc important de respecter quelques règles d'utilisation pour une utilisation optimale de la ferme, et surtout **dans l'intérêt de tous**.

:::

Dans ce TP nous allons utiliser un modèle déjà créé. Si vous souhaitez créer une VM sans modèle, vous pouvez suivre le [TP1](./tp1.md).

## Pré-requis

::: tip Uniquement disponible pour le Lycée / VPN

Pour réaliser ce TP vous devez :

- Être connecté à la ferme du BTS SIO à Angers (ou via le VPN).
- Avoir un compte sur L'AD.

:::

## Les étapes

Vous retrouverez ci-dessous les étapes à suivre pour réaliser une machine depuis un modèle.

### 0. Créer la VM

Pour créer une VM, il faut :

- Sélectionner le modèle dans le dossier « MODELES ».
- Clique droit sur la VM que vous souhaitez prendre comme modèle
- Puis « Nouvelle VM à partir de ce modèle ».

### 1. Choix du modèle dans la liste

![Type de création](./res/modele-step-1.jpg)

::: tip 📝 Remarque

Le nom du modèle est composé de la façon suivante :

- `MODELE-` : Préfixe.
- `OS` : Nom de l'OS (exemple : `debian`).
- `VERSION` : Version de l'OS (exemple : `11.5`).
- `UTILISATEUR` : Nom de l'utilisateur pour utiliser le modèle (exemple: `root`).
- `Mot de passe` : Mot de passe de l'utilisateur pour utiliser le modèle (exemple : `root`). **Ce mot de passe est à changer une fois la VM créée.**

:::

### 3. Nom de la VM et emplacement

![Nom de la VM et emplacement](./res/modele-step-3.jpg)

### 4. Configuration de la VM

![Ressources](./res/modele-step-4.jpg)

### 5. Configuration du stockage

![Stockage](./res/modele-step-5.jpg)

### 6. Personnalisation de la VM

![Réseau](./res/modele-step-6.jpg)

### 7. Choix du VLAN

N'oubliez pas de choisir le VLAN pour votre VM.

![VLAN](./res/modele-step-7.jpg)

## Premier démarrage

Maintenant que votre VM est créée, il faut la démarrer, comme pour n'importe quelle autre VM.

Cependant, vu qu'il s'agit d'une VM créée à partir d'un modèle, il y a quelques étapes à suivre pour la configurer.

- Changer la configuration réseau.
- Changer le mot de passe de l'utilisateur `root`.
- Vous créez un compte utilisateur.
- Mettre à jour le système.

### Changer la configuration réseau

Pour cette étape vous pouvez utiliser l'outil disponible dans l'aide mémoire :

En utilisant l'aide mémoire [disponible ici](/cheatsheets/serveur/debian-reseau.md), générer une nouvelle adresse IP pour votre serveur.

Une fois suivi vous pouvez vérifier que votre serveur a bien une nouvelle adresse IP en utilisant la commande `ip a`.

Vous pouvez aussi vérifier l'accès à internet en utilisant la commande `ping google.com`

::: tip Ça ne fonctionne pas ?

- Vérifier que votre VM est bien connectée au bon VLAN.
- Vérifier que vous n'avez pas déjà utilisé cette adresse IP.
- Vérifier le serveur DNS (dans les fichiers `/etc/resolv.conf` et `/etc/network/interfaces`).

:::

### Changer le mot de passe de l'utilisateur `root`

Pour changer le mot de passe de l'utilisateur, `root` vous pouvez utiliser la commande `passwd`.

### Créer un compte utilisateur

Pour créer un compte utilisateur, vous pouvez utiliser la commande `adduser`. 

::: tip 📝 Remarque

Il est important de créer un compte utilisateur pour ne pas utiliser le compte `root` pour se connecter.

:::

### Mettre à jour le système

Maintenant que votre VM est prête, il faut mettre à jour le système.

Pour cela vous pouvez utiliser la commande :

```bash
apt update && apt upgrade -y
```

### Changer le nom de la machine

Par défaut le nom de la machine sera celui du modèle. Pour changer le nom de la machine, vous pouvez utiliser la commande `hostnamectl`.

```bash
# Définir le nom de la machine
hostnamectl set-hostname votre-nouveau-nom-de-machine
```

Puis changer le fichiers `/etc/hosts` pour que le nom de la machine soit correct. Dans mon cas je vais remplacer :

```bash
192.168.137.10 modele-debian-11
```

Par :

```bash
192.168.MON.IP vbrosseau-demo-modele
```

Vous pouvez utiliser `vim` ou `nano` pour modifier le fichier.

::: details le fichiers /etc/hosts avant modification

![Fichier /etc/hosts](./res/edit-hostname.jpg)

:::

## Conclusion

Vous avez maintenant une VM fonctionnelle, vous pouvez maintenant l'utiliser pour vos projets.