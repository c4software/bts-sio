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

// La liste des adhérents, pour le formulaire d'emprunt
$members = $pdo->query("SELECT id, nom, prenom FROM adherents ORDER BY nom")->fetchAll(PDO::FETCH_ASSOC);

$connected = isset($_SESSION['connected']) && $_SESSION['connected'] === true;
?>

<h1><?php echo $book['titre']; ?></h1>
<p>
    de <strong><?php echo $book['auteur']; ?></strong> (<?php echo $book['annee']; ?>)<br>
    Catégorie : <?php echo $book['categorie']; ?>
</p>

<?php if (!$loan) { ?>
    <p><strong>Disponible</strong></p>

    <?php if ($connected) { ?>
        <form method="post" action="index.php?page=emprunter">
            <input type="hidden" name="livre_id" value="<?php echo $book['id']; ?>">
            <select name="adherent_id">
                <?php foreach ($members as $member) { ?>
                    <option value="<?php echo $member['id']; ?>">
                        <?php echo $member['prenom'] . ' ' . $member['nom']; ?>
                    </option>
                <?php } ?>
            </select>
            <button type="submit">Emprunter</button>
        </form>
    <?php } ?>
<?php } else { ?>
    <p>
        <strong>Emprunté</strong> par <?php echo $loan['prenom'] . ' ' . $loan['nom']; ?>
        depuis le <?php echo date('d/m/Y', strtotime($loan['date_emprunt'])); ?>
    </p>

    <?php if ($connected) { ?>
        <form method="post" action="index.php?page=retour">
            <input type="hidden" name="livre_id" value="<?php echo $book['id']; ?>">
            <button type="submit">Retour</button>
        </form>
    <?php } ?>
<?php } ?>

<?php if ($connected) { ?>
    <form method="post" action="index.php?page=supprimer">
        <input type="hidden" name="livre_id" value="<?php echo $book['id']; ?>">
        <button type="submit">Supprimer ce livre</button>
    </form>
<?php } ?>

<p><a href="index.php?page=categorie&id=<?php echo $book['categorie_id']; ?>">Retour à la catégorie</a></p>
