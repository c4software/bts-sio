<?php

// Le formulaire a-t-il bien été envoyé ?
if (isset($_POST['titre']) && isset($_POST['categorie_id'])) {

    $titre = trim($_POST['titre']);

    // La catégorie existe-t-elle vraiment en base ?
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM categories WHERE id = ?");
    $stmt->execute([$_POST['categorie_id']]);
    $exists = $stmt->fetchColumn() > 0;

    if ($titre !== '' && $exists) {
        $stmt = $pdo->prepare("INSERT INTO taches (titre, categorie_id) VALUES (?, ?)");
        $stmt->execute([$titre, $_POST['categorie_id']]);

        $_SESSION['flash'] = "Tâche ajoutée.";
    } else {
        $_SESSION['flash'] = "Tâche refusée : titre vide ou catégorie inconnue.";
    }
}

// Dans tous les cas, on repart sur la liste
header('location: index.php?page=home');
die();
