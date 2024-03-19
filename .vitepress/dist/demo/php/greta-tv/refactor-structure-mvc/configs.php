<?php

$DB_SERVER = getenv("MVC_SERVER") ?: "127.0.0.1";
$DB_DATABASE = getenv("MVC_DB") ?: "formaflix";
$DB_USER = getenv("MVC_USER") ?: "root";
$DB_PASSWORD = getenv("MVC_TOKEN") ?: "";
$DEBUG = getenv("MVC_DEBUG") ?: true;

return array(
    "DB_USER" => $DB_USER,
    "DB_PASSWORD" => $DB_PASSWORD,
    "DB_DSN" => "mysql:host=$DB_SERVER;dbname=$DB_DATABASE;charset=utf8",
    "DEBUG" => $DEBUG
);

