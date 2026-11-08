-- Base de données « btstv » : TP 6 SQL, BTS TV administrable
-- Import : phpMyAdmin > Importer > choisir ce fichier > Exécuter
-- Compte de test : valentin / VotreMotDePasse-SALT-SECRET

CREATE DATABASE IF NOT EXISTS btstv CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE btstv;

DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  login VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(150) NOT NULL,
  youtube_id VARCHAR(20) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO users (login, password) VALUES ("valentin", SHA2("VotreMotDePasse-SALT-SECRET", 512));

INSERT INTO videos (titre, youtube_id, user_id) VALUES
("Présentation du BTS SIO", "BcgsOgjHgWA", 1),
("Les métiers du développement", "lcOxhH8N3Bo", 1),
("Les métiers du réseau", "jTuBnZrLbq0", 1);
