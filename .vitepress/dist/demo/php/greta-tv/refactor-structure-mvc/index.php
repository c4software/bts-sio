<?php

use routes\base\Router;
use utils\SessionHelpers;

include("autoload.php");

SessionHelpers::init();

$router = new Router();
$router->LoadRequestedPath();