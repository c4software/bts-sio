# Android : Kotlin et Compose

Nom : ______________________  Prénom : ______________________

**Question 1 — Le langage**

Quel langage est aujourd'hui le langage de prédilection pour le développement Android ?

- ☐ **a.** Kotlin
- ☐ **b.** Swift
- ☐ **c.** Dart
- ☐ **d.** Java

**Question 2 — Le rôle de Gradle**

Dans un projet Android, quel est le rôle de Gradle ?

- ☐ **a.** Émuler un téléphone Android sur votre ordinateur
- ☐ **b.** Compiler, packager et déployer l'application (outil de build)
- ☐ **c.** Dessiner l'interface de l'application
- ☐ **d.** Convertir le code Kotlin en Java

**Question 3 — Vrai ou Faux - Sandbox**

Sur Android, chaque application est isolée des autres (sandbox) et doit demander des permissions pour accéder aux ressources du téléphone.

☐ Vrai  ☐ Faux

**Question 4 — Le fichier de configuration**

Comment se nomme le fichier XML qui déclare le nom de l'application, ses activités, son icône et ses permissions ?

Réponse : ________________________________________

**Question 5 — La signature**

À quoi sert la signature (RSA) d'un APK lors de l'installation d'une application ?

- ☐ **a.** Chiffrer les données personnelles de l'utilisateur
- ☐ **b.** Compresser l'application pour réduire sa taille
- ☐ **c.** Vérifier que le code ne contient pas de bug
- ☐ **d.** Garantir que l'application n'a pas été modifiée depuis sa publication et gérer ses mises à jour

**Question 6 — Le moteur de rendu**

Depuis l'arrivée de Compose, Android affiche les interfaces grâce au moteur de rendu 2D ______ , également utilisé par Chrome et Firefox.

(a) Skia / (b) Blink / (c) WebKit / (d) Vulkan

**Question 7 — La terminologie multiplateforme**

Associez chaque terme à sa définition.

| | À relier à… |
|---|---|
| Compose → ______ | • La librairie de Google pour les interfaces déclaratives Android |
| KMM (Kotlin Multiplatform) → ______ | • Partager l'interface entre plateformes |
| CMP (Compose Multiplatform) → ______ | • L'émulateur intégré à Android Studio |
|  | • Partager la logique métier entre plateformes |
|  | • L'outil de build du projet |

**Question 8 — Le composable**

Avec Compose, qu'est-ce qu'un composant ?

- ☐ **a.** Une fonction annotée @Composable qui décrit une partie de l'interface
- ☐ **b.** Un fichier XML placé dans le dossier res/layout
- ☐ **c.** Un service qui tourne en arrière-plan
- ☐ **d.** Une classe qui hérite de la classe Component

**Question 9 — Prédire le comportement**

Voici un code Compose :
Column {
    Text("A")
    Text("B")
}
Que faut-il changer pour afficher A et B côte à côte plutôt que l'un sous l'autre ?

- ☐ **a.** Ajouter android:orientation="horizontal" dans le XML
- ☐ **b.** Remplacer Text par InlineText
- ☐ **c.** Ajouter Modifier.horizontal() sur la Column
- ☐ **d.** Remplacer Column par Row

**Question 10 — Vrai ou Faux - Le Modifier**

Le Modifier est chaînable : on peut écrire Modifier.padding(16.dp).background(Color.Blue).border(1.dp, Color.Black).

☐ Vrai  ☐ Faux

**Question 11 — La preview**

Pour prévisualiser un composant dans Android Studio sans lancer l'application, on ajoute l'annotation ______ au-dessus d'une fonction Composable.

(a) @Render / (b) @Preview / (c) @Mockup / (d) @Test

**Question 12 — L'état**

Que fait la ligne suivante ? var counter by remember { mutableStateOf(0) }

- ☐ **a.** Elle déclare une constante qui ne pourra jamais changer
- ☐ **b.** Elle sauvegarde la valeur dans une base de données locale
- ☐ **c.** Elle déclare une variable d'état observée : quand sa valeur change, Compose recompose l'interface
- ☐ **d.** Elle mémorise la valeur dans les préférences de l'application

**Question 13 — Prédire le comportement**

Voici un code Compose :
var showDialog by remember { mutableStateOf(false) }
if (showDialog) { /* Affiche le Dialog */ }
Button(onClick = { showDialog = true }) { Text("Afficher") }
Que se passe-t-il quand l'utilisateur clique sur le bouton ?

- ☐ **a.** showDialog passe à true, Compose recompose l'interface et le dialogue s'affiche
- ☐ **b.** Une erreur : on ne peut pas modifier une variable dans un onClick
- ☐ **c.** Rien, il faut appeler une fonction show() pour afficher un dialogue
- ☐ **d.** Le dialogue s'affiche puis se ferme immédiatement car la variable revient à false

**Question 14 — La liste optimisée**

Pourquoi utiliser LazyColumn plutôt que Column pour afficher une longue liste ?

- ☐ **a.** Column ne peut pas contenir plus de 10 éléments
- ☐ **b.** LazyColumn met en cache la liste dans un fichier
- ☐ **c.** LazyColumn n'affiche que les éléments visibles à l'écran, ce qui permet d'afficher des milliers d'éléments sans problème
- ☐ **d.** LazyColumn trie automatiquement les éléments par ordre alphabétique

**Question 15 — Les composants**

Associez chaque composant Compose à son rôle.

| | À relier à… |
|---|---|
| Scaffold → ______ | • Exécuter une requête réseau |
| Spacer → ______ | • Stocker les préférences de l'utilisateur |
| FloatingActionButton → ______ | • Créer un espace entre deux éléments |
| AnimatedVisibility → ______ | • Proposer l'action principale de l'écran |
|  | • Faire apparaître un élément avec une animation |
|  | • Structure de base d'un écran (TopAppBar, bouton flottant…) |

**Question 16 — Toast ou Snackbar**

Quelle est la différence entre un Toast et une Snackbar ?

- ☐ **a.** La Snackbar s'affiche en bas de l'écran et peut contenir une action, le Toast est un simple message rapide
- ☐ **b.** La Snackbar bloque l'application tant que l'utilisateur n'a pas cliqué
- ☐ **c.** Le Toast peut contenir des boutons, pas la Snackbar
- ☐ **d.** Aucune, ce sont deux noms pour le même composant

**Question 17 — Vrai ou Faux - Les textes**

Il est recommandé d'écrire les textes directement en dur dans les composants plutôt que dans le fichier strings.xml.

☐ Vrai  ☐ Faux

**Question 18 — Les ressources alternatives**

À quoi servent les ressources alternatives d'un projet Android ?

- ☐ **a.** À sauvegarder une copie des ressources en cas de suppression
- ☐ **b.** À fournir des ressources différentes selon la configuration de l'appareil (langue, thème sombre, rotation…)
- ☐ **c.** À alléger l'APK en compressant les images
- ☐ **d.** À proposer des ressources payantes dans l'application

**Question 19 — Le dossier des images**

Dans quel sous-dossier de res place-t-on les images de l'application ?

Réponse : ________________________________________

**Question 20 — Le Context**

Sur Android, à quoi sert le Context ?

- ☐ **a.** À stocker l'historique de navigation de l'utilisateur
- ☐ **b.** À compiler le projet plus rapidement
- ☐ **c.** À accéder à l'environnement de l'application : ressources, services du téléphone (Bluetooth, préférences…)
- ☐ **d.** À définir la couleur du thème de l'application

**Question 21 — La navigation**

Avec Compose, quel composant permet de déclarer les écrans (Screen) de l'application et de naviguer entre eux ?

- ☐ **a.** ActivityRouter
- ☐ **b.** ScreenManager
- ☐ **c.** PageView
- ☐ **d.** NavHost

**Question 22 — Prédire le comportement**

L'utilisateur est sur Screen2, arrivé depuis Screen1. Le code du bouton retour exécute navController.popBackStack(). Que se passe-t-il ?

- ☐ **a.** Screen2 est rechargé depuis zéro
- ☐ **b.** La pile est vidée et l'utilisateur revient au tout premier écran
- ☐ **c.** L'application se ferme
- ☐ **d.** Screen2 est retiré du sommet de la pile de navigation et l'utilisateur revient sur Screen1

**Question 23 — Après la dépendance**

Vous venez d'ajouter implementation("androidx.navigation:navigation-compose:2.7.7") dans le build.gradle. Avant de pouvoir l'utiliser, vous devez ______ le projet.

(a) redémarrer / (b) signer / (c) synchroniser / (d) compiler

**Question 24 — Les rôles du MVVM**

Associez chaque élément du pattern MVVM à son rôle.

| | À relier à… |
|---|---|
| Model → ______ | • La base de données embarquée du téléphone |
| View → ______ | • L'interface, nos composants @Composable |
| ViewModel → ______ | • Le fichier de configuration Gradle |
|  | • La logique, le lien entre les données et l'interface |
|  | • Les données de l'application (data class) |

**Question 25 — Les règles du MVVM**

Quelles affirmations respectent le pattern MVVM vu en TP ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Le Model ne contient que les données, pas de logique
- ☐ **b.** La View observe le ViewModel pour se mettre à jour
- ☐ **c.** La View contient la logique métier de l'application
- ☐ **d.** Le ViewModel manipule directement les composants pour gagner du temps
- ☐ **e.** Le ViewModel ne doit pas contenir de référence à la View

**Question 26 — Observer un Flow**

Dans un composant, que fait la ligne suivante ? val list by viewModel.listFlow.collectAsStateWithLifecycle()

- ☐ **a.** Elle observe le flux de données du ViewModel : à chaque mise à jour du Flow, le composant est recomposé automatiquement
- ☐ **b.** Elle sauvegarde la liste dans le cycle de vie de l'activité
- ☐ **c.** Elle convertit la liste en JSON pour l'envoyer au serveur
- ☐ **d.** Elle copie la liste une seule fois au lancement de l'écran

**Question 27 — Prédire le comportement**

La liste du ViewModel est vide. L'utilisateur clique sur le bouton flottant dont l'action est viewModel.addElement("Element ${list.size + 1}"). Que se passe-t-il ?

- ☐ **a.** L'élément est ajouté mais il faut rafraîchir l'écran manuellement pour le voir
- ☐ **b.** "Element 1" est ajouté au MutableStateFlow et la LazyColumn affiche le nouvel élément automatiquement
- ☐ **c.** Une erreur : on ne peut pas modifier une liste dans un ViewModel
- ☐ **d.** "Element 0" est ajouté car la liste est vide

**Question 28 — Vrai ou Faux - Les permissions**

Une fois qu'un utilisateur a accepté une permission, on peut sauvegarder son choix en base de données pour ne plus jamais la redemander.

☐ Vrai  ☐ Faux

**Question 29 — Retrofit**

Dans le TP API, à quoi sert la librairie Retrofit ?

- ☐ **a.** À stocker les réponses de l'API dans une base de données locale
- ☐ **b.** À sécuriser les échanges en chiffrant les requêtes
- ☐ **c.** À afficher les images distantes sans bloquer le thread principal
- ☐ **d.** À générer le code d'appel à l'API à partir d'une interface annotée (@GET), et à convertir le JSON reçu en objets Kotlin

**Question 30 — Nouvelles permissions BLE**

Depuis quelle version d'Android les permissions BLUETOOTH_SCAN et BLUETOOTH_CONNECT permettent-elles d'utiliser le BLE sans demander la localisation ?

Réponse : ________________________________________

**Question 31 — Le problème d'Android**

Quel est le principal problème de la plateforme Android évoqué en cours ?

- ☐ **a.** L'impossibilité de personnaliser le système
- ☐ **b.** Le prix des licences de développement
- ☐ **c.** La fragmentation : de nombreuses versions et constructeurs différents cohabitent
- ☐ **d.** Le faible nombre d'utilisateurs dans le monde

**Question 32 — L'architecture d'Android**

Associez chaque couche de l'architecture Android à son rôle.

| | À relier à… |
|---|---|
| Noyau Linux → ______ | • Faire tourner les applications |
| Runtime Android (ART) → ______ | • Exposer l'API Android aux applications |
| App Framework → ______ | • Distribuer les applications aux utilisateurs |
|  | • Les drivers, la batterie, la RAM |
|  | • Compiler le projet en APK |

**Question 33 — Vrai ou Faux - Isolation**

Sur Android, chaque application a son propre utilisateur Linux et tourne dans sa propre « VM ».

☐ Vrai  ☐ Faux

**Question 34 — SDK ou Play Services**

Quelle est la différence entre le SDK Android et les Play Services ?

- ☐ **a.** Le SDK sert au design, les Play Services à la compilation
- ☐ **b.** Le SDK est payant, les Play Services sont gratuits
- ☐ **c.** Les Play Services ne fonctionnent que sur les téléphones Samsung
- ☐ **d.** Le SDK évolue avec les mises à jour du système, les Play Services sont distribués par Google et évoluent indépendamment de la version de l'OS

**Question 35 — La classe R**

Dans un projet Android, à quoi sert la classe R (utilisée par exemple dans stringResource(R.string.hello)) ?

- ☐ **a.** Elle stocke les préférences de l'utilisateur
- ☐ **b.** C'est une classe à écrire soi-même pour déclarer ses ressources
- ☐ **c.** Elle contient la configuration de Gradle
- ☐ **d.** Générée automatiquement, elle contient les références de toutes les ressources du projet et permet d'y accéder depuis le code

**Question 36 — Les logs**

Dans Android Studio, les logs de votre application s'affichent dans le ______ , filtrable par niveau et par application.

(a) Gradle Monitor / (b) Terminal / (c) Debugger / (d) Logcat

**Question 37 — SharedPreferences**

Quelles affirmations sont vraies à propos des SharedPreferences ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Elles sont supprimées à la réinstallation de l'application
- ☐ **b.** Elles ne stockent que des types natifs (int, string…)
- ☐ **c.** Elles sont persistantes entre deux lancements de l'application
- ☐ **d.** Elles sont partagées entre toutes les applications du téléphone
- ☐ **e.** Elles peuvent stocker des objets complexes directement

**Question 38 — Stocker des données structurées**

Quelle solution est recommandée pour sauvegarder des données structurées (tables, relations) sur le téléphone ?

- ☐ **a.** SQLite, par exemple via la librairie Room
- ☐ **b.** Le fichier AndroidManifest.xml
- ☐ **c.** Les SharedPreferences
- ☐ **d.** Un fichier strings.xml dans res/values


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (a) Kotlin — *Exact, Java et Kotlin cohabitent, mais Kotlin est le langage à choisir pour un nouveau projet.*

**2.** (b) Compiler, packager et déployer l'application (outil de build) — *Exact, c'est aussi dans ses fichiers que l'on déclare les dépendances.*

**3.** Vrai — *Exact, c'est le modèle de sécurité d'Android : isolation + permissions.*

**4.** AndroidManifest.xml (accepté aussi : AndroidManifest, le manifest)

**5.** (d) Garantir que l'application n'a pas été modifiée depuis sa publication et gérer ses mises à jour — *Exact, elle identifie aussi l'application.*

**6.** (a) Skia

**7.** Compose → La librairie de Google pour les interfaces déclaratives Android ; KMM (Kotlin Multiplatform) → Partager la logique métier entre plateformes ; CMP (Compose Multiplatform) → Partager l'interface entre plateformes

**8.** (a) Une fonction annotée @Composable qui décrit une partie de l'interface — *Exact, pas de classe : des fonctions appelées au bon moment selon les conditions.*

**9.** (d) Remplacer Column par Row — *Exact, Column empile verticalement, Row aligne horizontalement.*

**10.** Vrai — *Exact, les modificateurs s'enchaînent les uns après les autres.*

**11.** (b) @Preview

**12.** (c) Elle déclare une variable d'état observée : quand sa valeur change, Compose recompose l'interface — *Exact, c'est le principe de la réactivité de Compose.*

**13.** (a) showDialog passe à true, Compose recompose l'interface et le dialogue s'affiche — *Exact, l'affichage est conditionné par la variable d'état.*

**14.** (c) LazyColumn n'affiche que les éléments visibles à l'écran, ce qui permet d'afficher des milliers d'éléments sans problème — *Exact, c'est un affichage optimisé.*

**15.** Scaffold → Structure de base d'un écran (TopAppBar, bouton flottant…) ; Spacer → Créer un espace entre deux éléments ; FloatingActionButton → Proposer l'action principale de l'écran ; AnimatedVisibility → Faire apparaître un élément avec une animation

**16.** (a) La Snackbar s'affiche en bas de l'écran et peut contenir une action, le Toast est un simple message rapide — *Exact, le Toast est réservé aux informations de test ou sans grande importance.*

**17.** Faux — *Exact, c'est faux : extraire les textes dans strings.xml est un incontournable pour l'internationalisation.*

**18.** (b) À fournir des ressources différentes selon la configuration de l'appareil (langue, thème sombre, rotation…) — *Exact, on peut par exemple redéfinir strings.xml pour l'italien sans écrire de code.*

**19.** drawable (accepté aussi : res/drawable) — *Exact, les icônes de l'application vont elles dans mipmap.*

**20.** (c) À accéder à l'environnement de l'application : ressources, services du téléphone (Bluetooth, préférences…) — *Exact, sans Context, pas d'accès aux ressources ni aux services.*

**21.** (d) NavHost — *Exact, associé à un navController créé avec rememberNavController().*

**22.** (d) Screen2 est retiré du sommet de la pile de navigation et l'utilisateur revient sur Screen1 — *Exact, la navigation fonctionne comme une pile, c'est l'équivalent du bouton retour du téléphone.*

**23.** (c) synchroniser

**24.** Model → Les données de l'application (data class) ; View → L'interface, nos composants @Composable ; ViewModel → La logique, le lien entre les données et l'interface

**25.** (a) Le Model ne contient que les données, pas de logique ; (b) La View observe le ViewModel pour se mettre à jour ; (e) Le ViewModel ne doit pas contenir de référence à la View — *Exact. / Exact, par exemple avec collectAsStateWithLifecycle. / Exact, c'est ce qui le rend testable.*

**26.** (a) Elle observe le flux de données du ViewModel : à chaque mise à jour du Flow, le composant est recomposé automatiquement — *Exact, c'est la réactivité de Compose appliquée au MVVM.*

**27.** (b) "Element 1" est ajouté au MutableStateFlow et la LazyColumn affiche le nouvel élément automatiquement — *Exact, la vue observe le Flow, aucune mise à jour manuelle n'est nécessaire.*

**28.** Faux — *Exact, c'est faux : l'utilisateur peut changer d'avis dans les paramètres. On redemande à chaque fois, si elle est déjà accordée la demande est invisible.*

**29.** (d) À générer le code d'appel à l'API à partir d'une interface annotée (@GET), et à convertir le JSON reçu en objets Kotlin — *Exact, avec Gson comme convertisseur dans notre cas.*

**30.** 12 — *Exact, Android 12 (Android S). Avant, il fallait passer par les permissions de localisation.*

**31.** (c) La fragmentation : de nombreuses versions et constructeurs différents cohabitent — *Exact, un Android ? Non, des Android ! D'où l'importance du choix du min SDK.*

**32.** Noyau Linux → Les drivers, la batterie, la RAM ; Runtime Android (ART) → Faire tourner les applications ; App Framework → Exposer l'API Android aux applications

**33.** Vrai — *Exact, c'est le fondement de l'isolation (sandbox) des applications.*

**34.** (d) Le SDK évolue avec les mises à jour du système, les Play Services sont distribués par Google et évoluent indépendamment de la version de l'OS — *Exact.*

**35.** (d) Générée automatiquement, elle contient les références de toutes les ressources du projet et permet d'y accéder depuis le code — *Exact, R.drawable, R.string, etc.*

**36.** (d) Logcat

**37.** (a) Elles sont supprimées à la réinstallation de l'application ; (b) Elles ne stockent que des types natifs (int, string…) ; (c) Elles sont persistantes entre deux lancements de l'application — *Exact. / Exact, pour des objets complexes il faut une autre solution. / Exact.*

**38.** (a) SQLite, par exemple via la librairie Room — *Exact, SharedPreferences est réservé aux paramètres simples.*
