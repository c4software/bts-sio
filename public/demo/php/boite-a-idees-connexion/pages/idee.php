<?php
$idea = Idea::find((int) ($_GET['id'] ?? 0));

if ($idea === null) {
    echo "<p>Idée introuvable.</p>";
    return;
}
?>
<h2><?= htmlspecialchars($idea->title) ?></h2>
<p class="meta">Par <?= htmlspecialchars($idea->author) ?>, le <?= htmlspecialchars($idea->createdAt) ?></p>
<p><?= nl2br(htmlspecialchars($idea->content)) ?></p>
<p><a href="index.php?page=home">Retour à la liste</a></p>
