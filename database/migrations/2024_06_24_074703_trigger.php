<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Trigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::unprepared("
            CREATE TRIGGER after_item_update
            AFTER UPDATE ON items
            FOR EACH ROW
            BEGIN
                IF OLD.status != NEW.status THEN
                    IF OLD.status = 'delivered' THEN
                        UPDATE couriers SET delivered = delivered - 1 WHERE id = OLD.courier_id;
                    ELSEIF OLD.status = 'failed' THEN
                        UPDATE couriers SET failed = failed - 1 WHERE id = OLD.courier_id;
                    ELSEIF OLD.status = 'in_progress' THEN
                        UPDATE couriers SET in_progress = in_progress - 1 WHERE id = OLD.courier_id;
                    END IF;
            
                    IF NEW.status = 'delivered' THEN
                        UPDATE couriers SET delivered = delivered + 1 WHERE id = NEW.courier_id;
                    ELSEIF NEW.status = 'failed' THEN
                        UPDATE couriers SET failed = failed + 1 WHERE id = NEW.courier_id;
                    ELSEIF NEW.status = 'in_progress' THEN
                        UPDATE couriers SET in_progress = in_progress + 1 WHERE id = NEW.courier_id;
                    END IF;
                END IF;
            END;
        ");


        DB::unprepared("
        CREATE TRIGGER after_item_insert
        AFTER INSERT ON items
        FOR EACH ROW
        BEGIN
            IF NEW.status = 'delivered' THEN
                UPDATE couriers 
                SET delivered = delivered + 1 
                WHERE id = NEW.courier_id;
            ELSEIF NEW.status = 'failed' THEN
                UPDATE couriers 
                SET failed = failed + 1 
                WHERE id = NEW.courier_id;
            ELSEIF NEW.status = 'in_progress' THEN
                UPDATE couriers 
                SET in_progress = in_progress + 1 
                WHERE id = NEW.courier_id;
            END IF;
        END;
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::unprepared('DROP TRIGGER `after_item_update`');
    }
}
