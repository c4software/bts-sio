# Analyse de sécurité : Reverse Engineering

Le reverse engineering, ou ingénierie inverse, est le processus d'analyse d'un système pour en comprendre le fonctionnement interne, souvent dans le but de reproduire ou d'améliorer ce système. Dans le contexte de la sécurité informatique, le reverse engineering est couramment utilisé pour analyser des logiciels malveillants, évaluer la sécurité des applications, et découvrir des vulnérabilités.

## Objectifs du Reverse Engineering en Sécurité

1. **Analyse des logiciels malveillants** : Comprendre le comportement des malwares pour développer des solutions de détection et de prévention.
2. **Évaluation de la sécurité des applications** : Identifier les failles de sécurité dans les logiciels afin de les corriger avant qu'elles ne soient exploitées.
3. **Récupération de données** : Extraire des informations d'un système ou d'un logiciel lorsque l'accès direct n'est pas possible.
4. **Compatibilité et interopérabilité** : Permettre à des systèmes ou logiciels de fonctionner ensemble en comprenant leurs mécanismes internes.

## Objectifs du TP

Dans ce TP, nous allons nous concentrer sur l'analyse d'une application Android simple. Avec comme objectif de dévérouiller certaines fonctionnalités normalement accessibles uniquement après un achats in-app.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pnUSgpbpTJM?si=i5X-XwcC3a0f9Nbl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

::: warning Une note importante
Ce TP est à but éducatif, ici nous modifions une application que j'ai moi même réalisé et mis à disposition. Ne tentez pas de faire cela sur des applications que vous ne possédez pas ou sans l'autorisation explicite de leur auteur, cela pourrait être illégal et contraire aux conditions d'utilisation.
:::

### Étapes du TP

- Tester l'application pour comprendre son fonctionnement normal.
- En fonction des observations, formuler des hypothèses sur la manière dont l'application gère les achats in-app.
- Utiliser des outils de reverse engineering pour analyser le code de l'application.
- Modifier le code de l'application pour contourner les restrictions d'achat in-app.
- Tester la version modifiée de l'application pour vérifier si les fonctionnalités restreintes sont désormais accessibles.

## Télécharger l'application

L'application est disponible sur le playstore via le lien suivant : [https://play.google.com/store/apps/details?id=com.vbrosseau.stackgame](https://play.google.com/store/apps/details?id=com.vbrosseau.stackgame)

Je vous laisse le soin de l'installer pour la tester. Pas d'accès au playstore ? Vous pouvez télécharger l'APK directement ici : [stackgame.apk](https://github.com/c4software/StackGameApp/raw/refs/heads/main/app-release.apk)

## Compte de tests

L'application possède 3 comptes de test pour les différents niveaux d'abonnement :

- NORMAL : `normal@gmail.com`
- PREMIUM : `premium@gmail.com`
- ULTRA : `ultra@gmail.com`

## Les outils nécessaires

Pour décompiler et modifier l'application Android, nous allons utiliser les outils suivants :

- `apktool` : Un outil pour décompiler et recompiler les fichiers APK.
- `vscode` ou tout autre éditeur de texte pour modifier le code décompilé.
- `jarsigner` : Un outil pour signer les APK modifiés afin qu'ils puissent être installés sur un appareil Android.

La magie d'APKTool est qu'il permet de décompiler une application Android en un format lisible, notamment en extrayant les fichiers SMALI, qui sont une représentation intermédiaire du code Java utilisé dans les applications Android. Il permet également de recréér une APK à partir du SMALI modifié.

## Décompilation de l'application

Pour décompiler l'application Android, nous allons utiliser l'outil `apktool`. Cet outil permet de transformer une APK (Android Package) en un format plus lisible, notamment en extrayant les fichiers SMALI, qui sont une représentation intermédiaire du code Java utilisé dans les applications Android.

1. **Installation d'apktool** : Si vous ne l'avez pas déjà, vous pouvez télécharger apktool depuis son site officiel : [https://apktool.org/](https://apktool.org/)
2. **Décompilation de l'APK** : Utilisez la commande suivante pour décompiler l'APK de l'application StackGame :

   ```bash
   apktool d stackgame.apk -o stackgame_decompiled
   ```

   Cette commande va créer un dossier `stackgame_decompiled` contenant les fichiers décompilés.

## Analyse du code

L'analyse du code est la partie la plus importante lors d'un reverse engineering. Nous allons devoir examiner du code sans en connaitre réellement le fonctionnement. Il faudra être méthodique et rigoureux.

### Comment procéder ?

Le plus simple est de commencer par chercher des mots clés en rapport avec notre objectif. Ici, nous cherchons à contourner les achats in-app, nous allons donc chercher des mots clés comme "purchase", "inapp", "level", "premium", etc. Nous pouvons également chercher des noms de classes ou de méthodes qui pourraient être liées à la gestion des utilisateurs et de leurs niveaux d'abonnement.

Autre solution, retrouver dans l'application des termes liés aux niveaux d'abonnement. Par exemple, si l'application affiche "Niveau ULTRA" quelque part, nous pouvons chercher ce terme dans le code décompilé.

Et dernièrement, nous pouvons également passer par ce qui semble être des API / Modèles de données. En effet, les applications utilisent souvent des classes pour représenter les utilisateurs et leurs niveaux d'abonnement.

En bref, le SMALI est un langage bas niveau, mais avec un peu de patience et de méthode, on peut retrouver des morceaux de code intéressants.

::: info Astuce

Je vous laisse le soins de parcourir le code décompilé avec votre éditeur de texte préféré. N'hésitez pas à utiliser la fonction de recherche pour trouver des mots clés pertinents.

:::

### La class User

Après décompilation du code, nous avons accès au code SMALI de l'application, nous avons notamment la classe `User` qui gère les informations des utilisateurs.

Si nous nous concentrons sur les constructeurs comme échangé, nous pouvons observer que celui-ci est passé en paramètre lors de la création d'un utilisateur.

```smali
.method public constructor <init>(Ljava/lang/String;Ljava/lang/String;Lcom/vbrosseau/stackgame/models/UserLevel;Ljava/lang/String;)V
    .locals 1

    const-string v0, "playerId"

    invoke-static {p1, v0}, Lkotlin/jvm/internal/Intrinsics;->checkNotNullParameter(Ljava/lang/Object;Ljava/lang/String;)V

    const-string v0, "displayName"

    invoke-static {p2, v0}, Lkotlin/jvm/internal/Intrinsics;->checkNotNullParameter(Ljava/lang/Object;Ljava/lang/String;)V

    const-string v0, "level"

    invoke-static {p3, v0}, Lkotlin/jvm/internal/Intrinsics;->checkNotNullParameter(Ljava/lang/Object;Ljava/lang/String;)V

    .line 6
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 7
    iput-object p1, p0, Lcom/vbrosseau/stackgame/models/User;->playerId:Ljava/lang/String;

    .line 8
    iput-object p2, p0, Lcom/vbrosseau/stackgame/models/User;->displayName:Ljava/lang/String;

    .line 9
    iput-object p3, p0, Lcom/vbrosseau/stackgame/models/User;->level:Lcom/vbrosseau/stackgame/models/UserLevel;

    .line 10
    iput-object p4, p0, Lcom/vbrosseau/stackgame/models/User;->avatarUri:Ljava/lang/String;

    return-void
.end method
```

Que nous pouvons traduire en :

```java
public User(String playerId, String displayName, UserLevel level, String avatarUri) {
    Intrinsics.checkNotNullParameter(playerId, "playerId");
    Intrinsics.checkNotNullParameter(displayName, "displayName");
    Intrinsics.checkNotNullParameter(level, "level");

    super();

    this.playerId = playerId;
    this.displayName = displayName;
    this.level = level;
    this.avatarUri = avatarUri;
}
```

Comment faire alors pour modifier le niveau d'un utilisateur et lui attribuer le niveau ULTRA sans passer par un achat in-app ? Simple ! Il suffit de ne plus utiliser le variable `level` passée en paramètre et de forcer la valeur ULTRA lors de l'instanciation de l'objet `User`.

```smali
.method public constructor <init>(Ljava/lang/String;Ljava/lang/String;Lcom/vbrosseau/stackgame/models/UserLevel;Ljava/lang/String;)V
    .locals 1

    const-string v0, "playerId"

    invoke-static {p1, v0}, Lkotlin/jvm/internal/Intrinsics;->checkNotNullParameter(Ljava/lang/Object;Ljava/lang/String;)V

    const-string v0, "displayName"

    invoke-static {p2, v0}, Lkotlin/jvm/internal/Intrinsics;->checkNotNullParameter(Ljava/lang/Object;Ljava/lang/String;)V

    const-string v0, "level"

    invoke-static {p3, v0}, Lkotlin/jvm/internal/Intrinsics;->checkNotNullParameter(Ljava/lang/Object;Ljava/lang/String;)V

    .line 6
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 7
    iput-object p1, p0, Lcom/vbrosseau/stackgame/models/User;->playerId:Ljava/lang/String;

    .line 8
    iput-object p2, p0, Lcom/vbrosseau/stackgame/models/User;->displayName:Ljava/lang/String;

    .line 9
    # Ici, nous forçons le niveau ULTRA, peu importe la valeur passée en paramètre la variable p3 sera
    # toujours remplacée par ULTRA (com.vbrosseau.stackgame.models.UserLevel.ULTRA)
    sget-object p3, Lcom/vbrosseau/stackgame/models/UserLevel;->ULTRA:Lcom/vbrosseau/stackgame/models/UserLevel;

    iput-object p3, p0, Lcom/vbrosseau/stackgame/models/User;->level:Lcom/vbrosseau/stackgame/models/UserLevel;

    .line 10
    iput-object p4, p0, Lcom/vbrosseau/stackgame/models/User;->avatarUri:Ljava/lang/String;

    return-void
.end method
```

Ce qui revient en Java à :

```java
public User(String playerId, String displayName, UserLevel level, String avatarUri) {
    Intrinsics.checkNotNullParameter(playerId, "playerId");
    Intrinsics.checkNotNullParameter(displayName, "displayName");
    Intrinsics.checkNotNullParameter(level, "level");

    super();

    this.playerId = playerId;
    this.displayName = displayName;
    // Forcer le niveau ULTRA
    this.level = UserLevel.ULTRA;
    this.avatarUri = avatarUri;
}
```

Vous avez vu la différence ? Ici la variable `level` passée en paramètre n'est plus utilisée pour initialiser l'attribut `level` de l'objet `User`. À la place, nous utilisons directement la valeur `UserLevel.ULTRA`, ce qui signifie que chaque fois qu'un objet `User` est créé, il aura toujours le niveau ULTRA, indépendamment de la valeur fournie lors de l'appel du constructeur.
Ainsi, en modifiant le code de cette manière, nous avons contourné la logique d'achat in-app et attribué le niveau ULTRA à tous les utilisateurs créés via ce constructeur.
