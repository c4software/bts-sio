<?php

// L'identifiant est-il présent et bien formé ?
if (!isset($_GET['id']) || !ctype_digit($_GET['id'])) {
    header('location: index.php?page=home');
    die();
}

// La tâche existe-t-elle ?
$stmt = $pdo->prepare("SELECT * FROM taches WHERE id = ?");
$stmt->execute([$_GET['id']]);
$task = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$task) {
    header('location: index.php?page=home');
    die();
}

// Traitement du formulaire
if (isset($_POST['titre']) && isset($_POST['categorie_id'])) {

    $titre = trim($_POST['titre']);

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM categories WHERE id = ?");
    $stmt->execute([$_POST['categorie_id']]);
    $exists = $stmt->fetchColumn() > 0;

    if ($titre !== '' && $exists) {
        $stmt = $pdo->prepare("UPDATE taches SET titre = ?, categorie_id = ? WHERE id = ?");
        $stmt->execute([$titre, $_POST['categorie_id'], $task['id']]);

        $_SESSION['flash'] = "Tâche modifiée.";
    } else {
        $_SESSION['flash'] = "Modification refusée : titre vide ou catégorie inconnue.";
    }

    header('location: index.php?page=home');
    die();
}

$categories = $pdo->query("SELECT * FROM categories ORDER BY nom")->fetchAll(PDO::FETCH_ASSOC);
?>

<h2>Modifier une tâche</h2>

<form method="post" action="index.php?page=modifier&id=<?php echo $task['id']; ?>">
    <input type="text" name="titre" value="<?php echo $task['titre']; ?>">
    <select name="categorie_id">
        <?php foreach ($categories as $category) { ?>
            <option value="<?php echo $category['id']; ?>" <?php if ($category['id'] == $task['categorie_id']) { echo 'selected'; } ?>>
                <?php echo $category['nom']; ?>
            </option>
        <?php } ?>
    </select>
    <button type="submit">Enregistrer</button>
</form>

<p><a href="index.php?page=home">Retour à la liste</a></p>
