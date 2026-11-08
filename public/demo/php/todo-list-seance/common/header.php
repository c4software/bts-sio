<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma TODO List</title>
    <link rel="stylesheet" href="public/main.css">
</head>

<body>
    <header>
        <h1>Ma TODO List</h1>
        <nav>
            <a href="index.php?page=home">Mes tâches</a>
            <a href="index.php?page=categories">Mes catégories</a>
        </nav>
    </header>
    <main>
        <?php if (isset($_SESSION['flash'])) { ?>
            <p class="flash"><?php echo $_SESSION['flash']; ?></p>
            <?php unset($_SESSION['flash']); ?>
        <?php } ?>
