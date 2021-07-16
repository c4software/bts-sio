<?php

namespace routes\base;

class Route
{
    static $routes = array();

    static function Add($path, $callback)
    {
        Route::$routes[$path] = $callback;
    }

    static function GetCurrentPath()
    {
        if (isset($_GET['path'])) {
            $target = $_GET['path'] == '' ? '/' : $_GET['path'];
        } else {
            /* Gestion des sous dossiers comme bath path */
            if (dirname($_SERVER['SCRIPT_NAME']) != "/") {
                $target = str_replace(dirname($_SERVER['SCRIPT_NAME']), "", $_SERVER['REQUEST_URI']);
            } else {
                $target = $_SERVER["REQUEST_URI"];
            }

            $target = parse_url($target, PHP_URL_PATH);
        }

        return htmlspecialchars($target, ENT_QUOTES, 'UTF-8');
    }

    static function LoadRequestedPath($with404 = true)
    {
        // Path à charger
        $target = Route::GetCurrentPath();

        // Est-ce que la page demandée est autorisée.
        if (array_key_exists($target, Route::$routes)) {
            // Appel dynamique de la méthode souhaitée (déclaré dans les routes)
            // Les paramètres de la méthode sont automatiquement remplis avec les valeurs en provenence du GET
            call_user_func_array(Route::$routes[$target], $_GET);
        } else if ($with404) {
            // Non affichage d'une 404.
            http_response_code(404);
            include('views/common/404.php');
        }
    }
}