<?php
    session_start();

    $lignes = isset($_POST['count']) ? $_POST['count'] : 3;
    $phrase = isset($_POST['sentence']) ? $_POST['sentence'] : "Ceci est une phrase d'exemple";
    $count = 0;

    $_SESSION['phrase'] = $phrase;
    setcookie("phrase", $phrase);
?>

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

    <div class="tableau">
        <?php
        while ($count < $lignes) {
            echo $phrase . '<br />';
            $count++;
        }
        ?>
    </div>
</body>

</html>