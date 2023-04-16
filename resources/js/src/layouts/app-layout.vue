<template>
    <div v-if="loading !== true">
        <!--  BEGIN NAVBAR  -->
        <Header></Header>
        <!--  END NAVBAR  -->

        <!--  BEGIN MAIN CONTAINER  -->
        <div
            class="main-container"
            id="container"
            :class="[
                !is_show_sidebar ? 'sidebar-closed sbar-open' : '',
                menu_style === 'collapsible-vertical'
                    ? 'collapsible-vertical-mobile'
                    : '',
            ]"
        >
            <!--  BEGIN OVERLAY  -->
            <div
                class="overlay"
                :class="{ show: !is_show_sidebar }"
                @click="toggleSideBar(!is_show_sidebar)"
            ></div>
            <div
                class="search-overlay"
                :class="{ show: is_show_search }"
                @click="toggleSearch(!is_show_search)"
            ></div>
            <!-- END OVERLAY -->

            <!--  BEGIN SIDEBAR  -->
            <Sidebar></Sidebar>
            <!--  END SIDEBAR  -->

            <!--  BEGIN CONTENT AREA  -->
            <div id="content" class="main-content">
                <router-view v-slot="{ Component }">
                    <Suspense>
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                        <template #fallback>Cargando...</template>
                    </Suspense>
                </router-view>
                <!-- BEGIN FOOTER -->
                <Footer></Footer>
                <!-- END FOOTER -->
            </div>
            <!--  END CONTENT AREA  -->
        </div>
    </div>
</template>

<script setup>
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
import Sidebar from "../components/layout/Sidebar.vue";

import useStore from "../store/index";

import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useSidebarStore } from "../store/sidebar";
import { onMounted, onBeforeMount, ref } from "vue";
import axios from "axios";

const useAuth = useSidebarStore();

const { toggleSearch, toggleSideBar, setUser, setDiasGratisRestantes } =
    useAuth;
const { is_show_sidebar, is_show_search, menu_style, user } =
    storeToRefs(useAuth);

const router = useRouter();
const route = useRoute();
const loading = ref(true);

onBeforeMount(async () => {
    loading.value = true;
    try {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.get("/api/profile", {
                headers: { Authorization: "Bearer " + token },
            });
            setUser(res.data.user);
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
