<?php

function isConnected(){
    return isset($_SESSION["user"]);
}

function saveConnectedUser($user) {
    $_SESSION['user'] = $user;
}