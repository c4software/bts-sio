<div class="container">
    <div class="row pt-5">
        <?php
        foreach ($videos as $video) {
            ?>

            <div class="col-sm-12 col-md-3 p-3">
                <div class="card">
                    <div class="card-body text-center">
                        <a href="./tv?id=<?= $video['videoId'] ?>" class="btn btn-outline-primary"><?= $video['name'] ?></a>
                    </div>
                </div>
            </div>

            <?php
        }
        ?>
    </div>
</div>