# La méthode OWASP

### Comment se tenir à jour ?

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

### Les impacts liés à la sécurité

La sécurité informatique dans une application c’est un « équilibre »

- Impact fonctionnel
- Limitation de l’expérience utilisateur (UX)
- Impact financier

<center class="no-print">
<img src="./res/expositions.png" width="500px" />
<img src="./res/random.png" width="500px" />
</center>

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

<center>
<img src="./res/toutes_les_etapes.png" width="500px">
</center>

### Assurer la qualité

L'idée c'est de s'assurer une qualité continue du code avec :

- Des règles à connaitre (OWASP).
- Des tests unitaires.
- Une analyse automatique du code (SonarQube).

### Open Web Application Security Project (OWASP)

> Open Web Application Security Project (OWASP) est une communauté en ligne travaillant sur la sécurité des applications Web. Sa philosophie est d'être à la fois libre et ouverte à tous. Elle a pour vocation de publier des recommandations de sécurisation Web et de proposer aux internautes, administrateurs et entreprises des méthodes et outils de référence permettant de contrôler le niveau de sécurisation de ses applications Web.

> _Source: Wikipedia_

<div class="no-print">
  [Site de Owasp](https://owasp.org/)
</div>

OWASP liste 10 grandes catégories de failles **à connaitre** :

### A1 - Injection

Corresponds au risque d’injection SQL, shell...

Souvent la plus connu… (et la plus rencontrée)

```sql
SELECT * FROM client WHERE id='" . $_GET["id"] . "'
```

```
http://exemple.com/liste?id='or '1'='1
```

### A2 - Violation de Gestion d’Authentification et de Session

Corresponds au risque de casser la gestion de l’authentification et de la session. Comprends notamment le vol de session ou la récupération de mots de passe.

Une session en paramètre GET == ⚠️. Si vous partagez le lien, n'importe qui pourra obtenir votre accès !

```
http://exemple.com/?jsessionid=A2938298D293
```

### A3 - Cross-Site Scripting (XSS)

Risque d'injection de contenu dans une page.

Provoque des actions non désirées sur une page Web.

Les failles XSS sont particulièrement répandues parmi les failles de sécurités Web.

Exécution de code JavaScript sans validation. Le risque ici est qu'il est possible de changer le comportement initialement attendu pour en détourner le sens.

```html
Votre Nom : <input type="text" name="nom" value="" />
```

```js
alert("Bonjour " + $_POST["nom"]);
```

### A4 - Références directes non sécurisées à un objet

Accès à de la données en spécifiant un `id` directement par une URL.

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

### A5 - Mauvaise configuration Sécurité

Corresponds aux failles de configuration liées aux serveurs Web, applications, base de données ou frameworks.

- Console d’administration disponible sans authentification en ligne.
- Listage des répertoires ([Exemple](https://www.google.fr/search?dcr=0&q=intitle%3A%22Index%20of%22))
- Exemples de code non supprimés.
- Application en debug.

### A6 - Exposition de données sensibles

Corresponds aux failles de sécurités liées aux données sensibles comme les mots de passe, les numéros de carte de paiement ou encore les données personnelles et la nécessité de chiffrer ces données.

- Espace client sans SSL.
- Mot de passe en claire (ou en MD5) dans la base de données.
- Sauvegarde de données inutiles.

### A7 - Manque de contrôle d’accès au niveau fonctionnel

Failles liées aux contrôle d'accès de fonctionnalité.

- Page d’admin accessible avec un compte utilisateur.
- Mode non filtré (similaire à l’exemple mode={client,admin}).

### A8 - Falsification de requête intersite (CSRF)

Failles liées à l’exécution de requêtes à l’insu de l’utilisateur.

- Rejeu de requête déjà joué.

::: tip Comment le bloquer ?

Ajouter un identifiant/jeton dans la requête, unique et non réutilisable. Intégré de base dans Laravel.

:::

### A9 - Utilisation de composants avec des vulnérabilités connues

Failles liées à l’utilisation de composants tiers vulnérables.

- CMS non à jour
- Apache / Tomcat non patchés
- Librairies XYZ non à jour

### A10 - Redirections et Renvois Non Validés

Les redirections et les renvois non validés sont une vulnérabilité profitant d’une faiblesse dans le code et dont l’objectif est de rediriger l’utilisateur sur une page malveillante

- Utilisation de votre site comme « masque » dans du phishing

### Mais, une faille c’est quoi ?

<center>
  <img src="./res/faille.png" width="500px" />
</center>

L'idée d'OWASP, c'est de former pour comprendre les failles afin de ne plus les produire involontairement… Et surtout avec OWASP on parle de **vulnérabilité, et non de risque**.

## Les outils OWASP

- [OWASP Juice Shop (Formation, JavaScript)](https://owasp.org/www-project-juice-shop/)
- WebGoat (Formation, Java)
- WebScarab (Audit)
- OWASP Testing guide (Guide pour voir le niveau de sécu)
- OWASP Code Review guide (Méthode d’audit)

## Synthèse OWASP

<center>
  <img src="./res/tableau.png" width="100%" />
</center>
