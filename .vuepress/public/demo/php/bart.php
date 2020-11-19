<?php
$lignes = 50;
$phrase = "Je ne recopierai pas l'exemple de Valentin";
$count = 0;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bart Générator</title>

    <style>
        .tableau {
            background-color: #1E5518;
            color: white;
            border: 5px solid #5E3600;
            padding: 10px;
            max-width: 900px;
            margin: auto;
            height: 400px;
            overflow: auto;
            background-image: url(./img/bart.png);
            background-size: 170px;
            background-repeat: no-repeat;
            background-position: bottom right;
            font-family: cursive;
            font-size: x-large;
        }
    </style>
</head>

<body>
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