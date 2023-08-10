<template>
    <LayoutCard>
        <div class="row d-flex justify-content-center">
            <div class="col-md-8">
                <div class="d-flex justify-content-center">
                    <h3 class="display-6">Agregar transacción</h3>
                </div>
                <form @submit="onSubmit">
                    <div class="col py-3">
                        <VueMultiselect
                            v-model="transaction_type"
                            placeholder="Seleccione un tipo"
                            label="label"
                            track-by="name"
                            id="transaction_type"
                            :options="[
                                {
                                    label: 'Ingreso',
                                    name: 'income',
                                    icon: 'ic:baseline-trending-up',
                                },
                                {
                                    label: 'Egreso',
                                    name: 'expense',
                                    icon: 'ic:baseline-trending-down',
                                },
                                {
                                    label: 'Transferencia',
                                    name: 'transfer',
                                    icon: 'ic:baseline-swap-horiz',
                                },
                                {
                                    label: 'Ajuste',
                                    name: 'adjustment',
                                    icon: 'ic:baseline-sync-alt',
                                },
                            ]"
                            :option-height="200"
                            :show-labels="false"
                        >
                            <template #singleLabel="props">
                                <div class="text-wrap">
                                    <div class="card-body w-100 h-100">
                                        <div class="card-title">
                                            <Icon
                                                class="my-auto"
                                                :icon="props.option.icon"
                                                width="30"
                                                height="30"
                                            />

                                            <span class="my-auto ps-1">{{
                                                props.option.label
                                            }}</span>
                                        </div>
                                    </div>
                                </div></template
                            >
                            <template #option="props">
                                <div class="text-wrap">
                                    <div class="card-body w-100 h-100">
                                        <div class="card-title">
                                            <Icon
                                                :icon="props.option.icon"
                                                width="30"
                                                height="30"
                                            />

                                            {{ props.option.label }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </VueMultiselect>
                    </div>

                    <div class="col py-3">
                        <input
                            type="datetime-local"
                            class="form-control"
                            name="datetime"
                            v-model="datetime"
                        />
                    </div>
                    <CurrencyInput
                        name="balance"
                        label="Balance"
                        v-model="balance"
                        :options="{ currency: 'ARS', valueRange: { min: 0 } }"
                        placeholder="$00,00"
                    />

                    <div class="col py-3">
                        <VueMultiselect
                            v-model="account_id_from"
                            placeholder="Seleccione una cuenta"
                            label="name"
                            id="account_id_from"
                            track-by="id"
                            :options="accountOptions"
                            :option-height="200"
                            :show-labels="false"
                        >
                            <template #singleLabel="props">
                                <div class="text-wrap">
                                    <div class="card-body w-100 h-100">
                                        <div class="card-title">
                                            <Icon
                                                :icon="
                                                    accountTypes.find(
                                                        (type) =>
                                                            type.name ===
                                                            props.option.type
                                                    ).icon
                                                "
                                                width="30"
                                                height="30"
                                            />

                                            <span class="my-auto ps-1">{{
                                                props.option.name
                                            }}</span>
                                        </div>
                                    </div>
                                </div></template
                            >
                            <template #option="props">
                                <div class="text-wrap">
                                    <div class="card-body w-100 h-100">
                                        <div class="card-title">
                                            <Icon
                                                :icon="
                                                    accountTypes.find(
                                                        (type) =>
                                                            type.name ===
                                                            props.option.type
                                                    ).icon
                                                "
                                                width="30"
                                                height="30"
                                            />

                                            {{ props.option.name }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </VueMultiselect>
                    </div>

                    <div
                        class="col py-3"
                        v-if="transaction_type?.name == 'transfer'"
                    >
                        <VueMultiselect
                            v-model="account_id_to"
                            placeholder="Seleccione una cuenta"
                            label="name"
                            id="account_id_to"
                            track-by="id"
                            :options="
                                accountOptions.filter(
                                    (account) =>
                                        account?.id !== account_id_from?.id
                                )
                            "
                            :option-height="200"
                            :show-labels="false"
                        >
                            <template #singleLabel="props">
                                <div class="text-wrap">
                                    <div class="card-body w-100 h-100">
                                        <div class="card-title">
                                            <Icon
                                                :icon="
                                                    accountTypes.find(
                                                        (type) =>
                                                            type.name ===
                                                            props.option.type
                                                    ).icon
                                                "
                                                width="30"
                                                height="30"
                                            />

                                            <span class="my-auto ps-1">{{
                                                props.option.name
                                            }}</span>
                                        </div>
                                    </div>
                                </div></template
                            >
                            <template #option="props">
                                <div class="text-wrap">
                                    <div class="card-body w-100 h-100">
                                        <div class="card-title">
                                            <Icon
                                                :icon="
                                                    accountTypes.find(
                                                        (type) =>
                                                            type.name ===
                                                            props.option.type
                                                    ).icon
                                                "
                                                width="30"
                                                height="30"
                                            />

                                            {{ props.option.name }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </VueMultiselect>
                    </div>
                    <VueMultiselect
                        v-if="transaction_type"
                        v-model="category_id"
                        placeholder="Seleccione una categoria"
                        label="label"
                        id="id"
                        track-by="id"
                        :options="
                            categories.filter(
                                (category) =>
                                    category.type === transaction_type.name
                            )
                        "
                    >
                    </VueMultiselect>
                    <CustomTextAreaInput
                        name="description"
                        label="Description"
                        placeholder="Description"
                    />

                    <div class="d-flex gap-3">
                        <button
                            :disabled="loading"
                            class="w-100 py-1 btn btn-lg btn-primary"
                            type="submit"
                        >
                            <span v-if="!loading">Aceptar</span>
                            <span
                                v-else
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            <span class="visually-hidden">Loading...</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </LayoutCard>
</template>
<style lang="scss" scoped>
.color__label.selected {
    border: 2px solid rgba(0, 0, 0, 0.953);
}
.color__label:hover {
    border: 2px solid rgba(0, 0, 0, 0.953);
}
</style>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import VueMultiselect from "vue-multiselect";

import { useField, useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import * as yup from "yup";
import CustomTextAreaInput from "@/components/CustomTextAreaInput.vue";
import LayoutCard from "@/components/LayoutCard.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import { Icon } from "@iconify/vue";
import { useConstants } from "@/hooks/use-constants";

import axios from "axios";

const { colors, accountTypes: accountTypes } = useConstants();
const loading = ref(false);
const props = defineProps({
    data: {
        type: Object,
    },
    editMode: {
        type: Boolean,
        default: false,
    },
});
const inputSchema = yup.object().shape({
    transaction_type: yup.object().shape({
        label: yup.string().required(),
        name: yup.string().required(),
        icon: yup.string().required(),
    }),
    account_id_from: yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
        user_id: yup.number().required(),
        balance: yup.string().required(),
        currency: yup.string().required(),
        description: yup.string().nullable(),
        color: yup.string().required(),
        type: yup.string().required(),
        created_at: yup.date().required(),
        updated_at: yup.date().required(),
    }),
    balance: yup.number().required(),
    datetime: yup.date().required(),
});

const { value: transaction_type } = useField("transaction_type");
const { value: account_id_from } = useField("account_id_from");
const { value: account_id_to } = useField("account_id_to");
const { value: balance } = useField("balance");
const { value: datetime } = useField("datetime");
const { value: category_id } = useField("category_id");
const accountOptions = ref([]);
const { handleSubmit, setValues } = useForm(inputSchema);
const categories = ref([]);
const categoriesOptions = ref([]);


$incomeCategories = [
    [
        'name' => 'salario',
        'label' => 'Salario',
        'icon' => 'bx:bxs-wallet',
    ],
    [
        'name' => 'inversiones',
        'label' => 'Inversiones',
        'icon' => 'bx:bx-line-chart',
    ],
    [
        'name' => 'otros',
        'label' => 'Otros Ingresos',
        'icon' => 'bx:bx-money',
    ],
    [
        'name' => 'freelance',
        'label' => 'Trabajo Freelance',
        'icon' => 'bx:bx-briefcase-alt',
    ],
    [
        'name' => 'alquileres',
        'label' => 'Ingresos por Alquileres',
        'icon' => 'bx:bx-building-house',
    ],
    [
        'name' => 'venta_activos',
        'label' => 'Venta de Activos',
        'icon' => 'bx:bx-sell',
    ],
    [
        'name' => 'regalos',
        'label' => 'Regalos',
        'icon' => 'bx:bx-gift',
    ],
    [
        'name' => 'premios',
        'label' => 'Premios',
        'icon' => 'bx:bx-award',
    ],
    // ... otras categorías de ingresos con iconos correspondientes
];

$expenseCategories = [
    [
        'name' => 'alquiler_hipoteca',
        'label' => 'Alquiler o Hipoteca',
        'icon' => 'bx:bx-home',
    ],
    [
        'name' => 'servicios_publicos',
        'label' => 'Servicios Públicos',
        'icon' => 'bx:bx-water',
    ],
    [
        'name' => 'alimentacion',
        'label' => 'Alimentación',
        'icon' => 'bx:bx-food-menu',
    ],
    [
        'name' => 'transporte',
        'label' => 'Transporte',
        'icon' => 'bx:bx-bus',
    ],
    [
        'name' => 'entretenimiento',
        'label' => 'Entretenimiento',
        'icon' => 'bx:bx-game',
    ],
    [
        'name' => 'ropa_accesorios',
        'label' => 'Ropa y Accesorios',
        'icon' => 'bx:bx-t-shirt',
    ],
    [
        'name' => 'salud',
        'label' => 'Salud',
        'icon' => 'bx:bx-medical',
    ],
    [
        'name' => 'educacion',
        'label' => 'Educación',
        'icon' => 'bx:bx-book',
    ],
    [
        'name' => 'ahorros_inversiones',
        'label' => 'Ahorros o Inversiones',
        'icon' => 'bx:bx-piggy-bank',
    ],
    [
        'name' => 'deudas',
        'label' => 'Deudas',
        'icon' => 'bx:bx-money',
    ],
    [
        'name' => 'hogar',
        'label' => 'Hogar',
        'icon' => 'bx:bx-home-alt',
    ],
    [
        'name' => 'viajes_vacaciones',
        'label' => 'Viajes o Vacaciones',
        'icon' => 'bx:bx-plane-alt',
    ],
    [
        'name' => 'regalos_donaciones',
        'label' => 'Regalos y Donaciones',
        'icon' => 'bx:bx-gift',
    ],
    [
        'name' => 'seguro',
        'label' => 'Seguro',
        'icon' => 'bx:bx-shield',
    ],
    [
        'name' => 'cuidado_personal',
        'label' => 'Cuidado Personal',
        'icon' => 'bx:bx-face',
    ],
    [
        'name' => 'mascotas',
        'label' => 'Mascotas',
        'icon' => 'bx:bx-paw',
    ],
    [
        'name' => 'impuestos_tasas',
        'label' => 'Impuestos y Tasas',
        'icon' => 'bx:bx-receipt',
    ],
    [
        'name' => 'gastos_inesperados',
        'label' => 'Gastos Inesperados',
        'icon' => 'bx:bx-error',
    ],
    [
        'name' => 'tecnologia',
        'label' => 'Tecnología',
        'icon' => 'bx:bx-mobile',
    ],
    [
        'name' => 'comidas_fuera_casa',
        'label' => 'Comidas fuera de Casa',
        'icon' => 'bx:bx-restaurant',
    ],
    // ... otras categorías de gastos con iconos correspondientes
];



watch(
    () => categories.value,
    () => {
        if (categories.value.length === 0) return [];
        return categories.value.filter(
            (category) => category.type === transaction_type.value
        );
    }
);
const getCategories = async () => {
    const token = localStorage.getItem("token");
    const res = await axios({
        baseURL: `/api/categories`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    categories.value = res.data.data;
};
const getAccounts = async () => {
    const token = localStorage.getItem("token");
    const res = await axios({
        baseURL: `/api/accounts`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    accountOptions.value = res.data.data;
};
const onSubmit = handleSubmit(async (values) => {
    loading.value = true;
    const token = localStorage.getItem("token");
    console.log(values);
    return;
    try {
        const baseURL = props.editMode
            ? `/api/accounts/${props.data.id}`
            : `/api/accounts`;
        const method = props.editMode ? "PUT" : "POST";

        const res = await axios({
            baseURL,
            method,

            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                ...values,
                type: values.type.name,
            },
        });
        if (res.data.status) {
            toast.success("Cuenta agregada con éxito");
        } else {
            console.log(res.data);
            toast.error("Error al agregar la cuenta");
        }
    } catch (error) {
        console.log(error);
        toast.error("Error al agregar la cuenta");
    }
    loading.value = false;
});
onMounted(async () => {
    await getAccounts();
    await getCategories();
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
