<?php

namespace models\base;


class Database
{
    static function connect()
    {
        include("configs.php");
        return new \PDO ($DB_DSN, $DB_USER, $DB_PASSWORD);
    }
}