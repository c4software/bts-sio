<?php

namespace models;

use models\base\SQL;

class DBVideo extends SQL
{
    public function __construct()
    {
        parent::__construct('video');
    }

    function getVideos()
    {
        return $this->getAll();
    }

    function getByVideoId($videoId)
    {
        // Utilisation d'une query a la place d'un simple getOne car la requête
        // est réalisé sur un champs différent que l'ID de la table.

        $stmt = $this->pdo->prepare("SELECT * FROM video WHERE videoId = ?");
        $stmt->execute([$videoId]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}