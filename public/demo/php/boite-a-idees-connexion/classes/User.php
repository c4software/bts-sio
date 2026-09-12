<?php

class User
{
    public function __construct(
        public ?int $id,
        public string $email,
        public string $passwordHash,
        public string $name
    ) {
    }

    // Retrouve un utilisateur à partir de son email, ou null s'il n'existe pas.
    public static function findByEmail(string $email): ?User
    {
        $stmt = Database::getPdo()->prepare("SELECT * FROM utilisateurs WHERE email = ?");
        $stmt->execute([$email]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return null;
        }

        return new User($row['id'], $row['email'], $row['mot_de_passe'], $row['nom']);
    }
}
