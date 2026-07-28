---
description: "Troisième TP de la série sécurité : les failles de contrôle d'accès (IDOR, routes non protégées) et le rôle des journaux, à partir de logs et de code Laravel à corriger."
---

# TP 3 : Contrôle d'accès et journalisation

::: details Sommaire
[[toc]]
:::

Dans les deux premiers TP, l'attaque piégeait le **contenu** (SQL, HTML). Ici, le code fonctionne parfaitement et n'exécute rien d'anormal : le problème, c'est qu'il **ne vérifie pas qui a le droit** d'accéder à quoi. C'est la catégorie **A01** de l'OWASP, en tête du classement, celle qu'on oublie le plus facilement.

Ce TP monte d'un cran : le code est du Laravel (contrôleurs, routes, middleware), et vous allez aussi apprendre à **lire des logs** pour repérer une attaque. On garde la méthode : observer, comprendre, corriger.

## Les slides

<ClientOnly>
<SlidesDeck src="securite_controle_acces" />
</ClientOnly>

## Prérequis

- Avoir suivi les [TP 1](./tp1_injection_sql.md) et [TP 2](./tp2_xss.md).
- Des notions de Laravel : routes, contrôleurs, middleware (revues dans les [TP Laravel](/tp/laravel/introduction)).

::: details Un rappel sur les middlewares ?
Un middleware est un « filtre » exécuté **avant** le contrôleur. Il peut laisser passer la requête ou la bloquer (redirection, erreur 403). C'est l'endroit idéal pour vérifier qu'un utilisateur est connecté ou qu'il a le bon rôle, sans répéter le test dans chaque contrôleur.
:::

## Objectifs

À la fin de ce TP vous saurez :

- Reconnaître une faille de type IDOR (référence directe non sécurisée).
- Vérifier la **propriété** d'une ressource, pas seulement son existence.
- Protéger des routes sensibles avec un middleware / guard.
- Lire des journaux d'accès pour repérer une attaque.

## Le principe en une phrase

Une faille de contrôle d'accès survient quand l'application **fait confiance** à ce que le client demande (une URL, un identifiant, un champ caché) sans vérifier, **côté serveur**, qu'il en a le droit.

## Exercice 1 : lire les logs (observer)

Vous êtes en charge de la sécurité de l'application. Avant tout code, on analyse les journaux d'accès du serveur :

```
127.0.0.1   - frank [10/Oct/2024:13:55:36] "GET /apache_pb.gif HTTP/1.0" 200 2326
192.168.1.1 - -     [10/Oct/2024:13:55:36] "GET /index.html HTTP/1.0"   200 2761
192.168.1.4 - -     [10/Oct/2024:13:55:36] "GET /facture?id=8986 HTTP/1.0" 200 512
192.168.1.4 - -     [10/Oct/2024:13:55:36] "GET /facture?id=8987 HTTP/1.0" 404 512
192.168.1.4 - -     [10/Oct/2024:13:55:36] "GET /facture?id=8988 HTTP/1.0" 404 512
192.168.1.4 - -     [10/Oct/2024:13:55:36] "GET /facture?id=8989 HTTP/1.0" 404 512
192.168.1.4 - -     [10/Oct/2024:13:55:36] "GET /facture?id=8990 HTTP/1.0" 404 512
192.168.1.3 - -     [10/Oct/2024:13:55:36] "GET /secret.html HTTP/1.0"  403 289
```

::: details Question : ces logs vous semblent-ils suspects ? Pourquoi ?
Oui. La même adresse `192.168.1.4` demande des factures par **numéros consécutifs** (`8986`, `8987`, `8988`…). Ce n'est pas un comportement humain normal : c'est une **énumération**, l'utilisateur teste tous les identifiants les uns après les autres pour voir lesquels existent. Le premier (`8986`) renvoie `200` (succès), les suivants `404`. Il cherche des factures qui ne sont pas les siennes.
:::

::: details Question : à quoi servent les logs ici ? Le traitement doit-il être manuel ou automatisé ?
Les logs donnent la **traçabilité** : qui a fait quoi, quand. Ils permettent de détecter une attaque même quand le code « fonctionne ». Sur cet exemple, une lecture manuelle suffit, mais en production le volume est énorme : le repérage doit être **automatisé** (détection d'un même IP qui enchaîne des identifiants, un pic de 404, etc.), avec une alerte. C'est le rôle de l'observabilité (catégorie A09 de l'OWASP : carence de journalisation et d'alerte).
:::

## Exercice 2 : la faille IDOR (corriger)

Les logs pointent vers la route `/facture`. Voici le contrôleur Laravel correspondant :

```php
<?php
class FactureController extends Controller
{
    public function index(Request $request)
    {
        $id = $request->input('id');
        $facture = Facture::find($id);
        if ($facture) {
            return view('facture', ['facture' => $facture]);
        }
        return abort(404);
    }

    private function checkIfUserCanAccessFacture($facture)
    {
        return $facture->user_id === Auth::id()
    }
}
```

::: details Question : où est la faille ?
Le contrôleur vérifie seulement que la facture **existe** (`if ($facture)`), pas qu'elle **appartient** à l'utilisateur connecté. N'importe quel utilisateur connecté peut donc lire la facture de n'importe qui en changeant le numéro dans l'URL. C'est une faille **IDOR** (Insecure Direct Object Reference). La méthode `checkIfUserCanAccessFacture` existe déjà… mais elle n'est **jamais appelée**.
:::

::: details Question : ce code compile-t-il seulement ?
Non. La ligne `return $facture->user_id === Auth::id()` manque son point-virgule final. Encore un rappel d'examen : lisez le code jusqu'au bout, un défaut de sécurité voisine souvent avec un bug de syntaxe.
:::

Corrigez le contrôleur pour qu'il refuse l'accès à une facture qui n'appartient pas à l'utilisateur connecté, en **utilisant la méthode déjà présente**.

::: tip Point de contrôle
Après correction, demander une facture qui existe mais qui appartient à un autre utilisateur doit renvoyer une erreur **403** (interdit), pas la facture. L'énumération vue dans les logs ne rapporte alors plus rien.
:::

::: details Voir l'une des solutions possibles
```php
<?php
class FactureController extends Controller
{
    public function index(Request $request)
    {
        $id = $request->input('id');
        $facture = Facture::find($id);

        if (! $facture) {
            return abort(404);
        }

        if (! $this->checkIfUserCanAccessFacture($facture)) {
            return abort(403);
        }

        return view('facture', ['facture' => $facture]);
    }

    private function checkIfUserCanAccessFacture($facture)
    {
        return $facture->user_id === Auth::id();
    }
}
```

On distingue bien les deux cas : **404** si la facture n'existe pas, **403** si elle existe mais n'appartient pas à l'utilisateur. Le point-virgule manquant est réparé au passage.
:::

## Exercice 3 : les routes d'administration (corriger)

Autre visage de la même faille, cette fois au niveau des routes. Observez le routeur :

```php
<?php
Route::get('/', 'HomeController@index');
Route::get('/search', 'HomeController@index');
Route::get('/facture', 'FactureController@index');
Route::get('/admin', 'AdminController@index');
Route::get('/admin/users', 'UserController@index');
```

::: details Question : quel est le problème ?
Les routes `/admin` et `/admin/users` ne sont protégées par **aucun** contrôle. N'importe quel visiteur (connecté ou non, admin ou non) y accède en tapant l'URL. C'est un **manque de contrôle d'accès au niveau fonctionnel** : des pages d'administration ouvertes à tous.
:::

Corrigez le routeur pour que les pages d'administration ne soient accessibles qu'aux utilisateurs ayant le rôle `admin`, à l'aide d'un middleware.

::: details Voir l'une des solutions possibles
```php
<?php
Route::get('/', 'HomeController@index');
Route::get('/search', 'HomeController@index');
Route::get('/facture', 'FactureController@index');

Route::middleware(['admin'])->group(function () {
    Route::get('/admin', 'AdminController@index');
    Route::get('/admin/users', 'UserController@index');
});
```

Le middleware `admin` s'exécute **avant** chaque route du groupe. S'il constate que l'utilisateur n'a pas le rôle attendu, il bloque la requête (redirection ou 403). Le test est écrit **une seule fois** pour tout le groupe.
:::

## Exercice 4 : ajouter une route protégée (aller un peu plus loin)

On vous demande d'ajouter une page `/admin/factures` qui affichera les factures de **tous** les utilisateurs (une vue réservée aux administrateurs). Elle doit appeler la méthode `FactureController@all` et n'être accessible qu'aux administrateurs.

À vous de jouer, en réutilisant ce que vous venez de mettre en place.

::: details Voir l'une des solutions possibles
```php
<?php
Route::middleware(['admin'])->group(function () {
    Route::get('/admin', 'AdminController@index');
    Route::get('/admin/users', 'UserController@index');
    Route::get('/admin/factures', 'FactureController@all');
});
```

La route rejoint le groupe protégé par le middleware `admin` : rien de plus à écrire pour la sécuriser. Notez la différence de logique côté contrôleur : `index()` vérifie la **propriété** de la facture (exercice 2), tandis que `all()` est réservé aux admins par le **middleware** et peut donc tout afficher.
:::

## À retenir

- Une ressource qui **existe** n'est pas forcément une ressource que l'utilisateur a le **droit** de voir : vérifiez la **propriété** (IDOR).
- Un identifiant dans l'URL se **devine** : ne jamais s'y fier sans contrôle côté serveur.
- Les pages sensibles se protègent par un **middleware / guard**, écrit une seule fois.
- Les **logs** révèlent les énumérations et accès anormaux ; en production, leur analyse doit être **automatisée**.

## Conclusion

Vous savez maintenant repérer et corriger les failles de contrôle d'accès, les plus fréquentes du classement OWASP. Dans ce TP vous avez appris à :

- Lire des journaux pour détecter une énumération d'identifiants.
- Corriger une faille IDOR en vérifiant la propriété d'une ressource.
- Protéger des routes d'administration avec un middleware.

Reste la dernière grande brique, la plus dense : l'[authentification, les mots de passe et les sessions (TP 4)](./tp4_authentification.md).
