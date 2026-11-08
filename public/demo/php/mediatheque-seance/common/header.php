<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>La médiathèque</title>
    <link rel="stylesheet" href="public/main.css">
</head>
<body>
    <header>
        <a href="index.php?page=home">Accueil</a>

        <form method="get" action="index.php">
            <input type="hidden" name="page" value="recherche">
            <input type="text" name="search" placeholder="Chercher un titre">
            <button type="submit">Rechercher</button>
        </form>
    </header>
