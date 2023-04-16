<script setup>
import { Icon } from "@iconify/vue";
import { Form } from "vee-validate";
import { ref, onMounted } from "vue";
import LayoutCard from "../components/LayoutCard.vue";

</script>
<template>
    <LayoutCard>
        <div class="row row-cols-1 row-cols-md-4 g-4">
            <div class="col">
                <div class="card">
                    <div class="row d-flex justify-content-between">
                        <div class="col">
                            <div class="card-body">
                                <h5 class="card-title pb-3">Saldo actual</h5>
                                <p class=" fs-4  card-text">$1.520,258</p>
                            </div>
                        </div>
                        <div class="col p-3 me-3 text-end my-auto">
                            <button class="bg-primary rounded-circle p-2">
                                <Icon icon="mdi:bank" width="30" height="30" />
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
                                <h5 class="card-title pb-3">Ingresos</h5>
                                <p class=" fs-4  card-text">$1.520,258</p>
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
                                <p class=" fs-4  card-text">$1.520,258</p>
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
