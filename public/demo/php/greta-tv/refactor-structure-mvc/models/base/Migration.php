<?php

namespace models\base;

use mysql_xdevapi\Exception;

class Migration extends Database
{
    public function run_migration($filename)
    {
        $pdo = self::connect();

        echo "=> Start migration of « $filename »\r\n";

        try {
            $templine = "";
            $lines = file($filename);
            foreach ($lines as $line) {
                if (substr($line, 0, 2) == '--' || $line == '')
                    continue;
                $templine .= $line;
                if (substr(trim($line), -1, 1) == ';') {
                    $pdo->query($templine);
                    $templine = '';
                }
            }
        } catch (Exception $err){
            echo "=> Migration fail for « $filename »\r\n";
            return;
        }

        $pdo = null;

        echo "=> End migration of « $filename »\r\n";
    }
}