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

<?php if ($error !== null) { ?>
    <p class="error"><?php echo $error; ?></p>
<?php } ?>

<form method="post" action="index.php?page=connexion">
    <label for="email">Email</label>
    <input type="email" name="email" id="email">

    <label for="password">Mot de passe</label>
    <input type="password" name="password" id="password">

    <button type="submit">Se connecter</button>
</form>
