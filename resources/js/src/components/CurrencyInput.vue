<template>
    <div class="form-group">
        <label class="fw-bold text-dark" :for="name">{{ label }}</label>
        <input
            ref="inputRef"
            :id="name"
            :name="name"
            type="text"
            class="form-control"
            :placeholder="placeholder"
        />
        <div class="col-1 text-sm" v-if="meta.pending">
            <div class="row">
                <div class="col-12">
                    <p
                        class="spinner-border text-primary spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    >
                        Validando...
                    </p>
                </div>
            </div>
        </div>
        <div v-show="errorMessage" class="text-danger fw-bold pt-1">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup>
import { watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";
import { useField } from "vee-validate";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    placeholder: String,
    label: String,
    modelValue: {
        type: Number,
    },
    options: Object,
});

const { inputRef, setValue } = useCurrencyInput(props.options);

watch(
    () => props.modelValue,
    (value) => {
        setValue(value);
    }
);

const { errorMessage, meta } = useField(
    props.name,
    {},
    { initialValue:0}
);
</script>
