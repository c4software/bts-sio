<h2>Les matières</h2>
<ul>
    <?php foreach ($subjects as $subject) { ?>
        <li><?= $subject ?></li>
    <?php } ?>
</ul>
<p>Il y a <?= count($subjects) ?> matières au programme.</p>

<h2>Fiche élève</h2>
<p>
    <strong><?= $students[0]['prenom'] ?> <?= $students[0]['nom'] ?></strong><br>
    Âge : <?= $students[0]['age'] ?> ans
</p>
