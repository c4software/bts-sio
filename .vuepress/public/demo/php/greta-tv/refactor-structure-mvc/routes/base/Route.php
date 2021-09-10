<?php

namespace routes\base;

use utils\CliUtils;

class Route
{
    static $routes = array();

    static function Add($path, $callback)
    {
        Route::$routes[$path] = $callback;
    }

    static private function GetCurrentPath()
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

        // Gestion si le path ne commence pas par /
        if(strpos($target, "/") !== 0){
            $target = "/" . $target;
        }

        return htmlspecialchars($target, ENT_QUOTES, 'UTF-8');
    }

    static private function GetCommands()
    {
        global $argv, $argc;
        if($argc > 1) {
            return $argv[1];
        } else {
            return "";
        }
    }

    static private function GetArgs()
    {
        global $argv, $argc;
        if($argc > 2) {
            return array_slice($argv, 2);
        } else {
            return [];
        }
    }

    static function LoadRequestedPath()
    {
        $isBrowser = CliUtils::isBrowser();

        // Gestion de la requête source à charger.
        $target = $isBrowser ? Route::GetCurrentPath() : Route::GetCommands();

        // Gestion des paramètres
        $args = $isBrowser ? $_REQUEST : Route::getArgs();

        // Est-ce que la page demandée est autorisée.
        if (array_key_exists($target, Route::$routes)) {
            // Appel dynamique de la méthode souhaitée (déclaré dans les routes)
            // Les paramètres de la méthode sont automatiquement remplis avec les valeurs en provenence du GET
            call_user_func_array(Route::$routes[$target], array_values($args));
        } else if ($isBrowser) {
            // Non affichage d'une 404.
            http_response_code(404);
            include('views/common/404.php');
        } else {
            print "Unknown command.\r\n";
        }
    }
}