<?php

namespace controllers;

use controllers\base\Web;
use models\DBVideo;

class VideoWeb extends Web
{
    private $videoModel;

    function __construct()
    {
        // Décommenter pour avoir des données fictives
        //$this->videoModel = new SampleVideo();
        
        $this->videoModel = new DBVideo();
    }

    function home()
    {
        // Récupération des vidéo par le modèle
        $videos = $this->videoModel->getVideos();

        $this->header();
        include("./views/video/home.php");
        $this->footer();
    }

    /**
     * $id est automatiquement rempli via la valeur du GET
     * @param $id
     */
    function tv($id)
    {
        $video = $this->videoModel->getByVideoId($id);

        if (!$video) {
            $this->redirect("/");
        }

        $this->header();
        include("./views/video/tv.php");
        $this->footer();
    }
}