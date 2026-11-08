<?php
    // L'utilisateur accède à =>  http://localhost/index.php?page=tv&id=1

    // Pas d'identifiant dans l'URL : retour à l'accueil
    if(!isset($_GET['id'])){
        header('location: ./');
        die();
    }

    $stmt= $pdo->prepare("SELECT * FROM videos WHERE id = ?");
    $stmt->execute([$_GET['id']]); // ID reçu en paramètre
    $videos = $stmt->fetchAll(\PDO::FETCH_ASSOC);

    // La vidéo demandé n'existe pas.
    if(!$videos){
        // On redirige l'utilisateur vers la home
        header('location: ./');
        die();
    }

    // $video contient les informations de la vidéo à afficher
    $video = $videos[0];
?>
<h1><?php echo $video['titre']; ?></h1>
<div class="ratio ratio-16x9"><iframe src="https://www.youtube-nocookie.com/embed/<?php echo $video['youtube_id']; ?>" allowfullscreen></iframe></div>
