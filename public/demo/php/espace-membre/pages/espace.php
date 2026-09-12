<?php
// On récupère les informations de l'utilisateur connecté (requête préparée)
$stmt = $pdo->prepare("SELECT email, date_inscription FROM utilisateurs WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<h1>Mon espace</h1>

<p>
    Bienvenue <strong><?php echo htmlspecialchars($user['email']); ?></strong>,
    inscrit depuis le <?php echo date('d/m/Y', strtotime($user['date_inscription'])); ?>.
</p>

<p>Cette page n'est visible que par les personnes connectées.</p>

<p><a class="button" href="index.php?page=deconnexion">Se déconnecter</a></p>
