<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>La boîte à idées</title>
    <link rel="stylesheet" href="public/main.css">
</head>
<body>
<header>
    <h1>La boîte à idées</h1>
    <nav>
        <a href="index.php?page=home">Accueil</a>
        <a href="index.php?page=proposer">Proposer une idée</a>
        <?php if (Auth::check()) : ?>
            <a href="index.php?page=admin">Administration</a>
            <span class="user">Connecté : <?= htmlspecialchars(Auth::name()) ?></span>
            <a href="index.php?page=deconnexion">Déconnexion</a>
        <?php else : ?>
            <a href="index.php?page=connexion">Connexion</a>
        <?php endif; ?>
    </nav>
</header>
<main>
