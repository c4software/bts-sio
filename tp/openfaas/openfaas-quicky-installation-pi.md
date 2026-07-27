---
description: Ce document s'intéresse uniquement à la création de la stack initiale faasd sur un Raspberry Pi. Le but est de monter rapidement et simplement une stack OpenFaas pour tester la solution.
---

# Création stack OpenFaas (faasd) sur un Raspberry Pi

::: details Sommaire
[[toc]]
:::

Ce document s'intéresse uniquement à la création de la stack initiale faasd qui nous permettra d'utiliser OpenFaas. Le but est de monter rapidement et simplement une stack OpenFaas pour tester la solution.

Pour simplifier la création de l'environnement, nous utiliserons [Faasd](https://github.com/openfaas/faasd/).

## Installer faas-cli

`faas-cli` est l'outil / client qui nous permettra de parler avec notre instance OpenFaas. Bien évidemment, nous allons travailler dans un environnement client / serveur :

- Votre machine sera le client (via faas-cli).
- Notre « Raspberry Pi » sera le serveur faisant fonctionner notre stack OpenFaas.

### Linux et Mac

Sans être root :

```sh
curl -sSL https://cli.openfaas.com | sh
```

Via brew (macOS) :

```sh
brew install faas-cli
```

### Windows Powershell

```sh
$version = (Invoke-WebRequest "https://api.github.com/repos/openfaas/faas-cli/releases/latest" | ConvertFrom-Json)[0].tag_name
(New-Object System.Net.WebClient).DownloadFile("https://github.com/openfaas/faas-cli/releases/download/$version/faas-cli.exe", "faas-cli.exe")
```

## OpenFaas et Raspberry Pi

Pour installer OpenFaas sur un Raspberry Pi, il suffit de :

```sh
sudo apt install git -y
git clone https://github.com/openfaas/faasd
cd faasd
./hack/install.sh
```

::: danger Attention c'est long !
L'installation va prendre quelques minutes, et le premier démarrage va également prendre quelques secondes.
:::

## Récupération de l'authentification

Votre stack est maintenant installée. Pour pouvoir vous connecter à OpenFaas, vous devez récupérer le fichier `basic-auth-password`. Pour ça, nous allons :

- Récupérer l'IP de votre Raspberry Pi.
- Récupérer via SSH le fichier d'authentification.

Dans mon cas, la machine est accessible via `openfaas.local`. Via la commande :

```sh
ssh pi@openfaas.local "sudo cat /var/lib/faasd/secrets/basic-auth-password" > basic-auth-password
```

## Connexion à l'instance

```sh
export OPENFAAS_URL=http://openfaas.local:8080 && cat basic-auth-password | faas-cli login -s
```

## Valider le fonctionnement

```sh
faas-cli version
```

![result](./res/result.png)

Vous pouvez également accéder à l'interface d'administration web via :

[http://openfaas.local:8080](http://openfaas.local:8080)

Votre installation est maintenant prête, nous avons donc :

- Un Raspberry Pi contenant OpenFaas (votre serveur).
- Le CLI pour contrôler `OpenFaas`.
- La connexion entre votre ordinateur et votre serveur.

## La suite ?

Maintenant que nous avons notre serveur, nous allons pouvoir déployer une fonction : [la suite, c'est par ici](./openfaas-quicky-create-faas.md).
