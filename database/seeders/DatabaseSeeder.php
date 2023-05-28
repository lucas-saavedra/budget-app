<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Account;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\Transfer;
use Database\Seeders\CategoriesSeeder;
use Faker\Factory as FakerFactory;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Crear 1 usuario
        User::create([
            'name' => 'Nombre de usuario',
            'email' => 'correo@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => null,
        ]);

        $faker = FakerFactory::create();
        for ($i = 1; $i <= 5; $i++) {
            Account::create([
                'name' => $faker->word,
                'user_id' => 1,
                'initial_balance' => $faker->randomFloat(2, 0, 999999),
                'currency' => 'ARS',
                'description' => $faker->sentence,
                'color' => $faker->hexcolor,
                'type' => $faker->randomElement(['cash', 'bank_account', 'credit_card', 'investment', 'e-wallet', 'savings', 'other']),
            ]);
        }
        $this->call(CategoriesSeeder::class);
        // Crear 10 ingresos
        for ($i = 1; $i <= 10; $i++) {
            Transaction::create([
                'account_id' => Account::all()->random()->id,
                'amount' => $faker->randomFloat(2, 1, 1000),
                'type' => 'income',
                'category_id' => Category::all()->where('type', 'income')->random()->id,
                'datetime' => $faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }

        // Crear 5 gastos
        for ($i = 1; $i <= 5; $i++) {
            Transaction::create([
                'account_id' => Account::all()->random()->id,
                'amount' => $faker->randomFloat(2, 1, 1000),
                'type' => 'expense',
                'category_id' => Category::all()->where('type', 'expense')->random()->id,
                'datetime' => $faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }

        // Crear 2 transferencias
        for ($i = 1; $i <= 2; $i++) {
            Transfer::create([
                'account_id_from' => Account::all()->random()->id,
                'account_id_to' => Account::all()->random()->id,
                'amount' => $faker->randomFloat(2, 1, 1000),
                'datetime' => $faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }
    }
}
