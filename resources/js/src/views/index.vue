<script setup>
import { Icon } from "@iconify/vue";
import { Form } from "vee-validate";
import { ref, onMounted } from "vue";
import LayoutCard from "../components/LayoutCard.vue";
import axios from "axios";
import { useQuery } from "@tanstack/vue-query";
const { isFetching, error, data } = useQuery(["report"], async () => {
    const res = await axios.get("api/reports", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
    return res.data.data
}

);
const formatearMoneda = (numero, moneda = "ARS") => {
    const conFormato = new Intl.NumberFormat('es-ES', { style: 'currency', currency: moneda }).format(numero)
    const sinAbreviatura = conFormato.replace(/\s[A-Z]{3}$/, '') // Eliminar abreviatura de moneda al final
    return '$' + sinAbreviatura
}
</script>
<template>
    <LayoutCard>
        <div class="row row-cols-1 row-cols-md-4 g-4" v-if="!isFetching">
            <div class="col">
                <div class="card">
                    <div class="row d-flex justify-content-between">
                        <div class="col">
                            <div class="card-body">
                                <h5 class="card-title pb-3">Saldo actual</h5>
                                <p class=" fs-4  card-text">{{ formatearMoneda(data.incomes - data.expenses) }}</p>
                            </div>
                        </div>
                        <div class="col p-3 me-3 text-end my-auto">
                            <RouterLink :to="{ name: 'cuentas' }">
                                <button class="btn btn-outline-info rounded-circle p-2">
                                    <Icon icon="mdi:bank" width="30" height="30" />
                                </button>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="row d-flex justify-content-between">
                        <div class="col">
                            <div class="card-body">
                                <h5 class="card-title pb-3">Ingresos</h5>
                                <p class=" fs-4  card-text">{{ formatearMoneda(data.incomes) }}</p>
                            </div>
                        </div>
                        <div class="col p-3 me-3 text-end my-auto">
                            <button class="bg-success rounded-circle p-2">
                                <Icon icon="ic:baseline-arrow-upward" width="30" height="30" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="row d-flex justify-content-between">
                        <div class="col">
                            <div class="card-body">
                                <h5 class="card-title pb-3">Gastos</h5>
                                <p class=" fs-4  card-text">{{ formatearMoneda(data.expenses) }}</p>
                            </div>
                        </div>
                        <div class="col p-3 me-3 text-end my-auto">
                            <button class="bg-danger rounded-circle  p-2 ">
                                <Icon icon="ic:baseline-arrow-upward" verticalFlip="true" width="30" height="30" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </LayoutCard>
</template>


<style scoped></style>
