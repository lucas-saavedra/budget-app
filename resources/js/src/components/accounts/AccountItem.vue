<template>
    <div class="col">
        <div class="card">

            <div className="card-body">
                <h4 className="card-title ">
                    <Icon icon="ph:wallet" :style="{
                        color: account.color
                    }" width="40" height="40" /> {{ account.name }}
                </h4>
                <h6 className="card-subtitle mb-2 text-muted">{{ account.description }}</h6>
                <p className="card-text p-0 my-1">Amount : {{ account.initial_balance }} $</p>
                <p className="card-text lh-1">Account type : {{ account.type }} </p>

            </div>
            <div className="card-footer ">
                <button className='btn btn-info px-3'>Transaction</button>
                <button className='btn btn-primary'>Edit</button>
                <button className='btn btn-danger'>Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
    account: Object
})
</script>

<style lang="scss" scoped></style>
