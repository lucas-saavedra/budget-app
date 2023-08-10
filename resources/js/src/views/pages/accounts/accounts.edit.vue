<template>
    <LayoutCard>
        <AccountForm v-if="!loading" :data="data" :editMode="true"/>
    </LayoutCard>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import LayoutCard from "@/components/LayoutCard.vue";
import AccountForm from "./AccountForm.vue";
import { useApi } from "@/hooks/use-api.js";
const route = useRoute();
const { data, error, getData, loading } = useApi();

const fetchData = async () => {
    error.value = null;
    await getData(`/api/accounts/${route.params.id}`); // Proporciona la URL aquí
};

onMounted(async () => {
    await fetchData();
});
</script>
