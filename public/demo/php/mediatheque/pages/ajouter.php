<?php
include('./utils/db.php');

$categories = $pdo->query("SELECT id, nom FROM categories ORDER BY nom")->fetchAll(PDO::FETCH_ASSOC);
$error = '';

if (isset($_POST['titre'], $_POST['auteur'], $_POST['annee'], $_POST['categorie_id'])) {
    if ($_POST['titre'] === '' || $_POST['auteur'] === '' || $_POST['annee'] === '') {
        $error = 'Tous les champs sont obligatoires.';
    } else {
        $stmt = $pdo->prepare("INSERT INTO livres (titre, auteur, annee, categorie_id)
                               VALUES (?, ?, ?, ?)");
        $stmt->execute([$_POST['titre'], $_POST['auteur'], $_POST['annee'], $_POST['categorie_id']]);

        header('location: index.php?page=livre&id=' . $pdo->lastInsertId());
        die();
    }
}
?>

<h1>Ajouter un livre</h1>

<?php if ($error !== '') { ?>
    <p><strong><?php echo $error; ?></strong></p>
<?php } ?>

<form method="post" action="index.php?page=ajouter">
    <p><label>Titre <input type="text" name="titre"></label></p>
    <p><label>Auteur <input type="text" name="auteur"></label></p>
    <p><label>Année <input type="number" name="annee"></label></p>
    <p>
        <label>Catégorie
            <select name="categorie_id">
                <?php foreach ($categories as $category) { ?>
                    <option value="<?php echo $category['id']; ?>"><?php echo $category['nom']; ?></option>
                <?php } ?>
            </select>
        </label>
    </p>
    <p><button type="submit">Ajouter</button></p>
</form>
