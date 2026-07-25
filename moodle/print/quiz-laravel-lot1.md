# Laravel Lot 1 : Les fondamentaux (routes, Blade, migrations, Eloquent)

Nom : ______________________  Prénom : ______________________

**Question 1 — Architecture**

Sur quelle architecture repose le framework Laravel ?

- ☐ **a.** MERN
- ☐ **b.** Client - Serveur uniquement
- ☐ **c.** Micro-services obligatoirement
- ☐ **d.** MVC (Modèle - Vue - Contrôleur)

**Question 2 — La ligne de commande**

Comment s'appelle l'outil en ligne de commande fourni par Laravel (utilisé par exemple pour lancer le serveur ou créer un contrôleur) ?

Réponse : ________________________________________

**Question 3 — Les routes**

Dans quel fichier définit-on les routes web d'un projet Laravel ?

- ☐ **a.** routes/web.php
- ☐ **b.** config/routes.php
- ☐ **c.** app/routes.php
- ☐ **d.** public/index.php

**Question 4 — Lancer le projet**

Pour lancer le serveur de développement, on utilise la commande php artisan ______ depuis la racine du projet.

(a) launch / (b) run / (c) start / (d) serve

**Question 5 — Les vues**

Quelle extension portent les fichiers de vue utilisant le moteur de template de Laravel ?

- ☐ **a.** .html.php
- ☐ **b.** .view.php
- ☐ **c.** .blade.php
- ☐ **d.** .tpl

**Question 6 — Blade**

Dans une vue Blade, comment affiche-t-on le contenu de la variable $nom (avec échappement automatique) ?

- ☐ **a.** {{ $nom }}
- ☐ **b.** &lt;?php echo $nom; ?&gt;
- ☐ **c.** [[ $nom ]]
- ☐ **d.** @print($nom)

**Question 7 — Les rôles dans MVC**

Associez chaque élément de Laravel à son rôle.

| | À relier à… |
|---|---|
| Le routeur → ______ | • Contenir la logique de traitement de la requête |
| Le contrôleur → ______ | • Représenter et manipuler les données en base |
| Le modèle (Eloquent) → ______ | • Faire correspondre une URL à une action |
| La vue (Blade) → ______ | • Générer le HTML affiché à l'utilisateur |

**Question 8 — Les migrations**

Une migration est un fichier PHP qui décrit la structure d'une table et qui est versionné avec le reste du code du projet.

☐ Vrai  ☐ Faux

**Question 9 — Exécuter les migrations**

Quelle commande artisan permet de créer réellement les tables en base à partir des migrations ? (avec ou sans le préfixe php artisan)

Réponse : ________________________________________

**Question 10 — Eloquent**

Qu'est-ce qu'Eloquent dans Laravel ?

- ☐ **a.** Le serveur web intégré de Laravel
- ☐ **b.** Le moteur de template de Laravel
- ☐ **c.** Un ORM : il fait le lien entre les objets PHP et les tables de la base de données
- ☐ **d.** Un éditeur de code recommandé pour Laravel

**Question 11 — Requêter avec Eloquent**

Que retourne l'instruction Todo::all() ?

- ☐ **a.** L'ensemble des enregistrements de la table todos
- ☐ **b.** Une erreur, la méthode n'existe pas
- ☐ **c.** La structure de la table todos
- ☐ **d.** Le premier enregistrement de la table todos

**Question 12 — La configuration**

Les informations de configuration du projet (connexion à la base de données, nom de l'application…) sont définies dans le fichier ______ à la racine du projet.

(a) database.yml / (b) config.php / (c) .env / (d) settings.json

**Question 13 — Les conventions**

Par convention, le modèle Todo correspond à quelle table dans la base de données ?

- ☐ **a.** todo_model
- ☐ **b.** Todo
- ☐ **c.** table_todo
- ☐ **d.** todos

**Question 14 — Le serveur de développement**

Sur quel port le serveur lancé par php artisan serve écoute-t-il par défaut ?

Réponse : ________________________________________

**Question 15 — Les layouts**

À quoi sert un layout Blade dans un projet Laravel ?

- ☐ **a.** À factoriser la structure HTML commune (menu, header, footer) pour ne pas la dupliquer dans chaque vue
- ☐ **b.** À gérer les droits d'accès des utilisateurs
- ☐ **c.** À configurer la connexion à la base de données
- ☐ **d.** À définir les routes de l'application


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (d) MVC (Modèle - Vue - Contrôleur) — *Exact, chaque couche a une responsabilité bien définie.*

**2.** artisan (accepté aussi : php artisan)

**3.** (a) routes/web.php

**4.** (d) serve

**5.** (c) .blade.php — *Exact, Blade est le moteur de template de Laravel.*

**6.** (a) {{ $nom }} — *Exact, les doubles accolades échappent automatiquement le contenu (protection XSS).*

**7.** Le routeur → Faire correspondre une URL à une action ; Le contrôleur → Contenir la logique de traitement de la requête ; Le modèle (Eloquent) → Représenter et manipuler les données en base ; La vue (Blade) → Générer le HTML affiché à l'utilisateur

**8.** Vrai — *Exact, c'est ce qui permet à toute l'équipe de reconstruire la même base de données.*

**9.** migrate (accepté aussi : php artisan migrate)

**10.** (c) Un ORM : il fait le lien entre les objets PHP et les tables de la base de données — *Exact, il évite d'écrire les requêtes SQL à la main.*

**11.** (a) L'ensemble des enregistrements de la table todos — *Exact, sous forme de collection d'objets Todo.*

**12.** (c) .env

**13.** (d) todos — *Exact, Laravel utilise le nom du modèle au pluriel et en minuscules.*

**14.** 8000 — *Exact, le projet est accessible sur http://localhost:8000.*

**15.** (a) À factoriser la structure HTML commune (menu, header, footer) pour ne pas la dupliquer dans chaque vue — *Exact, chaque page vient ensuite « remplir » le layout avec son contenu.*
