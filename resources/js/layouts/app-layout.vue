<template>
    <div class="app" v-if="!loading">
        <!--  BEGIN SIDEBAR  -->
        <Sidebar />
        <!--  END SIDEBAR  -->

        <!--  BEGIN CONTENT AREA  -->

        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>


        <!--  END CONTENT AREA  -->
    </div>
</template>
<style lang="scss">
:root {

    --grey: #64748b;
    --dark: #1e293b;
    --dark-alt: #334155;
    --light: #f1f5f9;
    --sidebar-width: 250px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira sans', sans-serif;
}

body {
    background: var(--light);
}

button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
}

.app {
    display: flex;

    main {
        flex: 1 1 0;
        padding: 2rem;

        @media (max-width: 1024px) {
            padding-left: 6rem;
        }
    }
}
</style>
<script setup>
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
import Sidebar from '../components/Sidebar.vue'
import { useRoute, useRouter } from "vue-router";
import useStore from "../store/index";
import { onBeforeMount, ref } from "vue";
import axiosApi from "../service/axiosApi";

const store = useStore();
const router = useRouter();
const route = useRoute();
const loading = ref(true);

onBeforeMount(async () => {
    loading.value = true;
    try {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            await axiosApi.get("/sanctum/csrf-cookie");
            const res = await axiosApi.get("/api/profile", {
                headers: { Authorization: "Bearer " + token },
            });

            store.setUser(res.data.user);
        } else {
            throw new Error("Unauthenticated");
        }
        loading.value = false;
    } catch (e) {
        loading.value = false;
        router.replace({ name: "login", redirect: route.fullPath });
        e.value = e.message;
    }
});
</script>
