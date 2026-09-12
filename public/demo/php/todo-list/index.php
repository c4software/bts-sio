<?php
// Permet d'utiliser header() même si du HTML a déjà été envoyé
ob_start();

// La session, uniquement pour le message flash
session_start();

// La connexion à la base de données ($pdo)
include('utils/db.php');

// Affichage de la partie haute du site
include('common/header.php');

// Pages autorisées
$whitelist = ['home', 'ajouter', 'terminer', 'supprimer', 'categories', 'modifier'];

// Gestion de l'affichage de la page demandée
if (isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include('pages/' . $_GET['page'] . '.php');
} else {
    include('pages/home.php');
}

// Affichage de la partie basse du site
include('common/footer.php');
