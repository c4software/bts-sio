<?php
// La préférence d'affichage du visiteur, stockée dans un cookie
$theme = "clair";
if (isset($_COOKIE['theme'])) {
    $theme = $_COOKIE['theme'];
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le générateur de punition</title>
    <link rel="stylesheet" href="./public/main.css">
</head>

<body class="theme-<?php echo htmlspecialchars($theme); ?>">

    <header>
        <a href="index.php?page=home">Le generateur de punitions</a>

        <nav>
            <?php if ($theme === "sombre") { ?>
                <a href="index.php?page=theme&value=clair">Thème clair</a>
            <?php } else { ?>
                <a href="index.php?page=theme&value=sombre">Thème sombre</a>
            <?php } ?>

            <?php if (isset($_SESSION['user'])) { ?>
                <a href="index.php?page=logout">Déconnexion (<?php echo htmlspecialchars($_SESSION['user']); ?>)</a>
            <?php } else { ?>
                <a href="index.php?page=login">Connexion</a>
            <?php } ?>
        </nav>
    </header>
