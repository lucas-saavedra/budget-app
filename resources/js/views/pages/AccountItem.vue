<template>
    <div class="card">
        <div class="row d-flex justify-content-between">
            <div class="col">
                <div className="card-img-top my-auto">
                    <AccountIcon />
                </div>

                <div className="card-body">
                    <h4 className="card-title ">{{ account.name }}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{{ account.description }}</h6>
                    <p className="card-text p-0 my-1">Amount : {{ account.initial_balance }} $</p>
                    <p className="card-text lh-1">Account type : {{ account.type }} </p>

                </div>
                <div className="card-footer">
                    <button className='btn btn-info'>Transaction</button>
                    <button className='btn btn-primary'>Edit</button>
                    <button className='btn btn-danger'>Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AccountIcon from './AccountIcon.vue';

defineProps({
    account: Object
})
</script>

<style lang="scss" scoped></style>
