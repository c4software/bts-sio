<?php
$message = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idea = new Idea(
        null,
        $_POST['title'] ?? '',
        $_POST['author'] ?? '',
        $_POST['content'] ?? '',
        date('Y-m-d H:i:s')
    );

    $idea->save();
    $message = "Merci, votre idée est enregistrée !";
}
?>
<h2>Proposer une idée</h2>

<?php if ($message !== null) : ?>
    <p class="message"><?= htmlspecialchars($message) ?></p>
<?php endif; ?>

<form method="post" action="index.php?page=proposer">
    <p><label>Titre <input type="text" name="title" required></label></p>
    <p><label>Votre nom <input type="text" name="author" required></label></p>
    <p><label>Votre idée <textarea name="content" required></textarea></label></p>
    <p><button type="submit">Envoyer</button></p>
</form>
