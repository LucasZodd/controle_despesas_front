import { useApi } from "./api"

export const useRequisicoesDespesas = () => {
    const { api } = useApi()

    const getDespesas = () => {
        return api.get(`/despesas`)
    }

    const cadastroCategoria = (categoria: string) => {
        return api.post(`/cadastro/categoria`, { categoria_nome: categoria });
    }

    const getCategorias = () => {
        return api.get(`/categorias`)
    }

    const cadastroDespesa = (form) => {
        return api.post(`/cadastro/despesa`, form);
    }

    const buscarCategoria = (categoria: number) => {
        return api.get(`/despesa/${categoria}`);
    }

    const buscarData = (dataInicio: string, dataFim: string) => {
        return api.get(`/despesa/data/${dataInicio}/${dataFim}`);
    }

    return {
        getDespesas,
        cadastroCategoria,
        getCategorias,
        cadastroDespesa,
        buscarCategoria,
        buscarData,  
    }
}