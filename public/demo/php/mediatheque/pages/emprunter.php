<?php
include('./utils/db.php');

if (!isset($_POST['livre_id']) || !isset($_POST['adherent_id'])) {
    header('location: index.php');
    die();
}

$bookId = $_POST['livre_id'];

// On revérifie côté serveur que le livre est bien disponible
$stmt = $pdo->prepare("SELECT id FROM emprunts WHERE livre_id = ? AND date_retour IS NULL");
$stmt->execute([$bookId]);

if ($stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<p>Ce livre est déjà emprunté, l'emprunt n'a pas été enregistré.</p>";
    echo '<p><a href="index.php?page=livre&id=' . (int) $bookId . '">Retour à la fiche</a></p>';
    die();
}

$stmt = $pdo->prepare("INSERT INTO emprunts (livre_id, adherent_id, date_emprunt, date_retour)
                       VALUES (?, ?, CURDATE(), NULL)");
$stmt->execute([$bookId, $_POST['adherent_id']]);

header('location: index.php?page=livre&id=' . (int) $bookId);
die();
