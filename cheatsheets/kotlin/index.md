---
description: "Aide mémoire Kotlin pour les développeurs qui viennent du C ou du C++ : variables, types, nullabilité, fonctions, classes, collections, opérations bit à bit et coroutines."
---

# Aide mémoire Kotlin (depuis le C / C++)

Vous connaissez le C ou le C++ et vous découvrez Kotlin ? Cet aide-mémoire reprend les bases du langage en partant de ce que vous connaissez déjà. Il ne remplace pas la documentation officielle, mais il vous permettra de lire et d'écrire du code Kotlin rapidement.

::: details Sommaire
[[toc]]
:::

## Tester sans rien installer

Pour essayer les exemples de cette page, pas besoin d'Android Studio : le [Kotlin Playground](https://play.kotlinlang.org/) exécute votre code directement dans le navigateur.

```kotlin
fun main() {
    println("Hello, World!")
}
```

Pas de `#include`, pas de `return 0`, pas de point-virgule en fin de ligne : `main` est le point d'entrée, comme en C.

## Ce qui change vraiment

Avant d'entrer dans la syntaxe, voici les grandes différences avec le C :

| En C / C++ | En Kotlin |
|---|---|
| Compilé en code machine | Compilé en bytecode, exécuté par une machine virtuelle (la JVM, ou ART sur Android) |
| `malloc` / `free`, `new` / `delete` | Aucune gestion manuelle : un ramasse-miettes (*garbage collector*) libère la mémoire inutilisée |
| Pointeurs et arithmétique de pointeurs | Pas de pointeurs : on manipule des références vers des objets |
| `NULL` accepté partout | Une variable ne peut contenir `null` que si son type l'autorise explicitement |
| Accès hors tableau : comportement indéfini | Accès hors tableau : exception levée (`ArrayIndexOutOfBoundsException`) |
| Conversions implicites (`int` vers `long`…) | Aucune conversion implicite entre types numériques |
| Fichiers `.h` / `.c` | Un seul fichier `.kt`, pas d'en-têtes |

::: tip Que se passe-t-il derrière ?
Le ramasse-miettes libère un objet quand plus aucune variable n'y fait référence. Vous n'avez donc jamais à « libérer » la mémoire. En contrepartie, vous ne maîtrisez pas le moment exact de cette libération : sur mobile ou sur serveur, ce n'est pas un problème.
:::

## Les variables

```kotlin
val vitesse = 42          // Non modifiable (équivalent d'une variable const)
var compteur = 0          // Modifiable
compteur += 1

val tension: Double = 3.3 // Type explicite (optionnel si la valeur suffit)
```

- `val` : la référence ne peut pas être réaffectée. C'est le choix par défaut, on n'utilise `var` que si la valeur doit changer.
- Le type est **déduit** de la valeur (inférence). On peut l'écrire après `:` si on veut être explicite.
- Pour une vraie constante connue à la compilation (l'équivalent d'un `#define`), on utilise `const val` au niveau du fichier :

```kotlin
const val MAX_RETRY = 3
```

## Les types de base

| C | Kotlin | Taille |
|---|---|---|
| `int8_t` / `uint8_t` | `Byte` / `UByte` | 8 bits |
| `int16_t` / `uint16_t` | `Short` / `UShort` | 16 bits |
| `int32_t` / `uint32_t` | `Int` / `UInt` | 32 bits |
| `int64_t` / `uint64_t` | `Long` / `ULong` | 64 bits |
| `float` / `double` | `Float` / `Double` | 32 / 64 bits |
| `bool` | `Boolean` | |
| `char` | `Char` | 16 bits (Unicode) |
| `char*` | `String` | |

```kotlin
val a: Int = 10
val b: Long = a.toLong()     // Conversion explicite obligatoire
val c = 3_000_000L           // Suffixe L pour un Long, _ pour la lisibilité
val d = 0xFF                 // Hexadécimal
val e = 0b1010               // Binaire
val f = 255u                 // Non signé (UInt)
val code = 'A'.code          // 65 : un Char n'est pas un nombre, il faut demander son code
```

::: warning Attention
`val x: Long = a` ne compile pas si `a` est un `Int`. Kotlin refuse toutes les conversions implicites : c'est volontaire, pour éviter les pertes de données silencieuses.
:::

## Les chaînes de caractères

```kotlin
val nom = "ESP32"
val message = "Carte $nom, tension ${tension * 1000} mV"   // Équivalent de sprintf
val longueur = nom.length

if (nom == "ESP32") { /* ... */ }   // Comparaison du contenu, pas de strcmp
```

- `$variable` ou `${expression}` dans une chaîne remplace `printf` / `sprintf`.
- `==` compare le **contenu** des chaînes. Pas besoin de `strcmp`.
- Une `String` n'est pas modifiable : chaque modification crée une nouvelle chaîne.

## La nullabilité : la fin des pointeurs NULL

C'est **la** différence la plus importante avec le C. Pas de panique, le principe est simple : par défaut, une variable ne peut pas valoir `null`. Pour l'autoriser, on ajoute `?` au type.

```kotlin
var nom: String = "ESP32"
nom = null                 // Erreur de compilation

var peripherique: String? = null   // Autorisé grâce au ?
```

Pour utiliser une variable « nullable », le compilateur vous oblige à gérer le cas `null` :

```kotlin
val taille = peripherique?.length        // null si peripherique est null, sinon sa longueur
val tailleOuZero = peripherique?.length ?: 0   // Valeur par défaut si null (opérateur « Elvis »)

if (peripherique != null) {
    println(peripherique.length)         // Ici, Kotlin sait que ce n'est pas null
}

val forcee = peripherique!!.length       // « Je suis sûr que ce n'est pas null » : plante sinon
```

| Opérateur | Rôle | Équivalent C |
|---|---|---|
| `?.` | Appel sécurisé : renvoie `null` au lieu de planter | `p ? p->len : NULL` |
| `?:` | Valeur par défaut si `null` | `p ? p : defaut` |
| `!!` | Force l'accès, lève une exception si `null` | Déréférencer sans vérifier |

::: tip Bonne pratique
Évitez `!!`. S'il apparaît souvent dans votre code, c'est que le type devrait probablement être non nullable.
:::

## Les conditions

`if` est une **expression** : il renvoie une valeur. C'est ce qui remplace l'opérateur ternaire, qui n'existe pas en Kotlin.

```kotlin
val etat = if (tension > 3.0) "OK" else "Faible"   // Équivalent de (cond ? a : b)
```

`when` remplace `switch`, en beaucoup plus puissant (pas de `break`, pas de « fall-through ») :

```kotlin
val libelle = when (code) {
    0 -> "Succès"
    1, 2 -> "Avertissement"
    in 3..9 -> "Erreur"
    else -> "Inconnu"
}
```

`when` peut aussi s'utiliser sans argument, comme une suite de `if / else if` :

```kotlin
when {
    temperature > 80 -> println("Surchauffe")
    temperature < -20 -> println("Trop froid")
    else -> println("Normal")
}
```

## Les boucles

```kotlin
for (i in 0 until 10) { }        // for (int i = 0; i < 10; i++)
for (i in 0..10) { }             // De 0 à 10 inclus
for (i in 10 downTo 0) { }       // Décroissant
for (i in 0 until 10 step 2) { } // De 2 en 2

for (mesure in mesures) { }      // Parcours direct d'une collection
for ((index, mesure) in mesures.withIndex()) { }   // Avec l'index

while (compteur < 10) { compteur++ }
```

## Les fonctions

```kotlin
fun additionner(a: Int, b: Int): Int {
    return a + b
}

// Version courte quand le corps est une seule expression
fun multiplier(a: Int, b: Int) = a * b

// Paramètres par défaut et nommés (pas de surcharge à écrire)
fun connecter(adresse: String, timeoutMs: Int = 5000, retry: Int = 3) { }

connecter("AA:BB:CC:DD:EE:FF")
connecter("AA:BB:CC:DD:EE:FF", retry = 5)
```

- Le type de retour est **après** les paramètres. Une fonction qui ne renvoie rien a le type `Unit` (l'équivalent de `void`), qu'on n'écrit pas.
- Les paramètres sont **non modifiables** dans la fonction (ce sont des `val`).
- Une fonction peut exister seule dans un fichier, sans classe autour.

## Les tableaux et les collections

```kotlin
val buffer = ByteArray(20)            // Équivalent de uint8_t buffer[20], initialisé à 0
val valeurs = intArrayOf(1, 2, 3)     // Tableau d'entiers de taille fixe
println(valeurs.size)                 // La taille est connue, pas de sizeof

val mesures = listOf(3.2, 3.3, 3.1)              // Liste non modifiable
val historique = mutableListOf<Double>()         // Liste modifiable (taille dynamique)
historique.add(3.4)

val noms = mapOf(1 to "LED", 2 to "Bouton")      // Dictionnaire clé / valeur
println(noms[1])                                 // "LED"
```

Les collections ont des fonctions qui remplacent la plupart des boucles :

```kotlin
val moyenne = mesures.average()
val hautes = mesures.filter { it > 3.2 }         // Garde les éléments qui respectent la condition
val enMv = mesures.map { (it * 1000).toInt() }   // Transforme chaque élément
val max = mesures.maxOrNull()
```

::: tip it ?
Dans une lambda à un seul paramètre, `it` désigne ce paramètre. `mesures.filter { it > 3.2 }` est la version courte de `mesures.filter { m -> m > 3.2 }`.
:::

## Les lambdas : des pointeurs de fonction, en mieux

En C, vous passeriez un pointeur de fonction pour un *callback*. En Kotlin, on passe une **lambda** :

```kotlin
fun scanner(onTrouve: (String) -> Unit) {
    onTrouve("ESP32-LED")
}

scanner { nom -> println("Périphérique trouvé : $nom") }
```

- `(String) -> Unit` est le type « fonction qui prend une `String` et ne renvoie rien ».
- Quand la lambda est le dernier paramètre, on l'écrit **après** les parenthèses. C'est cette syntaxe que vous verrez partout dans Compose.

## Les classes

```kotlin
class Capteur(val nom: String, var seuil: Int) {   // Constructeur et propriétés en une ligne
    fun estDeclenche(valeur: Int) = valeur > seuil
}

val capteur = Capteur("Température", 80)   // Pas de new
capteur.seuil = 90
println(capteur.estDeclenche(85))
```

- Pas de `new`, pas de destructeur : le ramasse-miettes s'en charge.
- Les propriétés déclarées dans le constructeur (`val` / `var`) sont directement des attributs.
- Tout est `public` par défaut. Les autres visibilités : `private`, `protected`, `internal` (visible dans le module).

### Les data class : vos structures

Pour regrouper des données, l'équivalent d'une `struct` est la `data class` :

```kotlin
data class Mesure(val capteur: String, val valeur: Double, val horodatage: Long)

val m1 = Mesure("T1", 21.5, 1_700_000_000)
val m2 = m1.copy(valeur = 22.0)      // Copie en changeant un seul champ
println(m1)                          // Mesure(capteur=T1, valeur=21.5, horodatage=1700000000)
println(m1 == m2)                    // Compare le contenu : false
```

Kotlin génère pour vous l'affichage, la comparaison et la copie.

### Les énumérations et les classes scellées

```kotlin
enum class EtatBle { DECONNECTE, CONNEXION, CONNECTE }
```

Une `sealed class` est une enum dont chaque cas peut porter ses propres données. Elle est parfaite pour représenter une machine à états :

```kotlin
sealed class Etat {
    object Deconnecte : Etat()
    object Connexion : Etat()
    data class Connecte(val adresse: String) : Etat()
    data class Erreur(val code: Int) : Etat()
}

fun afficher(etat: Etat) = when (etat) {
    is Etat.Deconnecte -> "Déconnecté"
    is Etat.Connexion -> "Connexion…"
    is Etat.Connecte -> "Connecté à ${etat.adresse}"
    is Etat.Erreur -> "Erreur ${etat.code}"
}   // Pas de else : le compilateur vérifie que tous les cas sont traités
```

### Interfaces, héritage et objets uniques

```kotlin
interface Transport {
    fun envoyer(trame: ByteArray)
}

class TransportBle : Transport {
    override fun envoyer(trame: ByteArray) { /* ... */ }
}

object Configuration {            // Instance unique (singleton), remplace les variables globales
    const val VERSION = "1.0"
}
```

Une classe ne peut être héritée que si elle est déclarée `open`. Il n'y a pas de membres `static` : on utilise un `object` (ou un `companion object` à l'intérieur d'une classe).

## Les fonctions d'extension

Kotlin permet d'**ajouter une fonction à un type existant**, sans le modifier :

```kotlin
fun ByteArray.toHex() = joinToString(" ") { "%02X".format(it) }

val trame = byteArrayOf(0x01, 0x2A, 0xFF.toByte())
println(trame.toHex())   // "01 2A FF"
```

Vous en croiserez beaucoup : c'est très utilisé dans les bibliothèques Android et Ktor.

## Les opérations bit à bit

Pas de symboles `&`, `|`, `<<` : Kotlin utilise des mots.

| C | Kotlin |
|---|---|
| `a & b` | `a and b` |
| `a \| b` | `a or b` |
| `a ^ b` | `a xor b` |
| `~a` | `a.inv()` |
| `a << 2` | `a shl 2` |
| `a >> 2` | `a shr 2` (signé) / `a ushr 2` (non signé) |

```kotlin
val registre = 0b1010_0000
val bit7 = (registre shr 7) and 1          // Lire le bit 7
val avecBit0 = registre or 0x01            // Mettre le bit 0 à 1
```

::: warning Le piège du Byte signé
Un `Byte` est **signé** (de -128 à 127), comme un `int8_t`. Avant de l'utiliser comme un octet non signé, il faut le convertir et masquer :

```kotlin
val octet: Byte = 0xC8.toByte()   // Vaut -56
val valeur = octet.toInt() and 0xFF   // Vaut 200
```

C'est l'erreur la plus fréquente quand on décode une trame reçue en BLE.
:::

### Décoder une trame

```kotlin
// Trame de 4 octets : [id][état][valeur poids fort][valeur poids faible]
fun decoder(trame: ByteArray): Mesure? {
    if (trame.size < 4) return null
    val id = trame[0].toInt() and 0xFF
    val valeur = ((trame[2].toInt() and 0xFF) shl 8) or (trame[3].toInt() and 0xFF)
    return Mesure("Capteur $id", valeur / 100.0, System.currentTimeMillis())
}
```

## Les exceptions

```kotlin
try {
    val n = "abc".toInt()
} catch (e: NumberFormatException) {
    println("Pas un nombre : ${e.message}")
} finally {
    // Toujours exécuté
}

val n = "abc".toIntOrNull() ?: 0   // Souvent plus simple : une variante qui renvoie null
```

Pour une ressource à fermer (fichier, connexion), `use { }` la ferme automatiquement à la sortie du bloc, comme le RAII en C++ :

```kotlin
File("log.txt").bufferedReader().use { lecteur ->
    println(lecteur.readLine())
}
```

## Les coroutines : la concurrence sans threads

Sur Android, le thread principal dessine l'interface : il ne doit **jamais** être bloqué (pas de `sleep`, pas d'attente réseau). Les coroutines permettent d'écrire du code asynchrone de façon séquentielle.

```kotlin
suspend fun lireCapteur(): Double {
    delay(500)          // Attend sans bloquer le thread (contrairement à sleep)
    return 21.5
}

// Dans un ViewModel Android
viewModelScope.launch {
    val valeur = lireCapteur()   // Le code « attend » ici, sans bloquer l'interface
    println(valeur)
}
```

| Embarqué / C | Kotlin |
|---|---|
| Tâche RTOS, thread | Coroutine (`launch`), beaucoup plus légère : on peut en lancer des milliers |
| `vTaskDelay`, `sleep` | `delay()` |
| Fonction bloquante | `suspend fun` : peut se mettre en pause sans bloquer le thread |
| File de messages | `Flow` / `StateFlow` : un flux de valeurs qu'on observe |

::: tip Que se passe-t-il derrière ?
Une fonction `suspend` peut se mettre en pause (par exemple en attendant une réponse réseau) et libérer le thread pour d'autres tâches. Quand le résultat arrive, elle reprend là où elle s'était arrêtée. Le mot-clé `suspend` indique simplement qu'elle ne peut être appelée que depuis une coroutine.
:::

## Pour s'entraîner

C'est à vous de jouer ! Je vous laisse ouvrir le [Kotlin Playground](https://play.kotlinlang.org/) et écrire une fonction `analyser` qui prend une liste de tensions (`List<Double>`, en volts) et renvoie une `data class Rapport` contenant :

- le nombre de mesures ;
- la tension moyenne ;
- la liste des tensions inférieures à 3.0 V, converties en millivolts (`Int`).

Si la liste est vide, la fonction renvoie `null`.

::: tip Point de contrôle
Avec `listOf(3.3, 2.9, 3.1, 2.7)`, vous devez obtenir 4 mesures, une moyenne de 3.0 et les valeurs `[2900, 2700]`.
:::

::: details Voir l'une des solutions possibles

```kotlin
data class Rapport(val nombre: Int, val moyenne: Double, val faiblesMv: List<Int>)

fun analyser(tensions: List<Double>): Rapport? {
    if (tensions.isEmpty()) return null
    return Rapport(
        nombre = tensions.size,
        moyenne = tensions.average(),
        faiblesMv = tensions.filter { it < 3.0 }.map { (it * 1000).toInt() }
    )
}

fun main() {
    println(analyser(listOf(3.3, 2.9, 3.1, 2.7)))
    println(analyser(emptyList()) ?: "Aucune mesure")
}
```

:::

## Pour aller plus loin

- [La documentation officielle de Kotlin](https://kotlinlang.org/docs/home.html)
- [Kotlin Koans](https://play.kotlinlang.org/koans/overview) : des petits exercices progressifs, directement dans le navigateur
- [Le cours Kotlin Multiplateforme](/tp/android/compose-multiplateforme/introduction.md)

👋 Si vous avez des questions, n'hésitez pas.
