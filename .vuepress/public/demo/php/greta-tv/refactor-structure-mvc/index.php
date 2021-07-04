<?php

use routes\Router;
use utils\SessionHelpers;

include("autoload.php");

SessionHelpers::init();

$router = new Router();
$router->LoadRequestedPath();