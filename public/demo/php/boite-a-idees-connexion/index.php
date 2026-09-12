<?php

// On garde le HTML en mémoire tampon : les redirections et la session
// pourront encore envoyer leurs entêtes même après l'affichage du header.
ob_start();

session_start();

spl_autoload_register(function ($class) {
    require_once __DIR__ . "/classes/" . $class . ".php";
});

if (Auth::check()) {
    $whitelist = ['home', 'proposer', 'idee', 'admin', 'deconnexion'];
} else {
    $whitelist = ['home', 'proposer', 'idee', 'connexion'];
}

$page = $_GET['page'] ?? 'home';

if (!in_array($page, $whitelist)) {
    $page = 'home';
}

require_once __DIR__ . "/common/header.php";
require_once __DIR__ . "/pages/" . $page . ".php";
require_once __DIR__ . "/common/footer.php";
