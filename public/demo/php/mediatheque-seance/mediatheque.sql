-- --------------------------------------------------------
-- Base de données « mediatheque »
-- TP Création : La médiathèque (BTS SIO 1re année)
-- Import : phpMyAdmin > Importer > choisir ce fichier > Exécuter
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS mediatheque CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mediatheque;

DROP TABLE IF EXISTS emprunts;
DROP TABLE IF EXISTS livres;
DROP TABLE IF EXISTS adherents;
DROP TABLE IF EXISTS categories;

-- --------------------------------------------------------
-- Structure
-- --------------------------------------------------------

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE livres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  auteur VARCHAR(255) NOT NULL,
  annee INT NOT NULL,
  categorie_id INT NOT NULL,
  FOREIGN KEY (categorie_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE adherents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date_inscription DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE emprunts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  livre_id INT NOT NULL,
  adherent_id INT NOT NULL,
  date_emprunt DATE NOT NULL,
  date_retour DATE DEFAULT NULL,
  FOREIGN KEY (livre_id) REFERENCES livres(id),
  FOREIGN KEY (adherent_id) REFERENCES adherents(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Les catégories
-- --------------------------------------------------------

INSERT INTO categories (id, nom) VALUES
(1, 'Roman'),
(2, 'Bande dessinée'),
(3, 'Science-fiction'),
(4, 'Jeunesse'),
(5, 'Documentaire'),
(6, 'Manga');

-- --------------------------------------------------------
-- Les livres
-- --------------------------------------------------------

INSERT INTO livres (id, titre, auteur, annee, categorie_id) VALUES
(1,  'L''Étranger', 'Albert Camus', 1942, 1),
(2,  'Madame Bovary', 'Gustave Flaubert', 1857, 1),
(3,  'Le Comte de Monte-Cristo', 'Alexandre Dumas', 1844, 1),
(4,  'La Peste', 'Albert Camus', 1947, 1),
(5,  'Vipère au poing', 'Hervé Bazin', 1948, 1),
(6,  'Astérix le Gaulois', 'René Goscinny', 1961, 2),
(7,  'Tintin au Tibet', 'Hergé', 1960, 2),
(8,  'Lucky Luke : Le Juge', 'Morris', 1959, 2),
(9,  'Gaston Lagaffe', 'André Franquin', 1960, 2),
(10, 'Le Chat', 'Philippe Geluck', 1986, 2),
(11, 'Dune', 'Frank Herbert', 1965, 3),
(12, 'Fondation', 'Isaac Asimov', 1951, 3),
(13, '1984', 'George Orwell', 1949, 3),
(14, 'Fahrenheit 451', 'Ray Bradbury', 1953, 3),
(15, 'Le Meilleur des mondes', 'Aldous Huxley', 1932, 3),
(16, 'Harry Potter à l''école des sorciers', 'J. K. Rowling', 1997, 4),
(17, 'Le Petit Prince', 'Antoine de Saint-Exupéry', 1943, 4),
(18, 'Charlie et la chocolaterie', 'Roald Dahl', 1964, 4),
(19, 'Le Journal d''un dégonflé', 'Jeff Kinney', 2007, 4),
(20, 'Matilda', 'Roald Dahl', 1988, 4),
(21, 'Une brève histoire du temps', 'Stephen Hawking', 1988, 5),
(22, 'Sapiens', 'Yuval Noah Harari', 2011, 5),
(23, 'Homo Deus', 'Yuval Noah Harari', 2015, 5),
(24, 'Cosmos', 'Carl Sagan', 1980, 5),
(25, 'One Piece, tome 1', 'Eiichiro Oda', 1997, 6),
(26, 'Naruto, tome 1', 'Masashi Kishimoto', 2000, 6),
(27, 'Dragon Ball, tome 1', 'Akira Toriyama', 1984, 6),
(28, 'L''Attaque des Titans, tome 1', 'Hajime Isayama', 2009, 6),
(29, 'Death Note, tome 1', 'Tsugumi Ohba', 2003, 6),
(30, 'Fullmetal Alchemist, tome 1', 'Hiromu Arakawa', 2001, 6);

-- --------------------------------------------------------
-- Les adhérents
-- --------------------------------------------------------

INSERT INTO adherents (id, nom, prenom, email, date_inscription) VALUES
(1,  'Martin', 'Camille', 'camille.martin@exemple.fr', '2026-01-12'),
(2,  'Dubois', 'Lucas', 'lucas.dubois@exemple.fr', '2026-01-20'),
(3,  'Leroy', 'Inès', 'ines.leroy@exemple.fr', '2026-02-03'),
(4,  'Moreau', 'Hugo', 'hugo.moreau@exemple.fr', '2026-02-14'),
(5,  'Petit', 'Léa', 'lea.petit@exemple.fr', '2026-03-02'),
(6,  'Garnier', 'Noah', 'noah.garnier@exemple.fr', '2026-03-18'),
(7,  'Rousseau', 'Jade', 'jade.rousseau@exemple.fr', '2026-04-05'),
(8,  'Fontaine', 'Théo', 'theo.fontaine@exemple.fr', '2026-04-22'),
(9,  'Lemoine', 'Chloé', 'chloe.lemoine@exemple.fr', '2026-05-11'),
(10, 'Bertrand', 'Nathan', 'nathan.bertrand@exemple.fr', '2026-06-01');

-- --------------------------------------------------------
-- Les emprunts
-- date_retour à NULL = emprunt en cours
-- --------------------------------------------------------

INSERT INTO emprunts (id, livre_id, adherent_id, date_emprunt, date_retour) VALUES
(1,   1, 1, '2026-02-02', '2026-02-15'),
(2,   6, 2, '2026-02-05', '2026-02-20'),
(3,  16, 3, '2026-02-10', '2026-03-01'),
(4,  25, 4, '2026-02-18', '2026-03-05'),
(5,  11, 1, '2026-03-01', '2026-03-18'),
(6,  13, 5, '2026-03-04', '2026-03-20'),
(7,   6, 3, '2026-03-12', '2026-03-28'),
(8,   2, 6, '2026-03-20', '2026-04-08'),
(9,  26, 4, '2026-04-02', '2026-04-16'),
(10,  1, 7, '2026-04-10', '2026-04-25'),
(11, 17, 2, '2026-04-15', '2026-05-02'),
(12, 16, 5, '2026-04-28', '2026-05-14'),
(13, 25, 6, '2026-05-06', '2026-05-21'),
(14,  8, 8, '2026-05-15', '2026-06-02'),
(15, 27, 1, '2026-05-22', '2026-06-05'),
(16,  3, 7, '2026-06-03', '2026-06-19'),
(17, 25, 3, '2026-06-12', '2026-06-28'),
(18,  4, 1, '2026-07-20', NULL),
(19,  9, 2, '2026-08-05', NULL),
(20, 28, 6, '2026-08-14', NULL),
(21, 16, 3, '2026-08-30', NULL),
(22,  7, 4, '2026-09-01', NULL),
(23, 22, 5, '2026-09-03', NULL),
(24, 14, 7, '2026-09-07', NULL),
(25, 18, 8, '2026-09-10', NULL);
