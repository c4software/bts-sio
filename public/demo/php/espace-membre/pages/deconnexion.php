<?php
// On vide puis on détruit la session
$_SESSION = [];
session_destroy();

header('location: index.php');
die();
