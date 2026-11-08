# Boutique BTS

Un petit panier de boutique en JavaScript, sans framework et sans dépendance :
le point de départ du TP « Utiliser un agent de code ».

## Lancer le projet

Il faut Node.js 22 ou plus récent (`node --version`).

```bash
npm test     # lance les tests (node --test, rien à installer)
npm start    # lance le site sur http://localhost:3000
```

## Organisation

| Fichier | Rôle |
|---|---|
| `src/catalogue.js` | Les produits, prix en centimes |
| `src/panier.js` | La logique du panier : ajouter, retirer, compter, sous-total, affichage d'un prix |
| `public/index.html`, `public/app.js`, `public/style.css` | La page : le catalogue et le panier |
| `server.js` | Un petit serveur web qui sert `public/` et `src/` |
| `test/panier.test.js` | Les tests de `src/panier.js` |

## Règles du projet

- Tous les montants sont des **entiers en centimes** : jamais de nombre à virgule.
- La logique (calculs) reste dans `src/`, la page (`public/app.js`) ne fait qu'afficher.
- Chaque fonction de `src/` a ses tests dans `test/`.
