<h2>Ajouter un élève</h2>

<form method="post" action="index.php?page=ajouter">
    <p><label>Prénom <input type="text" name="prenom"></label></p>
    <p><label>Nom <input type="text" name="nom"></label></p>
    <p><label>Âge <input type="number" name="age"></label></p>
    <p><button type="submit">Ajouter</button></p>
</form>

<?php
if (isset($_POST['prenom']) && isset($_POST['nom']) && isset($_POST['age'])) {
    // L'élève, en requête préparée (les valeurs viennent du formulaire)
    $stmt = $pdo->prepare('INSERT INTO eleves (prenom, nom, age) VALUES (?, ?, ?)');
    $stmt->execute(array($_POST['prenom'], $_POST['nom'], $_POST['age']));

    // Ses notes, à zéro pour l'instant : lastInsertId() donne l'id du nouvel élève
    $id = $pdo->lastInsertId();
    $stmt = $pdo->prepare('INSERT INTO notes (eleve_id, matiere, note) VALUES (?, ?, 0)');

    foreach (array('php', 'sql', 'reseau') as $subject) {
        $stmt->execute(array($id, $subject));
    }

    // On repart sur la page de la classe, l'élève y est maintenant
    header('Location: index.php?page=classe');
    die();
}
?>
