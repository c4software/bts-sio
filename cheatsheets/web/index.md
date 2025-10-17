# L'outillage du développeur

Préparer son environnement de développement est une étape essentielle pour tout développeur web. Selon votre système d'exploitation, les étapes peuvent varier légèrement.

Dans ce support, vous trouverez les instructions pour configurer un environnement de développement web sous Windows, Linux et macOS.

## Windows

::: warning Xampp ou Wamp
Si vous utilisez Xampp ou Wamp, beaucoup d'outils sont déjà préinstallés.
:::

::: tip 2025 ? Solution WSL !

WSL permet d'obtenir un environnement Linux directement sous Windows, idéal pour le développement.

Un bon point de départ, c'est Alpine => <https://github.com/yuk7/AlpineWSL/releases>

Après installation (décompression et lancement de `Alpine.exe`), vous pouvez installer les outils de base :

```sh
apk add php83 php83-tokenizer php83-session php83-pdo php83-dom php83-xml php83-xmlwriter php83-fileinfo
php83-pdo_sqlite php83-pdo_mysql php83-simplexml npm git vim
```

Vous disposez ainsi d'un environnement Linux avec les principaux langages et outils (PHP, Node.js, Python, Composer, Git, Vim, etc.), parfait pour le développement web !

:::

👋 Vous avez déjà WSL ? Pas besoin de faire la suite. Pour commencer à développer sous Windows, il est recommandé d'installer un environnement comprenant les outils essentiels comme un serveur web, un interpréteur de langage (PHP, Node.js, Python...), et un gestionnaire de paquets.

- [Installation du VCRedist](https://github.com/abbodi1406/vcredist/releases).
- [Installation de Wamp.](https://wampserver.aviatechno.net/).
- Installer Wamp, et vérifier que celui-ci fonctionne correctement.
- Activer les extensions nécessaires selon le langage utilisé (ex : `php_openssl.dll` pour PHP).

### Installer un gestionnaire de paquets

- [Composer pour PHP](https://getcomposer.org/Composer-Setup.exe)
- [npm pour Node.js](https://nodejs.org/)
- Vérifiez que la commande est bien disponible dans un nouveau terminal (`composer`, `npm`, etc.).

## Linux

Sous Linux, il suffit d'installer les langages et outils nécessaires via le gestionnaire de paquets de votre distribution (ex : `apt`, `dnf`, `pacman`, etc.). Exemple pour installer PHP, Node.js et Python :

```bash
sudo apt install php nodejs npm git vim
```

Pour installer Composer (pour PHP) :

```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer
```

## macOS

Sous macOS, la commande `brew` permet d'installer facilement les outils nécessaires :

```bash
brew install php node git vim
```
