---
description: Troisième point étape évalué. Un mini projet de synthèse pour valider la modélisation, le SQL, PDO, les requêtes préparées et une authentification correctement sécurisée.
---

# Évaluation 3 : Le mini catalogue

::: details Sommaire
[[toc]]
:::

## Introduction

Dans les précédents TP, nous avons vu la modélisation et le langage SQL ([le complément SQL](./sql/support.md)), l'intégration d'une base de données dans un projet PHP ([TP 5 SQL](./sql/tp5.md)) et un projet administrable complet ([TP 6 SQL](./sql/tp6.md)).

Vous avez atteint le dernier point étape du PHP « à la main ». Ce mini projet est une **synthèse évaluée** de l'ensemble du parcours : structure, formulaires, session, authentification et base de données. Il n'y aura pas de procédure pas à pas, à vous de mobiliser vos connaissances.

Le sujet est calibré pour une séance de **2 heures**, README et rendu compris. Pour tenir ce temps : le script SQL du catalogue vous est **fourni** (voir plus bas), et vous pouvez (c'est conseillé) repartir de la structure de vos TP précédents ([TP 6 SQL](./sql/tp6.md)). Concentrez-vous sur le PHP. Gardez 20 minutes en fin de séance pour le README et le rendu.

::: tip TP évalué - Barème indicatif (Total 20 points + Bonus)

La réalisation de ce TP sera évaluée de la manière suivante :

- **Modélisation et base de données (3 points)**
  - MLD complet du projet (les 3 tables, clés primaires, clé étrangère) : **2 points**.
  - Script fourni importé + table `utilisateurs` créée et alimentée : **1 point**.
- **L'affichage (4 points)**
  - Connexion PDO sortie dans un fichier inclus (`utils/db.php`) : **1 point**.
  - Liste des produits depuis la base (nom, prix, catégorie affichée via une jointure) : **2 points**.
  - Fiche produit via `?id=` avec gestion de l'`id` inexistant : **1 point**.
- **La sécurité (4 points)**
  - Requêtes préparées **partout** où une valeur est variable : **2 points**.
  - Mot de passe stocké **haché** (`password_hash()`) et vérifié avec `password_verify()` : **2 points**.
- **L'espace admin (4 points)**
  - Connexion via un utilisateur stocké en base de données : **2 points**.
  - Ajout d'un produit via un formulaire (INSERT) réservé à l'admin : **1 point**.
  - Déconnexion et protection des pages admin : **1 point**.
- **Qualité (2 points)**
  - Structure vue en cours respectée, code indenté et organisé : **2 points**.
- **Le README.md (3 points)**
  - Présent à la racine et complet (comme défini dans [l'évaluation 1](./eval1.md#le-readme-md)) : **3 points**.
- **Bonus challenge (2 points)**
  - La recherche et la suppression (voir la fin du sujet).

:::

::: danger Attention à la sécurité
Une valeur qui vient de l'utilisateur (`$_GET`, `$_POST`) ne doit **jamais** être concaténée dans une requête SQL. Un seul oubli et c'est une injection SQL : ce point sera regardé de très près lors de la correction.
:::

Vous avez à votre disposition l'ensemble des documents nécessaires :

- [Le complément de cours PHP](./support.md)
- [Le complément de cours SQL](./sql/support.md)
- [TP 5 SQL : Bart PHP et MySQL](./sql/tp5.md)
- [TP 6 SQL : BTS TV administrable](./sql/tp6.md)

## Le projet

Vous allez réaliser un **mini catalogue de produits** consultable par tous, et administrable par un utilisateur connecté.

1. **La base de données :**
   - Créer la base et importer le script fourni ci-dessous (tables `categories` et `produits` avec un jeu de données).
   - Concevoir et créer **la table `utilisateurs`** nécessaire à l'administration (à vous de choisir les colonnes), puis y insérer votre compte admin.
   - Produire le MLD **de l'ensemble** du projet (les 3 tables, avec les clés).

::: details Le script SQL fourni

```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE produits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prix FLOAT NOT NULL,
  id_categorie INT NOT NULL,
  FOREIGN KEY (id_categorie) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO categories (nom) VALUES ('Claviers'), ('Souris'), ('Écrans');

INSERT INTO produits (nom, prix, id_categorie) VALUES
('Clavier mécanique', 89.90, 1),
('Clavier sans fil', 34.90, 1),
('Clavier compact 60%', 59.00, 1),
('Souris gamer', 49.90, 2),
('Souris ergonomique', 39.90, 2),
('Souris de voyage', 19.90, 2),
('Écran 24 pouces', 129.00, 3),
('Écran 27 pouces 144Hz', 249.00, 3),
('Écran portable 15 pouces', 99.00, 3),
('Écran ultrawide 34 pouces', 399.00, 3);
```

:::
::: details Coup de pouce : la table utilisateurs
Trois colonnes suffisent. Posez-vous la question : quel type et quelle taille pour stocker un hash de `password_hash()` ? (Indice : la [documentation](https://www.php.net/manual/en/function.password-hash.php) conseille `VARCHAR(255)`.)
:::

2. **La partie publique :**
   - La page d'accueil liste les produits (nom, prix, catégorie) depuis la base de données.
   - Un clic sur un produit affiche sa fiche via un paramètre `?id=`. Un `id` inexistant doit afficher « Produit introuvable » (pas d'erreur PHP).

::: details Coup de pouce : la liste et la fiche
La connexion PDO « librairie » (`utils/db.php`) est fournie dans [le support SQL](./sql/support.md#utils-db-php).

Pour la **liste** : afficher la catégorie à côté du produit, c'est une jointure. La forme générale est [dans le support SQL](./sql/support.md#obtenir-de-donnees-de-plusieurs-tables), et rappelez-vous : dans 90% des cas, c'est un `LEFT JOIN`. À vous d'écrire la requête avec **vos** tables.

Pour la **fiche** : la valeur `$_GET['id']` est variable, donc **requête préparée** obligatoire. L'exemple de référence (avec le `?`) est [dans le support SQL](./sql/support.md#requete-prepare-ou-requete-normal), à adapter.

Un indice qui vaut de l'or : `$stmt->fetch()` renvoie `false` quand la requête ne trouve rien… Pratique pour le « Produit introuvable » non ?
:::

3. **La partie admin :**
   - Une page de connexion vérifie le login et le mot de passe **en base de données** (mot de passe haché).
   - Une fois connecté : un formulaire permet d'ajouter un produit (nom, prix, catégorie choisie dans un `select` alimenté depuis la base).
   - L'ensemble des pages admin est protégé, avec une déconnexion fonctionnelle.

::: details Coup de pouce : le mot de passe haché
Pour créer votre compte admin : générez le hash avec un petit script PHP jetable, puis insérez-le via phpMyAdmin :

```php
// hash.php (à supprimer ensuite !)
echo password_hash("votre-mot-de-passe", PASSWORD_DEFAULT);
```

Côté connexion, la logique en deux temps :

```php
// 1. Récupérer l'utilisateur par son login (requête préparée)
// 2. Vérifier le mot de passe saisi contre le hash stocké
if ($user && password_verify($_POST['password'], $user['password'])) {
    // Connecté !
}
```

:::

4. **La structure :**
   - Le projet reprend l'organisation vue en cours : entry-point, whitelist, `common/`, `pages/`, `utils/db.php`.

::: details Coup de pouce : par où commencer ?
Ne codez pas dans le désordre. Un ordre qui fonctionne bien en 2 heures :

1. Base de données (import du script + table utilisateurs) : 15 min.
2. Structure + liste des produits : 30 min.
3. Fiche produit : 15 min.
4. Connexion admin + protection : 30 min.
5. Formulaire d'ajout : 20 min.
6. README + rendu : 20 min.
:::

## Le challenge

Vous avez terminé ? Voici le défi bonus :

- **Recherche** : un champ de recherche sur la page d'accueil filtre les produits par nom (`LIKE`, en requête préparée évidemment).
- **Suppression** : dans l'admin, un bouton permet de supprimer un produit. Attention à la clé étrangère : que se passe-t-il si la catégorie est supprimée ? Documentez votre choix (`CASCADE`, `SET NULL`…) dans le README.

## Restitution

Le rendu se fait en deux temps :

1. **Poussez votre projet sur un dépôt Git** sur le GitLab du lycée : [https://gitlab.dombtsig.local](https://gitlab.dombtsig.local). Le dépôt doit contenir :
   - **Le code complet** du projet.
   - **L'export SQL** de votre base (structure + données), par exemple dans un dossier `sql/`.
   - **Le MLD** : photo ou export (DBDiagram, draw.io), dans le dossier `docs/`.
   - **Le `README.md`** à la racine (contenu attendu : voir [l'évaluation 1](./eval1.md#le-readme-md)). Pour cette évaluation, ajoutez-y également :
     - Une capture de la liste des produits et d'une fiche produit.
     - Une capture de la table des utilisateurs dans phpMyAdmin montrant le mot de passe **haché**.
     - Le login et le mot de passe **en clair** du compte admin (pour la correction).
     - Une brève réflexion (2 ou 3 lignes) : pourquoi hacher les mots de passe alors que la base est déjà protégée par un login ?
     - Si vous avez fait le challenge : votre choix de comportement pour la clé étrangère et pourquoi.
2. **Déposez le lien du dépôt dans Moodle** (et vérifiez que j'y ai accès).

Un doute sur Git ? [Initiation à Git](/tp/git_initiation/), [Utiliser GitLab](/tp/gitlab/), [l'aide mémoire](/cheatsheets/git/).

Bravo, vous avez terminé le parcours PHP ! La suite logique : [la transition vers Laravel](./tp6.md).
