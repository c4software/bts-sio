<?php


namespace controllers;


use controllers\base\Web;

class GlobalWeb extends Web
{
    function about()
    {
        $this->header();
        include("views/global/about.php");
        $this->footer();
    }
}