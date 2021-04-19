# Création stack OpenFaas (faasd) sur un Raspberry Pi

Ce document s'intéresse uniquement à la partie création de la stack initial faasd qui nous permettra d'utiliser OpenFaas. Le but de ce document est de monter rapidement / simplement une stack OpenFaas pour tester la solution.

Pour simplifier, la création de l'environnement nous utiliserons [Faasd](https://github.com/openfaas/faasd/)

## Installer faas-cli

`faas-cli` est l'outil / client qui nous permettra de parler avec notre instance OpenFaas. Bien évidemment nous allons travailler dans un environnement client / server.

- Votre machine sera le client (via faas-cli).
- Notre « Raspberry Pi » sera le serveur faisant fonctionner notre stack OpenFaas.

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

```sh
$version = (Invoke-WebRequest "https://api.github.com/repos/openfaas/faas-cli/releases/latest" | ConvertFrom-Json)[0].tag_name
(New-Object System.Net.WebClient).DownloadFile("https://github.com/openfaas/faas-cli/releases/download/$version/faas-cli.exe", "faas-cli.exe")
```

## OpenFaas et RaspberryPi

Pour installer OpenFaas sur un Raspberry Pi il suffit de :

```
sudo apt install git -y
git clone https://github.com/openfaas/faasd
cd faasd
./hack/install.sh
```

::: danger Attention c'est long !
L'installation va prendre quelques minutes, mais le premier démarrage va également prendre quelques secondes.
:::

## Récupération de l'authentification

Votre machine est maintenant créée. Pour pouvoir se connecter à Open-faas vous devez récupérer le fichier `basic-auth-password` pour ça nous allons :

- Avoir besoin de l'IP de votre RaspberryPi
- Récupéré via SSH le fichier d'auth

Dans mon cas l'IP est dans `openfaas.local`, via la commande :

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

Vous pouvez également accéder à l'interface d'admin WEB via :

[openfaas.local:8080](openfaas.local:8080)

Votre ordinateur est maintenant prêt, nous avons donc créé :

- Une Raspberry Pi contenant open-faas (votre serveur).
- Le CLI pour contrôler `open-faas`.
- Connecter votre ordinateur à votre serveur.
