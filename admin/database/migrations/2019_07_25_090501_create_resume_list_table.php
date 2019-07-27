<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResumeListTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resume_list', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('realName');
            $table->string('position');
            $table->string('tel');
            $table->string('email');
            $table->string('tags');
            $table->integer('Fid');
            $table->string('remark');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resume_list');
    }
}
