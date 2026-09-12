<?php
// Permet d'utiliser header() même si du HTML a déjà été envoyé
ob_start();

// La connexion à la base de données
include('utils/db.php');

// Les données, disponibles dans toutes les pages
include('common/data.php');

// Affichage de la partie haute du site
include('common/header.php');

// Pages autorisées
$whitelist = array('home', 'classe', 'matiere', 'ajouter');

// Gestion de l'affichage de la page demandée
if (isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include("pages/" . $_GET['page'] . '.php');
} else {
    include('pages/home.php');
}

// Affichage de la partie basse du site
include('common/footer.php');
