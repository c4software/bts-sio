<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le générateur de punition</title>
    <link rel="stylesheet" href="./public/main.css">
</head>

<body>
    <?php include('common/header.php'); ?>

    <div class="card">
        <form action="bart.php" method="post">
            <div class="form-group">
                <label for="count">Nombre de ligne :</label>
                <select name="count" class="form-control">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                </select>
            </div>

            <div class="form-group">
                <label for="sentence">Phrase à écrire : </label>
                <input type="text" class="form-control" name="sentence" value="Je ne copie pas le code de valentin">
            </div>

            <input type="submit" value="Générer la punition" class="btn btn-danger ma-auto">
        </form>
    </div>

</body>

</html>