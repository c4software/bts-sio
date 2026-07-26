# PHP Format examen : Analyse de code et sécurité OWASP

Nom : ______________________  Prénom : ______________________

**Question 1 — Analyser une requête**

Analysez ce code :
$req = "SELECT * FROM users WHERE id=" . $_GET['id'];
Quel est le problème ?

- ☐ **a.** Il est vulnérable à l'injection SQL : le paramètre est concaténé sans contrôle dans la requête
- ☐ **b.** $_GET ne peut pas être utilisé avec une requête SQL
- ☐ **c.** Aucun, ce code est correct
- ☐ **d.** Il manque un point-virgule dans la requête SQL

**Question 2 — Corriger l'injection**

Quelle version corrigée de la question précédente est sécurisée ?

- ☐ **a.** $req = $pdo-&gt;prepare("SELECT * FROM users WHERE id=:id"); $req-&gt;execute(['id' =&gt; $_GET['id']]);
- ☐ **b.** $req = "SELECT * FROM users WHERE id=" . trim($_GET['id']);
- ☐ **c.** $req = strtolower("SELECT * FROM users WHERE id=" . $_GET['id']);
- ☐ **d.** $req = "SELECT * FROM users WHERE id='" . $_GET['id'] . "'";

**Question 3 — Le piège de l'interpolation**

Voici un code :
$id = $_GET['id'];
$req = "SELECT * FROM client WHERE id='{$id}'";
Ce code est-il plus sûr que la concaténation ?

- ☐ **a.** Oui, car la variable est passée par une étape intermédiaire
- ☐ **b.** Ce code ne fonctionne pas en PHP
- ☐ **c.** Oui, les accolades neutralisent le contenu de la variable
- ☐ **d.** Non, c'est exactement la même faille : l'interpolation de variable équivaut à une concaténation

**Question 4 — Comprendre l'attaque**

Un formulaire de connexion exécute :
"SELECT * FROM users WHERE login='" . $_POST['login'] . "'".
Que se passe-t-il si l'utilisateur saisit : ' OR '1'='1 ?

- ☐ **a.** Une erreur de syntaxe SQL empêche forcément l'attaque
- ☐ **b.** Le mot de passe est affiché à l'écran
- ☐ **c.** La condition devient toujours vraie : la requête retourne des enregistrements et peut permettre de contourner l'authentification
- ☐ **d.** Le serveur détecte l'attaque et bloque la requête

**Question 5 — Vrai ou Faux - ORM**

Utiliser un ORM (comme Eloquent dans Laravel) protège des injections SQL dans les cas d'usage standards.

☐ Vrai  ☐ Faux

**Question 6 — Prédire le comportement**

Un visiteur saisit &lt;script&gt;alert('XSS')&lt;/script&gt; dans le champ nom, et la page exécute :
echo "Bonjour " . $_POST['nom'];
Que se passe-t-il à l'affichage ?

- ☐ **a.** PHP détecte le script et lève une erreur
- ☐ **b.** Une boîte de dialogue « XSS » s'ouvre : le script saisi est exécuté par le navigateur
- ☐ **c.** La page affiche seulement « Bonjour »
- ☐ **d.** Le texte &lt;script&gt;alert('XSS')&lt;/script&gt; s'affiche tel quel à l'écran

**Question 7 — Corriger le XSS**

Pour afficher une donnée utilisateur sans risque, on l'échappe avec la fonction ______ , recommandée avec les options ENT_QUOTES et UTF-8.

(a) escape_output / (b) strip_secure / (c) htmlspecialchars / (d) html_clean

**Question 8 — XSS persistant**

Un site enregistre les commentaires en base de données, puis les affiche sans échappement sur la page de l'article. Un commentaire contenant un script malveillant s'exécute chez chaque visiteur. De quel type de XSS s'agit-il ?

- ☐ **a.** CSRF
- ☐ **b.** Injection SQL
- ☐ **c.** XSS persistant (stocké)
- ☐ **d.** XSS reflété

**Question 9 — Corriger un formulaire**

Un champ de recherche réaffiche la saisie : value="&lt;?php echo $_GET['q']; ?&gt;". Quelle correction faut-il apporter ?

- ☐ **a.** value="&lt;?php echo strtoupper($_GET['q']); ?&gt;"
- ☐ **b.** value="&lt;?php echo trim($_GET['q']); ?&gt;"
- ☐ **c.** Aucune correction nécessaire, la valeur est dans un attribut
- ☐ **d.** value="&lt;?php echo htmlspecialchars($_GET['q'], ENT_QUOTES, 'UTF-8'); ?&gt;"

**Question 10 — Bien choisir sa défense**

Vrai ou Faux : utiliser des requêtes préparées suffit à protéger un site contre les failles XSS.

☐ Vrai  ☐ Faux

**Question 11 — Analyser une classe**

Voici un code :
class Compte {
    public $solde;
}
Pourquoi cette classe est-elle une mauvaise pratique ?

- ☐ **a.** Il manque une méthode toString()
- ☐ **b.** Le nom de la classe devrait être en minuscules
- ☐ **c.** $solde est modifiable directement depuis l'extérieur, sans aucun contrôle possible
- ☐ **d.** Une classe ne peut pas contenir d'attribut public

**Question 12 — Corriger la classe**

Quelle version de la classe Compte protège correctement le solde ?

- ☐ **a.** public $solde; mais en le vérifiant dans le HTML du site
- ☐ **b.** private $solde; avec une méthode retirer($montant) qui vérifie le solde avant de le modifier
- ☐ **c.** protected $solde; sans aucune méthode
- ☐ **d.** public $solde; avec un commentaire "// ne pas mettre de valeur négative"

**Question 13 — La visibilité protected**

Dans une classe mère, un attribut protected est accessible…

- ☐ **a.** Depuis la classe elle-même et depuis ses classes filles, mais pas depuis l'extérieur
- ☐ **b.** Uniquement depuis les classes filles, pas depuis la classe mère
- ☐ **c.** Depuis n'importe où
- ☐ **d.** Uniquement en lecture

**Question 14 — Vrai ou Faux - Tout public**

Mettre tous les attributs d'une classe en public est acceptable puisque cela simplifie l'écriture du code.

☐ Vrai  ☐ Faux

**Question 15 — Analyser une inscription**

$req-&gt;execute(['pass' =&gt; $_POST['password']]); enregistre le mot de passe tel quel en base. Quel est le problème ?

- ☐ **a.** La requête n'est pas préparée
- ☐ **b.** $_POST ne doit jamais être utilisé pour un mot de passe
- ☐ **c.** Le mot de passe est stocké en clair : en cas de fuite de la base, tous les comptes sont compromis
- ☐ **d.** Aucun, la base de données est un endroit sûr

**Question 16 — La bonne fonction**

Quelle fonction PHP moderne permet de hacher un mot de passe avant de le stocker (elle gère le sel automatiquement) ?

Réponse : ________________________________________

**Question 17 — Et md5 ?**

Un développeur propose : $hash = md5($_POST['password']);. Pourquoi est-ce insuffisant ?

- ☐ **a.** md5 ne fonctionne qu'avec des nombres
- ☐ **b.** md5 ne fonctionne plus depuis PHP 8
- ☐ **c.** Le hash MD5 est trop long à calculer
- ☐ **d.** MD5 est un algorithme rapide et cassable : les hashs se retrouvent facilement (rainbow tables), il faut utiliser password_hash (bcrypt)

**Question 18 — Prédire le comportement**

Le mot de passe « azerty » est stocké hashé. À la connexion, un développeur écrit :
if (password_hash($_POST['password'], PASSWORD_DEFAULT) == $user['password']).
L'utilisateur saisit le bon mot de passe « azerty ». Que se passe-t-il ?

- ☐ **a.** La condition est vraie et la connexion réussit
- ☐ **b.** La condition est fausse et la connexion échoue : password_hash génère un sel aléatoire, deux appels produisent deux hashs différents
- ☐ **c.** La condition est vraie une fois sur deux
- ☐ **d.** PHP lève une erreur car on ne peut pas comparer deux hashs

**Question 19 — Compléter une protection**

Voici le début de la page admin.php :
session_start(); …
Quel code doit suivre pour la protéger correctement ?

- ☐ **a.** if (!isset($_COOKIE['user'])) { header('Location: /login.php'); die(); }
- ☐ **b.** if (!isset($_SESSION['user'])) { header('Location: /login.php'); die(); }
- ☐ **c.** echo "&lt;script&gt;if (!connecte) window.location = '/login.php'&lt;/script&gt;";
- ☐ **d.** if (!isset($_SESSION['user'])) { echo "Accès refusé"; }

**Question 20 — Prédire le comportement**

Une page protégée contient :
if (!isset($_SESSION['user'])) {
    header('Location: /login.php');
}
suivi du contenu confidentiel, sans die(). Un attaquant non connecté requête la page avec curl (qui ne suit pas les redirections).
Que reçoit-il ?

- ☐ **a.** Une page vide
- ☐ **b.** Uniquement la page login.php
- ☐ **c.** Une erreur 403 Forbidden
- ☐ **d.** L'en-tête de redirection ET tout le contenu confidentiel de la page

**Question 21 — Prédire le comportement**

Une page contient :
if ($_GET['role'] == 'admin') {
    afficherPanneauAdmin();
}
Un simple visiteur, non connecté, ouvre l'URL page.php?role=admin.
Que se passe-t-il ?

- ☐ **a.** Rien, PHP sait que le visiteur n'est pas administrateur
- ☐ **b.** Une erreur car le paramètre role est réservé
- ☐ **c.** Le panneau d'administration s'affiche : la condition est vraie puisque le visiteur contrôle le paramètre
- ☐ **d.** Le visiteur est redirigé vers la page de connexion

**Question 22 — Référence directe**

facture.php?id=123 charge la facture 123 avec une requête préparée, sans autre contrôle. Un client change l'id et lit les factures des autres. Comment corriger ?

- ☐ **a.** Chiffrer la connexion avec HTTPS
- ☐ **b.** Passer l'id en POST plutôt qu'en GET
- ☐ **c.** Vérifier côté serveur que la facture demandée appartient bien à l'utilisateur connecté (WHERE id=:id AND user_id=:user_id)
- ☐ **d.** Utiliser des ids plus longs pour qu'ils soient durs à deviner

**Question 23 — Prédire le comportement**

Sur monsite.fr, supprimer.php supprime le compte de l'utilisateur connecté, sans confirmation ni jeton. Alice, connectée à monsite.fr dans un autre onglet, visite un forum contenant : ![Diagramme](https://monsite.fr/supprimer.php). Que se passe-t-il ?

- ☐ **a.** Le compte d'Alice est supprimé : son navigateur charge l'« image » en envoyant automatiquement son cookie de session
- ☐ **b.** Rien, une image ne peut pas déclencher une action
- ☐ **c.** Le forum affiche une image cassée mais monsite.fr bloque la requête
- ☐ **d.** Alice reçoit un email de confirmation

**Question 24 — Corriger le CSRF**

Quelle correction protège le formulaire de suppression contre le CSRF ?

- ☐ **a.** Passer le formulaire en méthode GET
- ☐ **b.** Ajouter une confirmation JavaScript confirm()
- ☐ **c.** Ajouter un champ caché contenant un jeton unique stocké en session, et vérifier ce jeton côté serveur avant de traiter la requête
- ☐ **d.** Renommer le fichier supprimer.php avec un nom compliqué

**Question 25 — Inclusion dangereuse**

Analysez ce code : include($_GET['page'] . '.php'); Quel est le risque ?

- ☐ **a.** include ne fonctionne pas avec une variable
- ☐ **b.** L'utilisateur choisit le fichier inclus : il peut charger des fichiers non prévus, voire du code malveillant
- ☐ **c.** Le fichier inclus sera trop volumineux
- ☐ **d.** Aucun risque, l'extension .php est imposée

**Question 26 — Secret dans le code**

$apiKey = "sk-live-8f3a…"; est écrit en dur dans un fichier commité sur Git. Quelle est la bonne pratique ?

- ☐ **a.** Mettre la clé dans un commentaire pour la retrouver facilement
- ☐ **b.** Déplacer la clé dans un fichier .env exclu du versioning (ou une variable d'environnement) et la lire avec getenv()
- ☐ **c.** La laisser, le dépôt est privé
- ☐ **d.** Encoder la clé en Base64 dans le code

**Question 27 — Debug en production**

Un site en production affiche : "Fatal error : Uncaught PDOException … users.password …" avec le chemin des fichiers. En quoi est-ce une faille ?

- ☐ **a.** L'erreur ralentit le serveur
- ☐ **b.** Les messages d'erreur détaillés divulguent la structure de la base et du code, précieux pour préparer une attaque
- ☐ **c.** PDO ne devrait jamais lever d'exception
- ☐ **d.** Ce n'est pas une faille, c'est pratique pour corriger les bugs

**Question 28 — Redirection ouverte**

login.php?goto=$_GET['goto'] redirige où le paramètre l'indique : header('Location: ' . $_GET['goto']);. Quel est le risque et la correction ?

- ☐ **a.** header() ne peut pas recevoir de variable
- ☐ **b.** Le paramètre goto est trop court, il faut le rallonger
- ☐ **c.** Redirection non validée utilisable pour du phishing : il faut filtrer les destinations autorisées (liste blanche ou vérification du domaine)
- ☐ **d.** Aucun risque, une redirection ne fait que changer de page

**Question 29 — Chaque faille sa parade**

Associez chaque faille à sa correction principale.

| | À relier à… |
|---|---|
| Injection SQL → ______ | • Encoder la donnée en base64 |
| XSS → ______ | • Jeton unique en session vérifié côté serveur |
| CSRF → ______ | • Requête préparée (prepare / execute) |
| Mot de passe en clair → ______ | • Masquer le champ avec du CSS |
|  | • Échapper l'affichage avec htmlspecialchars |
|  | • password_hash au stockage, password_verify à la connexion |

**Question 30 — Relecture de code**

Vous relisez le code d'un camarade avant la mise en production. Quels éléments doivent être corrigés ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Une requête préparée avec des marqueurs nommés
- ☐ **b.** Un mot de passe comparé avec == à une colonne stockée en clair
- ☐ **c.** Une variable d'attribut de classe déclarée private avec un getter
- ☐ **d.** Une requête SQL construite en concaténant $_POST['email']
- ☐ **e.** Un echo direct d'une donnée saisie par l'utilisateur


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (a) Il est vulnérable à l'injection SQL : le paramètre est concaténé sans contrôle dans la requête — *Exact : un attaquant peut injecter du SQL via le paramètre id de l'URL.*

**2.** (a) $req = $pdo-&gt;prepare("SELECT * FROM users WHERE id=:id"); $req-&gt;execute(['id' =&gt; $_GET['id']]); — *Exact : requête préparée, la valeur est transmise séparément de la requête.*

**3.** (d) Non, c'est exactement la même faille : l'interpolation de variable équivaut à une concaténation — *Exact, c'est le piège signalé dans le cours : seule la requête préparée protège.*

**4.** (c) La condition devient toujours vraie : la requête retourne des enregistrements et peut permettre de contourner l'authentification — *Exact : '1'='1' est toujours vrai, c'est l'injection classique du cours.*

**5.** Vrai — *Exact : l'ORM génère des requêtes préparées. C'est l'une des deux corrections proposées par le cours avec les requêtes préparées manuelles.*

**6.** (b) Une boîte de dialogue « XSS » s'ouvre : le script saisi est exécuté par le navigateur — *Exact : le HTML saisi est renvoyé tel quel, le navigateur l'interprète. C'est une faille XSS.*

**7.** (c) htmlspecialchars

**8.** (c) XSS persistant (stocké) — *Exact : le code malveillant est stocké en base et exécuté à chaque affichage de la page, contrairement au XSS reflété qui passe par un lien.*

**9.** (d) value="&lt;?php echo htmlspecialchars($_GET['q'], ENT_QUOTES, 'UTF-8'); ?&gt;" — *Exact : ENT_QUOTES échappe aussi les guillemets, indispensable dans un attribut HTML.*

**10.** Faux — *Exact, c'est faux : la requête préparée protège la base (injection SQL). Contre le XSS il faut échapper les données à l'affichage.*

**11.** (c) $solde est modifiable directement depuis l'extérieur, sans aucun contrôle possible — *Exact : n'importe quel code peut écrire $compte-&gt;solde = -5000;. L'encapsulation impose private + accesseurs.*

**12.** (b) private $solde; avec une méthode retirer($montant) qui vérifie le solde avant de le modifier — *Exact : l'encapsulation permet de garantir les règles métier (pas de solde négatif).*

**13.** (a) Depuis la classe elle-même et depuis ses classes filles, mais pas depuis l'extérieur — *Exact : c'est l'intermédiaire entre private et public.*

**14.** Faux — *Exact, c'est faux : on perd l'encapsulation, donc tout contrôle sur les valeurs. La visibilité est une notion fondamentale pour un développement sécurisé.*

**15.** (c) Le mot de passe est stocké en clair : en cas de fuite de la base, tous les comptes sont compromis — *Exact : un mot de passe doit toujours être haché avant stockage.*

**16.** password_hash (accepté aussi : password_hash())

**17.** (d) MD5 est un algorithme rapide et cassable : les hashs se retrouvent facilement (rainbow tables), il faut utiliser password_hash (bcrypt) — *Exact : le cours cite le MD5 au même rang que le stockage en clair dans les données sensibles exposées.*

**18.** (b) La condition est fausse et la connexion échoue : password_hash génère un sel aléatoire, deux appels produisent deux hashs différents — *Exact : c'est pour cela qu'il faut utiliser password_verify($saisi, $hash), qui retrouve le sel dans le hash stocké.*

**19.** (b) if (!isset($_SESSION['user'])) { header('Location: /login.php'); die(); } — *Exact : vérification côté serveur, redirection ET arrêt du script (exit est équivalent à die()).*

**20.** (d) L'en-tête de redirection ET tout le contenu confidentiel de la page — *Exact : header() ajoute un en-tête mais n'arrête pas le script. Le navigateur suit la redirection, curl lit tranquillement la suite. D'où le die() obligatoire.*

**21.** (c) Le panneau d'administration s'affiche : la condition est vraie puisque le visiteur contrôle le paramètre — *Exact : on ne fait jamais confiance à une donnée venant du client. Le rôle doit être stocké en session, côté serveur.*

**22.** (c) Vérifier côté serveur que la facture demandée appartient bien à l'utilisateur connecté (WHERE id=:id AND user_id=:user_id) — *Exact : c'est une référence directe non sécurisée (IDOR), la requête préparée n'empêche pas ce danger.*

**23.** (a) Le compte d'Alice est supprimé : son navigateur charge l'« image » en envoyant automatiquement son cookie de session — *Exact : c'est une attaque CSRF. La requête vient du navigateur d'Alice, avec sa session valide, à son insu.*

**24.** (c) Ajouter un champ caché contenant un jeton unique stocké en session, et vérifier ce jeton côté serveur avant de traiter la requête — *Exact : c'est le _token intégré de base dans Laravel.*

**25.** (b) L'utilisateur choisit le fichier inclus : il peut charger des fichiers non prévus, voire du code malveillant — *Exact : c'est une inclusion arbitraire. La correction : une liste blanche des pages autorisées (in_array).*

**26.** (b) Déplacer la clé dans un fichier .env exclu du versioning (ou une variable d'environnement) et la lire avec getenv() — *Exact : un secret commité est un secret exposé, même dans un dépôt privé.*

**27.** (b) Les messages d'erreur détaillés divulguent la structure de la base et du code, précieux pour préparer une attaque — *Exact : c'est une mauvaise configuration de sécurité (messages d'erreur trop détaillés, application en debug).*

**28.** (c) Redirection non validée utilisable pour du phishing : il faut filtrer les destinations autorisées (liste blanche ou vérification du domaine) — *Exact : votre site légitime sert de « masque » vers une page malveillante.*

**29.** Injection SQL → Requête préparée (prepare / execute) ; XSS → Échapper l'affichage avec htmlspecialchars ; CSRF → Jeton unique en session vérifié côté serveur ; Mot de passe en clair → password_hash au stockage, password_verify à la connexion

**30.** (b) Un mot de passe comparé avec == à une colonne stockée en clair ; (d) Une requête SQL construite en concaténant $_POST['email'] ; (e) Un echo direct d'une donnée saisie par l'utilisateur — *Exact : stockage en clair et comparaison directe, à remplacer par password_hash / password_verify. / Exact : injection SQL, à passer en requête préparée. / Exact : XSS, à échapper avec htmlspecialchars.*
