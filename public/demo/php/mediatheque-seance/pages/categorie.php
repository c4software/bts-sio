<?php
include('./utils/db.php');

// 1. Le paramètre est-il présent ?
if (!isset($_GET['id'])) {
    header('location: index.php');
    die();
}

// 2. La catégorie existe-t-elle ? (requête préparée !)
$stmt = $pdo->prepare("SELECT * FROM categories WHERE id = ?");
$stmt->execute([$_GET['id']]);
$category = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$category) {
    echo "Catégorie introuvable";
    die();
}

// 3. Les livres de cette catégorie
$stmt = $pdo->prepare("SELECT * FROM livres WHERE categorie_id = ? ORDER BY titre");
$stmt->execute([$_GET['id']]);
$books = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<h1><?php echo $category['nom']; ?></h1>
<ul>
    <?php foreach ($books as $book) { ?>
        <li>
            <a href="index.php?page=livre&id=<?php echo $book['id']; ?>"><?php echo $book['titre']; ?></a>
            de <?php echo $book['auteur']; ?> (<?php echo $book['annee']; ?>)
        </li>
    <?php } ?>
</ul>

<p><a href="index.php?page=home">Retour à l'accueil</a></p>
