<?php
header("content-type: application/json");

// API autorisées (configuration à sortir dans un autre fichier PHP)
$whitelist = array('sample');

// Gestion de l'affichage de l'API demandée
if(isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
  include("api/" . $_GET['page'] . '.php');
} else {
    header('HTTP/1.1 401 Unauthorized');
}

?>