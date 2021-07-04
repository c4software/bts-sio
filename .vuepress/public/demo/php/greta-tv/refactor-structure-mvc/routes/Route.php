<?php

namespace routes;

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
            $target = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        }

        return htmlspecialchars($target, ENT_QUOTES, 'UTF-8');
    }
}

// Register Route
new Api();
new Web();