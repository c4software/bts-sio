---
description: Configurateur de réseau pour Debian
tags: [debian, réseau, configuration]
---

# Générateur configuration réseau pour Debian

Vous trouverez dans cette page la procédure permettant de générer une configuration réseau en IP static pour Debian.

1. Obtenir le nom de la carte réseau à configurer (`ip a` ou `find /sys/class/net -type l -execdir basename '{}' ';' | grep -v "^lo$"`

2. Génération de la configuration (remplacer les valeurs pour adapter à votre réseau)

<DebianConfiguration />

3. Copier la configuration obtenue et la mettre dans le fichier `nano /etc/network/interfaces`

4. Redémarrer le service réseau

```bash
service networking restart
# Ou redémarrer le serveur
reboot
```

:danger: L'autre solution pour appliquer la configuration est de redémarrer la machine (via la commande `reboot`).

5. Vérifier que la configuration est correcte

```bash
ip a
```

6. Vérifier la configuration DNS

```bash
nano /etc/resolv.conf
```

::: tip resolv.conf

Le fichier `/etc/resolv.conf` est un fichier de configuration qui permet de configurer les serveurs DNS utilisés par le système. Il contient généralement une seule ligne avec l'adresse IP du serveur DNS.

:::


::: tip Documents connexes :

- [Serveur Web avec Debian](./debian-web.md)
- [Configurer le réseau](./linux-debian-based.md)

:::
