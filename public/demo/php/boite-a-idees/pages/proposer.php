<?php
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['titre'] ?? '');
    $author = trim($_POST['auteur'] ?? '');
    $content = trim($_POST['contenu'] ?? '');

    if ($title === '' || $author === '' || $content === '') {
        $error = "Tous les champs sont obligatoires.";
    } else {
        $idea = new Idea(null, $title, $author, $content, date('Y-m-d H:i:s'));
        $idea->save();

        $_SESSION['message'] = "Merci, votre idée a bien été déposée.";
        header('location: index.php?page=home');
        die();
    }
}
?>

<h1>Proposer une idée</h1>

<?php if ($error !== null) { ?>
    <p class="error"><?php echo $error; ?></p>
<?php } ?>

<form method="post" action="index.php?page=proposer">
    <label for="titre">Le titre de votre idée</label>
    <input type="text" name="titre" id="titre" maxlength="150">

    <label for="auteur">Votre prénom</label>
    <input type="text" name="auteur" id="auteur" maxlength="100">

    <label for="contenu">Expliquez votre idée</label>
    <textarea name="contenu" id="contenu" rows="6"></textarea>

    <button type="submit">Déposer l'idée</button>
</form>
