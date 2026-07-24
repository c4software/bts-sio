<?php

namespace models;

use utils\SessionHelpers;

/**
 * @deprecated
 * Class d'exemple « sans logique ». Créer une version en lien avec une base de données (hérite de SQL)
 * @package models
 */
class SampleAccount
{
    public function login($username, $password)
    {
        /*
         * TODO DANS LA VRAI VIE
         * ICI NOUS APPELLERIONS LA BDD AFIN DE VÉRIFIER LE COMPTE
         */

        SessionHelpers::login(array("username" => "Utilisateur démo", "email" => $username));
        return true;
    }
}