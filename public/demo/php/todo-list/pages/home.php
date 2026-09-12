<?php

// Le filtre éventuel : index.php?page=home&categorie=2
$filterId = null;

if (isset($_GET['categorie']) && ctype_digit($_GET['categorie'])) {
    $filterId = (int) $_GET['categorie'];
}

// Les catégories, avec le nombre de tâches restantes de chacune
$sql = "SELECT categories.id, categories.nom, COUNT(taches.id) AS nb_restantes
        FROM categories
        LEFT JOIN taches ON taches.categorie_id = categories.id AND taches.terminee = 0
        GROUP BY categories.id, categories.nom
        ORDER BY categories.nom";

$categories = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

// Les compteurs globaux
$counters = $pdo->query("SELECT COUNT(*) AS total, SUM(terminee) AS terminees FROM taches")->fetch(PDO::FETCH_ASSOC);

// Les tâches, filtrées ou non
if ($filterId === null) {
    $sql = "SELECT taches.*, categories.nom AS categorie
            FROM taches
            JOIN categories ON categories.id = taches.categorie_id
            ORDER BY taches.id";

    $tasks = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
} else {
    $sql = "SELECT taches.*, categories.nom AS categorie
            FROM taches
            JOIN categories ON categories.id = taches.categorie_id
            WHERE taches.categorie_id = ?
            ORDER BY taches.id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$filterId]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>

<h2>Mes tâches</h2>

<p><?php echo $counters['total']; ?> tâches, <?php echo (int) $counters['terminees']; ?> terminée(s).</p>

<p class="filters">
    <a href="index.php?page=home">Toutes</a>
    <?php foreach ($categories as $category) { ?>
        <a href="index.php?page=home&categorie=<?php echo $category['id']; ?>">
            <?php echo $category['nom']; ?> (<?php echo $category['nb_restantes']; ?>)
        </a>
    <?php } ?>
</p>

<?php if (count($tasks) === 0) { ?>
    <p class="error">Aucune tâche à afficher.</p>
<?php } ?>

<ul class="tasks">
    <?php foreach ($tasks as $task) { ?>
        <li class="<?php if ($task['terminee']) { echo 'done'; } ?>">
            <span class="title"><?php echo $task['titre']; ?></span>
            <span class="category"><?php echo $task['categorie']; ?></span>
            <?php if (!$task['terminee']) { ?>
                <a href="index.php?page=terminer&id=<?php echo $task['id']; ?>">Terminer</a>
            <?php } ?>
            <a href="index.php?page=modifier&id=<?php echo $task['id']; ?>">Modifier</a>
            <a href="index.php?page=supprimer&id=<?php echo $task['id']; ?>">Supprimer</a>
        </li>
    <?php } ?>
</ul>

<h3>Ajouter une tâche</h3>

<form method="post" action="index.php?page=ajouter">
    <input type="text" name="titre" placeholder="Ma nouvelle tâche">
    <select name="categorie_id">
        <?php foreach ($categories as $category) { ?>
            <option value="<?php echo $category['id']; ?>"><?php echo $category['nom']; ?></option>
        <?php } ?>
    </select>
    <button type="submit">Ajouter</button>
</form>
