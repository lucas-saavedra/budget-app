import axios from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
const url = import.meta.env.VITE_URL || "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: url,
    headers: { Authorization: 'Bearer ' + '1|II0bruH55BdZpFQErqzZ1pumgaoRrdkcrHoN850V' }
});
const addAccount = (body) => {
    return api.post('api/accounts',
        body
    )
}
const updateAccount = (id, body) => {
    return api.put('api/accounts/' + id,
        body
    )
}
export const useAddAccountMutation = () => {
    return useMutation(addAccount)
}



