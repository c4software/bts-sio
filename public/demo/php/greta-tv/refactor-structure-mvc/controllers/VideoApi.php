<?php

namespace controllers;

use controllers\base\Api;
use models\DBVideo;
use models\SampleVideo;
use utils\JsonHelpers;

class VideoApi extends Api
{
    private $videoModel;

    function __construct()
    {
        $this->videoModel = new SampleVideo();

        // Décommenter pour avoir des données depuis une base de données
        //$this->videoModel = new DBVideo();
    }

    function sample()
    {
        echo JsonHelpers::stringify(array("Ceci est un exemple", "de", "tableau"));
    }

    function videos()
    {
        echo json_encode($this->videoModel->getVideos());
    }
}