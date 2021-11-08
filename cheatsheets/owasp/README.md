# La sécurité

## Comment se tenir à jour ?

Prévenir plutôt que guérir… Quelques sites à surveiller :

- [US CERT (LA SOURCE)](https://www.us-cert.gov/)
- [The Hacker News](http://thehackernews.com/)
- [Zataz](https://www.zataz.com/)
- [Reddit NetSec](https://www.reddit.com/r/netsec/)
- [Next INpact](https://www.nextinpact.com/) (~Payant)
- Google Actu

::: tip Important
Vous êtes la première ligne d’informations !
:::

## Les impacts liés à la sécurité

La sécurité informatique dans une application c’est un « équilibre »

## Le prix de la sécurité

- Impact fonctionnel
- Limitation de l’expérience utilisateur (UX)
- Impact financier

## Suis-je à risque ?

OUI !

![Exposition](./res/expositions.png)

## Pas de hasard !

Dans la sécurité, il n'y a pas de hasard !

![Random](./res/random.png)

### Les types de failles

- L’humain (Social Engineering)
- D'accès (physique)
- Applicatif (Hack)
- L’argent (jusqu’à quel montant une personne donne l’information ?)

### Le Social Enineering

Les gens sont souvent trop confiants. Il faut donc les former régulièrement à la sécurité.

- [Exemple SECTF à la DefCon](https://www.youtube.com/watch?v=-FSLaHKoCNE)
- [Call Recreation (@5min, @11min30)](https://share.vidyard.com/watch/i46XF6N6rpR9KMaorihFQw)

## Intégrer la sécurité à toutes les étapes

La sécurité c’est un état d’esprit à intégrer.

C’est **votre métier**

- Réseau ?
- Développeur ?
- À votre avis ? Qui doit travailler la sécurité ?
- Les deux!

![Random](./res/toutes_les_etapes.png)

## Open Web Application Security Project (OWASP)

> Open Web Application Security Project (OWASP) est une communauté en ligne travaillant sur la sécurité des applications Web. Sa philosophie est d'être à la fois libre et ouverte à tous. Elle a pour vocation de publier des recommandations de sécurisation Web et de proposer aux internautes, administrateurs et entreprises des méthodes et outils de référence permettant de contrôler le niveau de sécurisation de ses applications Web.
> _Source: Wikipedia_

[Site de Owasp](https://owasp.org/)

OWASP liste 10 grandes catégories de failles **à connaitre** :

- **The Injection**
  - Corresponds au risque d’injection SQL, shell...
- **Broken Authentication and Session Management**
  - Corresponds au risque de casser la gestion de l’authentification et de la session. Comprends notamment le vol de session ou la récupération de mots de passe.
- **Cross-Site Scripting**
  - Corresponds au XSS soit l’injection de contenu dans une page, ce qui provoque des actions non désirées sur une page Web. Les failles XSS sont particulièrement répandues parmi les failles de sécurités Web.
- **Insecure Direct Object References**
  - Corresponds aux failles de sécurités des ID de données visualisées. Nécessite de mettre en place un contrôle d’accès aux données.
- **Security Misconfiguration**
  - Corresponds aux failles de configuration liées aux serveurs Web, applications, base de données ou frameworks.
- **Sensitive Data Exposure**
  - Corresponds aux failles de sécurités liées aux données sensibles comme les mots de passe, les numéros de carte de paiement ou encore les données personnelles et la nécessité de chiffrer ces données.
- **Missing Function Level Access Control**
  - Failles de sécurités liées aux accès de fonctionnalité.
- **Cross-Site Request Forgery (CSRF)**
  - Failles liées à l’exécution de requêtes à l’insu de l’utilisateur.
- **Using Components with Known Vulnerabilities**
  - Failles liées à l’utilisation de composants tiers.
- **Unvalidated Redirects and Forwards**
  - Failles liées aux redirects et forwards génériques des applications.

## Mais, une faille c’est quoi ?

![](./res/faille.png)

## Comprendre les failles

L'idée d'OWASP, c'est de former pour comprendre les failles afin de ne plus les produire involontairement… Et surtout avec OWASP on parle de **vulnérabilité, et non de risque**.

### Le classement évolue

![Mapping 2017 -> 2021](./res/mapping.png)
[Source](https://owasp.org/www-project-top-ten/)

### L’injection

Souvent la plus connu… (et la plus rencontrée)

```sql
SELECT * FROM client WHERE id='" . $_GET["id"] . "'
```

```
http://exemple.com/liste?id='or '1'='1
```

### Violation de gestion d'authentification et de session

Une session en paramètre GET == ⚠️. Si vous partagez le lien, n'importe qui pourra obtenir votre accès !

```
http://exemple.com/?jsessionid=A2938298D293
```

### XSS

Exécution de code JavaScript sans validation. Le risque ici est qu'il est possible de changer le comportement initialement attendu pour en détourner le sens.

```html
Votre Nom : <input type="text" name="nom" value="" />
```

```js
alert("Bonjour " + $_POST["nom"]);
```

### Référence directe non sécurisée à un objet

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

### Mauvaise configuration sécurisée

- Console d’administration disponible sans authentification en ligne.
- Listage des répertoires ([Exemple](https://www.google.fr/search?dcr=0&q=intitle%3A%22Index%20of%22))
- Exemples de code non supprimés.

### Exposition de données sensibles

- Espace client sans SSL.
- Mot de passe en claire (ou en MD5) dans la base de données.

### Manque de contrôle d'accès au niveau fonctionnel

- Page d’admin accessible avec un compte utilisateur.
- Mode non filtré (similaire à l’exemple mode={client,admin}).

### CSRF: Falsification des requêtes

- Rejeu de requête déjà joué.

::: tip Comment le bloquer ?

Ajouter un identifiant/jeton dans la requête, unique et non réutilisable. Intégré de base dans Laravel.

:::

### Utilisation de composants avec des vulnérabilités connues

- CMS non à jour
- Apache / Tomcat non patchés
- Librairies XYZ non à jour

### Redirections et renvois non validés

- Utilisation de votre site comme « masque » dans du phishing

## Les outils OWASP

- [OWASP Juice Shop (Formation, JavaScript)](https://owasp.org/www-project-juice-shop/)
- WebGoat (Formation, Java)
- WebScarab (Audit)
- OWASP Testing guide (Guide pour voir le niveau de sécu)
- OWASP Code Review guide (Méthode d’audit)
