<?php

class Idea
{
    public function __construct(
        public ?int $id,
        public string $title,
        public string $author,
        public string $content,
        public string $createdAt
    ) {
    }

    public function getShortContent(int $length = 100): string
    {
        if (mb_strlen($this->content) <= $length) {
            return $this->content;
        }

        return mb_substr($this->content, 0, $length) . '...';
    }

    // Toutes les idées, la plus récente en premier.
    public static function all(): array
    {
        $pdo = Database::getPdo();
        $rows = $pdo->query("SELECT * FROM idees ORDER BY date_creation DESC")->fetchAll(PDO::FETCH_ASSOC);

        $ideas = [];
        foreach ($rows as $row) {
            $ideas[] = new Idea(
                $row['id'],
                $row['titre'],
                $row['auteur'],
                $row['contenu'],
                $row['date_creation']
            );
        }

        return $ideas;
    }

    // Une idée précise, ou null si l'identifiant n'existe pas.
    public static function find(int $id): ?Idea
    {
        $stmt = Database::getPdo()->prepare("SELECT * FROM idees WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return null;
        }

        return new Idea(
            $row['id'],
            $row['titre'],
            $row['auteur'],
            $row['contenu'],
            $row['date_creation']
        );
    }

    public static function count(): int
    {
        return (int) Database::getPdo()->query("SELECT COUNT(*) FROM idees")->fetchColumn();
    }

    // Enregistre CETTE idée en base.
    public function save(): void
    {
        $pdo = Database::getPdo();
        $stmt = $pdo->prepare(
            "INSERT INTO idees (titre, auteur, contenu, date_creation) VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([$this->title, $this->author, $this->content, $this->createdAt]);

        $this->id = (int) $pdo->lastInsertId();
    }

    // Supprime CETTE idée de la base.
    public function delete(): void
    {
        $stmt = Database::getPdo()->prepare("DELETE FROM idees WHERE id = ?");
        $stmt->execute([$this->id]);
    }
}
