CREATE DATABASE IF NOT EXISTS boite_idees CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE boite_idees;

DROP TABLE IF EXISTS idees;

CREATE TABLE idees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(150) NOT NULL,
  auteur VARCHAR(100) NOT NULL,
  contenu TEXT NOT NULL,
  date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO idees (titre, auteur, contenu, date_creation) VALUES
('Un distributeur de pains au chocolat', 'Bart', 'Le distributeur du hall ne propose que des barres chocolatées tristes. Un vrai four à viennoiseries au rez-de-chaussée rendrait les lundis matin nettement plus supportables pour tout le monde.', '2026-01-12 08:32:00'),
('Des prises électriques dans la salle 204', 'Lisa', 'Trois prises pour vingt portables, le calcul est vite fait. Ajouter une goulotte le long des tables éviterait la course aux places près du mur.', '2026-01-14 10:05:00'),
('Un tournoi de code le vendredi midi', 'Milhouse', 'Une heure, un exercice, deux équipes. De quoi réviser sans en avoir l''air, et accessoirement de quoi décider qui paye les croissants du lundi.', '2026-01-15 12:47:00');
