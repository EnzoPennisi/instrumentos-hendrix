import { useState, useEffect } from 'react';
import { getPedidosPorInstrumentos, getPedidosPorMesAño } from '../services/FuncionesApi';

export function useChart() {

    const [dataPieChart, setDataPieChart] = useState<(string | number)[][]>([[]]);
    const [dataBarChart, setDataBarChart] = useState<(string | number)[][]>([[]]);


    const getBarChart = async () => {
        const pedidos = await getPedidosPorMesAño();
        setDataBarChart([["Año/Mes", "Total"], ...pedidos]);
    }

    const getPieChart = async () => {
        const instrumentosPedidos = await getPedidosPorInstrumentos();
        setDataPieChart([["Nombre Instrumento", "Cant Pedidos"], ...instrumentosPedidos]);
    }

    useEffect(() => {
        getBarChart();
        getPieChart();
    }, []);



    return { dataPieChart, dataBarChart };
}
