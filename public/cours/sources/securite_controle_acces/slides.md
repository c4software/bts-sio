# Le contrôle d'accès

## « De quel droit ? »

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Une URL bien pratique

```
/facture?id=8986
```

Elle affiche **votre** facture. Parfait.

Que se passe-t-il si je remplace `8986` par `8987` ?

---

## La référence directe non sécurisée

Si l'appli affiche la facture **sans vérifier à qui elle appartient**…

je lis les factures des autres, une par une.

C'est une faille **IDOR** (A01 du top OWASP).

---

## Le piège classique

```php
$facture = Facture::find($id);
return view('facture', ['facture' => $facture]);
```

La facture **existe** : on l'affiche. Mais est-elle **à moi** ?

---

## La bonne question

Exister ≠ m'appartenir.

```php
if ($facture->user_id !== Auth::id()) {
    abort(403);
}
```

On vérifie la **propriété**, pas seulement l'existence.

---

## Ça se voit dans les logs

```
GET /facture?id=8987 404
GET /facture?id=8988 404
GET /facture?id=8989 404
```

À votre avis, que fait cet utilisateur ?

---

## Une énumération

Il **teste tous les identifiants** à la suite.

Les logs sont votre système d'alerte : encore faut-il les lire.

---

## L'autre oubli : les pages d'admin

```php
Route::get('/admin', 'AdminController@index');
```

Rien ne protège cette route. Un simple utilisateur y accède.

---

## Le garde : middleware

```php
Route::middleware(['admin'])->group(function () {
    Route::get('/admin', 'AdminController@index');
});
```

Un filtre exécuté **avant** le contrôleur, écrit une seule fois.

---

## La règle d'or

Ne **jamais** faire confiance à ce qui vient du client :

- ni à l'URL,
- ni à un champ caché,
- ni à un identifiant deviné.

Le contrôle se fait **côté serveur**, à chaque accès.

---

## Récapitulatif

- IDOR : vérifier la **propriété** d'une ressource, pas son existence.
- Protéger les pages sensibles par un **middleware / guard**.
- Les **logs** révèlent les énumérations et tentatives d'accès.
- Le client ment : tout se contrôle **côté serveur**.

---

## Des questions ?

Place au TP 🚀
