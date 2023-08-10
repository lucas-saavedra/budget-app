<template>
    <LayoutCard>
        <div class="row d-flex justify-content-center">
            <div class="col-md-8">
                <div class="d-flex justify-content-center">
                    <h3 class="display-6">Agregar cuenta</h3>
                </div>
                <form @submit="onSubmit">
                    <CurrencyInput
                        name="balance"
                        label="Balance inicial"
                        v-model="balance"
                        :options="{ currency: 'ARS', valueRange: { min: 0 } }"
                        placeholder="$00,00"
                    />
                    <TextInput
                        name="name"
                        label="Nombre"
                        placeholder="Ej: Billetera..."
                    />
                    <div class="row d-flex justify-content-around py-3">
                        <div class="col text-md-center">
                            <template v-for="(color, id) in colors" :key="id">
                                <label
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
                            </template>
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

import { useField, useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import * as Yup from "yup";
import TextInput from "@/components/TextInput.vue";
import CustomTextAreaInput from "@/components/CustomTextAreaInput.vue";
import LayoutCard from "@/components/LayoutCard.vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import { Icon } from "@iconify/vue";
import { useConstants } from "../../../hooks/use-constants";
import axios from "axios";

const { colors, accountTypes: options } = useConstants();
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

const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    type: Yup.string().required("El tipo es requerido"),
    color: Yup.string().required("El color es requerido"),
    balance: Yup.number()
        .required("El balance inicial es requerido")
        .min(0, "El balance inicial debe ser mayor a 0"),
    description: Yup.string(),
});

const { handleSubmit, setValues } = useForm(validationSchema);

const { value: type } = useField("type");
const { value: balance } = useField("balance");
const { value: radioColors } = useField("color");
if (props.editMode) {
    setValues({
        ...props.data,
        type: options.value?.find(
            (option) => option.name === props.data.type ?? options.value[0]
        ),
    });
}

const onSubmit = handleSubmit(async (values) => {
    loading.value = true;
    const token = localStorage.getItem("token");

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
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
