# Android Compose et le BLE

::: details Sommaire
[[toc]]
:::

- [Slides Android BLE](/cours/android_ble.md)
- [Support Android Base](./android-base.md)

## Introduction

Maintenant que nous avons vu les bases de la conception d'application Android avec Compose, nous allons voir comment intéragir avec des périphériques BLE.

Dans cette partie nous allons voir comment intéragir avec des périphériques BLE :

- Découverte des périphériques (Scan)
- Connexion à un périphérique (Connect)
- Lire des données (Notify)
- Ecrire des données (Write)

## Prérequis

Pour réaliser ce TP, vous avez besoin des notions vu précédemment dans [Android Compose](./android-base.md). Et plus particulièrement le décopage MVVM (Model View ViewModel), en effet nous allons utiliser ce pattern pour dialoguer avec les périphériques BLE.

## Le périphérique BLE

Dans ce TP nous allons utiliser un périphérique BLE à base d'ESP32. Ce dernier est programmé pour simuler un « lampe connectée ». Il possède les caractéristiques suivantes :

**En BLE :**

- Toggle de la LED.
- Comptage du nombre d’allumages.
- Changement du nom de la carte (persistant).
- Notification lors de l’allumage / extinction de la LED.
- Liste des réseaux Wifi environnants.
- Définition des credentials Wifi (persistant).

**En WiFi :**

- Allumage et extinction de la LED (toggle).
- Récupération du statut.

**En Physique :**

- Utilisation du bouton pour allumer et éteindre la LED.

<center>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/LQsL3jDOc7o?si=6ceKFVKceKS3GlwU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</center>

<center>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/W9N-JtwWSzE?si=6ceKFVKceKS3GlwU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</center>

## Rappel sur le fonctionnement du BLE

Le BLE est un protocole de communication sans fil basse consommation. Il est utilisé pour connecter des périphériques à faible consommation d'énergie, comme les montres connectées, les capteurs, les appareils médicaux, les serrures de porte, les thermostats, les télécommandes, etc.

Il repose sur le principe de GATT (Generic Attribute Profile) qui permet de définir des services et des caractéristiques. Les services sont des collections de caractéristiques et les caractéristiques sont des valeurs de données qui peuvent être lues ou écrites.

Dans le cadre d'un échange BLE nous avons donc :

- Un Serveur : Le périphérique BLE qui expose des services et des caractéristiques. (Dans notre cas l'ESP32).
- Un Client : L'application qui va se connecter au serveur pour lire ou écrire des données. (Dans notre cas l'application Android).

::: tip Fonctionnement asynchrone

Le BLE est un protocole asynchrone, c'est à dire que les actions de lecture ou d'écriture ne sont pas bloquantes. Il faut donc gérer les réponses de manière asynchrone.

Exemple lecture :

1. L'application Android demande à lire une caractéristique.
2. Le serveur répond avec la valeur de la caractéristique.

**Il faut donc gérer le cas « d'attente » de la réponse.** Ça veux dire que l'application doit afficher des loaders au bon moment (pendant la connexion par exemple).

Sur Android l'affichage d'un loader :

```kotlin
// Affichage du loader
if(isLoading) {
    CircularProgressIndicator()
}
```

:::