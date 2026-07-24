<?php

namespace cli;

use models\base\Migration;

class Internal
{
    private function cleanName($name)
    {
        return ucfirst(str_replace(' ', '_', basename($name)));
    }

    public function serve($port = 9000){
        exec("php -S localhost:${port}");
    }

    public function dbMigrate()
    {
        $engine = new Migration();
        foreach (glob('migrations/*.sql') as $file) {
            $engine->run_migration($file);
        }
    }

    public function createController($name = "", $type = "Web")
    {
        if ($name == "") {
            echo "Vous devez fournir un nom. (Ex. php index.php controller:create MonController)\r\n";
            die();
        }

        $targetName = self::cleanName($name);
        $target = "controllers/$targetName.php";
        $content = "<?php
namespace controllers;

use controllers\base\\${type};

class $targetName extends ${type}
{
}";

        file_put_contents($target, $content);
    }

    public function createModel($name = "")
    {
        if ($name == "") {
            echo "Vous devez fournir un nom. (Ex. php index.php model:create MonController)\r\n";
            die();
        }


        $targetName = self::cleanName($name);
        $target = "models/$targetName.php";
        $content = "<?php
namespace models;

use models\base\SQL;

class $targetName extends SQL
{
    public function __construct()
    {
        parent::__construct('votre-table', 'cle-de-votre-table');
    }
}";

        file_put_contents($target, $content);
    }
}