<?php
$ideas = Idea::all();
?>

<h1>Les idées déposées</h1>

<?php if (isset($_SESSION['message'])) { ?>
    <p class="message"><?php echo htmlspecialchars($_SESSION['message']); ?></p>
    <?php unset($_SESSION['message']); ?>
<?php } ?>

<?php foreach ($ideas as $idea) { ?>
    <article class="idea">
        <h2>
            <a href="index.php?page=idee&id=<?php echo $idea->id; ?>">
                <?php echo htmlspecialchars($idea->title); ?>
            </a>
        </h2>
        <p class="meta">
            Par <?php echo htmlspecialchars($idea->author); ?>,
            le <?php echo date('d/m/Y', strtotime($idea->createdAt)); ?>
        </p>
        <p><?php echo htmlspecialchars($idea->getShortContent()); ?></p>
    </article>
<?php } ?>
