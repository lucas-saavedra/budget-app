<template>
    <main>
        <div className="container">
            <div className="alert alert-primary my-1" role="alert">
                <div className="row">
                    <div className="h3 col text-center"> Total amount: $15200</div>
                    <div className="col d-flex justify-content-end">

                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <template v-for="account in data">
                    <AccountItem :account="account" />
                </template>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue'
import AccountItem from './AccountItem.vue';

const { isFetching, error, data } = useQuery(['accounts'], async () => (
    axios.get("http://127.0.0.1:8000/api/accounts", {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => res.data.data)
))
const accounts = ref([
    {
        "id": 1,
        "name": "Mercado Pago",
        "user_id": 1,
        "initial_balance": 120000,
        "currency": "ARS",
        "description": "Billetera diaria MP",
        "color": "black",
        "type": "e-wallet",
        "created_at": "2023-03-09T21:42:14.000000Z",
        "updated_at": "2023-03-09T21:42:14.000000Z"
    }

])
</script>

<style lang="scss" scoped></style>
