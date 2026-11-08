<?php
class Lien {
    public $lien = "";
    public $name = "";

    function __construct($lien, $name)
    {
        $this->lien = $lien;
        $this->name = $name;
    }

    // Vérifie que le lien est bien une URL
    function estValide()
    {
        $url = filter_var($this->lien, FILTER_SANITIZE_URL);
        return filter_var($url, FILTER_VALIDATE_URL) !== false;
    }
}
