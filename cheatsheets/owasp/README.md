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
- Limitation de l’experience utilisateur (UX)
- Impact financier

## Suis-je à risque ?

OUI !

![Exposition](./res/expositions.png)

## Pas de hasard !

Dans la sécurité, il n'y a pas de hasard !

![Random](./res/random.png)

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

OWASP liste 10 grandes catégorie de failles **à connaitre** :

- **The Injection**
  - Correspond au risque d’injection SQL, shell...
- **Broken Authentication and Session Management**
  - Correspond au risque de casser la gestion de l’authentification et de la session. Comprend notamment le vol de session ou la récupération de mots de passe.
- **Cross-Site Scripting**
  - Correspond au XSS soit l’injection de contenu dans une page, ce qui provoque des actions non désirées sur une page Web. Les failles XSS sont particulièrement répandues parmi les failles de sécurités Web.
- **Insecure Direct Object References**
  - Correspond aux failles de sécurités des ID de données visualisées. Nécessite de mettre en place un contrôle d’accès aux données.
- **Security Misconfiguration**
  - Correspond aux failles de configuration liées aux serveurs Web, applications, base de données ou frameworks.
- **Sensitive Data Exposure**
  - Correspond aux failles de sécurités liées aux données sensibles comme les mots de passe, les numéros de carte de paiement ou encore les données personnelles et la nécessité de chiffrer ces données.
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
