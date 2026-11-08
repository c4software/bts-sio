<?php
// Permet d'utiliser header() même si du HTML a déjà été envoyé
ob_start();

// La session : elle retient la personne connectée
session_start();

// La connexion à la base de données ($pdo)
include('./utils/db.php');

// Affichage de la partie haute du site
include('./common/header.php');

// Pages accessibles à tous
$whitelist = ['home', 'tv', 'login'];

// Une personne connectée a sa propre liste, avec les pages d'administration
if (isset($_SESSION['user'])) {
    $whitelist = ['home', 'tv', 'logout', 'admin'];
}

// Gestion de l'affichage de la page demandée
if (isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include('./pages/' . $_GET['page'] . '.php');
} else {
    include('./pages/home.php');
}

// Affichage de la partie basse du site
include('./common/footer.php');
