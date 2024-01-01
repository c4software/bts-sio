<?php

namespace utils;

class CliUtils
{
    static function isBrowser()
    {
        return PHP_SAPI !== 'cli' || isset($_SERVER['HTTP_USER_AGENT']);
    }
}