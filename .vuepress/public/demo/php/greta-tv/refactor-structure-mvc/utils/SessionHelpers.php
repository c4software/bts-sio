<?php


namespace utils;


class SessionHelpers
{
    static function init()
    {
        session_start();
    }

    static function login($user)
    {
        $_SESSION['USER'] = $user;
    }

    static function logout()
    {
        unset($_SESSION['USER']);
    }

    static function isLogin()
    {
        return isset($_SESSION['USER']);
    }
}