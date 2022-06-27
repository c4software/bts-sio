<?php

namespace routes\base;

use utils\CliUtils;

class Route
{
    static array $routes = array();

    static function Add($path, $callback): void
    {
        /**
         * Remplace les routes avec un format {nomParametre} (type Laravel) pour les transformer dans un format « classique » d'expression
         * régulière type (?<nomParam>.*?).
         */
        $path = preg_replace('/\/{(.*?)}/', '/(?<$1>.*?)', $path);

        Route::$routes[$path] = $callback;
    }

    static function isActivePath($path, $returnPositive = true, $returnNegative = false): string
    {
        $target = Route::GetCurrentPath();

        if (strlen($target) == 1) {
            return $path === $target ? $returnPositive : $returnNegative;
        } else if (strlen($path) > 1) {
            return str_starts_with($target, $path) ? $returnPositive : $returnNegative;
        }

        return $returnNegative;
    }

    static private function GetCurrentPath(): string
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
        if (!str_starts_with($target, "/")) {
            $target = "/" . $target;
        }

        return htmlspecialchars($target, ENT_QUOTES, 'UTF-8');
    }

    static private function GetCommands()
    {
        global $argv, $argc;
        if ($argc > 1) {
            return $argv[1];
        } else {
            return "";
        }
    }

    static private function GetArgs(): array
    {
        global $argv, $argc;
        if ($argc > 2) {
            return array_slice($argv, 2);
        } else {
            return [];
        }
    }

    static private function searchForMatchingRoute($target): array
    {
        /**
         * Cette méthode recherche dans la liste des routes (clefs).
         * La correspondance est basée sur une expression régulière.
         * Cela permet de gérer des routes avec un paramètre dynamique type :
         * - /api/sample/{id}
         * ou des routes plus classique type
         * - /about
         */

        $matches = [];

        foreach (array_keys(Route::$routes) as $route) {
            if (preg_match_all('#^' . $route . '$#', $target, $matches)) {
                return array($route, array_slice($matches, 1));
            }
        }

        return [];
    }

    static function LoadRequestedPath(): void
    {
        $isBrowser = CliUtils::isBrowser();

        // Gestion de la requête source à charger.
        $target = $isBrowser ? Route::GetCurrentPath() : Route::GetCommands();

        // Gestion des paramètres
        $args = $isBrowser ? $_REQUEST : Route::getArgs();
        unset($args["path"]);

        // Trouve la route avec le bon pattern (expression régulière avec gestion des paramètres dans l'URL)
        $matches = self::searchForMatchingRoute($target);

        // Est-ce que la page demandée est autorisée.
        if ($matches) {

            $match = $matches[0];
            // Extraction des paramètres présent dans la route, pour les mettres
            // dans la liste des arguments passé à la méthode.
            foreach(array_keys($matches[1]) as $inPathParameters){
                $args[$inPathParameters] = $matches[1][$inPathParameters][0];
            }

            // Appel dynamique de la méthode souhaitée (déclaré dans les routes)
            // Les paramètres de la méthode sont automatiquement remplis avec les valeurs en provenence du GET
            call_user_func_array(Route::$routes[$match], array_values($args));
        } else if ($isBrowser) {
            // Non affichage d'une 404.
            http_response_code(404);
            include('views/common/404.php');
        } else {
            print "Unknown command.\r\n";
        }
    }
}