<?php
// Les valeurs reçues du formulaire (avec une valeur par défaut)
$phrase = "Ceci est une phrase d'exemple";
if (isset($_POST['phrase'])) {
    $phrase = $_POST['phrase'];
}

$count = 3;
if (isset($_POST['count'])) {
    $count = $_POST['count'];
}

// Enregistrement de la punition (uniquement si elle vient du formulaire)
if (isset($_POST['phrase']) && isset($_POST['count'])) {
    $sql = "INSERT INTO phrases (phrase, nombre) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$phrase, $count]);
}
?>
<div class="tableau">
    <?php displayPunition($phrase, $count); ?>
</div>
