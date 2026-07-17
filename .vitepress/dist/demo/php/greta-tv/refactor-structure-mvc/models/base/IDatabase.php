<?php

namespace models\base;

/**
 * Interface IDatabase
 * @package models\base
 * @property string $tableName
 * @property string $primaryKey
 */
interface IDatabase
{
    public function getAll();

    public function getOne($id);

    public function deleteOne($id);

    public function updateOne($id, $data);
}