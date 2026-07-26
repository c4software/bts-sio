# DevOps Serveur Lot 2 : Apache, MariaDB, virtual hosts et déploiement (TP2 à TP5)

Nom : ______________________  Prénom : ______________________

**Question 1 — Apache**

Qu'est-ce qu'Apache ?

- ☐ **a.** Une distribution Linux
- ☐ **b.** Un langage de programmation
- ☐ **c.** Un serveur Web
- ☐ **d.** Un serveur de base de données

**Question 2 — État d'un service**

Quelle commande permet de vérifier qu'Apache est bien démarré ?

Réponse : ________________________________________

**Question 3 — Démarrage automatique**

Que fait la commande systemctl enable apache2 ?

- ☐ **a.** Elle active le HTTPS sur Apache
- ☐ **b.** Elle configure Apache pour démarrer automatiquement au boot du serveur
- ☐ **c.** Elle démarre Apache immédiatement
- ☐ **d.** Elle installe Apache

**Question 4 — Port HTTP**

Sur quel port un serveur Web écoute-t-il par défaut en HTTP ?

Réponse : ________________________________________

**Question 5 — La racine Web**

Dans quel dossier se trouvent par défaut les fichiers servis par Apache sur Debian ?

- ☐ **a.** /etc/apache2/html
- ☐ **b.** /usr/web
- ☐ **c.** /var/www/html
- ☐ **d.** /home/apache

**Question 6 — Vérifier le serveur**

Depuis le serveur lui-même, comment vérifier en ligne de commande que le serveur Web répond ?

- ☐ **a.** curl --head http://localhost
- ☐ **b.** apt status apache2
- ☐ **c.** ping localhost
- ☐ **d.** ls /var/www/html

**Question 7 — MariaDB**

Qu'est-ce que MariaDB ?

- ☐ **a.** Un module Apache pour le PHP
- ☐ **b.** Un serveur de base de données, compatible avec MySQL
- ☐ **c.** Une interface graphique pour Linux
- ☐ **d.** Un outil de sauvegarde de VM

**Question 8 — Client MySQL**

Que fait la commande mysql -u root -p ?

- ☐ **a.** Elle ouvre une connexion au serveur de base de données avec l'utilisateur root, en demandant le mot de passe
- ☐ **b.** Elle installe MySQL avec l'utilisateur root
- ☐ **c.** Elle supprime la base de données root
- ☐ **d.** Elle affiche le mot de passe de root

**Question 9 — Configuration MariaDB**

Dans quel fichier modifie-t-on la configuration du serveur MariaDB (par exemple pour autoriser l'accès depuis le réseau) ?

- ☐ **a.** /etc/apache2/mariadb.conf
- ☐ **b.** /var/www/html/mysql.conf
- ☐ **c.** /etc/mysql/mariadb.conf.d/50-server.cnf
- ☐ **d.** /home/mysql/config.txt

**Question 10 — Port MySQL**

Sur quel port un serveur MySQL / MariaDB écoute-t-il par défaut ?

Réponse : ________________________________________

**Question 11 — Les environnements**

À quoi sert un environnement de préproduction (ou test) ?

- ☐ **a.** À valider une version de l'application dans des conditions proches de la production, avant la mise en ligne réelle
- ☐ **b.** À stocker les sauvegardes de la production
- ☐ **c.** À héberger le site accessible aux clients
- ☐ **d.** À développer directement sur le serveur

**Question 12 — Virtual hosts**

À quoi servent les virtual hosts d'Apache ?

- ☐ **a.** À créer des machines virtuelles depuis Apache
- ☐ **b.** À chiffrer les échanges entre le client et le serveur
- ☐ **c.** À héberger plusieurs sites Web sur un même serveur
- ☐ **d.** À accélérer le chargement des pages

**Question 13 — Configuration des sites**

Dans quel dossier crée-t-on les fichiers de configuration des sites (siteA.conf, siteB.conf) ?

- ☐ **a.** /var/www/html
- ☐ **b.** /etc/apache2/sites-enabled
- ☐ **c.** /etc/apache2/sites-available
- ☐ **d.** /etc/sites/apache2

**Question 14 — Les commandes Apache**

Associez chaque commande à son action.

| | À relier à… |
|---|---|
| a2ensite → ______ | • Désactiver un site Web |
| a2dissite → ______ | • Activer un module Apache |
| a2enmod → ______ | • Désactiver un module Apache |
| systemctl restart apache2 → ______ | • Consulter les journaux d'erreur |
|  | • Prendre en compte la nouvelle configuration |
|  | • Activer un site Web |

**Question 15 — Vrai ou Faux - Rechargement**

Après avoir modifié un fichier de configuration d'Apache, il faut redémarrer (ou recharger) le service pour que la modification soit prise en compte.

☐ Vrai  ☐ Faux

**Question 16 — Écouter sur plusieurs ports**

Dans quel fichier déclare-t-on les ports supplémentaires sur lesquels Apache doit écouter ?

- ☐ **a.** /var/www/ports.txt
- ☐ **b.** /etc/apache2/ports.conf
- ☐ **c.** /etc/apache2/listen.conf
- ☐ **d.** /etc/ports/apache.conf

**Question 17 — Stratégies de déploiement**

Parmi ces stratégies de déploiement, laquelle offre un historique des versions et la possibilité de revenir en arrière facilement ?

- ☐ **a.** L'édition des fichiers directement sur le serveur avec nano
- ☐ **b.** La copie par clé USB
- ☐ **c.** Le déploiement avec Git
- ☐ **d.** Le déploiement via FTP

**Question 18 — Le FTP**

Quel est le principal inconvénient d'un déploiement via FTP ?

- ☐ **a.** Il ne fonctionne pas avec les fichiers PHP
- ☐ **b.** Le transfert est manuel, sans historique, avec un risque d'écraser ou d'oublier des fichiers
- ☐ **c.** Il nécessite obligatoirement Windows
- ☐ **d.** Il est payant

**Question 19 — Les droits**

Que fait la commande chown -R utilisateur:www-data /var/www/ ?

- ☐ **a.** Elle définit le propriétaire et le groupe (www-data, celui d'Apache) des fichiers du site, récursivement
- ☐ **b.** Elle supprime les fichiers de /var/www/
- ☐ **c.** Elle protège le dossier par mot de passe
- ☐ **d.** Elle change le mot de passe de l'utilisateur www-data

**Question 20 — Bonnes pratiques**

Parmi ces pratiques, lesquelles sont de BONNES pratiques pour un serveur en production ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** Autoriser l'accès à la base de données depuis n'importe quelle adresse IP
- ☐ **b.** Travailler connecté en root en permanence
- ☐ **c.** Séparer les rôles (un serveur Web, un serveur de base de données)
- ☐ **d.** Maintenir le système et les paquets à jour (apt update / upgrade)
- ☐ **e.** Utiliser une connexion SSH par clé plutôt que par mot de passe


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (c) Un serveur Web — *Exact, il répond aux requêtes HTTP et sert les pages de nos sites.*

**2.** systemctl status apache2 (accepté aussi : sudo systemctl status apache2, systemctl status)

**3.** (b) Elle configure Apache pour démarrer automatiquement au boot du serveur — *Exact, à ne pas confondre avec start qui le démarre immédiatement mais une seule fois.*

**4.** 80 — *Exact, c'est ce que vérifie la commande curl --head http://localhost:80.*

**5.** (c) /var/www/html

**6.** (a) curl --head http://localhost — *Exact, on vérifie que la réponse contient un code HTTP 2xx ou 3xx.*

**7.** (b) Un serveur de base de données, compatible avec MySQL — *Exact, c'est un fork communautaire de MySQL.*

**8.** (a) Elle ouvre une connexion au serveur de base de données avec l'utilisateur root, en demandant le mot de passe — *Exact, le -p provoque la demande interactive du mot de passe.*

**9.** (c) /etc/mysql/mariadb.conf.d/50-server.cnf — *Exact, c'est notamment là que se trouve le paramètre bind-address.*

**10.** 3306 — *Exact.*

**11.** (a) À valider une version de l'application dans des conditions proches de la production, avant la mise en ligne réelle — *Exact, on ne teste jamais directement en production.*

**12.** (c) À héberger plusieurs sites Web sur un même serveur — *Exact, comme siteA et siteB dans le TP4, chacun avec sa configuration.*

**13.** (c) /etc/apache2/sites-available — *Exact, on les active ensuite avec a2ensite.*

**14.** a2ensite → Activer un site Web ; a2dissite → Désactiver un site Web ; a2enmod → Activer un module Apache ; systemctl restart apache2 → Prendre en compte la nouvelle configuration

**15.** Vrai — *Exact, d'où le systemctl restart apache2 systématique dans les TP.*

**16.** (b) /etc/apache2/ports.conf — *Exact, il faut ensuite un virtual host qui utilise ce port.*

**17.** (c) Le déploiement avec Git — *Exact, un git pull sur le serveur récupère la dernière version, et l'historique permet de revenir en arrière.*

**18.** (b) Le transfert est manuel, sans historique, avec un risque d'écraser ou d'oublier des fichiers — *Exact, c'est pourquoi on lui préfère SSH (SFTP) ou Git.*

**19.** (a) Elle définit le propriétaire et le groupe (www-data, celui d'Apache) des fichiers du site, récursivement — *Exact, cela permet au serveur Web d'accéder aux fichiers et à l'utilisateur de déployer.*

**20.** (c) Séparer les rôles (un serveur Web, un serveur de base de données) ; (d) Maintenir le système et les paquets à jour (apt update / upgrade) ; (e) Utiliser une connexion SSH par clé plutôt que par mot de passe — *Exact, cela limite l'impact d'une compromission. / Exact, un composant obsolète est une faille. / Exact.*
