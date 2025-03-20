---
description: Aide mémoire Mini MVC Sample
---

# Aide mémoire Mini MVC Sample

::: details Table des matières
[[toc]]
:::

## Lancer le serveur intégré

```sh
# Windows (avec XAMPP)
C:/xampp/php/php -S localhost:9000

# Windows (avec WAMP)
C:/wamp64/bin/php/php8.4.0/php -S localhost:9000

# Linux / OSX
php mvc serve
```

## Migrer la base de données

```sh
# Hors Windows
php mvc db:migrate

# Sous Windows (avec XAMPP)
C:/xampp/php/php mvc db:migrate

# Sous Windows (avec WAMP)
C:/wamp64/bin/php/php7.4.9/php mvc db:migrate
```

## Créer un modèle

```sh
# Hors Windows
php mvc model:create TodoModel

# Sous Windows (avec XAMPP)
C:/xampp/php/php mvc model:create TodoModel

# Sous Windows (avec WAMP)
C:/wamp64/bin/php/php7.4.9/php mvc model:create TodoModel
```

## Créer un contrôleur

```sh
# Hors Windows
php mvc controller:create TodoWeb

# Sous Windows (avec XAMPP)
C:/xampp/php/php mvc controller:create TodoWeb

# Sous Windows (avec WAMP)
C:/wamp64/bin/php/php7.4.9/php mvc controller:create TodoWeb
```