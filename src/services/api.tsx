import axios from 'axios'

export const useApi = () => {

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_HOST
    })

    console.log('API: ',api)

    // api.interceptors.request.use(config => {
    //     if (token) {
    //         config.headers.Authorization = `Bearer ${token}`
    //     }
    //     return config
    // })

    /* eslint-disable */
    const tratarRequisicao = (requisicao: any) => {
        return requisicao();
    }

    return {
        api,
        tratarRequisicao,
    }
}

