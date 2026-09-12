<?php
include('./utils/db.php');

$sql = "SELECT adherents.*, COUNT(emprunts.id) AS nb_emprunts
        FROM adherents
        LEFT JOIN emprunts ON emprunts.adherent_id = adherents.id AND emprunts.date_retour IS NULL
        GROUP BY adherents.id
        ORDER BY adherents.nom";

$members = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
?>

<h1>Les adhérents</h1>
<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Inscrit le</th>
            <th>Emprunts en cours</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($members as $member) { ?>
            <tr>
                <td><?php echo $member['nom']; ?></td>
                <td><?php echo $member['prenom']; ?></td>
                <td><?php echo $member['email']; ?></td>
                <td><?php echo date('d/m/Y', strtotime($member['date_inscription'])); ?></td>
                <td><?php echo $member['nb_emprunts']; ?></td>
            </tr>
        <?php } ?>
    </tbody>
</table>
