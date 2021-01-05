<?php
    include('sample.php')
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

    <style>
        body{
            background: #fafafa;
        }

        .cardContainer{
            height: 80vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .card{
            width: 500px;
        }
    </style>
</head>
<body>
    <header>
        <nav class="navbar navbar-dark bg-dark p-3">
            <div class="container-fluid">
                <span class="text-white">
                    <?=formatIdentity('Valentin', 1987); ?>
                </span>

                <div class="d-flex text-white">
                    <?=mailCountFormat(10);?>
                </div>
            </div>
        </nav>
    </header>

    <section class="cardContainer">
        <div class="card">
            <div class="card-body text-center">
                <h1>Hello <?= getOrDefault('name', 'World'); ?></h1>
            </div>
        </div>
    </section>

    <footer class="text-center small">
        <?php echo date('Y'); ?> − Valentin
    </footer>

</body>
</html>