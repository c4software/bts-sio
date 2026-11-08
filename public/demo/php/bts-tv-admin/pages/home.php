<?php
    $results = $pdo->query("SELECT * FROM videos")->fetchAll(\PDO::FETCH_ASSOC);
?>
<h1 class="mb-4">Les vidéos</h1>
<div class="row">
    <?php foreach ($results as $video) { ?>
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><?php echo $video['titre']; ?></h5>
                    <a href="index.php?page=tv&id=<?php echo $video['id']; ?>" class="btn btn-primary">Regarder</a>
                </div>
            </div>
        </div>
    <?php } ?>
</div>
