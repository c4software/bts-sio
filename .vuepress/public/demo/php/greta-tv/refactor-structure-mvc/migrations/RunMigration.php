<?php

namespace migrations;

use models\base\Migration;

class RunMigration
{
    public function run()
    {
        $engine = new Migration();
        foreach (glob('migrations/*.sql') as $file) {
            $engine->run_migration($file);
        }
    }
}