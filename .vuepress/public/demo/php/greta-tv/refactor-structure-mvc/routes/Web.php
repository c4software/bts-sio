<?php

namespace routes;

use controllers\GlobalWeb;
use controllers\VideoWeb;
use routes\base\Route;

class Web
{
    function __construct()
    {
        $videoWeb = new VideoWeb();
        $globalWeb = new GlobalWeb();

        Route::Add('/', [$videoWeb, 'home']);
        Route::Add('/tv', [$videoWeb, 'tv']);
        Route::Add('/about', [$globalWeb, 'about']);
    }
}

