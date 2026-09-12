<?php

if (isset($_GET['id']) && ctype_digit($_GET['id'])) {

    $stmt = $pdo->prepare("DELETE FROM taches WHERE id = ?");
    $stmt->execute([$_GET['id']]);
}

header('location: index.php?page=home');
die();
