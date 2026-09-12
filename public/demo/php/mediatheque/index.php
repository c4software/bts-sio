<?php
// Démarrage de la session
session_start();

// Les identifiants en dur (étape 11, niveau « suffisant »)
$login = 'admin';
$password = 'mediatheque';

// Pages autorisées : la liste dépend de l'état de connexion
if (isset($_SESSION['connected']) && $_SESSION['connected'] === true) {
    $whitelist = array(
        'home', 'categorie', 'livre', 'recherche', 'adherents',
        'emprunter', 'retour', 'ajouter', 'supprimer', 'deconnexion',
    );
} else {
    $whitelist = array('home', 'categorie', 'livre', 'recherche', 'adherents', 'connexion');
}

// Affichage de la partie haute du site
include('common/header.php');

// Gestion de l'affichage de la page demandée
if (isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include("pages/" . $_GET['page'] . '.php');
} elseif (isset($_GET['page'])) {
    include('pages/refus.php');
} else {
    include('pages/home.php');
}

// Affichage de la partie basse du site
include('common/footer.php');
