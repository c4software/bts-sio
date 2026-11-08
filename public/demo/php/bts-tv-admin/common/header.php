<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BTS TV</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">BTS TV</a>
        <div class="d-flex gap-3">
            <?php
            if(isset($_SESSION["user"])){
                // La session existe, nous sommes donc connecté
                echo "<a class='link-light' href='index.php?page=admin'>Gérer les vidéos</a>";
                echo "<a class='link-light' href='index.php?page=logout'>Déconnexion</a>";
            } else {
                // Non connecté
                echo "<a class='link-light' href='index.php?page=login'>Connexion</a>";
            }
            ?>
        </div>
    </div>
</nav>
<main class="container py-4">
