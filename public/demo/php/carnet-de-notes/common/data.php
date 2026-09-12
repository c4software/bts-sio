<?php
// Les données de notre carnet de notes

// Les matières enseignées, tableau numéroté
$subjects = array('PHP', 'SQL', 'Réseau');

// Ajout d'un élément à la fin du tableau
$subjects[] = 'Maths';

// La classe, lue depuis la base de données
$students = $pdo->query('SELECT * FROM eleves')->fetchAll(PDO::FETCH_ASSOC);

// Pour chaque élève, on ajoute sa clé « notes »
$stmt = $pdo->prepare('SELECT matiere, note FROM notes WHERE eleve_id = ?');

foreach ($students as $key => $student) {
    $stmt->execute(array($student['id']));

    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
        $students[$key]['notes'][$row['matiere']] = $row['note'];
    }
}
