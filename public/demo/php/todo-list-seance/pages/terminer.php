<?php

// L'identifiant est-il présent, et composé uniquement de chiffres ?
if (isset($_GET['id']) && ctype_digit($_GET['id'])) {

    $stmt = $pdo->prepare("UPDATE taches SET terminee = 1 WHERE id = ?");
    $stmt->execute([$_GET['id']]);
}

header('location: index.php?page=home');
die();
