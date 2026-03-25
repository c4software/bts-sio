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
- OS : Debian 13
- Mémoire : 1Go (ou 4Go si vous utilisez le modèle).
- CPU : 1.
- Disque : 5Go (ou 20Go si vous utilisez le modèle).
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

Rien de plus, à partir de maintenant votre serveur acceptera votre connexion sans vous demander de mot de passe. Pratique, non ? (Et surtout très sécurisé)

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

- Créez un dossier `restitution` dans le dossier `/home/`.
- Créez un dossier `tp1` dans le dossier `/home/restitution/`.
- Créez un fichier `fichier1.md` dans le dossier `/home/restitution/tp1/`. (deux solutions possibles, via `touch` ou via `nano`).
- Créez un fichier `fichier2.md` dans le dossier `/home/restitution/tp1/`. (deux solutions possibles, via `touch` ou via `nano`).

::: danger Problème de droits ?

Si vous avez un problème de droits, c'est normal. Vous devez modifier les droits des dossiers et fichiers pour que votre utilisateur puisse les modifier. Dans un premier temps créer le dossier `/home/restitution` en root (`sudo mkdir /home/restitution`) puis changer le propriétaire du dossier (`sudo chown -R <votre utilisateur>:<votre utilisateur> /home/restitution`). Vous pourrez ensuite créer les dossiers et fichiers sans problème.

:::

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

- Déplacez le fichier `fichier1.md` dans le dossier `/home/restitution/`.
- Dupliquez le fichier `fichier2.md` dans le dossier `/home/restitution/tp1/` et renommez-le `fichier2bis.md`.
- Renommez le fichier `fichier1.md` en `introduction.md`.
- Changer le contenu du fichier `introduction.md` pour qu'il contienne :

```bash
Avec ce fichier je vais avoir une bonne note.
```

### Installer des logiciels

Dans ce TP je vous demande d'installer les logiciels suivants :

- `htop` : Un gestionnaire de tâches.
- `cmatrix` : Un économiseur d'écran en mode terminal.
- `curl` : Un outil pour récupérer des fichiers depuis le Web.

Pour rappel, pour installer un logiciel sur un système Debian, vous pouvez utiliser la commande `apt`.

### Télécharger le fichier `valeurs.md`

À l'aide de curl, téléchargez le fichier `valeurs.md` depuis le lien suivant :

`https://gist.githubusercontent.com/c4software/65d2003034854fc705f4806ef07bace6/raw/d6e4a967cf058f53a176007898bb2da3b4db4d06/gistfile1.txt`

Pour cela, vous pouvez utiliser la commande suivante :

```bash
curl https://gist.githubusercontent.com/c4software/65d2003034854fc705f4806ef07bace6/raw/d6e4a967cf058f53a176007898bb2da3b4db4d06/gistfile1.txt > /home/restitution/valeurs.md
```

Ici, `>` permet de rediriger la sortie de la commande `curl` vers le fichier `valeurs.md`. Vous pouvez ensuite vérifier que le fichier a bien été téléchargé en utilisant la commande `cat` (`cat /home/restitution/valeurs.md`).

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
systemctl enable apache2
```

:::

### Gérer les permissions

Actuellement vous utilisez un utilisateur, celui-ci va créer des fichiers et des dossiers en son nom. Il est important de savoir comment gérer les droits sur ces fichiers et dossiers. Linux est un système multi-utilisateur, vous ne vous en rendez pas compte, mais beaucoup d'applications tournent en arrière-plan et ont besoin de droits spécifiques pour fonctionner.

::: danger Un utilisateur différent ?

Et oui, si vous regardez avec la commande `ps aux` vous verrez que de nombreux processus tournent avec un utilisateur différent du vôtre. Par exemple, Apache tourne avec l'utilisateur `www-data`. C'est pour cela que nous allons voir comment gérer les droits sur les fichiers et dossiers.

:::

### Le dossier `/var/www/`

Afin que votre utilisateur puisse modifier le code de votre site, vous devez modifier les permissions du dossier `/var/www/` :

```bash
chown -R <VOTRE-UTILISATEUR>:www-data /var/www/
```

::: tip Les droits de base

Le dossier `/var/www/` sont uniquement accessible pour l'utilisateur :

- `www-data` : C'est l'utilisateur qui va exécuter le serveur web.
- `root` : C'est l'utilisateur qui a tous les droits sur le système.

En modifiant les droits du dossier `/var/www/` vous permettez à votre utilisateur de modifier les fichiers et dossiers du site web.

:::

### Les droits

En plus des propriétaires, les fichiers et dossiers ont des droits. Ces droits sont représentés par des lettres et des chiffres. Les droits sont divisés en trois parties :

- Le propriétaire.
- Le groupe.
- Les autres.

Par exemple, si vous avez les droits suivants sur un fichier :

```bash
-rwxr-xr--
```

- `r` : Permet de lire le fichier.
- `w` : Permet de modifier le fichier.
- `x` : Permet d'exécuter le fichier.

Dans l'exemple ci-dessus, le propriétaire a tous les droits, le groupe a le droit de lire et d'exécuter le fichier et les autres n'ont aucun droit.

Si vous souhaitez modifier les droits d'un fichier ou d'un dossier, vous pouvez utiliser la commande `chmod`. Par exemple, pour donner tous les droits à un fichier :

```bash
chmod ugo+rwx fichier
```

Ici, `u` signifie utilisateur, `g` signifie groupe et `o` signifie autres. `rwx` signifie lire, écrire et exécuter. Il est également possible d'utiliser des chiffres pour définir les droits. Par exemple, pour donner tous les droits à un fichier :

```bash
chmod 777 fichier
```

Ici `777` équivaut à `ugo+rwx`.

::: danger Attention danger

Il est important de ne pas donner des droits trop permissifs à un fichier ou un dossier. Cela peut entraîner des problèmes de sécurité. Par exemple, si vous donnez tous les droits à un fichier, n'importe qui pourra le modifier.

Si vous êtes entrain de faire un 777, vous êtes très probablement en train de faire une erreur. Il est important de bien comprendre les droits et de ne donner que les droits nécessaires.

:::

### Modifier les permissions

Avec les commandes vues précédemment, modifiez les permissions des fichiers et dossiers suivants :

- Donnez tous les droits à l'utilisateur sur le fichier `introduction.md` (`rwx`).
- Changer le propriétaire du fichier `introduction.md` pour qu'il appartienne à votre utilisateur.

Créer un script nommé `hello.sh` dans le dossier `/home/restitution/` celui-ci doit contenir :

```bash
#!/bin/bash

echo "Hello World"
```

- Donner les droits d'exécution au fichier `hello.sh` (`chmod +x hello.sh`).
- Exécutez le script `hello.sh` en utilisant la commande `./hello.sh` (`./` permets d'exécuter un script dans le dossier courant).

::: tip Bravo !

Vous venez de faire votre premier script shell. En plus, vous avez vu comment le rendre exécutable pour le lancer via la ligne de commande.

:::

#### Créer votre page web

Vous êtes en SLAM, du coup le Web vous connaissez ? Je vous propose de créer une page web qui respecte les spécifications suivantes :

- Le titre de la page doit être `TC 5`.
- Le titre principal de la page doit être `TC 5`.
- Le texte de la page doit être `Bienvenue sur la page de TC 5`.
- Le texte de la page doit être en rouge et en gras et centré.
- Votre page doit contenir 3 liens vers les pages suivantes :
  - [Google](https://www.google.com)
  - [Facebook](https://www.facebook.com)
  - [Twitter](https://www.twitter.com)
- **Pour l'instant pas de PHP car notre serveur n'est pas configuré pour.**

::: tip Important pour la validation
Pour que la validation automatique fonctionne, utilisez exactement `TC 5` dans votre page. Sauf si vous voulez perdre des points, bien sûr.
:::

Où devez-vous placer votre page web pour qu'elle soit accessible depuis l'extérieur ? Par défaut, Apache place les pages web dans le dossier `/var/www/html/`.

Je vous laisse éditer le fichier `/var/www/html/index.html` pour y mettre votre page web.

::: details Solution (je vous conseille de faire l'exercice avant de regarder la solution)

```bash
echo "" > /var/www/html/index.html # Efface le contenu du fichier
vim /var/www/html/index.html
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

## Finalisation de votre site

Ajouter une page `contact.html` qui contiendra un formulaire de contact. Ce formulaire devra contenir les champs suivants :

- Nom.
- Prénom.
- Email.
- Message.

Pour l'instant le formulaire ne doit pas être fonctionnel, il doit juste être présent sur la page.

Ce formulaire devra être accessible depuis la page `index.html` via un lien nommé `Contact` et pointant vers la page `pages/contact.html`.

## Me donner accès à votre serveur

Votre réalisation est maintenant terminée, il est temps de me donner accès à votre serveur pour que je puisse vérifier votre travail. Nous avons vu dans le TP précédent comment autoriser votre clé SSH sur le serveur. Évidemment, je ne vais pas vous demander votre clé SSH, mais je vais vous fournir ma clé SSH **publique**.

La procédure est la suivante :

- Récupérez ma clé SSH publique (télécharger le fichier [ici](https://gist.githubusercontent.com/c4software/7902465cf82695ab5260a202757fe0ca/raw/dda707234b009333483556da61f8a990e08215ed/id_rsa_etudiant.pub)).
- Ajouter le contenu du fichier `id_rsa_etudiant.pub` dans le fichier `~/.ssh/authorized_keys` de votre utilisateur sur le serveur (exemple : `/home/vbrosseau/.ssh/authorized_keys`).
  - Vous pouvez utiliser `nano` ou `vim` pour éditer le fichier.
- Vous pouvez également le faire via la commande curl :

```bash
sudo apt install -y curl # Installer curl si ce n'est pas déjà fait
mkdir -p ~/.ssh && chmod 700 ~/.ssh
curl https://gist.githubusercontent.com/c4software/7902465cf82695ab5260a202757fe0ca/raw/dda707234b009333483556da61f8a990e08215ed/id_rsa_etudiant.pub >> ~/.ssh/authorized_keys # Ajouter la clé SSH publique dans le fichier authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Ou via un passage en root
sudo su - # Passer en root
apt install -y curl # Installer curl si ce n'est pas déjà fait
exit # Quitter le mode root

# Suite de la commande précédente
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
- Votre fiche serveur (avec les informations de votre serveur, et si vous avez utilisé un modèle ou non).
- Rapport illustrant les différentes étapes.

Le rendu se fera via le formulaire suivant : [Rendre le TP](https://forms.gle/1U7j3Wwku1gpNMDf6)

Bravo vous avez terminé le TP !

::: details Comment sera validée la partie VM ?

Pour valider la partie VM, je vais utiliser le script suivant :

```bash
#!/bin/bash

function ssh_execute {
  local user="$1"
  local target="$2"
  local cmd="$3"

  # Parser IP et PORT
  local host port
  if [[ "$target" == *:* ]]; then
    host="${target%:*}"
    port="${target##*:}"
  else
    host="$target"
    port="22"
  fi

  # ssh-keygen -R attend [host]:port pour les ports non-22
  if [ "$port" = "22" ]; then
    ssh-keygen -R "$host" > /dev/null 2>&1
  else
    ssh-keygen -R "[$host]:$port" > /dev/null 2>&1
  fi

  ssh -o "PreferredAuthentications=publickey" \
      -o "CheckHostIP=no" \
      -o "StrictHostKeyChecking=no" \
      -o "BatchMode=yes" \
      -o "ConnectTimeout=5" \
      -p "$port" \
      -i ~/.ssh/id_rsa_etudiant \
      "$user"@"$host" "$cmd" 2>/dev/null
}

echo "Validation des VMs"
echo "Etudiant;echange;VM Name;OS;Memory;CPU;Disk;index.html;apropos.html;contact.html;restitution;tp1;fichier1.md;fichier2.md;fichier2bis.md;introduction.md;htop;cmatrix;curl;valeurs.md;hello.sh;bonus_check_sh;bonus_backup_sh;bonus_restore_sh;bonus_cron;note" > vm_check_result.csv

array=(
  "utilisateur;ip.de.la.machine"
  # "etudiant2;192.168.1.42:2222"
)

for i in "${array[@]}"
do
    IFS=';' read -ra parts <<< "$i"

    etudiant="${parts[0]}"
    user="${parts[0]}"
    target="${parts[1]}"

    echo "Validation de la VM $user@$target"

    # Test de connexion SSH
    ssh_execute "$user" "$target" "exit"
    if [ $? -ne 0 ]; then
        user="vbrosseau"
    fi

    if [ "$user" = "vbrosseau" ]; then
      echange="0"
    else
      echange="1"
    fi

    # Infos système
    vm_name_result=$(ssh_execute "$user" "$target" "hostname")
    os_result=$(ssh_execute "$user" "$target" "lsb_release -ds")
    memory_result=$(ssh_execute "$user" "$target" "awk '/MemTotal/{print \$2}' /proc/meminfo")
    cpu_result=$(ssh_execute "$user" "$target" "nproc")
    disk_result=$(ssh_execute "$user" "$target" "df -h | grep '/dev/sda1' | awk '{print \$2}'")

    # Arborescence
    restitution_check=$(ssh_execute "$user" "$target" "[ -d /home/restitution ] && echo 'true' || echo 'false'")
    tp1_check=$(ssh_execute "$user" "$target" "[ -d /home/restitution/tp1 ] && echo 'true' || echo 'false'")
    fichier1_check=$(ssh_execute "$user" "$target" "[ -f /home/restitution/fichier1.md ] && echo 'true' || echo 'false'")
    fichier2_check=$(ssh_execute "$user" "$target" "[ -f /home/restitution/tp1/fichier2.md ] && echo 'true' || echo 'false'")
    fichier2bis_check=$(ssh_execute "$user" "$target" "[ -f /home/restitution/tp1/fichier2bis.md ] && echo 'true' || echo 'false'")
    introduction_check=$(ssh_execute "$user" "$target" "[ -f /home/restitution/introduction.md ] && echo 'true' || echo 'false'")
    hello_check=$(ssh_execute "$user" "$target" "[ -f /home/restitution/hello.sh ] && echo 'true' || echo 'false'")

    # Logiciels
    htop_check=$(ssh_execute "$user" "$target" "dpkg -l | grep -q htop && echo 'true' || echo 'false'")
    cmatrix_check=$(ssh_execute "$user" "$target" "dpkg -l | grep -q cmatrix && echo 'true' || echo 'false'")
    curl_check=$(ssh_execute "$user" "$target" "dpkg -l | grep -q curl && echo 'true' || echo 'false'")

    # Fichier téléchargé
    valeurs_check=$(ssh_execute "$user" "$target" "[ -f /home/restitution/valeurs.md ] && echo 'true' || echo 'false'")

    # Pages web
    index_check=$(ssh_execute "$user" "$target" "wget --timeout=5 -qO- http://localhost/index.html | grep -q 'TC 5' && echo 'true' || echo 'false'")
    apropos_check=$(ssh_execute "$user" "$target" "wget --timeout=5 -qO- http://localhost/pages/apropos.html | grep -q 'html' && echo 'true' || echo 'false'")
    contact_check=$(ssh_execute "$user" "$target" "wget --timeout=5 -qO- http://localhost/pages/contact.html | grep -q 'form' && echo 'true' || echo 'false'")

    # Bonus
    bonus_check_sh=$(ssh_execute "$user" "$target" "[ -f /home/restitution/check_tp1c.sh ] && echo 'true' || echo 'false'")
    bonus_backup_sh=$(ssh_execute "$user" "$target" "[ -f /home/restitution/backup_restitution.sh ] && echo 'true' || echo 'false'")
    bonus_restore_sh=$(ssh_execute "$user" "$target" "[ -f /home/restitution/restore_restitution.sh ] && echo 'true' || echo 'false'")
    bonus_cron=$(ssh_execute "$user" "$target" "crontab -l 2>/dev/null | grep -q 'backup_restitution' && echo 'true' || echo 'false'")

    # --- Calcul de la note ---
    note=0

    # VM fonctionnelle + sécurité : 5 pts (évaluation manuelle, on met 5 si SSH ok)
    # On accorde les 5 pts si la connexion SSH fonctionne avec la bonne clé
    [ "$echange" = "1" ] && note=$(echo "$note + 5" | bc)

    # Échange de clés : 2 pts
    [ "$echange" = "1" ] && note=$(echo "$note + 2" | bc)

    # Étapes du TP : 5 pts répartis sur les éléments vérifiables (~0.33 pt chacun)
    tp_items=(
      "$restitution_check" "$tp1_check" "$fichier1_check" "$fichier2_check"
      "$fichier2bis_check" "$introduction_check" "$hello_check"
      "$htop_check" "$cmatrix_check" "$curl_check" "$valeurs_check"
      "$index_check" "$apropos_check" "$contact_check"
    )
    tp_ok=0
    for item in "${tp_items[@]}"; do
      [ "$item" = "true" ] && tp_ok=$((tp_ok + 1))
    done
    tp_score=$(echo "scale=2; $tp_ok * 5 / ${#tp_items[@]}" | bc)
    note=$(echo "$note + $tp_score" | bc)

    # Rapport PDF + fiche serveur : 4 pts → évaluation manuelle, non inclus ici

    # Bonus : 0.25 pt chacun
    [ "$bonus_check_sh"  = "true" ] && note=$(echo "$note + 0.25" | bc)
    [ "$bonus_backup_sh" = "true" ] && note=$(echo "$note + 0.25" | bc)
    [ "$bonus_restore_sh"= "true" ] && note=$(echo "$note + 0.25" | bc)
    [ "$bonus_cron"      = "true" ] && note=$(echo "$note + 0.25" | bc)

    echo "${etudiant};${echange};${vm_name_result};${os_result};${memory_result};${cpu_result};${disk_result};${index_check};${apropos_check};${contact_check};${restitution_check};${tp1_check};${fichier1_check};${fichier2_check};${fichier2bis_check};${introduction_check};${htop_check};${cmatrix_check};${curl_check};${valeurs_check};${hello_check};${bonus_check_sh};${bonus_backup_sh};${bonus_restore_sh};${bonus_cron};${note}" >> vm_check_result.csv

    echo "Validation de la VM $user@$target terminée — note auto: $note/12 (rapport/fiche: +4 pts manuel)"
done
```

:::

<center>
<iframe src="https://giphy.com/embed/4PXUYM1bXS3lRXO7lX" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

## Bonus

Vous avez terminé le TP ? Bravo 👏

Pour aller plus loin, je vous propose 3 bonus de difficulté croissante.

::: tip Important

Ces bonus sont **optionnels** et ne remplacent pas les étapes obligatoires du TP.

:::

### Bonus 1 : Prendre en main Vim avec Vim Adventures <Badge type="tip" text="Facile" vertical="top" />

Dans une démarche DevOps, on travaille régulièrement en SSH sur des machines distantes. Dans ce contexte, savoir utiliser `vim` est un vrai gain de temps.

Pour ce bonus, entraînez-vous avec [Vim Adventures](https://vim-adventures.com/) puis appliquez immédiatement ce que vous avez appris sur votre VM.

Alternative à Vim Adventures : [Open Vim](https://openvim.com/), un tutoriel interactif pour apprendre les bases de `vim`.

#### Pourquoi Vim Adventures ?

Vim Adventures est un jeu en ligne qui vous permet d'apprendre les commandes de base de `vim` de manière ludique. C'est une excellente façon de se familiariser avec l'éditeur de texte `vim` sans se sentir perdu.

Personnaliser VIM pour le rendre plus agréable à utiliser est aussi une bonne idée.

```bash
cat >> ~/.vimrc <<'EOF'
" ========================
" Interface
" ========================
syntax on
set number
set cursorline
set ruler
set showcmd
set showmatch
set laststatus=2
set signcolumn=yes

" ========================
" Navigation
" ========================
set scrolloff=8
set mouse=a

" ========================
" Recherche
" ========================
set ignorecase
set smartcase
set incsearch
set hlsearch

" ========================
" Indentation
" ========================
set autoindent
set smartindent
set expandtab
set shiftwidth=4
set tabstop=4
set softtabstop=4

" ========================
" Edition
" ========================
set nowrap
set clipboard=unnamedplus

" ========================
" Fichiers
" ========================
set undofile
set undodir=~/.vim/undo
set nobackup
set nowritebackup

" ========================
" Complétion
" ========================
set wildmenu
set wildmode=longest:full,full
set completeopt=menuone,noinsert,noselect
EOF

mkdir -p ~/.vim/undo # Permet de stocker les fichiers d'undo pour la fonctionnalité d'undo persistante
```

::: tip Explications

Vim est minimaliste par défaut, ce qui peut être déroutant pour les débutants. Ce fichier de configuration ajoute des fonctionnalités essentielles pour une expérience de codage plus agréable, comme la coloration syntaxique, les numéros de ligne, une meilleure gestion de l'indentation, et une navigation plus fluide.

:::

### Bonus 2 : Script de vérification automatique <Badge type="tip" text="Moyenne difficulté" vertical="top" />

Dans ce bonus, vous allez poser un premier bloc d'automatisation DevOps.

Créez un script `/home/restitution/check_tp1c.sh` qui vérifie automatiquement :

- la présence des dossiers et fichiers demandés dans le TP ;
- la présence des paquets `htop`, `cmatrix`, `curl` ;
- la présence du fichier `valeurs.md`.

Le script doit afficher un résultat lisible : `OK` ou `KO` pour chaque point, puis un résumé final.

::: tip Pourquoi ce bonus ?

En DevOps, l'objectif n'est pas seulement de faire, mais aussi de **vérifier rapidement et de manière reproductible**.

:::

::: details Indices

- Commencez par vérifier 2 éléments, puis complétez progressivement.
- Utilisez des tests bash simples (fichier, dossier, paquet).
- N'oubliez pas de rendre votre script exécutable avant de le lancer. (droit `+x` nécessaire).

Pour vérifier un paquet, vous pouvez utiliser la commande suivante :

```bash
dpkg -l | grep -q htop && echo "htop : OK" || echo "htop : KO"
```

Pour vérifier la présence d'un fichier, vous pouvez utiliser la commande suivante :

```bash
[ -f /home/restitution/valeurs.md ] && echo "valeurs.md : OK" || echo "valeurs.md : KO"
```

Vous pouvez faire de même pour les dossiers avec `-d` au lieu de `-f`. En bash, vous pouvez également faire des boucles pour réduire la répétition de code. Par exemple, pour vérifier plusieurs fichiers :

```bash
for file in votre_fichier1 votre_fichier2 votre_fichier3; do
  [ -f /home/restitution/$file ] && echo "$file : OK" || echo "$file : KO"
done
```

Et vous pouvez bien évidemment aller plus loin en déclarant des variables et des fonctions pour rendre votre script plus lisible et maintenable, exemple :

```bash
check_file() {
  if [ -f "$1" ]; then
    echo "$1 : OK"
  else
    echo "$1 : KO"
  fi
}

check_package() {
  if dpkg -l | grep -q "$1"; then
    echo "$1 : OK"
  else
    echo "$1 : KO"
  fi
}

check_file /home/restitution/valeurs.md
check_package htop

# Et il est toujours possible de faire une boucle
files=(votre-fichier1 votre-fichier2 votre-fichier3)
for file in "${files[@]}"; do
  check_file "/home/restitution/$file"
done

```

:::

### Bonus 3 : Sauvegarde et restauration <Badge type="warning" text="Difficile" vertical="top" />

Ce bonus introduit une pratique centrale en DevOps : sécuriser ses livrables avec une sauvegarde testée.

Objectif :

1. Créez un script `backup_restitution.sh` qui archive `/home/restitution` dans un fichier compressé daté.
2. Créez un script `restore_restitution.sh` qui restaure une archive dans `/home/restore-test`.
3. Vérifiez que les fichiers restaurés sont bien présents et lisibles.

::: danger Attention

Une sauvegarde non testée n'est pas une sauvegarde fiable. Vous devez toujours vérifier la restauration.

:::

::: details Indices

- Format attendu pour l'archive : `.tar.gz`.
- Ajoutez la date dans le nom du fichier de sauvegarde.
- Vérifiez le résultat avec `ls` et `cat` sur quelques fichiers.
- Vous pouvez créer un fichier avec la date en utilisant la syntaxe suivante : `backup_$(date +%Y%m%d).tar.gz`.
- Pour compresser un dossier, vous pouvez utiliser la commande suivante : `tar -czvf VOTRE-ARCHIVE.tar.gz le-chemin-a-compresser`.
- Pour restaurer une archive, vous pouvez utiliser la commande suivante : `tar -xzvf VOTRE-ARCHIVE.tar.gz -C le-chemin-de-restauration`.

:::

::: tip Bravo 👏

Si vous réalisez les 3 bonus, vous aurez déjà de très bons réflexes DevOps : automatiser, vérifier, sauvegarder, restaurer.

:::

### Bonus 4 : Automatisation des sauvegardes avec cron <Badge type="warning" text="Technique" vertical="top" />

::: tip Prérequis

Ce bonus s'appuie sur le script `backup_restitution.sh` créé au Bonus 3. Assurez-vous de l'avoir réalisé avant de continuer.

:::

Vous avez maintenant un script de sauvegarde fonctionnel. Le problème : vous devez penser à le lancer manuellement. En production, une sauvegarde qu'on oublie de lancer ne sert à rien.

L'objectif de ce bonus est d'automatiser l'exécution de ce script grâce à `cron`, le planificateur de tâches de Linux.

#### Découvrir cron

`cron` permet de planifier des commandes ou des scripts pour qu'ils s'exécutent automatiquement à des moments précis. Pour éditer vos tâches planifiées, utilisez la commande :

```bash
crontab -e
```

Chaque ligne de votre crontab représente une tâche et suit toujours le même format :

```bash
# MIN  HEURE  JOUR_DU_MOIS  MOIS  JOUR_DE_SEMAINE  COMMANDE
```

Par exemple, pour exécuter un script tous les lundis à 8h30 :

```bash
30 8 * * 1 /home/utilisateur/mon_script.sh
```

Pour vérifier la liste de vos tâches actives à tout moment :

```bash
crontab -l
```

::: tip Ressource utile

Le site [crontab.guru](https://crontab.guru/) vous permet de construire et tester visuellement vos expressions cron. C'est un outil utilisé quotidiennement par les professionnels.

:::

#### Créer la tâche

Une fois la syntaxe comprise, créez une tâche cron qui exécute votre script de sauvegarde tous les jours à 2h du matin.

::: danger Attention aux chemins

`cron` s'exécute dans un environnement minimal, différent de votre session SSH habituelle. Les chemins relatifs et les variables d'environnement comme `$PATH` ne sont pas garantis. Assurez-vous d'utiliser uniquement des **chemins absolus** dans votre script et dans votre ligne cron. Exemple : `/home/utilisateur/backup_restitution.sh` au lieu de `./backup_restitution.sh`.

:::

#### Vérifier sans attendre 2h du matin

Attendre la nuit pour savoir si votre tâche fonctionne n'est pas une stratégie viable. Réfléchissez à comment vous pouvez vérifier immédiatement que :

1. La tâche est bien enregistrée dans votre crontab.
2. Le script s'exécute correctement quand cron le lance.
3. La sauvegarde produite est valide.

::: tip Indice

Pour le point 2, vous pouvez temporairement modifier la fréquence de la tâche pour qu'elle s'exécute très souvent, vérifier que tout fonctionne, puis rétablir la fréquence définitive. Les logs système peuvent également vous aider à confirmer qu'une tâche cron a bien été déclenchée.

:::

::: tip Pourquoi ce bonus ?

En DevOps, une tâche manuelle est une tâche qui finira par être oubliée. Automatiser les sauvegardes garantit que vos données sont protégées de façon fiable et régulière, sans intervention humaine. C'est l'un des premiers réflexes d'automatisation à acquérir.

:::

```

```
