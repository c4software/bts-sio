<?php

namespace routes;

use controllers\Account;
use controllers\Main;
use controllers\VideoWeb;
use routes\base\Route;
use utils\SessionHelpers;

class Web
{
    function __construct()
    {
        $videoWeb = new VideoWeb();
        $main = new Main();
        $account = new Account();

        Route::Add('/', [$videoWeb, 'home']);
        Route::Add('/tv', [$videoWeb, 'tv']);
        Route::Add('/about', [$main, 'about']);
        Route::Add('/login', [$account, 'login']);

        if (SessionHelpers::isLogin()) {
            Route::Add('/me', [$account, 'me']);
            Route::Add('/logout', [$account, 'logout']);
        }
    }
}

