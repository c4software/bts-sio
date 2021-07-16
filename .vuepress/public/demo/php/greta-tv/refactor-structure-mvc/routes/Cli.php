<?php

namespace routes;

use migrations\RunMigration;
use routes\base\Route;

class Cli
{
    function __construct()
    {
        $dbMigration = new RunMigration();
        Route::Add('db:migrate', [$dbMigration, 'run']);
    }
}

