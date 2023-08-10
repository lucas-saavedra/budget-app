<template>
    <div class="col">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title ">
                    <Icon
                        icon="ph:wallet"
                        :style="{
                            color: account.color,
                        }"
                        width="40"
                        height="40"
                    />
                    {{ account.name }}
                </h4>
                <h6 class="card-subtitle mb-2 text-muted">
                    {{ account.description }}
                </h6>
                <p class="card-text p-0 my-1">
                    Amount : {{ account.initial_balance }} $
                </p>
                <p class="card-text lh-1">
                    Account type : {{ account.type }}
                </p>
            </div>
            <div class="card-footer ">
                <button class="btn btn-info">Nueva</button>
                <button class="btn btn-primary">Edit</button>
                <button
                    class="btn btn-danger"
                    @click="onDelete(account.id)"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import axios from "axios";
import { toast } from "vue3-toastify";
defineProps({
    account: Object,
});
const onDelete = async (id) => {
    console.log("algo");
    const token = localStorage.getItem("token");
    try {
        const res = await axios({
            baseURL: `/api/accounts/${id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.data.status) {
            toast.success("Cuenta eliminada con éxito");
        } else {
            console.log(res.data);
            toast.error("Error al agregar la cuenta");
        }
    } catch (error) {
        console.log(error);
        toast.error("Error al agregar la cuenta");
    }
};
</script>

<style lang="scss" scoped></style>
