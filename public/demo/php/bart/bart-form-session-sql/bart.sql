-- Base de données du générateur de punitions
CREATE DATABASE IF NOT EXISTS bart CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE bart;

CREATE TABLE IF NOT EXISTS phrases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phrase VARCHAR(255) NOT NULL,
    nombre INT NOT NULL,
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Quelques punitions pour avoir des données au premier lancement
INSERT INTO phrases (phrase, nombre) VALUES
    ('Je ne dessinerai pas sur le tableau', 100),
    ('Je n''utiliserai pas mon téléphone en classe', 50),
    ('Je rendrai mes TP à l''heure', 20);
