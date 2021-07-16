<?php

namespace routes;

use routes\base\Route;
use utils\CliUtils;

class Router extends Route
{
    function __construct()
    {
        // Register Route
        new Api();
        new Web();

        // Load CLI Command only if process is start in CLI (not in browser)
        if (!CliUtils::isBrowser()) {
            new Cli();
        }
    }
}
