<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La boîte à idées</title>
    <link rel="stylesheet" href="./public/main.css">
</head>

<body>
    <header>
        <a href="index.php?page=home">La boîte à idées</a>
        <a href="index.php?page=proposer">Proposer une idée</a>
        <?php if (Auth::check()) : ?>
            <a href="index.php?page=admin">Administration</a>
            <span>Connecté : <?= htmlspecialchars(Auth::name()) ?></span>
            <a href="index.php?page=deconnexion">Déconnexion</a>
        <?php else : ?>
            <span><?php echo Idea::count(); ?> idées déposées</span>
            <a href="index.php?page=connexion">Connexion</a>
        <?php endif; ?>
    </header>
    <main>
