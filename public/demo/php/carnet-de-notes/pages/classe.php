<?php
$bestAverage = -1;
$bestStudent = null;
$classTotal = 0;

foreach ($students as $student) {
    $average = array_sum($student['notes']) / count($student['notes']);
    $classTotal += $average;

    if ($average > $bestAverage) {
        $bestAverage = $average;
        $bestStudent = $student;
    }
}

$classAverage = $classTotal / count($students);
?>

<h2>La classe</h2>
<table border="1">
    <thead>
        <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Âge</th>
            <th>Moyenne</th>
            <th>Mention</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($students as $student) { ?>
            <?php $average = array_sum($student['notes']) / count($student['notes']); ?>
            <tr>
                <td><?= $student['prenom'] ?></td>
                <td><?= $student['nom'] ?></td>
                <td><?= $student['age'] ?> ans</td>
                <td><?= round($average, 2) ?></td>
                <td>
                    <?php if ($average >= 10) { ?>
                        Admis
                    <?php } else { ?>
                        Non admis
                    <?php } ?>
                </td>
            </tr>
        <?php } ?>
    </tbody>
</table>
<p><?= count($students) ?> élèves dans la classe.</p>

<h2>Bilan de la classe</h2>
<p>
    Meilleur élève :
    <strong><?= $bestStudent['prenom'] ?> <?= $bestStudent['nom'] ?></strong>
    avec <?= round($bestAverage, 2) ?>/20.
</p>
<p>Moyenne générale de la classe : <?= round($classAverage, 2) ?>/20.</p>

<h2>Toutes les notes</h2>
<?php foreach ($students as $student) { ?>
    <h3><?= $student['prenom'] ?></h3>
    <ul>
        <?php foreach ($student['notes'] as $subject => $note) { ?>
            <li><?= $subject ?> : <?= $note ?>/20</li>
        <?php } ?>
    </ul>
<?php } ?>
