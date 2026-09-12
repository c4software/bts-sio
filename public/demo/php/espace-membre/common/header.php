<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>L'espace membre</title>
    <link rel="stylesheet" href="./public/main.css">
</head>

<body>
    <header>
        <a class="logo" href="index.php">L'espace membre</a>
        <nav>
            <?php if (isset($_SESSION['user_id'])) { ?>
                <a href="index.php?page=espace">Mon espace</a>
                <a href="index.php?page=deconnexion">Déconnexion</a>
            <?php } else { ?>
                <a href="index.php?page=inscription">Inscription</a>
                <a href="index.php?page=connexion">Connexion</a>
            <?php } ?>
        </nav>
    </header>
    <main>
