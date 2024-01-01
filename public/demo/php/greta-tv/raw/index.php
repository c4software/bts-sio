<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greta TV</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Greta TV</a>
        </div>
    </nav>
    
    <div class="container">
        <div class="container">
            <div class="row pt-5">
                <?php 
                $videos = ["BcgsOgjHgWA","lcOxhH8N3Bo","jTuBnZrLbq0", "M2VtfZDOcHQ", "i1iIaSbK9bg", "MTaHw-S6IDo", "KfMCApWc5xE", "igtN49I1CtM"];
                $i = 0;
                foreach ($videos as $id) {
                    $i++;
                ?>

                    <div class="col-sm-12 col-md-3 p-3">
                        <div class="card">
                            <div class="card-body text-center">
                                    <a href="tv.php?id=<?=$id?>" class="btn btn-outline-primary">Video <?= $i ?></a>
                            </div>
                        </div>
                    </div>
                    
                <?php
                }
                ?>
            </div>
        </div>
    </div>
</body>
</html>