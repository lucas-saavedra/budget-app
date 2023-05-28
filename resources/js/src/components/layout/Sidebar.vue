<template>
    <!--  BEGIN SIDEBAR  -->
    <div class="sidebar-wrapper sidebar-theme">
        <nav ref="menu" id="sidebar">
            <div class="shadow-bottom"></div>

            <perfect-scrollbar class="list-unstyled menu-categories" tag="ul" :options="{
                wheelSpeed: 0.5,
                swipeEasing: !0,
                minScrollbarLength: 40,
                maxScrollbarLength: 300,
                suppressScrollX: true,
            }">
                <li class="menu">
                    <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#inicio" aria-controls="inicio"
                        aria-expanded="false">
                        <div class="">
                            <Icon icon="material-symbols:home-outline" width="30" height="30" />
                            <span>Home</span>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="feather feather-chevron-right">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </div>
                    </a>
                    <ul id="inicio" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
                        <li v-for="opt in homeOptions">
                            <router-link as="li" :to="{ name: opt.name }" @click="toggleMobileMenu">
                                {{ opt.label }}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="menu">
                    <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#cuentas" aria-controls="cuentas"
                        aria-expanded="false">
                        <div class="">
                            <Icon icon="mdi:cellphone-message" width="20" height="20" />
                            <span>Cuenta</span>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="feather feather-chevron-right">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </div>
                    </a>
                    <ul id="cuentas" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
                        <li v-for="opt in cuentasOpt">
                            <router-link as="li" :to="{ name: opt.name }" @click="toggleMobileMenu">
                                {{ opt.label }}
                            </router-link>
                        </li>
                    </ul>
                </li>
            </perfect-scrollbar>
        </nav>
    </div>
    <!--  END SIDEBAR  -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useSidebarStore } from "../../store/sidebar";

import { Icon } from "@iconify/vue";

const useSidebar = useSidebarStore();
const { toggleSideBar } = useSidebar;
const { is_show_sidebar } = storeToRefs(useSidebar);
const homeOptions = ref([
    {
        name: "home",
        label: "Inicio",
    },
]);
const cuentasOpt = ref([
    {
        name: "cuentas",
        label: "Inicio",
    },
    {
        name: "nueva-cuenta",
        label: "Nueva",
    },
]);

onMounted(() => {
    const selector = document.querySelector(
        '#sidebar a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
        const ul = selector.closest("ul.collapse");
        if (ul) {
            let ele = ul
                .closest("li.menu")
                .querySelectorAll(".dropdown-toggle");
            if (ele) {
                ele = ele[0];
                setTimeout(() => {
                    ele.click();
                });
            }
        } else {
            selector.click();
        }
    }
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 991) {
        toggleSideBar(!is_show_sidebar.value);
    }
};
</script>
