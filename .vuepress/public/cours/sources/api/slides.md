# Introduction API Rest

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

![Les API Rest](./img/api_rest.jpeg)

---

## Coeur du web moderne

- Point central (TV, WebApp, IoT, …)
- Contiens la logique d'accès aux données.

---

Vous avez déjà entendu parler des API?

---

Regardons des exemples

---

### PWA

Progressive Web Apps

---

## Le monde de demain sera Web

PWA, Site Web, WebApp, … 

- <https://www.gmail.com>
- <https://pwa.rocks/>
- <https://mobile.twitter.com>
- <https://m.facebook.com>
- <https://www.youtube.com/tv>
- <https://drive.google.com>

---

![Twitter PWA](./img/twitter.png)

(Bluffant n’est-ce pas ? (psst c’est du ReactJS))

---

### Une App Native

- Installable via le « store ».
- Consomme de la donnée via le réseau HTTP.

---

### IoT (Internet of Things)

- Objet connecté
- Communique via 3G / 4G

---

## Le point commun ?

- La communication via API

---

## Repose sur le client / Serveur

---

![Les API](./img/api.png)

---

## Une API expose donc des

## services à d'autres logiciels

---

## La question au serveur

---

## L'API spécifie comment communiquer

- Lien
- Méthode HTTP
- Données en entrée
- Format de sortie

---

## Repose sur l'HTTP

---

## Comme pour le web

### Des liens des ressources

- `/users`
- `/user/42`
- …

---

## Utilisations des « Verbes HTTP »

---

Vous connaissez des méthodes « HTTP » ?

---

- GET
- PUT
- POST
- PATCH
- DELETE

---

## Mais également des ressources attendues

- `Accept`
- `Content-Type`
- `Authorization …`
- …

---

```
GET /api.html HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/90.0.4430.30
Host: cours.brosseau.ovh
Accept-Language: fr-fr
Accept-Encoding: gzip, deflate
Connection: Keep-Alive
```

---

## La réponse du serveur

---

## HTTP Status Codes

### Un code une signification

---

- 200 OK
- 201 Created
- 301 Moved Permanently
- 400 Bad Request
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error
- 503 Service Unavailable

http://www.restapitutorial.com/httpstatuscodes.html

---

## Et surtout

## Un format de données

---

## Le JSON

---

Format de communication universelle

---

Vous avez déjà entendu parler ?

---

- Décodable simplement.
- Léger.
- Lisible par un humain.
- Faiblement typé.

---

## Un tableau

```json
["a", "b"]
```

---

## Un Dictionnaire

```json
{
  "cle1": "valeur",
  "cle2": "valeur"
}
```

---

## Un Dictionnaire ?

![Question](./img/questions.gif)

---

## Le principe

- Structure similaire à un objet
- Structuré
- Valeur accessible par des clés.

---

https://json.org/example.html

---

## Écrivons ensemble le JSON :

- Une liste d'utilisateur (id, nom, age).
- Une liste de `string`.
- Un objet représentant **un** restaurant (id, nom, adresse (latitude, longitude), contact)

---

## Les clients

---

- Web (Ajax)
- Mobile (Client HTTP)
- …

---

## Web

- L'Ajax est fourni de base.
  - Fetch
  - jQuery
  - …

---

## Normer les API

- [Swagger](https://swagger.io/)
- [Définition des API](https://swagger.io/specification/)
- [OpenAPI](https://www.openapis.org/)

---

## Des questions ?
