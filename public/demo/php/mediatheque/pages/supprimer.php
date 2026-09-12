<?php
include('./utils/db.php');

if (!isset($_POST['livre_id'])) {
    header('location: index.php');
    die();
}

$bookId = $_POST['livre_id'];

// Option retenue : on interdit la suppression d'un livre qui a un historique d'emprunts
$stmt = $pdo->prepare("SELECT COUNT(*) AS nb FROM emprunts WHERE livre_id = ?");
$stmt->execute([$bookId]);
$count = $stmt->fetch(PDO::FETCH_ASSOC);

if ($count['nb'] > 0) { ?>
    <h1>Suppression impossible</h1>
    <p>Ce livre ne peut pas être supprimé, il a un historique d'emprunts.</p>
    <p><a href="index.php?page=livre&id=<?php echo (int) $bookId; ?>">Retour à la fiche</a></p>
<?php
    die();
}

$stmt = $pdo->prepare("DELETE FROM livres WHERE id = ?");
$stmt->execute([$bookId]);

header('location: index.php?page=home');
die();
