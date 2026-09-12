CREATE DATABASE IF NOT EXISTS carnet DEFAULT CHARSET=utf8mb4;
USE carnet;

CREATE TABLE eleves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  prenom VARCHAR(50) NOT NULL,
  nom VARCHAR(50) NOT NULL,
  age INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  eleve_id INT NOT NULL,
  matiere VARCHAR(50) NOT NULL,
  note INT NOT NULL,
  FOREIGN KEY (eleve_id) REFERENCES eleves(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO eleves (id, prenom, nom, age) VALUES
(1, 'Bart', 'Simpson', 10),
(2, 'Lisa', 'Simpson', 8),
(3, 'Milhouse', 'Van Houten', 10),
(4, 'Nelson', 'Muntz', 11),
(5, 'Ralph', 'Wiggum', 9),
(6, 'Martin', 'Prince', 10);

INSERT INTO notes (eleve_id, matiere, note) VALUES
(1, 'php', 6), (1, 'sql', 8), (1, 'reseau', 11),
(2, 'php', 19), (2, 'sql', 18), (2, 'reseau', 17),
(3, 'php', 12), (3, 'sql', 11), (3, 'reseau', 13),
(4, 'php', 9), (4, 'sql', 7), (4, 'reseau', 14),
(5, 'php', 4), (5, 'sql', 5), (5, 'reseau', 6),
(6, 'php', 17), (6, 'sql', 16), (6, 'reseau', 15);
