<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name', 70);
            $table->integer('user_id');
            $table->decimal('balance', 10, 2);
            $table->string('currency')->default('ARS');
            $table->string('description')->nullable();
            $table->string('color', 50);
            $table->enum('type', ['cash', 'bank_account', 'credit_card', 'investment', 'e-wallet', 'savings', 'other']);
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');
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
        Schema::dropIfExists('accounts');
    }
};
