---
aside: false
description: Les ressources pour débuter avec Kotlin, puis l'utiliser sur mobile (Android avec Compose) et côté serveur (des API avec Ktor), dans l'ordre dans lequel je vous conseille de les suivre.
---

# Débuter avec Kotlin

Vous trouverez ici les ressources pour apprendre Kotlin, puis l'utiliser dans deux contextes : le **mobile** (une application Android avec Jetpack Compose) et le **serveur** (une API avec Ktor). Les deux parcours partagent le même langage : ce que vous apprenez d'un côté sert directement de l'autre.

::: tip Chaque TP commence par ses slides
Elles présentent la théorie du TP en quelques minutes : prenez le temps de les parcourir avant de commencer.
:::

## Étape 1 : Le langage

Si vous venez du C, du C++ ou du Python, l'aide-mémoire part de ce que vous connaissez déjà pour présenter la syntaxe de Kotlin.

- [L'aide-mémoire Kotlin (depuis le C / C++ ou le Python)](/cheatsheets/kotlin/)

## Étape 2 : Kotlin Mobile (Android avec Compose)

1. [Préparer son poste (Android Studio, téléphone en mode développeur)](/cheatsheets/poste-android/)
2. [Découverte des bases d'Android](/tp/android/compose/android-base.md)
3. [Les écrans et les données (navigation, MVVM, permissions)](/tp/android/compose/android-avance.md)
4. [Android et BLE avec la librairie Nordic](/tp/android/compose/android-ble-nordic.md)

::: tip Les supports associés
[Le cours Android Base](/cours/android_base.md), [le cours Android Compose](/cours/android_compose.md) et [le cours Android + BLE](/cours/android_ble.md). Pour comprendre ce que la librairie Nordic fait pour vous : [Android et BLE (sans librairie)](/tp/android/compose/android-ble.md).
:::

## Étape 3 : Kotlin API (Ktor)

1. [Une API Ktor et ses clients, Android et Vue.js (SQLite, organisation en couches)](/tp/android/compose/ktor-api.md)
2. [Créer des API avec Kotlin : le projet (PostgreSQL, Flyway, Exposed, Koin)](/tp/ktor/decouverte.md)
3. [Créer des API avec Kotlin : CRUD et droits (gestion des erreurs, rôles, clés d'API)](/tp/ktor/crud-droits.md)

::: tip Les supports associés
[Les slides d'introduction aux API](/cours/introduction_api.md) et [l'aide-mémoire API](/cheatsheets/api/).
:::

## Outils et ressources externes

- [L'émulateur de la lampe connectée](https://github.com/c4software/emulateur-lampe-ble) : le périphérique BLE des TP, qui tourne sur un PC Linux.
- [Le projet de référence du TP BLE Nordic](/demo/android/lampe-ble-nordic.zip)
- [nRF Connect](https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp) : pour explorer un périphérique BLE depuis son téléphone.
- [La documentation officielle de Kotlin](https://kotlinlang.org/docs/home.html)
- [La documentation officielle de Ktor](https://ktor.io/docs/)

::: tip Et ensuite ?
[L'introduction à Kotlin Multiplateforme](/tp/android/compose-multiplateforme/introduction.md) pour cibler plusieurs plateformes avec le même code, et [les TP mobile](/pages/categories/les-tp-mobile.md) pour le parcours Android complet.
:::
