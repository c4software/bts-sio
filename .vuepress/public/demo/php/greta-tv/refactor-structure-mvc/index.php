<?php

use routes\Router;

include("autoload.php");

$router = new Router();
$router->LoadRequestedPath();