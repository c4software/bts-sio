<?php
// La liste des erreurs rencontrées (vide = tout va bien)
$errors = [];
$email = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Récupération des valeurs envoyées par le formulaire
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmation = $_POST['confirmation'] ?? '';

    // 2. Validation des saisies
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "L'adresse email n'est pas valide.";
    }

    if (strlen($password) < 8) {
        $errors[] = "Le mot de passe doit contenir au moins 8 caractères.";
    }

    if ($password !== $confirmation) {
        $errors[] = "Les deux mots de passe ne sont pas identiques.";
    }

    // 3. L'email est-il déjà utilisé ? (requête préparée)
    if (count($errors) === 0) {
        $stmt = $pdo->prepare("SELECT id FROM utilisateurs WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->fetch()) {
            $errors[] = "Cette adresse email est déjà utilisée.";
        }
    }

    // 4. Tout est bon : on hache le mot de passe et on enregistre
    if (count($errors) === 0) {
        $hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO utilisateurs (email, mot_de_passe) VALUES (?, ?)");
        $stmt->execute([$email, $hash]);

        header('location: index.php?page=connexion&inscription=ok');
        die();
    }
}
?>

<h1>Créer un compte</h1>

<?php if (count($errors) > 0) { ?>
    <ul class="erreur">
        <?php foreach ($errors as $error) { ?>
            <li><?php echo htmlspecialchars($error); ?></li>
        <?php } ?>
    </ul>
<?php } ?>

<form method="post" action="index.php?page=inscription">
    <p>
        <label for="email">Adresse email</label>
        <input type="email" name="email" id="email" value="<?php echo htmlspecialchars($email); ?>" required>
    </p>
    <p>
        <label for="password">Mot de passe (8 caractères minimum)</label>
        <input type="password" name="password" id="password" required>
    </p>
    <p>
        <label for="confirmation">Confirmation du mot de passe</label>
        <input type="password" name="confirmation" id="confirmation" required>
    </p>
    <p>
        <button type="submit">Créer mon compte</button>
    </p>
</form>

<p>Vous avez déjà un compte ? <a href="index.php?page=connexion">Connectez-vous</a>.</p>
