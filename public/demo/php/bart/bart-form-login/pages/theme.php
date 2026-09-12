<?php
// La préférence choisie par le visiteur
$value = "clair";
if (isset($_GET['value']) && $_GET['value'] === "sombre") {
    $value = "sombre";
}

// Le cookie est déposé chez le visiteur, pour 30 jours
setcookie("theme", $value, time() + 30 * 24 * 3600);

// Le cookie ne sera lisible qu'au prochain chargement : on recharge la page
header('location: index.php?page=home');
die();
