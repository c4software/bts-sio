# Structurer mon code

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Le problème

Un fichier PHP par page, le header copié partout, la session démarrée… parfois.

Question : où corrigez-vous un bug présent sur **toutes** les pages ?

---

## L'entry-point

**Un seul** fichier reçoit toutes les demandes : `index.php`.

`index.php?page=bart`, `index.php?page=home`…

Il gère une fois pour toutes : la session, le header, le footer, et **la page demandée**.

---

## La whitelist

```php
$whitelist = array('home', 'bart');
```

Question : pourquoi ne pas faire directement `include($_GET['page'])` ?

Indice : que se passe-t-il si un visiteur demande `?page=../../config` ?

---

## Récapitulatif

- Un entry-point unique = un seul endroit pour le code commun.
- La page demandée passe par `?page=`.
- La whitelist contrôle ce qui peut être inclus : c'est de la **sécurité**.
- Dossiers : `common/`, `pages/`, `public/`.

---

## Des questions ?

Place au TP 🚀
