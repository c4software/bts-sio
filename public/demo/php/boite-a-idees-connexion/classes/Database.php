<?php

class Database
{
    private static ?PDO $pdo = null;

    public static function getPdo(): PDO
    {
        if (self::$pdo === null) {
            $dsn = "mysql:host=localhost;dbname=boite_idees;charset=utf8mb4";
            self::$pdo = new PDO($dsn, "root", "");
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        return self::$pdo;
    }
}
