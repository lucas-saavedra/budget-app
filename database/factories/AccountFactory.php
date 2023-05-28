<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccountFactory extends Factory
{
    protected $model = Account::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'user_id' => 1,
            'initial_balance' => $this->faker->randomFloat(2, 0, 10000),
            'currency' => 'ARS',
            'description' => $this->faker->text(100),
            'color' => $this->faker->hexColor,
            'type' => $this->faker->randomElement(['cash', 'bank_account', 'credit_card', 'investment', 'e-wallet', 'savings', 'other']),
        ];
    }
}
