<?php
// Permet d'utiliser header() même si du HTML a déjà été envoyé (voir la section « Ajouter une tâche »)
ob_start();

// La session : elle ne sert ici qu'au message flash
session_start();

// La connexion à la base de données, elle fabrique la variable $pdo
include('utils/db.php');

// Affichage de la partie haute du site
include('common/header.php');

// Pages autorisées
$whitelist = ['home', 'ajouter', 'terminer', 'supprimer'];

// Gestion de l'affichage de la page demandée
if (isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include('pages/' . $_GET['page'] . '.php');
} else {
    include('pages/home.php');
}

// Affichage de la partie basse du site
include('common/footer.php');
