<?php
// Le site oublie qui était connecté
unset($_SESSION['user']);

$_SESSION['message'] = "Vous êtes déconnecté.";

header('location: index.php?page=home');
die();
