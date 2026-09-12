<?php

// Traitement du formulaire d'ajout
if (isset($_POST['nom'])) {

    $nom = trim($_POST['nom']);

    // La catégorie existe-t-elle déjà ?
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM categories WHERE nom = ?");
    $stmt->execute([$nom]);
    $exists = $stmt->fetchColumn() > 0;

    if ($nom !== '' && !$exists) {
        $stmt = $pdo->prepare("INSERT INTO categories (nom) VALUES (?)");
        $stmt->execute([$nom]);

        $_SESSION['flash'] = "Catégorie ajoutée.";
    } else {
        $_SESSION['flash'] = "Catégorie refusée : nom vide ou déjà existant.";
    }

    header('location: index.php?page=categories');
    die();
}

$sql = "SELECT categories.id, categories.nom, COUNT(taches.id) AS nb_taches
        FROM categories
        LEFT JOIN taches ON taches.categorie_id = categories.id
        GROUP BY categories.id, categories.nom
        ORDER BY categories.nom";

$categories = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
?>

<h2>Mes catégories</h2>

<ul>
    <?php foreach ($categories as $category) { ?>
        <li>
            <a href="index.php?page=home&categorie=<?php echo $category['id']; ?>">
                <?php echo $category['nom']; ?>
            </a>
            (<?php echo $category['nb_taches']; ?> tâches)
        </li>
    <?php } ?>
</ul>

<h3>Ajouter une catégorie</h3>

<form method="post" action="index.php?page=categories">
    <input type="text" name="nom" placeholder="Sport">
    <button type="submit">Ajouter</button>
</form>
