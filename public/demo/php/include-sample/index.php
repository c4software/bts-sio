<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Page avec des includes</title>
    <link rel="stylesheet" href="./public/main.css">
</head>

<body>
    <?php include('./common/header.php'); ?>

    <?php include('./common/nav.php'); ?>

    <section>
        <h1>Contenu réel de votre page</h1>
        <img src="https://picsum.photos/800/300" />
    </section>

    <?php include('./common/footer.php'); ?>
</body>

</html>