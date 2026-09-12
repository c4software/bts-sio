<?php
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (Auth::attempt($email, $password)) {
        header('location: index.php?page=admin');
        die();
    }

    $error = "Identifiants incorrects.";
}
?>
<h2>Connexion</h2>

<?php if ($error !== null) : ?>
    <p class="error"><?= htmlspecialchars($error) ?></p>
<?php endif; ?>

<form method="post" action="index.php?page=connexion">
    <p><label>Email <input type="email" name="email" required></label></p>
    <p><label>Mot de passe <input type="password" name="password" required></label></p>
    <p><button type="submit">Se connecter</button></p>
</form>
