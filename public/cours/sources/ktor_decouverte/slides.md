# Créer des API avec Kotlin

## Le projet Ktor

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Kotlin, vous connaissez

Côté Android, pour écrire des applications.

Question : et le serveur que l'application interroge, en quoi est-il écrit ?

---

## En Kotlin aussi !

- **Ktor** : le framework serveur de JetBrains (les créateurs de Kotlin).
- Le même langage des deux côtés.
- Léger : on n'installe que les briques utiles, les **plugins**.

---

## Notre fil rouge

Une API qui gère les **capteurs** d'un bâtiment (température, humidité, CO2…).

```text
GET /v1/capteurs
```

Aujourd'hui : une seule route, mais toute la structure du projet.

---

## Ce que renvoie l'API

```json
{
    "id": 1,
    "name": "Salle serveur",
    "type": "temperature",
    "unit": "°C",
    "active": true
}
```

De la donnée, pas de l'affichage.

---

## Question

Une route, une requête SQL…

Tout écrire dans un seul fichier, ce serait plus simple, non ?

---

## Pour une route, oui

Mais pour cinquante ?

- Où est la requête SQL qui pose problème ?
- Où est la règle métier à changer ?
- Comment tester sans base de données ?

---

## L'architecture en couches

```text
Route     HTTP : la requête, la réponse en JSON
Service   Les règles métier
DAO       Les requêtes vers la base
Table     La description de la table en Kotlin
```

Chaque couche ne parle qu'à celle **du dessous**.

---

## La base de données

**PostgreSQL**, lancé dans Docker : rien à installer sur le poste.

```sh
docker compose up -d --wait
```

Avec Adminer pour regarder ce qu'elle contient.

---

## Question

Vous créez la table à la main dans Adminer.

Comment vos collègues, ou le serveur de production, obtiennent-ils la même ?

---

## Les migrations

Des scripts SQL **numérotés**, rangés dans le projet.

```text
db/migration/
├── V1__create_capteur.sql
└── V2__create_salle.sql
```

Au démarrage, **Flyway** applique ceux qui manquent, dans l'ordre.

---

## La règle d'or

Une migration déjà appliquée ne se modifie **jamais**.

Pour corriger ou faire évoluer la base : une **nouvelle** migration.

---

## L'ORM : Exposed

```kotlin
object SensorTable : Table("capteur") {
    val id = integer("id").autoIncrement()
    val name = varchar("nom", 100)
}
```

La table décrite en Kotlin : le code en anglais, la base en français.

---

## Une requête, en Kotlin

```kotlin
SensorTable.selectAll().orderBy(SensorTable.id)
```

```sql
SELECT * FROM capteur ORDER BY id
```

Une faute de frappe devient une erreur de **compilation**.

---

## Le service

```kotlin
class SensorService(private val sensorDao: SensorDao) {

    fun getAll(): List<Sensor> = sensorDao.findAll()
}
```

Il **reçoit** son DAO, il ne le crée pas.

---

## Question

Mais alors, qui crée le DAO et le donne au service ?

---

## L'injection de dépendances

```kotlin
val sensorModule = module {
    singleOf(::ExposedSensorDao) bind SensorDao::class
    singleOf(::SensorService)
}
```

**Koin** crée les objets et les fournit là où on en a besoin.

---

## La route

```kotlin
route("/capteurs") {
    get {
        call.respond(sensorService.getAll())
    }
}
```

Pas de SQL ici : la route appelle le service, la liste part en JSON.

---

## Le trajet d'une requête

```text
GET /v1/capteurs
   → Route → Service → DAO → PostgreSQL
   ← JSON  ←  List<Sensor>  ←  lignes
```

---

## Récapitulatif

- **Ktor** : écrire le serveur en Kotlin, brique par brique (les plugins).
- Des **couches** : route, service, DAO, table.
- **Flyway** : la base évolue par des migrations numérotées.
- **Exposed** : les requêtes écrites en Kotlin, vérifiées à la compilation.
- **Koin** : il crée les objets et les relie entre eux.

---

## Des questions ?

Place au TP 🚀
