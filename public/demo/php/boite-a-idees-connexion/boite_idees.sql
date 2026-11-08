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

-- TP 2 : la table des utilisateurs
DROP TABLE IF EXISTS utilisateurs;

CREATE TABLE utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  nom VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Le compte administrateur : admin@exemple.com, mot de passe « motdepasse ».
-- Le hash a été calculé avec password_hash("motdepasse", PASSWORD_DEFAULT).
INSERT INTO utilisateurs (email, mot_de_passe, nom) VALUES
('admin@exemple.com', '$2y$10$JwcxeB9JYpPA1sVJvO67E.bY6tCTusQ8.mEJNalO.eEPPp1mMrtP.', 'Valentin');
