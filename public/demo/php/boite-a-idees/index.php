<?php

// Permet d'utiliser header() même si du HTML a déjà été envoyé (voir plus bas)
ob_start();

// L'autoloader : PHP appelle cette fonction dès qu'une classe inconnue est utilisée.
spl_autoload_register(function ($className) {
    require_once('classes/' . $className . '.php');
});

// La session sert (entre autres) à transporter le message de confirmation.
session_start();

include('common/header.php');

// Les pages autorisées, et elles seules.
$whitelist = ['home', 'proposer', 'idee'];

if (isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include('pages/' . $_GET['page'] . '.php');
} else {
    include('pages/home.php');
}

include('common/footer.php');
