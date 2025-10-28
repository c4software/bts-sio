# L'outillage du développeur

Préparer son environnement de développement est une étape essentielle pour tout développeur web. Selon votre système d'exploitation, les étapes peuvent varier légèrement.

Dans ce support, vous trouverez les instructions pour configurer un environnement de développement web sous Windows, Linux et macOS.

## Global

Pour coder vous aurez besoin d'un éditeur de texte ou d'un IDE. Voici quelques recommandations populaires :

- [Visual Studio Code](https://code.visualstudio.com/) - Un éditeur de code léger et puissant, avec de nombreuses extensions pour le développement web.
  - Extensions recommandées :
    - [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client) - Fournit l'autocomplétion, la vérification de syntaxe et d'autres fonctionnalités pour PHP.
    - [PHP Namespace Resolver](https://marketplace.visualstudio.com/items?itemName=MehediDracula.php-namespace-resolver) - Aide à gérer les namespaces en PHP.
    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Un formateur de code pour divers langages, y compris JavaScript, HTML et CSS.
    - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Fournit l'autocomplétion et la documentation pour Tailwind CSS.
- [WebStorm](https://www.jetbrains.com/webstorm/) - Un IDE complet pour le développement web, avec des fonctionnalités avancées.
- [PHPStorm](https://www.jetbrains.com/phpstorm/) - Un IDE dédié au développement PHP, avec des outils intégrés pour le débogage et le testing.
- [NeoVim](https://neovim.io/) - Un éditeur de texte moderne basé sur Vim, très personnalisable et extensible. Très puissant une fois maîtrisé.

## Windows

::: tip 2025 ? Solution WSL !

WSL permet d'obtenir un environnement Linux directement sous Windows, idéal pour le développement.

Un bon point de départ est **Alpine** avec l'ensemble des éléments nécessaires au développement web.  

Il s’agit d’un fork de **AlpineWSL**, enrichi de nombreux outils déjà installés :

<https://github.com/c4software/AlpineWSL-web/releases>

Après installation (**décompression** et lancement de `Alpine.exe`), vous disposez d’un terminal Linux avec les outils suivants préinstallés :

- PHP  
- Composer  
- Node.js et npm  
- Python  
- Git  
- Vim  

Vous avez ainsi un environnement Linux complet, léger et prêt à l’emploi, comprenant les principaux langages et outils du développement web (PHP, Node.js, Python, Composer, Git, Vim, etc.).

**PS :** `apk` est le gestionnaire de paquets

:::

👋 Si vous avez fait le choix de WSL ? Pas besoin de faire la suite.

Pour commencer à développer sous Windows, il est recommandé d'installer un environnement comprenant les outils essentiels comme un serveur web, un interpréteur de langage (PHP, Node.js, Python...), et un gestionnaire de paquets.

- [Installation du VCRedist](https://github.com/abbodi1406/vcredist/releases).
- [Installation de Wamp.](https://wampserver.aviatechno.net/).
- Installer Wamp, et vérifier que celui-ci fonctionne correctement.
- Gitbash : [Téléchargement](https://git-scm.com/download/win) et installation.

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

- Installer [Homebrew](https://brew.sh/) si ce n'est pas déjà fait.
- Installer les langages et outils nécessaires :

```bash
brew install php node git vim
```
