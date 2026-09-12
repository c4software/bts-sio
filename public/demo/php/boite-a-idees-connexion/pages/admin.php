<?php
if (isset($_GET['delete'])) {
    $idea = Idea::find((int) $_GET['delete']);

    if ($idea !== null) {
        $idea->delete();
    }

    header('location: index.php?page=admin');
    die();
}

$ideas = Idea::all();
?>
<h2>Administration</h2>
<p>Bonjour <?= htmlspecialchars(Auth::name()) ?>, il y a <?= Idea::count() ?> idée(s) dans la boîte.</p>

<table>
    <tr><th>Titre</th><th>Auteur</th><th>Date</th><th>Action</th></tr>
    <?php foreach ($ideas as $idea) : ?>
        <tr>
            <td><?= htmlspecialchars($idea->title) ?></td>
            <td><?= htmlspecialchars($idea->author) ?></td>
            <td><?= htmlspecialchars($idea->createdAt) ?></td>
            <td><a href="index.php?page=admin&delete=<?= $idea->id ?>">Supprimer</a></td>
        </tr>
    <?php endforeach; ?>
</table>
