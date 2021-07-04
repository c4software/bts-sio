<?php

namespace controllers;

use controllers\base\Api;
use models\DBVideo;

class VideoApi extends Api
{
    private $videoModel;

    function __construct()
    {
        // Décommenter pour avoir des données fictives
        //$this->videoModel = new SampleVideo();

        $this->videoModel = new DBVideo();
    }

    function sample()
    {
        echo json_encode(array("Ceci est un exemple", "de", "tableau"));
    }

    function videos()
    {
        echo json_encode($this->videoModel->getVideos());
    }
}