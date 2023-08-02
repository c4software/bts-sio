---
description: Ce document s'intéresse uniquement à la partie création de la stack initial faasd qui nous permettra d'utiliser OpenFaas. Le but de ce document est de monter rapidement / simplement une stack OpenFaas pour tester la solution.
---

# Création stack OpenFaas (faasd) local via Multipass

Ce document s'intéresse uniquement à la partie création de la stack initial faasd qui nous permettra d'utiliser OpenFaas. Le but de ce document est de monter rapidement / simplement une stack OpenFaas pour tester la solution.

Pour simplifier, la création de l'environnement nous utiliserons [Faasd](https://github.com/openfaas/faasd/)

## Installer Multipass

MultiPass « Ubuntu VMs on demand for any workstation », est une solution qui nous permettra de monter rapidement des VMs administrable et accessible en ligne de commande.

Installer [multipass](https://multipass.run/)

Multipass, est une bonne solution pour tester rapidement des outils en ligne de commande Linux sans quitter votre machine Windows / MacOS.

👉 Vous souhaitez être full-stack ? Ce que nous allons voir ici est les bases des manipulations à connaitres.

## Installer faas-cli

### Linux et Mac

Sans être root :

```sh
curl -sSL https://cli.openfaas.com | sh
```

Via brew (Mac OS) :

```sh
brew install faas-cli
```

### Windows Powershell

Vous êtes sous Windows ? C'est également installable via Powershell

```sh
$version = (Invoke-WebRequest "https://api.github.com/repos/openfaas/faas-cli/releases/latest" | ConvertFrom-Json)[0].tag_name
(New-Object System.Net.WebClient).DownloadFile("https://github.com/openfaas/faas-cli/releases/download/$version/faas-cli.exe", "faas-cli.exe")
```

## Configuration Cloud-config

Pour créer la machine nous allons utiliser `Cloud-config` ce fichier de configuration va initialiser la VM avec l'ensemble des dépendances nécessaires au bon fonctionnement.

```sh
curl -sSLO https://raw.githubusercontent.com/openfaas/faasd/master/cloud-config.txt
```

CloudConfig va nous permettre de pré-parametrer notre VM, dès le démarrage de celle-ci sera préconfiguré avec les paramètrage spécifié dans `cloud-config.txt`.

::: danger
👋 Vous avez confiance ? Vous avez ouvert le fichier ? Vous ne devriez pas… Je vous invite **vivement** de regarder son contenu.
:::

## SSH Key

Afin de pouvoir vous connecter à la machine il faut modifier le fichier `cloud-config.txt` pour y ajouter votre clé SSH

```sh
ssh-add -L
```

Éditer dans le fichier `cloud-config.txt` la ligne `ssh-rsa` pour mettre votre clé.

::: warning
Je ne pense pas vous apprendre quelque chose ici… Mais préférez toujours une connexion via une clé à un mot de passe. **TOUJOURS**.

Vous n'en avez pas ? Je suis là !
:::

## Créé et démarrer la VM

```sh
multipass launch --cloud-init cloud-config.txt --name faasd
```

Vous allez constater la force de Multipass. Ici rien à faire sauf attendre.

::: tip Opération longue
Cette opération va prendre quelques minutes en fonction de votre machine. Votre ordinateur (via cloud-init) est entrain de créer une machine disposant de `OpenFaas` mais également de l'ensemble des dépendances nécessaire au bon fonctionnement.
:::

## Récupération de l'authentification

Votre machine est maintenant créée. Pour pouvoir se connecter à OpenFaas vous devez récupérer le fichier `basic-auth-password` pour ça nous allons :

- Avoir besoin de l'IP de votre VM
- Récupéré via SSH le fichier d'auth

```sh
multipass ls
```

![Multipass ls](./res/multipass-ls.png)

Dans mon cas l'IP est dans `172.16.162.4`, via la commande :

```sh
ssh ubuntu@172.16.162.4 "sudo cat /var/lib/faasd/secrets/basic-auth-password" > basic-auth-password
```

## Connexion à l'instance

```sh
export OPENFAAS_URL=http://172.16.162.4:8080 && cat basic-auth-password | faas-cli login -s
```

::: danger N'oubliez pas l'IP
Dans mon exemple l'IP est `172.16.162.4` mais ce n'est peut-être pas votre cas… Je vous invite à vérifier avant de lancer la commande.
:::

## Valider le fonctionnement

```sh
faas-cli version
```

![result](./res/result.png)

Vous pouvez également accéder à l'interface d'admin WEB via :

[172.16.162.4:8080](172.16.162.4:8080)

Votre ordinateur est maintenant prêt, nous avons donc créé :

- Une VM contenant open-faas (votre serveur).
- Le CLI pour contrôler `open-faas`.
- Connecter votre ordinateur à votre serveur.

Source: https://github.com/openfaas/faasd/blob/master/docs/MULTIPASS.md

## La suite ?

Maintenant que nous avons notre serveur, nous allons pouvoir déployer une fonction pour [la suite c'est par ici](./openfaas-quicky-create-faas.md)
