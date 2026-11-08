<?php
// Ajout d'une vidéo, liée à la personne connectée
if (isset($_POST['titre']) && isset($_POST['youtube_id']) && trim($_POST['titre']) !== '' && trim($_POST['youtube_id']) !== '') {
    $stmt = $pdo->prepare("INSERT INTO videos (titre, youtube_id, user_id) VALUES (?, ?, ?)");
    $stmt->execute([trim($_POST['titre']), trim($_POST['youtube_id']), $_SESSION['user']['id']]);
    header('location: index.php?page=admin');
    die();
}

// Suppression d'une vidéo
if (isset($_GET['supprimer']) && ctype_digit($_GET['supprimer'])) {
    $stmt = $pdo->prepare("DELETE FROM videos WHERE id = ?");
    $stmt->execute([$_GET['supprimer']]);
    header('location: index.php?page=admin');
    die();
}

// La liste des vidéos, avec le login de la personne qui l'a ajoutée
$videos = $pdo->query("SELECT videos.*, users.login FROM videos JOIN users ON users.id = videos.user_id")->fetchAll(PDO::FETCH_ASSOC);
?>
<div class="card bg-light mb-4 mx-auto" style="max-width: 600px">
    <div class="card-body">
        <h5>Ajouter une vidéo</h5>
        <form method="post" action="index.php?page=admin">
            <input class="form-control mb-2" type="text" name="titre" placeholder="Nom de votre vidéo">
            <input class="form-control mb-2" type="text" name="youtube_id" placeholder="Identifiant de votre vidéo">
            <div class="text-end"><button class="btn btn-primary" type="submit">Ajouter</button></div>
        </form>
    </div>
</div>
<table class="table table-bordered">
    <tr><th>#</th><th>Titre</th><th>Identifiant YouTube</th><th>Ajoutée par</th><th>Action</th></tr>
    <?php foreach ($videos as $video) { ?>
        <tr>
            <td><?php echo $video['id']; ?></td>
            <td><?php echo $video['titre']; ?></td>
            <td><?php echo $video['youtube_id']; ?></td>
            <td><?php echo $video['login']; ?></td>
            <td><a class="btn btn-sm btn-danger" href="index.php?page=admin&supprimer=<?php echo $video['id']; ?>">Supprimer</a></td>
        </tr>
    <?php } ?>
</table>
