# PHP — Lot 2 : Structuration, sessions, cookies, SQL/PDO, ouverture Laravel (TP3 → TP6 + TP SQL)

Nom : ______________________  Prénom : ______________________

**Question 1 — Point d'entrée unique**

Quel est l'intérêt principal d'un point d'entrée unique (index.php) dans un projet PHP structuré ?

- ☐ **a.** Rendre le site compatible avec tous les navigateurs
- ☐ **b.** Accélérer l'exécution du code PHP
- ☐ **c.** Centraliser le chargement des pages et éviter de dupliquer le header et le footer
- ☐ **d.** Empêcher les visiteurs de voir le code source

**Question 2 — Démarrer la session**

Quelle fonction PHP doit être appelée avant toute utilisation de $_SESSION ? (le nom de la fonction, avec ou sans parenthèses)

Réponse : ________________________________________

**Question 3 — Stockage de la session**

Où sont physiquement stockées les données de session ?

- ☐ **a.** Dans la base de données obligatoirement
- ☐ **b.** Dans le navigateur du visiteur
- ☐ **c.** Sur le serveur
- ☐ **d.** Dans le fichier index.php

**Question 4 — Vrai ou Faux - Cookies**

Un cookie est stocké sur l'ordinateur du visiteur et peut donc être lu et modifié par celui-ci.

☐ Vrai  ☐ Faux

**Question 5 — Créer un cookie**

Pour créer un cookie chez le visiteur, on utilise la fonction ______ en lui passant un nom, une valeur et une date d'expiration.

(a) addcookie / (b) setcookie / (c) createcookie

**Question 6 — Limite de taille**

Quelle est la taille maximale approximative d'un cookie, en kilo-octets (Ko) ?

Réponse : ________________________________________

**Question 7 — Protéger une page**

Pour protéger une page, on vérifie en début de script si l'utilisateur est connecté. S'il ne l'est pas, que fait-on ?

- ☐ **a.** On affiche un message JavaScript alert()
- ☐ **b.** On masque le contenu avec du CSS
- ☐ **c.** On supprime la page du serveur
- ☐ **d.** On le redirige avec header("Location: /login.php"); puis on stoppe le script

**Question 8 — Déconnexion**

Quelle fonction permet de détruire l'ensemble des données de la session (déconnexion) ? (le nom de la fonction, avec ou sans parenthèses)

Réponse : ________________________________________

**Question 9 — Où vivent les données ?**

Associez chaque mécanisme à l'endroit où la donnée est stockée ou transmise.

| | À relier à… |
|---|---|
| Session → ______ | • Sur l'ordinateur du visiteur |
| Cookie → ______ | • Dans l'URL de la page |
| $_GET → ______ | • Dans le corps de la requête d'un formulaire |
| $_POST → ______ | • Sur le serveur |

**Question 10 — Le SELECT**

Quelle requête SQL permet de récupérer l'ensemble des enregistrements de la table citations ?

- ☐ **a.** SHOW * IN citations;
- ☐ **b.** GET ALL FROM citations;
- ☐ **c.** SELECT citations;
- ☐ **d.** SELECT * FROM citations;

**Question 11 — L'INSERT**

Quelle requête SQL permet d'ajouter un enregistrement dans la table citations ?

- ☐ **a.** INSERT citations VALUES texte "Je ne dois pas…";
- ☐ **b.** UPDATE citations ADD texte = "Je ne dois pas…";
- ☐ **c.** INSERT INTO citations (texte) VALUES ("Je ne dois pas…");
- ☐ **d.** ADD INTO citations SET texte = "Je ne dois pas…";

**Question 12 — Requêtes préparées**

Pourquoi utilise-t-on des requêtes préparées avec PDO ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Pour séparer la requête SQL des valeurs fournies par l'utilisateur
- ☐ **b.** Pour éviter d'avoir à ouvrir une connexion à la base
- ☐ **c.** Pour se protéger des injections SQL
- ☐ **d.** Parce que MySQL refuse les requêtes non préparées

**Question 13 — PDO**

Avec PDO, quel est l'ordre correct pour exécuter une requête préparée ?

- ☐ **a.** prepare() puis execute()
- ☐ **b.** execute() puis prepare()
- ☐ **c.** query() puis prepare()
- ☐ **d.** connect() puis select()

**Question 14 — Clé étrangère**

Dans une base de données, à quoi sert une clé étrangère ?

- ☐ **a.** À créer un lien entre deux tables en référençant la clé primaire d'une autre table
- ☐ **b.** À accélérer les requêtes SELECT
- ☐ **c.** À empêcher l'accès à la table depuis l'extérieur
- ☐ **d.** À chiffrer les données sensibles d'une table

**Question 15 — Vers Laravel**

Dans un projet Laravel, les dépendances (librairies) sont installées et gérées avec l'outil ______ , le gestionnaire de dépendances de l'écosystème PHP.

(a) apt / (b) Maven / (c) npm / (d) Composer


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (c) Centraliser le chargement des pages et éviter de dupliquer le header et le footer — *Exact, toutes les requêtes passent par le même fichier qui inclut la bonne page.*

**2.** session_start() (accepté aussi : session_start)

**3.** (c) Sur le serveur — *Exact, le client ne conserve qu'un identifiant de session (dans un cookie).*

**4.** Vrai — *Exact, c'est pour cela qu'on ne stocke jamais de donnée sensible dans un cookie.*

**5.** (b) setcookie

**6.** 4:1 — *Exact, environ 4 Ko, c'est une des limites vues dans le TP 4.*

**7.** (d) On le redirige avec header("Location: /login.php"); puis on stoppe le script — *Exact, sans die() ou exit le reste de la page continuerait de s'exécuter.*

**8.** session_destroy() (accepté aussi : session_destroy)

**9.** Session → Sur le serveur ; Cookie → Sur l'ordinateur du visiteur ; $_GET → Dans l'URL de la page ; $_POST → Dans le corps de la requête d'un formulaire

**10.** (d) SELECT * FROM citations;

**11.** (c) INSERT INTO citations (texte) VALUES ("Je ne dois pas…");

**12.** (a) Pour séparer la requête SQL des valeurs fournies par l'utilisateur ; (c) Pour se protéger des injections SQL — *Exact, les valeurs ne peuvent pas modifier la structure de la requête. / Exact, c'est la raison principale.*

**13.** (a) prepare() puis execute() — *Exact : on prépare la requête avec des marqueurs, puis on l'exécute avec les valeurs.*

**14.** (a) À créer un lien entre deux tables en référençant la clé primaire d'une autre table — *Exact, c'est ce qui garantit la cohérence des relations.*

**15.** (d) Composer
