<?php
// Les valeurs reçues du formulaire (avec une valeur par défaut)
$phrase = "Ceci est une phrase d'exemple";
if (isset($_POST['phrase'])) {
    $phrase = $_POST['phrase'];
}

$count = 3;
if (isset($_POST['count'])) {
    $count = $_POST['count'];
}

// Enregistrement de la punition (uniquement si elle vient du formulaire)
if (isset($_POST['phrase']) && isset($_POST['count'])) {
    $sql = "INSERT INTO phrases (phrase, nombre) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$phrase, $count]);
}

// L'état du visiteur : son dernier choix
$_SESSION['last_phrase'] = $phrase;
$_SESSION['last_count'] = $count;

// Le nombre de punitions générées pendant cette visite
if (isset($_SESSION['generated'])) {
    $_SESSION['generated'] = $_SESSION['generated'] + 1;
} else {
    $_SESSION['generated'] = 1;
}

// Le message à afficher sur la page suivante
$_SESSION['message'] = "Punition enregistrée !";

// Et hop, retour à l'accueil
header('location: index.php?page=home');
die();
