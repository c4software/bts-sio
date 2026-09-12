<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>La médiathèque</title>
    <link rel="stylesheet" href="public/main.css">
</head>
<body>
    <header>
        <a href="index.php?page=home">Accueil</a> |
        <a href="index.php?page=adherents">Les adhérents</a> |
        <?php if (isset($_SESSION['connected']) && $_SESSION['connected'] === true) { ?>
            <a href="index.php?page=ajouter">Ajouter un livre</a> |
            <a href="index.php?page=deconnexion">Déconnexion</a>
        <?php } else { ?>
            <a href="index.php?page=connexion">Connexion</a>
        <?php } ?>

        <form method="get" action="index.php">
            <input type="hidden" name="page" value="recherche">
            <input type="text" name="search" placeholder="Chercher un titre">
            <button type="submit">Rechercher</button>
        </form>
    </header>
