<?php
$error = null;

// Compteur de tentatives (bonus)
if (!isset($_SESSION['attempts'])) {
    $_SESSION['attempts'] = 0;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_SESSION['attempts'] >= 5) {
        $error = "Trop de tentatives, patientez un instant avant de réessayer.";
    } else {
        // 1. Récupération des valeurs envoyées par le formulaire
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        // 2. On cherche l'utilisateur par son email (requête préparée)
        $stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // 3. L'utilisateur existe et le mot de passe correspond au hash stocké
        if ($user && password_verify($password, $user['mot_de_passe'])) {
            // Nouvel identifiant de session : on repart sur une session « propre »
            session_regenerate_id(true);

            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['attempts'] = 0;

            header('location: index.php?page=espace');
            die();
        }

        // 4. Échec : un seul message, toujours le même
        $_SESSION['attempts'] = $_SESSION['attempts'] + 1;
        $error = "Email ou mot de passe incorrect.";
    }
}
?>

<h1>Connexion</h1>

<?php if (isset($_GET['inscription'])) { ?>
    <p class="succes">Votre compte est créé, vous pouvez maintenant vous connecter.</p>
<?php } ?>

<?php if ($error !== null) { ?>
    <p class="erreur"><?php echo htmlspecialchars($error); ?></p>
<?php } ?>

<form method="post" action="index.php?page=connexion">
    <p>
        <label for="email">Adresse email</label>
        <input type="email" name="email" id="email" required>
    </p>
    <p>
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" required>
    </p>
    <p>
        <button type="submit">Se connecter</button>
    </p>
</form>

<p>Pas encore de compte ? <a href="index.php?page=inscription">Créez-en un</a>.</p>
