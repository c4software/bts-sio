<?php

namespace controllers\base;

interface IBase
{
    function header();

    function footer();

    function redirect($to);
}