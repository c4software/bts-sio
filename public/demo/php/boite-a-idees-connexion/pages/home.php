<?php
$ideas = Idea::all();
?>
<h2>Les idées proposées (<?= Idea::count() ?>)</h2>

<?php foreach ($ideas as $idea) : ?>
    <article class="idea">
        <h3><a href="index.php?page=idee&id=<?= $idea->id ?>"><?= htmlspecialchars($idea->title) ?></a></h3>
        <p class="meta">Par <?= htmlspecialchars($idea->author) ?>, le <?= htmlspecialchars($idea->createdAt) ?></p>
        <p><?= htmlspecialchars($idea->getShortContent()) ?></p>
    </article>
<?php endforeach; ?>
