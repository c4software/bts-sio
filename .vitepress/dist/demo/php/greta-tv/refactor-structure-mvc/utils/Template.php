<?php

namespace utils;

class Template
{
    static function render($filepath, $variables = array(), $withHeader = true): void
    {
        // Déclare l'ensemble des variables présent dans la variable $variales pour
        // les rendres accessibles directement. Exemple :
        // array("nom" => "Brosseau", "prenom" => "Valentin") va générer
        // $nom = "Brosseau" et $prenom = "Valentin"
        extract($variables);

        if ($withHeader) Template::header();
        include($filepath);
        if ($withHeader) Template::footer();
    }

    static private function header(): void
    {
        include_once("./views/common/header.php");
    }

    static private function footer(): void
    {
        include_once("./views/common/footer.php");
    }
}