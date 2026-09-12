<?php
if (!isset($_GET['id'])) {
    header('location: index.php?page=home');
    die();
}

$idea = Idea::find((int) $_GET['id']);

if ($idea === null) {
    echo "<h1>Idée introuvable</h1>";
    echo '<p><a href="index.php?page=home">Retour à la liste</a></p>';
    return;
}
?>

<h1><?php echo htmlspecialchars($idea->title); ?></h1>
<p class="meta">
    Par <?php echo htmlspecialchars($idea->author); ?>,
    le <?php echo date('d/m/Y à H:i', strtotime($idea->createdAt)); ?>
</p>
<p><?php echo nl2br(htmlspecialchars($idea->content)); ?></p>
<p><a href="index.php?page=home">Retour à la liste</a></p>
