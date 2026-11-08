<?php
    $error = false;
    if(isset($_POST['login']) && isset($_POST['password'])){
        // Vérification si l'utilisateur existe
        $stmt= $pdo->prepare("SELECT * FROM users WHERE login=? AND password=SHA2(?, 512)");
        $stmt->execute([$_POST['login'], $_POST['password']]);
        $users = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // La personne existe en base de données (nous allons donc la connecter)
        if(count($users) == 1){
            // Réussite de la connexion, on sauvegarde dans la SESSION les informations.
            $_SESSION['user'] = $users[0]; // Sauvegarde le premier utilisateur
            header("location: / ");
            die();
        } else {
            // Action en cas d'echec de connexion
            $error = true;
        }
    }
?>
<h1 class="mb-4">Connexion</h1>
<?php if ($error) { ?>
    <div class="alert alert-danger">Identifiant ou mot de passe incorrect.</div>
<?php } ?>
<form method="post" action="index.php?page=login" class="col-md-6">
    <input class="form-control mb-2" type="text" name="login" placeholder="Identifiant">
    <input class="form-control mb-2" type="password" name="password" placeholder="Mot de passe">
    <button class="btn btn-primary" type="submit">Se connecter</button>
</form>
