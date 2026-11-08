<?php
class LienDao {
    // Retourne la liste des liens d'un fichier (ex. « search »)
    static function get($fichier){
        global $_DATA_PATH;

        return json_decode(file_get_contents($_DATA_PATH . $fichier . ".json"));
    }

    // Ajoute un lien dans un fichier, retourne false en cas d'échec
    static function put($fichier, $lien, $name){
        global $_DATA_PATH;

        $data = LienDao::get($fichier);
        array_push($data, new Lien($lien, $name));

        return file_put_contents($_DATA_PATH . $fichier . ".json", json_encode($data, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES));
    }
}
