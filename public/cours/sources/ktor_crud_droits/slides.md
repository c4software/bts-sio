# Créer des API avec Kotlin

## CRUD et droits

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Où en sommes-nous ?

```text
GET /v1/capteurs
```

Une seule route, mais toute la structure : les couches, les migrations, Koin.

---

## Aujourd'hui

| Verbe    | Chemin              | Action    |
| -------- | ------------------- | --------- |
| `GET`    | `/v1/capteurs/{id}` | Obtenir   |
| `POST`   | `/v1/capteurs`      | Créer     |
| `PUT`    | `/v1/capteurs/{id}` | Modifier  |
| `DELETE` | `/v1/capteurs/{id}` | Supprimer |

Le **CRUD** complet.

---

## La recette

Pour chaque opération, toujours le même chemin :

**DAO**, puis **service**, puis **route**.

---

## Question

Le client demande le capteur numéro 99.

Il n'existe pas. Que doit répondre l'API ?

---

## Un code HTTP

| Code  | Signification           |
| ----- | ----------------------- |
| `200` | Succès                  |
| `201` | Ressource créée         |
| `204` | Succès, rien à renvoyer |
| `400` | Requête invalide        |
| `404` | Ressource inexistante   |

Le code dit ce qui s'est passé, avant même de lire la réponse.

---

## Les erreurs : des exceptions

```kotlin
class ApiException(val status: HttpStatusCode, message: String) : Exception(message)
```

N'importe quelle couche lève l'exception.

Le plugin **StatusPages** la transforme en réponse HTTP.

---

## Un seul format d'erreur

```json
{ "message": "Le capteur 99 n'existe pas" }
```

Géré à un seul endroit, pas dans chaque route.

---

## Et l'erreur imprévue ?

Un `500`, avec un message générique. Le détail part dans les **logs**.

Ne jamais révéler une erreur interne au client.

---

## Recevoir du JSON

```kotlin
post {
    val request = call.receive<SensorRequest>()
    call.respond(HttpStatusCode.Created, sensorService.create(request))
}
```

Ce que l'API **reçoit** n'est pas ce qu'elle **renvoie** : l'`id`, c'est la base qui le choisit.

---

## Question

`"name": 42` est refusé automatiquement.

Et `"name": ""` ?

---

## La forme et le sens

```kotlin
require(name.isNotBlank()) { "Le nom est obligatoire" }
```

- La désérialisation vérifie la **forme** des données.
- Leur **sens**, ce sont des règles métier : c'est à vous de les écrire.

---

## À vous de jouer

Une seconde ressource, les **salles**, cette fois sans pas-à-pas.

La même recette : migration, table, DAO, service, module, routes.

---

## Dernière question

Votre API est en ligne.

**Qui** peut supprimer tous les capteurs ?

---

## Tout le monde !

Il suffit de connaître son adresse.

---

## Trois clients, trois besoins

- Le **tableau de bord** : lire, rien de plus.
- L'**application mobile** : ajouter et modifier, mais pas supprimer.
- Le **back-office** : tout faire.

---

## Deux questions distinctes

| Question                 | Nom              | Échec |
| ------------------------ | ---------------- | ----- |
| Qui êtes-vous ?          | Authentification | `401` |
| En avez-vous le droit ?  | Autorisation     | `403` |

---

## La clé d'API

```text
Authorization: Bearer cle-lecteur
```

Une chaîne secrète, envoyée à chaque requête.

En base, on ne garde que son **empreinte** (SHA-256), jamais la clé en clair.

---

## Le modèle

```text
cle_api ──► role ──► permission (ressource, action)
```

- Dix tablettes, dix clés, **un** rôle « technicien ».
- Un nouveau droit ? Une permission ajoutée au rôle.
- Une tablette perdue ? On supprime **sa** clé.

---

## Dans les routes

```kotlin
authenticate("api-key") {
    withPermission("capteurs", Action.DELETE) {
        delete("/{id}") {
            sensorService.delete(call.requireId())
            call.respond(HttpStatusCode.NoContent)
        }
    }
}
```

En lisant le fichier, on voit qui peut faire quoi.

---

## Question

Le technicien tente un `DELETE`.

`401` ou `403` ?

---

## 403

On sait qui il est, mais c'est interdit.

Le code de la route n'est jamais exécuté : aucun capteur n'est supprimé.

---

## Récapitulatif

- Un **CRUD** : toujours DAO, puis service, puis route.
- Les erreurs : des exceptions, traduites en codes HTTP par **StatusPages**.
- La **validation** : les règles métier vivent dans le service.
- **Authentification** (`401`) : qui êtes-vous ?
- **Autorisation** (`403`) : un rôle, une ressource, une action.

---

## Des questions ?

Place au TP 🚀
