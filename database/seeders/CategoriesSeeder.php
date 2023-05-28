<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea registros de ejemplo para la tabla 'categories'
        DB::table('categories')->insert([
            [
                'name' => 'Categoria 1',
                'user_id' => 1,
                'parent_id' => null,
                'description' => 'Descripción de la categoría 1',
                'type' => 'income',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Categoria 2',
                'user_id' => 1,
                'parent_id' => null,
                'description' => 'Descripción de la categoría 2',
                'type' => 'expense',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Agrega más registros de ejemplo según tus necesidades
        ]);
    }
}
