---
description: La méthode OWASP ! Prévenir plutôt que guérir…
---

# La méthode OWASP

::: details Table des matières
[[toc]]
:::

## Comment se tenir à jour ?

Prévenir plutôt que guérir… Quelques sites à surveiller :

- [CISA (anciennement US-CERT)](https://www.cisa.gov/)
- [The Hacker News](https://thehackernews.com/)
- [Zataz](https://www.zataz.com/)
- [Reddit NetSec](https://www.reddit.com/r/netsec/)
- [Next INpact](https://www.nextinpact.com/) (~payant)
- [CERT-FR (ANSSI)](https://www.cert.ssi.gouv.fr/)
- Google Actu

::: tip Important
Vous êtes la première ligne d’informations !
:::

## Les grandes catégories à connaître

- Les mots de passe (multi-facteurs, complexité, hashage).
- Les failles dans le code (injections, XSS, CSRF, etc.).
- Les failles dans les configurations (serveur, application, etc.).
- Le social engineering (le maillon faible, l'humain).

::: danger Le risque ?

Le risque est la multiplication des failles. Plus vous avez de failles, plus vous avez de risques. C'est là que la sécurité devient un enjeu majeur. Car plus le nombre de failles est importantes plus **la surface d'attaque** est grande.

:::

## La surface d'attaque

La surface d'attaque est l'ensemble des points d'entrée d'un système qui peuvent être exploités par un attaquant pour compromettre la sécurité de ce système.

Plus la surface d'attaque est grande, plus le système est vulnérable.

### Exemple

Une application Web avec un ensemble de failles (injection SQL, XSS, CSRF, etc.) a une grande surface d'attaque. Un attaquant peut exploiter ces failles pour compromettre la sécurité de l'application.

Un serveur mal configuré (ports ouverts, services non sécurisés, etc.) a une grande surface d'attaque. Un attaquant peut exploiter ces failles pour compromettre la sécurité du serveur.

Réduire la surface d'attaque est un enjeu majeur en sécurité informatique. Réduire la surface d'attaque implique de minimiser les points d'entrée.

## L'authentication

Il est possible de sécuriser l'authentification de plusieurs manières :

- **Mots de passe** : Complexité, hachage, salage.
- **Authentification à plusieurs facteurs** : Double authentification, biométrie, OTP.
- **Sécurisation des mots de passe** : Bcrypt, Argon2, Scrypt.
- **Sécurisation des sessions** : JWT, Cookies sécurisés.
- **Authentification unique** : OAuth, OpenID (SSO, Single Sign-On).

## Les mots de passe

Zoom sur les mots de passe :

- Un mot de passe ne doit jamais être stocké en claire.
- Un mot de passe doit être haché (non réversible).
- Un mot de passe doit être salé (ajout d’une chaîne aléatoire).
- Un mot de passe seul n'est souvent pas suffisant (Double authentification).

## Les risques du SSO

Le SSO (Single Sign-On) est une méthode d'authentification qui permet à un utilisateur de se connecter avec un seul identifiant et un seul mot de passe pour accéder à plusieurs applications. C'est une méthode très pratique, mais qui peut être dangereuse en cas de compromission (du mot de passe, de l'identifiant, de la session).

En effet, si un attaquant compromet un compte, il peut accéder à toutes les applications liées à ce compte.

Il est donc important de sécuriser le SSO avec des méthodes d'authentification à plusieurs facteurs (2FA, MFA).

### Principes de base

Avoir un mot de passe hashé ne suffit pas. Il faut aussi le saler.

![Salage](./res/salt.png)

Le salage est une technique qui permet d’ajouter une chaîne aléatoire au mot de passe avant (ou après) de le hacher. Idéalement le sel est différent par utilisateur, cela permet de rendre le mot de passe unique pour chaque utilisateur.

### Des algorithmes : Le bcrypt

Le bcrypt est un algorithme de hachage qui :

- Intègre le sel.
- Intègre un coût (nombre d'itération). Plus le coût est élevé, plus le hachage est long (et donc plus sécurisé).
- Est basé sur l'algorithme de chiffrement Blowfish (et non SHA-256).

## Résumé :

Les mots de passe :

- Un mot de passe ne doit jamais être stocké en claire. Il doit être haché (non réversible) et salé (ajout d’une chaîne aléatoire).
- Le sel peut-être différent pour chaque utilisateur ou global pour tous les utilisateurs. Celui-ci doit être placé avant ou après le mot de passe, il sera utilisé également pour vérifier le mot de passe.
- Le bcrypt est un algorithme de hachage qui intègre le sel, le coût et le hachage (SHA-256).

## Authentification à plusieurs facteurs

3 formes d'authentification :

- Mémorielle qui représente une chose que l'intéressé connaît (un secret),
- Matérielle qui se réfère à quelque chose qu'il possède (un objet),
- Corporelle qui utilise un trait physique de l'utilisateur (une biométrie).

Des **outils** :

- **Mot de passe :** Un mot de passe avec un niveau de sécurité suffisant (longueur, caractères spéciaux, majuscules, minuscules, chiffres).
- **Application :** OTP (One Time Password) : SMS, Google Authenticator, Authy, Yubikey.
- **Objet physique :** U2F (Universal 2nd Factor) : Clé USB, Yubikey.
- **Biométrie :** Empreinte digitale, Reconnaissance faciale.

Mais surtout c'est :

- Permets de sécuriser les mots de passe en ajoutant une couche de sécurité supplémentaire.
- Via un secret partagé entre la personne **physique** et le site.

### Les impacts liés à la sécurité

La sécurité informatique dans une application c’est un « équilibre »

- Impact fonctionnel
- Limitation de l’expérience utilisateur (UX)
- Impact financier

![](./res/expositions.png)
![](./res/random.png)

### Les types de failles

- L’humain (Social Engineering)
- D'accès (physique)
- Applicatif (Hack)
- L’argent (jusqu’à quel montant une personne donne l’information ?)

### Le Social Engineering

Les gens sont souvent trop confiants. Il faut donc les former régulièrement à la sécurité.

Deux exemples en vidéo :

|                      ![Exposition](./res/sectf.png)                      |                            ![Random](./res/call-recreation.png)                             |
| :----------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
| [Exemple SECTF à la DefCon](https://www.youtube.com/watch?v=-FSLaHKoCNE) | [Call Recreation (@5min, @11min30)](https://share.vidyard.com/watch/i46XF6N6rpR9KMaorihFQw) |

## Intégrer la sécurité à toutes les étapes

La sécurité c’est un état d’esprit à intégrer.

C’est **votre métier**

![](./res/toutes_les_etapes.png)

## L'observabilité

L'observabilité est un concept qui permet de mesurer et d'analyser le comportement d'un système. On parlera de traçabilité, de logs, de monitoring, de métriques, etc.

La traçabilité est un élément clé de la sécurité. Elle permet de savoir qui a fait quoi, quand et comment.

## Supply Chain Attacks

Les Supply Chain Attacks sont des attaques ciblant les dépendances logicielles. Très courantes de nos jours. Les dépendances logicielles sont partout dans nos applications (nuget, composer, npm, pip, etc.), mais également sur nos serveurs (apt, yum, docker, etc.). Exemple : la faille Log4Shell en 2021.

Concrètement, voici comment ça peut se dérouler :

- Une dépendance est compromise (par un attaquant ou un développeur malveillant).
- Un malware est injecté dans la dépendance.
- Le malware est distribué via la dépendance.
- Le malware s'exécute sur les systèmes des utilisateurs de la dépendance (serveur ou poste de travail en fonction du type de dépendance).

Vous êtes donc la cible ici d'une attaque pas directement de votre code, mais d'une dépendance que vous utilisez.

### Assurer la qualité

S'assurer d'une qualité continue du code avec :

- Des règles à connaître (OWASP).
- Des tests unitaires.
- Une analyse automatique du code (SonarQube).

### Open Web Application Security Project (OWASP)

> Open Web Application Security Project (OWASP) est une communauté en ligne travaillant sur la sécurité des applications Web. Sa philosophie est d'être à la fois libre et ouverte à tous. Elle a pour vocation de publier des recommandations de sécurisation Web et de proposer aux internautes, administrateurs et entreprises des méthodes et outils de référence permettant de contrôler le niveau de sécurisation de ses applications Web.

> _Source: Wikipédia_

[Site de Owasp](https://owasp.org/)

OWASP liste 10 grandes catégories de failles **à connaître** (version 2021) :

- **A01:2021 – Contrôles d'accès défaillants** : Les vulnérabilités liées aux contrôles d'accès permettent aux utilisateurs d'agir en dehors de leurs permissions prévues.
- **A02:2021 – Défaillances cryptographiques** : Les données en transit et au repos (telles que les mots de passe, numéros de carte bleue, dossiers médicaux, informations personnelles et secrets commerciaux) requièrent une protection supplémentaire. Exemple : mots de passe non hashés en base de données, absence de HTTPS.
- **A03:2021 – Injection** : Les attaques par injection (SQL, NoSQL, OS, LDAP) surviennent lorsque des données non fiables sont envoyées à un interpréteur en tant que commande ou requête.
- **A04:2021 – Conception non sécurisée** : Désigne l'absence ou la faiblesse de la conception des contrôles de sécurité. Exemple : absence de contrôle dans un système de routage Web, manque de validation des entrées, absence de protection anti-bot.
- **A05:2021 – Mauvaise configuration de sécurité** : Configuration incomplète ou trop permissive, services inutiles activés, comptes par défaut non modifiés, messages d'erreur trop détaillés.
- **A06:2021 – Composants vulnérables et obsolètes** : L'utilisation de logiciels ou composants obsolètes (frameworks, bibliothèques, systèmes) peut exposer l'application à des attaques connues.
- **A07:2021 – Identification et authentification de mauvaise qualité** : Vulnérabilités liées à l'authentification : absence de MFA, mots de passe faibles acceptés, sessions mal gérées, identifiants par défaut.
- **A08:2021 – Manque d'intégrité des données et du logiciel** : Code et infrastructure non protégés contre les violations d'intégrité. Exemple : mises à jour non signées, pipelines CI/CD non sécurisés, désérialisation non sécurisée.
- **A09:2021 – Carence des systèmes de contrôle et de journalisation** : Absence de logs, logs insuffisants, ou absence de surveillance permettant de détecter et répondre aux incidents de sécurité.
- **A10:2021 – Falsification de requête côté serveur (SSRF)** : Permet à un attaquant d'inciter le serveur à envoyer des requêtes vers des destinations non prévues (services internes, cloud metadata, etc.).

### Top 10 : Simplifié

Le nouveau TOP 10 est très intéressant, car il met en lumière le croisement entre les failles et les risques. Mais il est plus complexe à mémoriser. Il est donc également possible de classer les failles de manière brute :

- **Injection** : Injection SQL, NoSQL, OS, LDAP...
- **Violation de Gestion d'Authentification et de Session** : Risque de casser / usurper une authentification ou une session.
- **Cross-Site Scripting (XSS)** : Risque d'injection de contenu dans une page pour provoquer des actions non désirées.
- **Références directes non sécurisées à un objet** : Accès à de la donnée en spécifiant un `id` directement par un paramètre non filtré.
- **Mauvaise configuration Sécurité** : Failles liées aux serveurs Web, applications, base de données ou frameworks.
- **Exposition de données sensibles** : Exposition de données sensibles et nécessité de chiffrer ces données.
- **Manque de contrôle d'accès au niveau fonctionnel** : Failles liées aux contrôles d'accès de fonctionnalité.
- **Falsification de requête intersite (CSRF)** : Failles liées à l'exécution de requêtes à l'insu de l'utilisateur.
- **Utilisation de composants avec des vulnérabilités connues** : Failles liées à l'utilisation de composants tiers vulnérables.
- **Redirections et Renvois non validés** : Vulnérabilité permettant de rediriger l'utilisateur sur une page malveillante.

Ce classement est plus simple à mémoriser et permet de se rappeler des failles les plus courantes.

::: tip Je n'invente rien
Ce classement correspond à la version OWASP TOP 10 de 2017. Bien que mise à jour en 2021, ces concepts restent valables et pertinents.
:::

### Les failles

Le TOP 10 OWASP nous donne les grandes catégories de failles à connaître. Pour entrer dans le détail, voici les failles les plus courantes :

### Les Injections

Injection SQL, Shell...

Souvent la plus connue et la plus rencontrée :

```sql
SELECT * FROM client WHERE id='" . $_GET["id"] . "'
```

```
http://exemple.com/liste?id='or '1'='1
```

::: tip C'est la base de la sécurité

Vous trouverez cet exemple un peu partout. C'est le mauvais exemple en termes de sécurité !

Au passage, si vous écrivez :

```php
$id = $_GET['id'];
$maRequete = "SELECT * FROM client WHERE id='{$id}'"
```

⚠️ C'est aussi une faille, celle-ci est identique à la précédente.

:::

#### Comment corriger ?

- Toujours utiliser des requêtes préparées.
- Ou utiliser des ORM (Object Relational Mapping) qui font la même chose.

```php
$maRequete = $pdo->prepare("SELECT * FROM client WHERE id=:id");
$maRequete->execute(['id' => $_GET['id']]);
```

### Violation de Gestion d’Authentification et de Session

Risque de casser / usurper une authentification ou une session. Comprends notamment le vol de session ou la récupération de mots de passe.

Une session en paramètre GET == ⚠️. Si vous partagez le lien, n'importe qui pourra obtenir votre accès !

```
http://exemple.com/?jsessionid=A2938298D293
```

#### Comment corriger ?

- Toujours utiliser des sessions cryptées.
- Toujours utiliser des sessions avec un identifiant unique.
- Toujours utiliser des sessions avec un TTL (Time To Live).

### Cross-Site Scripting (XSS)

Risque d'injection de contenu dans une page pour but de provoquer des actions non désirées dans celle-ci.

Les failles XSS sont particulièrement répandues parmi les failles de sécurités Web.

Exécution de code JavaScript sans validation. Le risque ici est qu'il est possible de changer le comportement initialement attendu pour en détourner le sens.

```html
Votre Nom : <input type="text" name="nom" value="" />
```

```js
echo "Bonjour " . $_POST['nom'];
```

::: danger Attention

Avec ce code, il est possible d'exécuter du code JavaScript. Exemple, si l'utilisateur entre :

```html
<script>alert('Hello')</script>
```

Le code sera exécuté dans le navigateur de l'utilisateur lors de l'affichage de la page.

:::

Deux types sont à connaître :

- XSS Persistant (stocké en base de données, dans un logs, et exécuté à chaque affichage de la page)
- XSS Reflété (via un lien)

#### Comment corriger ?

- Toujours valider les entrées utilisateurs.

```php
$nom = filter_input(INPUT_POST, 'nom', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
// ou
$nom = strip_tags($_POST['nom']);
// ou (recommandé pour l'affichage)
$nom = htmlspecialchars($_POST['nom'], ENT_QUOTES, 'UTF-8');
```

::: warning Note importante
`FILTER_SANITIZE_STRING` est **déprécié depuis PHP 8.1**. Utilisez `FILTER_SANITIZE_FULL_SPECIAL_CHARS` ou `htmlspecialchars()`.
:::

### Références directes non sécurisées à un objet

Accès à de la donnée en spécifiant un `id` directement par un paramètre non filtré.

C'est également quelque chose de très courant. Si vous attendez en paramètre un mode / un id, veillez à toujours contrôler si la ressource chargée correspond aux droits de l'utilisateur.

Si je change client par … admin ?

```
http://exemple.com/liste?mode=client
```

```sql
SELECT * FROM client where mode=?
```

```php
$stmt->bindParam(1, $mode);
```

::: tip Requête préparée

Vous noterez ici que nous avons une requête « préparé » ça n'empêche pas le danger…

:::

#### Comment corriger ?

- Toujours valider les entrées utilisateurs.
- Toujours vérifier les droits de l'utilisateur.

```php
if ($_SESSION['mode'] == 'client') {
    // On peut charger la ressource
} else if ($_SESSION['mode'] == 'admin') {
    // On peut charger la ressource
} else {
    // On ne peut pas charger la ressource
}
```

### Mauvaise configuration Sécurité

Corresponds aux failles de configuration liées aux serveurs Web, applications, base de données ou frameworks.

- Console d’administration disponible sans authentification en ligne.
- Listage des répertoires ([Exemple](https://www.google.fr/search?dcr=0&q=intitle%3A%22Index%20of%22))
- Exemples de code non supprimés.
- Application en debug.

#### Comment corriger ?

- Toujours supprimer les exemples de code.
- Toujours supprimer les répertoires de débug.
- Lire la documentation.

### Exposition de données sensibles

Exposition de données sensibles comme les mots de passe, les numéros de carte de paiement ou encore les données personnelles et la nécessité de chiffrer ces données.

- Espace client sans SSL.
- Mot de passe en clair (ou en MD5) dans la base de données.
- Sauvegarde de données inutiles.
- Données sensibles dans les logs.
- Données sensibles en clair dans la base de données.

#### Comment corriger ?

- Toujours utiliser le HTTPS.
- Toujours utiliser des mots de passe chiffrés (hashés + sel).
- Toujours supprimer les données inutiles.
- Toujours supprimer les données sensibles des logs.
- Protéger les données sensibles dans la base de données (chiffrement).

### Manque de contrôle d’accès au niveau fonctionnel

Failles liées aux contrôles d'accès de fonctionnalité.

- Page d’admin accessible avec un compte utilisateur.
- Mode non filtré (similaire à l’exemple mode={client,admin}).

#### Comment corriger ?

- Toujours vérifier les droits de l'utilisateur.

```php
if ($_SESSION['mode'] == 'client') {
    // On peut charger la ressource
} else if ($_SESSION['mode'] == 'admin') {
    // On peut charger la ressource
} else {
    // On ne peut pas charger la ressource
}
```

### Falsification de requête intersite (CSRF)

Failles liées à l’exécution de requêtes à l’insu de l’utilisateur.

- Rejeu de requête déjà joué.
- Attaque de type brute force.
- Exécution de requête à l’insu de l’utilisateur (exemple : déconnexion / connexion sur un site tierce).

::: tip Comment le bloquer ?

Ajoutez un identifiant/jeton dans la requête, unique et non réutilisable. Intégré de base dans Laravel.

:::

#### Comment corriger ?

- Ajouter un jeton unique dans les formulaires.

```php
<input type="hidden" name="_token" value="{{ csrf_token() }}">

// Côté PHP
if (isset($_POST['_token']) && $_POST['_token'] == $_SESSION['_token']) {
    // On peut traiter la requête
} else {
    die();
}
```

### Utilisation de composants avec des vulnérabilités connues

Failles liées à l’utilisation de composants tiers vulnérables.

- CMS non à jour.
- Apache / Tomcat non patchés.
- Librairies XYZ non à jour.
- Version de PHP non à jour.
- Framework non à jour.

#### Comment corriger ?

- Toujours mettre à jour les composants tiers.
- Ne pas utiliser de vieux frameworks (exemple PHP 4, ou Symfony 1.4)

### Redirections et Renvois non validés

Les redirections et les renvois non validés sont une vulnérabilité profitant d’une faiblesse dans le code et dont l’objectif est de rediriger l’utilisateur sur une page malveillante

- Utilisation de votre site comme « masque » dans du phishing

_Exemple :_

```
http://www.shop-vdt.com/login.php?goto=evil.com/login
```

#### Comment corriger ?

- Toujours valider les entrées utilisateurs.
- Filtrer les liens possibles.

```php
// Autorise uniquement les redirections vers le site
if (preg_match('/^https?:\/\/shop-vdt\.com\//', $_GET['goto'])) {
    header('Location: ' . $_GET['goto']);
} else {
    die();
}
```

### Mais, une faille c’est quoi ?

![Une faille](./res/faille.png)

L'idée d'OWASP, c'est de former pour comprendre les failles afin de ne plus les produire involontairement… Et surtout avec OWASP on parle de **vulnérabilité, et non de risque**.

## Les outils OWASP

- [OWASP Juice Shop (Formation, JavaScript)](https://owasp.org/www-project-juice-shop/)
- [WebGoat (Formation, Java)](https://owasp.org/www-project-webgoat/)
- [ZAP - Zed Attack Proxy (Audit, remplace WebScarab)](https://www.zaproxy.org/)
- [OWASP Testing Guide (Guide de test de sécurité)](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP Code Review Guide (Méthode d'audit de code)](https://owasp.org/www-project-code-review-guide/)
- [OWASP Dependency-Check (Vérification des composants vulnérables)](https://owasp.org/www-project-dependency-check/)

## La formation

En cybersécurité, il est important de rappeler que la formation des employés est primordiale. Cette formation doit être :

- Régulière (tous les ans).
- Adaptée à l'entreprise (pas de formation générique).
- Prendre plusieurs formes (phishing fictif, formation en ligne, formation en présentiel).

La formation prend également la forme de **sensibilisation** :

- Affichage de consignes de sécurité.
- Sensibilisation aux risques.
- Formation aux bonnes pratiques.
- Formation sur les mots de passe.
- Chocoblast (technique pour rappeler aux utilisateurs l'importance de verrouiller leur session).

## Synthèse OWASP

![](./res/tableau.png)