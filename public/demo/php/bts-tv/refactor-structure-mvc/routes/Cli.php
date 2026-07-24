<?php

namespace routes;

use cli\Internal;
use routes\base\Route;

class Cli
{
    function __construct()
    {
        $internal = new Internal();
        Route::Add('serve', [$internal, 'serve']);
        Route::Add('db:migrate', [$internal, 'dbMigrate']);
        Route::Add('controller:create', [$internal, 'createController']);
        Route::Add('model:create', [$internal, 'createModel']);
    }
}

