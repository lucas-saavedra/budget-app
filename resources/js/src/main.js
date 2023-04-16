
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from './router';
import App from './App.vue'
import '../../css/app.css';

// bootstrap
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/materia/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
//axios
import axios from 'axios';
axios.defaults.withCredentials = true;

const pinia = createPinia();

const app = createApp(App);
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
app.use(PerfectScrollbar)
    .use(Vue3Toasity,
        {
            autoClose: 3000,
        })
    .use(VueQueryPlugin)
    .use(pinia)
    .use(router)
    .mount('#app')
