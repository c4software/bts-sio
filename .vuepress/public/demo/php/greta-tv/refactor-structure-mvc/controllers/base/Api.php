<?php

namespace controllers\base;

class Api implements IBase
{


    public function __construct()
    {

    }

    function header()
    {
        header("content-type: application/json");
    }

    function footer()
    {
    }

    function redirect($to)
    {
        // Do Nothing
    }
}