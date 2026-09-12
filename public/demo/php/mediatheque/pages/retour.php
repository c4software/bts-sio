<?php
include('./utils/db.php');

if (!isset($_POST['livre_id'])) {
    header('location: index.php');
    die();
}

$bookId = $_POST['livre_id'];

$stmt = $pdo->prepare("UPDATE emprunts SET date_retour = CURDATE()
                       WHERE livre_id = ? AND date_retour IS NULL");
$stmt->execute([$bookId]);

header('location: index.php?page=livre&id=' . (int) $bookId);
die();
