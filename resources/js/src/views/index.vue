<script setup>
import { Icon } from "@iconify/vue";
import { onMounted } from "vue";
import LayoutCard from "../components/LayoutCard.vue";

import { useApi } from "@/hooks/use-api.js";

const { data, error, getData, loading } = useApi();

const fetchData = async () => {
    error.value = null;
    await getData("api/reports"); // Proporciona la URL aquí
};
onMounted(async () => {
    await fetchData();
});

const formatearMoneda = (numero, moneda = "ARS") => {
    const conFormato = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: moneda,
    }).format(numero);
    const sinAbreviatura = conFormato.replace(/\s[A-Z]{3}$/, ""); // Eliminar abreviatura de moneda al final
    return "$" + sinAbreviatura;
};
</script>
<template>
    <LayoutCard>
        <div class="row row-cols-1 row-cols-md-3 g-4 " v-if="!loading">
            <div class="col">
                <div class="card h-100 bg-dark-subtle">
                    <div class="col">
                        <div class="card-body">
                            <h5 class="card-title pb-3">Saldo actual</h5>
                            <p class="fs-4 card-text">
                                {{
                                    formatearMoneda(
                                        data.incomes - data.expenses
                                    )
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="col-auto p-3 me-3 text-end my-auto">
                        <RouterLink :to="{ name: 'accounts.list' }">
                            <button class="btn btn-info rounded-circle p-2">
                                <Icon icon="mdi:bank" width="30" height="30" />
                            </button>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <div class="col">
                        <div class="card-body">
                            <h5 class="card-title pb-3">Ingresos</h5>
                            <p class="fs-4 card-text">
                                {{ formatearMoneda(data.incomes) }}
                            </p>
                        </div>
                    </div>
                    <div class="col-auto p-3 me-3 text-end my-auto">
                        <button class="btn btn-success rounded-circle p-2">
                            <Icon
                                icon="ic:baseline-arrow-upward"
                                width="30"
                                height="30"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <div class="col">
                        <div class="card-body">
                            <h5 class="card-title pb-3">Gastos</h5>
                            <p class="fs-4 card-text">
                                {{ formatearMoneda(data.expenses) }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="col-auto p-3 me-3 text-end my-auto align-content-end"
                    >
                        <button class="btn btn-danger rounded-circle p-2">
                            <Icon
                                icon="ic:baseline-arrow-upward"
                                verticalFlip="true"
                                width="30"
                                height="30"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </LayoutCard>
</template>

<style scoped></style>
