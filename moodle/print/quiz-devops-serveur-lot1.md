# DevOps Serveur Lot 1 : Serveur, VM, Debian et ligne de commande (TP1 à TP1c)

Nom : ______________________  Prénom : ______________________

**Question 1 — Un serveur**

Qu'est-ce qu'un serveur ?

- ☐ **a.** Un câble réseau haute performance
- ☐ **b.** Un ordinateur forcément plus gros qu'un PC classique
- ☐ **c.** Un ordinateur qui fournit des services accessibles via le réseau
- ☐ **d.** Un logiciel de bureautique

**Question 2 — La virtualisation**

Qu'est-ce qu'une machine virtuelle (VM) ?

- ☐ **a.** Une sauvegarde compressée d'un disque dur
- ☐ **b.** Un ordinateur simulé par logiciel, qui partage les ressources d'une machine physique
- ☐ **c.** Un serveur qui ne peut pas être éteint
- ☐ **d.** Un ordinateur accessible uniquement par navigateur

**Question 3 — Serveur Web**

Quel est le rôle d'un serveur Web ?

- ☐ **a.** Répondre aux requêtes HTTP des clients en leur servant des pages ou des fichiers
- ☐ **b.** Stocker les emails des utilisateurs
- ☐ **c.** Distribuer les adresses IP
- ☐ **d.** Gérer les impressions du réseau

**Question 4 — Serveur de base de données**

Quel est le rôle d'un serveur de base de données ?

- ☐ **a.** Héberger les pages HTML du site
- ☐ **b.** Convertir les fichiers en PDF
- ☐ **c.** Stocker les données et répondre aux requêtes (SQL) des applications
- ☐ **d.** Créer automatiquement les sauvegardes du réseau

**Question 5 — Vrai ou Faux - VMWare Tools**

Les VMWare Tools améliorent l'intégration entre la machine virtuelle et l'hyperviseur (la ferme).

☐ Vrai  ☐ Faux

**Question 6 — Un ou plusieurs serveurs ?**

Pourquoi sépare-t-on souvent le serveur Web et le serveur de base de données sur deux machines ?

- ☐ **a.** Parce que la licence Debian l'impose
- ☐ **b.** Pour économiser de l'électricité
- ☐ **c.** Parce qu'il est impossible d'installer les deux sur la même machine
- ☐ **d.** Pour séparer les rôles : sécurité, performances et maintenance indépendantes

**Question 7 — Debian**

Debian est…

- ☐ **a.** Un hyperviseur
- ☐ **b.** Un serveur Web
- ☐ **c.** Un langage de script
- ☐ **d.** Une distribution Linux

**Question 8 — Le superutilisateur**

Comment s'appelle le compte administrateur qui a tous les droits sur un système Linux ?

Réponse : ________________________________________

**Question 9 — Mot de passe fort**

Qu'est-ce qui caractérise un mot de passe fort ?

- ☐ **a.** Sa longueur et sa diversité de caractères (majuscules, minuscules, chiffres, caractères spéciaux)
- ☐ **b.** Le fait qu'il soit facile à retenir, comme une date de naissance
- ☐ **c.** Le fait qu'il soit écrit sur un post-it à côté de l'écran
- ☐ **d.** Le fait qu'il soit identique sur toutes les machines pour ne pas l'oublier

**Question 10 — Sudo**

À quoi sert la commande sudo devant une autre commande ?

- ☐ **a.** À exécuter la commande sur un autre serveur
- ☐ **b.** À exécuter la commande plus rapidement
- ☐ **c.** À exécuter cette commande avec les droits administrateur
- ☐ **d.** À annuler la commande précédente

**Question 11 — Connexion à distance**

Quel protocole utilise-t-on pour se connecter à distance au terminal d'un serveur Linux ?

- ☐ **a.** FTP
- ☐ **b.** RDP
- ☐ **c.** SSH
- ☐ **d.** HTTP

**Question 12 — Port SSH**

Quel est le port par défaut du protocole SSH ?

Réponse : ________________________________________

**Question 13 — Les clés SSH**

À quoi sert la commande ssh-keygen ?

- ☐ **a.** À générer une paire de clés (privée et publique) pour s'authentifier sans mot de passe
- ☐ **b.** À générer un certificat HTTPS
- ☐ **c.** À chiffrer le disque dur de la VM
- ☐ **d.** À changer le mot de passe root du serveur

**Question 14 — Déployer sa clé**

Que fait la commande ssh-copy-id utilisateur@adresse-ip ?

- ☐ **a.** Elle copie votre clé privée sur le serveur
- ☐ **b.** Elle crée un nouvel utilisateur sur le serveur
- ☐ **c.** Elle sauvegarde l'identifiant du serveur en local
- ☐ **d.** Elle copie votre clé publique sur le serveur pour permettre la connexion sans mot de passe

**Question 15 — Vrai ou Faux - Clé privée**

Il est acceptable de transmettre sa clé privée SSH à un camarade pour qu'il accède au même serveur.

☐ Vrai  ☐ Faux

**Question 16 — Gérer les paquets**

Quelle commande permet de mettre à jour la liste des paquets disponibles sur Debian ?

- ☐ **a.** apt upgrade
- ☐ **b.** update apt
- ☐ **c.** apt update
- ☐ **d.** apt refresh

**Question 17 — Installer un logiciel**

Pour installer le serveur Web Apache sur Debian, on utilise la commande apt ______ apache2.

(a) setup / (b) get / (c) download / (d) install

**Question 18 — Éditer un fichier**

Quel éditeur de texte en ligne de commande est utilisé dans les TP pour modifier les fichiers de configuration ?

- ☐ **a.** VS Code
- ☐ **b.** Word
- ☐ **c.** paint
- ☐ **d.** nano

**Question 19 — Les commandes de base**

Associez chaque commande à son action.

| | À relier à… |
|---|---|
| mkdir → ______ | • Créer un fichier vide |
| cd → ______ | • Lister le contenu d'un dossier |
| ls → ______ | • Se déplacer dans l'arborescence |
| touch → ______ | • Créer un dossier |

**Question 20 — Télécharger**

Quelle commande permet de télécharger un fichier depuis une URL en ligne de commande ?

- ☐ **a.** download
- ☐ **b.** wget
- ☐ **c.** ftp
- ☐ **d.** scp


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (c) Un ordinateur qui fournit des services accessibles via le réseau — *Exact, il répond aux requêtes de clients (navigateur, application…).*

**2.** (b) Un ordinateur simulé par logiciel, qui partage les ressources d'une machine physique — *Exact, c'est ce que fait la ferme VMWare du BTS : plusieurs VM tournent sur les mêmes serveurs physiques.*

**3.** (a) Répondre aux requêtes HTTP des clients en leur servant des pages ou des fichiers — *Exact, Apache en est un exemple.*

**4.** (c) Stocker les données et répondre aux requêtes (SQL) des applications — *Exact, MySQL et MariaDB en sont des exemples.*

**5.** Vrai — *Exact, leur installation fait partie des règles à respecter sur la ferme du BTS.*

**6.** (d) Pour séparer les rôles : sécurité, performances et maintenance indépendantes — *Exact, une machine compromise ou surchargée n'entraîne pas l'autre.*

**7.** (d) Une distribution Linux — *Exact, c'est celle utilisée dans les TP pour installer nos serveurs.*

**8.** root

**9.** (a) Sa longueur et sa diversité de caractères (majuscules, minuscules, chiffres, caractères spéciaux) — *Exact, c'est ce qui le rend résistant aux attaques par force brute.*

**10.** (c) À exécuter cette commande avec les droits administrateur — *Exact, sans être connecté directement en root.*

**11.** (c) SSH — *Exact, une connexion chiffrée en ligne de commande.*

**12.** 22 — *Exact.*

**13.** (a) À générer une paire de clés (privée et publique) pour s'authentifier sans mot de passe — *Exact, la clé publique sera ensuite déposée sur le serveur.*

**14.** (d) Elle copie votre clé publique sur le serveur pour permettre la connexion sans mot de passe — *Exact, c'est l'étape qui suit ssh-keygen.*

**15.** Faux — *Exact, c'est faux : la clé privée ne se partage jamais. Le camarade doit générer sa propre paire de clés et déposer sa clé publique sur le serveur.*

**16.** (c) apt update — *Exact, à lancer avant toute installation.*

**17.** (d) install

**18.** (d) nano

**19.** mkdir → Créer un dossier ; cd → Se déplacer dans l'arborescence ; ls → Lister le contenu d'un dossier ; touch → Créer un fichier vide

**20.** (b) wget — *Exact, par exemple wget https://exemple.com/valeurs.md (curl fonctionne aussi).*
