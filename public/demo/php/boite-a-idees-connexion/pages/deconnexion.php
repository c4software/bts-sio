<?php
Auth::logout();
header('location: index.php?page=home');
die();
