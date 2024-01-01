<?php

namespace models\base;


class Database
{
    static function connect()
    {
        $config = include("configs.php");
        $pdo = new \PDO ($config["DB_DSN"], $config["DB_USER"], $config["DB_PASSWORD"]);

        if ($pdo && $config["DEBUG"]) {
            // ACTIVER LE DEBUG DES REQUÊTES
            $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
        }

        return $pdo;
    }
}