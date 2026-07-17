<div class="container">
    <div class="row pt-5">
        <?php
            $videos = array("BcgsOgjHgWA","lcOxhH8N3Bo","jTuBnZrLbq0", "M2VtfZDOcHQ", "i1iIaSbK9bg", "MTaHw-S6IDo", "KfMCApWc5xE", "igtN49I1CtM");
            $i = 0;
            foreach ($videos as $id) {
                $i++;
        ?>

            <div class="col-sm-12 col-md-3 p-3">
                <div class="card">
                    <div class="card-body text-center">
                            <a href="index.php?page=tv&id=<?=$id?>" class="btn btn-outline-primary">Video <?= $i ?></a>
                    </div>
                </div>
            </div>
            
        <?php
            }
        ?>
    </div>
</div>