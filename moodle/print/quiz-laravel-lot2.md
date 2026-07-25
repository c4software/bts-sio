# Laravel — Lot 2 : Authentification, API, tests, 2FA et reset de mot de passe

Nom : ______________________  Prénom : ______________________

**Question 1 — Hashage des mots de passe**

Pourquoi hashe-t-on les mots de passe avant de les stocker en base de données ?

- ☐ **a.** Pour accélérer la vérification lors de la connexion
- ☐ **b.** Pour permettre de renvoyer le mot de passe par email en cas d'oubli
- ☐ **c.** Pour qu'en cas de fuite de la base, les mots de passe ne soient pas lisibles
- ☐ **d.** Pour que les mots de passe prennent moins de place en base

**Question 2 — Vrai ou Faux - Hashage**

Le hashage est une opération réversible : à partir du hash, on peut retrouver le mot de passe d'origine.

☐ Vrai  ☐ Faux

**Question 3 — Protéger des routes**

Dans Laravel, quel mécanisme permet de réserver certaines routes aux utilisateurs connectés ?

- ☐ **a.** Une condition if dans chaque vue Blade
- ☐ **b.** Un fichier .htaccess
- ☐ **c.** Le fichier .env
- ☐ **d.** Le middleware auth

**Question 4 — Connexion**

Lors de la connexion, comment vérifie-t-on que le mot de passe saisi est correct ?

- ☐ **a.** On compare le hash du mot de passe saisi avec le hash stocké en base
- ☐ **b.** On compare le mot de passe saisi avec celui stocké en clair en base
- ☐ **c.** On déchiffre le hash stocké et on le compare au mot de passe saisi
- ☐ **d.** On envoie le mot de passe au navigateur pour vérification

**Question 5 — Les routes d'API**

Dans un projet Laravel, les routes d'API sont définies dans le fichier routes/ ______ , et sont automatiquement préfixées par /api.

(a) json.php / (b) rest.php / (c) web.php / (d) api.php

**Question 6 — Format des API**

Dans quel format une API REST échange-t-elle généralement ses données avec les clients ?

- ☐ **a.** Blade
- ☐ **b.** JSON
- ☐ **c.** HTML
- ☐ **d.** PDF

**Question 7 — Méthodes HTTP**

Associez chaque méthode HTTP à son usage dans une API REST.

| | À relier à… |
|---|---|
| GET → ______ | • Récupérer des données |
| POST → ______ | • Modifier une ressource existante |
| PUT → ______ | • Créer une nouvelle ressource |
| DELETE → ______ | • Supprimer une ressource |

**Question 8 — Codes HTTP**

Quel code de statut HTTP signifie « ressource non trouvée » ?

Réponse : ________________________________________

**Question 9 — Types de tests**

Quelle est la différence entre un test unitaire et un test Feature dans Laravel ?

- ☐ **a.** Il n'y a aucune différence, ce sont deux noms pour la même chose
- ☐ **b.** Le test unitaire est manuel, le test Feature est automatique
- ☐ **c.** Le test Feature ne fonctionne qu'en production
- ☐ **d.** Le test unitaire vérifie une fonction isolée, le test Feature simule une vraie requête HTTP sur l'application

**Question 10 — Le TDD**

Dans la démarche TDD (Test Driven Development), on commence par écrire ______ avant le reste : c'est la phase « Red », puis on code jusqu'à la phase « Green ».

(a) les tests / (b) le code / (c) la documentation / (d) les vues

**Question 11 — Lancer les tests**

Quelle commande artisan permet de lancer l'ensemble des tests du projet ? (avec ou sans le préfixe php artisan)

Réponse : ________________________________________

**Question 12 — La 2FA**

Qu'apporte une authentification à deux facteurs (2FA) par rapport à un simple mot de passe ?

- ☐ **a.** Un chiffrement de la base de données
- ☐ **b.** Un mot de passe deux fois plus long
- ☐ **c.** Une deuxième preuve d'identité (par exemple un code temporaire), qui protège le compte même si le mot de passe est compromis
- ☐ **d.** Une double saisie du mot de passe pour éviter les fautes de frappe

**Question 13 — Mot de passe oublié**

Quel est le mécanisme correct d'un « mot de passe oublié » ?

- ☐ **a.** Réinitialiser le mot de passe à « 123456 » et demander à l'utilisateur de le changer
- ☐ **b.** Afficher le mot de passe sur la page après vérification de l'adresse email
- ☐ **c.** Envoyer le mot de passe actuel par email
- ☐ **d.** Envoyer par email un lien contenant un token unique et à durée limitée, qui permet de définir un nouveau mot de passe

**Question 14 — Vrai ou Faux - Emails de test**

Pour développer l'envoi d'emails (reset de mot de passe par exemple), on peut utiliser un serveur SMTP de test qui capture les emails sans les envoyer réellement.

☐ Vrai  ☐ Faux

**Question 15 — Bonnes pratiques**

Parmi ces pratiques concernant l'authentification, lesquelles sont de BONNES pratiques ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Protéger les routes sensibles avec le middleware auth
- ☐ **b.** Vérifier les droits d'accès uniquement en JavaScript côté client
- ☐ **c.** Stocker les mots de passe en clair pour pouvoir les renvoyer par email
- ☐ **d.** Hasher les mots de passe avant de les stocker


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (c) Pour qu'en cas de fuite de la base, les mots de passe ne soient pas lisibles — *Exact, le hash est non réversible : même l'administrateur ne peut pas retrouver le mot de passe.*

**2.** Faux — *Exact, c'est faux : le hashage est à sens unique, contrairement au chiffrement.*

**3.** (d) Le middleware auth — *Exact, il intercepte la requête et redirige vers la page de connexion si besoin.*

**4.** (a) On compare le hash du mot de passe saisi avec le hash stocké en base — *Exact, via Hash::check() par exemple.*

**5.** (d) api.php

**6.** (b) JSON — *Exact, un format texte léger compréhensible par tous les langages.*

**7.** GET → Récupérer des données ; POST → Créer une nouvelle ressource ; PUT → Modifier une ressource existante ; DELETE → Supprimer une ressource

**8.** 404 — *Exact, le fameux 404 Not Found.*

**9.** (d) Le test unitaire vérifie une fonction isolée, le test Feature simule une vraie requête HTTP sur l'application — *Exact, les deux sont complémentaires.*

**10.** (a) les tests

**11.** test (accepté aussi : php artisan test)

**12.** (c) Une deuxième preuve d'identité (par exemple un code temporaire), qui protège le compte même si le mot de passe est compromis — *Exact, le mot de passe seul ne suffit plus.*

**13.** (d) Envoyer par email un lien contenant un token unique et à durée limitée, qui permet de définir un nouveau mot de passe — *Exact, c'est le mécanisme mis en place dans le TP.*

**14.** Vrai — *Exact, c'est le principe utilisé dans le TP : les emails sont visibles dans une interface, mais jamais réellement envoyés.*

**15.** (a) Protéger les routes sensibles avec le middleware auth ; (d) Hasher les mots de passe avant de les stocker — *Exact, la vérification se fait côté serveur avant tout traitement. / Exact, indispensable.*
