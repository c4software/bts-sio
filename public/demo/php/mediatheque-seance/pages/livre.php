<?php
include('./utils/db.php');

if (!isset($_GET['id'])) {
    header('location: index.php');
    die();
}

// Le livre et sa catégorie
$stmt = $pdo->prepare("SELECT livres.*, categories.nom AS categorie
                       FROM livres
                       LEFT JOIN categories ON categories.id = livres.categorie_id
                       WHERE livres.id = ?");
$stmt->execute([$_GET['id']]);
$book = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$book) {
    echo "Livre introuvable";
    die();
}

// L'emprunt en cours, s'il existe
$stmt = $pdo->prepare("SELECT adherents.nom, adherents.prenom, emprunts.date_emprunt
                       FROM emprunts
                       LEFT JOIN adherents ON adherents.id = emprunts.adherent_id
                       WHERE emprunts.livre_id = ? AND emprunts.date_retour IS NULL");
$stmt->execute([$_GET['id']]);
$loan = $stmt->fetch(PDO::FETCH_ASSOC);

// $loan vaut false s'il n'y a pas d'emprunt en cours : le livre est donc disponible.
?>

<h1><?php echo $book['titre']; ?></h1>
<p>
    de <strong><?php echo $book['auteur']; ?></strong> (<?php echo $book['annee']; ?>)<br>
    Catégorie : <?php echo $book['categorie']; ?>
</p>

<?php if (!$loan) { ?>
    <p><strong>Disponible</strong></p>
<?php } else { ?>
    <p>
        <strong>Emprunté</strong> par <?php echo $loan['prenom'] . ' ' . $loan['nom']; ?>
        depuis le <?php echo date('d/m/Y', strtotime($loan['date_emprunt'])); ?>
    </p>
<?php } ?>

<p><a href="index.php?page=categorie&id=<?php echo $book['categorie_id']; ?>">Retour à la catégorie</a></p>
