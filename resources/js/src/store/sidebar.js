
import { defineStore } from 'pinia'


export const useSidebarStore = defineStore('sidebarStore', {
    state: () => {
        return {
            categorias: [],
            layout: 'app',
            user: null,
            token: null,
            diasGratisRestantes: null,
            is_show_sidebar: true,
            is_show_search: false,
            is_dark_mode: false,
            dark_mode: 'light',
            locale: null,
            menu_style: 'vertical',
            layout_style: 'full',
            countryList: [
                { code: 'zh', name: 'Chinese' },
                { code: 'da', name: 'Danish' },
                { code: 'en', name: 'English' },
                { code: 'fr', name: 'French' },
                { code: 'de', name: 'German' },
                { code: 'el', name: 'Greek' },
                { code: 'hu', name: 'Hungarian' },
                { code: 'it', name: 'Italian' },
                { code: 'ja', name: 'Japanese' },
                { code: 'pl', name: 'Polish' },
                { code: 'pt', name: 'Portuguese' },
                { code: 'ru', name: 'Russian' },
                { code: 'es', name: 'Spanish' },
                { code: 'sv', name: 'Swedish' },
                { code: 'tr', name: 'Turkish' },
            ],
        }
    },
    getters: {
        getLayout() {
            return this.layout;
        },
        getDiasRestantes() {
            return moment(this.user?.created_at).add(1, "months").diff(moment(), "days");
        },
        getToken() {
            if (!localStorage.getItem('token')) {
                return false;
            }
            return localStorage.getItem('token')
        }
    },
    actions: {
        async setCategorias() {
            const res = await axios.get('api/categorias', {
                data: {
                    id_tienda: 51
                },
                headers: { Authorization: 'Bearer ' + token }
            });
            this.categorias = res.data;
        },
        setToken(token) {
            this.token = token;
        },
        setUser(user) {
            this.user = user;
        },
        setDiasGratisRestantes(dias) {
            this.diasGratisRestantes = dias;
        },
        async logout() {
            const token = localStorage.getItem("token");
            await axios.get("/sanctum/csrf-cookie");
            await axios.get('api/logout', {
                headers: { Authorization: 'Bearer ' + token }
            });
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
            this.layout = 'auth';
            router.replace('/login');
        },
        setLayout(payload) {
            this.layout = payload;
        },
        toggleSideBar(value) {
            this.is_show_sidebar = value;
        },
        toggleSearch(value) {
            this.is_show_search = value;
        },
        toggleLocale(value) {
            value = value || 'en';
            i18n.global.locale = value;
            localStorage.setItem('i18n_locale', value);
            this.locale = value;
        },

        toggleDarkMode(value) {
            //light|dark|system
            value = value || 'light';
            localStorage.setItem('dark_mode', value);
            this.dark_mode = value;
            if (value == 'light') {
                this.is_dark_mode = false;
            } else if (value == 'dark') {
                this.is_dark_mode = true;
            } else if (value == 'system') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.is_dark_mode = true;
                } else {
                    this.is_dark_mode = false;
                }
            }

            if (this.is_dark_mode) {
                document.querySelector('body').classList.add('dark');
            } else {
                document.querySelector('body').classList.remove('dark');
            }
        },

        toggleMenuStyle(value) {
            //horizontal|vertical|collapsible-vertical
            value = value || '';
            localStorage.setItem('menu_style', value);
            this.menu_style = value;
            if (!value || value === 'vertical') {
                this.is_show_sidebar = true;
            } else if (value === 'collapsible-vertical') {
                this.is_show_sidebar = false;
            }
        },

        toggleLayoutStyle(value) {
            //boxed-layout|large-boxed-layout|full
            value = value || '';
            localStorage.setItem('layout_style', value);
            this.layout_style = value;
        },
    }
})

