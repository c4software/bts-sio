CREATE DATABASE IF NOT EXISTS boite_idees CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE boite_idees;

DROP TABLE IF EXISTS idees;
CREATE TABLE idees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(150) NOT NULL,
  auteur VARCHAR(100) NOT NULL,
  contenu TEXT NOT NULL,
  date_creation DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO idees (titre, auteur, contenu, date_creation) VALUES
('Un distributeur de café en salle B12', 'Camille', 'Le matin, faire la queue à la cafétéria nous met en retard en cours. Un distributeur dans le couloir de la B12 réglerait le problème.', '2026-09-01 08:30:00'),
('Des prises électriques au CDI', 'Sofiane', 'Impossible de travailler plus de deux heures au CDI : il n''y a que quatre prises pour trente places.', '2026-09-02 10:15:00'),
('Un tournoi de code entre classes', 'Léa', 'Organiser un tournoi de petits défis de programmation entre la première et la deuxième année, un vendredi après-midi.', '2026-09-03 14:00:00');

DROP TABLE IF EXISTS utilisateurs;
CREATE TABLE utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  nom VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO utilisateurs (email, mot_de_passe, nom) VALUES
('admin@exemple.com', '$2y$10$JwcxeB9JYpPA1sVJvO67E.bY6tCTusQ8.mEJNalO.eEPPp1mMrtP.', 'Valentin');
