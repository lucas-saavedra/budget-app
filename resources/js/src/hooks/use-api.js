import axios from "axios";
import { ref } from "vue";

export const useApi = () => {
    const data = ref([]);
    const error = ref(null);
    const loading = ref(false);
    const getData = async (url) => {
        try {
            loading.value = true;
            const response = await axios({
                method: "get",
                url,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            data.value = response.data.data;
        } catch (err) {
            error.value = err;
        }
        loading.value = false;
    };

    return { data, error, getData, loading };
};
