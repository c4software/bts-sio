<?php
$sql = "SELECT taches.*, categories.nom AS categorie
        FROM taches
        JOIN categories ON categories.id = taches.categorie_id
        ORDER BY taches.id";

$tasks = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

$categories = $pdo->query("SELECT * FROM categories ORDER BY nom")->fetchAll(PDO::FETCH_ASSOC);
?>

<h2>Mes tâches</h2>

<ul class="tasks">
    <?php foreach ($tasks as $task) { ?>
        <li class="<?php if ($task['terminee']) { echo 'done'; } ?>">
            <span class="title"><?php echo $task['titre']; ?></span>
            <span class="category"><?php echo $task['categorie']; ?></span>
            <?php if (!$task['terminee']) { ?>
                <a href="index.php?page=terminer&id=<?php echo $task['id']; ?>">Terminer</a>
            <?php } ?>
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
