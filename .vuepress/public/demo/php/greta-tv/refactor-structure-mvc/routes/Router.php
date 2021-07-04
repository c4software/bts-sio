<?php

namespace routes;

use routes\base\Route;

class Router extends Route
{
    function __construct()
    {
        // Register Route
        new Api();
        new Web();
    }
}
