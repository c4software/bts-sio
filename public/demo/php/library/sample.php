<?php

/**
 * Test si nous sommes le jour de noel
 *
 * Voici un exemple d'utilisation
 * 
 * 
 * <code>
 * if(isChristmas()){
 *  echo "Joyeux noel";
 * }
 * </code>
 * 
 * 
 * @return bool
 */
function isChristmas() {
    return date("d-m") === "25-12";
}

/**
 * Retourne le nombre de jour avant noel
 *
 * Voici un exemple d'utilisation
 * 
 * 
 * <code>
 * echo "Il reste encore " . daysBeforeChristmas() . "jour avant noel";
 * </code>
 * 
 * 
 * @return int
 */
function daysBeforeChristmas() {
    $xmasDay = strtotime('December 25');
    return ceil(($xmasDay - time())/60/60/24);
}

/**
 * Retourne si nous sommes le mois de décembre
 *
 * Voici un exemple d'utilisation
 * 
 * 
 * <code>
 * if(isDecember()){
 *  echo "Nous sommes au mois de décembre";
 * }
 * </code>
 * 
 * 
 * @return boolean
 */
function isDecember() {
    return date("m") == "12";
}

/**
 * Cette fonction retourn la valeur présent dans le $_GET 
 * ou une valeur par défaut
 *
 * Voici un exemple d'utilisation
 * 
 * 
 * <code>
 * 
 * 
 * // index.php?name=Thomas
 * 
 * 
 * echo getOrDefault('name', 'Valentin Brosseau');
 * </code>
 * 
 * 
 * @param string $key Clé à récupérer dans le $_GET
 * @param mixed $default Valeur par défaut si la clé n'existe pas
 * @return mixed
 */
function getOrDefault($key, $default){
    return isset($_GET[$key]) ? $_GET[$key] : $default;
}

/**
 * Cette fonction retourn la valeur présent dans le $_POST
 * ou une valeur par défaut
 *
 * Voici un exemple d'utilisation
 * 
 * 
 * <code>
 * echo postOrDefault('name', 'Valentin Brosseau');
 * </code>
 * 
 * 
 * @param string $key Clé à récupérer dans le $_POST
 * @param mixed $default Valeur par défaut si la clé n'existe pas
 * @return mixed
 */
function postOrDefault($key, $default){
    return isset($_POST[$key]) ? $_POST[$key] : $default;
}

/**
 * Cette fonction format l'identité de la personne. 
 * Le second paramètre est l'année de naissance de la personne
 *
 * Voici un exemple d'utilisation
 * 
 * 
 * <code> 
 * echo formatIdentity('Valentin', 1987);
 * 
 * 
 * // ou
 * 
 * 
 * echo formatIdentity('Valentin');
 * </code>
 * 
 * 
 * @param string $name Nom de la personne
 * @param int $year Année de naissance
 * @return string
 * </code>
 */
function formatIdentity($name, $year){
    if(!empty($year)){
        return "La personne « $name » est agé de " . (date("Y") - $year) . " ans.";
    } else {
        return "La personne « $name » ne possède pas de date de naissance.";
    }
}

/**
 * Cette fonction format affiche le nombre d'email 
 * et format un texte en résultat
 *
 * Voici un exemple d'utilisation
 * 
 * 
 * <code>
 * echo mailCountFormat(10);
 * </code>
 * 
 * 
 * @param int $nombre nombre d'email
 * @return string 
 */
function mailCountFormat($nombre){
    return "Vous avez $nombre mail" . (($nombre > 1) ? "s" : "");
}