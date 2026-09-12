<?php
include('./utils/db.php');

$sql = "SELECT categories.id, categories.nom, COUNT(livres.id) AS nb_livres
        FROM categories
        LEFT JOIN livres ON livres.categorie_id = categories.id
        GROUP BY categories.id, categories.nom
        ORDER BY categories.nom";

$categories = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
?>

<h1>La médiathèque</h1>
<ul>
    <?php foreach ($categories as $category) { ?>
        <li>
            <a href="index.php?page=categorie&id=<?php echo $category['id']; ?>">
                <?php echo $category['nom']; ?>
            </a>
            (<?php echo $category['nb_livres']; ?> livres)
        </li>
    <?php } ?>
</ul>
