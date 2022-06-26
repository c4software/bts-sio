<?php

namespace controllers\base;

class Web implements IBase
{

    function redirect($to){
        header("Location: $to");
        die();
    }
}