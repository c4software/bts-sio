<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La boîte à idées</title>
    <link rel="stylesheet" href="./public/main.css">
</head>

<body>
    <header>
        <a href="index.php?page=home">La boîte à idées</a>
        <span><?php echo Idea::count(); ?> idées déposées</span>
        <a href="index.php?page=proposer">Proposer une idée</a>
    </header>
    <main>
