# Sécurité des applications (OWASP) — 40 questions, lot unique

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
| Intégrité → ______ | • Modification non autorisée de données (injection SQL) |
| Disponibilité → ______ | • Service rendu inaccessible (attaque DDoS) |

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
| Mémorielle (un secret que l'on connaît) → ______ | • Un mot de passe |
| Matérielle (un objet que l'on possède) → ______ | • Une clé Yubikey |
| Corporelle (un trait physique) → ______ | • Une empreinte digitale |

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

Un attaquant ouvre l'URL suivante : http://exemple.com/liste?id='or '1'='1 — de quelle attaque s'agit-il ?

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
| Strict-Transport-Security → ______ | • Empêcher le navigateur de deviner le type MIME |
| X-Frame-Options → ______ | • Limiter les sources de scripts et de contenu (protection XSS) |
| X-Content-Type-Options → ______ | • Empêcher le clickjacking |

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

**16.** (b) Des données non fiables sont envoyées à un interpréteur en tant que commande ou requête — *Exact, c'est la définition de la catégorie A03 du Top 10.*

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
