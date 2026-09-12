<?php
// Le serveur oublie tout ce qu'il savait de ce visiteur
session_destroy();

header('location: index.php?page=home');
die();
