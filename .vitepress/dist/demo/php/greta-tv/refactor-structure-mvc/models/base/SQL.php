<?php

namespace models\base;

class SQL implements IDatabase
{
    protected $tableName = '';
    protected $primaryKey = '';

    /**
     * @var $pdo \PDO
     */
    protected $pdo;

    function __construct($tableName, $primaryKey = 'id')
    {
        $this->pdo = Database::connect();
        $this->tableName = $tableName;
        $this->primaryKey = $primaryKey;
    }

    /**
     * Retourne l'ensemble des enregistrements présent en base de données (pour la table $tableName)
     * @return array
     */
    public function getAll()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->tableName};");
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Permet la récupération d'un enregistrement en base de données
     * @param $id
     * @return mixed
     */
    public function getOne($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->tableName} WHERE {$this->primaryKey}; = ? LIMIT 1");
        $stmt->execute([$id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Supprime l'enregistrement $id dans la table $tableName
     * @param $id
     * @return bool
     */
    public function deleteOne($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->tableName} WHERE {$this->primaryKey}; = ? LIMIT 1");
        return $stmt->execute([$id]);
    }

    /**
     * Permet la mise à jour de l'ensemble des champs passée en paramètre dans $data pour l'enregistrement à $id.
     * @param $id
     * @param array $data
     * @return bool
     */
    public function updateOne($id, $data = array())
    {
        $query = "UPDATE {$this->tableName} SET ";

        foreach ($data as $columnName => $columnValue) {
            $query .= $columnName . " = :$columnName, ";
        }
        $query = rtrim($query, ", ");

        $query .= " WHERE {$this->primaryKey} = :id";

        $stmt = $this->pdo->prepare($query);
        return $stmt->execute(array_merge(["id" => $id], $data));
    }
}