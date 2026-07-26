# API REST : Observation et analyse

Nom : ______________________  Prénom : ______________________

**Question 1 — Pourquoi une API ?**

Pourquoi préférer une API JSON à un retour HTML classique ?

- ☐ **a.** Le JSON est plus rapide à afficher qu'une page HTML dans le navigateur
- ☐ **b.** L'API est universelle : la même donnée peut être consommée par un site web, une application mobile, une TV, un objet connecté…
- ☐ **c.** Le HTML ne peut pas contenir de données
- ☐ **d.** Une API est obligatoirement plus sécurisée qu'un site web

**Question 2 — Observer une requête**

Voici une requête HTTP :
GET /api/produits HTTP/1.1
Host: boutique.exemple.fr
Accept: application/json
Que demande le client ?

- ☐ **a.** La suppression de tous les produits
- ☐ **b.** Le téléchargement du fichier produits.json depuis son propre ordinateur
- ☐ **c.** La liste des produits au format JSON, sur le serveur boutique.exemple.fr
- ☐ **d.** La création d'un produit sur le serveur

**Question 3 — Observer une réponse**

Un client appelle GET /api/produit/999 et reçoit une réponse avec le code 404. Qu'en déduisez-vous ?

- ☐ **a.** Le client n'a pas le droit d'accéder à ce produit
- ☐ **b.** Le produit demandé n'existe pas, la ressource est introuvable
- ☐ **c.** Le serveur est en panne
- ☐ **d.** La requête a réussi mais le produit est vide

**Question 4 — Les codes HTTP**

Associez chaque code de statut HTTP à sa signification.

| | À relier à… |
|---|---|
| 201 → ______ | • L'accès est interdit |
| 301 → ______ | • La ressource a été déplacée définitivement |
| 403 → ______ | • La requête doit être authentifiée à nouveau |
| 500 → ______ | • La ressource a été créée |
|  | • Erreur interne du serveur |
|  | • Le service est temporairement indisponible (maintenance) |

**Question 5 — Le code de la création**

Votre API vient de créer une ressource suite à un POST. Quel code de statut HTTP est le plus approprié pour la réponse ?

Réponse : ________________________________________

**Question 6 — La bonne méthode**

Quelle méthode HTTP est prévue pour mettre à jour partiellement une ressource ?

- ☐ **a.** GET
- ☐ **b.** PATCH
- ☐ **c.** SEND
- ☐ **d.** UPDATE

**Question 7 — Vrai ou Faux - Sécurité des méthodes**

Les paramètres envoyés en POST sont invisibles et ne peuvent pas être modifiés par le client, contrairement au GET.

☐ Vrai  ☐ Faux

**Question 8 — Prédire le comportement**

Le client appelle l'URL suivante :
http://localhost:8080/api/users?id=42
Quel code PHP permet de récupérer la valeur 42 côté serveur ?

- ☐ **a.** $id = getParameter("id");
- ☐ **b.** $id = $_URL['id'];
- ☐ **c.** $id = $_POST['id'];
- ☐ **d.** $id = $_GET['id'];

**Question 9 — Filtre et pagination**

Quelle URL permet de récupérer la page 3 des utilisateurs dont le nom est Doe ?

- ☐ **a.** /api/users/filter/Doe/page/3
- ☐ **b.** /api/users?filter=Doe&page=3
- ☐ **c.** /api/users?filter=Doe?page=3
- ☐ **d.** /api/users&filter=Doe&page=3

**Question 10 — Analyser un besoin**

Vous devez écrire la requête « supprimer la commande 12 » dans une API REST. Quelle forme est la plus appropriée ?

- ☐ **a.** POST /api/supprimerCommande12
- ☐ **b.** DELETE /api/commandes?action=delete
- ☐ **c.** GET /api/commandes/supprimer?id=12
- ☐ **d.** DELETE /api/commandes/12

**Question 11 — Observer du JSON**

Voici une réponse d'API :
{
  "id": 42,
  "nom": "Chez Marcel",
  "adresse": { "latitude": 47.47, "longitude": -0.55 },
  "plats": [
    { "id": 1, "nom": "Menu du jour", "prix": 14.5 },
    { "id": 2, "nom": "Plat du chef", "prix": 19 }
  ]
}
Comment accéder à la latitude du restaurant ?

- ☐ **a.** Par la clé latitude directement à la racine
- ☐ **b.** Par les clés : adresse puis latitude
- ☐ **c.** Par l'index : adresse[0]
- ☐ **d.** Impossible, le JSON ne peut pas contenir d'objets imbriqués

**Question 12 — Observer du JSON 2**

Dans le JSON de la question précédente, que représente la valeur de la clé plats ?

- ☐ **a.** Une chaîne de caractères contenant les deux plats
- ☐ **b.** Un tableau de deux objets, chacun décrivant un plat
- ☐ **c.** Un tableau de chaînes de caractères
- ☐ **d.** Un objet unique avec deux clés

**Question 13 — Les qualités du JSON**

Quelles affirmations sont vraies à propos du JSON ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Il est lisible par un humain
- ☐ **b.** Il est faiblement typé
- ☐ **c.** Il est léger et décodable simplement
- ☐ **d.** Il est fortement typé
- ☐ **e.** Il ne peut être lu que par des clients JavaScript

**Question 14 — Le format des API**

Quel est le format de données le plus utilisé par les API REST modernes ?

Réponse : ________________________________________

**Question 15 — Activer les API**

Depuis Laravel 11, la partie API n'est plus activée par défaut. On l'active avec la commande php artisan ______ .

(a) api:start / (b) install:api / (c) make:api / (d) enable:api

**Question 16 — **

function detail($id) {
    return response()-&gt;json(Produit::find($id));
}
Que se passe-t-il quand un client appelle GET /api/produits/12 ?

- ☐ **a.** Une erreur : une route ne peut pas contenir de paramètre
- ☐ **b.** Tous les produits sont retournés, le paramètre est ignoré
- ☐ **c.** La méthode detail est appelée avec $id valant 12 et retourne le produit 12 en JSON
- ☐ **d.** La méthode detail est appelée avec $id valant "{id}"

**Question 17 — Prédire le comportement**

Un client envoie POST /api/produits avec le corps JSON :
{ "nom": "Clavier", "prix": 49.99 }
Le contrôleur exécute :
function ajouter(Request $request) {
    $produit = new Produit();
    $produit-&gt;nom = $request-&gt;nom;
    $produit-&gt;prix = $request-&gt;prix;
    $produit-&gt;save();
    return response()-&gt;json($produit);
}
Que se passe-t-il ?

- ☐ **a.** Le produit est créé mais rien n'est retourné au client
- ☐ **b.** Le produit n'est pas créé car il manque la requête SQL INSERT
- ☐ **c.** Une erreur : on ne peut pas lire $request-&gt;nom sans formulaire HTML
- ☐ **d.** Un produit « Clavier » à 49.99 est créé en base et retourné en JSON au client

**Question 18 — Observer la différence**

Comparez ces deux méthodes :
Version A :
return response()-&gt;json(Commande::where('id_client', $id)-&gt;get());
Version B :
return response()-&gt;json(Commande::where('id_client', $id)-&gt;with('produit')-&gt;get());
Qu'observe-t-on dans la réponse de la version B par rapport à la A ?

- ☐ **a.** Chaque commande contient en plus le produit associé (la jointure est chargée)
- ☐ **b.** La version B filtre les commandes qui n'ont pas de produit
- ☐ **c.** Aucune différence, with() ne change que les performances
- ☐ **d.** La version B retourne uniquement les produits, sans les commandes

**Question 19 — Prédire le comportement**

La table commandes contient les commandes 1 et 2. Le code suivant s'exécute :
Commande::destroy(3);
Que se passe-t-il ?

- ☐ **a.** Une exception est levée et le script s'arrête
- ☐ **b.** La table commandes est vidée
- ☐ **c.** La commande la plus récente est supprimée par défaut
- ☐ **d.** Rien, la commande 3 n'existe pas, aucune erreur n'est levée

**Question 20 — Les commandes artisan**

Associez chaque commande artisan à son action.

| | À relier à… |
|---|---|
| php artisan make:controller → ______ | • Remplir la base avec les données des seeders |
| php artisan db:seed → ______ | • Vider la base de données |
| php artisan serve → ______ | • Lancer le serveur de développement |
| php artisan code:models → ______ | • Créer un contrôleur |
|  | • Déployer l'application en production |
|  | • Générer les modèles depuis la base de données (plugin Reliese) |

**Question 21 — Observer une factory**

Voici une factory :
public function definition() {
    return [
        'nom' =&gt; $this-&gt;faker-&gt;firstName,
        'email' =&gt; fake()-&gt;unique()-&gt;safeEmail(),
    ];
}
Et dans le seeder : Client::factory()-&gt;count(50)-&gt;create();
Qu'obtient-on après php artisan db:seed ?

- ☐ **a.** Un seul client nommé firstName
- ☐ **b.** Une erreur : une factory ne peut créer qu'un enregistrement à la fois
- ☐ **c.** 50 clients avec des noms et des emails fictifs et uniques dans la table clients
- ☐ **d.** 50 lignes vides dans la table clients

**Question 22 — Tester son API**

Pourquoi faut-il un outil comme Postman pour tester la route POST /api/produits, alors qu'un navigateur suffisait pour GET /api/produits ?

- ☐ **a.** Postman est plus rapide que le navigateur
- ☐ **b.** La barre d'adresse d'un navigateur n'envoie que des requêtes GET, il faut un outil pour construire un POST avec un corps JSON
- ☐ **c.** Le POST ne fonctionne que sur le port de Postman
- ☐ **d.** Les navigateurs bloquent le format JSON

**Question 23 — Observer une requête authentifiée**

Voici une requête :
GET /api/users HTTP/1.1
Host: cours.brosseau.ovh
Authorization: Bearer faf1c7e0-6e5b-11eb-9439-0242ac130002
À quoi sert la troisième ligne ?

- ☐ **a.** Elle chiffre la requête de bout en bout
- ☐ **b.** Elle indique le mot de passe de l'utilisateur en clair
- ☐ **c.** Elle transmet le token qui identifie l'utilisateur : le serveur peut vérifier son authentification à chaque requête
- ☐ **d.** Elle précise la version de l'API à utiliser

**Question 24 — L'en-tête du token**

Pour s'authentifier auprès d'une API, le client envoie son token dans l'en-tête HTTP ______ avec une valeur de la forme « Bearer eyJhbGci… ».

(a) Authentication / (b) Authorization / (c) Token / (d) Api-Key

**Question 25 — Le middleware**

Dans le contexte d'une API, qu'est-ce qu'un middleware ?

- ☐ **a.** Une librairie qui convertit le JSON en XML
- ☐ **b.** Un serveur intermédiaire entre le client et la base de données
- ☐ **c.** Le composant qui gère l'affichage des erreurs
- ☐ **d.** Un code exécuté avant celui de l'API, à chaque requête, par exemple pour vérifier l'authentification et les droits

**Question 26 — Prédire le comportement**

Dans la méthode login du TP, le client envoie un email inconnu. Le code exécute :
if (!auth()-&gt;attempt($request-&gt;only('email', 'password'))) {
    return response(['message' =&gt; 'Invalid credentials'], 401);
}
Que reçoit le client ?

- ☐ **a.** Une réponse 200 avec un token vide
- ☐ **b.** Une réponse avec le code 401 Unauthorized et le message Invalid credentials
- ☐ **c.** Une réponse 404 car l'utilisateur n'existe pas
- ☐ **d.** Le serveur crée automatiquement le compte

**Question 27 — Observer une route protégée**

Voici une route :
Route::get('/commandes', [CommandesController::class, "liste"])
    -&gt;middleware('auth:sanctum', 'abilities:admin');
Un utilisateur authentifié avec un token SANS l'ability admin appelle cette route. Que se passe-t-il ?

- ☐ **a.** La requête est refusée : le token est valide mais n'a pas les droits requis
- ☐ **b.** Le compte de l'utilisateur est supprimé
- ☐ **c.** La requête passe, être authentifié suffit
- ☐ **d.** Le token reçoit automatiquement l'ability admin

**Question 28 — Prédire le comportement**

Un client exécute :
curl -X POST http://localhost:8000/api/login
     -H "Content-Type: application/json"
     -d '{ "email": "valentin@demo.fr", "password": "password" }'
Les identifiants sont corrects. Que contient la réponse d'après le code du TP ?

- ☐ **a.** Uniquement le code 200, sans corps de réponse
- ☐ **b.** L'utilisateur authentifié et un token à utiliser dans les prochaines requêtes
- ☐ **c.** Un cookie de session PHP classique
- ☐ **d.** Le mot de passe hashé de l'utilisateur

**Question 29 — Vrai ou Faux - JWT**

Le contenu d'un JWT (JSON Web Token) est chiffré, on peut donc y stocker des informations sensibles sans risque.

☐ Vrai  ☐ Faux

**Question 30 — Relecture de code**

Votre API propose une route POST /api/client pour créer un compte. Quelles vérifications le serveur doit-il faire ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Vérifier que le mot de passe fait au moins 8 caractères
- ☐ **b.** Hasher le mot de passe avant de l'enregistrer
- ☐ **c.** Vérifier que l'email n'est pas déjà utilisé
- ☐ **d.** Stocker le mot de passe en clair pour pouvoir le renvoyer par email
- ☐ **e.** Faire confiance aux vérifications déjà faites côté client


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (b) L'API est universelle : la même donnée peut être consommée par un site web, une application mobile, une TV, un objet connecté… — *Exact, c'est la séparation entre le client et le serveur qui rend cela possible.*

**2.** (c) La liste des produits au format JSON, sur le serveur boutique.exemple.fr — *Exact : méthode GET, chemin /api/produits, l'en-tête Accept précise le format attendu.*

**3.** (b) Le produit demandé n'existe pas, la ressource est introuvable — *Exact, 404 Not Found.*

**4.** 201 → La ressource a été créée ; 301 → La ressource a été déplacée définitivement ; 403 → L'accès est interdit ; 500 → Erreur interne du serveur

**5.** 201 — *Exact, 201 Created. Le 200 OK est accepté mais moins précis.*

**6.** (b) PATCH — *Exact, PUT remplace la ressource, PATCH la modifie partiellement.*

**7.** Faux — *Exact, c'est faux : avec le bon outil, tout est visible et modifiable. POST n'est pas un mécanisme de sécurité.*

**8.** (d) $id = $_GET['id']; — *Exact, un paramètre d'URL se récupère dans la superglobale $_GET.*

**9.** (b) /api/users?filter=Doe&page=3 — *Exact, ? introduit le premier paramètre, & sépare les suivants.*

**10.** (d) DELETE /api/commandes/12 — *Exact : le verbe exprime l'action, l'URL identifie la ressource.*

**11.** (b) Par les clés : adresse puis latitude — *Exact, adresse est un objet imbriqué dont on lit la clé latitude.*

**12.** (b) Un tableau de deux objets, chacun décrivant un plat — *Exact : les crochets indiquent un tableau, chaque élément est un dictionnaire.*

**13.** (a) Il est lisible par un humain ; (b) Il est faiblement typé ; (c) Il est léger et décodable simplement — *Exact. / Exact. / Exact.*

**14.** JSON (accepté aussi : Le JSON)

**15.** (b) install:api

**16.** (c) La méthode detail est appelée avec $id valant 12 et retourne le produit 12 en JSON — *Exact, le paramètre entre accolades dans la route est transmis à la méthode.*

**17.** (d) Un produit « Clavier » à 49.99 est créé en base et retourné en JSON au client — *Exact, $request contient les données envoyées, save() insère en base.*

**18.** (a) Chaque commande contient en plus le produit associé (la jointure est chargée) — *Exact, with() exploite la relation définie dans le modèle. On peut aussi déclarer $with dans le modèle pour l'automatiser.*

**19.** (d) Rien, la commande 3 n'existe pas, aucune erreur n'est levée — *Exact, destroy() supprime si la ressource existe, sinon ne fait rien.*

**20.** php artisan make:controller → Créer un contrôleur ; php artisan db:seed → Remplir la base avec les données des seeders ; php artisan serve → Lancer le serveur de développement ; php artisan code:models → Générer les modèles depuis la base de données (plugin Reliese)

**21.** (c) 50 clients avec des noms et des emails fictifs et uniques dans la table clients — *Exact, la factory décrit un enregistrement, le seeder en crée en masse.*

**22.** (b) La barre d'adresse d'un navigateur n'envoie que des requêtes GET, il faut un outil pour construire un POST avec un corps JSON — *Exact, Postman permet de choisir la méthode et de remplir le Body.*

**23.** (c) Elle transmet le token qui identifie l'utilisateur : le serveur peut vérifier son authentification à chaque requête — *Exact, c'est un bearer token.*

**24.** (b) Authorization

**25.** (d) Un code exécuté avant celui de l'API, à chaque requête, par exemple pour vérifier l'authentification et les droits — *Exact, comme -&gt;middleware('auth:sanctum') dans Laravel.*

**26.** (b) Une réponse avec le code 401 Unauthorized et le message Invalid credentials — *Exact, attempt() échoue, les identifiants sont invalides.*

**27.** (a) La requête est refusée : le token est valide mais n'a pas les droits requis — *Exact, l'authentification passe (auth:sanctum) mais pas l'autorisation (abilities:admin).*

**28.** (b) L'utilisateur authentifié et un token à utiliser dans les prochaines requêtes — *Exact, le token (Sanctum) servira de bearer token.*

**29.** Faux — *Exact, c'est faux : le JWT est encodé (lisible par tous), pas chiffré. Il ne faut pas y mettre d'informations sensibles.*

**30.** (a) Vérifier que le mot de passe fait au moins 8 caractères ; (b) Hasher le mot de passe avant de l'enregistrer ; (c) Vérifier que l'email n'est pas déjà utilisé — *Exact. / Exact, jamais de mot de passe en clair en base. / Exact.*
