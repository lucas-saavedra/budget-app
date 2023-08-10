<template>
    <LayoutCard>
        <div class="row">
            <div className="alert alert-primary my-1" role="alert">
                <div className="row">
                    <div className="h3 col text-center">
                        Total amount: $15200
                    </div>
                    <div className="col d-flex justify-content-end"></div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-3">
                <div class="col">
                    <div class="card h-100">
                        <div className="row d-flex  h-100 align-content-center">
                            <div class="col d-flex justify-content-center">
                                <router-link :to="{ name: 'accounts.new' }">
                                    <Icon
                                        icon="material-symbols:add-circle-outline"
                                        role="button"
                                        width="40"
                                        height="40"
                                    />
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <template v-for="(account, id) in data" :key="id">
                    <AccountItem :account="account" />
                </template>
            </div>
        </div>
    </LayoutCard>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";
import LayoutCard from "@/components/LayoutCard.vue";
import AccountItem from "./components/transactions/Trs.vue";
import { useApi } from "@/hooks/use-api.js";

const { data, error, getData } = useApi();

const fetchData = async () => {
    error.value = null;
    await getData("api/accounts"); 
};
onMounted(async () => {
    await fetchData();
});
</script>

<style lang="scss" scoped></style>
