---
description: Dans ce TP nous allons voir comment créer une VM (machine virtuelle) sur la ferme VMWare du BTS SIO à Angers.
---

# Créer une VM sur la ferme

::: details Sommaire
[[toc]]
:::

## Objectifs

Dans ce TP nous allons voir comment créer une VM (machine virtuelle) sur la ferme VMWare du BTS SIO à Angers. L'idée de ce TP est comprendre comment fonctionne la ferme, afin de la prendre en main.

::: danger 👋 Attention

La ferme est un équipement partagé par l'ensemble des étudiants du BTS (1ère et 2ème année). Il est donc important de respecter quelques règles d'utilisation pour une utilisation optimale de la ferme, et surtout **dans l'intérêt de tous**.

:::

## Pré-requis

::: tip Uniquement disponible pour le Lycée

Pour réaliser ce TP vous devez :

- Être connecté à la ferme du BTS SIO à Angers (ou via le VPN).
- Avoir un compte sur L'AD.

:::

## Un peu de détail sur la ferme

La ferme est un cluster de serveur uniquement accessible depuis le réseau du lycée (ou via le VPN). Ce cluster possède une puissance conséquente, à savoir deux serveurs avec comme configuration :

- Xeon avec 24 coeurs.
- 256Go de ram.
- 13To de disque dur.

Nous avons deux serveurs ce qui donne :

- 48 coeurs.
- 512Go de ram.
- 26To de disque.

::: tip Un instant
Beaucoup ou pas beaucoup ? Échangeons un peu sur ces specifications.
:::

## Accès à la ferme

Pour accèder à la ferme vous devez :

[192.168.10.6](https://192.168.10.6)

- Cliquer sur « LANCER VSPHERE CLIENT (HTML5) ».
- Entrer votre identifiant et mot de passe de l'AD (ceux de votre compte Windows).

![Connexion à la ferme](./res/ferme-connexion.jpg)

::: tip Observons

Avant d'aller plus loin, observez les options du site. Si vous êtes curieux vous allez pouvoir voir l'usage actuel de la ferme, ainsi que la puissance de celle-ci.

![Menu de la ferme](./res/ferme-menu.jpg)

:::

## Les règles à respecter

L'équipe pédagogique vous a attribué l'accès à la zone de travail **GROIX**. C'est dans cette zone que vous allez créer vos VM. 

Avant de continuer, quelques regles **sont importantes** pour utiliser aux mieux cette espace de travail partagé :

- Ne pas créer de VM dans le dossier `GROIX` directement, mais dans un dossier à votre nom.
- Nommer vos VM de la mannière suivante : `<votre-nom>-<utilité de la machine>`. (Exemple: `vbrosseau-ap2ServeurDebianWeb`).
- Choisir l'allocation dynamique pour le disque dur.
- Installer les VMWARE Tools une fois la machine installée.
- Ne pas conserver les machine Linux allumées en dehors des heures de cours. Votre machine ne sert probablement pas la nuit… **Faites comme les grands acteurs du cloud, éteignez vos machines la nuit**.
- Ne pas créer de machine avec une configuration trop importante. La ferme est un équipement partagé, il est donc important de ne pas surcharger les serveurs.
- Supprimer régulièrement les VM qui ne vous sont plus utile. (en utilisant l'option **« Supprimer du disque »**).
- **Sauvegarder vos identifiants et mot de passe de votre VM**.

::: tip Comment ne pas perdre vos identifiants ?

Pour ne pas perdre vos identifiants vous **devez** créer une `fiche serveur`. Ce document va contenir tous les informations de votre Machine Virtuelle :

- Nom.
- Système d'exploitation.
- Adresse IP, Masque, Passerelle, adresse DNS.
- Login et mot de passe administrateur.
- Login et mot de passe utilisateur (si il y en a).
- La liste des services de votre machines.
- Si les services ont également des accès specifiques ajouter les dans votre `fiche serveur`.

:::

::: danger 🚨 Attention

Toute VM qui ne respecte pas ces exigence pourra être supprimée sans avertissement !

Ne jouez pas avec le feu, respectez les règles. Sinon vous risquez de vous brûler 🔥.

<iframe src="https://giphy.com/embed/dbtDDSvWErdf2" width="480" height="261" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

:::

## Les VMWare Tools

Les VMWare Tools sont un ensemble de logiciels qui vont permettre d'optimiser l'utilisation de votre machine virtuelle. Ces logiciels vont permettre d'optimiser la gestion de la mémoire, de la carte réseau, de la carte graphique, du clavier, de la souris, etc.

Il est important de ne jamais les oublier, car ils sont vraiment une source d'optimisation des performances. Pour votre VM mais également pour le cluster.

## Créer le dossier pour ranger vos VM

Première étape, ranger votre VM dans un dossier à votre nom. Pour cela :

- Cliquez droit sur le dossier `GROIX`.
- Cliquez sur `Nouveau dossier`.
- Nommez le dossier avec votre nom (Exemple: `vbrosseau`).

![Création d'un dossier](./res/ferme-creer-dossier.jpg)

Cette étape est importante, car elle va vous permettre de ranger vos VM dans un dossier à votre nom. Cela va vous permettre de ne pas vous perdre dans les dossiers, et surtout de ne pas supprimer les VM d'un autre étudiant.

## Créer une VM

Pour créer une VM, il faut :

- Sélectionner le dossier à votre nom.
- Clique droit créer une VM.
- Puis « Nouvelle machine virtuelle… ». 

![Création d'une VM](./res/ferme-creer-vm.jpg)

Cette action va ouvrire un assistant vous permettant de créer votre machine virtuelle.

### 1. Type de création

![Type de création](./res/ferme-etape1.jpg)

### 2. Nommage de votre machine

Ici vous allez choisir le nom de votre VM. Il est important de respecter la convention de nommage que nous avons définie plus haut.

![Type de création](./res/ferme-etape2.jpg)

### 3. Ressource de calcul

![Ressource de calcul](./res/ferme-etape3.jpg)

### 4. L'espace de stockage

![Ressource de calcul](./res/ferme-etape4.jpg)

### 5. Compatibilité

Ne touchez à rien, et cliquez sur « Next ».

### 6. Choix de l'OS

À cette étape vous allez indiquer à VMWare quel système d'exploitation votre VM va avoir. En fonction de votre choix. La VM sera optimisé pour celui-ci.

![Ressource de calcul](./res/ferme-etape6.jpg)

### 7. Configuration de votre VM

Comme pour un ordinateur physique une VM possède une configuration materiel. Cette configuration materiel doit être en adéquation avec le système d'exploitation que vous avez choisi :

#### Le disque dur & la mémoire vive

- Windows : 60Go de disque dur, 4Go de mémoire vive.
- Linux : 8Go de disque dur, 2Go de mémoire vive.

![Ressource de calcul](./res/ferme-etape7-disque.jpg)

::: tip Provisionnement du disque

Le provisionnement dynamique est une méthode qui optimise l'utilisation du stockage en allouant un espace de stockage de manière flexible, à la demande.

[En savoir plus](https://docs.vmware.com/fr/VMware-vSphere/6.7/com.vmware.vsphere.html.hostclient.doc/GUID-525C8814-C5B7-419E-852D-A396FF74C6DA.html)

:::

#### Le réseau

- Choisir votre VLAN (voir celui qui vous a été attribué).
- Changer le type de l'adaptateur : Choisir VMXNET.

![Ressource de calcul](./res/ferme-etape7-reseau.jpg)

### Fin. Récap

La configuration de votre VM est complète. Vous pouvez maintenant cliquer sur « Finish » pour valider la création de celle-ci.

![Fin](./res/ferme-etape-fin.jpg)

## Connecter un ISO pour l'installation

Pour installer votre système d'exploitation, vous allez devoir connecter un ISO à votre VM.

::: tip Un ISO ?

Un ISO est un fichier qui contient une image d'un CD ou d'un DVD. Il est possible de créer un ISO à partir d'un CD ou d'un DVD. Il est également possible de télécharger un ISO sur internet.

Le fichier ISO est une copie parfaite d'un disque physique. 

:::

Pour connecter un ISO à votre VM :

- Clique droit sur votre VM et « Modifier les paramètres ».

![Modifier les paramètres](./res/ferme-modifier-vm.jpg)

![Choix de l'ISO](./res/ferme-iso-1.jpg)

- choisir l’image iso (liste déroulante) que vous souhaitez : Par exemple `debian-11.5.0-amd64-netinst.iso` qui se trouve dans la banque de données ISO puis répertoire `\LINUX\`.
- N’oubliez pas de cocher la case « Connecter lors de la mise sous tension » sinon votre vm ne bootera pas sur votre iso/cd au démarrage.

![Choix de l'ISO 2](./res/ferme-iso-2.jpg)
![Choix de l'ISO 3](./res/ferme-iso-3.jpg)

::: tip Et voilà !

Vous venez de créer votre première VM. Celle-ci est prête à être démarrée et à être installé (comme un véritable ordinateur).

:::

## Démarer votre VM

Pour démarrer votre VM, il suffit de cliquer sur « la flèche verte ».

![Démarrer la VM](./res/ferme-demarrer.jpg)

## Accéder à votre VM depuis l'interface Web

Maintenant que vous avez démarré votre VM. Il faut accéder à celle-ci.

Évidemment, nous n'avons pas la possiblité de connecter un écran à la ferme. Nous allons utiliser un accès distant « web » (une sorte de VNC). Cette accès distant n'est pas très pratique et est plutôt lent.

**Il ne nous servira que pour l'installation**

![Accès distant](./res/ferme-acces-distant.jpg)

![Accès distant 2](./res/ferme-acces-distant-2.jpg)

## Supprimer une VM

Il est important de régulièrement supprimer les VM qui ne sont plus utiles.

Pour supprimer une VM :

- Clique droit sur la machine à supprimer.
- Supprimer du disque.

![Ferme supprimer](./res/ferme-supprimer.jpg)

::: danger Attention
Ne surtout pas cliquer sur « Supprimer de l’inventaire ». Cela supprime juste la vm de la liste en conservant tous les fichiers liés à la vm sur la ferme qui continuent donc d’occuper de la place inutilement !
:::

## Accès à vos VM après l'installation

Nous reviondrons sur ce point d'ici quelques TP. Mais vous devez **Obligatoirement** vous connecter à vos machines virtuelles depuis :

- Windows : Bureau à distance.
- Linux : SSH (Putty ou WSL2 ou GitBash).

Le Bureau à distance ou le SSH sont les seules bonne façon par accèder à votre VM.

L'accès Web de Vmware n'offre pas une performance suffisante pour travailler dans de bonne condition.

En plus il ne permet pas de copier/coller entre votre machine et votre VM.

::: tip 👋 Un instant

Plus tard, nous verrons pourquoi l'accès SSH est un incontournable en entreprise. Et surtout pourquoi, bien configuré il sera un allié pour gérer vos serveurs de manières optimisé.

:::

## Accès à la ferme depuis chez vous

Pour cela vous devez installer sur votre machine le logiciel OpenVPN.

Vous trouverez une procédure d’installation sur Moodle (192.168.10.9), ainsi que les fichiers de configuration nécessaires (certificats) pour autoriser votre connexion au lycée :

`Moodle\Info BTS SIO\Accès VPN`

Une fois connecté, vous êtes sur votre machine comme si vous étiez sur un poste d’une des salles informatiques du lycée.