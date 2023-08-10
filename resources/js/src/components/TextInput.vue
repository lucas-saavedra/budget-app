<template>
    <div class="form-floating mb-3">
        <input
            class="form-control"
            :class="{ 'is-invalid': errorMessage }"
            :name="name"
            type="text"
            v-model="value"
            :placeholder="placeholder"
        />
        <label :for="name">{{ label }}</label>

        <div v-show="errorMessage" class="text-danger fw-bold pt-1">
            {{ errorMessage }}
        </div>
    </div>
</template>
<script setup>
import { useField } from "vee-validate";

const props = defineProps({
    name: String,
    label: String,
    placeholder: String,
});

const { errorMessage, value } = useField(props.name);
</script>
