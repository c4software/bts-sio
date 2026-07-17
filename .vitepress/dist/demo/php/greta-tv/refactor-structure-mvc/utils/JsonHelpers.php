<?php

namespace utils;

class JsonHelpers
{
    static function stringify($data){
        header("content-type: application/json");

        return json_encode($data);
    }
}