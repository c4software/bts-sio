<?php
include("autoload.php");

use routes\base\Route;
use routes\Cli;
use utils\CliUtils;

if (CliUtils::isBrowser()) {
    die();
}

$_GET['path'] = $argv[1];

new Cli();
Route::LoadRequestedPath(false);