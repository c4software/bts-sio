# Une API Ktor et ses clients

## Un serveur, deux clients

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Vos applications jusqu'ici

Les données sont dans le téléphone.

Question : et si on veut les partager entre plusieurs téléphones ? Ou avec un site web ?

---

## Il faut un serveur

```text
Application Android ─┐
                     ├──→  API  ──→  Base de données
Page web (Vue.js) ───┘
```

Un seul endroit pour les données, plusieurs façons de les afficher.

---

## Une API REST

- Une **URL** par ressource : `/v1/lampadaires`.
- Un **verbe** HTTP par action : `GET`, `POST`, `DELETE`…
- Des données en **JSON**, pas de HTML.

---

## Notre fil rouge

Le parc de **lampadaires solaires** d'une commune.

```json
{
    "id": 3,
    "numeroSerie": "LUM-2026-0003",
    "titre": "Route du col",
    "image": "/images/lampadaire-3.jpg",
    "statut": "EN_PANNE",
    "dateInstallation": "2026-05-20"
}
```

---

## Le CRUD

| Action | Verbe | Route |
|---|---|---|
| Lister | `GET` | `/v1/lampadaires` |
| Lire | `GET` | `/v1/lampadaires/{id}` |
| Créer | `POST` | `/v1/lampadaires` |
| Supprimer | `DELETE` | `/v1/lampadaires/{id}` |

Create, Read, Update, Delete.

---

## Question

Le serveur, en quel langage l'écrire ?

---

## En Kotlin !

- **Ktor** : le framework serveur de JetBrains (les créateurs de Kotlin).
- Le même langage que votre application Android.
- Léger : on n'installe que les **plugins** utiles.

---

## Le générateur

[start.ktor.io](https://start.ktor.io/settings)

- Un nom de projet.
- Deux plugins : **Content Negotiation** et **kotlinx.serialization**.
- Download, et c'est parti.

---

## Question

Une route, une requête SQL, une règle métier…

Tout écrire dans un seul fichier, ce serait plus simple, non ?

---

## Pour trois routes, oui

Mais pour cinquante ?

- Où est la requête SQL qui pose problème ?
- Où est la règle métier à changer ?
- Comment tester sans base de données ?

---

## Les couches

```text
Route     HTTP : la requête, la réponse en JSON
Service   Les règles métier
DAO       Les requêtes vers la base
Table     La description de la table en Kotlin
```

Chaque couche ne parle qu'à celle **du dessous**.

---

## Les packages

```text
cours.brosseau
├── Application.kt
├── plugins/            Serialization, DatabaseConnect…
├── common/domain/      les DTO (le contrat avec les clients)
├── database/tables/    les tables
└── domain/lampadaire/  Route, Service, Dao
```

Un dossier par rôle : on sait où chercher.

---

## Les DTO

```kotlin
@Serializable
data class CreateLampadaireDTO(val numeroSerie: String, val titre: String, …)

@Serializable
data class LampadaireDTO(val id: Int, …, val statut: StatutLampadaire)
```

Ce que le client envoie, ce que le serveur renvoie.

---

## Question

Les données, on les range où ?

---

## SQLite

- Une base de données dans **un simple fichier** : `lampadaires.db`.
- Rien à installer, rien à lancer.
- Parfait pour démarrer (votre téléphone en utilise partout).

---

## Exposed, l'ORM

```kotlin
object Lampadaires : Table("lampadaires") {
    val id = integer("id").autoIncrement()
    val titre = varchar("titre", 100)
    val statut = enumerationByName("statut", 20, StatutLampadaire::class)
}
```

La table décrite en Kotlin. Comme les modèles d'Eloquent avec Laravel.

---

## Le DAO

```kotlin
override fun getAll() = transaction {
    Lampadaires.selectAll().map { it.toLampadaireDTO() }
}
```

```sql
SELECT * FROM lampadaires
```

---

## Le service

```kotlin
fun create(dto: CreateLampadaireDTO): LampadaireDTO {
    require(dto.numeroSerie.isNotBlank()) { "Le numéro de série est obligatoire" }
    return lampadaireDao.create(dto, StatutLampadaire.EN_SERVICE, LocalDate.now().toString())
}
```

Un lampadaire neuf est **en service** : c'est une règle métier.

---

## La route

```kotlin
post {
    val dto = call.receive<CreateLampadaireDTO>()
    call.respond(HttpStatusCode.Created, lampadaireService.create(dto))
}
```

Le JSON reçu devient un objet Kotlin. Pas de SQL ici.

---

## Les photos

```kotlin
staticResources("/images", "images")
```

Le serveur sert aussi des fichiers : l'API renvoie le **chemin**, le client télécharge la photo.

---

## Tester sans client

```sh
curl http://localhost:8080/v1/lampadaires
```

```sh
curl -X POST http://localhost:8080/v1/lampadaires \
  -H "Content-Type: application/json" \
  -d '{"numeroSerie": "…", "titre": "…", "description": "…", "image": "…"}'
```

Le serveur se teste **avant** d'écrire la moindre application.

---

## Côté Android

Le même Ktor… en version **client**.

```kotlin
suspend fun lampadaires(): List<LampadaireDTO> =
    client.get("$baseUrl/v1/lampadaires").body()
```

Une fonction `suspend` : l'interface ne gèle pas.

---

## Question

Depuis l'émulateur Android, `localhost`, c'est qui ?

---

## L'émulateur lui-même !

- `localhost` : l'émulateur.
- `10.0.2.2` : votre PC, vu depuis l'émulateur.
- Sur un vrai téléphone : l'adresse IP du PC (même réseau Wi-Fi).

---

## Un écran, des états

```text
Chargement ──→ Lampadaires (la liste)
     └───────→ Erreur (le serveur ne répond pas)
```

Une `sealed interface`, et un `when` dans l'écran. Comme dans le TP BLE.

---

## Les images

```kotlin
AsyncImage(model = urlImage(lampadaire.image), …)
```

**Coil** télécharge la photo à partir de son URL, sans bloquer l'écran.

---

## Côté navigateur

```js
fetch("http://localhost:8080/v1/lampadaires")
  .then((response) => response.json())
  .then((lampadaires) => { this.lampadaires = lampadaires; });
```

La même API, cette fois en JavaScript, avec Vue.js.

---

## Question

La page est sur `localhost:5500`, l'API sur `localhost:8080`.

Le navigateur va-t-il accepter ?

---

## Non : CORS

🚨 Dans la console du navigateur :

```text
Access to fetch at 'http://localhost:8080/v1/lampadaires'
from origin 'http://localhost:5500' has been blocked by CORS policy
```

Le navigateur protège l'utilisateur : c'est au **serveur** d'autoriser la page.

---

## Autoriser la page

```kotlin
fun Application.installCors() {
    install(CORS) {
        allowHost("localhost:5500")
        allowHeader(HttpHeaders.ContentType)
    }
}
```

Curl et Android ne sont pas concernés : CORS est une règle **des navigateurs**.

---

## Récapitulatif

- Une **API REST** : des routes, des verbes, du JSON.
- **Ktor** côté serveur, en **couches** : route, service, DAO.
- **SQLite** et **Exposed** pour les données, **curl** pour tester.
- **Ktor client** côté Android, des écrans en machine à états.
- **fetch** et **Vue.js** côté web, sans oublier **CORS**.

---

## Des questions ?

Place au TP 🚀
