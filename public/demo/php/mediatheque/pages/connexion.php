<?php
$error = '';

if (isset($_POST['login']) && isset($_POST['password'])) {
    if ($_POST['login'] === $login && $_POST['password'] === $password) {
        $_SESSION['connected'] = true;
        header('location: index.php?page=home');
        die();
    }

    $error = 'Identifiants incorrects.';
}
?>

<h1>Connexion</h1>

<?php if ($error !== '') { ?>
    <p><strong><?php echo $error; ?></strong></p>
<?php } ?>

<form method="post" action="index.php?page=connexion">
    <p><label>Identifiant <input type="text" name="login"></label></p>
    <p><label>Mot de passe <input type="password" name="password"></label></p>
    <p><button type="submit">Se connecter</button></p>
</form>
