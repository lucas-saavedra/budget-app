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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->decimal('amount', 10, 2);

            $table->string('transaction_type');
            $table->integer('category_id');
            $table->timestamp('datetime');
            $table->timestamps();

            $table->integer('account_id_from');
            $table->integer('account_id_to');
            $table->integer('user_id');

            $table->foreign('account_id_from')
                ->references('id')
                ->on('accounts')
                ->onDelete('cascade');
            $table->foreign('account_id_to')
                ->references('id')
                ->on('accounts')
                ->nullable()
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};
