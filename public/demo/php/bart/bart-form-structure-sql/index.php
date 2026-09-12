<?php
// Le tampon de sortie (nous l'expliquons juste en dessous)
ob_start();

// Le démarrage de la session (nous l'expliquons au TP 4)
session_start();

// La connexion à la base de données, une seule fois pour tout le site
include('utils/db.php');

// Les fonctions communes du site
include('common/functions.php');

// La partie haute du site, commune à toutes les pages
include('common/header.php');

// Les pages autorisées
$whitelist = ['home', 'bart', 'about'];

// L'affichage de la page demandée
if (isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include('pages/' . $_GET['page'] . '.php');
} else {
    include('pages/home.php');
}

// La partie basse du site, commune à toutes les pages
include('common/footer.php');
