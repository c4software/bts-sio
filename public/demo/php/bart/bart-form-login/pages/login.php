<?php
$error = "";

// Le formulaire a-t-il été envoyé ?
if (isset($_POST['email']) && isset($_POST['password'])) {
    if ($_POST['email'] === "admin@exemple.com" && $_POST['password'] === "mdp") {
        // Connexion réussie : on garde l'information en session
        $_SESSION['user'] = $_POST['email'];
        $_SESSION['message'] = "Bienvenue " . $_POST['email'];

        header('location: index.php?page=home');
        die();
    } else {
        $error = "Email ou mot de passe incorrect.";
    }
}
?>
<div class="card">
    <h2>Connexion</h2>

    <?php if ($error !== "") { ?>
        <p class="erreur"><?php echo $error; ?></p>
    <?php } ?>

    <form action="index.php?page=login" method="post">
        <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" class="form-control" name="email" id="email">
        </div>

        <div class="form-group">
            <label for="password">Mot de passe :</label>
            <input type="password" class="form-control" name="password" id="password">
        </div>

        <input type="submit" value="Se connecter" class="btn btn-danger ma-auto">
    </form>
</div>
