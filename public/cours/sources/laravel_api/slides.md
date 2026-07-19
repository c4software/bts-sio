# Des API avec Laravel

## Du JSON, pas du HTML

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Jusqu'ici

Vos contrôleurs retournent des pages **HTML**.

Question : et si le client n'était pas un navigateur ?

---

## Le client peut être…

- Une application mobile (Android, iOS, Flutter).
- Un autre serveur.
- Une TV, une montre, une voiture…

Aucun d'eux ne veut de votre HTML.

---

## L'API

Le serveur ne renvoie que **la donnée**, le client s'occupe de l'affichage.

```
            ┌→  Site web
API (JSON) ─┼→  Application mobile
            └→  N'importe quel client
```

Une seule API, autant de clients que vous voulez.

---

## Pourquoi JSON ?

```json
{ "nom": "Clavier", "prix": 49.90 }
```

- Universel : tous les langages savent le lire.
- Léger et lisible.

C'est le format standard des API du web.

---

## Dans Laravel

```php
function liste() {
    return response()->json(Produit::all());
}
```

La route va dans `routes/api.php`. C'est tout : votre première API.

---

## REST : les verbes HTTP

| Verbe    | Action    |
| -------- | --------- |
| `GET`    | Lire      |
| `POST`   | Créer     |
| `PUT`    | Modifier  |
| `DELETE` | Supprimer |

L'URL désigne la ressource, le verbe dit quoi en faire.

---

## Question

Un `GET`, le navigateur sait faire.

Mais comment tester un `POST` ou un `DELETE` sans formulaire ?

---

## Postman

Un outil pour construire des requêtes HTTP à la main : verbe, URL, corps JSON.

Vous construisez votre « cahier de tests » et rejouez chaque requête à volonté. Un standard en entreprise.

---

## Et les jointures ?

```php
Commande::where('id_client', $id)->with('produit')->get();
```

Le `with()` embarque le produit **dans** le JSON de chaque commande.

Le client mobile reçoit tout en une seule requête.

---

## Dernière question

Votre API est en ligne.

**Qui** peut l'appeler ?

---

## Tout le monde !

Une API sans protection est publique. La solution : le **token**.

- Le client s'authentifie une fois, reçoit un token.
- Chaque requête suivante présente ce token (`Authorization: Bearer …`).

C'est le rôle de **Sanctum**, le bonus du TP.

---

## Récapitulatif

- Une API renvoie de la **donnée** (JSON), pas de la présentation.
- Une API = plusieurs clients (web, mobile…).
- `response()->json()` + `routes/api.php` : la base dans Laravel.
- **REST** : les verbes HTTP donnent le sens.
- **Postman** pour tester, un **token** pour protéger.

---

## Des questions ?

Place au TP 🚀
