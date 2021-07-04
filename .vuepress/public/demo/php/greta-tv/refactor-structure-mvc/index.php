<?php
include("autoload.php");

use routes\Route;

// Path à charger
$target = Route::GetCurrentPath();

// Est-ce que la page demandée est autorisée.
if (array_key_exists($target, Route::$routes)) {
    // Appel dynamique de la méthode souhaitée (déclaré dans les routes)
    // Les paramètres de la méthode sont automatiquement remplis avec les valeurs en provenence du GET
    call_user_func_array(Route::$routes[$target], $_GET);
} else {
    // Non affichage d'une 404.
    http_response_code(404);
    include('views/common/404.php');
}