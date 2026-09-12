<?php
// La liste des matières valides, déduite des notes du premier élève
$validSubjects = array_keys($students[0]['notes']);
?>

<h2>Classement par matière</h2>
<p>
    <?php foreach ($validSubjects as $subject) { ?>
        <a href="index.php?page=matiere&matiere=<?= $subject ?>"><?= $subject ?></a> |
    <?php } ?>
    <a href="index.php?page=classe">Toute la classe</a>
</p>

<?php if (isset($_GET['matiere'])) { ?>
    <?php if (in_array($_GET['matiere'], $validSubjects)) { ?>
        <?php $filter = $_GET['matiere']; ?>
        <h2>Classement en <?= $filter ?></h2>
        <table border="1">
            <tr><th>Élève</th><th>Note</th></tr>
            <?php foreach ($students as $student) { ?>
                <tr>
                    <td><?= $student['prenom'] ?> <?= $student['nom'] ?></td>
                    <td><?= $student['notes'][$filter] ?>/20</td>
                </tr>
            <?php } ?>
        </table>
    <?php } else { ?>
        <p><strong>Cette matière n'existe pas.</strong> Choisissez une matière dans la liste ci-dessus.</p>
    <?php } ?>
<?php } else { ?>
    <p>Choisissez une matière ci-dessus.</p>
<?php } ?>
