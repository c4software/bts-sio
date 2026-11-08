<?php

class Database
{
    // La connexion, partagée par toute l'application.
    private static ?PDO $pdo = null;

    public static function getPdo(): PDO
    {
        // Première demande : on se connecte.
        if (self::$pdo === null) {
            $dsn = "mysql:host=localhost;dbname=boite_idees;charset=utf8mb4";
            self::$pdo = new PDO($dsn, "root", "");
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        // Les fois suivantes : on rend la connexion déjà ouverte.
        return self::$pdo;
    }
}
