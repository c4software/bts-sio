<?php

namespace controllers;

use controllers\base\Web;
use utils\Template;

class Main extends Web
{
    function about()
    {
        Template::render("views/global/about.php");
    }
}