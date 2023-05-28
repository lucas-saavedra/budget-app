<template>
    <LayoutCard>
        <div class="row d-flex justify-content-center">
            <div class="col-md-8">
                <div class="d-flex justify-content-center">
                    <h3 class="display-6">Agregar cuenta</h3>
                </div>
                <form @submit="onSubmit">
                    <CurrencyInput
                        name="initial_balance"
                        label="Balance inicial"
                        v-model="initial_balance"
                        :options="{ currency: 'ARS', valueRange: { min: 0 } }"
                        placeholder="$00,00"
                    />
                    <CustomInput
                        type="text"
                        name="name"
                        label="Nombre"
                        placeholder="Ej: Billetera..."
                    />
                    <div class="row d-flex justify-content-around py-3">
                        <div class="col text-md-center">
                            <label
                                v-for="color in colors"
                                :for="color.value"
                                class="rounded-circle position-relative color__label mx-1"
                                :class="[
                                    radioColors == color.value
                                        ? 'selected'
                                        : '',
                                ]"
                                :style="{
                                    'background-color': color.value,
                                    width: '40px',
                                    height: '40px',
                                }"
                            >
                                <div
                                    v-if="radioColors === color.value"
                                    class="position-absolute top-50 start-50 translate-middle"
                                >
                                    <Icon
                                        icon="ic:baseline-check"
                                        width="25"
                                        height="25"
                                        class="text-white"
                                    />
                                </div>
                            </label>
                            <input
                                hidden
                                v-for="color in colors"
                                type="radio"
                                name="color"
                                :id="color.value"
                                :checked="radioColors === color.value"
                                :value="color.value"
                                v-model="radioColors"
                                class="rounded-circle"
                                :style="{
                                    'background-color': color.value,
                                    width: '25px',
                                    height: '25px',
                                }"
                            />
                        </div>
                    </div>

                    <div class="col py-3">
                        <VueMultiselect
                            v-model="type"
                            placeholder="Buscar una plantilla"
                            label="label"
                            track-by="name"
                            :options="options"
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
import { ref } from "vue";
import VueMultiselect from "vue-multiselect";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useField, useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import * as Yup from "yup";
import CustomInput from "@/components/CustomInput.vue";
import CustomTextAreaInput from "@/components/CustomTextAreaInput.vue";
import LayoutCard from "@/components/LayoutCard.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import { Icon } from "@iconify/vue";
import { useConstants } from "../../../composables/use-constants";
import axios from "axios";

const { colors, accountTypes: options } = useConstants();

const initial_balance = ref(0);

const loading = ref(false);
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Please enter a title")
        .max(191, "Title can not be longer than 191 characters."),
    description: Yup.string().max(
        255,
        "Description can not be longer than 255 characters."
    ),
});

const { handleSubmit } = useForm({
    validationSchema: validationSchema,
});
const { value: type } = useField(
    "type",
    {},
    {
        initialValue: {
            label: "Cuenta Corriente",
            name: "bank_account",
            icon: "mdi:bank",
        },
    }
);
const { value: radioColors } = useField(
    "color",
    {},
    {
        initialValue: "rgba(50, 136, 189, 1)",
    }
);
const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: async (account) => {
        const token = localStorage.getItem("token");
        const res = await axios.post(
            "/api/accounts",
            {
                name: account.name,
                type: account.type.name,
                color: account.color,
                initial_balance: account.initial_balance,
                currency: "ARS",
                description: account.description,
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        return res.data.data;
    },
    onMutate: () => {
        loading.value = true;
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["accounts"]);
        toast.info("Cuenta agregada", {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    },
    onError: (error) => {
        queryClient.invalidateQueries(["accounts"]);
        toast.error(error.message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    },
    onSettled: () => {
        loading.value = false;
        // emits("close");
    },
});

const onSubmit = handleSubmit(async (values) => {
    mutation.mutate(values);
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
