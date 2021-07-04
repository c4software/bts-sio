<?php

namespace controllers\base;

class Web implements IBase
{

    function header()
    {
        include_once("./views/common/header.php");
    }

    function footer()
    {
        include_once("./views/common/footer.php");
    }

    function redirect($to){
        header("Location: $to");
        die();
    }
}