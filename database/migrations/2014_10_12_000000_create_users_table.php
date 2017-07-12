<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->string('invite_token',512)->nullable()->default(null);
            $table->boolean("is_admin")->default(false);
            $table->boolean("active")->default(false);
            $table->timestamps();
        });

        Schema::table('users',function(Blueprint $table){
            $sql="INSERT INTO users(name,email,password,is_admin,active) VALUES('System Administrator','admin@two-uk.com','".Hash::make("123456")."',1,1)";
            DB::connection()->getPdo()->exec($sql);
            $sql="CREATE TRIGGER `bd_users` BEFORE DELETE ON `users` FOR EACH ROW
                    BEGIN
                        IF (OLD.id=1) THEN
                            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You cannot delete System administrator';
                        END IF;
                    END";
             DB::connection()->getPdo()->exec($sql);    
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
