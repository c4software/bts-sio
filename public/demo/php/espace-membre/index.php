<?php
// Démarrage de la session
session_start();

// Permet d'utiliser header() même si du HTML a déjà été envoyé
ob_start();

// La connexion à la base de données, disponible dans toutes les pages
include('utils/db.php');

// Affichage de la partie haute du site
include('common/header.php');

// Pages autorisées : elles dépendent de l'état de connexion
if (isset($_SESSION['user_id'])) {
    $whitelist = ['home', 'espace', 'deconnexion'];
} else {
    $whitelist = ['home', 'inscription', 'connexion'];
}

// Gestion de l'affichage de la page demandée
if (isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include("pages/" . $_GET['page'] . '.php');
} else {
    include('pages/home.php');
}

// Affichage de la partie basse du site
include('common/footer.php');
