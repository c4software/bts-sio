# JavaScript : L'AJAX

Nom : ______________________  Prénom : ______________________

**Question 1 — Le principe**

Qu'apporte l'AJAX à une page Web ?

- ☐ **a.** Accélérer le chargement initial de la page
- ☐ **b.** Exécuter du JavaScript côté serveur
- ☐ **c.** Charger ou envoyer des données au serveur sans recharger la page
- ☐ **d.** Chiffrer les échanges avec le serveur

**Question 2 — La fonction moderne**

Quelle fonction JavaScript native permet de faire une requête HTTP vers le serveur ?

Réponse : ________________________________________

**Question 3 — Méthode par défaut**

Quelle méthode HTTP est utilisée par fetch("./monContenu.php") quand on ne précise rien ?

- ☐ **a.** POST
- ☐ **b.** AJAX
- ☐ **c.** GET
- ☐ **d.** PUT

**Question 4 — Vrai ou Faux - Asynchrone**

L'appel fetch bloque la page tant que le serveur n'a pas répondu.

☐ Vrai  ☐ Faux

**Question 5 — Le .then()**

Dans fetch(…).then((response) =&gt; …), à quoi sert le .then() ?

- ☐ **a.** À exécuter du code une fois la réponse du serveur disponible
- ☐ **b.** À arrêter la requête après un délai
- ☐ **c.** À relancer la requête si elle échoue
- ☐ **d.** À exécuter le code immédiatement, avant la requête

**Question 6 — Lire la réponse**

Le serveur renvoie du JSON. Quelle méthode applique-t-on à la réponse pour la convertir en objet JavaScript ?

- ☐ **a.** response.toObject()
- ☐ **b.** response.text()
- ☐ **c.** response.json()
- ☐ **d.** response.parse()

**Question 7 — Envoyer du JSON**

Pour envoyer l'objet data au serveur dans le body d'un POST au format JSON, on écrit body: JSON. ______ (data).

(a) stringify / (b) toJson / (c) parse / (d) encode

**Question 8 — Gérer les erreurs**

Dans une chaîne fetch, à quoi sert le .catch() ?

- ☐ **a.** À annuler la requête en cours
- ☐ **b.** À exécuter du code si la requête échoue (erreur réseau par exemple)
- ☐ **c.** À attraper la réponse du serveur
- ☐ **d.** À relancer automatiquement la requête

**Question 9 — Le POST**

Quelle écriture permet d'envoyer une requête POST avec fetch ?

- ☐ **a.** post("./monContenu.php", data)
- ☐ **b.** fetch("./monContenu.php", { method: "POST", body: data })
- ☐ **c.** fetch("POST", "./monContenu.php", data)
- ☐ **d.** fetch.post("./monContenu.php", data)

**Question 10 — Les rôles**

Associez chaque élément à son rôle dans une requête AJAX.

| | À relier à… |
|---|---|
| fetch(url) → ______ | • Convertir la réponse en objet JavaScript |
| response.json() → ______ | • L'équivalent avec la librairie jQuery |
| JSON.stringify(data) → ______ | • Convertir un objet JavaScript en chaîne JSON |
| $.get(url, callback) → ______ | • Lancer la requête vers le serveur |


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (c) Charger ou envoyer des données au serveur sans recharger la page — *Exact, la page est mise à jour dynamiquement avec la réponse.*

**2.** fetch (accepté aussi : fetch())

**3.** (c) GET — *Exact, pour envoyer des données on précisera { method: "POST", body: … }.*

**4.** Faux — *Exact, c'est faux : fetch est asynchrone, la page reste utilisable et le code du .then() s'exécute quand la réponse arrive.*

**5.** (a) À exécuter du code une fois la réponse du serveur disponible — *Exact, c'est la manière de traiter un résultat asynchrone.*

**6.** (c) response.json() — *Exact. Pour une réponse texte ou HTML, on utiliserait response.text().*

**7.** (a) stringify

**8.** (b) À exécuter du code si la requête échoue (erreur réseau par exemple) — *Exact, c'est le pendant du .then() pour les erreurs.*

**9.** (b) fetch("./monContenu.php", { method: "POST", body: data }) — *Exact, le deuxième paramètre de fetch permet de configurer la requête.*

**10.** fetch(url) → Lancer la requête vers le serveur ; response.json() → Convertir la réponse en objet JavaScript ; JSON.stringify(data) → Convertir un objet JavaScript en chaîne JSON ; $.get(url, callback) → L'équivalent avec la librairie jQuery
