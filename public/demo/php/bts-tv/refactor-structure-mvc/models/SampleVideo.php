<?php

namespace models;
/**
 * @deprecated
 * Class SampleVideo
 *
 * Class d'exemple « sans logique ». Utiliser de préférence la version en lien avec la base de données
 *
 * @package models
 */
class SampleVideo
{
    private $videos = array(
        array("videoId" => "BcgsOgjHgWA", "name" => "Video 1"),
        array("videoId" => "lcOxhH8N3Bo", "name" => "Video 2"),
        array("videoId" => "jTuBnZrLbq0", "name" => "Video 3"),
        array("videoId" => "M2VtfZDOcHQ", "name" => "Video 4"),
        array("videoId" => "i1iIaSbK9bg", "name" => "Video 5"),
        array("videoId" => "MTaHw-S6IDo", "name" => "Video 6"),
        array("videoId" => "KfMCApWc5xE", "name" => "Video 7"),
        array("videoId" => "igtN49I1CtM", "name" => "Video 8")
    );

    function GetVideos()
    {
        return $this->videos;
    }

    function getByVideoId($id)
    {
        $result = array_values(array_filter($this->videos, function ($video) use ($id) {
            return $video["videoId"] === $id;
        }));

        return array_pop($result);
    }
}