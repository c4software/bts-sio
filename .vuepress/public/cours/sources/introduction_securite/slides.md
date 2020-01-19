# Sécurité des applications WEB

## Risques et menaces

---

### Pour vous, la sécurité c’est quoi ?

---

## Des découvertes de failles tous les jours !

---

### Des exemples en tête ?

---

![Faille 1](./img/faille1.png)

---

![Faille 2](./img/faille2.png)

---

![Faille 3](./img/faille3.png)

---

![Faille ()](./img/faille4.png)

---

### Comment se tenir à jour ?

#### Prévenir plutôt que guérir…

---

### Des sites à surveiller

- [US CERT](https://www.us-cert.gov/)
- [The Hacker News](http://thehackernews.com/)
- Zataz
- [Reddit NetSec](https://www.reddit.com/r/netsec/)
- Next INpact (~Payant)

---

### Les impacts liés à la sécurité

#### La sécurité informatique dans une application c’est un « équilibre »

---

### Le prix de la sécurité

- Impact fonctionnel
- Limitation de l’experience utilisateur (UX)
- Impact financier

---

### Les facteurs d’expositions

![Facteur d'exposition](./img/expositions.png)

---

### L’insécurité à également un coût

## 2.86 Millions d’euros

Estimation des coûts pour une entreprise à chaque incident de vol de données en France
Source: Cost Of Data Breach - Symantec

---

### Mais, une faille c’est quoi ?

![Une faille ?](./img/faille.png)

---

### Les type de failles

- L’humain (Social Engineering)
- Applicatif (Hack)
- L’argent (Jusqu’à quel montant une personne donne l’information ?)

---

### Et si je ne fais rien !?

- Volontaire !
- Involontaire ?

---

### Intégrer la sécurité à toutes les étapes

La sécurité c’est un état d’esprit à intégrer.

C’est le métier des :

- Réseau
- Développeur

---

### Améliorer la sécurité

- Dès la conception
- Comprendre et avoir en tête les règles

---

### Open Web Application Security Project (OWASP)

#### Les dix risques par ordre de dangerosité

---

### The Injection

Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

---

### The Injection

```sql
SELECT * FROM client WHERE id='" . $_GET["id"] . "'
```

```
http://exemple.com/liste?id='or '1'='1
```

---

### Broken Authentication

Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens, or to exploit other implementation flaws to assume other users' identities temporarily or permanently.

---

### Broken Authentication

```
http://exemple.com/?jsessionid=A2938298D293
```

---

### Sensitive Data Exposure

Many web applications and APIs do not properly protect sensitive data, such as financial, healthcare, and PII. Attackers may steal or modify such weakly protected data to conduct credit card fraud, identity theft, or other crimes. Sensitive data may be compromised without extra protection, such as encryption at rest or in transit, and requires special precautions when exchanged with the browser.

---

### Sensitive Data Exposure

- Espace client sans SSL
- Mot de passe en claire (ou en MD5) dans la base de données

---

### XML External Entities (XXE)

Many older or poorly configured XML processors evaluate external entity references within XML documents. External entities can be used to disclose internal files using the file URI handler, internal file shares, internal port scanning, remote code execution, and denial of service attacks.
Broken Access Control. Restrictions on what authenticated users are allowed to do are often not properly enforced. Attackers can exploit these flaws to access unauthorized functionality and/or data, such as access other users' accounts, view sensitive files, modify other users' data, change access rights, etc.

---

### Security Misconfiguration

Security misconfiguration is the most commonly seen issue. This is commonly a result of insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information. Not only must all operating systems, frameworks, libraries, and applications be securely configured, but they must be patched/upgraded in a timely fashion.

---

### Security Misconfiguration

- Console d’administration disponible sans authentification en ligne
- Listage des repertoires ([Exemple](https://www.google.fr/search?dcr=0&q=-inurl%3A%28htm%7Chtml%7Cphp%29+intitle%3A))
- Exemples de code non supprimés

---

### Cross-Site Scripting XSS

XSS flaws occur whenever an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS allows attackers to execute scripts in the victim's browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites.

---

### Cross-Site Scripting XSS

Éxecution de code Javascript sans validation

```html
Votre Nom : <input type="text" name="nom" value="" />
```

```js
alert("Bonjour " + $_POST["nom"]);
```

---

### Insecure Deserialization

Insecure deserialization often leads to remote code execution. Even if deserialization flaws do not result in remote code execution, they can be used to perform attacks, including replay attacks, injection attacks, and privilege escalation attacks.

---

### Using Components with Known Vulnerabilities

Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover. Applications and APIs using components with known vulnerabilities may undermine application defenses and enable various attacks and impacts.

---

### Using Components with Known Vulnerabilities

- CMS non à jour.
- Apache / Tomcat non patchés.
- Librairies XYZ non à jour.

---

### Insufficient Logging & Monitoring

Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data. Most breach studies show time to detect a breach is over 200 days, typically detected by external parties rather than internal processes or monitoring.

---

### Les outils autour d’OWASP

- WebGoat (Formation)
- WebScarab (Audit)
- OWASP Testing Guide (Guide pour voir le niveau de sécu)
- OWASP Code Review Guide (Méthode d’audit)

---

#### Avec OWASP on parle de

### Vulnérabilité, et non de risque

---

### Sécurité à tous les niveaux

---

![](./img/securite.png)

---

- IDS (Intrusion Detection Systeme)
- IPS (Intrusion Prevension Systeme)

---

### IPS

- Ils bloquent tout ce qui parait infectieux à leurs yeux, mais n'étant pas fiable à 100 % ils peuvent donc bloquer malencontreusement des applications ou des trafics légitimes.
- Ils laissent parfois passer certaines attaques sans les repérer.
- Peu discrets et peuvent être découverts lors de l'attaque d'un pirate qui une fois qu'il aura découvert l'IPS s'empressera de trouver une faille dans ce dernier pour le détourner et arriver à son but.

---

### IDS

Un système de détection d'intrusion (Intrusion Detection System) est un mécanisme destiné à repérer des activités anormales ou suspectes sur la cible analysée

![IDS](./img/nids.png)

---

### Comment réduire le risque ?

---

- Sensibilisations / Formations.
- Revue de code (GIT).
- Tests d’intrusions (Audit).
- Sécurité lors du recrutement.
- Sécurité dès la conception du projet.
- Suivi des bonnes pratiques (ex: OWASP).

---

### Pourquoi il faut se battre (en interne) ?

- Résistance au changement.
- ERP / CMS.
- La sécurité est vue comme un frein, pas une fonctionnalitée.
- Déni de la réalité.
- Developpement externe (prestations, stagiaires, …)

---

### Se former

#### En continu

- Conférence physique ou en ligne.
- Internet
- Appliquer les bonnes pratiques tout le temps!

---

### Des questions ?
