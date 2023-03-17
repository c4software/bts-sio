# TP1c. Prendre en main la ligne de commande

::: details Sommaire
[[toc]]
:::

::: tip TP évalué

Nous sommes à un point étape. La réalisation de ce TP sera évaluée. Il sera évalué de la manière suivante :

- VM fonctionnelle : **5 points** (en intégrant les éléments de sécurité).
- Accès à la VM via échange de clés : **2 points**. (La clé publique à ajouter à votre VM est disponible en fin de TP).
- Réalisation des étapes présentées dans le TP : **5 points**.
- Fourniture d'un rapport illustrant les différentes étapes : **2 points**.
- Fourniture de la fiche serveur : **2 points**.

:::

## Introduction

Avant de commencer, il est important de savoir que la ligne de commande est un outil puissant et très utile. Maîtriser les rudiments de celle-ci vous permettra de gagner du temps et donc d’être plus efficace.

## Préparation

Pour réaliser ce TP, vous aurez besoin d'un environnement de Linux. Je vous propose d'en créer une en suivant le [TP précédent](./tp1b.md).

## Pré-requis

Dans ce TP nous allons utiliser l'accès SSH pour nous connecter à la VM.

Vous êtes prêt ?

<center>
<iframe src="https://giphy.com/embed/2uIlaHVsql55CLP3as" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

## Ressources

Pour réaliser ce TP, vous aurez besoin de :

- [Aide mémoire Debian](/cheatsheets/serveur/linux-debian-based.md)
- [Générateur de configuration](/cheatsheets/serveur/debian-reseau.md)
- [Aide mémoire clé SSH](/cheatsheets/ssh-key/)

## La VM

Pour ce TP je vais vous demander de créer une VM. Cette VM doit respecter les spécifications suivantes :

- Nom de la VM : `<votre nom>-ligne-de-commande`.
- OS : Debian 11.5
- Mémoire : 1Go (ou 2Go si vous utilisez le modèle).
- CPU : 1.
- Disque : 5Go (ou 8Go si vous utilisez le modèle).
- Utilisateur : `<votre nom>`.
- Mot de passe : `<votre mot de passe>` (mot de passe de votre choix, mais qui respecte les règles de sécurité).

::: tip Rappel

Ici je ne vais pas vous redonner les commandes, je vous laisse chercher dans les ressources :

- [Aide mémoire Debian](/cheatsheets/serveur/linux-debian-based.md)
- [TP précédent](./tp1b.md)
- [Créer une VM plus rapidement depuis un modèle](./tp1alt.md)
- Votre prise de notes

c'est à vous de jouer !

:::

### Étape 1 : Créez une VM

### Création complète de la VM

Dans cette version, vous allez devoir créer la VM depuis le début. Vous avez plus d'options, mais vous devez réaliser l'installation du système d'exploitation.

- [Consulter la documentation](./tp1.md)

### Création de la VM via un modèle <Badge type="tip" text="Meilleure solution" vertical="top" />

Dans cette version, vous allez créer votre VM à partir d'un modèle. Le modèle contient déjà le système d'exploitation et les logiciels installés. Vous n'avez plus qu'à configurer la VM (réseau, utilisateur, etc.).

- [Consulter la documentation](./tp1alt.md)

À l'aide des TP précédents, créez une VM qui respecte les spécifications ci-dessus.

### Étape 2 : Configurez la VM

Vérifier que votre VM respecte les spécifications suivantes :

- La VM doit avoir une IP statique. (Vous pouvez utiliser le générateur de configuration).
- La VM doit avoir accès à Internet (`ping www.google.com` doit fonctionner).
- La VM doit posséder les **vmtools** (`apt install open-vm-tools`)

### Étape 3 : Connectez-vous à la VM

Pour vous connecter à la VM, vous devez utiliser la commande `ssh` depuis votre machine hôte. Pour que cela fonctionne :

- Vous devez avoir installé le serveur SSH sur votre VM (voir [TP précédent](./tp1b.md)).
- Vous devez avoir généré une clé SSH sur votre machine hôte et l'avoir ajoutée à votre VM (voir [TP précédent](./tp1b.md)).
- L'accès par mot de passe doit être désactivé sur votre VM (voir [TP précédent](./tp1b.md)).
- L'accès `root` par SSH doit être désactivé sur votre VM (voir [TP précédent](./tp1b.md)).

::: details Rappel sur la clé SSH

Pour installer votre clé SSH sur votre serveur, il vous suffit de faire la commande suivante sur votre ordinateur.

```bash
ssh-copy-id <username>@<ipaddress>
```

⚠️ Vous devez évidemment remplacer `<username>`et `<ipaddress>`par votre utilisateur et votre mot de passe. Exemple :

```bash
ssh-copy-id pi@192.168.1.253
```

Rien de plus, à partir de maintenant votre serveur acceptera votre connexion sans vous demander de mot de passe. Pratique non ? (Et surtout très sécurisé)

:::

## Les commandes de base

Nous avons maintenant une VM qui fonctionne. Nous allons maintenant nous intéresser à l'OS et les programmes qui y sont installés. Avant de commencer, nous allons voir comment utiliser les bases de la ligne de commande.

- `ls` : Liste les fichiers et dossiers. (Exemple : `ls -l` affiche les fichiers et dossiers avec les permissions).
- `cd` : Change de dossier. (Exemple : `cd /var/log` change de dossier pour aller dans le dossier `/var/log`).
- `mkdir` : Crée un dossier. (Exemple : `mkdir /var/log/mon-dossier` crée le dossier `/var/log/mon-dossier`).
- `touch` : Crée un fichier. (Exemple : `touch /var/log/mon-fichier` crée le fichier `/var/log/mon-fichier`).
- `rm` : Supprime un fichier. (Exemple : `rm /var/log/mon-fichier` supprime le fichier `/var/log/mon-fichier`).
- `rm -r` : Supprime un dossier. (Exemple : `rm -r /var/log/mon-dossier` supprime le dossier `/var/log/mon-dossier`).
- `mv` : Déplace un fichier. (Exemple : `mv /var/log/mon-fichier /var/log/mon-dossier` déplace le fichier `/var/log/mon-fichier` dans le dossier `/var/log/mon-dossier`).
- `cp` : Copie un fichier. (Exemple : `cp /var/log/mon-fichier /var/log/mon-dossier` copie le fichier `/var/log/mon-fichier` dans le dossier `/var/log/mon-dossier`).
- `cat` : Affiche le contenu d'un fichier. (Exemple : `cat /var/log/syslog` affiche le contenu du fichier syslog).
- `nano` : Éditeur de texte (_personnellement je préfère `vim`_). (Exemple : `nano /var/log/mon-fichier` ouvre le fichier `/var/log/mon-fichier` dans l'éditeur de texte).
- `tail` : Affiche les dernières lignes d'un fichier. (Exemple : `tail -f /var/log/syslog` affiche les dernières lignes du fichier syslog en temps réel).

Il existe de nombreuses autres commandes, mais celles-ci sont les plus utilisées. **Il est important de savoir les utiliser.**

::: tip Quelques astuces

- La touche `tab` : permets de compléter une commande ou un chemin de fichier.
- `!!` : permet de répéter la dernière commande.
- `ctlr + r` : permet de rechercher une commande dans l'historique.
- `échap puis :wq` : permet de sauvegarder et quitter un fichier ouvert avec `vim`.
- `échap puis :q!` : permet de quitter un fichier ouvert avec `vim` sans sauvegarder.

:::

### Créer une arborescence

À l'aide des commandes vues précédemment, créez une arborescence qui respecte les spécifications suivantes :

- Créez un dossier `vbrosseau` dans le dossier `/home/`.
- Créez un dossier `tp1` dans le dossier `/home/vbrosseau/`.
- Créez un fichier `fichier1.md` dans le dossier `/home/vbrosseau/tp1/`. (deux solutions possibles, via `touch` ou via `nano`).
- Créez un fichier `fichier2.md` dans le dossier `/home/vbrosseau/tp1/`. (deux solutions possibles, via `touch` ou via `nano`).
- Mettre le contenu suivant dans le fichier `fichier1` :

```bash
Voici le contenu du fichier 1.

- Ligne 1
- Ligne 2
- Ligne 3
```

- Mettre le contenu suivant dans le fichier `fichier2` :

```bash
Voici le contenu du fichier 2.

- Ligne 1
- Ligne 2
- Ligne 3
```

- Déplacez le fichier `fichier1.md` dans le dossier `/home/vbrosseau/`.
- Dupliquez le fichier `fichier2.md` dans le dossier `/home/vbrosseau/tp1/` et renommez-le `fichier2bis.md`.
- Renommez le fichier `fichier1.md` en `introduction.md`.
- Changer le contenu du fichier `introduction.md` pour qu'il contienne :

```bash
Avec ce fichier je vais avoir une bonne note.
```

::: details Solution (je vous conseille de faire l'exercice avant de regarder la solution)

```bash
mkdir /home/vbrosseau
mkdir /home/vbrosseau/tp1
touch /home/vbrosseau/tp1/fichier1.md
touch /home/vbrosseau/tp1/fichier2.md
nano /home/vbrosseau/tp1/fichier1.md
nano /home/vbrosseau/tp1/fichier2.md
mv /home/vbrosseau/tp1/fichier1.md /home/vbrosseau/
cp /home/vbrosseau/tp1/fichier2.md /home/vbrosseau/tp1/fichier2bis.md
mv /home/vbrosseau/fichier1.md /home/vbrosseau/introduction.md
nano /home/vbrosseau/introduction.md
```

:::

### Installer un serveur web

Notre serveur a maintenant besoin d'un service Web (HTML seulement), nous allons donc y installer Apache. Nous allons utiliser la commande `apt` pour installer Apache.

- Installez Apache avec la commande `apt`.
- Vérifiez que le service Apache est bien lancé.

::: tip Comment faire ? 
Je vous laisse regarder dans les ressources du TP précédent (voir [TP précédent](./tp1b.md)). Pour voir comment installer Apache.
:::

::: details Solution (je vous conseille de faire l'exercice avant de regarder la solution)

```bash
apt update
apt install apache2
systemctl status apache2
```

:::

### Les permissions

Afin que votre utilisateur puisse modifier le code de votre site, vous devez modifier les permissions du dossier `/var/www/` :

```bash
chown -R <VOTRE-UTILISATEUR>:www-data /var/www/
```

#### Créer votre page web

Vous êtes en SLAM, du coup le Web vous conaissez ? Je vous propose de créez une page web qui respecte les spécifications suivantes :

- Le titre de la page doit être `TC 5`.
- Le titre principal de la page doit être `TC 5`.
- Le texte de la page doit être `Bienvenue sur la page de TC 5`.
- Le texte de la page doit être en rouge et en gras et centré.
- Votre page doit contenir 3 liens vers les pages suivantes :
  - [Google](https://www.google.com)
  - [Facebook](https://www.facebook.com)
  - [Twitter](https://www.twitter.com)
- **Pour l'instant pas de PHP car notre serveur n'est pas configuré pour.**

Où devez-vous placer votre page web pour qu'elle soit accessible depuis l'extérieur ? Par défaut, Apache place les pages web dans le dossier `/var/www/html/`.

Je vous laisse éditer le fichier `/var/www/html/index.html` pour y mettre votre page web.

::: details Solution (je vous conseille de faire l'exercice avant de regarder la solution)

```bash
nano /var/www/html/index.html
```

:::

Une fois le fichier édité, vous pouvez le visualiser en ouvrant votre navigateur et en tapant l'adresse IP de votre serveur.

### Vérifier les logs

Maintenant que vous avez un serveur web, il est important de vérifier les logs pour voir si tout se passe bien. Pour cela, nous allons utiliser la commande `tail`.

- Affichez les logs d'Apache en temps réel.
- Affichez les logs d'Apache pour les 10 dernières lignes.

```bash
tail -f /var/log/apache2/access.log
```

```bash
tail -n 10 /var/log/apache2/access.log
```

Vous pouvez aussi afficher l'ensemble des logs avec la commande :

```bash
nano /var/log/apache2/access.log
```

🚨 Je vous laisse tester, normalement vous devriez voir les logs de vos connexions au serveur. Vous pouvez le voir en temps réel avec la commande `tail -f` et en accédant à votre page web depuis votre navigateur.

PS: N'oubliez pas de quitter la commande `tail -f` avec `CTRL + C` pour pouvoir continuer le TP.
PS2: N'oubliez pas que vous devez me restituer un document PDF en fin de TP qui contient vos observations.

## Évolution du site

Afin de rendre votre site plus attractif, vous allez ajouter une page `apropos.html` qui contiendra les informations de contact de votre site. Celle-ci devra contenir les informations suivantes :

- Nom de l'école : `Lycée Chevrollier`.
- Votre nom & prénom.
- Une description de votre site.
- La date de réalisation du site.

Cette page devra être accessible depuis la page `index.html` via un lien nommé `A propos` et pointant vers la page `pages/apropos.html`.

::: tip Comment faire ?

En vous aidant des étapes précédentes, vous devriez pouvoir créer votre page `apropos.html` et la rendre accessible depuis la page `index.html`.

Bon courage !

:::

## Me donner accès à votre serveur

Votre réalisation est maintenant terminée, il est temps de me donner accès à votre serveur pour que je puisse vérifier votre travail. Nous avons vu dans le TP précédent comment autoriser votre clé SSH sur le serveur. Évidemment, je ne vais pas vous demander votre clé SSH, mais je vais vous fournir ma clé SSH **publique**.

La procédure est la suivante :

- Récupérez ma clé SSH publique (télécharger le fichier [ici](https://gist.githubusercontent.com/c4software/7902465cf82695ab5260a202757fe0ca/raw/dda707234b009333483556da61f8a990e08215ed/id_rsa_etudiant.pub)).
- Ajouter le contenu du fichier `id_rsa_etudiant.pub` dans le fichier `~/.ssh/authorized_keys` de votre utilisateur sur le serveur (exemple : `/home/vbrosseau/.ssh/authorized_keys`).
  - Vous pouvez utiliser `nano` ou `vim` pour éditer le fichier.
- Vous pouvez également le faire via la commande curl :

```bash
su - # Se connecter en tant que root
apt install curl # Installer curl si ce n'est pas déjà fait
exit # Se déconnecter en tant que root
curl https://gist.githubusercontent.com/c4software/7902465cf82695ab5260a202757fe0ca/raw/dda707234b009333483556da61f8a990e08215ed/id_rsa_etudiant.pub >> ~/.ssh/authorized_keys # Ajouter la clé SSH publique dans le fichier authorized_keys
```

::: tip À la fin de cette étape, votre fichier `authorized_keys` devrait ressembler à ça :

```bash
ssh-rsa VotreClé ...
ssh-rsa MaClé ...
```

:::

À présent, si vous me donnez l'adresse IP de votre serveur, je pourrais me connecter dessus et vérifier votre travail. Si vous avez des problèmes, n'hésitez pas à me contacter.

::: danger Attention

En réalisant cette étape, vous me donnez accès à votre serveur. Je ne ferai rien de malveillant, mais je vous conseille de ne pas laisser votre serveur accessible à tout le monde. Vous ne devez ajouter que des personnes de confiance dans le fichier `authorized_keys`.

Si vous avez bien réalisé les étapes précédentes, je ne devrais pas avoir accès en root à votre serveur. Les modifications que je pourrais faire seront limitées à votre utilisateur, mais c'est quand même mieux de ne pas laisser votre serveur accessible à tout le monde…

:::

## Restitution

Pour restituer le projet, merci de me fournir les éléments suivants :

- L'adresse IP de votre serveur.
- Votre fiche serveur.
- Rapport illustrant les différentes étapes.

Le rendu se fera via le formulaire suivant : [Rendre le TP](https://forms.gle/1U7j3Wwku1gpNMDf6)

Bravo vous avez terminé le TP !

::: details Comment sera validé la partie VM ?

Pour valider la partie VM, je vais utiliser le script suivant :

```bash
#!/bin/bash

# Définir le chemin du fichier CSV contenant les informations de connexion
csv_file="./input.csv"

# Fonction pour se connecter en SSH et exécuter une commande
function ssh_execute {
    ssh -i ~/.ssh/id_rsa_etudiant "${remote_user}@${remote_host}" "$1"
}

echo "Validation des VMs"
echo "VM Name;OS;Memory;CPU;Disk;index.html;apropos.html" > vm_check_result.csv


# Boucle sur chaque ligne du fichier CSV
awk -F";" '{print $1, $2}' "${csv_file}" | while read user ip; do
    echo "Validation pour l'utilisateur ${user} avec l'adresse IP ${ip}."

    # Définir les paramètres de la machine distante
    remote_host="${ip}"
    remote_user="${user}"

    # Définir les paramètres de la VM
    vm_name="-ligne-de-commande"

    # Vérifier le nom de la VM
    vm_name_result=$(ssh_execute "hostname")

    # Vérifier l'OS
    os_result=$(ssh_execute "lsb_release -ds")

    # Vérifier la mémoire 
    memory_result=$(ssh_execute "awk '/MemTotal/{print \$2}' /proc/meminfo")

    # Vérifier le CPU
    cpu_result=$(ssh_execute "nproc")

    # Vérifier le disque
    disk_result=$(ssh_execute "df -h | grep '/dev/sda1'" | awk '{print $2}')

    index_check=$(ssh_execute "wget -qO- http://localhost/index.html | grep -q 'TC 5' && echo 'true' || echo 'false'")
    apropos_check=$(ssh_execute "wget -qO- http://localhost/apropos.html | grep -q 'html' && echo 'true' || echo 'false'")


    # Enregistrer les résultats dans un fichier CSV
    echo "${vm_name_result};${os_result};${memory_result};${cpu_result};${disk_result};${index_check};${apropos_check}" >> vm_check_result.csv
done
```

:::


<center>
<iframe src="https://giphy.com/embed/4PXUYM1bXS3lRXO7lX" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>