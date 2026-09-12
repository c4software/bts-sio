<?php
// La phrase proposée dans le formulaire (modifiable via index.php?page=home&phrase=...)
$phrase = "Je ne copie pas le code de Valentin";
if (isset($_GET['phrase'])) {
    $phrase = $_GET['phrase'];
}

// Les 5 dernières punitions enregistrées
$sql = "SELECT phrase, nombre, date_creation FROM phrases ORDER BY date_creation DESC LIMIT 5";
$punitions = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
?>
<div class="card">
    <form action="index.php?page=bart" method="post">
        <div class="form-group">
            <label for="count">Nombre de lignes :</label>
            <select name="count" id="count" class="form-control">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
            </select>
        </div>

        <div class="form-group">
            <label for="phrase">Phrase à écrire :</label>
            <input type="text" class="form-control" name="phrase" id="phrase" value="<?php echo htmlspecialchars($phrase); ?>">
        </div>

        <input type="submit" value="Générer la punition" class="btn btn-danger ma-auto">
    </form>
</div>

<div class="card">
    <h2>Les 5 dernières punitions</h2>

    <ul class="punitions">
        <?php foreach ($punitions as $punition) { ?>
            <li>
                <a href="index.php?page=home&phrase=<?php echo urlencode($punition['phrase']); ?>">
                    <?php echo $punition['nombre']; ?> ×
                    <?php echo htmlspecialchars($punition['phrase']); ?>
                </a>
                <span class="date"><?php echo $punition['date_creation']; ?></span>
            </li>
        <?php } ?>
    </ul>
</div>
