<?php
include('./utils/db.php');

$books = array();

if (isset($_GET['search']) && $_GET['search'] !== '') {
    $stmt = $pdo->prepare("SELECT * FROM livres WHERE titre LIKE ? ORDER BY titre");
    $stmt->execute(['%' . $_GET['search'] . '%']);
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>

<h1>Recherche</h1>

<?php if (!isset($_GET['search']) || $_GET['search'] === '') { ?>
    <p>Saisissez un titre dans le champ de recherche ci-dessus.</p>
<?php } elseif (count($books) === 0) { ?>
    <p>Aucun livre ne correspond à « <?php echo htmlspecialchars($_GET['search']); ?> ».</p>
<?php } else { ?>
    <p><?php echo count($books); ?> résultat(s) pour « <?php echo htmlspecialchars($_GET['search']); ?> » :</p>
    <ul>
        <?php foreach ($books as $book) { ?>
            <li>
                <a href="index.php?page=livre&id=<?php echo $book['id']; ?>"><?php echo $book['titre']; ?></a>
                de <?php echo $book['auteur']; ?> (<?php echo $book['annee']; ?>)
            </li>
        <?php } ?>
    </ul>
<?php } ?>
