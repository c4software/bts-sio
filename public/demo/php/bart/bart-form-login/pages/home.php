<?php
// Le message flash : on l'affiche une fois, puis on l'oublie
if (isset($_SESSION['message'])) {
    echo '<div class="flash">' . htmlspecialchars($_SESSION['message']) . '</div>';
    unset($_SESSION['message']);
}

// Le dernier choix du visiteur, mémorisé en session
$phrase = "Je ne copie pas le code de Valentin";
if (isset($_SESSION['last_phrase'])) {
    $phrase = $_SESSION['last_phrase'];
}

$count = 10;
if (isset($_SESSION['last_count'])) {
    $count = $_SESSION['last_count'];
}

// Le nombre de punitions générées pendant cette visite
$generated = 0;
if (isset($_SESSION['generated'])) {
    $generated = $_SESSION['generated'];
}

// Les données, elles, sont en base
$sql = "SELECT phrase, nombre, date_creation FROM phrases ORDER BY date_creation DESC LIMIT 5";
$punitions = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
$total = $pdo->query("SELECT COUNT(*) FROM phrases")->fetchColumn();
?>
<?php if (isset($_SESSION['user'])) { ?>
<div class="card">
    <form action="index.php?page=bart" method="post">
        <div class="form-group">
            <label for="count">Nombre de lignes :</label>
            <select name="count" id="count" class="form-control">
                <?php foreach ([10, 20, 50, 100, 1000] as $value) { ?>
                    <option value="<?php echo $value; ?>" <?php if ($value == $count) { echo 'selected'; } ?>>
                        <?php echo $value; ?>
                    </option>
                <?php } ?>
            </select>
        </div>

        <div class="form-group">
            <label for="phrase">Phrase à écrire :</label>
            <input type="text" class="form-control" name="phrase" id="phrase" value="<?php echo htmlspecialchars($phrase); ?>">
        </div>

        <input type="submit" value="Générer la punition" class="btn btn-danger ma-auto">
    </form>
</div>
<?php } else { ?>
<div class="card">
    <p>
        Pour générer une punition, vous devez d'abord
        <a href="index.php?page=login">vous connecter</a>.
    </p>
</div>
<?php } ?>

<?php if (isset($_SESSION['last_phrase'])) { ?>
    <div class="tableau">
        <?php displayPunition($_SESSION['last_phrase'], $_SESSION['last_count']); ?>
    </div>
<?php } ?>

<div class="card">
    <h2>Les 5 dernières punitions</h2>

    <p>
        Vous avez généré <?php echo $generated; ?> punition(s) pendant cette visite,
        sur <?php echo $total; ?> enregistrée(s) dans la base depuis toujours.
    </p>

    <ul class="punitions">
        <?php foreach ($punitions as $punition) { ?>
            <li>
                <?php echo $punition['nombre']; ?> ×
                <?php echo htmlspecialchars($punition['phrase']); ?>
                <span class="date"><?php echo $punition['date_creation']; ?></span>
            </li>
        <?php } ?>
    </ul>
</div>
