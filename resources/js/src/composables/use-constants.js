import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useConstants() {
    // state encapsulated and managed by the composable
    const colors = ref([
        {
            value: "rgba(158, 1, 66, 1)",
        },
        {
            value: "rgba(213, 62, 79, 1)",
        },
        {
            value: "rgba(244, 109, 67, 1)",
        },
        {
            value: "rgba(253, 174, 97, 1)",
        },
        {
            value: "rgba(254, 224, 139, 1)",
        },
        {
            value: "rgba(230, 245, 152, 1)",
        },
        {
            value: "rgba(171, 221, 164, 1)",
        },
        {
            value: "rgba(102, 194, 165, 1)",
        },
        {
            value: "rgba(50, 136, 189, 1)",
        },
        {
            value: "rgba(94, 79, 162, 1)",
        },
    ]);
    const accountTypes = ref([
        { label: "Cuenta Corriente", name: "bank_account", icon: "mdi:bank" },
        {
            label: "Tarjeta de Crédito",
            name: "credit_card",
            icon: "material-symbols:credit-card-outline",
        },
        { label: "Dinero", name: "cash", icon: "mdi:cash" },
        {
            label: "Inversión",
            name: "investment",
            icon: "material-symbols:trending-up",
        },
        { label: "Billetera digital", name: "e-wallet", icon: "iconoir:coin" },
        {
            label: "Ahorros",
            name: "savings",
            icon: "material-symbols:savings-outline",
        },
        { label: "Otros", name: "other", icon: "basil:other-1-outline" },
    ]);


    return { colors, accountTypes }
}
